'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react';
import {
  Download,
  ImagePlus,
  LockKeyhole,
  RotateCcw,
  ScanFace,
  Upload,
} from 'lucide-react';
import {
  createPhotoPdf,
  drawCrop,
  paperSizes,
  photoDocumentName,
  type PaperSize,
  type PaperOrientation,
  photoLayout,
  photoSizes,
  mmToPixels,
  type PhotoCount,
  type PhotoSize,
} from '@/lib/passport-photo';

import {
  createPhotoRaster,
  photoFormats,
  type PhotoFormat,
} from '@/lib/photo-export';

const initialCrop = { zoom: 1, horizontal: 50, vertical: 50 };
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export default function PassportPhotoTool() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [filename, setFilename] = useState('');
  const [size, setSize] = useState<PhotoSize>('standard');
  const [count, setCount] = useState<PhotoCount>(4);
  const [format, setFormat] = useState<PhotoFormat>('pdf');
  const [jpegQuality, setJpegQuality] = useState('0.95');
  const [exportPages, setExportPages] = useState('all');
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [orientation, setOrientation] = useState<PaperOrientation>('auto');
  const [previewPage, setPreviewPage] = useState(0);
  const [documentTitle, setDocumentTitle] = useState('Vesikalık Fotoğraf');
  const [crop, setCrop] = useState(initialCrop);
  const [marks, setMarks] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const cropCanvas = useRef<HTMLCanvasElement>(null);
  const sheetCanvas = useRef<HTMLCanvasElement>(null);
  const uploadVersion = useRef(0);
  const drag = useRef<{
    x: number;
    y: number;
    horizontal: number;
    vertical: number;
  } | null>(null);
  const dimensions = photoSizes[size];
  const layout = photoLayout(size, count, paperSize, orientation);
  const pageIndex = Math.min(previewPage, layout.pages.length - 1);
  const paper = layout.paper;
  const baseName = photoDocumentName(
    size,
    count,
    paperSize,
    documentTitle,
  ).replace(/\.pdf$/, '');
  const documentName =
    format === 'pdf'
      ? `${baseName}.pdf`
      : `${baseName}${layout.pages.length > 1 && exportPages === 'all' ? `_${format.toUpperCase()}.zip` : `${layout.pages.length > 1 ? `_Sayfa-${String(pageIndex + 1).padStart(2, '0')}` : ''}.${format === 'jpeg' ? 'jpg' : 'png'}`}`;
  const effectivePpi = image
    ? Math.round(
        300 /
          (Math.max(
            mmToPixels(dimensions.width) / image.naturalWidth,
            mmToPixels(dimensions.height) / image.naturalHeight,
          ) *
            crop.zoom),
      )
    : null;
  const scale = image
    ? Math.max(
        mmToPixels(dimensions.width) / image.naturalWidth,
        mmToPixels(dimensions.height) / image.naturalHeight,
      ) * crop.zoom
    : 1;
  const lowResolution =
    image &&
    (mmToPixels(dimensions.width) / scale < mmToPixels(dimensions.width) ||
      mmToPixels(dimensions.height) / scale < mmToPixels(dimensions.height));

  useEffect(() => {
    const cropped = cropCanvas.current;
    const sheet = sheetCanvas.current;
    if (!image || !cropped || !sheet) return;
    drawCrop(cropped, image, size, crop.zoom, crop.horizontal, crop.vertical);
    // Preview coordinates are three pixels per millimetre; the PDF keeps exact physical sizes.
    sheet.width = paper.width * 3;
    sheet.height = paper.height * 3;
    const context = sheet.getContext('2d');
    if (!context) return;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, sheet.width, sheet.height);
    context.strokeStyle = '#a6a6a6';
    context.lineWidth = 0.6;
    for (const cell of photoLayout(size, count, paperSize, orientation).pages[
      pageIndex
    ]) {
      context.drawImage(
        cropped,
        cell.x * 3,
        cell.y * 3,
        cell.width * 3,
        cell.height * 3,
      );
      if (marks) {
        for (const x of [cell.x, cell.x + cell.width]) {
          for (const y of [cell.y, cell.y + cell.height]) {
            const dx = x === cell.x ? -1 : 1;
            const dy = y === cell.y ? -1 : 1;
            context.beginPath();
            context.moveTo((x + dx * 0.4) * 3, y * 3);
            context.lineTo((x + dx * 1.5) * 3, y * 3);
            context.moveTo(x * 3, (y + dy * 0.4) * 3);
            context.lineTo(x * 3, (y + dy * 1.5) * 3);
            context.stroke();
          }
        }
      }
    }
  }, [
    image,
    size,
    count,
    crop,
    marks,
    paperSize,
    orientation,
    pageIndex,
    paper.width,
    paper.height,
  ]);

  function loadPhoto(file?: File) {
    if (!file) return;
    const version = ++uploadVersion.current;
    setError('');
    setStatus('');
    setLoading(false);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError(
        'Lütfen JPG, PNG veya WebP biçiminde bir fotoğraf seç. HEIC fotoğraflarını önce JPG olarak dışa aktar.',
      );
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Fotoğraf en fazla 20 MB olabilir. Daha küçük bir dosya seç.');
      return;
    }
    setLoading(true);
    const url = URL.createObjectURL(file);
    const nextImage = new Image();
    nextImage.onload = () => {
      URL.revokeObjectURL(url);
      if (version !== uploadVersion.current) return;
      setLoading(false);
      if (nextImage.naturalWidth * nextImage.naturalHeight > 40_000_000) {
        setError(
          'Fotoğraf en fazla 40 megapiksel olabilir. Boyutunu küçültüp tekrar dene.',
        );
        return;
      }
      setImage(nextImage);
      setFilename(file.name);
      setCrop(initialCrop);
      setStatus('Fotoğraf yüklendi. Kadrajını ayarlayabilirsin.');
    };
    nextImage.onerror = () => {
      URL.revokeObjectURL(url);
      if (version !== uploadVersion.current) return;
      setLoading(false);
      setError(
        'Bu fotoğraf açılamadı. Geçerli bir JPG, PNG veya WebP dosyasıyla tekrar dene.',
      );
    };
    nextImage.src = url;
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    loadPhoto(event.target.files?.[0]);
    event.target.value = '';
  }

  function moveCrop(event: PointerEvent<HTMLCanvasElement>) {
    const activeDrag = drag.current;
    if (!activeDrag || !image) return;
    const previewWidth = event.currentTarget.getBoundingClientRect().width;
    const previewScale = previewWidth / mmToPixels(dimensions.width);
    const travelX =
      (image.naturalWidth * scale - mmToPixels(dimensions.width)) *
      previewScale;
    const travelY =
      (image.naturalHeight * scale - mmToPixels(dimensions.height)) *
      previewScale;
    setCrop((current) => ({
      ...current,
      horizontal:
        travelX > 0.01
          ? clamp(
              activeDrag.horizontal -
                ((event.clientX - activeDrag.x) * 100) / travelX,
            )
          : current.horizontal,
      vertical:
        travelY > 0.01
          ? clamp(
              activeDrag.vertical -
                ((event.clientY - activeDrag.y) * 100) / travelY,
            )
          : current.vertical,
    }));
  }

  async function download() {
    if (!image || !cropCanvas.current || loading) return;
    setDownloading(true);
    setError('');
    setStatus(`${photoFormats[format]} hazırlanıyor…`);
    try {
      // Copy now so an edit made while encoding cannot alter the pending download.
      const snapshot = document.createElement('canvas');
      drawCrop(
        snapshot,
        image,
        size,
        crop.zoom,
        crop.horizontal,
        crop.vertical,
      );
      const result =
        format === 'pdf'
          ? {
              blob: await createPhotoPdf(
                snapshot,
                size,
                count,
                marks,
                paperSize,
                orientation,
              ),
              name: `${baseName}.pdf`,
            }
          : await createPhotoRaster(
              snapshot,
              size,
              count,
              marks,
              paperSize,
              orientation,
              format,
              Number(jpegQuality),
              baseName,
              exportPages === 'current' ? pageIndex : undefined,
            );
      const blob = result.blob;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setStatus(
        `Dosya hazır; indirme başlatıldı. Yazdırırken ${paperSize}, ${layout.orientation === 'portrait' ? 'dikey' : 'yatay'} yön ve %100 / gerçek boyut seç.`,
      );
    } catch {
      setStatus('');
      setError('Dosya hazırlanamadı. Fotoğrafı yeniden yükleyip tekrar dene.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      <p className="photo-privacy">
        <LockKeyhole size={14} aria-hidden="true" /> Fotoğrafın cihazında kalır;
        sunucuya yüklenmez.
      </p>
      <div className="photo-workspace">
        <section
          className="photo-controls"
          aria-label="Fotoğraf ve şablon ayarları"
        >
          <div className="photo-step-title">
            <span>1</span>
            <h2>Fotoğrafını seç</h2>
          </div>
          <input
            ref={input}
            className="photo-file-input"
            id="passport-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
          />
          <button
            type="button"
            className={`photo-upload ${dragOver ? 'is-dragging' : ''}`}
            disabled={loading}
            onClick={() => input.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              loadPhoto(event.dataTransfer.files[0]);
            }}
          >
            {image ? (
              <ImagePlus size={22} aria-hidden="true" />
            ) : (
              <Upload size={22} aria-hidden="true" />
            )}
            <strong>
              {loading
                ? 'Fotoğraf açılıyor…'
                : image
                  ? 'Fotoğrafı değiştir'
                  : 'Fotoğraf yükle veya sürükle'}
            </strong>
            <span>JPG, PNG, WebP · En fazla 20 MB</span>
          </button>
          {filename && (
            <p className="photo-filename" title={filename}>
              {filename}
            </p>
          )}
          <div className="photo-step-title">
            <span>2</span>
            <h2>Kağıt, ölçü ve adet</h2>
          </div>
          <fieldset className="photo-field">
            <legend>Baskı kağıdı</legend>
            <div className="photo-options">
              {(Object.keys(paperSizes) as PaperSize[]).map((key) => (
                <label key={key}>
                  <input
                    type="radio"
                    name="paper-size"
                    value={key}
                    checked={paperSize === key}
                    onChange={() => setPaperSize(key)}
                  />
                  <span>
                    <strong>{key}</strong>
                    <small>{paperSizes[key].description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="photo-select-label" htmlFor="paper-orientation">
            Kağıt yönü
          </label>
          <select
            className="photo-select"
            id="paper-orientation"
            value={orientation}
            onChange={(event) =>
              setOrientation(event.target.value as PaperOrientation)
            }
          >
            <option value="auto">Otomatik yerleştir</option>
            <option value="portrait">Dikey</option>
            <option value="landscape">Yatay</option>
          </select>
          <fieldset className="photo-field">
            <legend>Fotoğraf ölçüsü</legend>
            <div className="photo-options photo-size-options">
              {(Object.keys(photoSizes) as PhotoSize[]).map((key) => (
                <label key={key}>
                  <input
                    type="radio"
                    name="photo-size"
                    value={key}
                    checked={size === key}
                    onChange={() => setSize(key)}
                  />
                  <span>{photoSizes[key].label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="photo-field">
            <legend>Toplam fotoğraf adedi</legend>
            <div className="photo-options photo-count-options">
              {([1, 2, 4, 8] as const).map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="photo-count"
                    value={value}
                    checked={count === value}
                    onChange={() => setCount(value)}
                  />
                  <span>{value} adet</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="photo-checkbox">
            <input
              type="checkbox"
              checked={marks}
              onChange={(event) => setMarks(event.target.checked)}
            />{' '}
            Kesim işaretlerini göster
          </label>
          <div className="photo-step-title">
            <span>3</span>
            <h2>Kadrajı ayarla</h2>
          </div>
          <fieldset
            className="photo-crop-controls"
            disabled={!image || loading}
          >
            <legend className="sr-only">Kadraj ayarları</legend>
            <label htmlFor="photo-zoom">
              Yakınlaştır <output>{crop.zoom.toFixed(2)}×</output>
            </label>
            <input
              id="photo-zoom"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={crop.zoom}
              onChange={(event) =>
                setCrop({ ...crop, zoom: Number(event.target.value) })
              }
            />
            <label htmlFor="photo-horizontal">
              Yatay konum <span>Sol ↔ Sağ</span>
            </label>
            <input
              id="photo-horizontal"
              type="range"
              min="0"
              max="100"
              value={crop.horizontal}
              onChange={(event) =>
                setCrop({ ...crop, horizontal: Number(event.target.value) })
              }
            />
            <label htmlFor="photo-vertical">
              Dikey konum <span>Üst ↔ Alt</span>
            </label>
            <input
              id="photo-vertical"
              type="range"
              min="0"
              max="100"
              value={crop.vertical}
              onChange={(event) =>
                setCrop({ ...crop, vertical: Number(event.target.value) })
              }
            />
            <button
              type="button"
              className="photo-reset"
              onClick={() => setCrop(initialCrop)}
            >
              <RotateCcw size={13} aria-hidden="true" /> Kadrajı sıfırla
            </button>
          </fieldset>
        </section>

        <section
          className="photo-preview"
          aria-label="Fotoğraf ve baskı önizlemesi"
        >
          <div className="photo-preview-heading">
            <h2>Önizleme</h2>
            <span>
              {paperSize} ·{' '}
              {layout.orientation === 'portrait' ? 'Dikey' : 'Yatay'} ·{' '}
              {layout.pages.length} sayfa
            </span>
          </div>
          <div className="photo-preview-content">
            <div className="photo-crop-preview">
              <div
                className="photo-crop-frame"
                style={{
                  aspectRatio: `${dimensions.width} / ${dimensions.height}`,
                }}
              >
                <canvas
                  ref={cropCanvas}
                  hidden={!image}
                  aria-label="Vesikalık kadraj önizlemesi. Konumu ayarlamak için kaydırıcıları kullanabilir veya fotoğrafı sürükleyebilirsin."
                  onPointerDown={(event) => {
                    if (!image) return;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    drag.current = {
                      x: event.clientX,
                      y: event.clientY,
                      horizontal: crop.horizontal,
                      vertical: crop.vertical,
                    };
                  }}
                  onPointerMove={moveCrop}
                  onPointerUp={() => {
                    drag.current = null;
                  }}
                  onPointerCancel={() => {
                    drag.current = null;
                  }}
                />
                {!image && (
                  <div className="photo-empty">
                    <ScanFace size={42} strokeWidth={1} aria-hidden="true" />
                    <span>
                      Fotoğrafın burada
                      <br />
                      görünecek
                    </span>
                  </div>
                )}
              </div>
              <p>{dimensions.label}</p>
              {image && (
                <span className="photo-drag-hint">Kadraj için sürükle</span>
              )}
            </div>
            <div className="photo-sheet-preview">
              <div
                className="photo-sheet"
                style={{ aspectRatio: `${paper.width} / ${paper.height}` }}
              >
                <canvas
                  ref={sheetCanvas}
                  hidden={!image}
                  aria-label={`${paperSize} baskı önizlemesi, sayfa ${pageIndex + 1} / ${layout.pages.length}: ${layout.pages[pageIndex].length} adet ${dimensions.label} fotoğraf`}
                />
                {!image && (
                  <div className="photo-empty">
                    <span>{paperSize} baskı şablonu</span>
                    <small>
                      Fotoğraf yüklediğinde
                      <br />
                      otomatik hazırlanır.
                    </small>
                  </div>
                )}
              </div>
              <p>{paperSizes[paperSize].description} kağıt</p>
              {layout.pages.length > 1 && (
                <div
                  className="photo-page-navigation"
                  aria-label="Önizleme sayfaları"
                >
                  <button
                    type="button"
                    aria-label="Önceki sayfa"
                    disabled={pageIndex === 0}
                    onClick={() => setPreviewPage(pageIndex - 1)}
                  >
                    ←
                  </button>
                  <span>
                    {pageIndex + 1} / {layout.pages.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Sonraki sayfa"
                    disabled={pageIndex === layout.pages.length - 1}
                    onClick={() => setPreviewPage(pageIndex + 1)}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="photo-print-summary">
            <span>
              Toplam <strong>{count} fotoğraf</strong>
            </span>
            <span>
              <strong>{layout.pages.length} sayfa</strong> · {paperSize}
            </span>
            <span>
              {effectivePpi ? `${effectivePpi} ppi kaynak` : '300 ppi hedef'}
            </span>
          </div>
          {layout.pages.length > 1 && (
            <p className="photo-layout-note" role="status">
              Bu ölçüde {count} fotoğraf tek {paperSize} sayfasına sığmıyor.
              Fotoğraf ölçüleri korunarak {layout.pages.length} sayfaya
              yerleştirildi.
            </p>
          )}
          {lowResolution && (
            <p className="photo-quality-note">
              Bu kadrajda kaynak fotoğraf 300 ppi için küçük kalıyor; baskı
              bulanık görünebilir. Daha yüksek çözünürlüklü bir fotoğraf seç
              veya yakınlaştırmayı azalt.
            </p>
          )}
          <div className="photo-download">
            <fieldset className="photo-field">
              <legend>İndirme biçimi</legend>
              <div className="photo-options">
                {(Object.keys(photoFormats) as PhotoFormat[]).map((key) => (
                  <label key={key}>
                    <input
                      type="radio"
                      name="photo-format"
                      checked={format === key}
                      onChange={() => setFormat(key)}
                    />
                    <span>{photoFormats[key]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {format === 'jpeg' && (
              <>
                <label className="photo-select-label" htmlFor="jpeg-quality">
                  JPEG kalitesi
                </label>
                <select
                  className="photo-select"
                  id="jpeg-quality"
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(e.target.value)}
                >
                  <option value="0.9">%90 · Daha küçük dosya</option>
                  <option value="0.95">%95 · Dengeli</option>
                  <option value="1">%100 · En yüksek kalite</option>
                </select>
              </>
            )}
            {format !== 'pdf' && layout.pages.length > 1 && (
              <>
                <label className="photo-select-label" htmlFor="export-pages">
                  İndirilecek sayfalar
                </label>
                <select
                  className="photo-select"
                  id="export-pages"
                  value={exportPages}
                  onChange={(e) => setExportPages(e.target.value)}
                >
                  <option value="all">Tüm sayfalar · ZIP dosyası</option>
                  <option value="current">Önizlemedeki sayfa</option>
                </select>
              </>
            )}
            <p className="photo-format-note">
              {format === 'pdf'
                ? 'Baskı için önerilir. Tüm sayfalar tek PDF dosyasındadır.'
                : `${photoFormats[format]} görselleri 300 dpi olarak hazırlanır.${layout.pages.length > 1 && exportPages === 'all' ? ' Her sayfa ayrı görseldir; birlikte ZIP olarak indirilir.' : ''}`}
            </p>
            <label
              className="photo-select-label"
              htmlFor="photo-document-title"
            >
              Belge adı
            </label>
            <input
              className="photo-document-title"
              id="photo-document-title"
              type="text"
              maxLength={60}
              value={documentTitle}
              onChange={(event) => setDocumentTitle(event.target.value)}
              placeholder="Vesikalık Fotoğraf"
            />
            <p className="photo-download-filename" title={documentName}>
              {documentName}
            </p>
            <button
              type="button"
              className="btn btn-accent btn-lg btn-block photo-download-button"
              disabled={!image || loading || downloading}
              onClick={download}
            >
              <Download size={16} aria-hidden="true" />{' '}
              {downloading
                ? 'Hazırlanıyor…'
                : `${photoFormats[format]} olarak indir`}
            </button>
            <p>
              {paperSize} · {count} fotoğraf · {dimensions.label} ·{' '}
              {layout.pages.length} sayfa
            </p>
          </div>
        </section>
      </div>
      {error && (
        <p className="photo-error" role="alert">
          {error}
        </p>
      )}
      <p className="photo-status" role="status">
        {status}
      </p>
      <aside className="photo-print-note">
        <h2>Doğru ölçüde çıktı almak için</h2>
        <p>
          Dosyayı yazdırırken kağıdı <strong>{paperSize}</strong>, yönü{' '}
          <strong>
            {layout.orientation === 'portrait' ? 'Dikey' : 'Yatay'}
          </strong>
          , ölçeği <strong>%100 / Gerçek boyut</strong> olarak seç. “Sayfaya
          sığdır” seçeneğini kapat. Yazıcı ayarlarından kullandığın fotoğraf
          kağıdı türünü seç. Kesim işaretleri fotoğrafların sınırlarını
          gösterir.
        </p>
        <p>
          Bu araç fotoğrafı seçilen ölçüye kırpar ve yerleştirir; arka planı
          değiştirmez veya biyometrik uygunluğu denetlemez. Ölçü ve fotoğraf
          koşullarını başvuracağın kurumdan kontrol et.
        </p>
      </aside>
    </>
  );
}
