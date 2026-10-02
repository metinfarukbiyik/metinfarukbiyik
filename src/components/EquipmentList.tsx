'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { equipments } from '@/data/cvData';

const ALL = 'Tümü';

const EquipmentList = () => {
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(equipments.map((item) => item.category)))],
    [],
  );

  const visible = category === ALL ? equipments : equipments.filter((item) => item.category === category);

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {categories.map((item) => {
          const isActive = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`font-mono text-[11px] ${isActive ? 'text-fg' : 'text-subtle hover:text-fg'}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {visible.map((item) => (
          <article key={item.id}>
            <div className="relative h-24">
              <Image
                src={`/images/equipment/${item.image}`}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 180px, 45vw"
                className="object-contain"
              />
            </div>
            <p className="mt-2 font-mono text-[11px] text-subtle">{item.category}</p>
            <h3 className="mt-1 text-sm text-fg">{item.name}</h3>
            <p className="mt-1 text-xs leading-5 text-muted">{item.specs}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default EquipmentList;
