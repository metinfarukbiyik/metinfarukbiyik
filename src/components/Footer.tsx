import { personalInfo } from '@/data/cvData';

const Footer = () => (
  <footer className="mt-20 border-t border-border">
    <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <p className="font-mono text-xs text-subtle">
        © {new Date().getFullYear()} {personalInfo.name}
      </p>
      <p className="font-mono text-xs text-subtle">Trabzon</p>
    </div>
  </footer>
);

export default Footer;
