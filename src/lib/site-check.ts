/** Shared types and pure helpers for the website check tool (browser + API route). */

export interface CertificateInfo {
  subject: string;
  issuer: string;
  /** Names the certificate covers (subjectAltName DNS entries). */
  names: string[];
  validFrom: string;
  validTo: string;
  daysLeft: number;
  /** Chain is trusted and the hostname matches. */
  valid: boolean;
  /** Why the certificate is not trusted, in Turkish. */
  problem: string | null;
  protocol: string | null;
  chain: string[];
}

export interface RedirectHop {
  url: string;
  status: number | null;
  location: string | null;
  ms: number;
  error?: string;
}

export interface SecurityHeader {
  key: string;
  label: string;
  present: boolean;
  value: string | null;
  advice: string;
}

export interface SiteCheckResult {
  domain: string;
  checkedAt: string;
  certificate: CertificateInfo | null;
  certificateError: string | null;
  redirects: RedirectHop[];
  finalUrl: string | null;
  /** True when plain http:// ends up on https://. */
  httpsRedirect: boolean;
  headers: SecurityHeader[];
  server: string | null;
}

export const CHECK_LIMITS = { hops: 10, timeout: 8000, perMinute: 10 } as const;

/**
 * Turns whatever was typed ("https://www.Örnek.com.tr/path") into a bare ASCII hostname,
 * or null when it is not a public-looking domain name. IP literals are refused on purpose.
 */
export function normalizeDomain(input: string): string | null {
  let value = input.trim();
  if (!value) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) value = `http://${value}`;
  let hostname: string;
  try {
    hostname = new URL(value).hostname.toLowerCase().replace(/\.$/, '');
  } catch {
    return null;
  }
  if (!hostname || hostname.length > 253 || !hostname.includes('.')) return null;
  if (/^[\d.]+$/.test(hostname) || hostname.startsWith('[')) return null;
  const labels = hostname.split('.');
  if (!labels.every((label) => /^(?!-)[a-z0-9-]{1,63}(?<!-)$/.test(label))) return null;
  if (!/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(labels.at(-1)!)) return null;
  if (['localhost', 'local', 'internal', 'lan', 'home', 'arpa', 'test', 'invalid', 'example'].includes(labels.at(-1)!))
    return null;
  return hostname;
}

const ipv4ToNumber = (ip: string) => ip.split('.').reduce((total, part) => total * 256 + Number(part), 0);

const V4_BLOCKED: [string, number][] = [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.0.2.0', 24],
  ['192.88.99.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['198.51.100.0', 24],
  ['203.0.113.0', 24],
  ['224.0.0.0', 4],
  ['240.0.0.0', 4],
];

/** Expands an IPv6 address to eight 16-bit groups. */
function ipv6Groups(ip: string): number[] | null {
  let value = ip.toLowerCase().split('%')[0];
  const v4 = value.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (v4) {
    const n = ipv4ToNumber(v4[1]);
    value = value.replace(v4[1], `${(n >>> 16).toString(16)}:${(n & 0xffff).toString(16)}`);
  }
  const [head, tail] = value.split('::');
  if (value.split('::').length > 2) return null;
  const parse = (part: string) => (part ? part.split(':').map((group) => parseInt(group, 16)) : []);
  const start = parse(head);
  const end = tail === undefined ? [] : parse(tail);
  const groups = tail === undefined ? start : [...start, ...Array(8 - start.length - end.length).fill(0), ...end];
  return groups.length === 8 && groups.every((group) => Number.isInteger(group) && group >= 0 && group <= 0xffff)
    ? groups
    : null;
}

/** Loopback, private, link-local, reserved and documentation ranges must never be fetched. */
export function isBlockedAddress(ip: string): boolean {
  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    const n = ipv4ToNumber(ip);
    return V4_BLOCKED.some(([base, bits]) => Math.floor(n / 2 ** (32 - bits)) === Math.floor(ipv4ToNumber(base) / 2 ** (32 - bits)));
  }
  const groups = ipv6Groups(ip);
  if (!groups) return true;
  const [a, b] = groups;
  if (groups.every((group, i) => group === (i === 7 ? groups[7] : 0)) && groups[7] <= 1) return true; // :: and ::1
  // IPv4-mapped (::ffff:a.b.c.d) and NAT64 (64:ff9b::/96) addresses carry an IPv4 target.
  const embedded = `${groups[6] >> 8}.${groups[6] & 255}.${groups[7] >> 8}.${groups[7] & 255}`;
  if (groups.slice(0, 5).every((g) => g === 0) && groups[5] === 0xffff) return isBlockedAddress(embedded);
  if (a === 0x64 && b === 0xff9b) return isBlockedAddress(embedded);
  if ((a & 0xfe00) === 0xfc00) return true; // unique local fc00::/7
  if ((a & 0xffc0) === 0xfe80) return true; // link-local fe80::/10
  if ((a & 0xff00) === 0xff00) return true; // multicast
  if (a === 0x2001 && b === 0x0db8) return true; // documentation
  if (a === 0x2002) return isBlockedAddress(`${b >> 8}.${b & 255}.${groups[2] >> 8}.${groups[2] & 255}`); // 6to4
  return false;
}

