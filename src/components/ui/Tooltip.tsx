import { useId, type ReactElement, cloneElement } from 'react';
import { cx } from './cx';

/**
 * CSS-only tooltip. The trigger gets `aria-describedby`, so the hint is read by
 * screen readers and shows on both hover and keyboard focus.
 */
export default function Tooltip({
  content,
  side = 'top',
  className,
  children,
}: {
  content: string;
  side?: 'top' | 'bottom';
  className?: string;
  children: ReactElement<{ 'aria-describedby'?: string }>;
}) {
  const id = useId();
  return (
    <span className={cx('tip', side === 'bottom' && 'tip-bottom', className)}>
      {cloneElement(children, { 'aria-describedby': id })}
      <span role="tooltip" id={id} className="tip-bubble">
        {content}
      </span>
    </span>
  );
}
