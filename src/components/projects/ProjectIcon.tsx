import Image from 'next/image';
import { Barcode, Building2, Camera, Globe, GraduationCap, Music2, RadioTower, Workflow } from 'lucide-react';
import type { PortfolioProject } from '@/data/projects';
import { cx } from '@/components/ui';

const icons = { Barcode, Building2, Camera, Globe, GraduationCap, Music2, RadioTower, Workflow };

export default function ProjectIcon({
  project,
  size = 'md',
  priority,
}: {
  project: PortfolioProject;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}) {
  const Icon = icons[project.icon] ?? Globe;
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
