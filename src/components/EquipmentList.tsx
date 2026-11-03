'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Segmented } from '@/components/ui';
import { equipments } from '@/data/cvData';

const ALL = 'Tümü';
const categories = [ALL, ...Array.from(new Set(equipments.map((item) => item.category)))];

export default function EquipmentList() {
  const [category, setCategory] = useState(ALL);
  const visible = category === ALL ? equipments : equipments.filter((item) => item.category === category);

  return (
    <>
      <Segmented
        label="Ekipman kategorileri"
        value={category}
        onChange={setCategory}
        options={categories.map((item) => ({ value: item, label: item }))}
      />
      <ul className="equipment-grid">
        {visible.map((item) => (
          <li key={item.id} className="equipment-item">
            <div className="equipment-image">
              <Image
                src={`/images/equipment/${item.image}`}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 200px, 45vw"
              />
            </div>
            <span className="text-meta">{item.category}</span>
            <h3 className="title-4">{item.name}</h3>
            <p className="text-small">{item.specs}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
