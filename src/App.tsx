import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation, BlogPost, Footer } from './components';
import { HomePage, EquipmentPage, AboutPage, NotFoundPage, BlogPage } from './pages';
import './styles/reset.css';
import './styles/variables.css';
import './styles/App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Navigation />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ekipmanlar" element={<EquipmentPage />} />
              <Route path="/hakkimda" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
