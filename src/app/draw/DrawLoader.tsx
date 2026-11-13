'use client';

import dynamic from 'next/dynamic';

// Çizim tahtası tarayıcı API'lerine (tuval, IndexedDB) dayanır; sunucuda işlenmez.
const SiteDraw = dynamic(() => import('./SiteDraw'), {
  ssr: false,
  loading: () => <div className="sk-loading">Yükleniyor…</div>,
});

export default function DrawLoader({ handFont }: { handFont: string }) {
  return <SiteDraw handFont={handFont} />;
}
