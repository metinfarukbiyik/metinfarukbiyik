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
          return block.level === 2 ? (
            <h2
              key={index}
              id={block.id}
              className="mt-12 scroll-mt-24 flex items-center gap-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-[26px]"
            >
              <span className="h-6 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden />
              {block.text}
            </h2>
          ) : (
            <h3
              key={index}
              id={block.id}
              className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight text-gray-900"
            >
              {block.text}
            </h3>
          );

        case 'paragraph':
          return (
            <p key={index} className="mt-5 text-[17px] leading-8 text-gray-700">
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
              className="mt-8 rounded-2xl bg-brand-50/70 p-6 ring-1 ring-brand-600/10"
            >
              <blockquote className="text-lg font-medium leading-8 text-brand-950">
                “{block.text}”
              </blockquote>
              {block.cite && (
                <figcaption className="mt-3 text-sm text-brand-800/70">{block.cite}</figcaption>
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
