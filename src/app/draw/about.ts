import type { AboutInfo, Lang } from '@/lib/sketch-react';

export const DRAW_REPO = 'https://github.com/metinfarukbiyik/biyik-draw';
export const DRAW_VERSION = '1.0.0';

const descriptions: Record<Lang, string> = {
  tr: 'Tarayıcıda çalışan, el çizimi görünümlü beyaz tahta. Çizim motoru ve arayüzü sıfırdan yazıldı; harici çizim kütüphanesi kullanmaz.',
  en: 'A hand-drawn style whiteboard that runs in your browser. The drawing engine and UI are written from scratch, with no third-party drawing library.',
};

export const drawAbout = (lang: Lang): AboutInfo => ({
  name: 'draw.biyik.dev',
  version: DRAW_VERSION,
  description: descriptions[lang],
  author: { name: 'Metin Faruk Bıyık', url: 'https://biyik.dev' },
  repoUrl: DRAW_REPO,
  license: 'MIT',
});
