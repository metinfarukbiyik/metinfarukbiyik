import Image from 'next/image';
import { Barcode, Building2, Camera, Globe, GraduationCap, House, Music2, RadioTower, Workflow } from 'lucide-react';
import type { PortfolioProject } from '@/data/projects';
import { cx } from '@/components/ui';

export const projectIcons = { Barcode, Building2, Camera, Globe, GraduationCap, House, Music2, RadioTower, Workflow };

export default function ProjectIcon({
  project,
  size = 'md',
  priority,
}: {
  project: PortfolioProject;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}) {
  const Icon = projectIcons[project.icon] ?? Globe;
  const px = size === 'lg' ? 64 : size === 'sm' ? 32 : 44;
  return (
    <span className={cx('icon-tile', size !== 'md' && `icon-tile-${size}`)} aria-hidden="true">
      {project.iconImage ? (
        <Image src={project.iconImage} alt="" width={px} height={px} priority={priority} />
      ) : (
        <Icon strokeWidth={1.6} />
      )}
    </span>
  );
}

/** Small bare logo for inline badges and compact cards. */
export function ProjectLogo({ project, size = 14 }: { project: PortfolioProject; size?: number }) {
  const Icon = projectIcons[project.icon] ?? Globe;
  return project.iconImage ? (
    <Image src={project.iconImage} alt="" width={size} height={size} />
  ) : (
    <Icon strokeWidth={1.6} aria-hidden="true" />
  );
}
