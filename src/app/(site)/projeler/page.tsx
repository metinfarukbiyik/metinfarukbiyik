import PageHeader from '@/components/ui/PageHeader';
import ProjectExplorer from '@/components/ProjectExplorer';
import JsonLd from '@/components/JsonLd';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(
  'Projeler — Mobil, masaüstü ve web',
  'BYK Music, GeoCam: Audit, BYK Seri Baskı Pro, Creda System ve web siteleri. Metin Faruk Bıyık’ın geliştirdiği tüm projeleri keşfedin.',
  '/projeler',
  [
    'Metin Faruk Bıyık projeler',
    ...portfolioProjects.map((p) => p.name),
    'masaüstü uygulama',
    'mobil uygulama',
    'web tasarım',
  ],
);
export default function ProjectsPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Portföy / Projeler"
        title="Ürettiklerim."
        description="Günlük ihtiyaçlara ve iş süreçlerine dokunan uygulamalar, web siteleri ve kurumsal çözümler."
      />
      <ProjectExplorer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Metin Faruk Bıyık — Projeler',
          itemListElement: portfolioProjects.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: p.name,
            url: `${site.url}${p.href}`,
          })),
        }}
      />
    </div>
  );
}
