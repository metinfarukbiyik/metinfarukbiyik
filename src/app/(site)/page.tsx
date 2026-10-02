import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import myPhoto from '@/assets/images/mefa.png';
import { personalInfo } from '@/data/cvData';
import { ayet } from '@/data/ayetData';
import { byk } from '@/data/bykData';
import { geocam } from '@/data/geocamData';
import { ArrowUpRight, Download, Linkedin, Mail } from 'lucide-react';

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
    icon: geocam.icon,
    meta: 'iOS · App Store',
    summary: 'Konum doğrulamalı saha kamerası. Fotoğrafa GPS, adres ve pusula damgalar.',
  },
  {
    href: '/1-ayet',
    name: ayet.name,
    icon: ayet.icon,
    meta: 'iOS · Android · Yakında',
    summary: 'Her güne bir ayet. Diyanet meali ve kısa bir tefekkür.',
  },
  {
    href: '/byk-seri-baski-pro',
    name: byk.name,
    icon: byk.icon,
    meta: 'Windows · macOS',
    summary: 'Excel’deki barkod listesini termal etikete basar. Kurulumdan sonra çevrimdışı çalışır.',
  },
];

const HomePage = () => (
  <div className="animate-fade-up">
    <section className="relative border-b border-border pb-10">
      <div className="absolute top-0 right-0 size-24 overflow-hidden rounded-lg sm:size-32">
        <Image
          src={myPhoto}
          alt={personalInfo.name}
          priority
          placeholder="blur"
          fill
          sizes="(min-width: 640px) 128px, 96px"
          className="object-cover object-center"
        />
      </div>
      <div className="pr-28 sm:pr-40">
        <h1 className="flex items-center gap-2.5 text-[1.65rem] font-semibold leading-none tracking-tight text-fg sm:text-[2rem]">
          {personalInfo.name}
          <span className="group/status inline-flex translate-y-[0.11em] items-center">
            <span
              tabIndex={0}
              role="img"
              aria-label="open to work"
              className="status-dot inline-block size-2.5 shrink-0 rounded-full bg-emerald-500 outline-none"
            />
            <span className="grid grid-cols-[0fr] items-center opacity-0 transition-[grid-template-columns,opacity] duration-300 ease-out group-hover/status:grid-cols-[1fr] group-hover/status:opacity-100 group-focus-within/status:grid-cols-[1fr] group-focus-within/status:opacity-100">
              <span className="overflow-hidden">
                <span className="block pl-2 font-geist text-[15px] font-thin leading-none whitespace-nowrap text-emerald-500">
                  open to work
                </span>
              </span>
            </span>
          </span>
        </h1>
        <p className="mt-2 text-[17px] leading-none text-muted">@metinbiyik</p>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
          Saha operasyonları, müşteri deneyimi ve yazılım. iOS, web ve masaüstü araçları
          geliştiriyorum.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href="/cv/metinfarukbiyik-cv.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:bg-hover"
          >
            <Download size={14} />
            Özgeçmiş.pdf
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:bg-hover"
          >
            <Mail size={14} />
            E-posta gönder
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface p-2.5 text-fg hover:bg-hover"
          >
            <Linkedin size={16} aria-hidden />
          </a>
        </div>
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
              className="group flex items-center gap-5 py-4"
            >
              <Image
                src={project.icon}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-md"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-fg">{project.name}</span>
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-muted">{project.summary}</span>
              </span>
              <span className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className="font-mono text-[11px] text-subtle">{project.meta}</span>
                <ArrowUpRight
                  size={14}
                  className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default HomePage;
