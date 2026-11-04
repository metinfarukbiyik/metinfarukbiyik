'use client';

import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  Copy,
  Eye,
  EyeOff,
  FileCode2,
  ImageDown,
  ImagePlus,
  Link2,
  LockKeyhole,
  Mail,
  Phone,
  QrCode,
  RotateCcw,
  Type,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  buildPayload,
  createMatrix,
  defaultContent,
  defaultStyle,
  qrFileName,
  renderQrSvg,
  styleWarning,
  validateContent,
  type EyeStyle,
  type ErrorLevel,
  type ModuleStyle,
  type QrContent,
  type QrKind,
  type QrStyle,
  type WifiSecurity,
} from '@/lib/qr-code';
import { copyPng, saveBlob, svgToPng } from '@/lib/svg-export';
import { Field, Options, Step } from './ToolForm';

const kinds: { value: QrKind; label: string; icon: LucideIcon }[] = [
  { value: 'url', label: 'Bağlantı', icon: Link2 },
  { value: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { value: 'text', label: 'Metin', icon: Type },
  { value: 'email', label: 'E-posta', icon: Mail },
  { value: 'phone', label: 'Telefon', icon: Phone },
];

const presets = [
  { name: 'Mürekkep', foreground: '#1e2227', background: '#ffffff' },
  { name: 'Petrol', foreground: '#33625c', background: '#f6f4ef' },
  { name: 'Gece mavisi', foreground: '#2f4a66', background: '#ffffff' },
  { name: 'Kil', foreground: '#8a4a2c', background: '#fbf6f1' },
  { name: 'Siyah', foreground: '#000000', background: '#ffffff' },
];

const moduleStyles: { value: ModuleStyle; label: string }[] = [
  { value: 'square', label: 'Kare' },
  { value: 'rounded', label: 'Yumuşak' },
  { value: 'dots', label: 'Nokta' },
];

const eyeStyles: { value: EyeStyle; label: string }[] = [
  { value: 'square', label: 'Kare' },
  { value: 'rounded', label: 'Yuvarlak köşe' },
  { value: 'circle', label: 'Daire' },
];

const errorLevels: { value: ErrorLevel; label: string; hint: string }[] = [
  { value: 'L', label: 'L', hint: '%7' },
  { value: 'M', label: 'M', hint: '%15' },
  { value: 'Q', label: 'Q', hint: '%25' },
  { value: 'H', label: 'H', hint: '%30' },
];

const pngSizes = [512, 1024, 2048];

/** Downscales an uploaded logo so the exported SVG stays small. */
function readLogo(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 256 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      URL.revokeObjectURL(url);
      if (!context) return reject(new Error('canvas'));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('image'));
    };
    image.src = url;
  });
}

