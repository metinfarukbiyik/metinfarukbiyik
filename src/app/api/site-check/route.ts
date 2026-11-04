import { lookup as dnsLookup } from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import type { LookupFunction } from 'node:net';
import tls from 'node:tls';
import {
  CHECK_LIMITS,
  daysBetween,
  evaluateHeaders,
  isBlockedAddress,
  normalizeDomain,
  type CertificateInfo,
  type RedirectHop,
  type SiteCheckResult,
} from '@/lib/site-check';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Resolves like dns.lookup but refuses private, loopback and reserved addresses.
 * Every connection (TLS probe and each redirect hop) goes through it, so a public name
 * that points at an internal address — or a redirect to one — is never reached.
 */
const guardedLookup: LookupFunction = (hostname, options, callback) => {
  dnsLookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error, '', 4);
    const list = addresses as { address: string; family: number }[];
    if (!list.length || list.some((entry) => isBlockedAddress(entry.address))) {
      const blocked = Object.assign(new Error('Bu adres yerel veya ayrılmış bir ağa işaret ediyor.'), { code: 'EBLOCKED' });
      return callback(blocked, '', 4);
    }
    if (options.all) return (callback as (e: null, a: typeof list) => void)(null, list);
    callback(null, list[0].address, list[0].family);
  });
};

function describeError(error: unknown) {
  const code = (error as { code?: string })?.code;
  const messages: Record<string, string> = {
    EBLOCKED: 'Bu adres yerel veya ayrılmış bir ağa işaret ediyor; kontrol edilmedi.',
    ENOTFOUND: 'Alan adı bulunamadı (DNS kaydı yok).',
    EAI_AGAIN: 'Alan adı şu anda çözümlenemedi.',
    ECONNREFUSED: 'Sunucu bağlantıyı reddetti.',
    ECONNRESET: 'Sunucu bağlantıyı kapattı.',
    ETIMEDOUT: 'Sunucu zamanında yanıt vermedi.',
    EHOSTUNREACH: 'Sunucuya ulaşılamıyor.',
    ENETUNREACH: 'Sunucuya ulaşılamıyor.',
    EPORT: 'Yalnızca 80 ve 443 portlarına yapılan yönlendirmeler izlenir.',
  };
  return (code && messages[code]) || 'Sunucuya bağlanılamadı.';
}

const certificateProblems: Record<string, string> = {
  CERT_HAS_EXPIRED: 'Sertifikanın süresi dolmuş.',
  DEPTH_ZERO_SELF_SIGNED_CERT: 'Sertifika kendinden imzalı; tarayıcılar güvenmez.',
  SELF_SIGNED_CERT_IN_CHAIN: 'Sertifika zincirinde kendinden imzalı bir sertifika var.',
  UNABLE_TO_VERIFY_LEAF_SIGNATURE: 'Ara sertifika eksik; bazı cihazlar siteye güvenmeyebilir.',
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY: 'Ara sertifika eksik; bazı cihazlar siteye güvenmeyebilir.',
  CERT_NOT_YET_VALID: 'Sertifikanın geçerlilik tarihi henüz başlamamış.',
  ERR_TLS_CERT_ALTNAME_INVALID: 'Sertifika bu alan adını kapsamıyor.',
};

const certName = (entity: tls.Certificate | undefined) => {
  const pick = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  return pick(entity?.O) || pick(entity?.CN) || '—';
};

function checkCertificate(domain: string): Promise<CertificateInfo> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({
      host: domain,
      port: 443,
      servername: domain,
      rejectUnauthorized: false,
      lookup: guardedLookup,
      timeout: CHECK_LIMITS.timeout,
      ALPNProtocols: ['http/1.1'],
    });
    const timeout = () => socket.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' }));
    // `timeout` only covers idle sockets; the timer caps the whole handshake.
    const timer = setTimeout(timeout, CHECK_LIMITS.timeout);
    socket.once('timeout', timeout);
    socket.once('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    socket.once('secureConnect', () => {
      clearTimeout(timer);
      const leaf = socket.getPeerCertificate(true);
      if (!leaf || !leaf.valid_to) {
        socket.destroy();
        return reject(Object.assign(new Error('no certificate'), { code: 'ECONNRESET' }));
      }
      const names = (leaf.subjectaltname ?? '')
        .split(', ')
        .filter((entry) => entry.startsWith('DNS:'))
        .map((entry) => entry.slice(4));
      const mismatch = tls.checkServerIdentity(domain, leaf);
      const code = mismatch ? 'ERR_TLS_CERT_ALTNAME_INVALID' : socket.authorized ? null : String(socket.authorizationError);
      const chain: string[] = [];
      let current: tls.DetailedPeerCertificate | undefined = leaf;
      while (current && chain.length < 5) {
        chain.push(Array.isArray(current.subject?.CN) ? current.subject.CN[0] : current.subject?.CN || certName(current.subject));
        if (!current.issuerCertificate || current.issuerCertificate === current) break;
        current = current.issuerCertificate;
      }
      const validTo = new Date(leaf.valid_to);
      resolve({
        subject: (Array.isArray(leaf.subject?.CN) ? leaf.subject.CN[0] : leaf.subject?.CN) || names[0] || domain,
        issuer: certName(leaf.issuer),
        names,
        validFrom: new Date(leaf.valid_from).toISOString(),
        validTo: validTo.toISOString(),
        daysLeft: daysBetween(new Date(), validTo),
        valid: !code,
        problem: code ? (certificateProblems[code] ?? 'Sertifika doğrulanamadı.') : null,
        protocol: socket.getProtocol(),
        chain,
      });
      socket.end();
    });
  });
}

