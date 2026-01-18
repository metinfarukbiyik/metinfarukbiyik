import React from 'react';
import { equipments } from '../data/cvData';

const EquipmentPage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto pt-10 px-4">
      <h1 className="text-3xl font-extrabold text-[#004A99] mb-8 tracking-tight">EKİPMANLARIM</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {equipments.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
              <img 
                src={`/images/equipment/${item.image}`} 
                alt={item.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4 border-t border-gray-50 flex-grow flex flex-col">
              <span className="text-xs font-bold text-[#004A99] uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1 leading-tight">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-snug">{item.specs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPage;
