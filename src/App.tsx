import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import GeoCamPage from './pages/GeoCamPage';
import CertificatesPage from './pages/CertificatesPage';
import EquipmentPage from './pages/EquipmentPage';
import NotFoundPage from './pages/NotFoundPage';

const seoData: Record<
  string,
  { title: string; description: string; keywords: string; image?: string }
> = {
  '/': {
    title: 'Metin Faruk Bıyık | Kişisel',
    description:
      "Metin Faruk Bıyık'ın profesyonel özgeçmişi, iş deneyimleri ve kariyer özeti. Müşteri deneyimi ve ekip yönetimi profesyoneli.",
    keywords: 'Metin Faruk Bıyık, özgeçmiş, CV, müşteri temsilcisi, ekip yönetimi, Trabzon',
  },
  '/ekipmanlar': {
    title: 'Metin Faruk Bıyık | Ekipmanlar',
    description: "Metin Faruk Bıyık'ın kullandığı teknik ekipmanlar, çalışma alanı ve teknolojik araçlar.",
    keywords: 'Metin Faruk Bıyık, ekipmanlar, çalışma alanı, setup, teknoloji, MacBook Air M4',
  },
  '/sertifikalar': {
    title: 'Metin Faruk Bıyık | Sertifikalar',
    description: "Metin Faruk Bıyık'ın kariyeri boyunca kazandığı sertifikalar ve başarı belgeleri.",
    keywords: 'Metin Faruk Bıyık, sertifikalar, eğitimler, başarı belgeleri, Turkcell Akademi, BTK Akademi',
  },
  '/projeler': {
    title: 'Metin Faruk Bıyık | Projeler',
    description: "Metin Faruk Bıyık'ın geliştirdiği projeler ve referanslar.",
    keywords:
      'Metin Faruk Bıyık, projeler, referanslar, biyik.dev, elifogretmen.com.tr, bayen.com.tr, cnliletisim.com',
  },
  '/geocam': {
    title: 'Metin Faruk Bıyık | GeoCam: Audit',
    description:
      'GeoCam: Audit — App Store’da yayınlanan konum doğrulamalı saha ve denetim kamerası. Fotoğraflara GPS, adres, pusula ve iş bilgisi damgalar.',
    keywords:
      'GeoCam Audit, App Store, iOS uygulaması, GPS kamera, saha denetim kamerası, konum damgası, Metin Faruk Bıyık',
    image: 'https://biyik.dev/images/geocam/icon.png',
  },
};

const setMeta = (selector: string, content: string) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
};

const RouteEffects: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = seoData[location.pathname] ?? {
      title: 'Metin Faruk Bıyık | Kişisel',
      description: 'Metin Faruk Bıyık - Profesyonel Portfolyo ve Özgeçmiş',
      keywords: 'Metin Faruk Bıyık, CV, Portfolyo',
    };

    document.title = seo.title;
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[name="keywords"]', seo.keywords);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="twitter:title"]', seo.title);
    setMeta('meta[property="twitter:description"]', seo.description);
    setMeta('meta[property="og:image"]', seo.image ?? 'https://biyik.dev/og-image.jpg');
    setMeta('meta[property="twitter:image"]', seo.image ?? 'https://biyik.dev/og-image.jpg');

    window.scrollTo({ top: 0 });
  }, [location]);

  return null;
};

const App: React.FC = () => (
  <Router>
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <RouteEffects />
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeler" element={<ProjectsPage />} />
          <Route path="/geocam" element={<GeoCamPage />} />
          <Route path="/sertifikalar" element={<CertificatesPage />} />
          <Route path="/ekipmanlar" element={<EquipmentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
