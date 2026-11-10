export const photoSizes = {
  standard: { label: '3,5 × 4,5 cm', width: 35, height: 45 },
  classic: { label: '4 × 6 cm', width: 40, height: 60 },
  portrait: { label: '4,5 × 6 cm', width: 45, height: 60 },
  large: { label: '5 × 6 cm', width: 50, height: 60 },
} as const;
export type PhotoSize = keyof typeof photoSizes;

export const photoPurposes = {
  vesikalik: {
    label: 'Vesikalık',
    description: 'CV, okul, iş başvurusu',
    title: 'Vesikalık Fotoğraf',
    sizes: ['standard', 'classic', 'portrait', 'large'],
  },
  biometric: {
    label: 'Pasaport / Kimlik',
    description: 'Biyometrik · 50 × 60 mm',
    title: 'Biyometrik Fotoğraf',
    sizes: ['large'],
  },
} as const satisfies Record<
  string,
  { label: string; description: string; title: string; sizes: PhotoSize[] }
>;
export type PhotoPurpose = keyof typeof photoPurposes;

export const BIOMETRIC_SOURCE_URL =
  'https://www.nvi.gov.tr/istanbul/biyometrik-fotograf-nasil-olmalidir';

// Summarised from the NVİ "Biyometrik Fotoğraf Özellikleri" page (BIOMETRIC_SOURCE_URL).
export const biometricRules = [
  'Ebatı 50 × 60 mm olmalı; 35 × 45 mm’ye kesilmemeli.',
  'Fon beyaz ve desensiz olmalı, fonda gölge oluşmamalı.',
  'Son 6 ay içinde çekilmiş olmalı.',
  'Yüz ortalanmış olmalı ve saç modeliyle birlikte tamamen görünmeli.',
  'Gözler açık ve net görünmeli, saçlar gözleri kapatmamalı; doğrudan kameraya bakılmalı.',
  'Işık yüze eşit yansımalı; yansıma, gölge veya kırmızı göz olmamalı.',
  'Renkler nötr olmalı ve yüzün doğal rengini yansıtmalı; kontrast iyi, ayrıntılar keskin ve net olmalı.',
  'Gözlük camında yansıma olmamalı; renkli cam veya güneş gözlüğü kullanılmamalı, çerçeve gözleri kapatmamalı.',
  'Zorunlu gözlük vb. dışında şapka, başlık, pipo gibi nesneler bulunmamalı.',
  'Başörtülü fotoğraflarda yüz çene ucundan alına kadar görünmeli, yüzde gölge olmamalı.',
  'Küçük çocukların fotoğraflarında başka kişi veya nesne bulunmamalı.',
  'Baskıda leke ve bükülme olmamalı.',
] as const;

/**
 * Rough automatic check of the background: samples the top band and the upper
 * side strips of the crop, where only background should be visible, and
 * reports how much of it is near-white. It is a hint, not a compliance test.
 */
export function backgroundWhiteness(
  data: ArrayLike<number>,
  width: number,
  height: number,
) {
  const band = Math.max(1, Math.round(height * 0.08));
  const side = Math.max(1, Math.round(width * 0.1));
  const sideBottom = Math.round(height * 0.45);
  let total = 0;
  let white = 0;
  const step = Math.max(1, Math.round(Math.min(width, height) / 150));
  for (let y = 0; y < sideBottom; y += step) {
    for (let x = 0; x < width; x += step) {
      if (y >= band && x >= side && x < width - side) continue;
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      total++;
      if (luminance >= 200 && chroma <= 30) white++;
    }
  }
  const ratio = total ? white / total : 0;
  return { ratio, white: ratio >= 0.8 };
}
export const photoCounts = [1, 2, 4, 6, 8] as const;
export type PhotoCount = (typeof photoCounts)[number];

export const paperSizes = {
  A4: { label: 'A4', width: 210, height: 297, description: '21 × 29,7 cm' },
  '10x15': {
    label: '10 × 15',
    width: 100,
    height: 150,
    description: '10 × 15 cm fotoğraf kağıdı',
  },
} as const;
export type PaperSize = keyof typeof paperSizes;
export type PaperOrientation = 'auto' | 'portrait' | 'landscape';
export const DPI = 300;
/** Safe margin from the paper edge, in millimetres. */
export const PRINT_MARGIN = 5;
/** Cutting gap between neighbouring photos, in millimetres. */
export const PHOTO_GAP = 2;
export const mmToPixels = (mm: number) => Math.round((mm * DPI) / 25.4);

export type PhotoCell = { x: number; y: number; width: number; height: number };
/** Shared look of the cut frame in the PDF, PNG/JPEG export and on-screen preview. */
export const CUT_MARK_STYLE = {
  color: '#000000',
  /** Fine hairline, in millimetres (≈ 0.14 pt). */
  width: 0.05,
} as const;

