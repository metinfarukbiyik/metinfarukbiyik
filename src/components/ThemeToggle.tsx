'use client';
import { Moon, Sun } from 'lucide-react';

/**
 * Açık / koyu tema düğmesi. Hangi ikonun görüneceğine CSS karar verir
 * (`.dark` sınıfı), böylece sunucu ve istemci aynı HTML'i üretir.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* gizli pencere: tercih bu oturumla sınırlı kalır */
    }
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Temayı değiştir" onClick={toggle}>
      <Moon className="icon-moon" strokeWidth={1.6} aria-hidden="true" />
      <Sun className="icon-sun" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
