import type { Metadata } from 'next';
import { site } from './site';
import type { PortfolioProject } from '@/data/projects';
import type { ToolItem } from '@/data/tools';

export interface SeoEntry {
  /** Shown in search results; the `| biyik.dev` suffix is added automatically. */
  title: string;
  description: string;
  path: string;
  keywords: string[];
  /** Short heading for the social card; falls back to `title`. */
  ogTitle?: string;
}

/**
 * Search intent per page. Titles lead with the phrase people actually type,
 * descriptions stay under ~160 characters, keywords mix head and long-tail terms.
 */
export const seoPages = {
  home: {
    title: 'Metin Faruk Bıyık — Yazılım Geliştirici, Trabzon',
    ogTitle: 'Web, mobil ve masaüstü uygulamaları',
    description:
      'Trabzon’da web, mobil ve masaüstü uygulamaları geliştiren Metin Faruk Bıyık’ın portföyü: BYK Music, GeoCam: Audit, BYK Seri Baskı Pro ve kurumsal web projeleri.',
    path: '/',
    keywords: [
      'Metin Faruk Bıyık',
      'Metin Bıyık',
      'biyik.dev',
      'yazılım geliştirici Trabzon',
      'Trabzon web tasarım',
      'Trabzon yazılım',
      'freelance yazılım geliştirici',
      'kurumsal web sitesi yaptırmak',
      'masaüstü uygulama geliştirme',
      'iOS uygulama geliştirme',
      'yazılım geliştirici portföyü',
    ],
  },
  about: {
    title: 'Hakkımda — Özgeçmiş, Deneyim ve Eğitim',
    ogTitle: 'Hakkımda',
    description:
      'Metin Faruk Bıyık’ın özgeçmişi: yazılım, telekomünikasyon ve operasyon deneyimi, eğitim bilgileri, sertifikalar ve çalışma ekipmanları. CV’yi PDF olarak indirin.',
    path: '/hakkimda',
    keywords: [
      'Metin Faruk Bıyık özgeçmiş',
      'Metin Faruk Bıyık CV',
      'yazılım geliştirici özgeçmiş',
      'telekomünikasyon teknisyeni',
      'baz istasyonu teknisyeni',
      'FTTH teknisyeni',
      'Trabzon',
      'Bilgi Yönetimi',
      'Turkcell Akademi sertifika',
    ],
  },
  projects: {
    title: 'Projeler — Masaüstü, Mobil ve Web Uygulamaları',
    ogTitle: 'Projeler',
    description:
      'BYK Music, GeoCam: Audit, BYK Seri Baskı Pro, Creda System ve kurumsal web siteleri. Uygulamaları indirin, web projelerini inceleyin.',
    path: '/projeler',
    keywords: [
      'Metin Faruk Bıyık projeler',
      'YouTube MP3 indirici',
      'GPS kamera uygulaması',
      'barkod etiket yazdırma programı',
      'iş emri takip sistemi',
      'kurumsal web sitesi örnekleri',
      'masaüstü uygulama',
      'iPhone uygulaması',
      'web tasarım portföy',
    ],
  },
  contact: {
    title: 'İletişim — Web Sitesi ve Uygulama Projeleri',
    ogTitle: 'İletişim',
    description:
      'Web sitesi, mobil veya masaüstü uygulama projeniz için Metin Faruk Bıyık ile iletişime geçin. E-posta, telefon, WhatsApp, LinkedIn ve GitHub.',
    path: '/iletisim',
    keywords: [
      'Metin Faruk Bıyık iletişim',
      'biyik.dev iletişim',
      'web sitesi yaptırmak Trabzon',
      'yazılım geliştirici iletişim',
      'uygulama geliştirme teklif',
      'freelance web geliştirici',
    ],
  },
  tools: {
    title: 'Ücretsiz Online Araçlar: QR Kod, Vesikalık, Hız Testi',
    ogTitle: 'Ücretsiz online araçlar',
    description:
      'Kurulum gerektirmeyen ücretsiz araçlar: QR kod ve Wi-Fi QR oluştur, vesikalık fotoğraf hazırla, internet hız testi yap, IP adresini öğren.',
    path: '/araclar',
    keywords: [
      'ücretsiz online araçlar',
      'online araçlar',
      'QR kod oluşturucu',
      'Wi-Fi QR kod',
      'vesikalık fotoğraf oluştur',
      'internet hız testi',
      'IP adresim',
      'kurulumsuz web araçları',
      'Türkçe online araçlar',
    ],
  },
  passport: {
    title: 'Vesikalık Fotoğraf Oluştur — Ücretsiz, PDF Şablon',
    ogTitle: 'Vesikalık fotoğraf oluştur',
    description:
      'Fotoğrafını 3,5 × 4,5, 4 × 6, 4,5 × 6 veya 5 × 6 cm ölçüsünde kırp; 1–8 adetlik A4/A5 vesikalık şablonunu PDF, PNG veya JPEG olarak ücretsiz indir.',
    path: '/araclar/vesikalik-fotograf',
    keywords: [
      'vesikalık fotoğraf oluştur',
      'online vesikalık',
      'vesikalık fotoğraf yapma',
      'ücretsiz vesikalık',
      'vesikalık şablonu',
      'vesikalık PDF',
      'vesikalık fotoğraf boyutu',
      'biyometrik fotoğraf ölçüsü',
      'pasaport fotoğrafı',
      'kimlik kartı fotoğrafı',
      'vize fotoğrafı 35x45',
      '3,5 x 4,5 vesikalık',
      '4,5 x 6 vesikalık',
      '5 x 6 biyometrik',
      'evde vesikalık çıktı',
      'A4 vesikalık baskı',
    ],
  },
  qr: {
    title: 'QR Kod Oluşturucu — Ücretsiz Wi-Fi ve URL QR Kod Yap',
    ogTitle: 'QR kod oluşturucu',
    description:
      'Ücretsiz QR kod oluştur: bağlantı, Wi-Fi (şifreyle otomatik bağlanma), metin, e-posta ve telefon. Renk, logo ve alt yazı ekle; PNG veya SVG indir.',
    path: '/araclar/qr-kod-olusturucu',
    keywords: [
      'QR kod oluşturucu',
      'QR kod oluşturma',
      'QR kod yapma',
      'ücretsiz QR kod oluşturucu',
      'Wi-Fi QR kod',
      'Wi-Fi şifresi QR kod',
      'wifi qr kod oluşturma',
      'URL QR kod',
      'link QR kod yapma',
      'web sitesi QR kod',
      'logolu QR kod',
      'renkli QR kod',
      'QR kod SVG indir',
      'QR kod PNG indir',
      'menü QR kod',
      'kartvizit QR kod',
      'e-posta QR kod',
      'telefon QR kod',
      'süresiz QR kod',
      'QR code generator',
    ],
  },
  speed: {
    title: 'İnternet Hız Testi — İndirme, Yükleme ve Ping Ölç',
    ogTitle: 'İnternet hız testi',
    description:
      'Ücretsiz internet hız testi: indirme ve yükleme hızını, gecikmeyi (ping) ve jitter değerini tarayıcında ölç. Sonucunu görsel olarak indir ve paylaş.',
    path: '/araclar/internet-hiz-testi',
    keywords: [
      'internet hız testi',
      'hız testi',
      'internet hızı ölçme',
      'speed test',
      'speedtest',
      'ping testi',
      'gecikme testi',
      'jitter testi',
      'indirme hızı',
      'yükleme hızı',
      'Wi-Fi hız testi',
      'fiber hız testi',
      'mobil internet hız testi',
      '5G hız testi',
      'Mbps nedir',
      'Mbps MB/s dönüştürme',
    ],
  },
  ip: {
    title: 'IP Adresim Nedir? — IPv4 ve IPv6 Adresini Öğren',
    ogTitle: 'IP adresim nedir?',
    description:
      'IP adresim ne? Genel IPv4 ve IPv6 adresini anında öğren ve kopyala; internet servis sağlayıcını (ASN) ve IP’ye bağlı yaklaşık konumu gör.',
    path: '/araclar/ip-adresim',
    keywords: [
      'IP adresim',
      'IP adresim nedir',
      'IP adresim ne',
      'IP adresi öğrenme',
      'IP sorgulama',
      'IP adresi bulma',
      'IPv4 adresim',
      'IPv6 adresim',
      'genel IP adresi',
      'dış IP adresi',
      'ISS sorgulama',
      'ASN sorgulama',
      'IP konum sorgulama',
      'modem IP adresi',
      'statik IP dinamik IP',
    ],
  },
} satisfies Record<string, SeoEntry>;

