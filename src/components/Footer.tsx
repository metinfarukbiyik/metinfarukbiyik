import { personalInfo } from '@/data/cvData';
import { Github, Linkedin, Mail } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <span>Trabzon, Türkiye</span>
      </div>
      <div className="footer-links">
        <a
          href="https://github.com/metinfarukbiyik"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={17} />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={17} />
        </a>
        <a href={`mailto:${personalInfo.email}`} aria-label="E-posta">
          <Mail size={17} />
        </a>
      </div>
    </footer>
  );
}
