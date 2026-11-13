'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Analytics'e özel olay gönderir (gtag yüklenmemişse sessizce geçer). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
}

/**
 * Google Analytics: biyik.dev'in ve draw.biyik.dev'in tüm sayfalarında yüklenir (Sanity yönetim
 * paneli hariç). Sayfa adresi # kısmı olmadan gönderilir: paylaşım bağlantılarındaki çizim verisi
 * Analytics'e gitmez. İki alan adı aynı ölçüm kimliğini ve çerezi (biyik.dev) paylaşır.
 */
export default function Analytics() {
  const pathname = usePathname();
  if (pathname?.startsWith('/studio')) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}', {
  page_location: location.origin + location.pathname + location.search,
  cookie_domain: 'auto'
});`}
      </Script>
    </>
  );
}
