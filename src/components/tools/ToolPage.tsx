import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import { Badge, Faq, PageHeader, Section, TextLink, type FaqItem } from '@/components/ui';
import { getTool, tools } from '@/data/tools';
import { toolSchema, type SeoEntry } from '@/lib/seo';
import ToolCard from './ToolCard';

/** Shared scaffold for every tool: header, the tool itself, guidance, FAQ and siblings. */
export default function ToolPage({
  slug,
  seo,
  title,
  description,
  faq,
  children,
  guide,
}: {
  slug: string;
  seo: SeoEntry;
  title: string;
  description: string;
  faq: FaqItem[];
  children: ReactNode;
  guide?: ReactNode;
}) {
  const tool = getTool(slug);
  const siblings = tools.filter((item) => item.slug !== slug);
  return (
    <div className="container">
      <PageHeader
        crumbs={[
          { name: 'Araçlar', href: '/araclar' },
          { name: tool.name, href: tool.href },
        ]}
        kicker={`araçlar / ${tool.short.toLocaleLowerCase('tr')}`}
        title={title}
        description={description}
        meta={
          <>
            <Badge tone="accent" dot>
              Ücretsiz
            </Badge>
            <Badge>Kurulum yok</Badge>
            {tool.tags.map((tag) => (
              <Badge key={tag} outline>
                {tag}
              </Badge>
            ))}
          </>
        }
      />
      <div className="tool-stage">{children}</div>
      {guide}
      <Section id="sss" kicker="sık sorulanlar" title="Merak edilenler" tight>
        <Faq items={faq} />
      </Section>
      <Section
        id="diger-araclar"
        kicker="diğer araçlar"
        title="Bunlar da işine yarayabilir"
        action={
          <TextLink href="/araclar" arrow>
            Tüm araçlar
          </TextLink>
        }
        tight
      >
        <div className="tool-grid tool-grid-2">
          {siblings.map((item) => (
            <ToolCard key={item.slug} tool={item} />
          ))}
        </div>
      </Section>
      <JsonLd data={toolSchema(tool, seo)} />
    </div>
  );
}
