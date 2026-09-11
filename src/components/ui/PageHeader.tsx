import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, actions }) => (
  <div className="border-b border-gray-200 pb-8 md:flex md:items-end md:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="text-sm font-semibold text-brand-600">{eyebrow}</p>}
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 text-base leading-7 text-gray-600">{description}</p>}
    </div>
    {actions && <div className="mt-5 flex shrink-0 items-center gap-3 md:mt-0">{actions}</div>}
  </div>
);

export default PageHeader;
