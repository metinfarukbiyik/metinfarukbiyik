import { crc32 } from './photo-export';

/**
 * Reads and removes photo metadata without re-encoding the image: only metadata segments
 * (JPEG APPn/COM, PNG chunks, WebP RIFF chunks) are rewritten, pixel data is copied as-is.
 */

export type ImageKind = 'jpeg' | 'png' | 'webp';
export type MetaGroup = 'location' | 'date' | 'device' | 'other';
type Ifd = 'ifd0' | 'exif' | 'gps';

export const metaGroups: { value: MetaGroup; label: string; hint: string }[] = [
  { value: 'location', label: 'Konum', hint: 'GPS koordinatları, yükseklik, yön' },
  { value: 'date', label: 'Tarih ve saat', hint: 'Çekim ve düzenleme zamanı, saat dilimi' },
  { value: 'device', label: 'Cihaz ve kişi', hint: 'Marka, model, lens, seri no, yazılım, sahip' },
  { value: 'other', label: 'Teknik bilgiler', hint: 'Pozlama, ISO, flaş, odak uzaklığı ve diğerleri' },
];

export interface MetaField {
  group: MetaGroup;
  label: string;
  value: string;
}

export interface PhotoMetadata {
  kind: ImageKind;
  fields: MetaField[];
  /** Number of tags in each group, including the ones without a friendly label. */
  counts: Record<MetaGroup, number>;
  gps: { latitude: number; longitude: number } | null;
  /** Other metadata blocks that are always removed (XMP, IPTC, thumbnail …). */
  extras: string[];
}

// ── Byte helpers ───────────────────────────────────────────
const ascii = (bytes: Uint8Array, start: number, length: number) =>
  String.fromCharCode(...bytes.subarray(start, start + length));

function concat(parts: Uint8Array[]) {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

export function detectKind(bytes: Uint8Array): ImageKind | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpeg';
  if (ascii(bytes, 0, 8) === '\x89PNG\r\n\x1a\n') return 'png';
  if (ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 4) === 'WEBP') return 'webp';
  return null;
}

// ── TIFF (EXIF) structure ──────────────────────────────────
const TYPE_SIZE: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };
/** Byte-swap unit per type: rationals are two 4-byte numbers. */
const SWAP_UNIT: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 4, 6: 1, 7: 1, 8: 2, 9: 4, 10: 4, 11: 4, 12: 8 };

const EXIF_POINTER = 0x8769;
const GPS_POINTER = 0x8825;
const INTEROP_POINTER = 0xa005;
const ORIENTATION = 0x0112;

interface TiffEntry {
  ifd: Ifd;
  tag: number;
  type: number;
  count: number;
  /** Value bytes in little-endian order. */
  data: Uint8Array;
}

interface Tiff {
  entries: TiffEntry[];
  hasThumbnail: boolean;
  hasMakerNote: boolean;
}

function readTiff(bytes: Uint8Array): Tiff | null {
  if (bytes.length < 8) return null;
  const order = ascii(bytes, 0, 2);
  if (order !== 'II' && order !== 'MM') return null;
  const little = order === 'II';
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u16 = (offset: number) => view.getUint16(offset, little);
  const u32 = (offset: number) => view.getUint32(offset, little);
  if (u16(2) !== 42) return null;

  const entries: TiffEntry[] = [];
  const seen = new Set<number>();
  let hasMakerNote = false;
  let hasThumbnail = false;

  const readIfd = (offset: number, ifd: Ifd) => {
    if (!offset || seen.has(offset) || offset + 2 > bytes.length) return 0;
    seen.add(offset);
    const count = u16(offset);
    if (offset + 2 + count * 12 + 4 > bytes.length) return 0;
    for (let i = 0; i < count; i++) {
      const at = offset + 2 + i * 12;
      const tag = u16(at);
      const type = u16(at + 2);
      const n = u32(at + 4);
      const size = (TYPE_SIZE[type] ?? 0) * n;
      if (!TYPE_SIZE[type] || size > bytes.length) continue;
      const start = size <= 4 ? at + 8 : u32(at + 8);
      if (start + size > bytes.length) continue;
      if (tag === EXIF_POINTER && ifd === 'ifd0') readIfd(u32(at + 8), 'exif');
      else if (tag === GPS_POINTER && ifd === 'ifd0') readIfd(u32(at + 8), 'gps');
      else if (tag === INTEROP_POINTER) continue;
      else if (tag === 0x927c) hasMakerNote = true;
      else {
        const data = bytes.slice(start, start + size);
        if (!little) {
          const unit = SWAP_UNIT[type];
          for (let k = 0; unit > 1 && k < data.length; k += unit) data.subarray(k, k + unit).reverse();
        }
        entries.push({ ifd, tag, type, count: n, data });
      }
    }
    return u32(offset + 2 + count * 12);
  };

  const next = readIfd(u32(4), 'ifd0');
  if (next) hasThumbnail = true;
  return { entries, hasThumbnail, hasMakerNote };
}