interface HopResponse {
  status: number;
  location: string | null;
  headers: http.IncomingHttpHeaders;
}

function request(url: URL): Promise<HopResponse> {
  return new Promise((resolve, reject) => {
    const client = url.protocol === 'https:' ? https : http;
    const req = client.request(
      url,
      {
        method: 'GET',
        lookup: guardedLookup,
        // `timeout` only covers idle sockets; the signal caps the whole hop.
        timeout: CHECK_LIMITS.timeout,
        signal: AbortSignal.timeout(CHECK_LIMITS.timeout),
        // The certificate is reported separately; redirects are still followed on a bad one.
        rejectUnauthorized: false,
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; biyik.dev site-check; +https://biyik.dev/araclar/web-sitesi-kontrol)',
          accept: 'text/html,*/*;q=0.8',
        },
      },
      (res) => {
        // Only the status line and headers are needed; drop the body.
        res.destroy();
        const location = res.headers.location;
        resolve({ status: res.statusCode ?? 0, location: typeof location === 'string' ? location : null, headers: res.headers });
      },
    );
    req.once('timeout', () => req.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' })));
    req.once('error', (error) => reject(error.name === 'AbortError' ? Object.assign(error, { code: 'ETIMEDOUT' }) : error));
    req.end();
  });
}

async function followRedirects(start: string) {
  const hops: RedirectHop[] = [];
  let url = new URL(start);
  let last: HopResponse | null = null;
  for (let i = 0; i < CHECK_LIMITS.hops; i++) {
    const begun = performance.now();
    try {
      if (!['http:', 'https:'].includes(url.protocol) || !['', '80', '443'].includes(url.port))
        throw Object.assign(new Error('port'), { code: 'EPORT' });
      last = await request(url);
    } catch (error) {
      hops.push({ url: url.href, status: null, location: null, ms: Math.round(performance.now() - begun), error: describeError(error) });
      return { hops, last: null };
    }
    hops.push({ url: url.href, status: last.status, location: last.location, ms: Math.round(performance.now() - begun) });
    if (last.status < 300 || last.status >= 400 || !last.location) return { hops, last };
    try {
      url = new URL(last.location, url);
    } catch {
      return { hops, last };
    }
  }
  return { hops, last };
}

/** Best-effort, per-instance limit; enough to stop casual abuse of the endpoint. */
const recent = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((time) => now - time < 60_000);
  list.push(now);
  recent.set(ip, list);
  if (recent.size > 5000) recent.clear();
  return list.length > CHECK_LIMITS.perMinute;
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });

export async function GET(request: Request) {
  const domain = normalizeDomain(new URL(request.url).searchParams.get('domain') ?? '');
  if (!domain) return json({ error: 'Geçerli bir alan adı gir (ör. ornek.com).' }, 400);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (limited(ip)) return json({ error: 'Çok fazla istek gönderdin; bir dakika sonra tekrar dene.' }, 429);

  const [certificate, chain] = await Promise.allSettled([checkCertificate(domain), followRedirects(`http://${domain}/`)]);
  let redirects = chain.status === 'fulfilled' ? chain.value : { hops: [], last: null };
  // Some servers only listen on 443: when plain http:// fails outright, start from https:// instead.
  if (!redirects.last && redirects.hops.length === 1 && certificate.status === 'fulfilled') {
    const secure = await followRedirects(`https://${domain}/`);
    redirects = { hops: [...redirects.hops, ...secure.hops], last: secure.last };
  }
  const finalHop = redirects.last ? redirects.hops.at(-1)! : null;
  const headers = redirects.last?.headers ?? {};
  const flat = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value]));

  const result: SiteCheckResult = {
    domain,
    checkedAt: new Date().toISOString(),
    certificate: certificate.status === 'fulfilled' ? certificate.value : null,
    certificateError: certificate.status === 'rejected' ? describeError(certificate.reason) : null,
    redirects: redirects.hops,
    finalUrl: finalHop?.url ?? null,
    httpsRedirect: Boolean(redirects.hops[0]?.url.startsWith('http:') && finalHop?.url.startsWith('https:')),
    headers: redirects.last ? evaluateHeaders(flat) : [],
    server: typeof headers.server === 'string' ? headers.server.slice(0, 60) : null,
  };
  return json(result);
}
