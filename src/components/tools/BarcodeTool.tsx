'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Barcode, Copy, FileCode2, ImageDown, LockKeyhole, RotateCcw } from 'lucide-react';
import {
  barcodeFileName,
  barcodeFormats,
  barcodeWarning,
  defaultOptions,
  defaultStyle,
  encodeBarcode,
  getFormat,
  gs1Hint,
  renderBarcodeSvg,
  validateBarcode,
  type BarcodeFormat,
  type BarcodeOptions,
  type BarcodeStyle,
} from '@/lib/barcode';
import { copyPng, saveBlob, svgToPng } from '@/lib/svg-export';
import { Field, Options, Step } from './ToolForm';

const presets = [
  { name: 'Mürekkep', foreground: '#1e2227', background: '#ffffff' },
  { name: 'Siyah', foreground: '#000000', background: '#ffffff' },
  { name: 'Gece mavisi', foreground: '#1f3a57', background: '#ffffff' },
  { name: 'Kraft etiket', foreground: '#1e2227', background: '#f3ead9' },
];

/** Pixels per module: integer scales keep every bar edge sharp. */
const scales = [
  { value: 2, label: 'Ekran' },
  { value: 4, label: 'Önerilen' },
  { value: 8, label: 'Baskı' },
];

const initialValues = Object.fromEntries(barcodeFormats.map((format) => [format.value, format.placeholder])) as Record<
  BarcodeFormat,
  string
>;

