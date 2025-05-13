import { GraduationCap, CalendarDays, MapPin, BookOpen } from "lucide-react";

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
      <div className="absolute left-[13px] top-2 bottom-10 w-[1px] bg-gradient-to-b from-accent/40 via-accent/30 to-transparent" />

      {education.map((edu, index) => (
        <div key={index} className="group relative pl-10">
          {/* Timeline noktası ve pulse efekti */}
          <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
            <div className="relative flex h-[26px] w-[26px] items-center justify-center">
              {/* Pulse efekti */}
              <div className="absolute h-full w-full animate-ping rounded-full bg-accent/20 duration-1000 group-hover:bg-accent/30" />
              {/* Glow efekti */}
              <div className="absolute -inset-1 rounded-full bg-accent/20 blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              {/* Gradient arka plan */}
              <div className="absolute h-full w-full rounded-full bg-gradient-to-br from-white via-white/90 to-white/70 dark:from-zinc-800 dark:via-zinc-800/90 dark:to-zinc-800/70 shadow-[0_0_12px_-3px_rgba(0,0,0,0.2)] dark:shadow-[0_0_12px_-3px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_16px_-3px_rgba(var(--accent-rgb),0.4)] dark:group-hover:shadow-[0_0_16px_-3px_rgba(var(--accent-rgb),0.4)] transition-all duration-300" />
              {/* Border */}
              <div className="absolute h-full w-full rounded-full border border-accent/30 group-hover:border-accent/60 transition-colors duration-300" />
              {/* İkon */}
              <GraduationCap className="relative h-3.5 w-3.5 text-accent/70 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>

          {/* İçerik kartı */}
          <div className="group/card relative overflow-hidden rounded-lg border border-white/10 dark:border-zinc-700/40 bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-zinc-800/40 dark:via-zinc-800/30 dark:to-zinc-800/20 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg group-hover:border-accent/20 group-hover:from-white/50 group-hover:via-white/40 group-hover:to-white/30 dark:group-hover:from-zinc-800/50 dark:group-hover:via-zinc-800/40 dark:group-hover:to-zinc-800/30">
            {/* Arkaplan efektleri */}
            <div className="pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />
            
            <div className="relative z-10">
              {/* Okul ve Bölüm */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-white/90 dark:to-white bg-clip-text text-transparent group-hover:from-accent group-hover:via-accent/80 group-hover:to-accent transition-all duration-300">
                    {edu.school}
                  </h3>
                  <div className="h-1.5 w-1.5 rounded-full bg-accent/30 group-hover:bg-accent/50 transition-colors duration-300" />
                  <span className="text-base text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors duration-300">
                    {edu.degree}
                  </span>
                </div>

                {/* Alt bilgiler */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5 group-hover:text-accent/80 transition-colors duration-300">
                    <div className="p-1 rounded-md bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                    </div>
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white/90">{edu.date}</span>
                  </div>
                  {edu.field && (
                    <>
                      <div className="h-1.5 w-1.5 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-colors duration-300" />
                      <div className="flex items-center gap-1.5 group-hover:text-accent/80 transition-colors duration-300">
                        <div className="p-1 rounded-md bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                          <BookOpen className="h-3.5 w-3.5" />
                        </div>
                        <span className="group-hover:text-gray-900 dark:group-hover:text-white/90">{edu.field}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Hover efekti için kenar parlaması */}
            <div className="absolute inset-px rounded-lg bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </div>
          
          {/* Timeline bağlantı çizgisi */}
          {index < education.length - 1 && (
            <div className="absolute left-[13px] top-[50%] h-[calc(100%+2rem)] w-[1px] bg-gradient-to-b from-accent/30 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
} 