export type PhotoCount = 1 | 2 | 4 | 8;
export const photoSizes = {
  standard: { label: '3,5 × 4,5 cm', width: 35, height: 45 },
  classic: { label: '4 × 6 cm', width: 40, height: 60 },
  portrait: { label: '4,5 × 6 cm', width: 45, height: 60 },
  large: { label: '5 × 6 cm', width: 50, height: 60 },
} as const;
export type PhotoSize = keyof typeof photoSizes;
export const paperSizes = {
  A4: { label: 'A4', width: 210, height: 297, description: '21 × 29,7 cm' },
  A5: { label: 'A5', width: 148, height: 210, description: '14,8 × 21 cm' },
} as const;
export type PaperSize = keyof typeof paperSizes;
export type PaperOrientation = 'auto' | 'portrait' | 'landscape';
export const DPI = 300;
export const PRINT_MARGIN = 5;
export const PHOTO_GAP = 4;
export const mmToPixels = (mm: number) => Math.round((mm * DPI) / 25.4);

export function photoLayout(
  size: PhotoSize,
  count: PhotoCount,
  paperSize: PaperSize = 'A4',
  orientation: PaperOrientation = 'auto',
) {
  const { width, height } = photoSizes[size];
  const stock = paperSizes[paperSize];
  const directions =
    orientation === 'auto'
      ? (['portrait', 'landscape'] as const)
      : [orientation];
  const candidates = directions.flatMap((direction) => {
    const paper =
      direction === 'portrait'
        ? { width: stock.width, height: stock.height }
        : { width: stock.height, height: stock.width };
    const maxColumns = Math.floor(
      (paper.width - PRINT_MARGIN * 2 + PHOTO_GAP) / (width + PHOTO_GAP),
    );
    const maxRows = Math.floor(
      (paper.height - PRINT_MARGIN * 2 + PHOTO_GAP) / (height + PHOTO_GAP),
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
    const commands = ['0.65 G 0.25 w'];
    for (const cell of cells) {
      commands.push(
        `q ${pt(cell.width)} 0 0 ${pt(cell.height)} ${pt(cell.x)} ${pt(layout.paper.height - cell.y - cell.height)} cm /Photo Do Q`,
      );
      if (marks) {
        for (const x of [cell.x, cell.x + cell.width]) {
          for (const y of [cell.y, cell.y + cell.height]) {
            const dx = x === cell.x ? -1 : 1;
            const dy = y === cell.y ? -1 : 1;
            commands.push(
              `${pt(x + dx * 0.4)} ${pt(layout.paper.height - y)} m ${pt(x + dx * 1.5)} ${pt(layout.paper.height - y)} l S`,
            );
            commands.push(
              `${pt(x)} ${pt(layout.paper.height - y - dy * 0.4)} m ${pt(x)} ${pt(layout.paper.height - y - dy * 1.5)} l S`,
            );
          }
        }
      }
    }
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