function sheetGrid(size: PhotoSize, paper: { width: number; height: number }) {
  const { width, height } = photoSizes[size];
  // The epsilon keeps exact fits from rounding down.
  return {
    columns: Math.floor(
      (paper.width - PRINT_MARGIN * 2 + PHOTO_GAP) / (width + PHOTO_GAP) + 1e-9,
    ),
    rows: Math.floor(
      (paper.height - PRINT_MARGIN * 2 + PHOTO_GAP) / (height + PHOTO_GAP) +
        1e-9,
    ),
  };
}

/** Orientations to try: both for 'auto', otherwise only the chosen one. */
const directions = (orientation: PaperOrientation) =>
  orientation === 'auto'
    ? (['portrait', 'landscape'] as const)
    : ([orientation] as const);

const orientedPaper = (
  paperSize: PaperSize,
  direction: 'portrait' | 'landscape',
) => {
  const { width, height } = paperSizes[paperSize];
  return direction === 'portrait'
    ? { width, height }
    : { width: height, height: width };
};

/** Most photos of `size` that fit on one sheet in the given (or best) orientation. */
export function photosPerSheet(
  size: PhotoSize,
  paperSize: PaperSize,
  orientation: PaperOrientation = 'auto',
) {
  return Math.max(
    ...directions(orientation).map((direction) => {
      const { columns, rows } = sheetGrid(
        size,
        orientedPaper(paperSize, direction),
      );
      return columns * rows;
    }),
  );
}

/**
 * Cut frames for one page, in millimetres: one thin rectangle around every
 * photo. The returned rectangle is the stroke's centre line, pushed out by half
 * the line width, so the line lies just outside the photo and never covers it;
 * cutting along the inner edge of the frame gives the exact photo size.
 */
export function cutFrames(cells: PhotoCell[]): PhotoCell[] {
  const half = CUT_MARK_STYLE.width / 2;
  return cells.map((cell) => ({
    x: cell.x - half,
    y: cell.y - half,
    width: cell.width + CUT_MARK_STYLE.width,
    height: cell.height + CUT_MARK_STYLE.width,
  }));
}

/**
 * Places `count` photos in a regular grid. Pages are filled in order; each page
 * uses the same column count, so photos line up and cut lines stay straight.
 */
export function photoLayout(
  size: PhotoSize,
  count: PhotoCount,
  paperSize: PaperSize = 'A4',
  orientation: PaperOrientation = 'auto',
) {
  const { width, height } = photoSizes[size];
  const candidates = directions(orientation).flatMap((direction) => {
    const paper = orientedPaper(paperSize, direction);
    const grid = sheetGrid(size, paper);
    if (!grid.columns || !grid.rows) return [];
    return Array.from({ length: Math.min(count, grid.columns) }, (_, i) => {
      const columns = i + 1;
      const perPage = columns * grid.rows;
      const sizes = Array.from(
        { length: Math.ceil(count / perPage) },
        (_, page) => Math.min(perPage, count - page * perPage),
      );
      // Empty slots in incomplete rows make the grid irregular.
      const empty = sizes.reduce(
        (sum, n) => sum + Math.ceil(n / columns) * columns - n,
        0,
      );
      const rows = Math.ceil(sizes[0] / columns);
      const gridWidth = columns * width + (columns - 1) * PHOTO_GAP;
      const gridHeight = rows * height + (rows - 1) * PHOTO_GAP;
      const score =
        sizes.length * 10000 +
        empty * 100 +
        Math.abs(
          Math.log(gridWidth / gridHeight / (paper.width / paper.height)),
        );
      return { paper, orientation: direction, columns, sizes, score };
    });
  });
  const best = candidates.sort((a, b) => a.score - b.score)[0];
  if (!best) throw new Error('Seçilen ölçü bu kağıda yerleştirilemiyor.');
  const pages = best.sizes.map((pagePhotos) => {
    const rows = Math.ceil(pagePhotos / best.columns);
    const gridHeight = rows * height + (rows - 1) * PHOTO_GAP;
    const top = (best.paper.height - gridHeight) / 2;
    return Array.from({ length: pagePhotos }, (_, index): PhotoCell => {
      const row = Math.floor(index / best.columns);
      const rowColumns = Math.min(
        best.columns,
        pagePhotos - row * best.columns,
      );
      const rowWidth = rowColumns * width + (rowColumns - 1) * PHOTO_GAP;
      return {
        x:
          (best.paper.width - rowWidth) / 2 +
          (index % best.columns) * (width + PHOTO_GAP),
        y: top + row * (height + PHOTO_GAP),
        width,
        height,
      };
    });
  });
  return { paper: best.paper, orientation: best.orientation, pages };
}

