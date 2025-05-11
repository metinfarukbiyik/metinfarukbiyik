import { GraduationCap, CalendarDays } from "lucide-react";

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
    <div className="relative space-y-6">
      {/* Ana timeline çizgisi */}
      <div className="absolute left-[13px] top-2 bottom-10 w-[1.5px] bg-gradient-to-b from-accent/40 via-accent/30 to-transparent" />

      {education.map((edu, index) => (
        <div key={index} className="group relative pl-10">
          {/* Timeline noktası (mezuniyet ikonu ile) */}
          <div className="absolute left-0 top-[calc(50%-18px)] z-10">
            <div className="flex h-7 w-7 items-center justify-center">
              {/* Dış halka */}
              <div className="absolute h-7 w-7 rounded-full bg-white dark:bg-zinc-800 border-[1.5px] border-accent/40 shadow-sm group-hover:border-accent/60 transition-all duration-300"></div>
              {/* İkon */}
              <GraduationCap className="h-3.5 w-3.5 text-accent/80 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>

          {/* Bağlantı çizgisi */}
          <div className="absolute left-[13px] top-[50%] h-[1.5px] w-6 bg-gradient-to-r from-accent/50 to-transparent group-hover:from-accent/80 transition-all duration-300" />

          {/* İçerik kartı */}
          <div className="relative overflow-hidden rounded-xl bg-white/30 dark:bg-zinc-800/40 backdrop-blur-sm p-5 border border-white/20 dark:border-zinc-700/60 shadow-md hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-white/40 group-hover:to-white/30 dark:group-hover:from-zinc-800/60 dark:group-hover:to-zinc-800/40 group-hover:border-accent/20 transition-all duration-300">
            <div className="absolute -top-4 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-30 group-hover:opacity-60 -translate-y-1/2 translate-x-1/2 transition-all duration-700"></div>
            
            <div className="relative z-10">
              {/* Okul ve Bölüm */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 group-hover:text-accent transition-colors duration-300">
                    {edu.school}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors duration-300">
                    {edu.degree}
                    {edu.field && ` - ${edu.field}`}
                  </p>
                </div>
                
                {/* Tarih */}
                <div className="mt-1 sm:mt-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 dark:bg-accent/15 border border-accent/15 dark:border-accent/20 group-hover:bg-accent/15 dark:group-hover:bg-accent/20 group-hover:border-accent/25 transition-all duration-300">
                    <CalendarDays className="h-3 w-3 text-accent/80" />
                    <span className="text-xs font-medium text-accent/90">
                      {edu.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bakış açılarını bağlamak için bağlantı işaretçisi - Sadece son öğe değilse */}
          {index < education.length - 1 && (
            <div className="absolute left-[13px] top-[calc(50%+7px)] h-[calc(100%-7px)] w-[1.5px] bg-gradient-to-b from-accent/30 to-accent/10"></div>
          )}
        </div>
      ))}
    </div>
  );
} 