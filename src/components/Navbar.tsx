import React from 'react';
import { Mail, Instagram, Linkedin, Camera, FileText, Award, Download } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'cv' | 'equipment' | 'certificates') => void;
  currentPage: 'cv' | 'equipment' | 'certificates';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[900px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {/* ... existing social links ... */}
          <a 
            href="mailto:metin@biyik.dev" 
            className="flex items-center gap-2 text-gray-700 hover:text-[#004A99] transition-colors text-sm font-medium group"
          >
            <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#004A99]/10 transition-colors">
              <Mail size={18} className="text-[#004A99]" />
            </div>
            <span className="hidden md:inline">metin@biyik.dev</span>
          </a>

          <a 
            href="http://instagram.com/_metinbiyik" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-[#E4405F] transition-colors text-sm font-medium group"
          >
            <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#E4405F]/10 transition-colors">
              <Instagram size={18} className="text-[#E4405F]" />
            </div>
            <span className="hidden sm:inline">Instagram</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/metinbiyik/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-[#0A66C2] transition-colors text-sm font-medium group"
          >
            <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#0A66C2]/10 transition-colors">
              <Linkedin size={18} className="text-[#0A66C2]" />
            </div>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a 
            href="/cv/metinfarukbiyik-cv.pdf" 
            download
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium shadow-sm mr-2"
          >
            <Download size={18} />
            <span className="hidden lg:inline">CV İndir</span>
          </a>

          <button 
            className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              currentPage === 'cv' 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => onNavigate('cv')}
          >
            <FileText size={18} />
            <span className="hidden xs:inline">Özgeçmiş</span>
          </button>

          <button 
            className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              currentPage === 'certificates' 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => onNavigate('certificates')}
          >
            <Award size={18} />
            <span className="hidden xs:inline">Sertifikalar</span>
          </button>

          <button 
            className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              currentPage === 'equipment' 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => onNavigate('equipment')}
          >
            <Camera size={18} />
            <span className="hidden xs:inline">Ekipmanlar</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
