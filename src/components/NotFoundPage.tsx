import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-[#004A99] opacity-20">404</h1>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
        </p>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 bg-[#004A99] text-white rounded-md hover:bg-[#003d80] transition-colors font-medium shadow-md"
        >
          <Home size={20} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
