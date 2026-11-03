import Link from 'next/link';
import { ArrowUpRight, ScanFace, Gauge, Globe2 } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Araçlar',
  'Günlük işleri kolaylaştıran ücretsiz çevrimiçi araçlar. Vesikalık fotoğraf hazırla, internet hızını test et ve IP adresini öğren.',
  '/araclar',
  [
    'vesikalık fotoğraf',
    'internet hız testi',
    'IP adresim',
    'ücretsiz araçlar',
  ],
);

export default function ToolsPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Küçük yardımcılar / Araçlar"
        title="İşini kolaylaştır."
        description="Kurulum gerektirmeyen, doğrudan tarayıcında kullanabileceğin pratik araçlar."
      />
      <nav className="tool-category-links" aria-label="Araç kategorileri">
        <a href="#fotograf-baski">
          Fotoğraf & baskı <span>1</span>
        </a>
        <a href="#internet-ag">
          İnternet & ağ <span>2</span>
        </a>
      </nav>
      {[
        {
          id: 'fotograf-baski',
          name: 'Fotoğraf & baskı',
          description:
            'Fotoğraflarını düzenle, baskıya hazır dosyalar oluştur.',
          tools: [
            {
              name: 'Vesikalık fotoğraf oluştur',
              description:
                'Kadrajını ayarla; 1, 2, 4 veya 8 adet vesikalığı A4/A5 şablonunda PDF, PNG veya JPEG olarak indir.',
              href: '/araclar/vesikalik-fotograf',
              icon: ScanFace,
              meta: 'Cihazında işlenir · Kurulum yok',
            },
          ],
        },
        {
          id: 'internet-ag',
          name: 'İnternet & ağ',
          description: 'Bağlantını ölç ve ağ bilgilerini öğren.',
          tools: [
            {
              name: 'İnternet hız testi',
              description:
                'Bağlantı hızını ve gecikmeni ölç, sonuçlarını karşılaştır ve görsel olarak paylaş.',
              href: '/araclar/internet-hiz-testi',
              icon: Gauge,
              meta: 'Adaptif aktarım · Yerel geçmiş',
            },
            {
              name: 'IP adresim',
              description:
                'Genel IPv4 ve IPv6 adreslerini kopyala; servis sağlayıcını ve yaklaşık ağ konumunu görüntüle.',
              href: '/araclar/ip-adresim',
              icon: Globe2,
              meta: 'IPv4 & IPv6 · Kopyalama',
            },
          ],
        },
      ].map((category) => (
        <section
          className="tool-category"
          id={category.id}
          key={category.id}
          aria-labelledby={`${category.id}-title`}
        >
          <div className="tool-category-heading">
            <h2 id={`${category.id}-title`}>{category.name}</h2>
            <p>{category.description}</p>
          </div>
          <div className="tool-category-grid">
            {category.tools.map((tool) => (
              <Link href={tool.href} className="tool-card" key={tool.href}>
                <span className="tool-card-icon">
                  <tool.icon size={25} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span className="tool-card-meta">{tool.meta}</span>
                  <span className="tool-card-action">
                    Aracı kullan <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
