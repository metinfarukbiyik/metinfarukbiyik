import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TabBar from './components/TabBar';
import Header from './components/Header';
import PageShell from './components/ui/PageShell';
import GroupedSection from './components/ui/GroupedSection';
import ListRow from './components/ui/ListRow';
import ExperienceList from './components/ExperienceList';
import EducationList from './components/EducationList';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import EquipmentPage from './components/EquipmentPage';
import CertificatesPage from './components/CertificatesPage';
import ProjectsPage from './components/ProjectsPage';
import GeoCamPage from './components/GeoCamPage';
import NotFoundPage from './components/NotFoundPage';
import { personalInfo } from './data/cvData';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

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
      'GeoCam: Audit — SwiftUI ile geliştirilen, fotoğraf ve videoya konum, adres, pusula ve iş bilgisi damgalayan profesyonel saha denetim kamerası. Tamamen cihaz içi çalışır.',
    keywords:
      'GeoCam Audit, iOS uygulaması, SwiftUI, Swift 6, saha denetim kamerası, konum damgası, filigran, Metin Faruk Bıyık',
    image: 'https://biyik.dev/images/geocam.png',
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

const CVPage: React.FC = () => (
  <PageShell title="Özgeçmiş">
    <Header />

    <GroupedSection title="İletişim">
      <ListRow icon={MapPin} iconColor="bg-ios-red" title="Adres" subtitle={personalInfo.address} />
      <ListRow
        icon={Phone}
        iconColor="bg-ios-green"
        title="Telefon"
        subtitle={personalInfo.phone}
        href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}
      />
      <ListRow
        icon={Mail}
        iconColor="bg-accent"
        title="E-Posta"
        subtitle={personalInfo.email}
        href={`mailto:${personalInfo.email}`}
      />
      <ListRow
        icon={Globe}
        iconColor="bg-ios-indigo"
        title="Web"
        subtitle={personalInfo.web}
        href={`https://${personalInfo.web}`}
        external
      />
    </GroupedSection>

    <GroupedSection title="Hakkımda">
      <p className="whitespace-pre-line px-4 py-4 text-[14.5px] leading-relaxed text-label-secondary">
        {personalInfo.summary}
      </p>
    </GroupedSection>

    <GroupedSection title="Deneyim">
      <ExperienceList />
    </GroupedSection>

    <GroupedSection title="Eğitim">
      <EducationList />
    </GroupedSection>

    <GroupedSection title="Ek Bilgiler">
      <AdditionalInfoSection />
    </GroupedSection>
  </PageShell>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-grouped">
        <RouteEffects />
        <main>
          <Routes>
            <Route path="/" element={<CVPage />} />
            <Route path="/ekipmanlar" element={<EquipmentPage />} />
            <Route path="/sertifikalar" element={<CertificatesPage />} />
            <Route path="/projeler" element={<ProjectsPage />} />
            <Route path="/geocam" element={<GeoCamPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <TabBar />
      </div>
    </Router>
  );
};

export default App;
