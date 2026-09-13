import Link from 'next/link';
import { Linkedin, Mail, Rss } from 'lucide-react';
import { personalInfo } from '@/data/cvData';
import { navigation } from '@/lib/site';

const Footer = () => (
  <footer className="mt-20 border-t border-gray-200 bg-white">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            {item.name}
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
        <a
          href="/feed.xml"
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="RSS akışı"
        >
          <Rss size={20} />
        </a>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
