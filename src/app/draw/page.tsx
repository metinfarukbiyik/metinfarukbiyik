import type { Metadata, Viewport } from 'next';
import { Caveat } from 'next/font/google';
import DrawLoader from './DrawLoader';
import { ogImage } from '@/lib/seo';
import '@/lib/sketch-react/styles.css';
import './page.css';

/** Tuvaldeki el yazısı. Kendi alan adımızdan sunulur (next/font). */
const hand = Caveat({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-hand' });

const url = 'https://draw.biyik.dev';
const title = 'Draw — biyik.dev';
const description =
  'Tarayıcıda çalışan, el çizimi görünümlü beyaz tahta. Diyagram, akış şeması ve eskizleri hızlıca çizin; PNG, SVG ya da dosya olarak dışa aktarın. Çizimler yalnızca tarayıcınızda saklanır.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  applicationName: 'biyik.dev Draw',
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    siteName: 'biyik.dev',
    locale: 'tr_TR',
    images: [{ url: ogImage('/draw'), width: 1200, height: 630, alt: 'draw.biyik.dev — el çizimi beyaz tahta' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage('/draw')] },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function DrawPage() {
  return (
    <main className={`sk-page ${hand.variable}`}>
      <h1 className="sr-only">draw.biyik.dev — çizim tahtası</h1>
      <DrawLoader handFont={hand.style.fontFamily} />
    </main>
  );
}
