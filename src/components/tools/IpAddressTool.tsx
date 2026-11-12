'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import Link from 'next/link';
import { Copy, RefreshCw, ArrowUpRight } from 'lucide-react';
import { notifyIsland } from '@/lib/island';
import { fetchNetworkJson } from '@/lib/network-tools';

type IpInfo = {
  ipv4: string | null;
  ipv6: string | null;
  details: Record<string, unknown> | null;
};
const textField = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value : 'Bilgi alınamadı';

const subscribeToClock = (notify: () => void) => {
  const timer = window.setInterval(notify, 1000);
  return () => window.clearInterval(timer);
};
const clockSnapshot = () => Math.floor(Date.now() / 1000);
const serverClock = () => 0;
function localTime(timezone: unknown, timestamp: number) {
  if (typeof timezone !== 'string' || !timestamp) return null;
  try {
    return new Date(timestamp * 1000).toLocaleString('tr-TR', {
      timeZone: timezone,
    });
  } catch {
    return null;
  }
}

export default function IpAddressTool() {
  const [info, setInfo] = useState<IpInfo>({
    ipv4: null,
    ipv6: null,
    details: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const requestRef = useRef<AbortController | null>(null);
  const refresh = useCallback(() => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    const query = async (url: string, version: 'ipv4' | 'ipv6') => {
      const value = await fetchNetworkJson(url, controller.signal, 8000);
      const ip = typeof value.ip === 'string' ? value.ip : '';
      if (
        !ip ||
        (version === 'ipv4'
          ? !/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)
          : !/^[\da-f:]+$/i.test(ip) || !ip.includes(':'))
      )
        throw new Error('Adres algılanamadı.');
      return ip;
    };
    return Promise.allSettled([
      query('https://api.ipify.org?format=json', 'ipv4'),
      query('https://api6.ipify.org?format=json', 'ipv6'),
    ]).then(async (results) => {
      if (controller.signal.aborted) return;
      const ipv4 = results[0].status === 'fulfilled' ? results[0].value : null;
      const ipv6 = results[1].status === 'fulfilled' ? results[1].value : null;
      setInfo({ ipv4, ipv6, details: null });
      const publicIp = ipv4 ?? ipv6;
      if (publicIp) {
        try {
          const details = await fetchNetworkJson(
            `https://ipapi.co/${encodeURIComponent(publicIp)}/json/`,
            controller.signal,
            8000,
          );
          if (!controller.signal.aborted && !details.error)
            setInfo({ ipv4, ipv6, details });
          else if (!controller.signal.aborted)
            setError(
              'IP adresi bulundu; ağ ve yaklaşık konum bilgisi servisten alınamadı.',
            );
        } catch {
          if (!controller.signal.aborted)
            setError(
              'IP adresi bulundu; ağ ve yaklaşık konum bilgisi servisine şu anda ulaşılamıyor.',
            );
        }
      } else
        setError(
          'IP adresleri algılanamadı. Bağlantını veya içerik engelleyicini kontrol edip yeniden dene.',
        );
      if (!controller.signal.aborted) {
        setLoading(false);
        setMessage('IP adresi sorgulaması tamamlandı.');
      }
    });
  }, []);

  useEffect(() => {
    void refresh();
    return () => requestRef.current?.abort();
  }, [refresh]);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage('IP adresi panoya kopyalandı.');
      notifyIsland({ title: 'Kopyalandı', detail: value, icon: 'copy', tone: 'green' });
    } catch {
      setMessage(
        'Panoya erişilemedi. IP adresini seçip elle kopyalayabilirsin.',
      );
    }
  }
  const details = info.details;
  const clock = useSyncExternalStore(
    subscribeToClock,
    clockSnapshot,
    serverClock,
  );
  const fields = [
    ['İnternet servis sağlayıcısı', details?.org],
    ['ASN', details?.asn],
    ['Ülke', details?.country_name],
    ['Bölge', details?.region],
    ['Bölge kodu', details?.region_code],
    ['Şehir', details?.city],
    ['Posta kodu', details?.postal],
    ['Zaman dilimi', details?.timezone],
    ['UTC farkı', details?.utc_offset],
    ['IP zaman dilimindeki saat', localTime(details?.timezone, clock)],
    [
      'Yaklaşık koordinat',
      typeof details?.latitude === 'number' &&
      typeof details.longitude === 'number'
        ? `${details.latitude.toFixed(3)}, ${details.longitude.toFixed(3)}`
        : null,
    ],
  ];
  return (
    <>
      <div className="network-section-heading">
        <p className="network-intro">
          İnternette görünen genel IP adreslerin. Modeminin veya cihazının yerel
          IP adresinden farklı olabilir.
        </p>
        <button
          type="button"
          className="btn btn-sm"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setMessage('');
            setError('');
            setInfo({ ipv4: null, ipv6: null, details: null });
            void refresh();
          }}
        >
          <RefreshCw size={14} aria-hidden="true" />{' '}
          {loading ? 'Sorgulanıyor…' : 'Yenile'}
        </button>
      </div>
      <div className="ip-address-grid">
        {(['ipv4', 'ipv6'] as const).map((version) => (
          <section
            className="network-panel ip-address-card"
            key={version}
            aria-labelledby={`title-${version}`}
          >
            <div className="network-section-heading">
              <h2 id={`title-${version}`}>
                {version === 'ipv4' ? 'IPv4' : 'IPv6'}
              </h2>
              <span className="network-chip">Mevcut ağ</span>
            </div>
            <p className="ip-address" dir="ltr">
              {info[version] || (loading ? 'Algılanıyor…' : 'Algılanamadı')}
            </p>
            <button
              type="button"
              className="btn btn-sm"
              disabled={!info[version]}
              onClick={() => info[version] && copy(info[version])}
            >
              <Copy size={13} aria-hidden="true" /> Kopyala
            </button>
          </section>
        ))}
      </div>
      <p role="status" className="photo-status">
        {message}
      </p>
      {error && (
        <p className="photo-error" role="alert">
          {error}
        </p>
      )}
      <section className="network-info-section">
        <h2>Ağ bilgileri</h2>
        <dl className="ip-details">
          {fields.map(([label, value]) => (
            <div key={String(label)}>
              <dt>{String(label)}</dt>
              <dd>
                {loading && !details ? 'Sorgulanıyor…' : textField(value)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="network-service-note">
          Konum bilgisi IP veritabanından yaklaşık olarak bulunur; kesin
          adresini veya GPS konumunu göstermez. VPN, proxy ve mobil operatör
          yönlendirmesi sonucu değiştirebilir.
        </p>
      </section>
      <div className="network-info-section network-prose">
        <h2>IP adresi nedir?</h2>
        <p>
          IP adresi, cihazların ağ üzerinde haberleşmesini sağlayan sayısal
          adrestir. IPv4, 192.0.2.1 gibi dört sayıdan; IPv6 ise 2001:db8::1 gibi
          onaltılık gruplardan oluşur. Bir bağlantı her iki protokolü veya
          yalnızca birini kullanabilir.
        </p>
        <h2>Neden bir adres algılanamıyor?</h2>
        <p>
          Ağın ilgili protokolü desteklememesi, VPN, tarayıcı eklentileri, DNS
          ayarları veya sorgu hizmetinin yanıt vermemesi algılamayı
          engelleyebilir. Bu sonuç tek başına IPv6 desteğinin bulunmadığını
          kanıtlamaz.
        </p>
        <h2>Gizlilik ve veri kaynakları</h2>
        <p>
          Sayfa açıldığında adreslerini algılamak için ipify’a; ağ ve yaklaşık
          konum bilgisini almak için ipapi.co’ya istek yapılır. Genel IP adresin
          bu hizmetler tarafından görülür. IP sorguları bu araç tarafından
          tarayıcı geçmişine kaydedilmez.
        </p>
        <p className="network-source-links">
          <a
            href="https://www.ipify.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ipify
          </a>
          <a
            href="https://ipapi.co/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ipapi.co
          </a>
          <Link href="/araclar/internet-hiz-testi">
            Bağlantının hızını test et{' '}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </>
  );
}
