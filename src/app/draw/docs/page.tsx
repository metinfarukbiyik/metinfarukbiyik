import type { Metadata } from 'next';
import { ogImage } from '@/lib/seo';
import DocsPage from './DocsPage';

const description =
  'draw.biyik.dev nasıl kullanılır: şekil çizme, metin, ok bağlama, katmanlar, dışa aktarma ve tahtayı kendi React projene ekleme. Ekran görüntülü kısa eğitim.';

export const metadata: Metadata = {
  title: { absolute: 'Dokümantasyon — draw.biyik.dev' },
  description,
  openGraph: {
    type: 'article',
    url: 'https://draw.biyik.dev/docs',
    title: 'Dokümantasyon — draw.biyik.dev',
    description,
    siteName: 'biyik.dev',
    locale: 'tr_TR',
    images: [{ url: ogImage('/draw/docs'), width: 1200, height: 630, alt: 'Dokümantasyon — draw.biyik.dev' }],
  },
  twitter: { card: 'summary_large_image', description, title: 'Dokümantasyon — draw.biyik.dev', images: [ogImage('/draw/docs')] },
  alternates: {
    canonical: 'https://draw.biyik.dev/docs',
    languages: { tr: 'https://draw.biyik.dev/docs', en: 'https://draw.biyik.dev/docs/en' },
  },
};

export default function Page() {
  return <DocsPage lang="tr" />;
}
