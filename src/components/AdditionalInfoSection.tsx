import React from 'react';
import { additionalInfo } from '../data/cvData';
import { ChevronRight } from 'lucide-react';

const AdditionalInfoSection: React.FC = () => {
  return (
    <div className="space-y-1.5 text-sm text-gray-800">
      <div className="flex gap-2 items-start">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">İlgi Alanları & Hobiler:</span>
          <span>{additionalInfo.hobbies}</span>
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">Kişisel Yetkinlikler:</span>
          <span>{additionalInfo.competencies}</span>
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">Yetenekler:</span>
          <span>{additionalInfo.skills}</span>
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">Sürücü Belgeleri & SRC:</span>
          <span>{additionalInfo.drivingLicenses}</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
