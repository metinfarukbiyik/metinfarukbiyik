import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BykDownloads from '@/components/byk/BykDownloads';
import AccordionItem from '@/components/ui/AccordionItem';
import HashOpenDetails from '@/components/ui/HashOpenDetails';
import {
  byk,
  downloads,
  excelColumns,
  faqs,
  features,
  labelSamples,
  portableDownload,
  printers,
  usageSteps,
} from '@/data/bykData';
import { site } from '@/lib/site';
import {
  AlignCenter,
  ArrowLeft,
  Barcode,
  Check,
  FileSpreadsheet,
  Hash,
  ListPlus,
  Mail,
  MessageCircle,
  Move,
  Printer,
  RefreshCw,
  ScanEye,
  Shrink,
  Stamp,
  X,
  type LucideIcon,
} from 'lucide-react';

const pageUrl = `${site.url}/byk-seri-baski-pro`;
const ogImage = { url: byk.banner, width: 1280, height: 440, alt: `${byk.name} tanıtım görseli` };

export const metadata: Metadata = {
  title: { absolute: byk.metaTitle },
  description: byk.metaDescription,
  keywords: [
    'BYK Seri Baskı Pro',
    'barkod yazdırma programı',
    'seri no etiket',
    'termal etiket yazıcısı',
    'Excel barkod baskı',
    'TSPL',
    'Xprinter',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: pageUrl,
    siteName: site.name,
    title: byk.metaTitle,
    description: byk.metaDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: byk.metaTitle,
    description: byk.metaDescription,
    images: [byk.banner],
  },
};

const featureIcons: Record<string, LucideIcon> = {
  AlignCenter,
  Barcode,
  FileSpreadsheet,
  Hash,
  ListPlus,
  Move,
  Printer,
  RefreshCw,
  ScanEye,
  Shrink,
  Stamp,
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-xs tracking-wide text-muted">{children}</h2>
);

const LabelCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg bg-[#f5f7fa] p-3 ${className}`}>{children}</div>
);

