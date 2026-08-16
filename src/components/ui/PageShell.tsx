import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface PageShellProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  children: React.ReactNode;
}

const PageShell: React.FC<PageShellProps> = ({ title, subtitle, backTo, backLabel, children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-40 backdrop-blur-xl transition-colors duration-200 ${
          scrolled ? 'border-b border-separator bg-grouped/80' : 'border-b border-transparent bg-grouped/60'
        }`}
      >
        <div className="mx-auto flex h-11 w-full max-w-[720px] items-center gap-2 px-4">
          <div className="flex flex-1 justify-start">
            {backTo && (
              <Link
                to={backTo}
                className="-ml-1 flex items-center text-[15px] font-medium text-accent transition-opacity active:opacity-60"
              >
                <ChevronLeft size={20} strokeWidth={2.4} />
                {backLabel ?? 'Geri'}
              </Link>
            )}
          </div>

          <span
            className={`min-w-0 truncate text-center text-[16px] font-semibold transition-opacity duration-200 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {title}
          </span>

          <div className="flex flex-1 justify-end" />
        </div>
      </div>

      <div className="ios-page mx-auto w-full max-w-[720px] px-4 pb-32">
        <div className="pt-3 pb-6">
          <h1 className="text-[34px] font-bold leading-tight tracking-[-0.022em]">{title}</h1>
          {subtitle && <p className="mt-1 text-[15px] text-label-secondary">{subtitle}</p>}
        </div>
        <div className="space-y-7">{children}</div>
      </div>
    </>
  );
};

export default PageShell;
