'use client';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';

/**
 * Açık / koyu tema düğmesi. Hangi ikonun görüneceğine CSS karar verir
 * (`.dark` sınıfı), böylece sunucu ve istemci aynı HTML'i üretir.
 */
export default function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" aria-label="Temayı değiştir" onClick={toggleTheme}>
      <Moon className="icon-moon" strokeWidth={1.6} aria-hidden="true" />
      <Sun className="icon-sun" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
