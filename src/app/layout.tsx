import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/feed.xml' } },
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
  themeColor: '#ffffff',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="tr" className={inter.variable} data-scroll-behavior="smooth">
    <body className="bg-white text-gray-900">{children}</body>
  </html>
);

export default RootLayout;
