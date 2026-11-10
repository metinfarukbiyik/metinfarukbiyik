import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const cache = new Map();
function load(name) {
  if (cache.has(name)) return cache.get(name);
  const compiled = ts.transpileModule(
    readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const compiledModule = { exports: {} };
  new Function('require', 'exports', 'module', compiled)(
    (id) => load(id.replace('./', '')),
    compiledModule.exports,
    compiledModule,
  );
  cache.set(name, compiledModule.exports);
  return compiledModule.exports;
}
const photo = load('photo-export');
const geometry = load('passport-photo');
const network = load('network-tools');
assert.equal(photo.crc32(new TextEncoder().encode('123456789')), 0xcbf43926);

const png = new Blob(
  [
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=',
      'base64',
    ),
  ],
  { type: 'image/png' },
);
const densePng = new Uint8Array(
  await (await photo.withPrintDensity(png, 'png')).arrayBuffer(),
);
const phys = new DataView(densePng.buffer);
assert.equal(phys.getUint32(33), 9);
assert.equal(Buffer.from(densePng.slice(37, 41)).toString(), 'pHYs');
assert.equal(phys.getUint32(41), 11811);
assert.equal(phys.getUint32(45), 11811);
assert.equal(densePng[49], 1);
assert.equal(phys.getUint32(50), photo.crc32(densePng.slice(37, 50)));
const twice = new Uint8Array(
  await (
    await photo.withPrintDensity(new Blob([densePng]), 'png')
  ).arrayBuffer(),
);
assert.equal(twice.length, densePng.length); // Replace rather than duplicate density metadata.
const jfif = new Uint8Array([
  255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 255,
  217,
]);
for (const source of [jfif, new Uint8Array([255, 216, 255, 217])]) {
  const jpeg = new Uint8Array(
    await (
      await photo.withPrintDensity(new Blob([source]), 'jpeg')
    ).arrayBuffer(),
  );
  assert.equal(jpeg[13], 1);
  assert.equal(new DataView(jpeg.buffer).getUint16(14), 300);
  assert.equal(new DataView(jpeg.buffer).getUint16(16), 300);
}

const files = [
  { name: 'Sayfa-01.png', blob: new Blob([densePng]) },
  { name: 'Sayfa-02.png', blob: new Blob([densePng]) },
];
const zip = new Uint8Array(await (await photo.createZip(files)).arrayBuffer());
const zipView = new DataView(zip.buffer);
let offset = 0;
for (const file of files) {
  assert.equal(zipView.getUint32(offset, true), 0x04034b50);
  const length = zipView.getUint32(offset + 18, true),
    nameLength = zipView.getUint16(offset + 26, true);
  assert.equal(
    new TextDecoder().decode(zip.slice(offset + 30, offset + 30 + nameLength)),
    file.name,
  );
  assert.equal(
    zipView.getUint32(offset + 14, true),
    photo.crc32(
      zip.slice(offset + 30 + nameLength, offset + 30 + nameLength + length),
    ),
  );
  offset += 30 + nameLength + length;
}
assert.equal(zipView.getUint32(offset, true), 0x02014b50);
assert.equal(zipView.getUint16(zip.length - 22 + 10, true), 2);
assert.equal(zipView.getUint32(zip.length - 22 + 16, true), offset);

// Canvas stubs verify paper geometry, white backgrounds, codec/quality and page bundling.
let rendered = [];
globalThis.document = {
  createElement: () => {
    const sheet = {
      width: 0,
      height: 0,
      getContext: () => ({
        fillRect() {},
        setTransform() {},
        drawImage() {},
        beginPath() {},
        moveTo() {},
        lineTo() {},
        rect() {},
        stroke() {},
      }),
      toBlob(callback, mime, quality) {
        rendered.push({
          width: sheet.width,
          height: sheet.height,
          mime,
          quality,
        });
        callback(mime === 'image/png' ? png : new Blob([jfif], { type: mime }));
      },
    };
    return sheet;
  },
};
for (const format of ['png', 'jpeg']) {
  rendered = [];
  const output = await photo.createPhotoRaster(
    {},
    'large',
    8,
    true,
    '10x15',
    'portrait',
    format,
    'Test',
  );
  assert.equal(output.blob.type, 'application/zip');
  assert.equal(rendered.length, 4);
  rendered.forEach((sheet) => {
    assert.equal(sheet.width, geometry.mmToPixels(100));
    assert.equal(sheet.height, geometry.mmToPixels(150));
    assert.equal(sheet.mime, `image/${format}`);
    assert.equal(sheet.quality, 0.95);
  });
  rendered = [];
  const single = await photo.createPhotoRaster(
    {},
    'large',
    2,
    false,
    '10x15',
    'landscape',
    format,
    'Test',
  );
  assert.equal(rendered.length, 1);
  assert.equal(rendered[0].width, geometry.mmToPixels(150));
  assert.equal(single.name, `Test.${format === 'png' ? 'png' : 'jpg'}`);
}

