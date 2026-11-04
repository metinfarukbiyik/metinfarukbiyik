'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, Check, Copy, LockKeyhole, Search, ShieldAlert, ShieldCheck, X } from 'lucide-react';
import {
  certificateTone,
  DNS_TYPES,
  formatTtl,
  lookupDns,
  mailSecurity,
  normalizeDomain,
  type CheckTone,
  type DnsRecord,
  type SiteCheckResult,
} from '@/lib/site-check';

type Dns = { records: DnsRecord[]; spf: string | null; dmarc: string | null; failed: boolean };

const dateFormat = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

function statusTone(status: number | null): CheckTone {
  if (status === null || status >= 400) return 'bad';
  return status >= 300 ? 'warn' : 'ok';
}

function Summary({ tone, label, value, note }: { tone: CheckTone; label: string; value: string; note: string }) {
  return (
    <div className="site-summary-item" data-tone={tone}>
      <span>
        <i aria-hidden="true" /> {label}
      </span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

async function checkDns(domain: string, signal: AbortSignal): Promise<Dns> {
  const lists = await Promise.allSettled([
    ...DNS_TYPES.map((type) => lookupDns(domain, type, signal)),
    lookupDns(`_dmarc.${domain}`, 'TXT', signal),
  ]);
  if (lists.every((list) => list.status === 'rejected')) return { records: [], spf: null, dmarc: null, failed: true };
  const value = (index: number) => (lists[index].status === 'fulfilled' ? lists[index].value : []);
  const records = DNS_TYPES.flatMap((_, index) => value(index));
  return { records, ...mailSecurity(value(DNS_TYPES.indexOf('TXT')), value(DNS_TYPES.length)), failed: false };
}

export default function SiteCheckTool() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SiteCheckResult | null>(null);
  const [dns, setDns] = useState<Dns | null>(null);
  const [status, setStatus] = useState('');
  const request = useRef<AbortController | null>(null);

  const run = useCallback(async (raw: string) => {
    const domain = normalizeDomain(raw);
    if (!domain) {
      setError('Geçerli bir alan adı gir (ör. ornek.com). IP adresi ve yerel adresler kontrol edilmez.');
      return;
    }
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setInput(domain);
    setLoading(true);
    setError('');
    setStatus('');
    setResult(null);
    setDns(null);
    window.history.replaceState(null, '', `?alan=${encodeURIComponent(domain)}`);
    try {
      const [site, records] = await Promise.all([
        fetch(`/api/site-check?domain=${encodeURIComponent(domain)}`, { signal: controller.signal }).then(async (response) => {
          const body = await response.json();
          if (!response.ok) throw new Error(body?.error ?? 'Kontrol tamamlanamadı.');
          return body as SiteCheckResult;
        }),
        checkDns(domain, controller.signal),
      ]);
      setResult(site);
      setDns(records);
      setStatus(`${domain} kontrol edildi.`);
    } catch (cause) {
      if (controller.signal.aborted) return;
      setError(cause instanceof Error ? cause.message : 'Kontrol tamamlanamadı. Lütfen tekrar dene.');
    } finally {
      if (request.current === controller) setLoading(false);
    }
  }, []);

  // A shared link (?alan=ornek.com) runs the check straight away.
  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get('alan');
    if (shared) void run(shared);
    return () => request.current?.abort();
  }, [run]);

  function submit(event: FormEvent) {
    event.preventDefault();
    void run(input);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('Sonuç bağlantısı kopyalandı.');
    } catch {
      setStatus('Bağlantı kopyalanamadı; adres çubuğundan kopyalayabilirsin.');
    }
  }

  const certificate = result?.certificate ?? null;
  const certTone = certificateTone(certificate);
  const hops = result?.redirects ?? [];
  const finalHop = hops.at(-1);
  const presentHeaders = result?.headers.filter((header) => header.present).length ?? 0;
  const addresses = dns?.records.filter((record) => record.type === 'A' || record.type === 'AAAA') ?? [];

  return (
    <>
      <p className="photo-privacy">
        <LockKeyhole aria-hidden="true" /> Sertifika ve yönlendirmeler sunucumuzdan, DNS kayıtları Cloudflare DNS
        üzerinden sorgulanır. Sorgular kaydedilmez.
      </p>
      <form className="site-form network-panel" onSubmit={submit} role="search">
        <label htmlFor="site-domain" className="form-label">
          Alan adı <span>ör. ornek.com veya https://www.ornek.com.tr</span>
        </label>
        <div className="site-form-row">
          <input
            id="site-domain"
            className="input mono"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="ornek.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-accent" disabled={loading || !input.trim()}>
            <Search aria-hidden="true" /> {loading ? 'Kontrol ediliyor…' : 'Kontrol et'}
          </button>
        </div>
        {!result && !loading && (
          <p className="site-examples">
            Dene:{' '}
            {['biyik.dev', 'github.com', 'expired.badssl.com'].map((example) => (
              <button key={example} type="button" className="mono" onClick={() => void run(example)}>
                {example}
              </button>
            ))}
          </p>
        )}
      </form>

      {error && (
        <p className="photo-error" role="alert">
          {error}
        </p>
      )}
      {loading && (
        <div className="site-loading" aria-live="polite">
          <span /> Sertifika, yönlendirmeler ve DNS kayıtları sorgulanıyor…
        </div>
      )}

      {result && (
        <div className="site-report">
          <div className="network-section-heading">
            <h2>
              {result.domain}
              <span>{new Date(result.checkedAt).toLocaleString('tr-TR')}</span>
            </h2>
            <button type="button" className="btn btn-sm" onClick={() => void copyLink()}>
              <Copy aria-hidden="true" /> Sonuç bağlantısı
            </button>
          </div>

          <div className="site-summary">
            <Summary
              tone={certTone}
              label="SSL sertifikası"
              value={
                certificate
                  ? certificate.daysLeft < 0
                    ? 'Süresi dolmuş'
                    : `${certificate.daysLeft} gün`
                  : 'Yok'
              }
              note={certificate ? (certificate.problem ?? 'geçerli · kalan süre') : 'HTTPS bağlantısı kurulamadı'}
            />
            <Summary
              tone={result.httpsRedirect ? 'ok' : statusTone(finalHop?.status ?? null) === 'bad' ? 'bad' : 'warn'}
              label="HTTPS yönlendirmesi"
              value={result.httpsRedirect ? 'Var' : 'Yok'}
              note={`${hops.length} adım · son durum ${finalHop?.status ?? 'hata'}`}
            />
            <Summary
              tone={dns?.failed ? 'warn' : addresses.length ? 'ok' : 'bad'}
              label="DNS"
              value={dns?.failed ? '—' : `${dns?.records.length ?? 0} kayıt`}
              note={
                dns?.failed
                  ? 'DNS sorgusu yapılamadı'
                  : `IPv4 ${addresses.some((r) => r.type === 'A') ? '✓' : '✗'} · IPv6 ${addresses.some((r) => r.type === 'AAAA') ? '✓' : '✗'}`
              }
            />
            <Summary
              tone={!result.headers.length ? 'bad' : presentHeaders >= 4 ? 'ok' : presentHeaders >= 2 ? 'warn' : 'bad'}
              label="Güvenlik başlıkları"
              value={result.headers.length ? `${presentHeaders} / ${result.headers.length}` : '—'}
              note={result.server ? `sunucu: ${result.server}` : 'yanıt başlıkları'}
            />
          </div>

          <section className="network-info-section" aria-labelledby="site-ssl">
            <div className="network-section-heading">
              <h2 id="site-ssl">SSL sertifikası</h2>
              {certificate && (
                <span className="site-badge" data-tone={certTone}>
                  {certTone === 'ok' ? <ShieldCheck aria-hidden="true" /> : <ShieldAlert aria-hidden="true" />}
                  {certificate.valid ? (certTone === 'warn' ? 'Yakında doluyor' : 'Geçerli') : 'Güvenilmiyor'}
                </span>
              )}
            </div>
            {certificate ? (
              <dl className="ip-details">
                <div>
                  <dt>Verilen alan adları</dt>
                  <dd className="mono">{certificate.names.join(', ') || certificate.subject}</dd>
                </div>
                <div>
                  <dt>Sertifika sağlayıcısı</dt>
                  <dd>{certificate.issuer}</dd>
                </div>
                <div>
                  <dt>Geçerlilik başlangıcı</dt>
                  <dd>{dateFormat.format(new Date(certificate.validFrom))}</dd>
                </div>
                <div>
                  <dt>Bitiş tarihi</dt>
                  <dd>
                    {dateFormat.format(new Date(certificate.validTo))}{' '}
                    <span className="site-muted">
                      ({certificate.daysLeft < 0 ? `${-certificate.daysLeft} gün önce doldu` : `${certificate.daysLeft} gün kaldı`})
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Protokol</dt>
                  <dd className="mono">{certificate.protocol ?? '—'}</dd>
                </div>
                <div>
                  <dt>Sertifika zinciri</dt>
                  <dd>{certificate.chain.join(' → ')}</dd>
                </div>
              </dl>
            ) : (
              <p className="network-empty">{result.certificateError ?? 'Sertifika okunamadı.'}</p>
            )}
            {certificate?.problem && <p className="photo-quality-note">{certificate.problem}</p>}
          </section>

          <section className="network-info-section" aria-labelledby="site-redirects">
            <div className="network-section-heading">
              <h2 id="site-redirects">
                Yönlendirme zinciri <span>{hops.length} adım</span>
              </h2>
            </div>
            <ol className="site-hops">
              {hops.map((hop, index) => (
                <li key={`${hop.url}-${index}`} data-tone={statusTone(hop.status)}>
                  <span className="site-status mono">{hop.status ?? 'hata'}</span>
                  <span className="site-hop-url mono">{hop.url}</span>
                  <span className="site-hop-time mono">{hop.ms} ms</span>
                  {hop.error && <span className="site-hop-error">{hop.error}</span>}
                  {index < hops.length - 1 && <ArrowDown className="site-hop-arrow" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            {!result.httpsRedirect && hops[0]?.status !== null && (
              <p className="photo-quality-note">
                http:// adresi https:// adresine yönlendirilmiyor. Ziyaretçiler şifresiz bağlantıda kalabilir; sunucuda
                kalıcı (301/308) yönlendirme tanımlaman önerilir.
              </p>
            )}
          </section>

          <section className="network-info-section" aria-labelledby="site-dns">
            <div className="network-section-heading">
              <h2 id="site-dns">DNS kayıtları</h2>
            </div>
            {dns && dns.records.length > 0 ? (
              <div className="network-table-wrap">
                <table className="network-table site-dns-table">
                  <thead>
                    <tr>
                      <th scope="col">Tür</th>
                      <th scope="col">Değer</th>
                      <th scope="col">TTL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dns.records.map((record, index) => (
                      <tr key={`${record.type}-${record.value}-${index}`}>
                        <td>{record.type}</td>
                        <td>{record.value}</td>
                        <td>{formatTtl(record.ttl)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="network-empty">
                {dns?.failed ? 'DNS sorgusu yapılamadı; içerik engelleyicini kontrol edip tekrar dene.' : 'Kayıt bulunamadı.'}
              </p>
            )}
            {dns && !dns.failed && (
              <dl className="ip-details site-mail">
                <div>
                  <dt>SPF (gönderici doğrulama)</dt>
                  <dd className="mono">{dns.spf ?? 'Tanımlı değil'}</dd>
                </div>
                <div>
                  <dt>DMARC (sahte e-posta politikası)</dt>
                  <dd className="mono">{dns.dmarc ?? 'Tanımlı değil'}</dd>
                </div>
              </dl>
            )}
          </section>

          {result.headers.length > 0 && (
            <section className="network-info-section" aria-labelledby="site-headers">
              <div className="network-section-heading">
                <h2 id="site-headers">
                  Güvenlik başlıkları <span>{finalHop?.url}</span>
                </h2>
              </div>
              <ul className="site-headers">
                {result.headers.map((header) => (
                  <li key={header.key} data-tone={header.present ? 'ok' : 'warn'}>
                    {header.present ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
                    <div>
                      <strong className="mono">{header.label}</strong>
                      <p>{header.advice}</p>
                      {header.value && <code title={header.value}>{header.value}</code>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
      <p className="photo-status" role="status">
        {status}
      </p>
    </>
  );
}