export default function BarcodeTool() {
  const [format, setFormat] = useState<BarcodeFormat>('ean13');
  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState<BarcodeOptions>(defaultOptions);
  const [style, setStyle] = useState<BarcodeStyle>(defaultStyle);
  const [scale, setScale] = useState(4);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const info = getFormat(format);
  const value = values[format];
  const problem = validateBarcode(format, value);
  const updateStyle = (patch: Partial<BarcodeStyle>) => setStyle((current) => ({ ...current, ...patch }));

  const barcode = useMemo(
    () => (problem ? null : encodeBarcode(format, value, options)),
    [format, value, options, problem],
  );
  const rendered = useMemo(() => (barcode ? renderBarcodeSvg(barcode, style) : null), [barcode, style]);
  const svg = rendered?.svg ?? null;
  const width = rendered?.width ?? 0;
  const preview = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  const warning = barcodeWarning(barcode, style);
  const prefix = barcode ? gs1Hint(barcode) : null;

  async function download(type: 'png' | 'svg') {
    if (!svg || !barcode) return;
    setError('');
    try {
      if (type === 'svg') saveBlob(new Blob([svg], { type: 'image/svg+xml' }), barcodeFileName(barcode, 'svg'));
      else saveBlob(await svgToPng(svg, Math.round(width * scale)), barcodeFileName(barcode, 'png'));
      setStatus(`${type.toUpperCase()} indirme işlemi başlatıldı.`);
    } catch {
      setError('Görsel hazırlanamadı. Lütfen tekrar dene.');
    }
  }

  async function copyImage() {
    if (!svg) return;
    setError('');
    try {
      await copyPng(await svgToPng(svg, Math.round(width * scale)));
      setStatus('Barkod panoya kopyalandı.');
    } catch {
      setError('Bu tarayıcı görsel kopyalamayı desteklemiyor; PNG olarak indirebilirsin.');
    }
  }

  return (
    <>
      <p className="photo-privacy">
        <LockKeyhole aria-hidden="true" /> Barkod tarayıcında üretilir; girdiğin numaralar hiçbir sunucuya
        gönderilmez.
      </p>
      <div className="photo-workspace qr-workspace">
        <section className="photo-controls" aria-label="Barkod türü, değeri ve görünümü">
          <Step index={1} title="Barkod türü ve değeri">
            <Options
              legend="Barkod türü"
              name="barcode-format"
              options={barcodeFormats.map(({ value, label }) => ({ value, label }))}
              value={format}
              onChange={setFormat}
              className="barcode-formats"
            />
            <p className="barcode-usage">{info.usage}</p>
            <Field id="barcode-value" label={info.numeric ? 'Numara' : 'Değer'} hint={info.hint}>
              <input
                id="barcode-value"
                className="input mono"
                inputMode={info.numeric ? 'numeric' : 'text'}
                autoComplete="off"
                spellCheck={false}
                placeholder={info.placeholder}
                value={value}
                onChange={(e) => setValues((current) => ({ ...current, [format]: e.target.value }))}
              />
            </Field>
            {format === 'code39' && (
              <label className="photo-checkbox">
                <input
                  type="checkbox"
                  checked={options.code39Check}
                  onChange={(e) => setOptions({ code39Check: e.target.checked })}
                />
                Kontrol karakteri ekle (mod 43)
              </label>
            )}
            {barcode?.check && (
              <p className="barcode-check mono">
                kontrol {info.numeric ? 'hanesi' : 'karakteri'}: <strong>{barcode.check}</strong>
                {prefix && <span> · {prefix}</span>}
              </p>
            )}
          </Step>

          <Step index={2} title="Görünümü özelleştir">
            <fieldset className="photo-field">
              <legend>Hazır renkler</legend>
              <div className="qr-presets">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    className="qr-preset"
                    aria-pressed={style.foreground === preset.foreground && style.background === preset.background}
                    aria-label={preset.name}
                    title={preset.name}
                    style={{ background: preset.background, color: preset.foreground }}
                    onClick={() => updateStyle({ foreground: preset.foreground, background: preset.background })}
                  >
                    <Barcode aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="qr-colors barcode-colors">
              {(
                [
                  ['foreground', 'Çubuklar'],
                  ['background', 'Zemin'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="qr-color">
                  <input
                    type="color"
                    value={style[key]}
                    disabled={key === 'background' && style.transparent}
                    onChange={(e) => updateStyle({ [key]: e.target.value })}
                  />
                  <span>
                    {label}
                    <small className="mono">{style[key]}</small>
                  </span>
                </label>
              ))}
            </div>
            <label className="photo-checkbox">
              <input
                type="checkbox"
                checked={style.showText}
                onChange={(e) => updateStyle({ showText: e.target.checked })}
              />
              Numarayı barkodun altında göster
            </label>
            <label className="photo-checkbox qr-check">
              <input
                type="checkbox"
                checked={style.transparent}
                onChange={(e) => updateStyle({ transparent: e.target.checked })}
              />
              Saydam zemin (PNG ve SVG)
            </label>
            <div className="photo-crop-controls qr-range">
              <label htmlFor="barcode-height">
                Çubuk yüksekliği <output>{style.height} modül</output>
              </label>
              <input
                id="barcode-height"
                type="range"
                min={20}
                max={120}
                step={5}
                value={style.height}
                onChange={(e) => updateStyle({ height: Number(e.target.value) })}
              />
            </div>
            <div className="photo-crop-controls qr-range">
              <label htmlFor="barcode-margin">
                Kenar boşluğu <output>{style.margin} modül</output>
              </label>
              <input
                id="barcode-margin"
                type="range"
                min={0}
                max={20}
                step={1}
                value={style.margin}
                onChange={(e) => updateStyle({ margin: Number(e.target.value) })}
              />
            </div>
            <button
              type="button"
              className="photo-reset"
              onClick={() => {
                setStyle(defaultStyle);
                setStatus('Görünüm varsayılana döndürüldü.');
              }}
            >
              <RotateCcw size={13} aria-hidden="true" /> Görünümü sıfırla
            </button>
          </Step>
        </section>

        <section className="photo-preview qr-preview barcode-preview" aria-labelledby="barcode-preview-title">
          <div className="photo-preview-heading">
            <h2 id="barcode-preview-title">Önizleme</h2>
            <span>{barcode ? `${info.label} · ${barcode.modules.length} modül` : 'canlı'}</span>
          </div>
          <div className="qr-stage barcode-stage" data-transparent={style.transparent || undefined}>
            {preview && barcode ? (
              // eslint-disable-next-line @next/next/no-img-element -- generated data URL, not an optimisable asset
              <img src={preview} alt={`${info.label} barkod: ${barcode.text}`} className="barcode-image" />
            ) : (
              <div className="qr-empty">
                <Barcode aria-hidden="true" />
                <p>Geçerli bir değer girdiğinde barkodun burada belirir.</p>
              </div>
            )}
          </div>
          {barcode && (
            <p className="qr-payload mono" title={barcode.text}>
              {barcode.text}
            </p>
          )}
          {(problem || warning) && (
            <p className="photo-quality-note" role="status">
              {problem ?? warning}
            </p>
          )}
          <div className="photo-download qr-download">
            <label className="photo-select-label" htmlFor="barcode-scale">
              PNG çözünürlüğü
            </label>
            <select
              id="barcode-scale"
              className="photo-select"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            >
              {scales.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value} px/modül{width ? ` · ${Math.round(width * option.value)} px` : ''} · {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-accent btn-lg btn-block"
              disabled={!svg}
              onClick={() => void download('png')}
            >
              <ImageDown aria-hidden="true" /> PNG indir
            </button>
            <div className="qr-secondary-actions">
              <button type="button" className="btn btn-sm" disabled={!svg} onClick={() => void download('svg')}>
                <FileCode2 aria-hidden="true" /> SVG (vektör)
              </button>
              <button type="button" className="btn btn-sm" disabled={!svg} onClick={() => void copyImage()}>
                <Copy aria-hidden="true" /> Kopyala
              </button>
            </div>
            <p>
              Etiket ve ambalaj baskısında SVG kullan; çubuk kenarları her boyutta keskin kalır.
            </p>
          </div>
          {error && (
            <p className="photo-error" role="alert">
              {error}
            </p>
          )}
          <p className="photo-status" role="status">
            {status}
          </p>
          <Link href="/projeler/byk-seri-baski-pro" className="barcode-bulk">
            <span>
              <strong>Yüzlerce etiket mi basacaksın?</strong>
              Excel listesinden toplu barkod için BYK Seri Baskı Pro
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </>
  );
}
