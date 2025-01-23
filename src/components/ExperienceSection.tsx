interface ExperienceSectionProps {
  experiences: {
    company: string;
    position: string;
    date: string;
    description?: string;
  }[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="relative space-y-12">
      {/* Timeline çizgisi */}
      <div className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-primary/20 via-border to-border/20" />

      {experiences.map((exp, index) => (
        <div key={index} className="group relative pl-8">
          {/* Timeline noktası */}
          <div className="absolute left-[-4px] top-3 h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent ring-4 ring-background group-hover:scale-150 transition-transform duration-300" />

          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {exp.company}
                </h3>
                <p className="text-base font-light text-card-foreground/80">
                  {exp.position}
                </p>
              </div>
              <span className="text-sm text-muted-foreground font-medium bg-muted/30 px-3 py-1 rounded-full whitespace-nowrap">
                {exp.date}
              </span>
            </div>

            {exp.description && (
              <p className="text-card-foreground/80 leading-relaxed mt-3">
                {exp.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 