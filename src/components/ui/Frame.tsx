import type { ReactNode } from 'react';
import { cx } from './cx';

export type FrameTab = {
  /** Dosya adı, ör. 'banner.png'. */
  label: string;
  icon?: ReactNode;
  /** Kaydedilmemiş dosya: adın yanında küçük bir nokta. */
  modified?: boolean;
};

/**
 * A quiet window: traffic-light dots, a mono title (or editor-style file tabs)
 * and a body. With `tabs`, the first tab is the active one and merges into the body.
 */
export default function Frame({
  title,
  tabs,
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
  tabs?: FrameTab[];
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
    <Tag
      className={cx('frame', flush && 'frame-flush', sunken && 'frame-sunken', tabs && 'frame-tabbed', className)}
      {...props}
    >
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <span />
          <span />
          <span />
        </span>
        {tabs ? (
          <span className="frame-tabs">
            {tabs.map((tab, index) => (
              <span className={cx('frame-tab', index === 0 && 'is-active')} key={tab.label}>
                {tab.icon}
                <span className="frame-tab-label">{tab.label}</span>
                {tab.modified && <span className="frame-tab-dot" />}
              </span>
            ))}
          </span>
        ) : (
          <span className="frame-title">{title}</span>
        )}
        <span className="frame-meta">{meta}</span>
      </div>
      <div className={cx('frame-body', bodyClassName)}>{children}</div>
    </Tag>
  );
}
