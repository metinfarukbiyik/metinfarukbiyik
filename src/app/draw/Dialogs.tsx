'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ClipboardCopy, Download, X } from 'lucide-react';
import { exportToCanvas, exportToSvg, type Editor } from '@/lib/sketch';

export function Dialog({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRef.current();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      prev?.focus?.();
    };
  }, []);

  return (
    <div className="sk-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        className={`sk-dialog${wide ? ' is-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <header className="sk-dialog-head">
          <h2>{title}</h2>
          <button type="button" className="sk-icon-btn" onClick={onClose} aria-label="Kapat">
            <X size={16} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

function download(href: string, name: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  a.click();
}

const fileStamp = () => {
  const d = new Date();
  const p = (v: number) => String(v).padStart(2, '0');
  return `cizim-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
};

export function ExportDialog({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const hasSelection = editor.state.selectedIds.length > 0;
  const [onlySelected, setOnlySelected] = useState(hasSelection);
  const [withBackground, setWithBackground] = useState(true);
  const [dark, setDark] = useState(editor.state.theme === 'dark');
  const [scale, setScale] = useState(2);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const elements = onlySelected && hasSelection ? editor.selectedElements() : editor.elements;
  const options = { background: withBackground ? editor.state.background : null, theme: dark ? 'dark' : 'light', scale } as const;

  useEffect(() => {
    let cancelled = false;
    if (!elements.length) return;
    exportToCanvas(elements, editor.files, { ...options, scale: 1 }).then((c) => {
      if (!cancelled) setPreview(c.toDataURL('image/png'));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlySelected, withBackground, dark]);

  const png = async () => {
    const canvas = await exportToCanvas(elements, editor.files, options);
    download(canvas.toDataURL('image/png'), `${fileStamp()}.png`);
  };
  const svg = () => {
    const blob = new Blob([exportToSvg(elements, editor.files, options)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    download(url, `${fileStamp()}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const copy = async () => {
    try {
      const canvas = await exportToCanvas(elements, editor.files, options);
      const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'));
      if (!blob) throw new Error('blob');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setStatus('Panoya kopyalandı');
    } catch {
      setStatus('Bu tarayıcı görseli panoya kopyalamaya izin vermedi');
    }
  };

  return (
    <Dialog title="Görsel olarak dışa aktar" onClose={onClose} wide>
      {!elements.length ? (
        <p className="sk-muted">Dışa aktarılacak bir şey yok. Önce bir şeyler çiz.</p>
      ) : (
        <div className="sk-export">
          <div className={`sk-export-preview${withBackground ? '' : ' is-checker'}`}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Dışa aktarma önizlemesi" />
            ) : (
              <span className="sk-muted">Hazırlanıyor…</span>
            )}
          </div>
          <div className="sk-export-options">
            {hasSelection && (
              <label className="sk-check">
                <input type="checkbox" checked={onlySelected} onChange={(e) => setOnlySelected(e.target.checked)} />
                Yalnızca seçili öğeler
              </label>
            )}
            <label className="sk-check">
              <input type="checkbox" checked={withBackground} onChange={(e) => setWithBackground(e.target.checked)} />
              Arka planı dahil et
            </label>
            <label className="sk-check">
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
              Koyu tema
            </label>
            <div className="sk-scale" role="group" aria-label="Ölçek">
              <span>Ölçek</span>
              {[1, 2, 3].map((s) => (
                <button key={s} type="button" className="sk-opt" aria-pressed={scale === s} onClick={() => setScale(s)}>
                  {s}×
                </button>
              ))}
            </div>
            <div className="sk-export-actions">
              <button type="button" className="sk-btn is-primary" onClick={png}>
                <Download size={15} /> PNG
              </button>
              <button type="button" className="sk-btn" onClick={svg}>
                <Download size={15} /> SVG
              </button>
              <button type="button" className="sk-btn" onClick={copy}>
                <ClipboardCopy size={15} /> Kopyala
              </button>
            </div>
            {status && (
              <p className="sk-muted" role="status">
                {status}
              </p>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}

const mod = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';

const SHORTCUTS: [string, [string, string][]][] = [
  [
    'Araçlar',
    [
      ['Seç', 'V · 1'],
      ['El (kaydır)', 'H · Boşluk'],
      ['Dikdörtgen', 'R · 2'],
      ['Eşkenar dörtgen', 'D · 3'],
      ['Elips', 'O · 4'],
      ['Ok', 'A · 5'],
      ['Çizgi', 'L · 6'],
      ['Kalem', 'P · 7'],
      ['Metin', 'T · 8'],
      ['Görsel', '9'],
      ['Silgi', 'E · 0'],
      ['Aracı kilitle', 'Q'],
    ],
  ],
  [
    'Düzenleme',
    [
      ['Geri al', `${mod} Z`],
      ['Yinele', `${mod} ⇧ Z`],
      ['Kopyala / Kes / Yapıştır', `${mod} C / X / V`],
      ['Çoğalt', `${mod} D`],
      ['Tümünü seç', `${mod} A`],
      ['Sil', 'Delete'],
      ['Grupla / Çöz', `${mod} G / ${mod} ⇧ G`],
      ['Öne / arkaya al', `${mod} ] / ${mod} [`],
      ['Kopyalayarak taşı', 'Alt + sürükle'],
      ['Oranı koru · 15° adım', 'Shift'],
      ['Metni düzenle', 'Çift tık · Enter'],
      ['Çok noktalı çizgi', 'Tıkla, tıkla… · Enter'],
    ],
  ],
  [
    'Görünüm',
    [
      ['Yakınlaştır / uzaklaştır', `${mod} + / ${mod} −`],
      ['%100', `${mod} 0`],
      ['Tümünü sığdır', '⇧ 1'],
      ['Seçimi sığdır', '⇧ 2'],
      ['Izgara', `${mod} '`],
      ['Kaydet / Aç', `${mod} S / ${mod} O`],
      ['Dışa aktar', `${mod} ⇧ E`],
      ['Kısayollar', '?'],
    ],
  ],
];

export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog title="Klavye kısayolları" onClose={onClose} wide>
      <div className="sk-help">
        {SHORTCUTS.map(([group, rows]) => (
          <section key={group}>
            <h3>{group}</h3>
            <dl>
              {rows.map(([label, keys]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <kbd>{keys}</kbd>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className="sk-muted sk-help-foot">
        Çizimlerin yalnızca bu tarayıcıda saklanır; hiçbir şey sunucuya gönderilmez. Başka bir cihaza taşımak için
        menüden <strong>Kaydet</strong> ile dosya olarak indir.
      </p>
    </Dialog>
  );
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog title={title} onClose={onClose}>
      <p className="sk-muted">{message}</p>
      <div className="sk-dialog-actions">
        <button type="button" className="sk-btn" onClick={onClose}>
          Vazgeç
        </button>
        <button
          type="button"
          className="sk-btn is-danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  );
}
