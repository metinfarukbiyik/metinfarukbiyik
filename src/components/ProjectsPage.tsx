import React from 'react';
import { projects } from '../data/cvData';
import { Globe, GraduationCap, Building2, Smartphone, ExternalLink } from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  GraduationCap,
  Building2,
  Smartphone
};

const ProjectsPage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto pt-10 px-4">
      <h1 className="text-3xl font-extrabold text-[#004A99] mb-8 tracking-tight">PROJELER & REFERANSLAR</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const IconComponent = iconMap[project.icon] || Globe;
          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#004A99] hover:shadow-lg transition-shadow flex items-start gap-4 group"
            >
              <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                <IconComponent className="text-[#004A99]" size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
              </div>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-[#004A99] transition-colors shrink-0 mt-1" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
