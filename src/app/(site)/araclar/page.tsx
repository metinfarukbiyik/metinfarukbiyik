import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/tools/ToolCard';
import { Badge, PageHeader, Section } from '@/components/ui';
import { toolCategories, tools } from '@/data/tools';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.tools);

export default function ToolsPage() {
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'Araçlar', href: '/araclar' }]}
        kicker="araçlar"
        title="İşini kolaylaştıran küçük araçlar."
        description="Kurulum, hesap veya ücret yok. Doğrudan tarayıcında çalışan; fotoğraf, baskı ve ağ için pratik yardımcılar."
        meta={
          <>
            <Badge tone="accent" dot>
              {tools.length} araç · ücretsiz
            </Badge>
            <Badge>Reklamsız</Badge>
            <Badge>Hesap gerektirmez</Badge>
          </>
        }
      />
      {toolCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          kicker={category.name.toLocaleLowerCase('tr')}
          index={String(index + 1).padStart(2, '0')}
          title={category.name}
          description={category.description}
          line
          tight={index > 0}
          className={index === 0 ? 'section-first' : undefined}
        >
          <div className="tool-grid tool-grid-2">
            {tools
              .filter((tool) => tool.category === category.id)
              .map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
          </div>
        </Section>
      ))}
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
