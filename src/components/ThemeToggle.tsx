"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration için mounted kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const themeOptions = [
    {
      name: "light",
      icon: Sun,
      label: "Açık",
    },
    {
      name: "dark",
      icon: Moon,
      label: "Koyu",
    },
    {
      name: "system",
      icon: Monitor,
      label: "Sistem",
    },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.075] text-black/80 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:text-black dark:bg-black/[0.075] dark:text-white/80 dark:ring-white/5 dark:hover:bg-black/[0.1] dark:hover:text-white"
        aria-label="Tema Seçenekleri"
      >
        {currentTheme === "dark" && <Moon className="h-5 w-5" />}
        {currentTheme === "light" && <Sun className="h-5 w-5" />}
        {currentTheme === "system" && <Monitor className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 z-50 min-w-[8rem] overflow-hidden rounded-lg bg-white/80 p-1 text-black/80 shadow-lg ring-1 ring-black/5 backdrop-blur-xl dark:bg-black/80 dark:text-white/80 dark:ring-white/5"
            >
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      setTheme(option.name);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                      theme === option.name
                        ? "bg-black/5 dark:bg-white/5"
                        : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 