/** Writes a little-endian TIFF with IFD0 and optional EXIF and GPS sub-IFDs; no thumbnail. */
function writeTiff(entries: TiffEntry[]): Uint8Array {
  const byIfd = (ifd: Ifd) => entries.filter((entry) => entry.ifd === ifd).sort((a, b) => a.tag - b.tag);
  const exif = byIfd('exif');
  const gps = byIfd('gps');
  const pointer = (tag: number): TiffEntry => ({ ifd: 'ifd0', tag, type: 4, count: 1, data: new Uint8Array(4) });
  const ifd0 = [...byIfd('ifd0'), ...(exif.length ? [pointer(EXIF_POINTER)] : []), ...(gps.length ? [pointer(GPS_POINTER)] : [])].sort(
    (a, b) => a.tag - b.tag,
  );

  const size = (list: TiffEntry[]) =>
    2 + list.length * 12 + 4 + list.reduce((total, entry) => total + (entry.data.length > 4 ? entry.data.length + (entry.data.length & 1) : 0), 0);
  const offsets = { ifd0: 8, exif: 8 + size(ifd0), gps: 8 + size(ifd0) + size(exif) };
  const total = offsets.gps + (gps.length ? size(gps) : 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  out.set([0x49, 0x49, 42, 0]);
  view.setUint32(4, 8, true);

  const writeIfd = (list: TiffEntry[], start: number) => {
    view.setUint16(start, list.length, true);
    let data = start + 2 + list.length * 12 + 4;
    list.forEach((entry, i) => {
      const at = start + 2 + i * 12;
      view.setUint16(at, entry.tag, true);
      view.setUint16(at + 2, entry.type, true);
      view.setUint32(at + 4, entry.count, true);
      if (entry.tag === EXIF_POINTER && entry.ifd === 'ifd0') view.setUint32(at + 8, offsets.exif, true);
      else if (entry.tag === GPS_POINTER && entry.ifd === 'ifd0') view.setUint32(at + 8, offsets.gps, true);
      else if (entry.data.length <= 4) out.set(entry.data, at + 8);
      else {
        view.setUint32(at + 8, data, true);
        out.set(entry.data, data);
        data += entry.data.length + (entry.data.length & 1);
      }
    });
    view.setUint32(start + 2 + list.length * 12, 0, true);
  };
  writeIfd(ifd0, offsets.ifd0);
  if (exif.length) writeIfd(exif, offsets.exif);
  if (gps.length) writeIfd(gps, offsets.gps);
  return out;
}

// ── Tag catalogue ──────────────────────────────────────────
const DATE_TAGS = new Set([0x0132, 0x9003, 0x9004, 0x9010, 0x9011, 0x9012, 0x9290, 0x9291, 0x9292]);
const GPS_DATE_TAGS = new Set([0x0007, 0x001d]);
const DEVICE_TAGS = new Set([
  0x010f, 0x0110, 0x0131, 0x013b, 0x013c, 0x8298, 0xa420, 0xa430, 0xa431, 0xa432, 0xa433, 0xa434, 0xa435, 0xc4a5,
]);

export function tagGroup(entry: Pick<TiffEntry, 'ifd' | 'tag'>): MetaGroup | null {
  if (entry.ifd === 'ifd0' && entry.tag === ORIENTATION) return null; // always kept: it rotates the picture
  if (entry.ifd === 'gps') return GPS_DATE_TAGS.has(entry.tag) ? 'date' : 'location';
  if (DATE_TAGS.has(entry.tag)) return 'date';
  if (DEVICE_TAGS.has(entry.tag)) return 'device';
  return 'other';
}

const LABELS: { ifd: Ifd; tag: number; group: MetaGroup; label: string; format?: (value: number[] | string) => string }[] = [
  { ifd: 'gps', tag: 0x0006, group: 'location', label: 'Yükseklik', format: (v) => `${Math.round(Number(v[0]))} m` },
  { ifd: 'gps', tag: 0x0011, group: 'location', label: 'Çekim yönü', format: (v) => `${Math.round(Number(v[0]))}°` },
  { ifd: 'exif', tag: 0x9003, group: 'date', label: 'Çekim zamanı' },
  { ifd: 'ifd0', tag: 0x0132, group: 'date', label: 'Değiştirilme zamanı' },
  { ifd: 'exif', tag: 0x9011, group: 'date', label: 'Saat dilimi' },
  { ifd: 'ifd0', tag: 0x010f, group: 'device', label: 'Marka' },
  { ifd: 'ifd0', tag: 0x0110, group: 'device', label: 'Model' },
  { ifd: 'exif', tag: 0xa434, group: 'device', label: 'Lens' },
  { ifd: 'ifd0', tag: 0x0131, group: 'device', label: 'Yazılım' },
  { ifd: 'exif', tag: 0xa431, group: 'device', label: 'Seri numarası' },
  { ifd: 'exif', tag: 0xa430, group: 'device', label: 'Sahibi' },
  { ifd: 'ifd0', tag: 0x013b, group: 'device', label: 'Yazar' },
  { ifd: 'ifd0', tag: 0x8298, group: 'device', label: 'Telif' },
  { ifd: 'ifd0', tag: 0x013c, group: 'device', label: 'Bilgisayar' },
  {
    ifd: 'exif',
    tag: 0x829a,
    group: 'other',
    label: 'Pozlama süresi',
    format: (v) => (Number(v[0]) >= 1 ? `${Number(v[0])} sn` : `1/${Math.round(1 / Number(v[0]))} sn`),
  },
  { ifd: 'exif', tag: 0x829d, group: 'other', label: 'Diyafram', format: (v) => `f/${Number(v[0]).toFixed(1)}` },
  { ifd: 'exif', tag: 0x8827, group: 'other', label: 'ISO' },
  { ifd: 'exif', tag: 0x920a, group: 'other', label: 'Odak uzaklığı', format: (v) => `${Number(v[0]).toFixed(1).replace('.0', '')} mm` },
  { ifd: 'exif', tag: 0x9209, group: 'other', label: 'Flaş', format: (v) => (Number(v[0]) & 1 ? 'Patladı' : 'Patlamadı') },
];

function decode(entry: TiffEntry): number[] | string {
  const view = new DataView(entry.data.buffer, entry.data.byteOffset, entry.data.byteLength);
  if (entry.type === 2) return new TextDecoder().decode(entry.data).replace(/\0[\s\S]*$/, '').trim();
  const values: number[] = [];
  for (let i = 0; i < entry.count && i < 16; i++) {
    const size = TYPE_SIZE[entry.type];
    const at = i * size;
    switch (entry.type) {
      case 1: case 7: values.push(view.getUint8(at)); break;
      case 6: values.push(view.getInt8(at)); break;
      case 3: values.push(view.getUint16(at, true)); break;
      case 8: values.push(view.getInt16(at, true)); break;
      case 4: values.push(view.getUint32(at, true)); break;
      case 9: values.push(view.getInt32(at, true)); break;
      case 5: values.push(view.getUint32(at, true) / (view.getUint32(at + 4, true) || 1)); break;
      case 10: values.push(view.getInt32(at, true) / (view.getInt32(at + 4, true) || 1)); break;
      case 11: values.push(view.getFloat32(at, true)); break;
      case 12: values.push(view.getFloat64(at, true)); break;
    }
  }
  return values;
}

function gpsCoordinates(entries: TiffEntry[]) {
  const find = (tag: number) => entries.find((entry) => entry.ifd === 'gps' && entry.tag === tag);
  const coordinate = (refTag: number, valueTag: number, negative: string) => {
    const value = find(valueTag);
    if (!value || value.count < 3) return null;
    const [d, m, s] = decode(value) as number[];
    const sign = String(find(refTag) ? decode(find(refTag)!) : '').toUpperCase() === negative ? -1 : 1;
    const result = sign * (d + m / 60 + s / 3600);
    return Number.isFinite(result) ? result : null;
  };
  const latitude = coordinate(0x0001, 0x0002, 'S');
  const longitude = coordinate(0x0003, 0x0004, 'W');
  return latitude !== null && longitude !== null && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180 && (latitude || longitude)
    ? { latitude, longitude }
    : null;
}

// ── Container parsing ──────────────────────────────────────
interface Segment {
  marker: number;
  start: number;
  end: number;
  payload: Uint8Array;
}

const XMP_ID = 'http://ns.adobe.com/xap/1.0/\0';
const XMP_EXT_ID = 'http://ns.adobe.com/xmp/extension/\0';

function jpegSegments(bytes: Uint8Array) {
  const segments: Segment[] = [];
  let offset = 2;
  while (offset + 4 <= bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xff) {
      offset++;
      continue;
    }
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    const end = offset + 2 + length;
    if (length < 2 || end > bytes.length) throw new Error('JPEG dosyası bozuk görünüyor.');
    segments.push({ marker, start: offset, end, payload: bytes.subarray(offset + 4, end) });
    if (marker === 0xda) break; // start of scan: image data follows
    offset = end;
  }
  const scan = segments.at(-1);
  if (!scan || scan.marker !== 0xda) throw new Error('JPEG görüntü verisi bulunamadı.');
  // The primary image ends at the first EOI outside a marker segment; anything after it
  // (MPF depth maps, HDR gain maps, appended previews) is a separate image with its own metadata.
  let end = scan.end;
  while (end + 1 < bytes.length) {
    if (bytes[end] !== 0xff) {
      end++;
      continue;
    }
    const next = bytes[end + 1];
    if (next === 0xd9) {
      end += 2;
      break;
    }
    if (next === 0x00 || next === 0xff || (next >= 0xd0 && next <= 0xd7)) {
      end += next === 0xff ? 1 : 2;
      continue;
    }
    const length = (bytes[end + 2] << 8) | bytes[end + 3];
    end += 2 + length;
  }
  return { segments, imageEnd: Math.min(end, bytes.length) };
}

