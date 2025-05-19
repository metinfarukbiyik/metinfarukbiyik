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
    <div className="relative pt-16 pb-4 sm:pt-24 lg:pt-24">
      {/* İçerik */}
      <div className="w-full">
        {variant === "home" ? (
          // Ana Sayfa Düzeni - Başlık üstte, rozetler altta
          <>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Avatar */}
              <motion.div
                layout
                layoutId="profile-image"
                className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent backdrop-blur-xl shadow-xl shadow-primary/10 dark:shadow-primary/5"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25
                }}
              >
                {/* Dekoratif Kenarlar ve Parlaklık */}
                <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-b from-white/50 via-white/20 to-white/30 dark:from-white/20 dark:via-white/10 dark:to-white/5 opacity-50" />
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-transparent" />
                <div className="absolute -inset-[1.5px] rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-primary/10 blur-[0.5px]" />
                
                {/* Dış Halkalar */}
                <div className="absolute -inset-2 rounded-2xl border border-white/20 dark:border-white/10" />
                <div className="absolute -inset-3 rounded-2xl border border-white/10 dark:border-white/5" />
                <div className="absolute -inset-4 rounded-2xl border border-primary/5" />
                
                {/* İç Parlaklık */}
                <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-primary/5" />
                
                {/* Görsel */}
                <div className="absolute inset-[3px] overflow-hidden rounded-2xl">
                  <Image
                    src="/profile.jpg"
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 140px, (max-width: 1200px) 140px, 140px"
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
                <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10 bg-gradient-to-br from-white/20 via-transparent to-primary/10" />
              </motion.div>

              {/* İsim ve Rozetler */}
              <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative text-center md:text-left w-full"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
                    {title}
                  </span>
                  <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-2xl opacity-20 -z-10" />
                </motion.h1>

                {/* İnce minimalist çizgi */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                />

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center md:justify-start gap-3"
                >
                  {/* Developer Rozeti */}
                  <div className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-xl transition-all duration-300 hover:bg-primary/10 hover:ring-primary/30">
                    <motion.svg 
                      className="h-4 w-4"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 6L3 12L8 18M16 6L21 12L16 18M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    <span className="relative">
                      {cvData.title}
                      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                    </span>
                  </div>

                  {/* Çalışmaya Açık Rozeti */}
                  <div className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500 ring-1 ring-emerald-500/20 backdrop-blur-xl transition-all duration-300 hover:bg-emerald-500/10 hover:ring-emerald-500/30">
                    <motion.svg 
                      className="h-4 w-4"
                      initial={{ y: 0 }}
                      animate={{ y: [-1, 1, -1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="relative">
                      {cvData.status}
                      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          // Diğer Sayfalar Düzeni - Başlık üstte, açıklama altta
          <>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                {title}
              </span>
              <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-2xl opacity-20 -z-10" />
            </motion.h1>

            {description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-lg leading-8 text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </>
        )}

        {children && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
} 