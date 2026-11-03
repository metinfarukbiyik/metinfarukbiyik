import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cx } from './cx';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  iconOnly?: boolean;
}

/** Shared class builder so non-React markup (and tool widgets) stay on the same scale. */
export function buttonClass({
  variant = 'secondary',
  size = 'md',
  block,
  iconOnly,
}: ButtonStyleProps = {}) {
  return cx(
    'btn',
    variant !== 'secondary' && `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    block && 'btn-block',
    iconOnly && 'btn-icon',
  );
}

type Trailing = 'arrow' | 'external' | ReactNode;

function TrailingIcon({ trailing }: { trailing?: Trailing }) {
  if (trailing === 'arrow') return <ArrowRight className="btn-arrow" aria-hidden="true" />;
  if (trailing === 'external')
    return <ArrowUpRight className="btn-arrow btn-arrow-up" aria-hidden="true" />;
  return <>{trailing}</>;
}

interface ContentProps {
  icon?: ReactNode;
  trailing?: Trailing;
  children?: ReactNode;
}

function Content({ icon, trailing, children }: ContentProps) {
  return (
    <>
      {icon}
      {children}
      <TrailingIcon trailing={trailing} />
    </>
  );
}

export function Button({
  variant,
  size,
  block,
  iconOnly,
  icon,
  trailing,
  className,
  children,
  type = 'button',
  ...props
}: ButtonStyleProps & ContentProps & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={cx(buttonClass({ variant, size, block, iconOnly }), className)}
      {...props}
    >
      <Content icon={icon} trailing={trailing}>
        {children}
      </Content>
    </button>
  );
}

/**
 * Link styled as a button. Internal paths use next/link; `external` opens a new tab
 * and announces it to screen readers.
 */
export function ButtonLink({
  href,
  variant,
  size,
  block,
  iconOnly,
  icon,
  trailing,
  external,
  download,
  className,
  children,
  ...props
}: ButtonStyleProps &
  ContentProps & { href: string; external?: boolean; download?: boolean | string } & Omit<
    ComponentProps<'a'>,
    'href' | 'download'
  >) {
  const classes = cx(buttonClass({ variant, size, block, iconOnly }), className);
  const body = (
    <Content icon={icon} trailing={trailing === undefined && external ? 'external' : trailing}>
      {children}
      {external && <span className="sr-only"> (yeni sekmede açılır)</span>}
    </Content>
  );
  const isInternal = href.startsWith('/') && !external && !download && !href.startsWith('/cv/');
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {body}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {body}
    </a>
  );
}