function jpegBlocks(bytes: Uint8Array) {
  const { segments, imageEnd } = jpegSegments(bytes);
  let tiff: Uint8Array | null = null;
  const extras = new Set<string>();
  for (const segment of segments) {
    const id = ascii(segment.payload, 0, 35);
    if (segment.marker === 0xe1 && id.startsWith('Exif\0')) tiff ??= segment.payload.subarray(6);
    else if (segment.marker === 0xe1 && (id.startsWith(XMP_ID) || id.startsWith(XMP_EXT_ID))) extras.add('XMP');
    else if (segment.marker === 0xed) extras.add('IPTC / Photoshop');
    else if (segment.marker === 0xfe) extras.add('Yorum');
    else if (segment.marker === 0xe2 && id.startsWith('MPF')) extras.add('Ek görüntüler (MPF)');
    else if (segment.marker === 0xe0 && id.startsWith('JFXX')) extras.add('Küçük önizleme');
    else if (segment.marker >= 0xe1 && segment.marker <= 0xef && segment.marker !== 0xe2 && segment.marker !== 0xee)
      extras.add('Diğer uygulama verisi');
  }
  if (imageEnd < bytes.length - 2) extras.add('Dosya sonuna eklenmiş görüntü');
  return { segments, imageEnd, tiff, extras };
}

