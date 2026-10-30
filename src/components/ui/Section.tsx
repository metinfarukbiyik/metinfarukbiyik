import React from 'react';
import SectionTitle from './SectionTitle';

interface SectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, actions, children }) => (
  <section className="project-detail-section">
    <div className="flex items-end justify-between gap-4">
      <div>
        <SectionTitle>{title}</SectionTitle>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions}
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

export default Section;
