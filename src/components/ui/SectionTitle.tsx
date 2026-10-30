import {
  AppWindow, CircleHelp, Download, FileSpreadsheet, Image, Layers3,
  LayoutGrid, Mail, Palette, Printer, ShieldCheck, Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

const icons = {
  projects: LayoutGrid,
  features: Layers3,
  steps: Workflow,
  install: Download,
  images: Image,
  privacy: ShieldCheck,
  contact: Mail,
  faq: CircleHelp,
  excel: FileSpreadsheet,
  printer: Printer,
  style: Palette,
  app: AppWindow,
} satisfies Record<string, LucideIcon>;

export default function SectionTitle({
  children,
  icon = 'features',
  className = '',
}: {
  children: ReactNode;
  icon?: keyof typeof icons;
  className?: string;
}) {
  const Icon = icons[icon] || Layers3;
  return (
    <h2 className={`section-title ${className}`}>
      <span className="heading-icon" aria-hidden="true">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span>{children}</span>
    </h2>
  );
}
