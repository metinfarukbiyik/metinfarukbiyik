import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import myPhoto from '@/assets/images/my.png';
import { personalInfo } from '@/data/cvData';
import { ayet } from '@/data/ayetData';
import { byk } from '@/data/bykData';
import { geocam } from '@/data/geocamData';
import { ArrowUpRight, Download, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description: "Metin Faruk Bıyık'ın kişisel sitesi: öne çıkan projeler ve kısa tanıtım.",
  keywords: ['Metin Faruk Bıyık', 'biyik.dev', 'projeler', 'Trabzon'],
  alternates: { canonical: '/' },
};

const featured = [
  {
    href: '/geocam',
    name: geocam.name,
    meta: 'iOS · App Store',
    summary: 'Konum doğrulamalı saha kamerası. Fotoğrafa GPS, adres ve pusula damgalar.',
  },
  {
    href: '/1-ayet',
    name: ayet.name,
    meta: 'iOS · Android · Yakında',
    summary: 'Her güne bir ayet. Diyanet meali ve kısa bir tefekkür.',
  },
  {
    href: '/byk-seri-baski-pro',
    name: byk.name,
    meta: 'Windows · macOS',
    summary: 'Excel’deki barkod listesini termal etikete basar. Kurulumdan sonra çevrimdışı çalışır.',
  },
];

const HomePage = () => (
  <div className="animate-fade-up">
    <section className="flex flex-col gap-8 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs tracking-wide text-subtle">Trabzon</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          {personalInfo.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          Saha operasyonları, müşteri deneyimi ve yazılım. iOS, web ve masaüstü araçları
          geliştiriyorum.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link
            href="/hakkimda"
            className="inline-flex items-center rounded-md bg-fg px-3.5 py-2 text-sm text-canvas hover:opacity-90"
          >
            Hakkımda
          </Link>
          <a
            href="/cv/metinfarukbiyik-cv.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:bg-hover"
          >
            <Download size={14} />
            Özgeçmiş
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:bg-hover"
          >
            <Mail size={14} />
            {personalInfo.email}
          </a>
        </div>
      </div>
      <Image
        src={myPhoto}
        alt={personalInfo.name}
        priority
        placeholder="blur"
        className="h-28 w-28 shrink-0 rounded-md object-cover ring-1 ring-border sm:h-32 sm:w-32"
      />
    </section>

    <section className="mt-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-xs tracking-wide text-muted">Projeler</h2>
        <Link href="/projeler" className="font-mono text-xs text-subtle hover:text-fg">
          tümü →
        </Link>
      </div>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {featured.map((project, index) => (
          <li key={project.href}>
            <Link
              href={project.href}
              className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-hover sm:gap-6"
            >
              <span className="font-mono text-xs text-subtle">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-fg">{project.name}</span>
                <span className="mt-0.5 block text-sm text-muted">{project.summary}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-[11px] text-subtle sm:block">
                {project.meta}
              </span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default HomePage;
