import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Instagram, Linkedin, Award, Download, FileText, Briefcase, LayoutGrid } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[900px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mail Button */}
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
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-sm font-bold shadow-md hover:shadow-lg active:scale-95 mr-2 group"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            <span className="hidden lg:inline">CV İNDİR</span>
          </a>

          <NavLink 
            to="/"
            className={({ isActive }) => `flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              isActive 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <FileText size={18} />
            <span className="hidden xs:inline">Özgeçmiş</span>
          </NavLink>

          <NavLink 
            to="/projeler"
            className={({ isActive }) => `flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              isActive 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <LayoutGrid size={18} />
            <span className="hidden xs:inline">Projeler</span>
          </NavLink>

          <NavLink 
            to="/sertifikalar"
            className={({ isActive }) => `flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              isActive 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Award size={18} />
            <span className="hidden xs:inline">Sertifikalar</span>
          </NavLink>

          <NavLink 
            to="/ekipmanlar"
            className={({ isActive }) => `flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md transition-colors text-sm font-medium shadow-sm border ${
              isActive 
              ? 'bg-[#004A99] text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Briefcase size={18} />
            <span className="hidden xs:inline">Ekipmanlar</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
