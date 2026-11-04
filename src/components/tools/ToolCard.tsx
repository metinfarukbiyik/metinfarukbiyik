import Link from 'next/link';
import { ArrowRight, Barcode, Gauge, Globe2, ImageOff, QrCode, ScanFace, ShieldCheck, Stethoscope } from 'lucide-react';
import type { ToolItem } from '@/data/tools';

const icons = { ScanFace, Gauge, Globe2, QrCode, Barcode, ShieldCheck, ImageOff, Stethoscope };

/** Compact, single-row tool entry: icon, name, two-line summary, path. */
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
    <article className="tool-card">
      <span className="tool-card-icon" aria-hidden="true">
        <Icon strokeWidth={1.6} />
      </span>
      <div className="tool-card-copy">
        <Heading className="title-4">
          <Link href={tool.href} className="card-link">
            {tool.name}
          </Link>
        </Heading>
        <p>{tool.description}</p>
        <span className="tool-card-meta mono">{tool.tags.join(' · ')}</span>
      </div>
      <ArrowRight className="tool-card-arrow" aria-hidden="true" />
    </article>
  );
}
