import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full pb-12 pt-2 px-4 mt-auto">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs text-gray-500 font-medium italic">
          Bu Özgeçmiş dosyası <a href="https://biyik.dev" target="_blank" rel="noopener noreferrer" className="text-[#004A99] underline decoration-dashed underline-offset-4 hover:opacity-80 transition-opacity">Metin Faruk Bıyık</a> tarafından tasarlanıp kodlanmıştır
        </p>
      </div>
    </footer>
  );
};

export default Footer;
