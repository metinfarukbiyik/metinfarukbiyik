import type { ReactNode } from 'react';
import type { Crumb } from '@/lib/seo';
import { cx } from './cx';
import Breadcrumbs from './Breadcrumbs';

/**
 * İç sayfaların başı (sungur.dev kalıbı): kenarlara hafifçe taşan açık gri bir
 * kutu; küçük harfli başlık, yanında mono bir sayaç ve sağda küçük eylemler,
 * altında gri bir açıklama satırı.
 */
export default function PageHeader({
  crumbs,
  title,
  count,
  description,
  actions,
  meta,
  leading,
  keepCase,
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
  /** Özel adlar (ör. proje adı) küçük harfe çevrilmesin. */
  keepCase?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={cx('page-header', keepCase && 'page-header-keepcase')}>
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
