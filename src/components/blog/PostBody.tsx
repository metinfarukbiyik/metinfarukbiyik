import Image from 'next/image';
import type { InlineText, PostBlock } from '@/lib/blog/types';

const renderInline = (parts: InlineText[]) =>
  parts.map((part, index) => {
    const content = part.bold ? (
      <strong className="font-semibold text-gray-900">{part.text}</strong>
    ) : part.italic ? (
      <em>{part.text}</em>
    ) : (
      part.text
    );

    if (part.href) {
      return (
        <a
          key={index}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-600 underline decoration-brand-300 underline-offset-4 hover:text-brand-700"
        >
          {content}
        </a>
      );
    }

    return <span key={index}>{content}</span>;
  });

const PostBody = ({ blocks }: { blocks: PostBlock[] }) => (
  <div className="mt-10">
    {blocks.map((block, index) => {
      switch (block.type) {
        case 'heading':
          // Ana başlıkta kısa bir aksan çubuğu, alt başlıkta yanda ince bir işaret: hiyerarşi
          // sayfayı yatay çizgilerle bölmeden okunur kalıyor.
          return block.level === 2 ? (
            <div key={index} className="mt-14 first:mt-0">
              <h2
                id={block.id}
                className="scroll-mt-24 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-[28px]"
              >
                {block.text}
              </h2>
              <span className="mt-3 flex items-center gap-1.5" aria-hidden>
                <span className="h-1 w-9 rounded-full bg-brand-600" />
                <span className="h-1 w-1 rounded-full bg-brand-300" />
              </span>
            </div>
          ) : (
            <h3
              key={index}
              id={block.id}
              className="mt-10 flex scroll-mt-24 items-center gap-2.5 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
            >
              <span className="h-5 w-[3px] shrink-0 rounded-full bg-brand-400" aria-hidden />
              {block.text}
            </h3>
          );

        case 'paragraph':
          return (
            <p key={index} className="mt-5 text-[17px] leading-[1.85] text-gray-700">
              {renderInline(block.text)}
            </p>
          );

        case 'list':
          return block.ordered ? (
            <ol key={index} className="mt-5 space-y-2.5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-[17px] leading-8 text-gray-700">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                    {itemIndex + 1}
                  </span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ul key={index} className="mt-5 space-y-2.5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-[17px] leading-8 text-gray-700">
                  <span className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );

        case 'quote':
          return (
            <figure
              key={index}
              className="mt-10 rounded-r-2xl border-l-4 border-brand-500 bg-gradient-to-r from-brand-50 to-transparent py-6 pl-6 pr-5"
            >
              <blockquote className="text-xl font-medium italic leading-9 text-gray-900">
                “{block.text}”
              </blockquote>
              {block.cite && (
                <figcaption className="mt-3 text-sm font-medium not-italic text-brand-700">
                  {block.cite}
                </figcaption>
              )}
            </figure>
          );

        case 'image':
          return (
            <figure key={index} className="mt-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-900/5">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-500">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );

        case 'divider':
          return <hr key={index} className="mt-10 border-gray-200" />;

        default:
          return null;
      }
    })}
  </div>
);

export default PostBody;
