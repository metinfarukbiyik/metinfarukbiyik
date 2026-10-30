import { ArrowUpRight, Download, Github } from 'lucide-react';
import type { ProjectAction } from '@/data/projectPresentation';

const icons = { download: Download, visit: ArrowUpRight, source: Github };

export default function ProjectActions({ actions }: { actions: ProjectAction[] }) {
  return (
    <div className="project-actions" aria-label="Proje bağlantıları">
      {actions.map((action, index) => {
        const Icon = icons[action.kind];
        return (
          <a
            key={action.url}
            href={action.url}
            className={`pill-button${index === 0 ? ' primary-button' : ''}`}
            {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon size={15} aria-hidden="true" />
            {action.label}
            {action.external && <span className="sr-only"> (yeni sekmede açılır)</span>}
          </a>
        );
      })}
    </div>
  );
}
