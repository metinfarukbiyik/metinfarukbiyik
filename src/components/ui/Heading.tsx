import type { ReactNode } from 'react';
import { cx } from './cx';

export type HeadingSize = 'display' | '1' | '2' | '3' | '4';

/**
 * Semantic level (`as`) and visual size are independent, so the outline stays
 * correct while every page uses the same type scale.
 */
export default function Heading({
  as: Tag = 'h2',
  size,
  id,
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  size?: HeadingSize;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const resolved = size ?? ({ h1: '1', h2: '2', h3: '3', h4: '4', p: '4' } as const)[Tag];
  return (
    <Tag id={id} className={cx(`title-${resolved}`, className)}>
      {children}
    </Tag>
  );
}
