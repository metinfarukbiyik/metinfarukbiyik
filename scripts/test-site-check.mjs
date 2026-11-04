import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/site-check.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const mod = { exports: {} };
new Function('require', 'exports', 'module', compiled)(require, mod.exports, mod);
const sc = mod.exports;

// Domain normalisation
assert.equal(sc.normalizeDomain('biyik.dev'), 'biyik.dev');
assert.equal(sc.normalizeDomain('  HTTPS://WWW.Biyik.dev:8443/a?b#c '), 'www.biyik.dev');
assert.equal(sc.normalizeDomain('örnek.com.tr'), 'xn--rnek-4qa.com.tr', 'IDN is converted to punycode');
assert.equal(sc.normalizeDomain('biyik.dev.'), 'biyik.dev');
for (const bad of ['', 'localhost', 'intranet', '127.0.0.1', '10.0.0.1', '[::1]', 'http://[::1]/', 'a..b', '-a.com', 'x.local', 'x.internal', 'x.c', 'javascript:alert(1)', `${'a'.repeat(64)}.com`])
  assert.equal(sc.normalizeDomain(bad), null, bad);

// Blocked address ranges (SSRF guard)
for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '224.0.0.1', '255.255.255.255', '::1', '::', 'fe80::1', 'fd00::1', 'fc12::1', 'ff02::1', '::ffff:127.0.0.1', '::ffff:7f00:1', '64:ff9b::a9fe:a9fe', '2002:c0a8:0101::1', '2001:db8::1', 'not-an-ip'])
  assert.equal(sc.isBlockedAddress(ip), true, ip);
for (const ip of ['76.76.21.21', '1.1.1.1', '172.32.0.1', '192.169.0.1', '8.8.8.8', '2606:4700:4700::1111', '2a00:1450:4017:80b::200e', '::ffff:8.8.8.8'])
  assert.equal(sc.isBlockedAddress(ip), false, ip);

// Certificate tone
const cert = (patch) => ({ valid: true, daysLeft: 60, ...patch });
assert.equal(sc.certificateTone(cert({})), 'ok');
assert.equal(sc.certificateTone(cert({ daysLeft: 14 })), 'warn');
assert.equal(sc.certificateTone(cert({ daysLeft: -1 })), 'bad');
assert.equal(sc.certificateTone(cert({ valid: false })), 'bad');
assert.equal(sc.certificateTone(null), 'bad');
assert.equal(sc.daysBetween(new Date('2026-01-01T12:00:00Z'), new Date('2026-01-31T11:00:00Z')), 29);

// Security headers
const headers = sc.evaluateHeaders({
  'strict-transport-security': 'max-age=63072000',
  'content-security-policy': "default-src 'self'; frame-ancestors 'none'",
  'x-content-type-options': ' ',
});
assert.equal(headers.length, 6);
assert.deepEqual(headers.map((h) => h.present), [true, true, false, true, false, false]);
assert.equal(headers.find((h) => h.key === 'x-frame-options').value, 'CSP frame-ancestors');

// DNS over HTTPS answers
const answer = {
  Status: 0,
  Answer: [
    { name: 'biyik.dev', type: 5, TTL: 300, data: 'cname.vercel-dns.com.' },
    { name: 'biyik.dev', type: 1, TTL: 60, data: '76.76.21.21' },
    { name: 'biyik.dev', type: 16, TTL: 3600, data: '"v=spf1 include:_spf.google.com" " ~all"' },
    { name: 'biyik.dev', type: 15, TTL: 3600, data: '1 smtp.google.com.' },
  ],
};
assert.deepEqual(sc.parseDnsAnswer('A', answer), [{ type: 'A', value: '76.76.21.21', ttl: 60 }]);
assert.deepEqual(sc.parseDnsAnswer('MX', answer), [{ type: 'MX', value: '1 smtp.google.com', ttl: 3600 }]);
assert.equal(sc.parseDnsAnswer('TXT', answer)[0].value, 'v=spf1 include:_spf.google.com ~all', 'split TXT strings are joined');
assert.deepEqual(sc.parseDnsAnswer('AAAA', answer), []);
assert.deepEqual(sc.parseDnsAnswer('A', { Status: 3 }), []);
assert.deepEqual(sc.parseDnsAnswer('A', null), []);
const mail = sc.mailSecurity(sc.parseDnsAnswer('TXT', answer), [{ type: 'TXT', value: 'v=DMARC1; p=reject', ttl: 1 }]);
assert.equal(mail.spf, 'v=spf1 include:_spf.google.com ~all');
assert.equal(mail.dmarc, 'v=DMARC1; p=reject');
assert.deepEqual(sc.mailSecurity([], []), { spf: null, dmarc: null });
assert.equal(sc.formatTtl(45), '45 sn');
assert.equal(sc.formatTtl(300), '5 dk');
assert.equal(sc.formatTtl(3600), '1 sa');
assert.equal(sc.formatTtl(86400), '24 sa');

console.log('Site check passed: domain normalisation, SSRF address guard, certificate tone, security headers, DoH parsing, SPF/DMARC.');
