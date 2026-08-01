import React, { useMemo, useState } from 'react';
import { equipments } from '../data/cvData';
import PageShell from './ui/PageShell';

const ALL = 'Tümü';

const EquipmentPage: React.FC = () => {
  const [active, setActive] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(equipments.map((item) => item.category)))],
    [],
  );

  const visible = active === ALL ? equipments : equipments.filter((item) => item.category === active);

  return (
    <PageShell title="Ekipmanlar" subtitle="Günlük olarak kullandığım cihazlar ve çalışma alanım.">
      <div className="-mx-4 -mt-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {categories.map((category) => {
            const count =
              category === ALL
                ? equipments.length
                : equipments.filter((item) => item.category === category).length;
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all active:scale-95 ${
                  isActive
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-card text-label-secondary ring-1 ring-black/[0.04] hover:bg-fill'
                }`}
              >
                {category}
                <span className={`text-[11px] ${isActive ? 'text-white/70' : 'text-label-tertiary'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {visible.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[14px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] transition-transform active:scale-[0.98]"
          >
            <div className="relative flex h-36 items-center justify-center bg-gradient-to-b from-white to-fill p-5">
              <span className="absolute left-2.5 top-2.5 rounded-full bg-card/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-accent shadow-sm backdrop-blur">
                {item.category}
              </span>
              <img
                src={`/images/equipment/${item.image}`}
                alt={item.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-separator p-3.5">
              <h3 className="text-[14px] font-semibold leading-snug">{item.name}</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-label-secondary">{item.specs}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-[12.5px] text-label-tertiary">
        {visible.length} ekipman gösteriliyor
      </p>
    </PageShell>
  );
};

export default EquipmentPage;
