interface BackgroundDotsProps {
  primaryPosition?: "left" | "right";
  secondaryPosition?: "left" | "right";
}

export default function BackgroundDots({ 
  primaryPosition = "left",
  secondaryPosition = "right"
}: BackgroundDotsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Grid Desen Katmanı */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(226,232,240,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226,232,240,0.08)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,rgb(226,232,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226,232,240,0.03)_1px,transparent_1px)]" />
      
      {/* İkinci ince grid katmanı */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(226,232,240,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226,232,240,0.04)_1px,transparent_1px)] bg-[size:8px_8px] dark:bg-[linear-gradient(to_right,rgb(226,232,240,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226,232,240,0.015)_1px,transparent_1px)]" />

      {/* Gradient Daireler - sol üst */}
      <div className="absolute left-0 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/4 animate-glow-pulse rounded-full bg-primary/10 dark:bg-primary/5 blur-[160px] opacity-80" />
      
      {/* Gradient Daireler - sağ üst */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/5 animate-pulse rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[150px] opacity-80 animation-delay-1000" style={{ animationDelay: '3s' }} />
      
      {/* Gradient Daireler - ortada */}
      <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/4 animate-glow-pulse rounded-full bg-accent/10 dark:bg-accent/5 blur-[140px] opacity-80" style={{ animationDelay: '1s' }} />
      
      {/* Ekstra Gradient - sol alt */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 animate-pulse rounded-full bg-primary/8 dark:bg-primary/3 blur-[120px] opacity-80" style={{ animationDelay: '5s' }} />
    </div>
  );
} 