import Image from 'next/image';
import { getCategoryStyle } from '@/lib/blog/categories';
import type { PostSummary } from '@/lib/blog/types';

interface PostCoverProps {
  post: PostSummary;
  sizes: string;
  priority?: boolean;
  titleClassName?: string;
}

/** Kapak görseli varsa onu, yoksa kategoriye göre renklenen bir degrade kapak gösterir. */
const PostCover = ({ post, sizes, priority, titleClassName = 'text-xl' }: PostCoverProps) => {
  if (post.cover) {
    return (
      <Image
        src={post.cover.src}
        alt={post.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  const style = getCategoryStyle(post.category);

  return (
    <div className={`flex h-full w-full items-end bg-gradient-to-br p-5 ${style.gradient}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <p className={`relative font-bold leading-snug text-white ${titleClassName}`}>{post.title}</p>
    </div>
  );
};

export default PostCover;
