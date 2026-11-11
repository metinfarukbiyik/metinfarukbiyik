import ContactCta from '@/components/ContactCta';
import JsonLd from '@/components/JsonLd';
import ProjectExplorer from '@/components/projects/ProjectExplorer';
import { PageHeader } from '@/components/ui';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.projects);

export default function ProjectsPage() {
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'Projeler', href: '/projeler' }]}
        title="Projeler"
        description="Masaüstü ve mobil uygulamalar, kurumsal sistemler ve web siteleri. Uygulamaları indirebilir, web projelerini ziyaret edebilirsin."
      />
      <ProjectExplorer />
      <ContactCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projeler — Metin Faruk Bıyık',
          url: `${site.url}/projeler`,
          inLanguage: 'tr',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: portfolioProjects.map((p, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: p.name,
              url: `${site.url}${p.href}`,
            })),
          },
        }}
      />
    </div>
  );
}
