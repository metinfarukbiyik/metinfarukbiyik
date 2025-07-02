import { Link } from 'react-router-dom';
import { SEOHead } from '../components';

export function NotFoundPage() {
  const seo = {
    title: "Sayfa Bulunamadı | Metin Faruk Bıyık - Teknisyen",
    description: "Aradığınız sayfa bulunamadı. Ana sayfaya geri dönmek için lütfen tıklayın.",
    keywords: "404, sayfa bulunamadı, hata",
    url: "https://biyik.dev/404",
    type: "website" as const,
    author: "Metin Faruk Bıyık"
  };

  return (
    <>
      <SEOHead seo={seo} />
      <section className="not-found-section">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Sayfa Bulunamadı</h1>
          <p>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              Ana Sayfaya Dön
            </Link>
            <Link to="/hakkimda" className="btn-secondary">
              Hakkımda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 