import React from 'react';
import PageShell from './ui/PageShell';
import GroupedSection from './ui/GroupedSection';
import ListRow, { Bullets } from './ui/ListRow';
import {
  geocam,
  appInfo,
  featureGroups,
  useCases,
  privacyPoints,
  releaseNotes,
} from '../data/geocamData';
import useAppStoreStats from '../hooks/useAppStoreStats';
import ScreenshotCarousel from './ui/ScreenshotCarousel';
import { Layers, Building2, ShieldCheck, MapPin, Star, Check, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Layers,
  Building2,
  MapPin,
};

const formatRating = (value: number) => value.toFixed(1).replace('.', ',');

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-hidden>
    {Array.from({ length: 5 }, (_, i) => {
      const fill = Math.min(1, Math.max(0, rating - i));
      return (
        <span key={i} className="relative inline-block h-[18px] w-[18px]">
          <Star size={18} className="text-white/25" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <Star size={18} className="fill-[#ffd60a] text-[#ffd60a]" />
          </span>
        </span>
      );
    })}
  </div>
);

const GeoCamPage: React.FC = () => {
  const { rating, ratingCount, version } = useAppStoreStats();

  return (
    <PageShell title="GeoCam: Audit" subtitle={geocam.tagline} backTo="/projeler" backLabel="Projeler">
      <section className="relative overflow-hidden rounded-[22px] bg-[#071427] p-6 text-white shadow-[0_20px_50px_rgba(7,20,39,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(55,107,251,0.45),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(48,176,199,0.18),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative">
          <div className="flex items-start gap-4">
            <img
              src={geocam.icon}
              alt={`${geocam.name} uygulama ikonu`}
              className="h-[88px] w-[88px] shrink-0 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/20"
              draggable={false}
            />
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">iOS Uygulaması</p>
              <h2 className="mt-1 text-[26px] font-bold leading-tight tracking-tight">{geocam.name}</h2>
              <p className="mt-1 text-[14px] text-white/70">{geocam.slogan}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-[14px] bg-white/10 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="text-[22px] font-bold leading-none">{formatRating(rating)}</p>
              <div className="mt-2 flex justify-center">
                <Stars rating={rating} />
              </div>
              <p className="mt-2 text-[11px] text-white/55">{ratingCount} puan</p>
            </div>
            <div className="rounded-[14px] bg-white/10 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="text-[22px] font-bold leading-none">{version}</p>
              <p className="mt-2 text-[12px] font-medium text-white/80">Sürüm</p>
              <p className="mt-2 text-[11px] text-white/55">App Store</p>
            </div>
            <div className="rounded-[14px] bg-white/10 px-3 py-3 text-center ring-1 ring-white/10">
              <p className="text-[22px] font-bold leading-none">4+</p>
              <p className="mt-2 text-[12px] font-medium text-white/80">Yaş</p>
              <p className="mt-2 text-[11px] text-white/55">Ücretsiz</p>
            </div>
          </div>

          <a
            href={geocam.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-[15px] font-semibold text-[#071427] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform active:scale-[0.98]"
          >
            App Store’dan İndir
            <ExternalLink size={16} strokeWidth={2.4} />
          </a>
        </div>
      </section>

      <ScreenshotCarousel />

      <GroupedSection title="Hakkında">
        <p className="px-4 py-4 text-[14.5px] leading-relaxed text-label-secondary">{geocam.description}</p>
      </GroupedSection>

      <GroupedSection title="Öne Çıkanlar">
        {featureGroups.map((group) => (
          <ListRow
            key={group.title}
            icon={icons[group.icon] ?? MapPin}
            iconColor={group.color}
            title={group.title}
          >
            <Bullets items={group.items} />
          </ListRow>
        ))}
      </GroupedSection>

      <GroupedSection title="Kullanım Alanları">
        {useCases.map((item) => (
          <div key={item} className="flex items-center gap-3 border-t border-separator px-4 py-3 first:border-t-0">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <Check size={13} className="text-accent" strokeWidth={3} />
            </span>
            <span className="text-[14.5px] text-label">{item}</span>
          </div>
        ))}
      </GroupedSection>

      <section>
        <h2 className="px-4 pb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-label-tertiary">
          Gizlilik
        </h2>
        <div className="rounded-[14px] bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-ios-green" />
            <p className="text-[15px] font-semibold">{geocam.privacy}</p>
          </div>
          <ul className="mt-3.5 space-y-2">
            {privacyPoints.map((point) => (
              <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-label-secondary">
                <Check size={14} className="mt-1 shrink-0 text-ios-green" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GroupedSection title={`Yenilikler · Sürüm ${version}`}>
        {releaseNotes.map((note) => (
          <div key={note} className="flex items-start gap-3 border-t border-separator px-4 py-3 first:border-t-0">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
            <span className="text-[14.5px] text-label">{note}</span>
          </div>
        ))}
      </GroupedSection>

      <GroupedSection title="Bilgi">
        {appInfo.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 border-t border-separator px-4 py-3 first:border-t-0"
          >
            <span className="text-[15px] text-label">{label}</span>
            <span className="text-right text-[13.5px] font-medium text-label-secondary">
              {label === 'Sürüm' ? version : value}
            </span>
          </div>
        ))}
      </GroupedSection>
    </PageShell>
  );
};

export default GeoCamPage;
