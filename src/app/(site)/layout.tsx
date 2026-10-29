import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { personalInfo } from '@/data/cvData';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main-content" className="main-panel">
        {children}
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${site.url}/#person`,
              name: site.name,
              url: site.url,
              jobTitle: 'Yazılım Geliştirici',
              sameAs: [
                personalInfo.linkedin,
                'https://github.com/metinfarukbiyik',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': `${site.url}/#website`,
              name: 'biyik.dev',
              url: site.url,
              inLanguage: 'tr',
              author: { '@id': `${site.url}/#person` },
            },
          ],
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga"
        strategy="afterInteractive"
      >{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${site.gaId}');`}</Script>
    </div>
  );
}
