import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="animate-fade-up flex min-h-[60vh] flex-col items-center justify-center text-center">
    <p className="text-sm font-semibold text-brand-600">404</p>
    <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sayfa bulunamadı</h1>
    <p className="mt-3 max-w-md text-base leading-7 text-gray-600">
      Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
    </p>
    <div className="mt-8 flex items-center gap-3">
      <Link
        to="/"
        className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
      >
        Özgeçmişe dön
      </Link>
      <Link
        to="/projeler"
        className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
      >
        Projeleri gör
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
