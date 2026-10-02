import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, actions }) => (
  <div className="border-b border-border pb-6 md:flex md:items-end md:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="font-mono text-xs tracking-wide text-muted">{eyebrow}</p>}
      <h1 className={`${eyebrow ? 'mt-2' : ''} text-3xl font-medium tracking-tight text-fg`}>{title}</h1>
      {description && <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p>}
    </div>
    {actions && <div className="mt-4 flex shrink-0 items-center gap-3 md:mt-0">{actions}</div>}
  </div>
);

export default PageHeader;
