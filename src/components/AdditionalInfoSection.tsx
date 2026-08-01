import React from 'react';
import { additionalInfo } from '../data/cvData';
import ListRow from './ui/ListRow';
import { Heart, Sparkles, Wrench, Car } from 'lucide-react';

const items = [
  { icon: Heart, color: 'bg-ios-pink', label: 'İlgi Alanları & Hobiler', value: additionalInfo.hobbies },
  { icon: Sparkles, color: 'bg-ios-orange', label: 'Kişisel Yetkinlikler', value: additionalInfo.competencies },
  { icon: Wrench, color: 'bg-ios-teal', label: 'Yetenekler', value: additionalInfo.skills },
  { icon: Car, color: 'bg-ios-green', label: 'Sürücü Belgeleri & SRC', value: additionalInfo.drivingLicenses },
];

const AdditionalInfoSection: React.FC = () => (
  <>
    {items.map(({ icon, color, label, value }) => (
      <ListRow key={label} icon={icon} iconColor={color} title={label} subtitle={value} />
    ))}
  </>
);

export default AdditionalInfoSection;
