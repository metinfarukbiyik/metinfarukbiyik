interface CertificationsSectionProps {
  certifications: {
    name: string;
    date: string;
  }[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="relative space-y-12">
      {/* Timeline çizgisi */}
      <div className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

      {certifications.map((cert, index) => (
        <div key={index} className="group relative pl-8">
          {/* Timeline noktası */}
          <div className="absolute left-[-4px] top-3 h-2 w-2 rounded-full bg-gradient-to-r from-accent to-accent/80 ring-[3px] ring-background/80 transition-all duration-300 group-hover:scale-150 group-hover:ring-background/50" />

          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L15 12H9L12 15Z" fill="currentColor"/>
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-accent transition-colors duration-300">
                    {cert.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-8 sm:pl-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8C3 5 4.5 3 8 3H16C19.5 3 21 5 21 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-accent/90 bg-accent/5 px-3 py-1 rounded-full whitespace-nowrap ring-1 ring-accent/10 group-hover:bg-accent/10 group-hover:ring-accent/20 transition-all duration-300">
                  {cert.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 