import type { ReactNode } from 'react';
import { cx } from './cx';

export type BadgeTone = 'neutral' | 'accent' | 'clay' | 'sky' | 'sun' | 'rose';

/**
 * Small mono label. `dot` adds a status dot, `live` pulses it,
 * `code` renders the text as an HTML-style <tag>.
 */
export default function Badge({
  tone = 'neutral',
  dot,
  live,
  code,
  outline,
  icon,
  className,
  children,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  live?: boolean;
  code?: boolean;
  outline?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        'badge',
        tone !== 'neutral' && `badge-${tone}`,
        (dot || live) && 'badge-dot',
        live && 'badge-live',
        code && 'badge-code',
        outline && 'badge-outline',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
