import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const load = (file, localRequire) => {
  const compiled = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  new Function('require', 'exports', 'module', compiled)(localRequire, mod.exports, mod);
  return mod.exports;
};
const qr = load('../src/lib/qr-code.ts', require);
const bc = load('../src/lib/barcode.ts', (id) => (id === './qr-code' ? qr : require(id)));
const encode = (format, value, options) => bc.encodeBarcode(format, value, options);
const bars = (barcode) => barcode.modules.map(Number).join('');

// Check digits (reference numbers from GS1 and Wikipedia examples)
assert.equal(bc.gtinCheckDigit('400638133393'), 1);
assert.equal(bc.gtinCheckDigit('03600029145'), 2);
assert.equal(bc.gtinCheckDigit('869123456789'), 0);
assert.equal(bc.gtinCheckDigit('963850 7'.replace(' ', '')), 4);
assert.equal(bc.code39CheckChar('DMR'), 'J');

// EAN-13: 95 modules, guards, first digit encoded in the left-half parity
const ean = encode('ean13', '400638133393');
assert.equal(ean.text, '4006381333931');
assert.equal(ean.check, '1');
assert.equal(ean.modules.length, 95);
assert.equal(bars(ean).slice(0, 3), '101');
assert.equal(bars(ean).slice(45, 50), '01010');
assert.equal(bars(ean).slice(-3), '101');
assert.equal(bars(ean).slice(3, 10), '0001101', 'second digit 0 with parity L');
assert.equal(ean.guards.size, 11);
assert.equal(encode('ean13', '4006381333931').text, '4006381333931', 'full number with a valid check digit');
assert.equal(encode('ean13', '869 1234 5678 9').text, '8691234567890', 'spaces are ignored');

// UPC-A is EAN-13 with a leading zero; EAN-8 is 67 modules
assert.equal(bars(encode('upca', '03600029145')), bars(encode('ean13', '003600029145')));
assert.equal(encode('upca', '03600029145').text, '036000291452');
assert.equal(encode('ean8', '9638507').modules.length, 67);
assert.equal(encode('ean8', '9638507').text, '96385074');

// ITF-14: start 1010, 14 interleaved digits, wide:narrow 3:1
const itf = encode('itf14', '1869123456789');
assert.equal(itf.text, '18691234567897');
assert.equal(bars(itf).slice(0, 4), '1010');
assert.equal(itf.modules.length, 4 + 7 * (2 * 3 + 3 * 1) * 2 + 5);

// Code 39: 16 modules per character including the gap; optional mod-43 check
const c39 = encode('code39', 'dmr-0042');
assert.equal(c39.text, 'DMR-0042', 'lower case is upper-cased');
assert.equal(c39.modules.length, 10 * 16 - 1);
assert.equal(encode('code39', 'DMR', { code39Check: true }).text, 'DMRJ');
assert.throws(() => encode('code39', ''), 'empty values never reach the encoder');

// Code 128: subset C for digit runs, checksum, stop pattern
assert.deepEqual(bc.code128Values('12345678').slice(0, 5), [105, 12, 34, 56, 78]);
assert.deepEqual(bc.code128Values('A1234567B').slice(0, 8), [104, 33, 17, 99, 23, 45, 67, 100], 'odd run: first digit stays in B');
assert.deepEqual(bc.code128Values('12345').slice(0, 4), [105, 12, 34, 100]);
const pjj = bc.code128Values('PJJ123C');
assert.equal(pjj.at(-1), 106);
assert.equal(pjj.at(-2), (104 + 48 * 1 + 42 * 2 + 42 * 3 + 17 * 4 + 18 * 5 + 19 * 6 + 35 * 7) % 103, 'checksum');
const c128 = encode('code128', 'STK-2026-0042');
assert.equal(bars(c128).slice(-13), '1100011101011', 'stop pattern');
assert.equal(c128.modules.length % 11, 2);

// Validation messages
assert.match(bc.validateBarcode('ean13', '12345'), /12 hane/);
assert.match(bc.validateBarcode('ean13', '4006381333932'), /son hane 1/);
assert.match(bc.validateBarcode('ean13', '40063813339a'), /yalnızca rakam/);
assert.match(bc.validateBarcode('code128', 'Şeker'), /Ş/);
assert.match(bc.validateBarcode('code39', 'A_B'), /_/);
assert.match(bc.validateBarcode('code128', ''), /değeri gir/);
assert.equal(bc.validateBarcode('code128', 'Hello, World! ~{}|'), null);
assert.throws(() => encode('ean8', '123'));

// SVG: bars, EAN digits in the quiet zone, escaping, transparency
const svg = bc.renderBarcodeSvg(ean, bc.defaultStyle);
assert.equal(svg.width, 10 + 95 + 10);
assert.match(svg.svg, /^<svg[^>]+viewBox="0 0 115 /);
assert.equal((svg.svg.match(/<text /g) || []).length, 13, 'one label per EAN-13 digit');
assert((svg.svg.match(/M\d+ /g) || []).length >= (bars(ean).match(/1+/g) || []).length, 'every bar is drawn');
const plain = bc.renderBarcodeSvg(encode('code128', 'a<b&"c"'), { ...bc.defaultStyle, transparent: true });
assert(plain.svg.includes('a&lt;b&amp;&quot;c&quot;'));
assert(!plain.svg.includes('<rect'), 'transparent background');
const bare = bc.renderBarcodeSvg(ean, { ...bc.defaultStyle, showText: false, margin: 0 });
assert.equal(bare.width, 95);
assert(!bare.svg.includes('<text'));

// Readability warnings
assert.equal(bc.barcodeWarning(ean, bc.defaultStyle), null);
assert.match(bc.barcodeWarning(ean, { ...bc.defaultStyle, foreground: '#d81b1b' }), /[Kk]ırmızı|kontrast/);
assert.match(bc.barcodeWarning(ean, { ...bc.defaultStyle, foreground: '#ffffff', background: '#000000' }), /Açık renkli/);
assert.match(bc.barcodeWarning(ean, { ...bc.defaultStyle, margin: 4 }), /sessiz bölge/);
assert.equal(bc.gs1Hint(ean), null);
assert.match(bc.gs1Hint(encode('ean13', '869123456789')), /Türkiye/);
assert.equal(bc.barcodeFileName(c128, 'svg'), 'biyik-dev_barkod_code128_STK-2026-0042.svg');

console.log('Barcode checks passed: EAN-13/8, UPC-A, ITF-14, Code 39, Code 128, check digits, validation, SVG, warnings.');
