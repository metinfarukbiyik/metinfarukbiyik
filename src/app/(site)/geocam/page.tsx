import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import { getAppStoreStats } from '@/lib/appStore';
import { featureGroups, geocam, useCases } from '@/data/geocamData';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GeoCam: Audit',
  description:
    'GeoCam: Audit — App Store’da yayınlanan konum doğrulamalı saha ve denetim kamerası. Fotoğraflara GPS, adres, pusula ve iş bilgisi damgalar.',
  keywords: ['GeoCam Audit', 'iOS uygulaması', 'GPS kamera', 'saha denetim kamerası'],
  alternates: { canonical: '/geocam' },
  openGraph: { images: [{ url: geocam.icon }] },
};

const formatRating = (value: number) => value.toFixed(1).replace('.', ',');

const GeoCamPage = async () => {
  const { rating, ratingCount, version } = await getAppStoreStats();

  const facts = [
    { label: 'Puan', value: `${formatRating(rating)} · ${ratingCount}` },
    { label: 'Sürüm', value: version },
    { label: 'Platform', value: 'iPhone · iOS 17+' },
    { label: 'Boyut', value: '2 MB' },
    { label: 'Fiyat', value: 'Ücretsiz' },
    { label: 'Kategori', value: 'İş' },
  ];

  return (
    <div className="animate-fade-up">
      <Link href="/projeler" className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle hover:text-fg">
        <ArrowLeft size={14} />
        projeler
      </Link>

      <header className="mt-6 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <Image
            src={geocam.icon}
            alt={`${geocam.name} uygulama ikonu`}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-md ring-1 ring-border"
          />
          <div>
            <p className="font-mono text-xs text-subtle">iOS · App Store</p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight text-fg">{geocam.name}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{geocam.slogan}</p>
          </div>
        </div>
        <a
          href={geocam.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-fg px-3.5 py-2 text-sm text-canvas hover:opacity-90"
        >
          App Store
          <ArrowUpRight size={14} />
        </a>
      </header>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">{geocam.description}</p>

      <ScreenshotGallery />

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {featureGroups.map((group) => (
          <section key={group.title}>
            <h2 className="font-mono text-xs tracking-wide text-subtle">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs leading-5 text-subtle">{useCases.join(' · ')}</p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{geocam.privacy}</p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] tracking-wide text-subtle">{fact.label}</dt>
            <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default GeoCamPage;
