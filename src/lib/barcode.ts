import { contrastRatio } from './qr-code';

export type BarcodeFormat = 'ean13' | 'ean8' | 'upca' | 'itf14' | 'code128' | 'code39';

export interface BarcodeFormatInfo {
  value: BarcodeFormat;
  label: string;
  /** Where the format is used, shown under the selector. */
  usage: string;
  placeholder: string;
  hint: string;
  numeric: boolean;
}

export const barcodeFormats: BarcodeFormatInfo[] = [
  {
    value: 'ean13',
    label: 'EAN-13',
    usage: 'Market ve mağaza ürünleri; Türkiye’de en yaygın ürün barkodu.',
    placeholder: '869123456789',
    hint: '12 hane; 13. hane otomatik',
    numeric: true,
  },
  {
    value: 'code128',
    label: 'Code 128',
    usage: 'Kargo, depo, stok ve seri numarası etiketleri; harf, rakam ve işaret içerebilir.',
    placeholder: 'STK-2026-0042',
    hint: 'harf, rakam ve işaret',
    numeric: false,
  },
  {
    value: 'ean8',
    label: 'EAN-8',
    usage: 'Sakız, kalem gibi küçük ambalajlı ürünler.',
    placeholder: '8691234',
    hint: '7 hane; 8. hane otomatik',
    numeric: true,
  },
  {
    value: 'upca',
    label: 'UPC-A',
    usage: 'ABD ve Kanada perakendesi; Amazon gibi pazar yerleri.',
    placeholder: '03600029145',
    hint: '11 hane; 12. hane otomatik',
    numeric: true,
  },
  {
    value: 'itf14',
    label: 'ITF-14',
    usage: 'Koli ve dış ambalaj; ürünün GTIN numarasını taşır.',
    placeholder: '1869123456789',
    hint: '13 hane; 14. hane otomatik',
    numeric: true,
  },
  {
    value: 'code39',
    label: 'Code 39',
    usage: 'Demirbaş, envanter ve sanayi etiketleri; büyük harf ve rakam.',
    placeholder: 'DMR-0042',
    hint: 'A–Z, 0–9, - . $ / + % boşluk',
    numeric: false,
  },
];

export const getFormat = (format: BarcodeFormat) => barcodeFormats.find((item) => item.value === format)!;

/** Digit count without / with the check digit, for GTIN-style formats. */
const gtinLength: Partial<Record<BarcodeFormat, number>> = { ean13: 13, ean8: 8, upca: 12, itf14: 14 };

export interface BarcodeOptions {
  /** Adds the optional modulo-43 check character to Code 39. */
  code39Check: boolean;
}

export const defaultOptions: BarcodeOptions = { code39Check: false };

export interface BarcodeStyle {
  foreground: string;
  background: string;
  transparent: boolean;
  /** Bar height in modules. */
  height: number;
  /** Quiet zone on each side, in modules. */
  margin: number;
  showText: boolean;
}

export const defaultStyle: BarcodeStyle = {
  foreground: '#1e2227',
  background: '#ffffff',
  transparent: false,
  height: 60,
  margin: 10,
  showText: true,
};

/** Spaces and dashes are allowed while typing numbers; only digits are encoded. */
export function normalizeValue(format: BarcodeFormat, value: string) {
  if (getFormat(format).numeric) return value.replace(/[\s-]/g, '');
  if (format === 'code39') return value.trim().toLocaleUpperCase('en');
  return value.trim();
}

/** GS1 modulo-10 check digit for EAN, UPC and ITF-14 (weights 3, 1, 3 … from the right). */
export function gtinCheckDigit(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = Number(digits[digits.length - 1 - i]);
    sum += i % 2 === 0 ? digit * 3 : digit;
  }
  return (10 - (sum % 10)) % 10;
}

const CODE39_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%';

