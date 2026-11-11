import type { ReactNode } from 'react';
import type { Crumb } from '@/lib/seo';
import Breadcrumbs from './Breadcrumbs';
import Heading from './Heading';

/** The single top-of-page block used by every inner page. */
export default function PageHeader({
  crumbs,
  title,
  description,
  actions,
  meta,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="page-header rise">
      <Breadcrumbs items={crumbs} />
      <div className="page-header-grid">
        <div className="page-header-copy">
          <Heading as="h1">{title}</Heading>
          {description && <p className="lead">{description}</p>}
          {meta && <div className="page-header-meta">{meta}</div>}
        </div>
        {actions && <div className="page-header-actions">{actions}</div>}
      </div>
    </header>
  );
}
