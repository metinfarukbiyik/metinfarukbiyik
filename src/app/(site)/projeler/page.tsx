import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import { ayet } from '@/data/ayetData';
import { byk } from '@/data/bykData';
import { projects } from '@/data/cvData';
import { geocam } from '@/data/geocamData';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    "Metin Faruk Bıyık'ın geliştirdiği mobil uygulama, masaüstü programı ve web siteleri.",
  keywords: ['projeler', 'referanslar', 'biyik.dev', 'GeoCam Audit', 'BYK Seri Baskı Pro', '1 Ayet'],
  alternates: { canonical: '/projeler' },
};

const apps = [
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

const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const ProjectsPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      eyebrow="01 — portfolyo"
      title="Projeler"
      description="Mobil uygulama, masaüstü programı ve web siteleri."
    />

    <section className="mt-8">
      <h2 className="font-mono text-xs tracking-wide text-muted">Uygulamalar</h2>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {apps.map((project, index) => (
          <li key={project.href}>
            <Link
              href={project.href}
              className="group flex items-baseline gap-4 py-4 hover:bg-hover sm:gap-6"
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
              <ArrowUpRight size={14} className="shrink-0 text-subtle" />
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section className="mt-10">
      <h2 className="font-mono text-xs tracking-wide text-muted">Web siteleri</h2>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-4 py-4 hover:bg-hover sm:gap-6"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-fg">{project.name.toLowerCase()}</span>
                <span className="mt-0.5 block text-sm text-muted">{project.description}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-[11px] text-subtle sm:block">
                {hostOf(project.url)}
              </span>
              <ArrowUpRight size={14} className="shrink-0 text-subtle" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default ProjectsPage;
