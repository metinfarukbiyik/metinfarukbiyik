import { Briefcase, CalendarDays } from "lucide-react";

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
    <div className="relative space-y-6">
      {/* Ana timeline çizgisi */}
      <div className="absolute left-[13px] top-2 bottom-10 w-[1.5px] bg-gradient-to-b from-primary/40 via-primary/30 to-transparent" />

      {experiences.map((exp, index) => (
        <div key={index} className="group relative pl-10">
          {/* Timeline noktası (şirket ikonu ile) */}
          <div className="absolute left-0 top-[calc(50%-18px)] z-10">
            <div className="flex h-7 w-7 items-center justify-center">
              {/* Dış halka */}
              <div className="absolute h-7 w-7 rounded-full bg-white dark:bg-zinc-800 border-[1.5px] border-primary/40 shadow-sm group-hover:border-primary/60 transition-all duration-300"></div>
              {/* İkon */}
              <Briefcase className="h-3.5 w-3.5 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>

          {/* Bağlantı çizgisi */}
          <div className="absolute left-[13px] top-[50%] h-[1.5px] w-6 bg-gradient-to-r from-primary/50 to-transparent group-hover:from-primary/80 transition-all duration-300" />

          {/* İçerik kartı */}
          <div className="relative overflow-hidden rounded-xl bg-white/30 dark:bg-zinc-800/40 backdrop-blur-sm p-5 border border-white/20 dark:border-zinc-700/60 shadow-md hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-white/40 group-hover:to-white/30 dark:group-hover:from-zinc-800/60 dark:group-hover:to-zinc-800/40 group-hover:border-primary/20 transition-all duration-300">
            <div className="absolute -top-4 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-30 group-hover:opacity-60 -translate-y-1/2 translate-x-1/2 transition-all duration-700"></div>
            
            <div className="relative z-10">
              {/* Firma ve pozisyon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 group-hover:text-primary transition-colors duration-300">
                      {exp.company}
                    </h3>
                  <p className="text-base text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors duration-300">
                      {exp.position}
                    </p>
                </div>
                
                {/* Tarih */}
                <div className="mt-1 sm:mt-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/15 dark:border-primary/20 group-hover:bg-primary/15 dark:group-hover:bg-primary/20 group-hover:border-primary/25 transition-all duration-300">
                    <CalendarDays className="h-3 w-3 text-primary/80" />
                    <span className="text-xs font-medium text-primary/90">
                      {exp.date}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Açıklama */}
              {exp.description && (
                <div className="mt-4 border-t border-gray-100 dark:border-zinc-700/40 pt-3">
                  <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-white/80 transition-colors duration-300">
                    {exp.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Bakış açılarını bağlamak için bağlantı işaretçisi - Sadece son öğe değilse */}
          {index < experiences.length - 1 && (
            <div className="absolute left-[13px] top-[calc(50%+7px)] h-[calc(100%-7px)] w-[1.5px] bg-gradient-to-b from-primary/30 to-primary/10"></div>
          )}
        </div>
      ))}
    </div>
  );
} 