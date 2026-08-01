import React from 'react';
import PageShell from './ui/PageShell';
import GroupedSection from './ui/GroupedSection';
import ListRow, { Bullets } from './ui/ListRow';
import { geocam, appInfo, featureGroups, privacyPoints, permissions } from '../data/geocamData';
import {
  Camera,
  Stamp,
  Layers,
  Building2,
  ShieldCheck,
  MapPin,
  Mic,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Camera,
  Stamp,
  Layers,
  Building2,
  MapPin,
  Mic,
  Image: ImageIcon,
};

const GeoCamPage: React.FC = () => (
  <PageShell title="GeoCam: Audit" subtitle={geocam.tagline} backTo="/projeler" backLabel="Projeler">
    <section className="rounded-[14px] bg-card p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-accent to-ios-indigo shadow-lg">
        <Camera size={38} className="text-white" strokeWidth={1.8} />
      </div>
      <h2 className="mt-4 text-[22px] font-bold tracking-tight">{geocam.name}</h2>
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ios-orange/10 px-3 py-1 text-[12px] font-semibold text-ios-orange">
        <span className="h-1.5 w-1.5 rounded-full bg-ios-orange" />
        {geocam.status}
      </span>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {geocam.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-fill px-3 py-1 text-[12px] font-medium text-label-secondary"
          >
            {badge}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[14.5px] leading-relaxed text-label-secondary">{geocam.description}</p>
    </section>

    <GroupedSection title="Neler Yapabilirsiniz">
      {featureGroups.map((group) => (
        <ListRow
          key={group.title}
          icon={icons[group.icon] ?? Camera}
          iconColor={group.color}
          title={group.title}
        >
          <Bullets items={group.items} />
        </ListRow>
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

    <GroupedSection title="Bilgi">
      {appInfo.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 border-t border-separator px-4 py-3 first:border-t-0"
        >
          <span className="text-[15px] text-label">{label}</span>
          <span className="text-right text-[13.5px] font-medium text-label-secondary">{value}</span>
        </div>
      ))}
    </GroupedSection>

    <GroupedSection title="Gerekli İzinler" footer="İzinler yalnızca ilgili özellik kullanıldığında istenir.">
      {permissions.map(({ icon, label, note }) => (
        <ListRow
          key={label}
          icon={icons[icon] ?? Camera}
          iconColor="bg-ios-gray"
          title={label}
          subtitle={note}
        />
      ))}
    </GroupedSection>
  </PageShell>
);

export default GeoCamPage;