export default function QrCodeTool() {
  const [content, setContent] = useState<QrContent>(defaultContent);
  const [style, setStyle] = useState<QrStyle>(defaultStyle);
  const [showPassword, setShowPassword] = useState(false);
  const [pngSize, setPngSize] = useState(1024);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const logoInput = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<QrContent>) => setContent((current) => ({ ...current, ...patch }));
  const updateStyle = (patch: Partial<QrStyle>) => setStyle((current) => ({ ...current, ...patch }));

  const payload = buildPayload(content);
  const contentProblem = validateContent(content);
  const warning = styleWarning(style);

  const rendered = useMemo(() => {
    if (!payload) return null;
    try {
      const matrix = createMatrix(payload, style.errorLevel);
      return { svg: renderQrSvg(matrix, style), size: matrix.size };
    } catch {
      return { svg: null, size: 0 };
    }
  }, [payload, style]);

  const svg = rendered?.svg ?? null;
  const preview = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  const shownPayload =
    content.kind === 'wifi' && content.password && !showPassword
      ? payload.replace(/P:(?:\\.|[^;])*/, 'P:••••••')
      : payload;

  async function handleLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Logo için bir görsel dosyası seç.');
    if (file.size > 5 * 1024 * 1024) return setError('Logo en fazla 5 MB olabilir.');
    try {
      const logo = await readLogo(file);
      // A logo hides modules; the highest error correction keeps the code readable.
      updateStyle({ logo, errorLevel: 'H' });
      setError('');
      setStatus('Logo eklendi; hata düzeltme seviyesi H olarak ayarlandı.');
    } catch {
      setError('Logo okunamadı. Farklı bir görsel dene.');
    }
  }

  async function download(type: 'png' | 'svg') {
    if (!svg) return;
    setError('');
    try {
      if (type === 'svg') saveBlob(new Blob([svg], { type: 'image/svg+xml' }), qrFileName(content.kind, 'svg'));
      else saveBlob(await svgToPng(svg, pngSize), qrFileName(content.kind, 'png'));
      setStatus(`${type.toUpperCase()} indirme işlemi başlatıldı.`);
    } catch {
      setError('Görsel hazırlanamadı. Lütfen tekrar dene.');
    }
  }

  async function copyImage() {
    if (!svg) return;
    setError('');
    try {
      await copyPng(await svgToPng(svg, pngSize));
      setStatus('QR kod panoya kopyalandı.');
    } catch {
      setError('Bu tarayıcı görsel kopyalamayı desteklemiyor; PNG olarak indirebilirsin.');
    }
  }

  return (
    <>
      <p className="photo-privacy">
        <LockKeyhole aria-hidden="true" /> QR kod tarayıcında üretilir; girdiğin bilgiler hiçbir sunucuya
        gönderilmez.
      </p>
      <div className="photo-workspace qr-workspace">
        <section className="photo-controls" aria-label="QR kod içeriği ve görünümü">
          <Step index={1} title="Ne paylaşmak istiyorsun?">
            <Options
              legend="İçerik türü"
              name="qr-kind"
              options={kinds}
              value={content.kind}
              onChange={(kind) => update({ kind })}
              className="qr-kinds"
            />

            {content.kind === 'url' && (
              <Field id="qr-url" label="Bağlantı (URL)" hint="https:// otomatik eklenir">
                <input
                  id="qr-url"
                  className="input mono"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="biyik.dev"
                  value={content.url}
                  onChange={(e) => update({ url: e.target.value })}
                />
              </Field>
            )}

            {content.kind === 'wifi' && (
              <>
                <Field id="qr-ssid" label="Ağ adı (SSID)" hint="büyük/küçük harf duyarlı">
                  <input
                    id="qr-ssid"
                    className="input"
                    autoComplete="off"
                    placeholder="Ev_Wifi"
                    value={content.ssid}
                    onChange={(e) => update({ ssid: e.target.value })}
                  />
                </Field>
                <Options
                  legend="Güvenlik"
                  name="qr-security"
                  options={[
                    { value: 'WPA', label: 'WPA/WPA2/WPA3' },
                    { value: 'WEP', label: 'WEP' },
                    { value: 'nopass', label: 'Şifresiz' },
                  ]}
                  value={content.security}
                  onChange={(security: WifiSecurity) => update({ security })}
                />
                {content.security !== 'nopass' && (
                  <Field id="qr-password" label="Şifre">
                    <div className="input-group">
                      <input
                        id="qr-password"
                        className="input mono"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                        value={content.password}
                        onChange={(e) => update({ password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-icon"
                        aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                      </button>
                    </div>
                  </Field>
                )}
                <label className="photo-checkbox">
                  <input
                    type="checkbox"
                    checked={content.hidden}
                    onChange={(e) => update({ hidden: e.target.checked })}
                  />
                  Gizli ağ (SSID yayınlanmıyor)
                </label>
              </>
            )}

            {content.kind === 'text' && (
              <Field id="qr-text" label="Metin" hint={`${content.text.length} karakter`}>
                <textarea
                  id="qr-text"
                  className="input"
                  rows={4}
                  placeholder="Kodu okutan kişinin göreceği metin"
                  value={content.text}
                  onChange={(e) => update({ text: e.target.value })}
                />
              </Field>
            )}

            {content.kind === 'email' && (
              <>
                <Field id="qr-email" label="Alıcı e-posta">
                  <input
                    id="qr-email"
                    className="input"
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@alanadi.com"
                    value={content.email}
                    onChange={(e) => update({ email: e.target.value })}
                  />
                </Field>
                <Field id="qr-subject" label="Konu" hint="isteğe bağlı">
                  <input
                    id="qr-subject"
                    className="input"
                    value={content.subject}
                    onChange={(e) => update({ subject: e.target.value })}
                  />
                </Field>
                <Field id="qr-body" label="Mesaj" hint="isteğe bağlı">
                  <textarea
                    id="qr-body"
                    className="input"
                    rows={3}
                    value={content.body}
                    onChange={(e) => update({ body: e.target.value })}
                  />
                </Field>
              </>
            )}

            {content.kind === 'phone' && (
              <Field id="qr-phone" label="Telefon numarası" hint="ülke koduyla">
                <input
                  id="qr-phone"
                  className="input mono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+90 5xx xxx xx xx"
                  value={content.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                />
              </Field>
            )}
          </Step>

          <Step index={2} title="Görünümü özelleştir">
            <fieldset className="photo-field">
              <legend>Hazır renkler</legend>
              <div className="qr-presets">
                {presets.map((preset) => {
                  const active =
                    style.foreground === preset.foreground &&
                    style.background === preset.background &&
                    style.eyeColor === preset.foreground;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      className="qr-preset"
                      aria-pressed={active}
                      aria-label={preset.name}
                      title={preset.name}
                      style={{ background: preset.background, color: preset.foreground }}
                      onClick={() =>
                        updateStyle({
                          foreground: preset.foreground,
                          eyeColor: preset.foreground,
                          background: preset.background,
                        })
                      }
                    >
                      <QrCode aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="qr-colors">
              {(
                [
                  ['foreground', 'Kod'],
                  ['eyeColor', 'Köşeler'],
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
            <label className="photo-checkbox qr-check">
              <input
                type="checkbox"
                checked={style.transparent}
                onChange={(e) => updateStyle({ transparent: e.target.checked })}
              />
              Saydam zemin (PNG ve SVG)
            </label>
            <Options
              legend="Modül biçimi"
              name="qr-module"
              options={moduleStyles}
              value={style.moduleStyle}
              onChange={(moduleStyle) => updateStyle({ moduleStyle })}
            />
            <Options
              legend="Köşe biçimi"
              name="qr-eye"
              options={eyeStyles}
              value={style.eyeStyle}
              onChange={(eyeStyle) => updateStyle({ eyeStyle })}
            />
          </Step>

          <Step index={3} title="Logo, yazı ve dayanıklılık">
            <Field id="qr-caption" label="Alt yazı" hint="isteğe bağlı">
              <input
                id="qr-caption"
                className="input"
                maxLength={40}
                placeholder={content.kind === 'wifi' ? 'Wi-Fi’ye bağlanmak için okut' : 'Örn. Menüyü görüntüle'}
                value={style.caption}
                onChange={(e) => updateStyle({ caption: e.target.value })}
              />
            </Field>
            <div className="form-field">
              <span className="form-label">
                Ortadaki logo <span>PNG, JPG, SVG · cihazında kalır</span>
              </span>
              <input ref={logoInput} type="file" accept="image/*" className="photo-file-input" onChange={handleLogo} />
              <div className="qr-logo-row">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => logoInput.current?.click()}
                >
                  <ImagePlus aria-hidden="true" /> {style.logo ? 'Logoyu değiştir' : 'Logo ekle'}
                </button>
                {style.logo && (
                  <button type="button" className="btn btn-sm btn-ghost" onClick={() => updateStyle({ logo: null })}>
                    <X aria-hidden="true" /> Kaldır
                  </button>
                )}
              </div>
              {style.logo && (
                <div className="photo-crop-controls qr-range">
                  <label htmlFor="qr-logo-size">
                    Logo boyutu <output>%{Math.round(style.logoScale * 100)}</output>
                  </label>
                  <input
                    id="qr-logo-size"
                    type="range"
                    min={0.1}
                    max={0.3}
                    step={0.01}
                    value={style.logoScale}
                    onChange={(e) => updateStyle({ logoScale: Number(e.target.value) })}
                  />
                </div>
              )}
            </div>
            <Options
              legend="Hata düzeltme (hasarlıyken okunabilirlik)"
              name="qr-level"
              options={errorLevels}
              value={style.errorLevel}
              onChange={(errorLevel) => updateStyle({ errorLevel })}
              className="photo-count-options"
            />
            <div className="photo-crop-controls qr-range">
              <label htmlFor="qr-margin">
                Kenar boşluğu <output>{style.margin} modül</output>
              </label>
              <input
                id="qr-margin"
                type="range"
                min={0}
                max={8}
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

        <section className="photo-preview qr-preview" aria-labelledby="qr-preview-title">
          <div className="photo-preview-heading">
            <h2 id="qr-preview-title">Önizleme</h2>
            <span>{rendered?.size ? `${rendered.size} × ${rendered.size} modül · ${style.errorLevel}` : 'canlı'}</span>
          </div>
          <div className="qr-stage" data-transparent={style.transparent || undefined}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element -- generated data URL, not an optimisable asset
              <img src={preview} alt={`QR kod: ${shownPayload}`} className="qr-image" />
            ) : (
              <div className="qr-empty">
                <QrCode aria-hidden="true" />
                <p>
                  {rendered && !rendered.svg
                    ? 'İçerik bu boyutta bir QR koda sığmıyor. Metni kısalt veya hata düzeltmeyi düşür.'
                    : 'İçeriği girdiğinde QR kodun burada belirir.'}
                </p>
              </div>
            )}
          </div>
          {payload && (
            <p className="qr-payload mono" title={shownPayload}>
              {shownPayload}
            </p>
          )}
          {(contentProblem || warning) && (
            <p className="photo-quality-note" role="status">
              {contentProblem ?? warning}
            </p>
          )}
          <div className="photo-download qr-download">
            <label className="photo-select-label" htmlFor="qr-png-size">
              PNG çözünürlüğü
            </label>
            <select
              id="qr-png-size"
              className="photo-select"
              value={pngSize}
              onChange={(e) => setPngSize(Number(e.target.value))}
            >
              {pngSizes.map((size) => (
                <option key={size} value={size}>
                  {size} × {size} px{size === 1024 ? ' · önerilen' : size === 2048 ? ' · baskı' : ''}
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
            <p>SVG; matbaa, afiş ve tabelalar için kalite kaybı olmadan büyütülebilir.</p>
          </div>
          {error && (
            <p className="photo-error" role="alert">
              {error}
            </p>
          )}
          <p className="photo-status" role="status">
            {status}
          </p>
        </section>
      </div>
    </>
  );
}
