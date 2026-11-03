import { Plus } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { faqSchema } from '@/lib/seo';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Accessible disclosure list that also emits FAQPage structured data. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>
            <h3 className="title-4">{item.question}</h3>
            <span className="faq-icon" aria-hidden="true">
              <Plus />
            </span>
          </summary>
          <p className="faq-answer">{item.answer}</p>
        </details>
      ))}
      <JsonLd data={faqSchema(items)} />
    </div>
  );
}
