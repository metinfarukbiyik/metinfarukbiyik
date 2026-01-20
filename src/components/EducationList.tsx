import React from 'react';
import { educations } from '../data/cvData';
import { ChevronRight } from 'lucide-react';

const EducationList: React.FC = () => {
  return (
    <div className="space-y-4">
      {educations.map((edu, index) => (
        <div key={index}>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 uppercase">
              {edu.school}
            </h3>
            <span className="font-bold text-gray-900 whitespace-nowrap ml-4">{edu.period}</span>
          </div>
          <p className="text-sm italic text-gray-700 mb-1 leading-tight">{edu.department}</p>
          <ul className="space-y-0.5 text-sm text-gray-800">
            {edu.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 leading-tight">
                <ChevronRight size={14} className="text-[#004A99] mt-0.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EducationList;