export function photoDocumentName(
  size: PhotoSize,
  count: PhotoCount,
  paper: PaperSize,
  title = 'Vesikalık Fotoğraf',
) {
  const safeTitle =
    title
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'I')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
      .replace(/-+$/g, '') || 'Vesikalik-Fotograf';
  const { width, height } = photoSizes[size];
  return `biyik-dev_${safeTitle}_${paper}_${width}x${height}mm_${count}-Adet.pdf`;
}

export function drawCrop(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  size: PhotoSize,
  zoom: number,
  horizontal: number,
  vertical: number,
) {
  const { width, height } = photoSizes[size];
  canvas.width = mmToPixels(width);
  canvas.height = mmToPixels(height);
  const context = canvas.getContext('2d');
  if (!context)
    throw new Error('Fotoğraf düzenleme bu tarayıcıda kullanılamıyor.');
  const scale =
    Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight,
    ) * zoom;
  const sourceWidth = canvas.width / scale;
  const sourceHeight = canvas.height / scale;
  const x = ((image.naturalWidth - sourceWidth) * horizontal) / 100;
  const y = ((image.naturalHeight - sourceHeight) * vertical) / 100;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    x,
    y,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return { sourceWidth, sourceHeight };
}

// The PDF uses millimetre-based placements and embeds the crop only once.
// Unlike a raster file, its physical page size is independent of image DPI metadata.
export async function createPhotoPdf(
  crop: HTMLCanvasElement,
  size: PhotoSize,
  count: PhotoCount,
  marks: boolean,
  paperSize: PaperSize = 'A4',
  orientation: PaperOrientation = 'auto',
) {
  const jpeg = await new Promise<Blob>((resolve, reject) =>
    crop.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('Fotoğraf oluşturulamadı.')),
      'image/jpeg',
      0.98,
    ),
  );
  const image = new Uint8Array(await jpeg.arrayBuffer());
  const encoder = new TextEncoder();
  const pt = (mm: number) => ((mm * 72) / 25.4).toFixed(5);
  const layout = photoLayout(size, count, paperSize, orientation);
  const streams = layout.pages.map((cells) => {
    // Pure black (0 G) hairline with mitred corners so every frame closes cleanly.
    const commands = [`0 G ${pt(CUT_MARK_STYLE.width)} w 0 j`];
    for (const cell of cells)
      commands.push(
        `q ${pt(cell.width)} 0 0 ${pt(cell.height)} ${pt(cell.x)} ${pt(layout.paper.height - cell.y - cell.height)} cm /Photo Do Q`,
      );
    if (marks)
      for (const frame of cutFrames(cells))
        commands.push(
          `${pt(frame.x)} ${pt(layout.paper.height - frame.y - frame.height)} ${pt(frame.width)} ${pt(frame.height)} re S`,
        );
    return commands.join('\n');
  });
  const chunks: BlobPart[] = [];
  const offsets = [0];
  let length = 0;
  function append(value: string | Uint8Array<ArrayBuffer>) {
    const bytes = typeof value === 'string' ? encoder.encode(value) : value;
    chunks.push(bytes);
    length += bytes.byteLength;
  }
  function object(id: number, value: string) {
    offsets[id] = length;
    append(`${id} 0 obj\n${value}\nendobj\n`);
  }
  append('%PDF-1.4\n');
  object(
    1,
    '<< /Type /Catalog /Pages 2 0 R /ViewerPreferences << /PrintScaling /None >> >>',
  );
  const pageIds = streams.map((_, index) => 5 + index * 2);
  object(
    2,
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${streams.length} >>`,
  );
  object(
    3,
    '<< /Title (biyik.dev - Vesikalik Fotograf Baski Sablonu) /Creator (biyik.dev) >>',
  );
  offsets[4] = length;
  append(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${crop.width} /Height ${crop.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`,
  );
  append(image);
  append('\nendstream\nendobj\n');
  streams.forEach((stream, index) => {
    const pageId = pageIds[index];
    object(
      pageId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pt(layout.paper.width)} ${pt(layout.paper.height)}] /Resources << /XObject << /Photo 4 0 R >> >> /Contents ${pageId + 1} 0 R >>`,
    );
    object(
      pageId + 1,
      `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`,
    );
  });
  const xref = length;
  const objectCount = offsets.length;
  append(`xref\n0 ${objectCount}\n0000000000 65535 f \n`);
  offsets
    .slice(1)
    .forEach((offset) =>
      append(`${String(offset).padStart(10, '0')} 00000 n \n`),
    );
  append(
    `trailer\n<< /Size ${objectCount} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF`,
  );
  return new Blob(chunks, { type: 'application/pdf' });
}
