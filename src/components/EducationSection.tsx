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
    <div className="relative space-y-8">
      {/* Ana timeline çizgisi */}
      <div className="absolute left-[11px] top-0 h-full w-[2px] bg-gradient-to-b from-accent/5 via-accent/5 to-transparent" />

      {education.map((edu, index) => (
        <div key={index} className="group relative pl-10">
          {/* Bağlantı çizgisi */}
          <div className="absolute left-[11px] top-4 h-[2px] w-6 bg-gradient-to-r from-accent/5 to-accent/40 group-hover:from-accent/20 group-hover:to-accent transition-all duration-500" />
          
          {/* Timeline noktası - Modern Tasarım */}
          <div className="absolute left-0 top-2">
            <div className="relative flex items-center justify-center">
              {/* Dış çerçeve */}
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-accent/10 to-transparent rotate-45 transition-all duration-300 group-hover:from-accent/30 group-hover:rotate-90" />
              {/* İç çerçeve */}
              <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-accent/5 to-transparent rotate-45 transition-all duration-300 group-hover:from-accent/20 group-hover:-rotate-90" />
              {/* Merkez nokta */}
              <div className="absolute inset-2 rounded-md bg-accent/10 group-hover:bg-accent/30 transition-all duration-300" />
            </div>
          </div>

          <div className="group-hover:translate-x-2 transition-transform duration-500">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20 mt-1">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L15 12H9L12 15Z" fill="currentColor"/>
                      <path d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-card-foreground group-hover:text-accent transition-colors duration-300">
                      {edu.school}
                    </h3>
                    <p className="text-base font-medium text-card-foreground/80 group-hover:text-card-foreground transition-colors duration-300">
                      {edu.degree}
                      {edu.field && ` - ${edu.field}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pl-8 sm:pl-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8C3 5 4.5 3 8 3H16C19.5 3 21 5 21 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-accent/90 bg-accent/5 px-3 py-1 rounded-full whitespace-nowrap ring-1 ring-accent/10 group-hover:bg-accent/10 group-hover:ring-accent/20 transition-all duration-300">
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