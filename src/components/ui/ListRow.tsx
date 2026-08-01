import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  color?: string;
  size?: 'sm' | 'md';
}

export const IconBadge: React.FC<IconBadgeProps> = ({ icon: Icon, color = 'bg-accent', size = 'md' }) => (
  <span
    className={`${color} ${
      size === 'sm' ? 'w-7 h-7 rounded-[7px]' : 'w-9 h-9 rounded-[9px]'
    } flex items-center justify-center shrink-0 shadow-sm`}
  >
    <Icon size={size === 'sm' ? 15 : 19} className="text-white" strokeWidth={2.2} />
  </span>
);

export const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-label-secondary">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

interface ListRowProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  to?: string;
  external?: boolean;
  children?: React.ReactNode;
}

const ListRow: React.FC<ListRowProps> = ({
  icon,
  iconColor,
  title,
  subtitle,
  trailing,
  href,
  to,
  external,
  children,
}) => {
  const isLink = Boolean(href || to);
  const content = (
    <>
      {icon && <IconBadge icon={icon} color={iconColor} />}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-label">{title}</p>
            {subtitle && <p className="mt-0.5 text-[13px] leading-snug text-label-secondary">{subtitle}</p>}
          </div>
          {trailing && <div className="shrink-0 text-right">{trailing}</div>}
        </div>
        {children && <div className="mt-2.5">{children}</div>}
      </div>
      {isLink && <ChevronRight size={18} className="mt-1 shrink-0 text-label-tertiary" />}
    </>
  );

  const className =
    'flex gap-3 px-4 py-3.5 border-t border-separator first:border-t-0 transition-colors' +
    (isLink ? ' active:bg-fill hover:bg-fill/70 cursor-pointer' : '');

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

export default ListRow;