export const daysBetween = (from: Date, to: Date) => Math.floor((to.getTime() - from.getTime()) / 86_400_000);

export type CheckTone = 'ok' | 'warn' | 'bad';

export function certificateTone(certificate: CertificateInfo | null): CheckTone {
  if (!certificate || !certificate.valid || certificate.daysLeft < 0) return 'bad';
  return certificate.daysLeft <= 14 ? 'warn' : 'ok';
}

const HEADER_RULES: { key: string; label: string; advice: string }[] = [
  {
    key: 'strict-transport-security',
    label: 'HSTS',
    advice: 'Tarayıcıya siteye her zaman HTTPS ile bağlanmasını söyler; araya girme saldırılarını zorlaştırır.',
  },
  {
    key: 'content-security-policy',
    label: 'Content-Security-Policy',
    advice: 'Sayfanın hangi kaynaklardan betik ve stil yükleyebileceğini sınırlar; XSS riskini azaltır.',
  },
  {
    key: 'x-content-type-options',
    label: 'X-Content-Type-Options',
    advice: '“nosniff” değeri, tarayıcının dosya türünü tahmin edip yanlış çalıştırmasını engeller.',
  },
  {
    key: 'x-frame-options',
    label: 'X-Frame-Options',
    advice: 'Sitenin başka sayfalarda çerçeve içinde açılmasını engeller (tıklama tuzağı koruması).',
  },
  {
    key: 'referrer-policy',
    label: 'Referrer-Policy',
    advice: 'Başka sitelere geçerken adres bilgisinin ne kadarının paylaşılacağını belirler.',
  },
  {
    key: 'permissions-policy',
    label: 'Permissions-Policy',
    advice: 'Kamera, mikrofon, konum gibi tarayıcı özelliklerine erişimi sınırlar.',
  },
];

export function evaluateHeaders(headers: Record<string, string | undefined>): SecurityHeader[] {
  const get = (key: string) => headers[key]?.trim() || null;
  const csp = get('content-security-policy');
  return HEADER_RULES.map((rule) => {
    let value = get(rule.key);
    // CSP frame-ancestors replaces X-Frame-Options in modern browsers.
    if (rule.key === 'x-frame-options' && !value && csp && /frame-ancestors/i.test(csp)) value = 'CSP frame-ancestors';
    return { ...rule, value, present: Boolean(value) };
  });
}

// ── DNS over HTTPS (runs in the browser) ─────────────────────
export const DNS_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'CAA'] as const;
export type DnsType = (typeof DNS_TYPES)[number];
const DNS_CODES: Record<DnsType, number> = { A: 1, NS: 2, CNAME: 5, MX: 15, TXT: 16, AAAA: 28, CAA: 257 };

export interface DnsRecord {
  type: DnsType;
  value: string;
  ttl: number;
}

/** Keeps the answers of the requested type from a Cloudflare DoH JSON response. */
export function parseDnsAnswer(type: DnsType, data: unknown): DnsRecord[] {
  if (!data || typeof data !== 'object') return [];
  const answer = (data as { Answer?: unknown }).Answer;
  if (!Array.isArray(answer)) return [];
  return answer
    .filter(
      (item): item is { type: number; data: string; TTL: number } =>
        item && item.type === DNS_CODES[type] && typeof item.data === 'string',
    )
    .map((item) => ({
      type,
      value: type === 'TXT' ? item.data.replace(/^"|"$/g, '').replace(/"\s*"/g, '') : item.data.replace(/\.$/, ''),
      ttl: Number(item.TTL) || 0,
    }));
}

export async function lookupDns(name: string, type: DnsType, signal: AbortSignal): Promise<DnsRecord[]> {
  const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: { accept: 'application/dns-json' },
    signal: AbortSignal.any([signal, AbortSignal.timeout(CHECK_LIMITS.timeout)]),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  });
  if (!response.ok) throw new Error('DNS sorgusu yanıt vermedi.');
  return parseDnsAnswer(type, await response.json());
}

export function mailSecurity(txt: DnsRecord[], dmarc: DnsRecord[]) {
  const spf = txt.find((record) => /^v=spf1\b/i.test(record.value))?.value ?? null;
  const policy = dmarc.find((record) => /^v=DMARC1\b/i.test(record.value))?.value ?? null;
  return { spf, dmarc: policy };
}

export function formatTtl(seconds: number) {
  if (seconds >= 3600) return `${Math.round(seconds / 360) / 10} sa`;
  if (seconds >= 60) return `${Math.round(seconds / 60)} dk`;
  return `${seconds} sn`;
}
