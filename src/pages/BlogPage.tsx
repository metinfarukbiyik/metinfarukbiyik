import { SEOHead } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';

export function BlogPage() {
  const seo = generatePageSEO('blog');
  usePageTitle(seo.title);

  return (
    <>
      <SEOHead seo={seo} />
      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <h1>Blog</h1>
          <p className="blog-description">
            Kişisel deneyimlerim, öğrenme sürecim ve teknik keşiflerim üzerine yazılar.
          </p>
        </section>

        {/* Under Construction */}
        <div className="blog-content">
          <div className="under-construction">
            <div className="construction-icon">🚧</div>
            <h2>Yakında Yayında</h2>
            <p>
              Bu alanda kişisel deneyimlerimi, öğrenme sürecimi ve keşiflerimi paylaşacağım. 
              Yazılım geliştirme, problem çözme ve günlük yaşamdan öğrendiklerimi 
              içeren yazılar yayınlanacak.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 