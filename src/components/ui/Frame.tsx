import type { ReactNode } from 'react';
import { cx } from './cx';

/** A quiet browser window: traffic-light dots, a mono title and a body. */
export default function Frame({
  title,
  meta,
  flush,
  sunken,
  as: Tag = 'div',
  className,
  bodyClassName,
  children,
  ...props
}: {
  title?: ReactNode;
  meta?: ReactNode;
  flush?: boolean;
  sunken?: boolean;
  as?: 'div' | 'section' | 'figure' | 'aside';
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) {
  return (
    <Tag className={cx('frame', flush && 'frame-flush', sunken && 'frame-sunken', className)} {...props}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="frame-title">{title}</span>
        <span className="frame-meta">{meta}</span>
      </div>
      <div className={cx('frame-body', bodyClassName)}>{children}</div>
    </Tag>
  );
}
