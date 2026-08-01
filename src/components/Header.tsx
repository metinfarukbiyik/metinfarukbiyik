import React from 'react';
import { personalInfo, experiences } from '../data/cvData';
import myPhoto from '../assets/images/my.png';
import { Mail, Linkedin, Instagram, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const currentRole = experiences[experiences.length - 1];

const actions: { icon: LucideIcon; label: string; href: string; external?: boolean }[] = [
  { icon: Mail, label: 'E-Posta', href: `mailto:${personalInfo.email}` },
  { icon: Phone, label: 'Ara', href: `tel:${personalInfo.phone.replace(/[^\d+]/g, '')}` },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin, external: true },
  { icon: Instagram, label: 'Instagram', href: personalInfo.instagram, external: true },
];

const Header: React.FC = () => (
  <section className="rounded-[14px] bg-card p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
    <img
      src={myPhoto}
      alt={personalInfo.name}
      className="mx-auto h-28 w-28 rounded-full object-cover shadow-md ring-4 ring-accent/10"
    />
    <h2 className="mt-4 text-[22px] font-bold tracking-tight">{personalInfo.name}</h2>
    <p className="mt-0.5 text-[14px] text-label-secondary">
      {currentRole.role} · {currentRole.company}
    </p>

    <div className="mt-5 grid grid-cols-4 gap-2">
      {actions.map(({ icon: Icon, label, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex flex-col items-center gap-1.5 rounded-[12px] bg-fill py-2.5 text-accent transition-transform active:scale-95 hover:bg-accent/10"
        >
          <Icon size={19} strokeWidth={2.2} />
          <span className="text-[11px] font-medium">{label}</span>
        </a>
      ))}
    </div>
  </section>
);

export default Header;
