import Link from 'next/link';
import { ArrowRight, Gauge, Globe2, ScanFace } from 'lucide-react';
import type { ToolItem } from '@/data/tools';
import { Badge } from '@/components/ui';

const icons = { ScanFace, Gauge, Globe2 };

export default function ToolCard({
  tool,
  headingLevel = 'h3',
}: {
  tool: ToolItem;
  headingLevel?: 'h2' | 'h3';
}) {
  const Icon = icons[tool.icon];
  const Heading = headingLevel;
  return (
    <article className="card card-interactive tool-card">
      <div className="tool-card-top">
        <span className="icon-tile" aria-hidden="true">
          <Icon strokeWidth={1.6} />
        </span>
        <Badge tone="accent" dot>
          Ücretsiz
        </Badge>
      </div>
      <Heading className="title-3">
        <Link href={tool.href} className="card-link">
          {tool.name}
        </Link>
      </Heading>
      <p className="text-small">{tool.description}</p>
      <div className="tool-card-tags">
        {tool.tags.map((tag) => (
          <Badge key={tag} outline>
            {tag}
          </Badge>
        ))}
      </div>
      <span className="tool-card-path mono" aria-hidden="true">
        {tool.href}
        <ArrowRight />
      </span>
    </article>
  );
}
