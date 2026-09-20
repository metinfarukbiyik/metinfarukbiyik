import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PostCover from './PostCover';
import myPhoto from '@/assets/images/my.png';
import { formatDate } from '@/lib/blog/categories';
import { personalInfo } from '@/data/cvData';
import type { PostSummary } from '@/lib/blog/types';

interface PostRowProps {
  post: PostSummary;
  /** İki sütunlu yerleşimde daha dar, sıkı satır. */
  compact?: boolean;
}

/**
 * Klasik blog satırı: kapak solda, başlık–meta–özet–oku bağlantısı sağda.
 * Başlık kapağın üzerine binmez; kapağı `bare` ile yalnızca görsel olarak kullanır.
 */
const PostRow = ({ post, compact = false }: PostRowProps) => (
  <article className="group">
    <Link
      href={`/blog/${post.slug}`}
      className={
        compact
          ? 'grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-4'
          : 'grid gap-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:gap-7'
      }
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-900/5 ${
          compact ? 'aspect-[4/3]' : 'aspect-[16/9] sm:aspect-[4/3]'
        }`}
      >
        <PostCover
          post={post}
          bare
          sizes={compact ? '120px' : '(min-width: 640px) 220px, 100vw'}
        />
      </div>

      <div className="min-w-0">
        <h3
          className={`font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-brand-700 ${
            compact ? 'text-base' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-500 ${
            compact ? 'text-xs' : 'mt-2 text-sm'
          }`}
        >
          <span className="inline-flex items-center gap-1.5">
            <Image
              src={myPhoto}
              alt=""
              width={20}
              height={20}
              className={compact ? 'h-4 w-4 rounded-full object-cover' : 'h-5 w-5 rounded-full object-cover'}
            />
            <span className="font-medium text-gray-700">{personalInfo.name}</span>
          </span>
          <span aria-hidden className="text-gray-300">
            ·
          </span>
          <span>{post.readingMinutes} dk</span>
          <span aria-hidden className="text-gray-300">
            ·
          </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <p
          className={`text-gray-600 ${
            compact ? 'mt-2 line-clamp-2 text-sm leading-6' : 'mt-3 line-clamp-3 text-[15px] leading-7'
          }`}
        >
          {post.excerpt}
        </p>

        <span
          className={`inline-flex items-center gap-1.5 font-semibold text-brand-600 transition-colors group-hover:text-brand-700 ${
            compact ? 'mt-2.5 text-sm' : 'mt-4 text-sm'
          }`}
        >
          Devamını oku
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  </article>
);

export default PostRow;
