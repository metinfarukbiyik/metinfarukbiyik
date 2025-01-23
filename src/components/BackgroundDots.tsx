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
      {/* Desen Katmanları */}
      <div className="absolute inset-0 pattern-grid opacity-[0.08] dark:opacity-[0.06] mix-blend-soft-light" />
      <div className="absolute inset-0 pattern-dots-dense opacity-[0.08] dark:opacity-[0.04] mix-blend-soft-light" />

      {/* Gradient Daireler */}
      <div className={`absolute ${primaryPosition}-0 top-0 h-[600px] w-[600px] ${
        primaryPosition === "left" ? "-translate-x-1/2" : "translate-x-1/2"
      } animate-pulse rounded-full bg-primary/5 dark:bg-primary/3 blur-[150px]`} />
      
      <div className={`absolute ${secondaryPosition}-0 top-[20%] h-[600px] w-[600px] ${
        secondaryPosition === "left" ? "-translate-x-1/2" : "translate-x-1/2"
      } animate-pulse rounded-full bg-secondary/5 dark:bg-secondary/3 blur-[150px]`} />
    </div>
  );
} 