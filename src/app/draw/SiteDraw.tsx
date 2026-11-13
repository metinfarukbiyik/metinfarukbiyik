'use client';

import { useEffect, useState } from 'react';
import { House } from 'lucide-react';
import { Draw, Wordmark, type Lang } from '@/lib/sketch-react';
import type { Theme } from '@/lib/sketch';
import { drawAbout } from './about';

/** Sitenin tema tercihi (biyik.dev ile ortak). */
const siteTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

function applySiteTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* tercih bu oturumla sınırlı kalır */
  }
}

/**
 * Çevrimdışı çalışma: service worker'ı kaydeder ve sayfanın yüklediği dosyaları önbelleğe
 * aldırır. Yalnızca draw.biyik.dev'de (yerelde ?sw ile denenebilir).
 */
function useOfflineSupport() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (location.host !== 'draw.biyik.dev' && !new URLSearchParams(location.search).has('sw')) return;
    navigator.serviceWorker
      .register('/draw-sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => {
        const urls = [
          location.pathname,
          ...performance
            .getEntriesByType('resource')
            .map((e) => e.name)
            .filter((u) => u.startsWith(location.origin)),
        ];
        reg.active?.postMessage({ type: 'cache', urls });
      })
      .catch(() => undefined);
  }, []);
}

/** draw.biyik.dev: genel çizim bileşeninin siteye özgü ayarları. */
export default function SiteDraw({ handFont }: { handFont: string }) {
  useOfflineSupport();
  // Alt alan adında /docs, ana sitede (yerel geliştirme) /draw/docs
  const [docsBase] = useState(() => (location.host === 'draw.biyik.dev' ? '/docs' : '/draw/docs'));
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('draw-lang');
      if (saved === 'tr' || saved === 'en') return saved;
    } catch {
      /* varsayılana düş */
    }
    return navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  });
  const changeLang = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem('draw-lang', next);
    } catch {
      /* tercih bu oturumla sınırlı kalır */
    }
  };
  return (
    <Draw
      handFont={handFont}
      initialTheme={siteTheme()}
      onThemeChange={applySiteTheme}
      brand={<Wordmark name="draw" suffix=".biyik.dev" />}
      lang={lang}
      onLangChange={changeLang}
      docsUrl={lang === 'en' ? `${docsBase}/en` : docsBase}
      about={drawAbout(lang)}
      links={[{ label: 'biyik.dev', href: 'https://biyik.dev', icon: <House size={16} /> }]}
    />
  );
}
