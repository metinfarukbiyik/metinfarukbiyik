import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/network-diagnosis.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const mod = { exports: {} };
new Function('require', 'exports', 'module', compiled)(require, mod.exports, mod);
const { diagnose } = mod.exports;

const base = { connection: 'fiber', medium: 'wired', plan: 100, download: 94, upload: 40, latency: 55, jitter: 3, symptoms: [] };
const run = (patch) => diagnose({ ...base, ...patch });
const ids = (result) => result.steps.map((step) => step.id);

// Healthy wired line
const healthy = run({});
assert.equal(healthy.tone, 'ok');
assert.equal(healthy.headline, 'Bağlantın paketinle uyumlu');
assert.match(healthy.findings[0].text, /%94/);
assert.ok(healthy.steps.length > 0, 'always gives something to do');

// Slow on 2.4 GHz with a fast plan: Wi-Fi first
const wifi = run({ medium: 'wifi24', plan: 500, download: 62 });
assert.equal(wifi.headline, 'Önce Wi-Fi’ı ele alalım');
assert.equal(wifi.tone, 'bad');
assert.deepEqual(ids(wifi).slice(0, 3), ['nearModem', 'band5', 'wiredTest']);
assert.ok(wifi.findings.some((f) => /2\.4 GHz/.test(f.text)));
assert.ok(!ids(wifi).includes('isp') || ids(wifi).indexOf('isp') === ids(wifi).length - 1, 'ISP is the last resort');

// 5 GHz does not suggest switching band
assert.ok(!ids(run({ medium: 'wifi5', download: 40 })).includes('band5'));

// Slow wired VDSL: line or modem
const vdsl = run({ connection: 'vdsl', plan: 50, download: 18 });
assert.equal(vdsl.headline, 'Sorun hatta veya modemde olabilir');
for (const id of ['restart', 'vdslSync', 'isp']) assert.ok(ids(vdsl).includes(id), id);
assert.ok(!ids(vdsl).includes('nearModem'), 'no Wi-Fi steps on a wired test');

// Wired result capped near 100 Mbps on a gigabit plan: cable/port
const capped = run({ plan: 1000, download: 94 });
assert.ok(capped.findings.some((f) => /100 Mbps sınırında/.test(f.text)));
assert.ok(ids(capped).includes('ethernetCable'));

// Mobile
const mobile = run({ connection: 'mobile', medium: 'wifi', plan: 50, download: 12 });
for (const id of ['mobileSignal', 'mobileQuota']) assert.ok(ids(mobile).includes(id), id);

// Latency and jitter
const lag = run({ latency: 160, jitter: 45, symptoms: ['lag'] });
assert.equal(lag.headline, 'Hız yeterli; gecikmeye odaklanalım');
assert.equal(lag.tone, 'bad');
for (const id of ['background', 'bufferbloat']) assert.ok(ids(lag).includes(id), id);

// Symptom-only paths
assert.deepEqual(ids(run({ symptoms: ['sites'] })).slice(0, 2), ['dns', 'vpn']);
const device = run({ symptoms: ['device'] });
assert.match(device.summary, /tek bir cihaz/);
assert.ok(ids(device).includes('otherDevice'));
const drops = run({ connection: 'fiber', medium: 'wifi', symptoms: ['drops'] });
for (const id of ['restart', 'fiberOnt', 'channel', 'isp']) assert.ok(ids(drops).includes(id), id);
assert.ok(ids(run({ symptoms: ['evening'] })).includes('schedule'));

// No measurement at all
const empty = diagnose({ connection: 'fiber', medium: 'wifi', plan: null, download: null, upload: null, latency: null, jitter: null, symptoms: [] });
assert.equal(empty.headline, 'Önce bir ölçüm yapalım');
assert.deepEqual(empty.findings, []);
assert.ok(ids(empty).includes('schedule'));

// Missing plan: compare is impossible but download is reported
const noPlan = run({ plan: null });
assert.match(noPlan.findings[0].text, /Paket hızını girersen/);

// Low upload warning; steps never repeat
assert.ok(run({ upload: 2 }).findings.some((f) => /Yükleme/.test(f.text)));
const everything = run({ medium: 'wifi24', download: 10, jitter: 60, latency: 200, symptoms: ['slow', 'lag', 'drops', 'sites', 'evening', 'device'] });
assert.equal(new Set(ids(everything)).size, ids(everything).length);
assert.ok(everything.steps.every((step) => step.title && step.detail.length > 40));

console.log('Diagnosis checks passed: Wi-Fi vs line, VDSL/fiber/mobile, 100 Mbps cap, latency/jitter, symptoms, empty input.');
