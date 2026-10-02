import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { byk, downloads, excelColumns, features, printerNotes, usageSteps } from '@/data/bykData';
import { personalInfo } from '@/data/cvData';
import { site } from '@/lib/site';
import { ArrowLeft, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: byk.name,
  description:
    'BYK Seri Baskı Pro — Excel’deki seri numarası ve barkod listesini termal etiket yazıcısına basan Windows ve macOS programı. Ücretsiz indirin.',
  keywords: [
    'BYK Seri Baskı Pro',
    'barkod yazdırma programı',
    'termal etiket yazıcısı',
    'Excel barkod baskı',
    'TSPL',
    'Xprinter XP-490B',
  ],
  alternates: { canonical: '/byk-seri-baski-pro' },
  openGraph: { images: [{ url: byk.icon }] },
};

const BykPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: byk.name,
    description: byk.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS',
    image: `${site.url}${byk.icon}`,
    url: `${site.url}/byk-seri-baski-pro`,
    author: { '@type': 'Person', name: personalInfo.name, url: site.url },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
  };

  return (
    <div className="animate-fade-up">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/projeler" className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle hover:text-fg">
        <ArrowLeft size={14} />
        projeler
      </Link>

      <header className="mt-6 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <Image
            src={byk.icon}
            alt={`${byk.name} program ikonu`}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-md"
          />
          <div>
            <p className="font-mono text-xs text-subtle">Windows · macOS · ücretsiz · çevrimdışı</p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight text-fg">{byk.name}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{byk.slogan}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {downloads.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              className="inline-flex items-center gap-1.5 rounded-md bg-fg px-3.5 py-2 text-sm text-canvas hover:opacity-90"
            >
              <Download size={14} />
              {item.platform}
            </a>
          ))}
        </div>
      </header>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">{byk.description}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {features.map((group) => (
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

      <section className="mt-10 max-w-2xl">
        <h2 className="font-mono text-xs tracking-wide text-subtle">Excel ve yazıcı</h2>
        <p className="mt-3 text-sm leading-6 text-fg">
          {excelColumns.map((column) => (column.required ? `${column.column} (zorunlu)` : column.column)).join(' · ')}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">{printerNotes[0]}</p>
        <p className="mt-2 text-sm leading-6 text-muted">{usageSteps.join(' → ')}</p>
      </section>

      <section className="mt-8 max-w-2xl space-y-2 border-t border-border pt-6 text-sm leading-6 text-muted">
        {downloads.map((item) => (
          <p key={item.platform}>
            <span className="font-mono text-[11px] text-subtle">{item.platform}</span> {item.note}
          </p>
        ))}
        <p>
          Ayrıntılı kullanım:{' '}
          <a
            href={byk.guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
          >
            kullanım notu
          </a>
          . Soru için{' '}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
          >
            {personalInfo.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default BykPage;
