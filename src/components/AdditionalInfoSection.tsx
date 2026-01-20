import React from 'react';
import { additionalInfo } from '../data/cvData';
import { ChevronRight } from 'lucide-react';

const AdditionalInfoSection: React.FC = () => {
  return (
    <div className="space-y-2 text-sm text-gray-800">
      <div className="flex items-start gap-2">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="leading-normal">
          <span className="font-bold">İlgi Alanları & Hobiler: </span>
          <span>{additionalInfo.hobbies}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="leading-normal">
          <span className="font-bold">Kişisel Yetkinlikler: </span>
          <span>{additionalInfo.competencies}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="leading-normal">
          <span className="font-bold">Yetenekler: </span>
          <span>{additionalInfo.skills}</span>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <ChevronRight size={14} className="text-[#004A99] mt-1 shrink-0" />
        <div className="leading-normal">
          <span className="font-bold">Sürücü Belgeleri & SRC: </span>
          <span>{additionalInfo.drivingLicenses}</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
