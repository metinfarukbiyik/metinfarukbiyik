import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Globe } from 'lucide-react';
import { portfolioProjects, type PortfolioProject } from '@/data/projects';
import { getProjectPresentation } from '@/data/projectPresentation';
import { projectSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import JsonLd from './JsonLd';
import ProjectActions from './ProjectActions';
import ProjectGallery from './ProjectGallery';
import ProjectList from './ProjectList';
import SectionTitle from './ui/SectionTitle';

export default function ProjectDetail({ project }: { project: PortfolioProject }) {
  const presentation = getProjectPresentation(project);
  const related = portfolioProjects.filter((item) => item.category === project.category && item.slug !== project.slug).slice(0, 2);
  return (
    <article className="project-detail animate-fade-up">
      <Link href="/projeler" className="back-link"><ArrowLeft size={14} aria-hidden="true" /> Tüm projeler</Link>
      <header className="project-detail-header">
        <span className="project-detail-icon" aria-hidden="true">
          {project.iconImage ? <Image src={project.iconImage} alt="" width={52} height={52} priority /> : <Globe size={25} />}
        </span>
        <div>
          <p className="eyebrow">{project.platform}</p>
          <h1>{project.name}</h1>
          <p className="project-detail-summary">{project.description}</p>
        </div>
      </header>
      <ProjectActions actions={presentation.actions} />
      <p className="project-action-note">{presentation.note}</p>
      <section className="project-detail-section">
        <SectionTitle>Proje hakkında</SectionTitle>
        <p>{project.detail}</p>
        <ul className="project-highlights">
          {project.features.slice(0, 3).map((feature) => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}
        </ul>
      </section>
      {presentation.images.length > 0 && (
        <section className="project-detail-section">
          <SectionTitle icon="images">Görseller</SectionTitle>
          <ProjectGallery images={presentation.images} />
        </section>
      )}
      <dl className="project-info">
        <div><dt>Proje türü</dt><dd>{project.category}</dd></div>
        <div><dt>Platform</dt><dd>{project.platform}</dd></div>
        <div><dt>Geliştirici</dt><dd>{site.name}</dd></div>
      </dl>
      <div className="project-support">
        <p>Proje hakkında bilgi veya destek için</p>
        <Link href="/iletisim" className="pill-button">İletişime geç <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </div>
      <section className="project-detail-section">
        <SectionTitle icon="projects">Diğer projeler</SectionTitle>
        <div className="list-panel"><ProjectList projects={related} /></div>
      </section>
      <JsonLd data={{ ...projectSchema(project), ...(presentation.actions[0]?.kind === 'download' ? { downloadUrl: presentation.actions[0].url } : {}) }} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Projeler', item: `${site.url}/projeler` },
          { '@type': 'ListItem', position: 3, name: project.name, item: `${site.url}${project.href}` },
        ],
      }} />
    </article>
  );
}
