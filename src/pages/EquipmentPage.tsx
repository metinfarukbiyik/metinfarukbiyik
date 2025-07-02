import { useEffect } from 'react';
import { EquipmentSection, SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';

export function EquipmentPage() {
  const seo = generatePageSEO('equipment');
  
  // Custom hook ile title setting
  usePageTitle(seo.title);

  useEffect(() => {
    console.log('EquipmentPage mounted, SEO data:', seo);
  }, [seo]);

  return (
    <>
      <SEOHead seo={seo} />
      <EquipmentSection />
    </>
  );
} 