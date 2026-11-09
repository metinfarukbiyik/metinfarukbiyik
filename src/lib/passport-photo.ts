export type PhotoCount = 1 | 2 | 4 | 8;
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
export const paperSizes = {
  A4: {
    label: 'A4',
    width: 210,
    height: 297,
    description: '21 × 29,7 cm',
    borderless: false,
  },
  '10x15': {
    label: '10 × 15',
    width: 100,
    height: 150,
    description: '10 × 15 cm fotoğraf kağıdı',
    // Photo printers commonly print 10 × 15 edge to edge.
    borderless: true,
  },
} as const;
export type PaperSize = keyof typeof paperSizes;
export type PaperOrientation = 'auto' | 'portrait' | 'landscape';
export const DPI = 300;
export const PRINT_MARGIN = 5;
export const PHOTO_GAP = 4;
export const mmToPixels = (mm: number) => Math.round((mm * DPI) / 25.4);

export const supportsBorderless = (paperSize: PaperSize) =>
  paperSizes[paperSize].borderless;

/** Bordered prints keep a safe margin and a cutting gap; borderless prints use neither. */
export const printSpacing = (borderless: boolean) =>
  borderless ? { margin: 0, gap: 0 } : { margin: PRINT_MARGIN, gap: PHOTO_GAP };

function sheetGrid(
  size: PhotoSize,
  paper: { width: number; height: number },
  borderless: boolean,
) {
  const { width, height } = photoSizes[size];
  const { margin, gap } = printSpacing(borderless);
  // The epsilon keeps exact fits (2 × 50 mm on 100 mm) from rounding down.
  return {
    columns: Math.floor(
      (paper.width - margin * 2 + gap) / (width + gap) + 1e-9,
    ),
    rows: Math.floor((paper.height - margin * 2 + gap) / (height + gap) + 1e-9),
  };
}

/** Most photos of `size` that fit on one sheet in the given (or best) orientation. */
export function photosPerSheet(
  size: PhotoSize,
  paperSize: PaperSize,
  orientation: PaperOrientation = 'auto',
  borderless = false,
) {
  const stock = paperSizes[paperSize];
  const effective = borderless && stock.borderless;
  const directions =
    orientation === 'auto'
      ? (['portrait', 'landscape'] as const)
      : [orientation];
  return Math.max(
    ...directions.map((direction) => {
      const { columns, rows } = sheetGrid(
        size,
        direction === 'portrait'
          ? { width: stock.width, height: stock.height }
          : { width: stock.height, height: stock.width },
        effective,
      );
      return columns * rows;
    }),
  );
}

export type PhotoCell = { x: number; y: number; width: number; height: number };
export type CutMark = { x1: number; y1: number; x2: number; y2: number };

/**
 * Cut guides for one page, in millimetres. Bordered sheets get corner ticks
 * just outside every photo. Borderless sheets have no gaps between photos, so
 * guides are drawn only in the empty strips around the grid, in line with the
 * cutting edges; they never touch a photo.
 */
/** Shared look of cut guides in the PDF, PNG/JPEG export and on-screen preview. */
export const CUT_MARK_STYLE = {
  /** Solid black so the guides stay visible on any printer and paper. */
  color: '#000000',
  /** Line width in millimetres (≈ 0.7 pt). */
  width: 0.25,
} as const;
/** Gap kept between a guide and the photo, so a slightly off cut leaves no line on it. */
const CUT_MARK_OFFSET = 0.5;
/** Longest guide; long enough to line up a ruler or a trimmer blade. */
const CUT_MARK_LENGTH = 4;

/**
 * Free distance from (x, y) along a horizontal (axis 'x') or vertical ray,
 * up to the next photo or the paper edge. Between two photos only half of the
 * gap is used, so the neighbour's guide on the same line has room too.
 */
function freeDistance(
  cells: PhotoCell[],
  paper: { width: number; height: number },
  x: number,
  y: number,
  axis: 'x' | 'y',
  direction: 1 | -1,
) {
  const position = axis === 'x' ? x : y;
  const cross = axis === 'x' ? y : x;
  let free =
    direction === 1
      ? (axis === 'x' ? paper.width : paper.height) - position
      : position;
  for (const c of cells) {
    const [start, size, crossStart, crossSize] =
      axis === 'x'
        ? [c.x, c.width, c.y, c.height]
        : [c.y, c.height, c.x, c.width];
    if (cross < crossStart - 0.01 || cross > crossStart + crossSize + 0.01)
      continue;
    const distance =
      direction === 1 ? start - position : position - (start + size);
    if (distance > 0.01) free = Math.min(free, distance / 2);
  }
  return free;
}

