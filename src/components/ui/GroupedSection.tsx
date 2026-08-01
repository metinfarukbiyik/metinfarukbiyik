import React from 'react';

interface GroupedSectionProps {
  title?: string;
  footer?: string;
  children: React.ReactNode;
}

const GroupedSection: React.FC<GroupedSectionProps> = ({ title, footer, children }) => (
  <section>
    {title && (
      <h2 className="px-4 pb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-label-tertiary">
        {title}
      </h2>
    )}
    <div className="overflow-hidden rounded-[14px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
      {children}
    </div>
    {footer && <p className="px-4 pt-2 text-[12px] leading-relaxed text-label-tertiary">{footer}</p>}
  </section>
);

export default GroupedSection;
