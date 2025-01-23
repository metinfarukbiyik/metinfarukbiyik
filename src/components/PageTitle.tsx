interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageTitle({ title, description, children }: PageTitleProps) {
  return (
    <div className="relative mb-8 text-center pt-20 min-h-[200px]">
      <div className="relative z-10">
        <h1 className="animate-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-3xl font-bold text-transparent sm:text-3xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {children}
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl -z-10" />
    </div>
  );
} 