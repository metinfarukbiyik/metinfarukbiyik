interface CertificationsSectionProps {
  certifications: {
    name: string;
    date: string;
  }[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="relative space-y-8">
      {/* Timeline çizgisi */}
      <div className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-primary/20 via-border to-border/20" />

      {certifications.map((cert, index) => (
        <div key={index} className="group relative pl-8">
          {/* Timeline noktası */}
          <div className="absolute left-[-4px] top-3 h-2 w-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent ring-4 ring-background group-hover:scale-150 transition-transform duration-300" />

          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-medium text-card-foreground group-hover:text-primary transition-colors">
                {cert.name}
              </h3>
              <span className="text-sm text-muted-foreground font-medium bg-muted/30 px-3 py-1 rounded-full whitespace-nowrap">
                {cert.date}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 