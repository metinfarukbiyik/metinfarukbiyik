import {
  Award, BriefcaseBusiness, ChevronDown, CircleHelp, ContactRound,
  GraduationCap, Monitor, Sparkles, UserRound,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface AccordionItemProps {
  id: string;
  index: string;
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

const profileIcons = {
  profil: UserRound,
  iletisim: ContactRound,
  deneyim: BriefcaseBusiness,
  egitim: GraduationCap,
  sertifikalar: Award,
  ekipmanlar: Monitor,
  'ek-bilgiler': Sparkles,
};

const AccordionItem = ({ id, index, title, count, defaultOpen, children }: AccordionItemProps) => {
  const isProfile = id in profileIcons;
  const Icon = profileIcons[id as keyof typeof profileIcons] || CircleHelp;
  const Heading = isProfile ? 'h2' : 'h3';
  return (
    <details id={id} open={defaultOpen} className="group scroll-mt-6">
      <summary className="flex cursor-pointer items-center justify-between gap-3 py-2.5 select-none [&::-webkit-details-marker]:hidden">
        <Heading className="accordion-title flex w-full items-center gap-2.5">
          <span className="heading-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.75} /></span>
          <span className="sr-only">{index}. </span>
          <span>{title}</span>
          {count != null && <span className="accordion-count">{count}<span className="sr-only"> kayıt</span></span>}
          <ChevronDown size={16} className="ml-auto shrink-0 text-brand-600 transition-transform group-open:rotate-180" aria-hidden="true" />
        </Heading>
      </summary>
      <div className="accordion-body">{children}</div>
    </details>
  );
};

export default AccordionItem;
