import React from 'react';
import { certificates } from '../data/cvData';
import PageShell from './ui/PageShell';
import GroupedSection from './ui/GroupedSection';
import ListRow from './ui/ListRow';
import { Award } from 'lucide-react';

const CertificatesPage: React.FC = () => (
  <PageShell title="Sertifikalar" subtitle={`${certificates.length} eğitim ve başarı belgesi.`}>
    <GroupedSection title="Belgelerim">
      {certificates.map((cert) => (
        <ListRow
          key={cert.id}
          icon={Award}
          iconColor="bg-ios-orange"
          title={cert.title}
          subtitle={cert.issuer}
          trailing={<span className="text-[12.5px] font-medium text-label-tertiary">{cert.date}</span>}
        />
      ))}
    </GroupedSection>
  </PageShell>
);

export default CertificatesPage;
