import type { Metadata, Viewport } from 'next';
import { Geist_Mono, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const sans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-family',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['100', '400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: site.url,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title: site.defaultTitle, description: site.description },
  robots: { index: true, follow: true },
  icons: { icon: '/m.png', apple: '/m.png' },
};

export const viewport: Viewport = {
  themeColor: '#070809',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="tr" className={`${sans.variable} ${mono.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
    <body className="bg-canvas text-fg">{children}</body>
  </html>
);

export default RootLayout;
