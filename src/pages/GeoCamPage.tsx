import React from 'react';
import { Link } from 'react-router-dom';
import ScreenshotGallery from '../components/ScreenshotGallery';
import Section from '../components/ui/Section';
import {
  geocam,
  appInfo,
  featureGroups,
  useCases,
  privacyPoints,
  releaseNotes,
} from '../data/geocamData';
import useAppStoreStats from '../hooks/useAppStoreStats';
import {
  ArrowLeft,
  Building2,
  Check,
  ExternalLink,
  Layers,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = { Layers, Building2, MapPin };

const formatRating = (value: number) => value.toFixed(1).replace('.', ',');

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-hidden>
    {Array.from({ length: 5 }, (_, i) => {
      const fill = Math.min(1, Math.max(0, rating - i));
      return (
        <span key={i} className="relative inline-block h-4 w-4">
          <Star size={16} className="text-white/25" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <Star size={16} className="fill-amber-400 text-amber-400" />
          </span>
        </span>
      );
    })}
  </div>
);

const GeoCamPage: React.FC = () => {
  const { rating, ratingCount, version } = useAppStoreStats();

  return (
    <div className="animate-fade-up">
      <Link
        to="/projeler"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Projeler
      </Link>

      <section className="mt-5 overflow-hidden rounded-3xl bg-gray-900">
        <div className="relative px-6 py-10 sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(55,107,251,0.35),transparent_55%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <img
              src={geocam.icon}
              alt={`${geocam.name} uygulama ikonu`}
              className="h-24 w-24 shrink-0 rounded-3xl ring-1 ring-white/15"
              draggable={false}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-brand-400">iOS uygulaması</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {geocam.name}
              </h1>
              <p className="mt-2 text-base text-gray-300">{geocam.slogan}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <Stars rating={rating} />
                  <span className="text-sm font-semibold text-white">{formatRating(rating)}</span>
                  <span className="text-sm text-gray-400">({ratingCount} puan)</span>
                </div>
                {geocam.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-gray-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={geocam.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              App Store’dan indir
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <Section title="Hakkında">
        <p className="text-base leading-7 text-gray-600">{geocam.description}</p>
      </Section>

      <ScreenshotGallery />

      <Section title="Öne çıkanlar">
        <div className="grid gap-4 md:grid-cols-3">
          {featureGroups.map((group) => {
            const Icon = icons[group.icon] ?? MapPin;
            return (
              <div key={group.title} className="rounded-2xl bg-white p-5 ring-1 ring-gray-900/5">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${group.color}`}>
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

      <Section title="Kullanım alanları">
        <div className="flex flex-wrap gap-2">
          {useCases.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Gizlilik">
        <div className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-600/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-emerald-600" />
            <p className="text-sm font-semibold text-emerald-900">{geocam.privacy}</p>
          </div>
          <ul className="mt-4 space-y-2">
            {privacyPoints.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-6 text-emerald-900/80">
                <Check size={14} className="mt-1.5 shrink-0 text-emerald-600" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-900/5">
          <h2 className="text-sm font-semibold text-gray-900">Yenilikler · Sürüm {version}</h2>
          <ul className="mt-4 space-y-2">
            {releaseNotes.map((note) => (
              <li key={note} className="flex gap-2.5 text-sm leading-6 text-gray-600">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-900/5">
          <h2 className="text-sm font-semibold text-gray-900">Bilgi</h2>
          <dl className="mt-4 divide-y divide-gray-100">
            {appInfo.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <dt className="text-gray-600">{label}</dt>
                <dd className="text-right font-medium text-gray-900">
                  {label === 'Sürüm' ? version : value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default GeoCamPage;
