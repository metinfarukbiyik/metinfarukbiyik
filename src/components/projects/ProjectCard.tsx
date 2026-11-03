import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioProject } from '@/data/projects';
import { Badge } from '@/components/ui';
import ProjectIcon from './ProjectIcon';

/** Card for an application: icon, platforms, summary, whole-card link. */
export function ProjectCard({
  project,
  headingLevel = 'h3',
}: {
  project: PortfolioProject;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <article className="card card-interactive project-card">
      <div className="project-card-top">
        <ProjectIcon project={project} />
        <div className="project-card-badges">
          {project.platforms.map((platform) => (
            <Badge key={platform} outline>
              {platform}
            </Badge>
          ))}
        </div>
      </div>
      <Heading className="title-3 project-card-title">
        <Link href={project.href} className="card-link">
          {project.name}
        </Link>
      </Heading>
      <p className="text-small">{project.description}</p>
      <span className="project-card-more" aria-hidden="true">
        İncele <ArrowRight />
      </span>
    </article>
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
    <div className="project-grid">
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