interface Chunk {
  type: string;
  data: Uint8Array;
}

function pngChunks(bytes: Uint8Array): Chunk[] {
  const chunks: Chunk[] = [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 8;
  while (offset + 12 <= bytes.length) {
    const length = view.getUint32(offset);
    const type = ascii(bytes, offset + 4, 4);
    if (offset + 12 + length > bytes.length) throw new Error('PNG dosyası bozuk görünüyor.');
    chunks.push({ type, data: bytes.subarray(offset + 8, offset + 8 + length) });
    offset += 12 + length;
    if (type === 'IEND') break;
  }
  return chunks;
}

const PNG_TEXT = new Set(['tEXt', 'zTXt', 'iTXt', 'tIME']);

function webpChunks(bytes: Uint8Array): Chunk[] {
  const chunks: Chunk[] = [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 12;
  const end = Math.min(bytes.length, 8 + view.getUint32(4, true));
  while (offset + 8 <= end) {
    const type = ascii(bytes, offset, 4);
    const length = view.getUint32(offset + 4, true);
    if (offset + 8 + length > bytes.length) throw new Error('WebP dosyası bozuk görünüyor.');
    chunks.push({ type, data: bytes.subarray(offset + 8, offset + 8 + length) });
    offset += 8 + length + (length & 1);
  }
  return chunks;
}

/** Some writers prefix the TIFF data in PNG/WebP with the JPEG "Exif\0\0" header. */
const stripExifHeader = (data: Uint8Array) => (ascii(data, 0, 6) === 'Exif\0\0' ? data.subarray(6) : data);

function containerTiff(bytes: Uint8Array, kind: ImageKind) {
  if (kind === 'jpeg') {
    const { tiff, extras } = jpegBlocks(bytes);
    return { tiff, extras };
  }
  const chunks = kind === 'png' ? pngChunks(bytes) : webpChunks(bytes);
  const extras = new Set<string>();
  let tiff: Uint8Array | null = null;
  for (const chunk of chunks) {
    if (chunk.type === (kind === 'png' ? 'eXIf' : 'EXIF')) tiff ??= stripExifHeader(chunk.data);
    else if (kind === 'webp' && chunk.type === 'XMP ') extras.add('XMP');
    else if (kind === 'png' && PNG_TEXT.has(chunk.type)) {
      const keyword = ascii(chunk.data, 0, Math.max(0, chunk.data.indexOf(0)));
      extras.add(chunk.type === 'tIME' ? 'Değiştirilme zamanı (tIME)' : keyword.includes('xmp') ? 'XMP' : `Metin: ${keyword || chunk.type}`);
    }
  }
  return { tiff, extras };
}

export function readMetadata(bytes: Uint8Array): PhotoMetadata {
  const kind = detectKind(bytes);
  if (!kind) throw new Error('Yalnızca JPEG, PNG ve WebP fotoğraflar desteklenir.');
  const { tiff: raw, extras } = containerTiff(bytes, kind);
  const tiff = raw ? readTiff(raw) : null;
  if (tiff?.hasThumbnail) extras.add('Küçük önizleme (thumbnail)');
  if (tiff?.hasMakerNote) extras.add('Üreticiye özel veri (MakerNote)');
  const entries = tiff?.entries ?? [];
  const counts: Record<MetaGroup, number> = { location: 0, date: 0, device: 0, other: 0 };
  for (const entry of entries) {
    const group = tagGroup(entry);
    if (group) counts[group]++;
  }
  const gps = gpsCoordinates(entries);
  const fields: MetaField[] = [];
  if (gps) fields.push({ group: 'location', label: 'Koordinat', value: `${gps.latitude.toFixed(6)}, ${gps.longitude.toFixed(6)}` });
  for (const label of LABELS) {
    const entry = entries.find((item) => item.ifd === label.ifd && item.tag === label.tag);
    if (!entry) continue;
    const value = decode(entry);
    const text = label.format ? label.format(value) : Array.isArray(value) ? value.join(', ') : value;
    if (text && !/NaN|Infinity/.test(text)) fields.push({ group: label.group, label: label.label, value: text.slice(0, 120) });
  }
  return { kind, fields, counts, gps, extras: [...extras] };
}

// ── Cleaning ───────────────────────────────────────────────
function keptTiff(raw: Uint8Array | null, remove: Set<MetaGroup>) {
  const tiff = raw ? readTiff(raw) : null;
  if (!tiff) return null;
  const kept = tiff.entries.filter((entry) => {
    const group = tagGroup(entry);
    return group === null || !remove.has(group);
  });
  // Orientation 1 (normal) alone carries nothing worth keeping.
  const meaningful = kept.some(
    (entry) => !(entry.ifd === 'ifd0' && entry.tag === ORIENTATION && new DataView(entry.data.buffer, entry.data.byteOffset).getUint16(0, true) === 1),
  );
  return meaningful ? writeTiff(kept) : null;
}

function jpegSegment(marker: number, payload: Uint8Array) {
  if (payload.length + 2 > 0xffff) throw new Error('EXIF verisi çok büyük.');
  return concat([new Uint8Array([0xff, marker, (payload.length + 2) >> 8, (payload.length + 2) & 0xff]), payload]);
}

function cleanJpeg(bytes: Uint8Array, remove: Set<MetaGroup>) {
  const { segments, imageEnd, tiff } = jpegBlocks(bytes);
  const exif = keptTiff(tiff, remove);
  const parts: Uint8Array[] = [bytes.subarray(0, 2)];
  const keep = (segment: Segment) => {
    const id = ascii(segment.payload, 0, 12);
    if (segment.marker === 0xe0) return id.startsWith('JFIF\0'); // JFIF yes, JFXX thumbnail no
    if (segment.marker === 0xe2) return id.startsWith('ICC_PROFILE'); // colour profile, not personal
    if (segment.marker === 0xee) return true; // Adobe colour transform affects decoding
    if (segment.marker >= 0xe1 && segment.marker <= 0xef) return false;
    return segment.marker !== 0xfe;
  };
  let inserted = false;
  const insert = () => {
    if (!inserted && exif) parts.push(jpegSegment(0xe1, concat([new TextEncoder().encode('Exif\0\0'), exif])));
    inserted = true;
  };
  for (const segment of segments) {
    // EXIF goes right after SOI/JFIF, before every other segment.
    if (!(segment.marker === 0xe0 && keep(segment))) insert();
    if (keep(segment)) parts.push(bytes.subarray(segment.start, segment.end));
  }
  parts.push(bytes.subarray(segments.at(-1)!.end, imageEnd));
  return concat(parts);
}

function pngChunk(type: string, data: Uint8Array) {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  out.set(new TextEncoder().encode(type), 4);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}

function cleanPng(bytes: Uint8Array, remove: Set<MetaGroup>) {
  const chunks = pngChunks(bytes);
  const exif = keptTiff(containerTiff(bytes, 'png').tiff, remove);
  const parts: Uint8Array[] = [bytes.subarray(0, 8)];
  for (const chunk of chunks) {
    if (chunk.type === 'eXIf' || PNG_TEXT.has(chunk.type)) continue;
    parts.push(pngChunk(chunk.type, chunk.data));
    if (chunk.type === 'IHDR' && exif) parts.push(pngChunk('eXIf', exif));
  }
  return concat(parts);
}

function cleanWebp(bytes: Uint8Array, remove: Set<MetaGroup>) {
  const chunks = webpChunks(bytes);
  const exif = keptTiff(containerTiff(bytes, 'webp').tiff, remove);
  const body: Uint8Array[] = [];
  const chunk = (type: string, data: Uint8Array) => {
    const head = new Uint8Array(8);
    head.set(new TextEncoder().encode(type));
    new DataView(head.buffer).setUint32(4, data.length, true);
    body.push(head, data, ...(data.length & 1 ? [new Uint8Array(1)] : []));
  };
  for (const item of chunks) {
    if (item.type === 'EXIF' || item.type === 'XMP ') continue;
    if (item.type === 'VP8X') {
      const flags = item.data.slice();
      flags[0] = (flags[0] & ~0x0c) | (exif ? 0x08 : 0); // bit 3: EXIF, bit 2: XMP
      chunk('VP8X', flags);
    } else chunk(item.type, item.data);
  }
  if (exif) chunk('EXIF', exif);
  const content = concat(body);
  const header = new Uint8Array(12);
  header.set(new TextEncoder().encode('RIFF'));
  new DataView(header.buffer).setUint32(4, content.length + 4, true);
  header.set(new TextEncoder().encode('WEBP'), 8);
  return concat([header, content]);
}

/** Returns a copy without the chosen groups and without XMP, IPTC, comments and thumbnails. */
export function cleanImage(bytes: Uint8Array, remove: Iterable<MetaGroup>): Uint8Array {
  const groups = new Set(remove);
  const kind = detectKind(bytes);
  if (kind === 'jpeg') return cleanJpeg(bytes, groups);
  if (kind === 'png') return cleanPng(bytes, groups);
  if (kind === 'webp') return cleanWebp(bytes, groups);
  throw new Error('Yalnızca JPEG, PNG ve WebP fotoğraflar desteklenir.');
}

export function cleanFileName(name: string, kind: ImageKind) {
  const base = name.replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'fotograf';
  return `${base}_temiz.${kind === 'jpeg' ? 'jpg' : kind}`;
}

export const mapLink = (gps: { latitude: number; longitude: number }) =>
  `https://www.openstreetmap.org/?mlat=${gps.latitude.toFixed(6)}&mlon=${gps.longitude.toFixed(6)}#map=16/${gps.latitude.toFixed(5)}/${gps.longitude.toFixed(5)}`;
