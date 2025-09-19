import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation, Footer } from './components';
import { HomePage, EquipmentPage, AboutPage, NotFoundPage } from './pages';
import './styles/reset.css';
import './styles/variables.css';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <Navigation />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ekipmanlar" element={<EquipmentPage />} />
          <Route path="/hakkimda" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
