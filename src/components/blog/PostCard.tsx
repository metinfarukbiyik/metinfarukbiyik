import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import PostCover from './PostCover';
import { formatDate, getCategoryStyle } from '@/lib/blog/categories';
import type { PostSummary } from '@/lib/blog/types';

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const style = getCategoryStyle(post.category);

  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-900/10"
      >
        <div
          className={`relative overflow-hidden ${
            featured ? 'aspect-[16/9] max-h-80' : 'aspect-[16/9] max-h-56'
          }`}
        >
          <PostCover
            post={post}
            priority={featured}
            sizes={featured ? '(min-width: 768px) 720px, 100vw' : '(min-width: 640px) 360px, 100vw'}
          >
            <h3
              className={`font-bold leading-snug tracking-tight text-white ${
                featured ? 'text-2xl sm:text-3xl' : 'text-lg'
              }`}
            >
              {post.title}
            </h3>
          </PostCover>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-500">
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ${style.badge}`}
            >
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {post.readingMinutes} dk
            </span>
            {post.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} />
                {post.location}
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>

          <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${style.accent}`}>
            Yazıyı oku
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

export default PostCard;
