import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, type Crumb } from '@/lib/seo';

/** Visible trail plus matching BreadcrumbList structured data. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: 'Ana sayfa', href: '/' }, ...items];
  return (
    <nav className="breadcrumbs" aria-label="Sayfa yolu">
      <ol>
        {/* Son halka sayfanın kendisi; başlıkta zaten yazdığı için gösterilmez (yapısal veride kalır). */}
        {trail.slice(0, -1).map((crumb) => (
          <li key={crumb.href}>
            <Link href={crumb.href}>{crumb.name}</Link>
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(trail)} />
    </nav>
  );
}
