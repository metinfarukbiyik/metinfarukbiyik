import { Download, Github, Globe } from 'lucide-react';
import type { ProjectAction } from '@/data/projectPresentation';
import { ButtonLink } from '@/components/ui';

const icons = { download: Download, visit: Globe, source: Github };

export default function ProjectActions({ actions }: { actions: ProjectAction[] }) {
  return (
    <div className="project-actions" role="group" aria-label="Proje bağlantıları">
      {actions.map((action, index) => {
        const Icon = icons[action.kind];
        return (
          <ButtonLink
            key={action.url}
            href={action.url}
            variant={index === 0 ? 'primary' : 'secondary'}
            external={action.external}
            icon={<Icon aria-hidden="true" />}
          >
            {action.label}
          </ButtonLink>
        );
      })}
    </div>
  );
}
