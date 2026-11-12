import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, type Crumb } from '@/lib/seo';

/**
 * Sayfa yolu yalnızca yapısal veride (BreadcrumbList) durur; sungur.dev
 * kalıbında görünür bir iz yoktur, gezinmeyi Dinamik Ada taşır.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <JsonLd data={breadcrumbSchema([{ name: 'Ana sayfa', href: '/' }, ...items])} />;
}