/**
 * Joins guides that lie on the same cutting line and nearly meet (the two
 * halves drawn into a gap from photos on either side), so the gap shows one
 * solid line instead of two short dashes.
 */
function mergeCollinear(marks: CutMark[]) {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const lines = new Map<string, { start: number; end: number }[]>();
  for (const m of marks) {
    const vertical = m.x1 === m.x2;
    const key = `${vertical ? 'v' : 'h'}${round(vertical ? m.x1 : m.y1)}`;
    const [a, b] = vertical ? [m.y1, m.y2] : [m.x1, m.x2];
    const list = lines.get(key) ?? [];
    list.push({ start: Math.min(a, b), end: Math.max(a, b) });
    lines.set(key, list);
  }
  const merged: CutMark[] = [];
  for (const [key, list] of lines) {
    const vertical = key[0] === 'v';
    const at = Number(key.slice(1));
    list.sort((a, b) => a.start - b.start);
    const runs: { start: number; end: number }[] = [];
    for (const segment of list) {
      const last = runs[runs.length - 1];
      if (last && segment.start - last.end <= 0.6)
        last.end = Math.max(last.end, segment.end);
      else runs.push({ ...segment });
    }
    for (const { start, end } of runs)
      merged.push(
        vertical
          ? { x1: at, y1: start, x2: at, y2: end }
          : { x1: start, y1: at, x2: end, y2: at },
      );
  }
  return merged;
}

export function cutMarks(
  cells: PhotoCell[],
  paper: { width: number; height: number },
  borderless = false,
): CutMark[] {
  const marks: CutMark[] = [];
  if (!borderless) {
    for (const cell of cells)
      for (const x of [cell.x, cell.x + cell.width])
        for (const y of [cell.y, cell.y + cell.height]) {
          const dx = x === cell.x ? -1 : 1;
          const dy = y === cell.y ? -1 : 1;
          // Each corner gets two guides that continue the photo's edges outward.
          const reachX = Math.min(
            CUT_MARK_LENGTH + CUT_MARK_OFFSET,
            freeDistance(cells, paper, x, y, 'x', dx) - 0.2,
          );
          const reachY = Math.min(
            CUT_MARK_LENGTH + CUT_MARK_OFFSET,
            freeDistance(cells, paper, x, y, 'y', dy) - 0.2,
          );
          marks.push({
            x1: x + dx * CUT_MARK_OFFSET,
            y1: y,
            x2: x + dx * Math.max(reachX, CUT_MARK_OFFSET + 0.5),
            y2: y,
          });
          marks.push({
            x1: x,
            y1: y + dy * CUT_MARK_OFFSET,
            x2: x,
            y2: y + dy * Math.max(reachY, CUT_MARK_OFFSET + 0.5),
          });
        }
    return mergeCollinear(marks);
  }
  if (!cells.length) return marks;
  const GUIDE = 6;
  const CLEARANCE = CUT_MARK_OFFSET;
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const unique = (values: number[]) =>
    [...new Set(values.map(round))].filter(
      (value) => value > 0.01 && value < Math.max(paper.width, paper.height),
    );
  const top = Math.min(...cells.map((c) => c.y));
  const bottom = Math.max(...cells.map((c) => c.y + c.height));
  const left = Math.min(...cells.map((c) => c.x));
  const right = Math.max(...cells.map((c) => c.x + c.width));
  const edgesX = (row: PhotoCell[]) =>
    unique(row.flatMap((c) => [c.x, c.x + c.width])).filter(
      (x) => x < paper.width - 0.01,
    );
  const edgesY = unique(cells.flatMap((c) => [c.y, c.y + c.height])).filter(
    (y) => y < paper.height - 0.01,
  );
  // Vertical guides above the top row and below the bottom row.
  if (top >= CLEARANCE + 1)
    for (const x of edgesX(cells.filter((c) => round(c.y) === round(top))))
      marks.push({
        x1: x,
        y1: Math.max(0, top - CLEARANCE - GUIDE),
        x2: x,
        y2: top - CLEARANCE,
      });
  if (paper.height - bottom >= CLEARANCE + 1)
    for (const x of edgesX(
      cells.filter((c) => round(c.y + c.height) === round(bottom)),
    ))
      marks.push({
        x1: x,
        y1: bottom + CLEARANCE,
        x2: x,
        y2: Math.min(paper.height, bottom + CLEARANCE + GUIDE),
      });
  // Horizontal guides left and right of the whole grid.
  if (left >= CLEARANCE + 1)
    for (const y of edgesY)
      marks.push({
        x1: Math.max(0, left - CLEARANCE - GUIDE),
        y1: y,
        x2: left - CLEARANCE,
        y2: y,
      });
  if (paper.width - right >= CLEARANCE + 1)
    for (const y of edgesY)
      marks.push({
        x1: right + CLEARANCE,
        y1: y,
        x2: Math.min(paper.width, right + CLEARANCE + GUIDE),
        y2: y,
      });
  return marks;
}

