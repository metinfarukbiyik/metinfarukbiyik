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
    title: 'Ücretsiz Online Araçlar — Vesikalık, Hız Testi, IP Adresi',
    ogTitle: 'Ücretsiz online araçlar',
    description:
      'Kurulum gerektirmeyen ücretsiz araçlar: vesikalık fotoğraf oluştur, internet hız testi yap ve IP adresini öğren. Hepsi tarayıcında çalışır.',
    path: '/araclar',
    keywords: [
      'ücretsiz online araçlar',
      'vesikalık fotoğraf oluştur',
      'internet hız testi',
      'IP adresim',
      'online araçlar Türkçe',
      'kurulumsuz web araçları',
    ],
  },
  passport: {
    title: 'Vesikalık Fotoğraf Oluştur — Ücretsiz Online Şablon (PDF)',
    ogTitle: 'Vesikalık fotoğraf oluştur',
    description:
      'Fotoğrafını 3,5 × 4,5, 4 × 6, 4,5 × 6 veya 5 × 6 cm ölçüsünde kırp; 1–8 adetlik A4/A5 vesikalık şablonunu PDF, PNG veya JPEG olarak ücretsiz indir.',
    path: '/araclar/vesikalik-fotograf',
    keywords: [
      'vesikalık fotoğraf oluştur',
      'online vesikalık',
      'vesikalık fotoğraf yapma',
      'vesikalık şablonu',
      'vesikalık PDF',
      'biyometrik fotoğraf ölçüsü',
      '3,5 x 4,5 vesikalık',
      '4,5 x 6 vesikalık',
      'evde vesikalık çıktı',
      'A4 vesikalık baskı',
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
      'speed test',
      'internet hızı ölçme',
      'ping testi',
      'indirme hızı',
      'yükleme hızı',
      'Wi-Fi hız testi',
      'fiber hız testi',
      'Mbps nedir',
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
      'IP adresi öğrenme',
      'IP sorgulama',
      'IPv4 adresim',
      'IPv6 adresim',
      'IP adresi bulma',
      'ISS sorgulama',
      'modem IP adresi',
    ],
  },
} satisfies Record<string, SeoEntry>;

export function ogImage(title: string, description: string, label?: string) {
  const params = new URLSearchParams({ title, description });
  if (label) params.set('label', label);
  return `/og?${params.toString()}`;
}

export function pageMetadata(entry: SeoEntry, label?: string): Metadata {
  const fullTitle = `${entry.title} | ${site.brand}`;
  const image = ogImage(entry.ogTitle ?? entry.title, entry.description, label);
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
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: entry.description,
      images: [image],
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