assert.equal(network.mbpsFromTransfer(1_000_000, 1000), 8);
assert.equal(network.median([10, 4, 7]), 7);
assert.equal(network.median([2, 4]), 3);
for (const milliseconds of [1, 50, 400, 1000, 4000, 10000, 60000]) {
  const total =
    network.MIN_TRANSFER +
    network.additionalTransfer(network.MIN_TRANSFER, milliseconds);
  assert(total >= 5_000_000 && total <= 50_000_000);
}
assert.equal(network.additionalTransfer(5_000_000, 10000), 0);
assert.equal(network.additionalTransfer(5_000_000, 1), 45_000_000);
for (const total of [5_000_000, 45_000_000, 1_234_567, 100_000, 1]) {
  const parts = network.splitBytes(total, network.STREAMS);
  assert.equal(parts.reduce((sum, part) => sum + part, 0), total);
  assert(parts.every((part) => part > 0) && parts.length <= network.STREAMS);
}
assert.equal(network.describeColo('IST'), 'İstanbul (IST)');
assert.equal(network.describeColo('xyz'), 'XYZ');
assert.equal(network.describeColo('<b>'), undefined);
assert.equal(network.describeColo(null), undefined);
const valid = {
  id: '1',
  timestamp: '2026-11-04T00:00:00Z',
  download: 80,
  upload: 20,
  latency: 15,
  jitter: 2,
  downloadBytes: 5e6,
  uploadBytes: 5e6,
};
assert.equal(network.parseSpeedHistory('{broken').length, 0);
assert.equal(network.parseSpeedHistory(JSON.stringify([{ ...valid, server: 'Amsterdam (AMS)' }]))[0].server, 'Amsterdam (AMS)');
assert.equal(network.parseSpeedHistory(JSON.stringify([{ ...valid, server: 42 }])).length, 0);
assert.equal(
  network.parseSpeedHistory(
    JSON.stringify([{}, null, { ...valid, download: -1 }, valid]),
  ).length,
  1,
);
assert.equal(
  network.parseSpeedHistory(
    JSON.stringify(
      Array.from({ length: 70 }, (_, id) => ({ ...valid, id: String(id) })),
    ),
  ).length,
  50,
);

assert.equal(network.mergeSpeedHistory([valid], [valid]).length, 1);
assert.equal(
  network.mergeSpeedHistory(
    [valid],
    [{ ...valid, id: 'new', timestamp: '2026-11-04T01:00:00Z' }],
  )[0].id,
  'new',
);
assert.equal(
  network.mergeSpeedHistory(
    Array.from({ length: 70 }, (_, id) => ({ ...valid, id: String(id) })),
  ).length,
  50,
);

// Simulated I/O: no external traffic. Cover complete, cancelled, failed and timed-out tests.
let clock = 0,
  mode = 'ok';
Object.defineProperty(globalThis, 'performance', {
  value: { now: () => clock },
  configurable: true,
});
globalThis.fetch = async (url, options) => {
  options.signal.throwIfAborted();
  if (String(url).includes('/cdn-cgi/trace'))
    return new Response(mode === 'trace-down' ? 'oops' : 'fl=1\ncolo=ams\nloc=TR\n', { status: mode === 'trace-down' ? 500 : 200 });
  clock += 20;
  return new Response(null, { status: 200 });
};
const transfers = [];
class FakeXhr {
  upload = {};
  open(method, url) {
    this.method = method;
    this.url = url;
  }
  send(body) {
    const bytes =
      this.method === 'GET'
        ? Number(new URL(this.url).searchParams.get('bytes'))
        : body.size;
    transfers.push({ direction: this.method, bytes });
    queueMicrotask(() => {
      if (mode === 'timeout') {
        this.ontimeout();
        return;
      }
      if (mode === 'error') {
        this.onerror();
        return;
      }
      if (mode === 'abort') {
        this.onabort();
        return;
      }
      clock += (bytes * 8) / ((this.method === 'GET' ? 100 : 50) * 1000) + 20;
      this.status = mode === 'status' ? 503 : 200;
      this.response =
        this.method === 'GET'
          ? new ArrayBuffer(
              mode === 'truncated' ? Math.max(0, bytes - 1) : bytes,
            )
          : '';
      this.onload();
    });
  }
  abort() {
    this.onabort();
  }
}
globalThis.XMLHttpRequest = FakeXhr;
const progress = [];
const measured = await network.runSpeedTest(new AbortController().signal, (p) =>
  progress.push(p),
);
assert(measured.download > 0 && measured.upload > 0);
assert(measured.downloadBytes >= 5e6 && measured.downloadBytes <= 50e6);
assert(measured.uploadBytes >= 5e6 && measured.uploadBytes <= 50e6);
assert.equal(measured.latency, 20);
assert.equal(measured.jitter, 0);
assert(progress.every((p) => p.fraction >= 0 && p.fraction <= 1));
assert(transfers.some((t) => t.direction === 'POST'));
assert.equal(measured.server, 'Amsterdam (AMS)');
// Warm-up runs as STREAMS concurrent requests that add up to exactly MIN_TRANSFER.
const warmup = transfers.filter((t) => t.direction === 'GET').slice(0, network.STREAMS);
assert.equal(warmup.length, network.STREAMS);
assert.equal(warmup.reduce((sum, t) => sum + t.bytes, 0), network.MIN_TRANSFER);
assert.equal(
  transfers.filter((t) => t.direction === 'GET').reduce((sum, t) => sum + t.bytes, 0),
  measured.downloadBytes,
);
// The location lookup is optional: if it fails the test still completes without it.
mode = 'trace-down';
const withoutServer = await network.runSpeedTest(new AbortController().signal, () => {});
assert.equal(withoutServer.server, undefined);
assert(withoutServer.download > 0);
mode = 'ok';
const cancelled = new AbortController();
cancelled.abort();
await assert.rejects(() => network.runSpeedTest(cancelled.signal, () => {}), {
  name: 'AbortError',
});
for (const failure of ['timeout', 'error', 'status', 'truncated', 'abort']) {
  mode = failure;
  await assert.rejects(() =>
    network.runSpeedTest(new AbortController().signal, () => {}),
  );
}
console.log(
  'Tool checks passed: PNG/JPEG 300 dpi, ZIP CRC/directory, raster pagination, transfer budgets, history limits, measurements, cancellation and network errors.',
);
