import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, type Crumb } from '@/lib/seo';

/** Visible trail plus matching BreadcrumbList structured data. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: 'Ana sayfa', href: '/' }, ...items];
  return (
    <nav className="breadcrumbs" aria-label="Sayfa yolu">
      <ol>
        {trail.map((crumb, index) => (
          <li key={crumb.href}>
            {index === trail.length - 1 ? (
              <span aria-current="page">{crumb.name}</span>
            ) : (
              <Link href={crumb.href}>{index === 0 ? '~' : crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  );
}
