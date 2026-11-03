import type { CSSProperties, ReactNode } from 'react';

/** Key/value grid used for project facts and technical details. */
export default function DataList({
  items,
  columns = 3,
}: {
  items: { label: string; value: ReactNode }[];
  columns?: number;
}) {
  return (
    <dl className="datalist" style={{ '--cols': columns } as CSSProperties}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
