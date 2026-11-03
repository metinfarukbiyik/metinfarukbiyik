import type { ReactNode } from 'react';
import { cx } from './cx';
import Heading from './Heading';
import Kicker from './Kicker';

export function SectionHeader({
  id,
  kicker,
  index,
  title,
  description,
  action,
  line,
  as = 'h2',
}: {
  id?: string;
  kicker?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  line?: boolean;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={cx('section-header', line && 'section-header-line')}>
      <div className="section-header-copy">
        {kicker && <Kicker index={index}>{kicker}</Kicker>}
        <Heading as={as} size={as === 'h2' ? '2' : '3'} id={id}>
          {title}
        </Heading>
        {description && <p className="text-small">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** Page section with a consistent header and vertical rhythm. */
export default function Section({
  id,
  kicker,
  index,
  title,
  description,
  action,
  line,
  tight,
  className,
  children,
}: {
  id?: string;
  kicker?: string;
  index?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  line?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-baslik` : undefined;
  return (
    <section
      id={id}
      className={cx(tight ? 'section-tight' : 'section', className)}
      aria-labelledby={title ? headingId : undefined}
    >
      {title && (
        <SectionHeader
          id={headingId}
          kicker={kicker}
          index={index}
          title={title}
          description={description}
          action={action}
          line={line}
        />
      )}
      {children}
    </section>
  );
}
