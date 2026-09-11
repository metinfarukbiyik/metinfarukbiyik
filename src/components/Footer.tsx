import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/cvData';

const links = [
  { name: 'Özgeçmiş', to: '/' },
  { name: 'Projeler', to: '/projeler' },
  { name: 'Sertifikalar', to: '/sertifikalar' },
  { name: 'Ekipmanlar', to: '/ekipmanlar' },
];

const Footer: React.FC = () => (
  <footer className="mt-20 border-t border-gray-200 bg-white">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="E-posta"
        >
          <Mail size={20} />
        </a>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
