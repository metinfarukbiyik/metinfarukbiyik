import React from 'react';
import { projects } from '../data/cvData';
import PageShell from './ui/PageShell';
import GroupedSection from './ui/GroupedSection';
import ListRow from './ui/ListRow';
import { Globe, GraduationCap, Building2, Smartphone, Aperture } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
  Globe: { icon: Globe, color: 'bg-accent' },
  GraduationCap: { icon: GraduationCap, color: 'bg-ios-orange' },
  Building2: { icon: Building2, color: 'bg-ios-red' },
  Smartphone: { icon: Smartphone, color: 'bg-ios-indigo' },
};

const ProjectsPage: React.FC = () => (
  <PageShell title="Projeler" subtitle="Tasarlayıp geliştirdiğim uygulama ve web siteleri.">
    <GroupedSection title="Mobil Uygulama">
      <ListRow
        icon={Aperture}
        iconColor="bg-ios-indigo"
        title="GeoCam: Audit"
        subtitle="SwiftUI ile geliştirilen iOS saha ve denetim kamerası."
        to="/geocam"
      />
    </GroupedSection>

    <GroupedSection title="Web Siteleri" footer="Bağlantılar yeni sekmede açılır.">
      {projects.map((project) => {
        const { icon, color } = iconMap[project.icon] ?? iconMap.Globe;
        return (
          <ListRow
            key={project.id}
            icon={icon}
            iconColor={color}
            title={project.name}
            subtitle={project.description}
            href={project.url}
            external
          />
        );
      })}
    </GroupedSection>
  </PageShell>
);

export default ProjectsPage;
