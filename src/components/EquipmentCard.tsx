import type { EquipmentItem } from '../types';

interface EquipmentCardProps {
  equipment: EquipmentItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <div className="equipment-card">
      <div className="equipment-icon">
        <img 
          src={equipment.image} 
          alt={equipment.name}
          className="equipment-image"
        />
      </div>
      <div className="equipment-content">
        <h3 className="equipment-name">{equipment.name}</h3>
        <p className="equipment-description">{equipment.description}</p>
      </div>
    </div>
  );
} 