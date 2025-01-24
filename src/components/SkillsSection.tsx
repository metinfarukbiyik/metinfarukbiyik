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
            <div
              key={index}
              className="group flex items-center gap-2 rounded-lg bg-card/30 px-3 py-2 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-sm font-medium text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
                {skill}
              </span>
            </div>
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
            <div
              key={index}
              className="group flex items-center gap-2 rounded-lg bg-card/30 px-3 py-2 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-secondary/20 dark:hover:ring-secondary/20"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary/20">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8.00002C21 6.34317 19.6569 5.00002 18 5.00002H6C4.34315 5.00002 3 6.34317 3 8.00002V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
                {program}
              </span>
            </div>
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
            <div
              key={index}
              className="group flex items-center gap-2 rounded-lg bg-card/30 px-3 py-2 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-accent/20 dark:hover:ring-accent/20"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 