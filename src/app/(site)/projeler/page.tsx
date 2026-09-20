import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { byk } from '@/data/bykData';
import { projects } from '@/data/cvData';
import { geocam } from '@/data/geocamData';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe,
  GraduationCap,
  Smartphone,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    "Metin Faruk Bıyık'ın geliştirdiği mobil uygulama, masaüstü programı ve web siteleri.",
  keywords: ['projeler', 'referanslar', 'biyik.dev', 'GeoCam Audit', 'BYK Seri Baskı Pro'],
  alternates: { canonical: '/projeler' },
};

const iconMap: Record<string, LucideIcon> = {
  Globe,
  GraduationCap,
  Building2,
  Smartphone,
};

const ProjectsPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      eyebrow="Portfolyo"
      title="Projeler"
      description="Tasarlayıp geliştirdiğim mobil uygulama, masaüstü programı ve web siteleri."
    />

    <Section title="Mobil uygulama">
      <Link
        href="/geocam"
        className="group flex flex-col gap-5 rounded-2xl bg-gray-900 p-6 sm:flex-row sm:items-center"
      >
        <Image
          src={geocam.icon}
          alt={`${geocam.name} uygulama ikonu`}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-2xl ring-1 ring-white/15"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{geocam.name}</h3>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {geocam.rating}
            </span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">iOS</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            App Store’da yayınlanan, konum doğrulamalı saha ve denetim kamerası.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Detayları gör
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Section>

    <Section title="Masaüstü uygulaması">
      <Link
        href="/byk-seri-baski-pro"
        className="group flex flex-col gap-5 rounded-2xl bg-gray-900 p-6 sm:flex-row sm:items-center"
      >
        <Image
          src={byk.icon}
          alt={`${byk.name} program ikonu`}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-2xl ring-1 ring-white/15"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{byk.name}</h3>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
              Windows
            </span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
              macOS
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            Excel’deki seri numarası ve barkod listesini termal etiket yazıcısına basan program.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Detayları gör
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Section>

    <Section title="Web siteleri" description="Bağlantılar yeni sekmede açılır.">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const Icon = iconMap[project.icon] ?? Globe;
          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 transition-colors group-hover:text-brand-600"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight text-gray-900">
                {project.name.toLowerCase()}
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">{project.description}</p>
            </a>
          );
        })}
      </div>
    </Section>
  </div>
);

export default ProjectsPage;
