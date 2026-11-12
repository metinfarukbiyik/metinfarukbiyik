import type { ReactNode } from 'react';
import type { Crumb } from '@/lib/seo';
import Breadcrumbs from './Breadcrumbs';

/**
 * İç sayfaların başı: sütunla aynı hizada, ince çerçeveli açık gri kutu.
 * Başlık, yanında küçük bir sayaç etiketi ve sağda eylemler; altında açıklama,
 * ince bir ayraçla ayrılmış etiketler ve (varsa) ek içerik.
 */
export default function PageHeader({
  crumbs,
  title,
  count,
  description,
  actions,
  meta,
  leading,
  children,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  /** Başlığın yanında duran mono sayaç, ör. "07 pozisyon". */
  count?: ReactNode;
  description?: ReactNode;
  /** Sağ üstte küçük eylemler (ör. özgeçmiş indir). */
  actions?: ReactNode;
  /** Açıklamanın altında mono, nokta ile ayrılmış etiketler. */
  meta?: ReactNode;
  /** Başlığın solunda küçük bir ikon (ör. proje logosu). */
  leading?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-header">
      <Breadcrumbs items={crumbs} />
      <div className="page-header-title">
        {leading}
        <h1>{title}</h1>
        {count && <span className="page-header-count">{count}</span>}
        {actions && <span className="page-header-actions">{actions}</span>}
      </div>
      {description && <p className="page-header-lead">{description}</p>}
      {meta && <div className="page-header-meta">{meta}</div>}
      {children}
    </header>
  );
}
