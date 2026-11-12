import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/tools/ToolCard';
import { Badge, PageHeader } from '@/components/ui';
import { toolCategories, tools } from '@/data/tools';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.tools);

export default function ToolsPage() {
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'Araçlar', href: '/araclar' }]}
        title="Araçlar"
        count={`${String(tools.length).padStart(2, '0')} araç`}
        description="Kurulum, hesap veya ücret yok. Doğrudan tarayıcında çalışan; fotoğraf, paylaşım ve ağ için pratik yardımcılar."
        meta={
          <>
            <Badge>ücretsiz</Badge>
            <Badge>reklamsız</Badge>
            <Badge>hesap gerektirmez</Badge>
          </>
        }
      />
      <div className="tool-groups">
        {toolCategories.map((category) => {
          const items = tools.filter((tool) => tool.category === category.id);
          return (
            <section key={category.id} id={category.id} className="tool-group" aria-labelledby={`${category.id}-baslik`}>
              <header className="tool-group-header">
                <h2 id={`${category.id}-baslik`} className="tool-group-title">
                  {category.name}
                </h2>
                <p>{category.description}</p>
              </header>
              <div className="tool-grid">
                {items.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Ücretsiz online araçlar',
          url: `${site.url}/araclar`,
          inLanguage: 'tr',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: tools.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.name,
              url: `${site.url}${tool.href}`,
            })),
          },
        }}
      />
    </div>
  );
}
