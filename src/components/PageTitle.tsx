import Image from "next/image";
import { motion } from "framer-motion";
import { cvData } from "@/data/cv";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: "page" | "home";
}

export default function PageTitle({ title, description, children, variant = "page" }: PageTitleProps) {
  return (
    <div className="relative pt-8 pb-4 sm:pt-16 lg:pt-28">
      {/* İçerik */}
      <div className="w-full">
        {variant === "home" ? (
          // Ana Sayfa Düzeni - Başlık üstte, rozetler altta
          <>
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <motion.div
                layout
                layoutId="profile-image"
                className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent backdrop-blur-xl shadow-xl shadow-primary/10 dark:shadow-primary/5"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25
                }}
              >
                {/* Dekoratif Kenarlar ve Parlaklık */}
                <div className="absolute -inset-[0.5px] rounded-full bg-gradient-to-b from-white/50 via-white/20 to-white/30 dark:from-white/20 dark:via-white/10 dark:to-white/5 opacity-50" />
                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent" />
                <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-br from-white/20 via-transparent to-primary/10 blur-[0.5px]" />
                
                {/* Dış Halkalar */}
                <div className="absolute -inset-2 rounded-full border border-white/20 dark:border-white/10" />
                <div className="absolute -inset-3 rounded-full border border-white/10 dark:border-white/5" />
                <div className="absolute -inset-4 rounded-full border border-primary/5" />
                
                {/* İç Parlaklık */}
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/10 via-transparent to-primary/5" />
                
                {/* Görsel */}
                <div className="absolute inset-[3px] overflow-hidden rounded-full">
                  <Image
                    src="/profile.jpg"
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100px, (max-width: 1200px) 100px, 100px"
                    priority={true}
                    loading="eager"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Mi85OEI2PTZFOT5ZXVlphZGZY2RtdHp6enp6enp6env/2wBDARUXFyAeIB4gHh4gIiAdIB0gHR0dHSAdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  {/* Hafif Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
                </div>
                
                {/* İnce Kenar Çizgisi */}
                <div className="absolute inset-0 rounded-full ring-1 ring-primary/10 bg-gradient-to-br from-white/20 via-transparent to-primary/10" />
              </motion.div>

              {/* İsim ve Rozetler */}
              <div className="flex flex-col gap-4">
                <h1 className="animate-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                  {title}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Developer Rozeti */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-xl transition-all duration-300 hover:bg-primary/10 hover:ring-primary/30">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6L3 12L8 18M16 6L21 12L16 18M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {cvData.title}
                  </div>

                  {/* Çalışmaya Açık Rozeti */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500 ring-1 ring-emerald-500/20 backdrop-blur-xl transition-all duration-300 hover:bg-emerald-500/10 hover:ring-emerald-500/30">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    {cvData.status}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Diğer Sayfalar Düzeni - Başlık üstte, açıklama altta
          <>
            <h1 className="animate-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
              {title}
            </h1>

            {description && (
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {description}
              </p>
            )}
          </>
        )}

        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
} 