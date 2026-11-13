import type { Metadata, Viewport } from 'next';
import DrawLoader from './DrawLoader';

const url = 'https://draw.biyik.dev';
const title = 'Draw — biyik.dev';
const description =
  'Tarayıcıda çalışan, el çizimi görünümlü sanal beyaz tahta. Diyagram, akış şeması ve eskizleri hızlıca çizin; PNG, SVG ya da dosya olarak dışa aktarın.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  applicationName: 'biyik.dev Draw',
  alternates: { canonical: url },
  openGraph: { type: 'website', url, title, description, siteName: 'biyik.dev' },
  twitter: { card: 'summary', title, description },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function DrawPage() {
  return <DrawLoader />;
}
