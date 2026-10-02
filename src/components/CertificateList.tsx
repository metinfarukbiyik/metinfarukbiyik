'use client';

import { useMemo, useState } from 'react';
import { certificates } from '@/data/cvData';

const ALL = 'Tümü';

const CertificateList = () => {
  const [issuer, setIssuer] = useState(ALL);

  const issuers = useMemo(
    () => [ALL, ...Array.from(new Set(certificates.map((cert) => cert.issuer)))],
    [],
  );

  const visible = issuer === ALL ? certificates : certificates.filter((cert) => cert.issuer === issuer);

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {issuers.map((item) => {
          const isActive = item === issuer;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setIssuer(item)}
              className={`font-mono text-[11px] ${isActive ? 'text-fg' : 'text-subtle hover:text-fg'}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 divide-y divide-border border-y border-border">
        {visible.map((cert) => (
          <li
            key={cert.id}
            className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <h3 className="text-sm text-fg">{cert.title}</h3>
            <p className="shrink-0 font-mono text-[11px] text-subtle">
              {cert.issuer} · {cert.date}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CertificateList;
