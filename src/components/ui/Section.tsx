import React from 'react';

interface SectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, actions, children }) => (
  <section className="mt-10">
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-mono text-xs tracking-wide text-muted">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions}
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

export default Section;
