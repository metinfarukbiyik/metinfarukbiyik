import type { Metadata } from 'next';
import DocsPage from './DocsPage';

export const metadata: Metadata = {
  title: { absolute: 'Dokümantasyon — draw.biyik.dev' },
  description:
    'draw.biyik.dev nasıl kullanılır: şekil çizme, metin, ok bağlama, katmanlar, dışa aktarma ve tahtayı kendi React projene ekleme. Ekran görüntülü kısa eğitim.',
  alternates: {
    canonical: 'https://draw.biyik.dev/docs',
    languages: { tr: 'https://draw.biyik.dev/docs', en: 'https://draw.biyik.dev/docs/en' },
  },
};

export default function Page() {
  return <DocsPage lang="tr" />;
}
