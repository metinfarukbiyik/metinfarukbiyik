import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL('../src/lib/qr-code.ts', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } },
).outputText;
const mod = { exports: {} };
new Function('require', 'exports', 'module', compiled)(require, mod.exports, mod);
const qr = mod.exports;
const content = (patch) => ({ ...qr.defaultContent, ...patch });

// Payloads
assert.equal(qr.buildPayload(content({ url: 'biyik.dev' })), 'https://biyik.dev');
assert.equal(qr.buildPayload(content({ url: ' http://a.co/x ' })), 'http://a.co/x');
assert.equal(qr.buildPayload(content({ url: '' })), '');
assert.equal(
  qr.buildPayload(content({ kind: 'wifi', ssid: 'Ev;Ağı', password: 'p:a\\ss,"1"', security: 'WPA' })),
  'WIFI:T:WPA;S:Ev\\;Ağı;P:p\\:a\\\\ss\\,\\"1\\";;',
);
assert.equal(
  qr.buildPayload(content({ kind: 'wifi', ssid: 'Misafir', password: 'ignored', security: 'nopass', hidden: true })),
  'WIFI:T:nopass;S:Misafir;H:true;;',
);
assert.equal(qr.buildPayload(content({ kind: 'wifi', ssid: '' })), '');
assert.equal(
  qr.buildPayload(content({ kind: 'email', email: 'metin@biyik.dev', subject: 'Merhaba dünya', body: 'a&b' })),
  'mailto:metin@biyik.dev?subject=Merhaba%20d%C3%BCnya&body=a%26b',
);
assert.equal(qr.buildPayload(content({ kind: 'phone', phone: '+90 (540) 461 35 43' })), 'tel:+905404613543');
assert.equal(qr.buildPayload(content({ kind: 'text', text: 'Merhaba' })), 'Merhaba');

// Validation
assert.equal(qr.validateContent(content({ url: 'biyik.dev' })), null);
assert.match(qr.validateContent(content({ url: 'localhost' })), /alan adı/);
assert.match(qr.validateContent(content({ kind: 'wifi', ssid: 'x', password: '123', security: 'WPA' })), /8 karakter/);
assert.match(qr.validateContent(content({ kind: 'wifi', ssid: 'x', password: '', security: 'WEP' })), /şifre/i);
assert.match(qr.validateContent(content({ kind: 'email', email: 'yanlis' })), /geçerli/);

// Matrix and SVG
const matrix = qr.createMatrix('https://biyik.dev', 'M');
assert.equal(matrix.size, 25);
for (const [r, c] of [[0, 0], [0, 24], [24, 0], [6, 6], [3, 3]]) assert(matrix.isDark(r, c), `finder ${r},${c}`);
const svg = qr.renderQrSvg(matrix, qr.defaultStyle);
assert.match(svg, /^<svg[^>]+viewBox="0 0 33 33"/);
assert.equal((svg.match(/stroke-width="1"/g) || []).length, 3, 'three finder eyes');
const dark = Array.from({ length: 25 * 25 }, (_, i) => matrix.isDark(Math.floor(i / 25), i % 25)).filter(Boolean).length;
const finderDark = 3 * (24 + 9); // ring + centre of each 7×7 finder
assert.equal((svg.match(/h1v1h-1z/g) || []).length, dark - finderDark, 'every data module is drawn once');

const dots = qr.renderQrSvg(matrix, { ...qr.defaultStyle, moduleStyle: 'dots', eyeStyle: 'circle', transparent: true, margin: 2 });
assert.match(dots, /viewBox="0 0 29 29"/);
assert(!dots.includes('<rect width='), 'transparent background has no backdrop rect');
assert.equal((dots.match(/r="0.42"/g) || []).length, dark - finderDark);

const captioned = qr.renderQrSvg(matrix, { ...qr.defaultStyle, caption: '<Wi-Fi & "Misafir">' });
assert(captioned.includes('&lt;Wi-Fi &amp; &quot;Misafir&quot;&gt;'), 'caption is escaped');
assert.match(captioned, /viewBox="0 0 33 37.62"/);

const logo = qr.renderQrSvg(qr.createMatrix('https://biyik.dev', 'H'), { ...qr.defaultStyle, logo: 'data:image/png;base64,AAAA' });
assert(logo.includes('<image href="data:image/png;base64,AAAA"'));
assert(
  (logo.match(/h1v1h-1z/g) || []).length < (qr.renderQrSvg(qr.createMatrix('https://biyik.dev', 'H'), qr.defaultStyle).match(/h1v1h-1z/g) || []).length,
  'logo clears the modules behind it',
);
assert.throws(() => qr.createMatrix('x'.repeat(4000), 'H'));

// Readability guards
assert.equal(qr.styleWarning(qr.defaultStyle), null);
assert.match(qr.styleWarning({ ...qr.defaultStyle, foreground: '#dddddd' }), /kontrast/);
assert.match(qr.styleWarning({ ...qr.defaultStyle, foreground: '#ffffff', eyeColor: '#ffffff', background: '#000000' }), /Açık renkli/);
assert.match(qr.styleWarning({ ...qr.defaultStyle, margin: 1 }), /Kenar/);
assert.equal(qr.qrFileName('wifi', 'svg'), 'biyik-dev_qr_wifi.svg');

console.log('QR checks passed: URL/Wi-Fi/e-posta/telefon payloads, escaping, validation, SVG modules, eyes, logo, caption, contrast.');