export function photoLayout(
  size: PhotoSize,
  count: PhotoCount,
  paperSize: PaperSize = 'A4',
  orientation: PaperOrientation = 'auto',
  borderlessRequest = false,
) {
  const { width, height } = photoSizes[size];
  const stock = paperSizes[paperSize];
  const borderless = borderlessRequest && stock.borderless;
  const { gap: PHOTO_GAP } = printSpacing(borderless);
  const directions =
    orientation === 'auto'
      ? (['portrait', 'landscape'] as const)
      : [orientation];
  const candidates = directions.flatMap((direction) => {
    const paper =
      direction === 'portrait'
        ? { width: stock.width, height: stock.height }
        : { width: stock.height, height: stock.width };
    const { columns: maxColumns, rows: maxRows } = sheetGrid(
      size,
      paper,
      borderless,
    );
    return Array.from({ length: Math.min(count, maxColumns) }, (_, i) => {
      const columns = i + 1;
      const capacity = columns * maxRows;
      const pageCount = Math.ceil(count / capacity);
      const perPage = Math.ceil(count / pageCount);
      const rows = Math.ceil(perPage / columns);
      const gridWidth = columns * width + (columns - 1) * PHOTO_GAP;
      const gridHeight = rows * height + (rows - 1) * PHOTO_GAP;
      const score =
        pageCount * 10000 +
        (columns * rows - perPage) * 100 +
        Math.abs(
          Math.log(gridWidth / gridHeight / (paper.width / paper.height)),
        );
      return {
        paper,
        orientation: direction,
        columns,
        pageCount,
        perPage,
        score,
      };
    }).filter((candidate) => Number.isFinite(candidate.score));
  });
  const best = candidates.sort((a, b) => a.score - b.score)[0];
  if (!best) throw new Error('Seçilen ölçü bu kağıda yerleştirilemiyor.');
  const pages = Array.from({ length: best.pageCount }, (_, pageIndex) => {
    const pagePhotos = Math.min(best.perPage, count - pageIndex * best.perPage);
    const rows = Math.ceil(pagePhotos / best.columns);
    const gridHeight = rows * height + (rows - 1) * PHOTO_GAP;
    const top = (best.paper.height - gridHeight) / 2;
    return Array.from({ length: pagePhotos }, (_, index) => {
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
  return {
    paper: best.paper,
    orientation: best.orientation,
    pages,
    borderless,
  };
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
  borderless = false,
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
  const layout = photoLayout(size, count, paperSize, orientation, borderless);
  const streams = layout.pages.map((cells) => {
    // Pure black (0 G), 0.25 mm wide, butt caps so guides end exactly where computed.
    const commands = [`0 G ${pt(CUT_MARK_STYLE.width)} w 0 J`];
    for (const cell of cells)
      commands.push(
        `q ${pt(cell.width)} 0 0 ${pt(cell.height)} ${pt(cell.x)} ${pt(layout.paper.height - cell.y - cell.height)} cm /Photo Do Q`,
      );
    if (marks)
      for (const mark of cutMarks(cells, layout.paper, layout.borderless))
        commands.push(
          `${pt(mark.x1)} ${pt(layout.paper.height - mark.y1)} m ${pt(mark.x2)} ${pt(layout.paper.height - mark.y2)} l S`,
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