const BykPage = () => {
  const developer = { '@type': 'Organization', name: byk.developer, url: site.url };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: byk.name,
    description: byk.metaDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows 10, Windows 11, macOS 12+',
    downloadUrl: downloads[0].url,
    image: `${site.url}${byk.banner}`,
    url: pageUrl,
    author: developer,
    publisher: developer,
  };

  return (
    <div className="animate-fade-up">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HashOpenDetails />

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
            priority
            className="h-16 w-16 shrink-0 rounded-md"
          />
          <div>
            <p className="font-mono text-xs text-subtle">{byk.developer} · masaüstü uygulaması</p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight text-fg">{byk.name}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{byk.slogan}</p>
            <p className="mt-3 font-mono text-xs text-subtle">{byk.platformLine}</p>
          </div>
        </div>
        <div className="shrink-0">
          <BykDownloads />
        </div>
      </header>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">{byk.description}</p>

      <section className="mt-10">
        <SectionTitle>Nasıl çalışır</SectionTitle>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {usageSteps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border bg-surface p-4">
              <span className="font-mono text-xs text-subtle">0{index + 1}</span>
              <p className="mt-2 text-sm font-medium text-fg">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-lg border border-border p-4">
          <p className="text-sm text-fg">Excel formatı</p>
          <p className="mt-1 text-sm leading-6 text-muted">İlk satır başlık, her satır bir etiket.</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {excelColumns.map((column) => (
              <div key={column.column}>
                <dt className="font-mono text-[11px] text-subtle">{column.column}</dt>
                <dd className="mt-0.5 text-sm text-fg">
                  {column.meaning}
                  {column.required ? (
                    <span className="ml-1 font-mono text-[11px] text-muted">zorunlu</span>
                  ) : (
                    <span className="ml-1 font-mono text-[11px] text-subtle">isteğe bağlı</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle>Etiket örnekleri</SectionTitle>
        <p className="mt-1 text-sm text-muted">Programın kendi önizleme motoruyla üretildi; baskıda da böyle çıkar.</p>
        <div className="mt-4 grid grid-flow-dense gap-4 sm:grid-cols-2">
          {labelSamples.map((sample) => {
            const wide = sample.width > sample.height;
            return (
              <figure key={sample.src} className={wide ? 'sm:col-span-2' : ''}>
                <LabelCard>
                  <Image
                    src={sample.src}
                    alt={sample.alt}
                    width={sample.width}
                    height={sample.height}
                    sizes={wide ? '(min-width: 768px) 576px, 100vw' : '(min-width: 640px) 360px, 100vw'}
                    className={`mx-auto h-auto w-full ${wide ? 'max-w-[576px]' : 'max-w-[376px]'}`}
                  />
                </LabelCard>
                <figcaption className="mt-2 text-sm">
                  <span className="font-mono text-[11px] text-subtle">{sample.title}</span>
                  <span className="ml-2 text-muted">{sample.caption}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle>Özellikler</SectionTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon];
            return (
              <li key={feature.title} className="flex gap-3 rounded-lg border border-border bg-surface p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted">
                  <Icon size={16} aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-fg">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{feature.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12">
        <SectionTitle>Marka stilleri</SectionTitle>
        <p className="mt-1 text-sm text-muted">Firma adı dört stilde: düz, çerçeveli, siyah bant, çizgili.</p>
        <LabelCard className="no-scrollbar mt-4 overflow-x-auto">
          <Image
            src={byk.brandStyles}
            alt="Aynı etiketin dört marka stili: düz yazı, çerçeveli, siyah bant ve üstü altı çizgili firma adı"
            width={1328}
            height={135}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full min-w-[560px]"
          />
        </LabelCard>
      </section>

      <section className="mt-12">
        <SectionTitle>Uyumlu yazıcılar</SectionTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { group: printers.supported, Icon: Check, tone: 'text-emerald-400' },
            { group: printers.unsupported, Icon: X, tone: 'text-rose-400' },
          ].map(({ group, Icon, tone }) => (
            <div key={group.title} className="rounded-lg border border-border bg-surface p-4">
              <h3 className={`flex items-center gap-2 text-sm font-medium ${tone}`}>
                <Icon size={16} aria-hidden />
                {group.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{group.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.brands.map((brand) => (
                  <li key={brand} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-fg">
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          Emin değilseniz yazıcınızın kılavuzunda “TSPL” ifadesini arayın ya da model adıyla bize yazın.
        </p>
      </section>

      <section className="mt-12">
        <SectionTitle>Kurulum</SectionTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {downloads.map((item) => (
            <div key={item.platform} className="rounded-lg border border-border bg-surface p-4">
              <h3 className="text-sm font-medium text-fg">{item.label}</h3>
              <ol className="mt-3 space-y-2">
                {item.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-fg">
                    <span className="font-mono text-xs leading-6 text-subtle">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          Kurulum yapmadan kullanmak isterseniz:{' '}
          <a
            href={portableDownload.url}
            className="text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
          >
            {portableDownload.label}
          </a>
          . {byk.offlineNote}
        </p>
      </section>

      <section className="mt-12">
        <SectionTitle>Sık sorulanlar</SectionTitle>
        <div className="mt-2 border-t border-border">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} id={faq.id} index={`0${index + 1}`} title={faq.question}>
              <p className="max-w-2xl text-sm leading-6 text-muted">{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <SectionTitle>İletişim ve destek</SectionTitle>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Yazıcı uyumu, kurulum ya da baskı ayarı için yazın.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href={`mailto:${byk.email}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm text-fg hover:bg-hover"
          >
            <Mail size={15} aria-hidden />
            {byk.email}
          </a>
          <a
            href={byk.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm text-fg hover:bg-hover"
          >
            <MessageCircle size={15} aria-hidden />
            WhatsApp {byk.whatsapp.label}
          </a>
        </div>
      </section>
    </div>
  );
};

export default BykPage;
