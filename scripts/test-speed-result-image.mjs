import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

process.env.TZ = 'Europe/Istanbul';
const source = await readFile(
  new URL('../src/lib/speed-result-image.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const compiledModule = { exports: {} };
new Function('exports', 'module', compiled)(
  compiledModule.exports,
  compiledModule,
);
const { createSpeedResultImage, speedResultFileName } = compiledModule.exports;
const result = {
  id: 'test',
  timestamp: '2026-11-03T21:35:00Z',
  download: 85.04,
  upload: 16,
  latency: 100.8,
  jitter: 12.05,
  downloadBytes: 5e6,
  uploadBytes: 5e6,
};
assert.equal(
  speedResultFileName(result),
  'biyik-dev_hiz-testi_2026-11-04_00-35.png',
);
let strings = [],
  canvas;
const context = {
  beginPath() {},
  moveTo() {},
  lineTo() {},
  quadraticCurveTo() {},
  closePath() {},
  fill() {},
  stroke() {},
  arc() {},
  fillRect() {},
  createLinearGradient() {
    return { addColorStop() {} };
  },
  fillText(value) {
    strings.push(value);
  },
};
globalThis.document = {
  createElement() {
    canvas = {
      width: 0,
      height: 0,
      getContext() {
        return context;
      },
      toBlob(callback, mime) {
        callback(new Blob(['image'], { type: mime }));
      },
    };
    return canvas;
  },
};
const image = await createSpeedResultImage(result, 'Mbps');
assert.equal(image.type, 'image/png');
assert.deepEqual([canvas.width, canvas.height], [1200, 900]);
for (const text of [
  '85,04',
  '16',
  '100,8',
  '12,05',
  'Mbps',
  'GECİKME · HTTP',
  'biyik.dev',
])
  assert(strings.includes(text), `missing ${text}`);
assert(
  !strings.some((text) => /\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(text)),
  'The result image must not contain an IP address',
);
strings = [];
await createSpeedResultImage(result, 'MB/s');
assert(strings.includes('10,63'));
assert(strings.includes('2'));
assert(strings.includes('MB/s'));
context.roundRect = () => {};
await createSpeedResultImage(result, 'Mbps');
globalThis.document = { createElement: () => ({ getContext: () => null }) };
await assert.rejects(() => createSpeedResultImage(result, 'Mbps'));
console.log(
  'Speed-result image checks passed: Turkish values, unit conversion, local date, privacy, PNG and canvas failure.',
);
