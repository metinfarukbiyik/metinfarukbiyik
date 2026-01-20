import React from 'react';
import { experiences } from '../data/cvData';
import { ChevronRight } from 'lucide-react';

const ExperienceList: React.FC = () => {
  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div key={index}>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 uppercase">
              {exp.company}
            </h3>
            <span className="font-bold text-gray-900 whitespace-nowrap ml-4">{exp.period}</span>
          </div>
          <p className="text-sm italic text-gray-700 mb-1 leading-tight">{exp.role}</p>
          <ul className="space-y-0.5 text-sm text-gray-800">
            {exp.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2 leading-tight">
                <ChevronRight size={14} className="text-[#004A99] mt-0.5 shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceList;
