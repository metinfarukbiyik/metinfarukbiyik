'use client';

import dynamic from 'next/dynamic';

// Çizim motoru tarayıcı API'lerine dayanır; sunucuda işlenmez.
// Fontlar CDN yerine kendi alan adımızdan yüklenir (scripts/copy-draw-assets.mjs). Değer, çizim
// motoru yüklenmeden önce atanmalı; motor font adreslerini modül yüklenirken hesaplar.
const DrawApp = dynamic(
  () => {
    window.EXCALIDRAW_ASSET_PATH = '/draw-assets/';
    return import('./DrawApp');
  },
  {
    ssr: false,
    loading: () => <div className="draw-loading">Yükleniyor…</div>,
  },
);

export default function DrawLoader() {
  return <DrawApp />;
}
