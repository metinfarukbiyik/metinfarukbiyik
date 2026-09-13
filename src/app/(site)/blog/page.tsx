import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/blog/PostCard';
import { getPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Hayatımdan notlar, gezdiğim yerler ve geliştirdiğim projeler üzerine yazılar. Gezi, teknoloji ve kişisel gelişmeler.',
  keywords: ['Metin Faruk Bıyık blog', 'gezi yazıları', 'Trabzon', 'iOS geliştirme', 'kişisel blog'],
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    type: 'website',
    title: 'Metin Faruk Bıyık | Blog',
    description: 'Hayatımdan notlar, gezdiğim yerler ve geliştirdiğim projeler üzerine yazılar.',
    url: '/blog',
  },
};

const BlogPage = async () => {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Blog"
        title="Yazılar"
        description="Hayatımdaki gelişmeler, gezdiğim yerler ve geliştirdiğim projeler üzerine notlar."
      />

      {posts.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-gray-50 p-8 text-center text-sm text-gray-600 ring-1 ring-gray-900/5">
          Henüz yayınlanmış bir yazı yok. Çok yakında burada olacak.
        </p>
      ) : (
        <>
          <div className="mt-10">
            <PostCard post={featured} featured />
          </div>

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;
