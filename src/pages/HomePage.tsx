import { PageHeader, AboutSection, SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
  const seo = generatePageSEO('home');
  
  // Custom hook ile title setting
  usePageTitle(seo.title);

  return (
    <>
      <SEOHead seo={seo} />
      <section id="home" className="hero">
        <PageHeader />
      </section>
      <AboutSection />
    </>
  );
} 