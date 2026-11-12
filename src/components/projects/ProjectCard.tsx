import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioProject } from '@/data/projects';
import ProjectIcon, { ProjectLogo } from './ProjectIcon';

/** Proje kartı (sungur.dev): küçük logo, ad ve ok; altında özet ve platform. */
export function ProjectCard({
  project,
  headingLevel = 'h3',
}: {
  project: PortfolioProject;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <Link className="ref-card" href={project.href}>
      <div className="ref-card-head">
        <span className="ref-card-icon" aria-hidden="true">
          <ProjectLogo project={project} size={23} />
        </span>
        <Heading>{project.name}</Heading>
        <ArrowRight className="ref-card-arrow" aria-hidden="true" />
      </div>
      <p>{project.description}</p>
      <span className="ref-card-tech">{project.platform}</span>
    </Link>
  );
}

/** Compact row for web projects and dense lists. */
export function ProjectRow({
  project,
  headingLevel = 'h3',
}: {
  project: PortfolioProject;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  const domain = project.url.replace(/^https?:\/\//, '').split('/')[0];
  return (
    <li className="project-row">
      <ProjectIcon project={project} size="sm" />
      <div className="project-row-copy">
        <Heading className="title-4">
          <Link href={project.href} className="card-link">
            {project.name}
          </Link>
        </Heading>
        <p className="text-small">{project.description}</p>
      </div>
      <span className="project-row-domain mono">{domain}</span>
      <ArrowRight className="project-row-arrow" aria-hidden="true" />
    </li>
  );
}

export function ProjectGrid({
  projects,
  headingLevel,
}: {
  projects: PortfolioProject[];
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <div className="ref-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

export function ProjectRows({
  projects,
  headingLevel,
}: {
  projects: PortfolioProject[];
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <ul className="project-rows">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
