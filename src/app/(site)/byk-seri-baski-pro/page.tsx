import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { byk, capabilities, downloads, excelColumns, features, printerNotes, usageSteps } from '@/data/bykData';
import { personalInfo } from '@/data/cvData';
import { site } from '@/lib/site';
import {
  ArrowLeft,
  Barcode,
  BookOpen,
  Check,
  Download,
  FileSpreadsheet,
  Info,
  Laptop,
  Mail,
  MessageCircle,
  Monitor,
  Printer,
  WifiOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const platformIcons: Record<string, LucideIcon> = { Monitor, Laptop };
const featureIcons: Record<string, LucideIcon> = { FileSpreadsheet, Barcode, Printer };

const whatsappUrl = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`;

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

      <Link
        href="/projeler"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Projeler
      </Link>

      <section className="mt-5 overflow-hidden rounded-3xl bg-gray-900">
        <div className="relative px-6 py-10 sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(55,107,251,0.35),transparent_55%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src={byk.icon}
              alt={`${byk.name} program ikonu`}
              width={96}
              height={96}
              className="h-24 w-24 shrink-0 rounded-3xl ring-1 ring-white/15"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-brand-400">{byk.tagline}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {byk.name}
              </h1>
              <p className="mt-2 text-base text-gray-300">{byk.slogan}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {byk.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-gray-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* İndirme bağlantıları her zaman en son sürümü verir. */}
          <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
            {downloads.map((item) => {
              const Icon = platformIcons[item.icon] ?? Monitor;
              return (
                <a
                  key={item.platform}
                  href={item.url}
                  className="group flex items-center gap-3 rounded-xl bg-white/10 p-4 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">
                      {item.platform} için indir
                    </span>
                    <span className="block truncate text-xs text-gray-400">{item.fileName}</span>
                  </span>
                  <Download
                    size={18}
                    className="shrink-0 text-gray-300 transition-transform group-hover:translate-y-0.5"
                  />
                </a>
              );
            })}
          </div>
          <p className="relative mt-3 text-xs text-gray-400">
            Bağlantılar her zaman en son sürümü indirir.
          </p>
        </div>
      </section>

      <Section title="Hakkında">
        <p className="text-base leading-7 text-gray-600">{byk.description}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {capabilities.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-700">
              <Check size={14} className="mt-1.5 shrink-0 text-brand-600" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Neler içerir?">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((group) => {
            const Icon = featureIcons[group.icon] ?? FileSpreadsheet;
            return (
              <div key={group.title} className="rounded-2xl bg-white p-5 ring-1 ring-gray-900/5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${group.color}`}
                >
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-600">
                      <Check size={14} className="mt-1.5 shrink-0 text-brand-600" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Kurulum" description="İndirdikten sonra birkaç adımda hazır.">
        <div className="grid gap-4 md:grid-cols-2">
          {downloads.map((item) => {
            const Icon = platformIcons[item.icon] ?? Monitor;
            return (
              <div
                key={item.platform}
                className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-gray-900/5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">{item.platform} kurulumu</h3>
                </div>

                <ol className="mt-5 space-y-3">
                  {item.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-gray-600">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <p className="mt-5 flex gap-2.5 rounded-xl bg-amber-50 p-3.5 text-xs leading-5 text-amber-900 ring-1 ring-inset ring-amber-600/10">
                  <Info size={14} className="mt-0.5 shrink-0 text-amber-600" />
                  {item.note}
                </p>

                <a
                  href={item.url}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  <Download size={16} />
                  {item.platform} kurulumunu indir
                </a>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Excel dosyası nasıl olmalı?" description="İlk satır başlık, sonraki satırlar etiket verisidir.">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-900/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Sütun
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Anlamı
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {excelColumns.map((row) => (
                <tr key={row.column}>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-800">
                      {row.column}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {row.meaning}
                    <span className="ml-2 text-xs text-gray-400">
                      {row.required ? '(zorunlu)' : '(isteğe bağlı)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-900/5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Printer size={16} className="text-gray-400" />
            Yazıcı
          </h2>
          <ul className="mt-4 space-y-2">
            {printerNotes.map((note) => (
              <li key={note} className="flex gap-2.5 text-sm leading-6 text-gray-600">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-900/5">
          <h2 className="text-sm font-semibold text-gray-900">Kısa kullanım</h2>
          <ol className="mt-4 space-y-2">
            {usageSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-gray-600">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-600/10 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5 text-sm font-medium text-emerald-900">
          <WifiOff size={18} className="shrink-0 text-emerald-600" />
          Kurulumdan sonra internet bağlantısı gerekmez.
        </p>
        <a
          href={byk.guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
        >
          <BookOpen size={16} />
          Kullanım kılavuzu
        </a>
      </div>

      <Section title="Destek" description="Kurulum veya yazıcı ayarlarında takılırsanız yazın.">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Mail size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-gray-900">E-posta</span>
              <span className="block truncate text-sm text-gray-600">{personalInfo.email}</span>
            </span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <MessageCircle size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-gray-900">WhatsApp</span>
              <span className="block truncate text-sm text-gray-600">{personalInfo.phone}</span>
            </span>
          </a>
        </div>
      </Section>
    </div>
  );
};

export default BykPage;
