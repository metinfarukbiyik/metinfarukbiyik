import {
  CUT_MARK_STYLE,
  cutFrames,
  DPI,
  photoLayout,
  type PhotoCount,
  type PhotoSize,
  type PaperSize,
  type PaperOrientation,
} from './passport-photo';

export type PhotoFormat = 'pdf' | 'png' | 'jpeg';
export const photoFormats = { pdf: 'PDF', png: 'PNG', jpeg: 'JPEG' } as const;
export const JPEG_QUALITY = 0.95;

export function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++)
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Store raster print density explicitly: canvas encoders otherwise commonly use 96 dpi.
export async function withPrintDensity(blob: Blob, format: 'png' | 'jpeg') {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (format === 'jpeg') {
    for (
      let offset = 2;
      offset + 18 <= bytes.length && bytes[offset] === 0xff;
    ) {
      const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
      if (
        bytes[offset + 1] === 0xe0 &&
        String.fromCharCode(...bytes.slice(offset + 4, offset + 9)) === 'JFIF\0'
      ) {
        bytes[offset + 11] = 1;
        bytes[offset + 12] = DPI >> 8;
        bytes[offset + 13] = DPI & 255;
        bytes[offset + 14] = DPI >> 8;
        bytes[offset + 15] = DPI & 255;
        return new Blob([bytes], { type: 'image/jpeg' });
      }
      if (length < 2 || bytes[offset + 1] === 0xda) break;
      offset += length + 2;
    }
    const jfif = new Uint8Array([
      255,
      224,
      0,
      16,
      74,
      70,
      73,
      70,
      0,
      1,
      2,
      1,
      DPI >> 8,
      DPI & 255,
      DPI >> 8,
      DPI & 255,
      0,
      0,
    ]);
    return new Blob([bytes.slice(0, 2), jfif, bytes.slice(2)], {
      type: 'image/jpeg',
    });
  }
  const density = new Uint8Array(21);
  const view = new DataView(density.buffer);
  view.setUint32(0, 9);
  density.set([112, 72, 89, 115], 4); // pHYs
  view.setUint32(8, Math.round(DPI / 0.0254));
  view.setUint32(12, Math.round(DPI / 0.0254));
  density[16] = 1;
  view.setUint32(17, crc32(density.slice(4, 17)));
  const parts: BlobPart[] = [bytes.slice(0, 33), density];
  for (let offset = 33; offset + 12 <= bytes.length;) {
    const length = new DataView(bytes.buffer).getUint32(offset);
    const end = offset + length + 12;
    if (end > bytes.length) throw new Error('Geçersiz PNG.');
    if (String.fromCharCode(...bytes.slice(offset + 4, offset + 8)) !== 'pHYs')
      parts.push(bytes.slice(offset, end));
    offset = end;
  }
  return new Blob(parts, { type: 'image/png' });
}

// Multiple paper sheets become one ZIP download rather than multiple browser prompts.
export async function createZip(files: { name: string; blob: Blob }[]) {
  const local: BlobPart[] = [];
  const central: BlobPart[] = [];
  let offset = 0;
  let centralSize = 0;
  for (const file of files) {
    const name = new TextEncoder().encode(file.name);
    const data = new Uint8Array(await file.blob.arrayBuffer());
    const checksum = crc32(data);
    const header = new Uint8Array(30 + name.length);
    const h = new DataView(header.buffer);
    h.setUint32(0, 0x04034b50, true);
    h.setUint16(4, 20, true);
    h.setUint16(12, 0x21, true);
    h.setUint32(14, checksum, true);
    h.setUint32(18, data.length, true);
    h.setUint32(22, data.length, true);
    h.setUint16(26, name.length, true);
    header.set(name, 30);
    const directory = new Uint8Array(46 + name.length);
    const d = new DataView(directory.buffer);
    d.setUint32(0, 0x02014b50, true);
    d.setUint16(4, 20, true);
    d.setUint16(6, 20, true);
    d.setUint16(14, 0x21, true);
    d.setUint32(16, checksum, true);
    d.setUint32(20, data.length, true);
    d.setUint32(24, data.length, true);
    d.setUint16(28, name.length, true);
    d.setUint32(42, offset, true);
    directory.set(name, 46);
    local.push(header, data);
    central.push(directory);
    offset += header.length + data.length;
    centralSize += directory.length;
  }
  const end = new Uint8Array(22);
  const e = new DataView(end.buffer);
  e.setUint32(0, 0x06054b50, true);
  e.setUint16(8, files.length, true);
  e.setUint16(10, files.length, true);
  e.setUint32(12, centralSize, true);
  e.setUint32(16, offset, true);
  return new Blob([...local, ...central, end], { type: 'application/zip' });
}

export async function createPhotoRaster(
  crop: HTMLCanvasElement,
  size: PhotoSize,
  count: PhotoCount,
  marks: boolean,
  paperSize: PaperSize,
  orientation: PaperOrientation,
  format: 'png' | 'jpeg',
  baseName: string,
) {
  const layout = photoLayout(size, count, paperSize, orientation);
  const files: { name: string; blob: Blob }[] = [];
  const scale = DPI / 25.4;
  for (let index = 0; index < layout.pages.length; index++) {
    const sheet = document.createElement('canvas');
    sheet.width = Math.round(layout.paper.width * scale);
    sheet.height = Math.round(layout.paper.height * scale);
    const ctx = sheet.getContext('2d');
    if (!ctx) throw new Error('Görsel oluşturulamadı.');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, sheet.width, sheet.height);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.strokeStyle = CUT_MARK_STYLE.color;
    ctx.lineWidth = CUT_MARK_STYLE.width;
    ctx.lineJoin = 'miter';
    const cells = layout.pages[index];
    for (const cell of cells)
      ctx.drawImage(crop, cell.x, cell.y, cell.width, cell.height);
    if (marks) {
      ctx.beginPath();
      for (const frame of cutFrames(cells))
        ctx.rect(frame.x, frame.y, frame.width, frame.height);
      ctx.stroke();
    }
    const raw = await new Promise<Blob>((resolve, reject) =>
      sheet.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error('Görsel oluşturulamadı.')),
        `image/${format}`,
        JPEG_QUALITY,
      ),
    );
    const suffix =
      layout.pages.length > 1
        ? `_Sayfa-${String(index + 1).padStart(2, '0')}`
        : '';
    files.push({
      name: `${baseName}${suffix}.${format === 'jpeg' ? 'jpg' : 'png'}`,
      blob: await withPrintDensity(raw, format),
    });
    sheet.width = 0;
    sheet.height = 0;
  }
  return files.length === 1
    ? files[0]
    : {
        name: `${baseName}_${format.toUpperCase()}.zip`,
        blob: await createZip(files),
      };
}
