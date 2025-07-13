import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead, BlogCard } from '../components';
import { generatePageSEO } from '../utils/seo';
import { usePageTitle } from '../hooks/usePageTitle';
import { getAllBlogPosts, BlogPost } from '../utils/blogUtils';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get('category');
  const seo = generatePageSEO('blog');
  usePageTitle(seo.title);

  useEffect(() => {
    getAllBlogPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  const categories = [...new Set(posts.map(post => post.category))];

  const handleCategoryFilter = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead seo={seo} />
        <div className="blog-page">
          <section className="blog-hero">
            <h1>Blog</h1>
            <p className="blog-description">
              Kişisel deneyimlerim, öğrenme sürecim ve teknik keşiflerim üzerine yazılar.
            </p>
          </section>
          <div className="blog-loading">
            <p>Yazılar yükleniyor...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seo={seo} />
      <div className="blog-page">
        <section className="blog-hero">
          <h1>Blog</h1>
          <p className="blog-description">
            Kişisel deneyimlerim, öğrenme sürecim ve teknik keşiflerim üzerine yazılar.
          </p>
        </section>

        <div className="blog-content">
          {posts.length > 0 && (
            <div className="blog-filters">
              <button 
                className={`filter-button ${!selectedCategory ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(null)}
              >
                Tümü ({posts.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category} ({posts.filter(post => post.category === category).length})
                </button>
              ))}
            </div>
          )}

          {selectedCategory && (
            <div className="selected-category">
              <h2>{selectedCategory} Kategorisi</h2>
              <p>{filteredPosts.length} yazı bulundu</p>
            </div>
          )}

          <div className="blog-grid">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && selectedCategory && (
            <div className="no-posts">
              <h3>Bu kategoride henüz yazı bulunmuyor</h3>
              <p>Diğer kategorilere göz atabilirsiniz.</p>
              <button 
                className="btn-primary"
                onClick={() => handleCategoryFilter(null)}
              >
                Tüm yazıları gör
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 