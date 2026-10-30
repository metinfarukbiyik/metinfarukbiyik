import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => (
  <div className="site-shell">
    <a href="#main-content" className="skip-link">İçeriğe geç</a>
    <Navbar />
    <main id="main-content" className="main-panel not-found-content">
      <Search size={28} className="mx-auto text-brand-600" aria-hidden="true" />
      <p className="eyebrow justify-center">404 / Sayfa bulunamadı</p>
      <h1>Burada bir sayfa yok.</h1>
      <p>Aradığın sayfa taşınmış veya silinmiş olabilir. Ana sayfadan ya da projelerden devam edebilirsin.</p>
      <div className="download-actions">
        <Link href="/" className="pill-button primary-button"><ArrowLeft size={15} aria-hidden="true" /> Ana sayfaya dön</Link>
        <Link href="/projeler" className="pill-button">Projeleri incele</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
