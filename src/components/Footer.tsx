import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail, HiLocationMarker } from 'react-icons/hi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img 
                src="/profile.jpg" 
                alt="Metin Faruk Biyik" 
                className="footer-profile-image"
              />
              <div className="footer-brand-info">
                <h3>Metin Faruk Bıyık</h3>
                <p>Base Station Technician & Developer</p>
              </div>
            </div>
            <p className="footer-description">
                Yazılım geliştirme ve teknik destek alanlarında aktif olarak çalışıyorum.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul className="footer-links">
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/ekipmanlar">Ekipmanlar</a></li>
              <li><a href="/hakkimda">Hakkımda</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>İletişim</h4>
            <ul className="footer-contact">
              <li>
                <HiMail className="contact-icon" />
                <a href="mailto:metin@biyik.dev">metin@biyik.dev</a>
              </li>
              <li>
                <HiLocationMarker className="contact-icon" />
                <span>Trabzon, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Metin Faruk Biyik. Tüm hakları saklıdır.</p>
            <div className="footer-social">
              <a 
                href="https://github.com/metinfarukbiyik" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-social-link github"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/metinbiyik" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link linkedin"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://x.com/_metinbiyik" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="footer-social-link twitter"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 