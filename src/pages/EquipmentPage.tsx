import { SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';
import { equipmentData } from '../data/equipment';

export function EquipmentPage() {
  const seo = generatePageSEO('equipment');
  usePageTitle(seo.title);

  return (
    <>
      <SEOHead seo={seo} />
      <div className="equipment-page">
        {/* Hero Section */}
        <section className="equipment-hero">
          <h1>Ekipmanlarım</h1>
          <p className="equipment-description">
            Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek 
            için kullandığım teknolojiler, araçlar ve ürünler.
          </p>
        </section>

        {/* Equipment Grid */}
        <div className="equipment-content">
          <div className="equipment-grid">
            {equipmentData.map((item) => (
              <div key={item.id} className="equipment-item">
                <div className="equipment-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="equipment-image"
                  />
                </div>
                <div className="equipment-info">
                  <span className="equipment-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="equipment-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 