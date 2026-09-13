'use client';

import { useMemo, useState } from 'react';
import { Award, Building2, Calendar } from 'lucide-react';
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
      <div className="mt-8 flex flex-wrap gap-2">
        {issuers.map((item) => {
          const isActive = item === issuer;
          const count =
            item === ALL ? certificates.length : certificates.filter((c) => c.issuer === item).length;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setIssuer(item)}
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visible.map((cert) => (
          <div
            key={cert.id}
            className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Award size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">{cert.title}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 size={13} />
                  {cert.issuer}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} />
                  {cert.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CertificateList;
