import { Check, Image as ImageIcon } from 'lucide-react';
import ContactCta from '@/components/ContactCta';
import JsonLd from '@/components/JsonLd';
import { Badge, DataList, Frame, PageHeader, Section, TextLink } from '@/components/ui';
import { getProjectPresentation } from '@/data/projectPresentation';
import { isGame, portfolioProjects, type PortfolioProject } from '@/data/projects';
import { projectSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import ProjectActions from './ProjectActions';
import { ProjectRows } from './ProjectCard';
import ProjectExtras from './ProjectExtras';
import ProjectGallery from './ProjectGallery';
import ProjectIcon from './ProjectIcon';

export default function ProjectDetail({ project }: { project: PortfolioProject }) {
  const presentation = getProjectPresentation(project);
  const related = portfolioProjects
    .filter((item) => item.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);
  const domain = project.url.replace(/^https?:\/\//, '').split('/')[0];
  const download = presentation.actions.find((action) => action.kind === 'download');
  const game = isGame(project);
  const kicker = game ? 'oyun' : project.category === 'Uygulama' ? 'uygulama' : 'web projesi';

  return (
    <article className="container">
      <PageHeader
        crumbs={[
          { name: 'Projeler', href: '/projeler' },
          { name: project.name, href: project.href },
        ]}
        leading={<ProjectIcon project={project} size="sm" priority />}
        title={project.name}
        count={kicker}
        description={project.description}
        meta={
          <>
            {project.platforms.map((platform) => (
              <Badge key={platform}>{platform}</Badge>
            ))}
            <Badge>{project.category === 'Uygulama' ? 'ücretsiz' : 'yayında'}</Badge>
          </>
        }
      >
        <ProjectActions actions={presentation.actions} />
        <p className="text-meta project-note">{presentation.note}</p>
      </PageHeader>

      {presentation.images.length > 0 && (
        <Frame
          tabs={presentation.images.map((image) => ({
            label: image.src.split('/').pop() ?? image.src,
            icon: <ImageIcon strokeWidth={1.75} />,
          }))}
          meta={`${presentation.images.length} görsel`}
          sunken
        >
          <ProjectGallery images={presentation.images} />
        </Frame>
      )}

      <Section id="hakkinda" kicker="proje" title="Proje hakkında" tight>
        <div className="project-about">
          <div>
            <p className="lead project-detail-text">{project.detail}</p>
            <ul className="check-list check-list-lg">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <DataList
            columns={1}
            items={[
              { label: 'Proje türü', value: game ? 'Oyun' : project.category },
              { label: 'Platform', value: project.platform },
              { label: 'Geliştirici', value: site.name },
              {
                label: game ? 'Oyun adresi' : project.category === 'Uygulama' ? 'Kaynak / mağaza' : 'Adres',
                value: <TextLink href={project.url}>{domain}</TextLink>,
              },
            ]}
          />
        </div>
      </Section>

      <ProjectExtras slug={project.slug} />

      <Section
        id="diger-projeler"
        kicker="devamı"
        title="Diğer projeler"
        action={
          <TextLink href="/projeler" arrow>
            Tüm projeler
          </TextLink>
        }
        tight
      >
        <ProjectRows projects={related} />
      </Section>

      <ContactCta
        title={`${project.name} hakkında bir sorunuz mu var?`}
        description="Destek, öneri veya benzer bir proje için bana doğrudan yazabilirsiniz."
      />

      <JsonLd data={{ ...projectSchema(project), ...(download ? { downloadUrl: download.url } : {}) }} />
    </article>
  );
}
