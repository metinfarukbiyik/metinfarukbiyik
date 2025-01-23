"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.075] text-black/80 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:text-black dark:bg-black/[0.075] dark:text-white/80 dark:ring-white/5 dark:hover:bg-black/[0.1] dark:hover:text-white"
      aria-label="Tema Değiştir"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
} 