/** Stable, short file key for a page's social card: `/araclar/ip-adresim` → `araclar_ip-adresim`. */
export function ogKey(path: string) {
  return path === '/' ? 'ana-sayfa' : path.replace(/^\//, '').replace(/\//g, '_');
}

/** Social preview image, pre-rendered at build time by src/app/og/[key]/route.tsx. */
export function ogImage(path: string) {
  return `/og/${ogKey(path)}`;
}

export function pageMetadata(entry: SeoEntry): Metadata {
  const fullTitle = `${entry.title} | ${site.brand}`;
  const image = ogImage(entry.path);
  const alt = `${entry.ogTitle ?? entry.title} — ${site.brand}`;
  return {
    title: { absolute: fullTitle },
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: entry.path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      url: entry.path,
      siteName: site.brand,
      title: fullTitle,
      description: entry.description,
      images: [{ url: image, width: 1200, height: 630, alt, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: entry.description,
      images: [{ url: image, alt }],
    },
  };
}

export function projectSeo(project: PortfolioProject): SeoEntry {
  return {
    title: project.seoTitle,
    ogTitle: project.name,
    description: project.seoDescription,
    path: project.href,
    keywords: project.keywords,
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href === '/' ? '' : crumb.href}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function toolSchema(tool: ToolItem, entry: SeoEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${site.url}${tool.href}`,
    description: entry.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web tarayıcısı',
    browserRequirements: 'JavaScript gerektirir',
    inLanguage: 'tr',
    isAccessibleForFree: true,
    featureList: tool.features,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    image: `${site.url}${ogImage(tool.href)}`,
    author: { '@id': `${site.url}/#person` },
  };
}

export function projectSchema(project: PortfolioProject) {
  const isApp = project.category === 'Uygulama';
  return {
    '@context': 'https://schema.org',
    '@type': isApp ? 'SoftwareApplication' : 'CreativeWork',
    name: project.name,
    description: project.detail,
    url: `${site.url}${project.href}`,
    ...(project.image ? { image: `${site.url}${project.image}` } : {}),
    keywords: project.keywords.join(', '),
    inLanguage: 'tr',
    author: { '@id': `${site.url}/#person`, '@type': 'Person', name: site.name },
    ...(isApp
      ? {
          operatingSystem: project.operatingSystem,
          applicationCategory: project.applicationCategory,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
          featureList: project.features,
        }
      : { sameAs: project.url }),
  };
}
