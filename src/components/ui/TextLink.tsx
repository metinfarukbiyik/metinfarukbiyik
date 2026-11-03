import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cx } from './cx';

/** Underline-on-hover link. External links get the ↗ marker and open in a new tab. */
export default function TextLink({
  href,
  external,
  arrow,
  quiet,
  underline,
  className,
  children,
  ...props
}: {
  href: string;
  external?: boolean;
  arrow?: boolean;
  quiet?: boolean;
  underline?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<'a'>, 'href'>) {
  const classes = cx('link', quiet && 'link-quiet', underline && 'link-underline', className);
  const isExternal = external ?? /^https?:\/\//.test(href);
  const body = (
    <>
      {children}
      {isExternal ? (
        <ArrowUpRight className="link-arrow-up" aria-hidden="true" />
      ) : (
        arrow && <ArrowRight className="link-arrow" aria-hidden="true" />
      )}
      {isExternal && <span className="sr-only"> (yeni sekmede açılır)</span>}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {body}
      </a>
    );
  }
  if (href.startsWith('/') && !href.startsWith('/cv/')) {
    return (
      <Link href={href} className={classes} {...props}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {body}
    </a>
  );
}
