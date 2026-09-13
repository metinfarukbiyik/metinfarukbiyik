import type { ReactNode } from 'react';
import Image from 'next/image';
import { getCategoryStyle } from '@/lib/blog/categories';
import type { PostSummary } from '@/lib/blog/types';

interface PostCoverProps {
  post: PostSummary;
  sizes: string;
  priority?: boolean;
  /** Kapak alanının üzerine binen içerik (başlık, kategori rozeti gibi). */
  children?: ReactNode;
}

/**
 * Kapak alanı: görsel varsa görseli, yoksa kategoriye göre renklenen degradeyi gösterir.
 * Üzerine içerik bindiğinde okunabilirlik için görselin altına koyu geçiş eklenir.
 * Konumlandırma için kendisini saran öğenin `relative` olması beklenir.
 */
const PostCover = ({ post, sizes, priority, children }: PostCoverProps) => {
  const style = getCategoryStyle(post.category);
  const overlay = children ?? (
    <p className="text-xl font-bold leading-snug text-white">{post.title}</p>
  );

  return (
    <>
      {post.cover ? (
        <>
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/20 to-transparent transition-colors duration-500 group-hover:from-gray-950/85"
            aria-hidden
          />
        </>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.03] ${style.gradient}`}
        >
          <div
            className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]"
            aria-hidden
          />
        </div>
      )}

      <div className="absolute inset-0 flex items-end p-5 sm:p-6">
        <div className="w-full">{overlay}</div>
      </div>
    </>
  );
};

export default PostCover;
