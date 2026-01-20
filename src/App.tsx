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

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Metin Faruk Bıyık | Profesyonel Özgeçmiş',
      '/ekipmanlar': 'Ekipmanlarım | Metin Faruk Bıyık',
      '/sertifikalar': 'Sertifikalarım | Metin Faruk Bıyık'
    };
    document.title = titles[location.pathname] || 'Metin Faruk Bıyık';
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
        <TitleUpdater />
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
