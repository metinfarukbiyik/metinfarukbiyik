'use client';

import dynamic from 'next/dynamic';

// Çizim tahtası tarayıcı API'lerine (tuval, IndexedDB) dayanır; sunucuda işlenmez.
const DrawApp = dynamic(() => import('./DrawApp'), {
  ssr: false,
  loading: () => <div className="sk-loading">Yükleniyor…</div>,
});

export default function DrawLoader({ handFont }: { handFont: string }) {
  return <DrawApp handFont={handFont} />;
}
