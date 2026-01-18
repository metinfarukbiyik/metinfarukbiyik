import React from 'react';
import { certificates } from '../data/cvData';
import { Award, Calendar, Building2 } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto pt-10 px-4">
      <h1 className="text-3xl font-extrabold text-[#004A99] mb-8 tracking-tight">SERTİFİKALARIM</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#004A99] hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                <Award className="text-[#004A99]" size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{cert.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 size={14} />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesPage;
