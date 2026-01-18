import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Section from './components/Section';
import ExperienceList from './components/ExperienceList';
import EducationList from './components/EducationList';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import EquipmentPage from './components/EquipmentPage';
import CertificatesPage from './components/CertificatesPage';
import Footer from './components/Footer';
import { personalInfo } from './data/cvData';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'cv' | 'equipment' | 'certificates'>('cv');

  useEffect(() => {
    const titles = {
      cv: 'Metin Faruk Bıyık | Profesyonel Özgeçmiş',
      equipment: 'Ekipmanlarım | Metin Faruk Bıyık',
      certificates: 'Sertifikalarım | Metin Faruk Bıyık'
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === 'cv' && (
        <div className="pt-10 px-4">
          <div className="max-w-[900px] mx-auto bg-white shadow-2xl p-8 md:p-12 min-h-[1100px]">
            <Header />

        {/* Özet Section */}
        <Section title="ÖZET">
          <p className="text-sm text-gray-800 leading-relaxed text-justify whitespace-pre-line">
            {personalInfo.summary}
          </p>
        </Section>

            {/* Deneyim Section */}
            <Section title="DENEYİM">
              <ExperienceList />
            </Section>

            {/* Eğitim Section */}
            <Section title="EĞİTİM">
              <EducationList />
            </Section>

            {/* Ek Bilgiler Section */}
            <Section title="EK BİLGİLER">
              <AdditionalInfoSection />
            </Section>
          </div>
        </div>
      )}

      {currentPage === 'equipment' && <EquipmentPage />}
      {currentPage === 'certificates' && <CertificatesPage />}
      <Footer />
    </div>
  );
};

export default App;
