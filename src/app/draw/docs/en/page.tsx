import type { Metadata } from 'next';
import { ogImage } from '@/lib/seo';
import DocsPage from '../DocsPage';

const description =
  'How to use draw.biyik.dev: drawing shapes, text, arrow binding, layers, export and adding the board to your own React app. A short tutorial with screenshots.';

export const metadata: Metadata = {
  title: { absolute: 'Documentation — draw.biyik.dev' },
  description,
  openGraph: {
    type: 'article',
    url: 'https://draw.biyik.dev/docs/en',
    title: 'Documentation — draw.biyik.dev',
    description,
    siteName: 'biyik.dev',
    locale: 'en_US',
    images: [{ url: ogImage('/draw/docs/en'), width: 1200, height: 630, alt: 'Documentation — draw.biyik.dev' }],
  },
  twitter: { card: 'summary_large_image', description, title: 'Documentation — draw.biyik.dev', images: [ogImage('/draw/docs/en')] },
  alternates: {
    canonical: 'https://draw.biyik.dev/docs/en',
    languages: { tr: 'https://draw.biyik.dev/docs', en: 'https://draw.biyik.dev/docs/en' },
  },
};

export default function Page() {
  return <DocsPage lang="en" />;
}