/** Returns a user-facing problem with the input, or null when it can be encoded. */
export function validateBarcode(format: BarcodeFormat, raw: string): string | null {
  const value = normalizeValue(format, raw);
  if (!value) return 'Barkoda dönüştürülecek değeri gir.';
  const full = gtinLength[format];
  if (full) {
    if (!/^\d+$/.test(value)) return `${getFormat(format).label} yalnızca rakam içerebilir.`;
    if (value.length !== full - 1 && value.length !== full)
      return `${getFormat(format).label} için ${full - 1} hane gir; kontrol hanesi otomatik eklenir.`;
    if (value.length === full) {
      const expected = gtinCheckDigit(value.slice(0, -1));
      if (Number(value.at(-1)) !== expected)
        return `Kontrol hanesi hatalı: son hane ${expected} olmalı. Emin değilsen son haneyi silerek ${full - 1} hane gir.`;
    }
    return null;
  }
  if (format === 'code39') {
    const invalid = [...value].find((char) => !CODE39_CHARS.includes(char));
    if (invalid) return `Code 39 “${invalid}” karakterini desteklemez. Harf, rakam ve - . $ / + % boşluk kullanabilirsin.`;
    if (value.length > 40) return 'Code 39 için en fazla 40 karakter gir; daha uzun değerler için Code 128 kullan.';
    return null;
  }
  const invalid = [...value].find((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) > 126);
  if (invalid) return `Code 128 “${invalid}” karakterini desteklemez. Türkçe karakter yerine (ç → c, ş → s) kullan.`;
  if (value.length > 80) return 'En fazla 80 karakter girebilirsin.';
  return null;
}

export interface EncodedBarcode {
  format: BarcodeFormat;
  /** One entry per module: true is a bar. Quiet zones are not included. */
  modules: boolean[];
  /** Human-readable text, including any check digit. */
  text: string;
  /** Modules drawn longer than the rest (EAN/UPC guard bars). */
  guards: Set<number>;
  /** The check digit or character that was appended, if any. */
  check?: string;
}

const bits = (pattern: string) => [...pattern].map((bit) => bit === '1');

/** Bar/space widths (bar first) → modules. */
const widths = (pattern: string) =>
  [...pattern].flatMap((width, index) => Array<boolean>(Number(width)).fill(index % 2 === 0));

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

// ── EAN / UPC ────────────────────────────────────────────────
const EAN_L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const EAN_R = EAN_L.map((code) => [...code].map((bit) => (bit === '1' ? '0' : '1')).join(''));
const EAN_G = EAN_R.map((code) => [...code].reverse().join(''));
/** Odd/even parity of the left half encodes the first EAN-13 digit. */
const EAN_PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

function eanModules(left: string[], right: string[]) {
  return bits(`101${left.join('')}01010${right.join('')}101`);
}

function encodeEan13(digits: string) {
  const parity = EAN_PARITY[Number(digits[0])];
  const left = [...digits.slice(1, 7)].map((d, i) => (parity[i] === 'L' ? EAN_L : EAN_G)[Number(d)]);
  const right = [...digits.slice(7)].map((d) => EAN_R[Number(d)]);
  return eanModules(left, right);
}

// ── ITF (interleaved 2 of 5) ─────────────────────────────────
const ITF_DIGITS = ['NNWWN', 'WNNNW', 'NWNNW', 'WWNNN', 'NNWNW', 'WNWNN', 'NWWNN', 'NNNWW', 'WNNWN', 'NWNWN'];
const ITF_WIDE = 3;

function encodeItf(digits: string) {
  let pattern = '1111';
  for (let i = 0; i < digits.length; i += 2) {
    const bars = ITF_DIGITS[Number(digits[i])];
    const spaces = ITF_DIGITS[Number(digits[i + 1])];
    for (let k = 0; k < 5; k++) pattern += `${bars[k] === 'W' ? ITF_WIDE : 1}${spaces[k] === 'W' ? ITF_WIDE : 1}`;
  }
  return widths(`${pattern}${ITF_WIDE}11`);
}

// ── Code 39 ─────────────────────────────────────────────────
/**
 * Each character is five bars (two wide, same 2-of-5 patterns as ITF) and four spaces (one wide).
 * Rows of ten characters share the position of the wide space; $ / + % use three wide spaces.
 */
function code39Pattern(char: string) {
  const special: Record<string, string> = { $: 'WWWN', '/': 'WWNW', '+': 'WNWW', '%': 'NWWW' };
  let bars = 'NNNNN';
  let spaces = special[char];
  if (!spaces) {
    const rows = ['1234567890', 'ABCDEFGHIJ', 'KLMNOPQRST', 'UVWXYZ-. *'];
    const row = rows.findIndex((chars) => chars.includes(char));
    const column = rows[row].indexOf(char);
    bars = ITF_DIGITS[(column + 1) % 10];
    spaces = ['NWNN', 'NNWN', 'NNNW', 'WNNN'][row];
  }
  let pattern = '';
  for (let k = 0; k < 5; k++) pattern += `${bars[k] === 'W' ? 3 : 1}${k < 4 ? (spaces[k] === 'W' ? 3 : 1) : ''}`;
  return pattern;
}

function encodeCode39(value: string) {
  return widths([...`*${value}*`].map(code39Pattern).join('1'));
}

