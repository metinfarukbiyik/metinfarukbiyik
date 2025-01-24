interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  image?: string;
  variant?: "page" | "home";
}

export default function PageTitle({ title, description, children, variant = "page" }: PageTitleProps) {
  return (
    <div className="relative">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 lg:px-8 lg:pt-28">
        {/* İçerik */}
        <div className="w-full">
          {variant === "home" ? (
            // Ana Sayfa Düzeni - Başlık üstte, rozetler altta
            <>
              <h1 className="animate-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                {title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-xl transition-all duration-300 hover:bg-primary/10 hover:ring-primary/30">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9L11 12L8 15M13 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {description}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/5 to-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500 ring-1 ring-emerald-500/20 backdrop-blur-xl transition-all duration-300 hover:bg-emerald-500/10 hover:ring-emerald-500/30">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Çalışmaya Açık
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
    </div>
  );
} 