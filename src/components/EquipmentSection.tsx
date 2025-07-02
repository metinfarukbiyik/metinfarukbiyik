import { equipmentData } from '../data/equipment';
import { EquipmentCard } from './EquipmentCard';

export function EquipmentSection() {
  return (
    <section id="equipment" className="equipment-section">
      <div className="section-header">
        <h2>Ekipmanlarım</h2>
        <p className="section-description">
          Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek 
          için kullandığım teknolojiler, araçlar ve ürünler.
        </p>
      </div>
      
      <div className="equipment-grid">
        {equipmentData.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </section>
  );
} 