export function code39CheckChar(value: string) {
  const sum = [...value].reduce((total, char) => total + CODE39_CHARS.indexOf(char), 0);
  return CODE39_CHARS[sum % 43];
}

// ── Code 128 ────────────────────────────────────────────────
const CODE128 = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112',
];
const START_B = 104;
const START_C = 105;
const TO_B = 100;
const TO_C = 99;
const STOP = 106;

const digitRun = (value: string, from: number) => {
  let end = from;
  while (end < value.length && value[end] >= '0' && value[end] <= '9') end++;
  return end - from;
};

/**
 * Symbol values for a printable-ASCII string: subset B for text, subset C (two digits per
 * symbol) for runs of four or more digits, which keeps numeric labels short.
 */
export function code128Values(value: string) {
  const values: number[] = [];
  let set: 'B' | 'C' = digitRun(value, 0) >= 4 || (value.length === 2 && digitRun(value, 0) === 2) ? 'C' : 'B';
  values.push(set === 'C' ? START_C : START_B);
  let i = 0;
  while (i < value.length) {
    if (set === 'C') {
      if (digitRun(value, i) >= 2) {
        values.push(Number(value.slice(i, i + 2)));
        i += 2;
        continue;
      }
      values.push(TO_B);
      set = 'B';
    }
    const run = digitRun(value, i);
    if (run >= 4) {
      // An odd run keeps its first digit in subset B so the rest pairs up.
      if (run % 2 === 1) values.push(value.charCodeAt(i++) - 32);
      values.push(TO_C);
      set = 'C';
      continue;
    }
    values.push(value.charCodeAt(i++) - 32);
  }
  const checksum = values.reduce((sum, symbol, index) => sum + symbol * Math.max(index, 1), 0) % 103;
  return [...values, checksum, STOP];
}

function encodeCode128(value: string) {
  return widths(code128Values(value).map((symbol) => CODE128[symbol]).join(''));
}

/** Encodes a value that already passed {@link validateBarcode}. */
export function encodeBarcode(format: BarcodeFormat, raw: string, options: BarcodeOptions = defaultOptions): EncodedBarcode {
  const problem = validateBarcode(format, raw);
  if (problem) throw new Error(problem);
  const value = normalizeValue(format, raw);
  const full = gtinLength[format];
  if (full) {
    const body = value.slice(0, full - 1);
    const check = String(gtinCheckDigit(body));
    const digits = body + check;
    if (format === 'ean13')
      return { format, modules: encodeEan13(digits), text: digits, check, guards: new Set([...range(0, 2), ...range(45, 49), ...range(92, 94)]) };
    if (format === 'upca')
      return {
        format,
        modules: encodeEan13(`0${digits}`),
        text: digits,
        check,
        // UPC-A also extends the first and last digit's bars.
        guards: new Set([...range(0, 9), ...range(45, 49), ...range(85, 94)]),
      };
    if (format === 'ean8') {
      const left = [...digits.slice(0, 4)].map((d) => EAN_L[Number(d)]);
      const right = [...digits.slice(4)].map((d) => EAN_R[Number(d)]);
      return { format, modules: eanModules(left, right), text: digits, check, guards: new Set([...range(0, 2), ...range(31, 35), ...range(64, 66)]) };
    }
    return { format, modules: encodeItf(digits), text: digits, check, guards: new Set() };
  }
  if (format === 'code39') {
    const check = options.code39Check ? code39CheckChar(value) : undefined;
    const encoded = value + (check ?? '');
    return { format, modules: encodeCode39(encoded), text: encoded, check, guards: new Set() };
  }
  return { format, modules: encodeCode128(value), text: value, guards: new Set() };
}

/** Digit groups under EAN/UPC symbols: [text, centre x in modules from the first bar, small]. */
function eanLabels(barcode: EncodedBarcode): [string, number, boolean][] {
  const digits = [...barcode.text];
  const at = (start: number, chars: string[]) =>
    chars.map((char, i): [string, number, boolean] => [char, start + 7 * i + 3.5, false]);
  if (barcode.format === 'ean13') return [[digits[0], -5, false], ...at(3, digits.slice(1, 7)), ...at(50, digits.slice(7))];
  if (barcode.format === 'ean8') return [...at(3, digits.slice(0, 4)), ...at(36, digits.slice(4))];
  return [[digits[0], -5, true], ...at(10, digits.slice(1, 6)), ...at(50, digits.slice(6, 11)), [digits[11], 100, true]];
}

const escapeXml = (value: string) =>
  value.replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

const FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** SVG in module units (width and height are in modules); bars are crisp at any integer scale. */
export function renderBarcodeSvg(barcode: EncodedBarcode, style: BarcodeStyle) {
  const ean = barcode.format === 'ean13' || barcode.format === 'ean8' || barcode.format === 'upca';
  // EAN digits sit in 7-module slots, so they are set smaller than free text.
  const fontSize = ean ? 8.5 : 10;
  // EAN-13 and UPC-A print a digit inside the left (and right) quiet zone; never clip it.
  const left = style.showText && (barcode.format === 'ean13' || barcode.format === 'upca') ? Math.max(style.margin, 10) : style.margin;
  const right = style.showText && barcode.format === 'upca' ? Math.max(style.margin, 10) : style.margin;
  const pad = Math.min(style.margin, 6);
  const width = left + barcode.modules.length + right;
  const guardExtra = style.showText && ean ? fontSize * 0.6 : 0;
  const textBlock = style.showText ? (ean ? fontSize * 1.1 : fontSize * 1.3) : 0;
  const height = pad * 2 + style.height + textBlock;

  const bars: string[] = [];
  for (let i = 0; i < barcode.modules.length; i++) {
    if (!barcode.modules[i]) continue;
    let end = i;
    const guard = barcode.guards.has(i);
    while (end + 1 < barcode.modules.length && barcode.modules[end + 1] && barcode.guards.has(end + 1) === guard) end++;
    bars.push(`M${left + i} ${pad}h${end - i + 1}v${style.height + (guard ? guardExtra : 0)}h-${end - i + 1}z`);
    i = end;
  }

  const baseline = pad + style.height + (ean ? fontSize * 1.02 : fontSize * 1.15);
  const labels = !style.showText
    ? ''
    : ean
      ? eanLabels(barcode)
          .map(
            ([char, x, small]) =>
              `<text x="${left + x}" y="${baseline}" font-size="${small ? fontSize * 0.75 : fontSize}">${char}</text>`,
          )
          .join('')
      : `<text x="${width / 2}" y="${baseline}" font-size="${fontSize}">${escapeXml(barcode.text)}</text>`;

  const background = style.transparent ? '' : `<rect width="${width}" height="${height}" fill="${style.background}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width * 4}" height="${height * 4}" shape-rendering="crispEdges">${background}<path fill="${style.foreground}" d="${bars.join('')}"/>${
    labels ? `<g fill="${style.foreground}" font-family="${FONT}" text-anchor="middle" shape-rendering="auto">${labels}</g>` : ''
  }</svg>`;
  return { svg, width, height };
}

/** Laser scanners read red as white and need dark bars on a light background. */
export function barcodeWarning(barcode: EncodedBarcode | null, style: BarcodeStyle): string | null {
  const background = style.transparent ? '#ffffff' : style.background;
  if (contrastRatio(style.foreground, background) < 4.5)
    return 'Çubuklarla zemin arasındaki kontrast düşük; barkod okuyucular kodu okuyamayabilir.';
  const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
  if (lum(style.foreground) > lum(background)) return 'Açık renkli çubuklar koyu zeminde okunmaz; koyu çubuk, açık zemin kullan.';
  const red = parseInt(style.foreground.slice(1, 3), 16);
  if (red > 150 && red > parseInt(style.foreground.slice(3, 5), 16) + 60)
    return 'Kırmızı tonlu çubukları lazer okuyucular göremez; siyah veya koyu mavi kullan.';
  if (style.margin < 10) return 'Kenar boşluğu (sessiz bölge) 10 modülün altında; okuyucular barkodun başını bulamayabilir.';
  if (barcode && style.height < barcode.modules.length * 0.15)
    return 'Barkod genişliğine göre çok kısa; yüksekliği artırmak okumayı kolaylaştırır.';
  return null;
}

/** GS1 prefix of an EAN-13 number, when it says something useful. */
export function gs1Hint(barcode: EncodedBarcode): string | null {
  if (barcode.format !== 'ean13') return null;
  const prefix = Number(barcode.text.slice(0, 3));
  if (prefix === 868 || prefix === 869) return 'Ön ek 868–869: GS1 Türkiye';
  if (prefix >= 200 && prefix <= 299) return 'Ön ek 200–299: mağaza içi kullanım';
  if (prefix <= 19) return 'Ön ek 000–019: ABD ve Kanada (UPC)';
  return null;
}

export function barcodeFileName(barcode: EncodedBarcode, extension: 'png' | 'svg') {
  const value = barcode.text.replace(/[^A-Za-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32) || 'kod';
  return `biyik-dev_barkod_${barcode.format}_${value}.${extension}`;
}
