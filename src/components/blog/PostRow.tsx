import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PostCover from './PostCover';
import myPhoto from '@/assets/images/my.png';
import { formatDate, getCategoryStyle } from '@/lib/blog/categories';
import { personalInfo } from '@/data/cvData';
import type { PostSummary } from '@/lib/blog/types';

interface PostRowProps {
  post: PostSummary;
  /** İki sütunlu yerleşimde daha dar, kart görünümü. */
  compact?: boolean;
}

/**
 * Klasik blog satırı: kapak solda, başlık–meta–özet–oku bağlantısı sağda.
 * Compact modda sağdaki proje kartlarıyla aynı dilde yuvarlak kart kullanılır.
 */
const PostRow = ({ post, compact = false }: PostRowProps) => {
  const style = getCategoryStyle(post.category);

  if (compact) {
    return (
      <article className="group">
        <Link
          href={`/blog/${post.slug}`}
          className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-gray-900/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-gray-900/10"
        >
          <div className="relative aspect-[4/3] w-[7.25rem] shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <PostCover post={post} bare sizes="116px" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span
              className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${style.badge}`}
            >
              {post.category}
            </span>

            <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-brand-700">
              {post.title}
            </h3>

            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Image
                  src={myPhoto}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4 rounded-full object-cover"
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

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{post.excerpt}</p>

            <span className="mt-auto pt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
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
  }

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-5 rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-gray-900/10 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:gap-7"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 sm:aspect-[4/3]">
          <PostCover post={post} bare sizes="(min-width: 640px) 220px, 100vw" />
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-brand-700">
            {post.title}
          </h3>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Image
                src={myPhoto}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
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

          <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-gray-600">{post.excerpt}</p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
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
};

export default PostRow;
