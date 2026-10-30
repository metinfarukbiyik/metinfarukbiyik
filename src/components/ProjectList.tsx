import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Barcode,
  Building2,
  Camera,
  Globe,
  GraduationCap,
  Music2,
  type LucideIcon,
} from 'lucide-react';
import type { PortfolioProject } from '@/data/projects';

const icons: Record<string, LucideIcon> = {
  Barcode,
  Building2,
  Camera,
  Globe,
  GraduationCap,
  Music2,
};

export default function ProjectList({
  projects,
  headingLevel = 3,
}: {
  projects: PortfolioProject[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ul className="project-list">
      {projects.map((project) => {
        const Icon = icons[project.icon] || Globe;
        const appIcon = project.iconImage;
        return (
          <li key={project.slug} className="project-row">
            <span
              className={`project-icon icon-${project.slug}`}
              aria-hidden="true"
            >
              {appIcon ? (
                <Image src={appIcon} alt="" width={44} height={44} />
              ) : (
                <Icon size={23} strokeWidth={1.6} />
              )}
            </span>
            <div className="project-copy">
              <Heading className="project-title">
                <Link href={project.href}>{project.name}</Link>
              </Heading>
              <p>{project.description}</p>
              <span className="project-platform">{project.platform}</span>
            </div>
            <Link
              href={project.href}
              className="pill-button project-button"
              aria-label={`${project.name} projesini incele`}
            >
              İncele <ArrowRight size={13} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
