import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFoundPage: React.FC = () => (
  <div className="ios-page flex min-h-screen flex-col items-center justify-center px-6 pb-28 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
      <Compass size={38} className="text-accent" strokeWidth={1.8} />
    </div>
    <h1 className="mt-6 text-[28px] font-bold tracking-tight">Sayfa Bulunamadı</h1>
    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-label-secondary">
      Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
    </p>
    <Link
      to="/"
      className="mt-7 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-transform active:scale-95"
    >
      Özgeçmişe Dön
    </Link>
  </div>
);

export default NotFoundPage;
