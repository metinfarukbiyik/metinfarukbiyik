import React from 'react';
import { personalInfo } from '../data/cvData';
import myPhoto from '../assets/images/my.png';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
      <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
        <img 
          src={myPhoto} 
          alt={personalInfo.name} 
          className="w-full h-full object-cover rounded-full shadow-lg border-2 border-[#004A99]/10"
        />
      </div>
      <div className="flex-grow">
        <h1 className="text-4xl font-extrabold text-[#004A99] mb-4 tracking-tight">{personalInfo.name}</h1>
        <div className="flex flex-col gap-1 text-sm text-gray-800">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#004A99] mt-0.5 shrink-0" />
            <div className="flex gap-2">
              <span className="font-bold min-w-[60px]">Adres:</span>
              <span>{personalInfo.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#004A99] shrink-0" />
            <div className="flex gap-2">
              <span className="font-bold min-w-[60px]">Telefon:</span>
              <span>{personalInfo.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#004A99] shrink-0" />
            <div className="flex gap-2">
              <span className="font-bold min-w-[60px]">E-Posta:</span>
              <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-[#004A99] shrink-0" />
            <div className="flex gap-2">
              <span className="font-bold min-w-[60px]">Web:</span>
              <a href={`https://${personalInfo.web}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{personalInfo.web}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
