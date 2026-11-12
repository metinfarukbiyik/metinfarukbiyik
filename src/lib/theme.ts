import { notifyIsland } from '@/lib/island';

/** Açık / koyu temayı değiştirir, tercihi saklar ve Dinamik Ada'da duyurur. */
export function toggleTheme() {
  const root = document.documentElement;
  const dark = !root.classList.contains('dark');
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    /* gizli pencere: tercih bu oturumla sınırlı kalır */
  }
  notifyIsland({
    title: dark ? 'Koyu görünüm' : 'Açık görünüm',
    detail: 'Tercih bu cihazda saklandı',
    icon: dark ? 'moon' : 'sun',
    tone: dark ? 'purple' : 'orange',
    duration: 1600,
  });
}
