import type { ReactNode } from 'react';
import { cx } from './cx';

/** The `// label` line that introduces a heading. */
export default function Kicker({
  index,
  className,
  children,
}: {
  index?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cx('kicker', className)}>
      {index && <span className="kicker-index">{index}</span>}
      {children}
    </p>
  );
}
