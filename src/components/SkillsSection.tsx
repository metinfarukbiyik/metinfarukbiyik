interface SkillsSectionProps {
  skills: {
    softSkills: string[];
    technical: {
      programs: string[];
      webDevelopment: string[];
    };
  };
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Soft Skills */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-card-foreground/90">
          Kişisel Yetenekler
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.softSkills.map((skill, index) => (
            <span
              key={index}
              className="rounded-lg bg-primary/5 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Skills - Programs */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-card-foreground/90">
          Programlar
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.technical.programs.map((program, index) => (
            <span
              key={index}
              className="rounded-lg bg-secondary/5 px-3 py-1 text-sm font-medium text-secondary hover:bg-secondary/10 transition-colors"
            >
              {program}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Skills - Web Development */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-card-foreground/90">
          Web Geliştirme
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.technical.webDevelopment.map((tech, index) => (
            <span
              key={index}
              className="rounded-lg bg-accent/5 px-3 py-1 text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 