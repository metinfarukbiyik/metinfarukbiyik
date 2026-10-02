import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { appInfo, ayet, extraFeatures, featureGroups } from '@/data/ayetData';
import { personalInfo } from '@/data/cvData';
import { site } from '@/lib/site';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: ayet.name,
  description:
    '1 Ayet — Her güne bir ayet, her ayete bir tefekkür. Diyanet mealiyle sade ve huzurlu bir okuma rehberi. App Store’da yakında.',
  keywords: [
    '1 Ayet',
    'Bir Ayet',
    'Kur’an meali',
    'günün ayeti',
    'tefekkür',
    'iOS uygulaması',
    'Android uygulaması',
  ],
  alternates: { canonical: '/1-ayet' },
  openGraph: { images: [{ url: ayet.icon }] },
};

const AyetPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: ayet.name,
    description: ayet.description,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    image: `${site.url}${ayet.icon}`,
    url: `${site.url}/1-ayet`,
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

      <header className="mt-6 flex items-start gap-4 border-b border-border pb-8">
        <Image
          src={ayet.icon}
          alt={`${ayet.name} uygulama ikonu`}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-md"
        />
        <div>
          <p className="font-mono text-xs text-subtle">iOS · Android · App Store’da yakında</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight text-fg">{ayet.name}</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{ayet.slogan}</p>
        </div>
      </header>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">{ayet.description}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
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

      <section className="mt-10">
        <h2 className="font-mono text-xs tracking-wide text-subtle">Ayrıca</h2>
        <ul className="mt-3 max-w-2xl space-y-2">
          {extraFeatures.map((group) => (
            <li key={group.title} className="text-sm leading-6 text-fg">
              <span className="text-muted">{group.title}.</span> {group.items[0]}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{ayet.privacy}</p>
      </section>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
        {appInfo.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] tracking-wide text-subtle">{fact.label}</dt>
            <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default AyetPage;
