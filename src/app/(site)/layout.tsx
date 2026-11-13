import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <a href="#icerik" className="skip-link">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="icerik" className="main">
        {children}
      </main>
      <Footer />
      <div className="scroll-fade scroll-fade-top" aria-hidden="true" />
      <div className="scroll-fade scroll-fade-bottom" aria-hidden="true" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${site.url}/#person`,
              name: site.name,
              alternateName: 'Metin Bıyık',
              url: site.url,
              email: `mailto:${site.email}`,
              jobTitle: site.jobTitle,
              address: {
                '@type': 'PostalAddress',
                addressLocality: site.city,
                addressCountry: 'TR',
              },
              knowsAbout: [
                'Web geliştirme',
                'Masaüstü uygulama geliştirme',
                'iOS uygulama geliştirme',
                'Kurumsal web siteleri',
                'Telekomünikasyon altyapısı',
              ],
              sameAs: [site.github, site.linkedin, site.instagram],
            },
            {
              '@type': 'WebSite',
              '@id': `${site.url}/#website`,
              name: site.brand,
              alternateName: site.name,
              url: site.url,
              description: site.description,
              inLanguage: 'tr',
              publisher: { '@id': `${site.url}/#person` },
              author: { '@id': `${site.url}/#person` },
            },
          ],
        }}
      />
    </div>
  );
}
