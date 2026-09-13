import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import PostBody from '@/components/blog/PostBody';
import PostCard from '@/components/blog/PostCard';
import PostCover from '@/components/blog/PostCover';
import { getPost, getPosts } from '@/lib/blog';
import { formatDate } from '@/lib/blog/categories';
import { personalInfo } from '@/data/cvData';
import { site } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export const generateStaticParams = async () => {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    // CMS derleme anında erişilemezse sayfalar ilk istekte üretilir, derleme durmaz.
    return [];
  }
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Yazı bulunamadı' };

  const description = post.seoDescription ?? post.excerpt;

  return {
    title: post.title,
    description,
    keywords: [post.category, ...post.tags],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [site.url],
      tags: post.tags,
      // Kapak yoksa Next, opengraph-image.tsx ile üretilen görseli otomatik ekler.
      ...(post.cover ? { images: [{ url: post.cover.src, alt: post.cover.alt }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.cover ? { images: [post.cover.src] } : {}),
    },
  };
};

const PostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const headings = post.blocks.filter((block) => block.type === 'heading' && block.level === 2);
  const others = (await getPosts()).filter((item) => item.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: 'tr-TR',
    author: { '@type': 'Person', name: personalInfo.name, url: site.url },
    publisher: { '@type': 'Person', name: personalInfo.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    image: post.cover ? [post.cover.src] : [`${site.url}/blog/${post.slug}/opengraph-image`],
    keywords: [post.category, ...post.tags].join(', '),
  };

  return (
    <article className="animate-fade-up">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Tüm yazılar
      </Link>

      <header className="mt-5 border-b border-gray-200 pb-8">
        {/* Dar ekranda tam 16:9; geniş ekranda tam genişlikte kalıp yükseklik sınırlanır. */}
        <div className="relative aspect-[16/9] w-full max-h-[26rem] overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-gray-900/5">
          <PostCover post={post} priority sizes="(min-width: 1024px) 960px, 100vw">
            <span className="inline-flex items-center rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
              {post.category}
            </span>
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl sm:leading-[1.15]">
              {post.title}
            </h1>
          </PostCover>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingMinutes} dakikalık okuma
          </span>
          {post.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {post.location}
            </span>
          )}
        </div>
      </header>

      {headings.length >= 3 && (
        <nav className="mt-10 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-900/5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">İçindekiler</h2>
          <ol className="mt-3 space-y-2">
            {headings.map((heading) => (
              <li key={heading.type === 'heading' ? heading.id : ''}>
                {heading.type === 'heading' && (
                  <a
                    href={`#${heading.id}`}
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-700"
                  >
                    {heading.text}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <PostBody blocks={post.blocks} />

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-200 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">Diğer yazılar</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {others.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default PostPage;
