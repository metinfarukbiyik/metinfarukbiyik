'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Activity,
  Gauge,
  Play,
  Square,
  Trash2,
  Download,
  ImageDown,
  Share2,
} from 'lucide-react';
import {
  createSpeedResultImage,
  speedResultFileName,
} from '@/lib/speed-result-image';
import {
  parseSpeedHistory,
  mergeSpeedHistory,
  runSpeedTest,
  SPEED_HISTORY_KEY,
  type SpeedResult,
  type SpeedProgress,
} from '@/lib/network-tools';

const phaseLabels = {
  latency: 'Gecikme ölçülüyor',
  download: 'İndirme ölçülüyor',
  upload: 'Yükleme ölçülüyor',
};
const number = (value: number) =>
  value.toLocaleString('tr-TR', { maximumFractionDigits: 2 });

export default function SpeedTestTool() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<SpeedProgress | null>(null);
  const [live, setLive] = useState<{
    download?: number;
    upload?: number;
    latency?: number;
    jitter?: number;
  }>({});
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [history, setHistory] = useState<SpeedResult[]>([]);
  const [unit, setUnit] = useState<'Mbps' | 'MB/s'>('Mbps');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const [exporting, setExporting] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const historyRef = useRef<SpeedResult[]>([]);

  useEffect(() => {
    try {
      const saved = parseSpeedHistory(localStorage.getItem(SPEED_HISTORY_KEY));
      historyRef.current = saved;
      // localStorage is an external store, read after hydration.
      setHistory(saved);
    } catch {
      setMessage(
        'Tarayıcı depolaması kapalı; sonuçlar bu oturumda gösterilecek.',
      );
    }
    const sync = (event: StorageEvent) => {
      if (event.key !== SPEED_HISTORY_KEY && event.key !== null) return;
      const saved = parseSpeedHistory(event.newValue);
      historyRef.current = saved;
      setHistory(saved);
    };
    window.addEventListener('storage', sync);
    return () => {
      controller.current?.abort();
      window.removeEventListener('storage', sync);
    };
  }, []);

  const start = useCallback(async () => {
    if (controller.current) return;
    const request = new AbortController();
    controller.current = request;
    setRunning(true);
    setResult(null);
    setLive({});
    setProgress(null);
    setError('');
    setMessage('');
    try {
      const measured = await runSpeedTest(request.signal, (update) => {
        setProgress(update);
        setLive((current) => ({
          ...current,
          ...(update.phase !== 'latency' && update.mbps !== undefined
            ? { [update.phase]: update.mbps }
            : {}),
          ...(update.latency !== undefined
            ? { latency: update.latency, jitter: update.jitter }
            : {}),
        }));
      });
      if (request.signal.aborted) return;
      setResult(measured);
      let saved = mergeSpeedHistory([measured], historyRef.current);
      try {
        saved = mergeSpeedHistory(
          saved,
          parseSpeedHistory(localStorage.getItem(SPEED_HISTORY_KEY)),
        );
        localStorage.setItem(SPEED_HISTORY_KEY, JSON.stringify(saved));
        setMessage('Test tamamlandı. Sonuç bu tarayıcıya kaydedildi.');
      } catch {
        setMessage(
          'Test tamamlandı. Tarayıcı depolaması kapalı olduğu için sonuç kalıcı kaydedilemedi.',
        );
      }
      historyRef.current = saved;
      setHistory(saved);
    } catch (cause) {
      if (request.signal.aborted)
        setMessage(
          'Test durduruldu. Tamamlanmayan ölçüm geçmişe kaydedilmedi.',
        );
      else
        setError(
          cause instanceof Error
            ? cause.message
            : 'Test tamamlanamadı. Tekrar dene.',
        );
    } finally {
      if (controller.current === request) controller.current = null;
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        running
      )
        return;
      const target = event.target as HTMLElement;
      if (
        target.closest(
          'button,a,input,select,textarea,summary,[contenteditable="true"]',
        )
      )
        return;
      if (event.key === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        void start();
      }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [start, running]);

  const speed = (value: number | undefined) =>
    value === undefined ? '—' : number(unit === 'Mbps' ? value : value / 8);
  const download = result?.download ?? live.download;
  const upload = result?.upload ?? live.upload;
  const latency = result?.latency ?? live.latency;
  const jitter = result?.jitter ?? live.jitter;
  const overall = progress
    ? { latency: 0, download: 10, upload: 55 }[progress.phase] +
      progress.fraction *
        { latency: 10, download: 45, upload: 45 }[progress.phase]
    : 0;

  function clearHistory() {
    try {
      localStorage.removeItem(SPEED_HISTORY_KEY);
    } catch {
      setError(
        'Kaydedilmiş geçmiş silinemedi. Tarayıcı depolama izinlerini kontrol et.',
      );
      return;
    }
    historyRef.current = [];
    setHistory([]);
    setConfirmClear(false);
    setMessage('Test geçmişi silindi.');
  }

  function exportHistory() {
    const csv =
      '\uFEFFTarih;Indirme (Mbps);Yukleme (Mbps);HTTP Gecikme (ms);Jitter (ms)\n' +
      history
        .map((r) =>
          [r.timestamp, r.download, r.upload, r.latency, r.jitter].join(';'),
        )
        .join('\n');
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biyik-dev_Internet-Hiz-Testi_Gecmis.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function exportResult(value: SpeedResult, share = false) {
    if (exporting) return;
    setExporting(true);
    setError('');
    try {
      const blob = await createSpeedResultImage(value, unit);
      const filename = speedResultFileName(value);
      const file = new File([blob], filename, { type: 'image/png' });
      if (share && navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'İnternet hız testi sonucum',
        });
        setMessage('Paylaşım penceresi açıldı.');
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
        setMessage(
          share
            ? 'Bu tarayıcı doğrudan görsel paylaşımını desteklemiyor. Görsel indirme işlemi başlatıldı.'
            : 'Sonuç görselini indirme işlemi başlatıldı.',
        );
      }
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') return;
      setError('Sonuç görseli hazırlanamadı. Lütfen tekrar dene.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <section className="network-panel" aria-label="İnternet hız ölçümü">
        <div className="network-toolbar">
          <span className="network-chip">Cloudflare ağı üzerinden</span>
          <fieldset className="network-unit">
            <legend className="sr-only">Hız birimi</legend>
            {(['Mbps', 'MB/s'] as const).map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="speed-unit"
                  checked={unit === value}
                  onChange={() => setUnit(value)}
                />
                <span>{value}</span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="speed-metrics">
          <div className="speed-metric">
            <span>
              <ArrowDown size={16} aria-hidden="true" /> İndirme
            </span>
            <strong>{speed(download)}</strong>
            <small>{unit}</small>
          </div>
          <div className="speed-metric">
            <span>
              <ArrowUp size={16} aria-hidden="true" /> Yükleme
            </span>
            <strong>{speed(upload)}</strong>
            <small>{unit}</small>
          </div>
          <div className="speed-metric speed-metric-small">
            <span>
              <Activity size={16} aria-hidden="true" /> Gecikme
            </span>
            <strong>{latency !== undefined ? number(latency) : '—'}</strong>
            <small>ms · HTTP</small>
          </div>
          <div className="speed-metric speed-metric-small">
            <span>
              <Gauge size={16} aria-hidden="true" /> Jitter
            </span>
            <strong>{jitter !== undefined ? number(jitter) : '—'}</strong>
            <small>ms</small>
          </div>
        </div>
        {running && (
          <div
            className="speed-progress"
            role="progressbar"
            aria-label={
              progress ? phaseLabels[progress.phase] : 'Test başlıyor'
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(overall)}
          >
            <span style={{ width: `${overall}%` }} />
          </div>
        )}
        <div className="speed-start">
          <button
            type="button"
            className="pill-button network-primary"
            onClick={running ? () => controller.current?.abort() : start}
          >
            {running ? (
              <Square size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {running
              ? 'Testi durdur'
              : result
                ? 'Yeniden test et'
                : 'Hız testini başlat'}
          </button>
          <p role="status">
            {running
              ? progress
                ? phaseLabels[progress.phase]
                : 'Bağlantı hazırlanıyor…'
              : message ||
                'Başlatmak için Enter veya Space tuşunu da kullanabilirsin.'}
          </p>
        </div>
        {result && !running && (
          <div
            className="speed-result-actions"
            aria-label="Test sonucunu paylaş"
          >
            <button
              type="button"
              className="pill-button"
              disabled={exporting}
              onClick={() => void exportResult(result)}
            >
              <ImageDown size={15} aria-hidden="true" /> Görsel indir
            </button>
            <button
              type="button"
              className="pill-button"
              disabled={exporting}
              onClick={() => void exportResult(result, true)}
            >
              <Share2 size={15} aria-hidden="true" /> Paylaş
            </button>
          </div>
        )}
        <p className="network-service-note">
          Test sırasında Cloudflare’a bağlanılır; IP adresin bu hizmet
          tarafından görülür. Her yönde 5–50 MB, toplamda yaklaşık 10–100 MB
          test verisi kullanılır. Yüklenen veri rastgele üretilir; kişisel
          dosyaların gönderilmez.
        </p>
        {result && (
          <p className="network-service-note">
            Aktarım: {number(result.downloadBytes / 1e6)} MB indirme ·{' '}
            {number(result.uploadBytes / 1e6)} MB yükleme. Bu, seçilen sunucuya
            yapılan kısa süreli HTTP aktarım ölçümüdür; yüksek hızlı hatlarda 50
            MB sınırı ölçüm hassasiyetini azaltabilir.
          </p>
        )}
      </section>
      {error && (
        <p className="photo-error" role="alert">
          {error}
        </p>
      )}
      <section
        className="network-history"
        aria-labelledby="speed-history-title"
      >
        <div className="network-section-heading">
          <h2 id="speed-history-title">
            Test geçmişi <span>{history.length} / 50</span>
          </h2>
          {history.length > 0 && (
            <div className="network-actions">
              <button
                type="button"
                className="pill-button"
                onClick={exportHistory}
              >
                <Download size={13} aria-hidden="true" /> CSV indir
              </button>
              <button
                type="button"
                className="pill-button"
                onClick={() => setConfirmClear(true)}
              >
                <Trash2 size={13} aria-hidden="true" /> Temizle
              </button>
            </div>
          )}
        </div>
        {confirmClear && (
          <div className="network-clear-confirm">
            <p>Bu tarayıcıdaki tüm hız testi sonuçları silinsin mi?</p>
            <button
              type="button"
              className="pill-button"
              onClick={clearHistory}
            >
              Geçmişi sil
            </button>
            <button
              type="button"
              className="pill-button"
              onClick={() => setConfirmClear(false)}
            >
              Vazgeç
            </button>
          </div>
        )}
        {history.length ? (
          <div
            className="network-table-wrap"
            role="region"
            aria-label="Test geçmişi tablosu"
            tabIndex={0}
          >
            <table className="network-table">
              <caption className="sr-only">
                Son 50 tamamlanmış hız testi
              </caption>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>İndirme ({unit})</th>
                  <th>Yükleme ({unit})</th>
                  <th>Gecikme (ms)</th>
                  <th>Jitter (ms)</th>
                  <th>
                    <span className="sr-only">Sonuç görseli</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.timestamp).toLocaleString('tr-TR')}</td>
                    <td>{speed(r.download)}</td>
                    <td>{speed(r.upload)}</td>
                    <td>{number(r.latency)}</td>
                    <td>{number(r.jitter)}</td>
                    <td>
                      <button
                        type="button"
                        className="speed-history-image"
                        disabled={exporting}
                        onClick={() => void exportResult(r)}
                        aria-label={`${new Date(r.timestamp).toLocaleString('tr-TR')} tarihli testin görselini indir`}
                      >
                        <ImageDown size={14} aria-hidden="true" /> Görsel indir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="network-empty">
            Henüz bir test sonucu yok. Tamamlanan son 50 test bu tarayıcıda
            saklanır.
          </p>
        )}
      </section>
    </>
  );
}
