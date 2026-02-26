import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Section from './components/Section';
import ExperienceList from './components/ExperienceList';
import EducationList from './components/EducationList';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import EquipmentPage from './components/EquipmentPage';
import CertificatesPage from './components/CertificatesPage';
import NotFoundPage from './components/NotFoundPage';
import Footer from './components/Footer';
import { personalInfo } from './data/cvData';

const SEOUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seoData: Record<string, { title: string; description: string; keywords: string }> = {
      '/': {
        title: 'Metin Faruk Bıyık | Profesyonel Özgeçmiş',
        description: 'Metin Faruk Bıyık\'ın profesyonel özgeçmişi, iş deneyimleri ve kariyer özeti. Müşteri deneyimi ve ekip yönetimi profesyoneli.',
        keywords: 'Metin Faruk Bıyık, özgeçmiş, CV, müşteri temsilcisi, ekip yönetimi, Trabzon'
      },
      '/ekipmanlar': {
        title: 'Ekipmanlarım | Metin Faruk Bıyık',
        description: 'Metin Faruk Bıyık\'ın kullandığı teknik ekipmanlar, çalışma alanı ve teknolojik araçlar.',
        keywords: 'Metin Faruk Bıyık, ekipmanlar, çalışma alanı, setup, teknoloji, MacBook Air M4'
      },
      '/sertifikalar': {
        title: 'Sertifikalarım | Metin Faruk Bıyık',
        description: 'Metin Faruk Bıyık\'ın kariyeri boyunca kazandığı sertifikalar ve başarı belgeleri.',
        keywords: 'Metin Faruk Bıyık, sertifikalar, eğitimler, başarı belgeleri, Turkcell Akademi, BTK Akademi'
      }
    };

    const currentSEO = seoData[location.pathname] || {
      title: 'Metin Faruk Bıyık',
      description: 'Metin Faruk Bıyık - Profesyonel Portfolyo ve Özgeçmiş',
      keywords: 'Metin Faruk Bıyık, CV, Portfolyo'
    };

    // Title güncelleme
    document.title = currentSEO.title;

    // Meta Description güncelleme
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }

    // Meta Keywords güncelleme
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    }

    // Open Graph Title & Description güncelleme
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSEO.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSEO.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentSEO.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', currentSEO.description);

  }, [location]);

  return null;
};

const CVPage: React.FC = () => (
  <div className="pt-10 px-4">
    <div className="max-w-[900px] mx-auto bg-white shadow-2xl p-8 md:p-12 min-h-[1100px]">
      <Header />
      <Section title="ÖZET">
        <p className="text-sm text-gray-800 leading-relaxed text-justify whitespace-pre-line">
          {personalInfo.summary}
        </p>
      </Section>
      <Section title="DENEYİM">
        <ExperienceList />
      </Section>
      <Section title="EĞİTİM">
        <EducationList />
      </Section>
      <Section title="EK BİLGİLER">
        <AdditionalInfoSection />
      </Section>
    </div>
  </div>
);

const App: React.FC = () => {
  useEffect(() => {
    // Sağ tıklamayı engelle
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Klavye kısayollarını engelle (F12, Ctrl+Shift+I, Ctrl+U, vb.)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.altKey && e.key === 'i')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <SEOUpdater />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CVPage />} />
            <Route path="/ekipmanlar" element={<EquipmentPage />} />
            <Route path="/sertifikalar" element={<CertificatesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
