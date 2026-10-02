import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface AccordionItemProps {
  id: string;
  index: string;
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

const AccordionItem = ({ id, index, title, count, defaultOpen, children }: AccordionItemProps) => (
  <details id={id} open={defaultOpen} className="group scroll-mt-20 border-b border-border">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 select-none [&::-webkit-details-marker]:hidden">
      <span className="flex min-w-0 items-baseline gap-3">
        <span className="font-mono text-xs text-subtle">{index}</span>
        <span className="text-sm font-medium text-fg">{title}</span>
        {count != null && <span className="font-mono text-xs text-subtle">{count}</span>}
      </span>
      <ChevronDown
        size={16}
        className="shrink-0 text-subtle transition-transform group-open:rotate-180"
        aria-hidden
      />
    </summary>
    <div className="pb-6 pl-0 sm:pl-8">{children}</div>
  </details>
);

export default AccordionItem;
