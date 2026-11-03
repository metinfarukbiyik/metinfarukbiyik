'use client';

import { useState } from 'react';
import { Award } from 'lucide-react';
import { Segmented } from '@/components/ui';
import { certificates } from '@/data/cvData';

const ALL = 'Tümü';
const issuers = [ALL, ...Array.from(new Set(certificates.map((cert) => cert.issuer)))];

export default function CertificateList() {
  const [issuer, setIssuer] = useState(ALL);
  const visible = issuer === ALL ? certificates : certificates.filter((cert) => cert.issuer === issuer);

  return (
    <>
      <Segmented
        label="Sertifika kurumları"
        value={issuer}
        onChange={setIssuer}
        options={issuers.map((item) => ({
          value: item,
          label: item,
          count:
            item === ALL ? certificates.length : certificates.filter((c) => c.issuer === item).length,
        }))}
      />
      <ul className="cert-list">
        {visible.map((cert) => (
          <li key={cert.id}>
            <Award aria-hidden="true" />
            <h3 className="title-4">{cert.title}</h3>
            <span className="text-meta">
              {cert.issuer} · {cert.date}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
