interface EducationSectionProps {
  education: {
    school: string;
    degree: string;
    field?: string;
    date: string;
  }[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="relative space-y-12">
      {/* Timeline çizgisi */}
      <div className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent" />

      {education.map((edu, index) => (
        <div key={index} className="group relative pl-8">
          {/* Timeline noktası */}
          <div className="absolute left-[-4px] top-3 h-2 w-2 rounded-full bg-gradient-to-r from-secondary to-secondary/80 ring-[3px] ring-background/80 transition-all duration-300 group-hover:scale-150 group-hover:ring-background/50" />

          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary/20">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L15 12H9L12 15Z" fill="currentColor"/>
                      <path d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-secondary transition-colors duration-300">
                    {edu.school}
                  </h3>
                </div>
                <p className="text-base font-medium text-card-foreground/80 group-hover:text-card-foreground transition-colors duration-300 pl-8">
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </p>
              </div>
              <div className="flex items-center gap-2 pl-8 sm:pl-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary/20">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8C3 5 4.5 3 8 3H16C19.5 3 21 5 21 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-secondary/90 bg-secondary/5 px-3 py-1 rounded-full whitespace-nowrap ring-1 ring-secondary/10 group-hover:bg-secondary/10 group-hover:ring-secondary/20 transition-all duration-300">
                  {edu.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 