import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const modules = {};
const load = (name) => {
  if (modules[name]) return modules[name];
  const compiled = ts.transpileModule(readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  modules[name] = mod.exports;
  new Function('require', 'exports', 'module', compiled)((id) => (id.startsWith('./') ? load(id.slice(2)) : require(id)), mod.exports, mod);
  return (modules[name] = mod.exports);
};
const exif = load('exif');
const { crc32 } = load('photo-export');

const b64 = (value) => new Uint8Array(Buffer.from(value, 'base64'));
// 8 × 8 images written by Pillow, without any metadata.
const JPEG = b64('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzeiiirPEP/9k=');
const PNG = b64('iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAFElEQVR4nGPUiApgwAaYsIoOWgkAqUwA4owcYngAAAAASUVORK5CYII=');
const WEBP = b64('UklGRh4AAABXRUJQVlA4TBEAAAAvB8ABAAdQraIUqv+BiOh/AAA=');

const concat = (...parts) => {
  const out = new Uint8Array(parts.reduce((t, p) => t + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
};
const text = (value) => new TextEncoder().encode(value);
const ascii = (bytes, start, length) => String.fromCharCode(...bytes.subarray(start, start + length));

/**
 * Big-endian ("MM", as written by iPhones) TIFF with IFD0, EXIF, GPS and a thumbnail IFD1.
 * Tags: [tag, type, values]; ASCII values are strings, RATIONALs are [num, den] pairs.
 */
function bigEndianTiff({ ifd0, exifIfd, gps }) {
  const typeSize = { 2: 1, 3: 2, 4: 4, 5: 8 };
  const encode = (type, value) => {
    if (type === 2) return text(`${value}\0`);
    const bytes = new Uint8Array((type === 5 ? value.length * 8 : value.length * typeSize[type]));
    const view = new DataView(bytes.buffer);
    value.forEach((v, i) => {
      if (type === 3) view.setUint16(i * 2, v);
      if (type === 4) view.setUint32(i * 4, v);
      if (type === 5) {
        view.setUint32(i * 8, v[0]);
        view.setUint32(i * 8 + 4, v[1]);
      }
    });
    return bytes;
  };
  const ifds = [
    { tags: [...ifd0, [0x8769, 4, [0]], [0x8825, 4, [0]]].sort((a, b) => a[0] - b[0]) },
    { tags: exifIfd },
    { tags: gps },
    { tags: [[0x0103, 3, [6]]] }, // IFD1 (thumbnail)
  ];
  const size = (ifd) => 2 + ifd.tags.length * 12 + 4 + ifd.tags.reduce((t, [, type, v]) => { const n = encode(type, v).length; return t + (n > 4 ? n + (n & 1) : 0); }, 0);
  const offsets = [];
  let at = 8;
  for (const ifd of ifds) {
    offsets.push(at);
    at += size(ifd);
  }
  const out = new Uint8Array(at);
  const view = new DataView(out.buffer);
  out.set([0x4d, 0x4d, 0, 42]);
  view.setUint32(4, offsets[0]);
  ifds.forEach((ifd, index) => {
    const start = offsets[index];
    view.setUint16(start, ifd.tags.length);
    let data = start + 2 + ifd.tags.length * 12 + 4;
    ifd.tags.forEach(([tag, type, value], i) => {
      const entry = start + 2 + i * 12;
      const bytes = encode(type, value);
      view.setUint16(entry, tag);
      view.setUint16(entry + 2, type);
      view.setUint32(entry + 4, type === 2 ? bytes.length : type === 5 ? value.length : value.length);
      if (index === 0 && tag === 0x8769) view.setUint32(entry + 8, offsets[1]);
      else if (index === 0 && tag === 0x8825) view.setUint32(entry + 8, offsets[2]);
      else if (bytes.length <= 4) out.set(bytes, entry + 8);
      else {
        view.setUint32(entry + 8, data);
        out.set(bytes, data);
        data += bytes.length + (bytes.length & 1);
      }
    });
    view.setUint32(start + 2 + ifd.tags.length * 12, index === 0 ? offsets[3] : 0);
  });
  return out;
}

const tiff = bigEndianTiff({
  ifd0: [
    [0x010f, 2, 'Apple'],
    [0x0110, 2, 'iPhone 15 Pro'],
    [0x0112, 3, [6]],
    [0x0131, 2, '17.4'],
    [0x0132, 2, '2026:05:01 10:20:30'],
  ],
  exifIfd: [
    [0x829a, 5, [[1, 120]]],
    [0x829d, 5, [[178, 100]]],
    [0x8827, 3, [64]],
    [0x9003, 2, '2026:05:01 10:20:30'],
    [0x9011, 2, '+03:00'],
    [0xa434, 2, 'iPhone 15 Pro back camera'],
  ],
  gps: [
    [0x0001, 2, 'N'],
    [0x0002, 5, [[41, 1], [0, 1], [2268, 100]]],
    [0x0003, 2, 'E'],
    [0x0004, 5, [[39, 1], [43, 1], [1188, 100]]],
    [0x0006, 5, [[35, 1]]],
    [0x001d, 2, '2026:05:01'],
  ],
});

const segment = (marker, payload) => concat(new Uint8Array([0xff, marker, (payload.length + 2) >> 8, (payload.length + 2) & 255]), payload);
const appended = concat(new Uint8Array([0xff, 0xd8]), segment(0xe1, concat(text('Exif\0\0'), tiff)), JPEG.subarray(2));
const jpeg = concat(
  JPEG.subarray(0, 20), // SOI + JFIF
  segment(0xe1, concat(text('Exif\0\0'), tiff)),
  segment(0xe1, text('http://ns.adobe.com/xap/1.0/\0<x:xmpmeta>GPS</x:xmpmeta>')),
  segment(0xed, text('Photoshop 3.0\0IPTC')),
  segment(0xe2, text('MPF\0\0\0\0\0')),
  segment(0xfe, text('gizli yorum')),
  JPEG.subarray(20),
  appended, // a second image after EOI, like an MPF depth map
);

// ── JPEG: reading (big-endian) ──────────────────────────────
const meta = exif.readMetadata(jpeg);
assert.equal(meta.kind, 'jpeg');
assert.deepEqual(meta.counts, { location: 5, date: 4, device: 4, other: 3 });
assert.ok(Math.abs(meta.gps.latitude - 41.0063) < 1e-6 && Math.abs(meta.gps.longitude - 39.719966) < 1e-5);
const field = (label) => meta.fields.find((f) => f.label === label)?.value;
assert.equal(field('Model'), 'iPhone 15 Pro');
assert.equal(field('Çekim zamanı'), '2026:05:01 10:20:30');
assert.equal(field('Yükseklik'), '35 m');
assert.equal(field('Pozlama süresi'), '1/120 sn');
assert.equal(field('Diyafram'), 'f/1.8');
assert.deepEqual(
  [...meta.extras].sort(),
  ['Dosya sonuna eklenmiş görüntü', 'Ek görüntüler (MPF)', 'IPTC / Photoshop', 'Küçük önizleme (thumbnail)', 'XMP', 'Yorum'].sort(),
);

// ── JPEG: cleaning ─────────────────────────────────────────
const all = exif.cleanImage(jpeg, ['location', 'date', 'device', 'other']);
const allMeta = exif.readMetadata(all);
assert.deepEqual(allMeta.counts, { location: 0, date: 0, device: 0, other: 0 });
assert.deepEqual(allMeta.extras, []);
for (const secret of ['Apple', 'iPhone', 'gizli', 'xmpmeta', 'Photoshop', 'MPF', '2026:05']) assert(!Buffer.from(all).includes(secret), secret);
assert.equal(all.at(-2), 0xff);
assert.equal(all.at(-1), 0xd9, 'ends at the primary image EOI');
assert.ok(Buffer.from(all).includes(Buffer.from(JPEG.subarray(20))), 'image data is copied unchanged');
assert.ok(Buffer.from(all).includes(Buffer.from('JFIF')), 'JFIF header kept');
// Orientation 6 survives so the photo is not shown sideways.
const orientation = exif.readMetadata(all);
assert.equal(orientation.fields.length, 0);
assert.ok(Buffer.from(all).indexOf(Buffer.from('Exif\0\0')) > 0, 'a minimal EXIF block keeps orientation');

const locationOnly = exif.cleanImage(jpeg, ['location']);
const kept = exif.readMetadata(locationOnly);
assert.equal(kept.gps, null);
assert.deepEqual(kept.counts, { location: 0, date: 4, device: 4, other: 3 });
assert.equal(kept.fields.find((f) => f.label === 'Model').value, 'iPhone 15 Pro', 'big-endian values survive re-encoding');
assert.equal(kept.fields.find((f) => f.label === 'Diyafram').value, 'f/1.8');
assert.equal(kept.fields.find((f) => f.label === 'Çekim zamanı').value, '2026:05:01 10:20:30');

const noDate = exif.readMetadata(exif.cleanImage(jpeg, ['date']));
assert.equal(noDate.counts.date, 0, 'GPS date stamp goes with the date group');
assert.equal(noDate.counts.location, 5);

const plain = exif.cleanImage(JPEG, ['location']);
assert.deepEqual(plain, JPEG, 'a clean JPEG is returned byte for byte');
assert.equal(exif.cleanImage(plain, []).length, JPEG.length);

// ── PNG ───────────────────────────────────────────────────
const pngChunk = (type, data) => {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  out.set(text(type), 4);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
};
const ihdrEnd = 8 + 25;
const png = concat(PNG.subarray(0, ihdrEnd), pngChunk('eXIf', tiff), pngChunk('tEXt', text('Author\0Metin')), pngChunk('tIME', new Uint8Array(7)), PNG.subarray(ihdrEnd));
const pngMeta = exif.readMetadata(png);
assert.equal(pngMeta.kind, 'png');
assert.equal(pngMeta.counts.location, 5);
assert.ok(pngMeta.extras.includes('Metin: Author'));
const pngClean = exif.cleanImage(png, ['location', 'device']);
const pngCleanMeta = exif.readMetadata(pngClean);
assert.deepEqual(pngCleanMeta.counts, { location: 0, date: 4, device: 0, other: 3 });
assert.deepEqual(pngCleanMeta.extras, []);
// Every chunk CRC in the output is valid.
for (let o = 8; o < pngClean.length; ) {
  const view = new DataView(pngClean.buffer, pngClean.byteOffset);
  const length = view.getUint32(o);
  assert.equal(view.getUint32(o + 8 + length), crc32(pngClean.subarray(o + 4, o + 8 + length)), ascii(pngClean, o + 4, 4));
  o += 12 + length;
}

// ── WebP (extended format with VP8X) ──────────────────────
const riff = (chunks) => {
  const body = concat(text('WEBP'), ...chunks);
  const head = concat(text('RIFF'), new Uint8Array(4));
  new DataView(head.buffer).setUint32(4, body.length, true);
  return concat(head, body);
};
const webpChunk = (type, data) => {
  const head = concat(text(type), new Uint8Array(4));
  new DataView(head.buffer).setUint32(4, data.length, true);
  return concat(head, data, data.length & 1 ? new Uint8Array(1) : new Uint8Array(0));
};
const vp8x = new Uint8Array([0x0c, 0, 0, 0, 7, 0, 0, 7, 0, 0]); // EXIF + XMP flags, 8 × 8 canvas
const vp8l = WEBP.subarray(12);
const webp = riff([webpChunk('VP8X', vp8x), vp8l, webpChunk('EXIF', concat(text('Exif\0\0'), tiff)), webpChunk('XMP ', text('<x:xmpmeta/>'))]);
const webpMeta = exif.readMetadata(webp);
assert.equal(webpMeta.kind, 'webp');
assert.equal(webpMeta.counts.device, 4, 'the Exif\\0\\0 prefix is tolerated');
assert.deepEqual(webpMeta.extras, ['XMP', 'Küçük önizleme (thumbnail)']);
const webpClean = exif.cleanImage(webp, ['location', 'date', 'device', 'other']);
assert.equal(new DataView(webpClean.buffer).getUint32(4, true), webpClean.length - 8, 'RIFF size');
assert.equal(webpClean[20] & 0x0c, 0x08, 'VP8X keeps only the EXIF flag (orientation)');
assert.ok(Buffer.from(webpClean).includes(Buffer.from(vp8l)), 'image chunk unchanged');
assert.deepEqual(exif.readMetadata(webpClean).extras, []);

// ── Errors and helpers ────────────────────────────────────
assert.throws(() => exif.readMetadata(text('GIF89a........')), /JPEG, PNG ve WebP/);
assert.throws(() => exif.readMetadata(JPEG.subarray(0, 30)), /bozuk|bulunamadı/);
assert.equal(exif.cleanFileName('IMG_1234.HEIC.jpg', 'jpeg'), 'IMG_1234-HEIC_temiz.jpg');
assert.equal(exif.cleanFileName('Tatil fotoğrafı (1).png', 'png'), 'Tatil-fotoğrafı-1_temiz.png');
assert.match(exif.mapLink({ latitude: 41.0063, longitude: 39.719967 }), /mlat=41\.006300&mlon=39\.719967/);

console.log('EXIF checks passed: big-endian TIFF, GPS/date/device/other groups, orientation, XMP/IPTC/MPF/comment, appended images, PNG CRCs, WebP VP8X.');
