import React, { useMemo, useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { equipments } from '../data/cvData';

const ALL = 'Tümü';

const EquipmentPage: React.FC = () => {
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(equipments.map((item) => item.category)))],
    [],
  );

  const visible = category === ALL ? equipments : equipments.filter((item) => item.category === category);

  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Çalışma alanı"
        title="Ekipmanlar"
        description="Günlük olarak kullandığım cihazlar ve teknik donanımlar."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => {
          const isActive = item === category;
          const count = item === ALL ? equipments.length : equipments.filter((e) => e.category === item).length;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              {item}
              <span className={isActive ? 'text-white/70' : 'text-gray-400'}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {visible.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
          >
            <div className="flex h-40 items-center justify-center bg-gray-50 p-6">
              <img
                src={`/images/equipment/${item.image}`}
                alt={item.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-gray-100 p-4">
              <p className="text-xs font-medium text-brand-600">{item.category}</p>
              <h3 className="mt-1 text-sm font-semibold leading-6 text-gray-900">{item.name}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">{item.specs}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPage;
