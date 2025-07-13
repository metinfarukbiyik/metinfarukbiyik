import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost, getAllBlogPosts } from '../utils/blogUtils';

export function BlogSidebar() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setAllPosts(posts);
      } catch (error) {
        console.error('Blog yazıları yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Kategorileri grupla
  const categories = allPosts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  // Son yazıları al (en fazla 5)
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleCategoryClick = (category: string) => {
    navigate(`/blog?category=${encodeURIComponent(category)}`);
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <aside className="blog-sidebar">
        <div className="sidebar-loading">
          <div className="loading-spinner"></div>
          <span>Yükleniyor...</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="blog-sidebar">
      {/* Kategoriler */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <path d="M22 6l-10 7L2 6"></path>
          </svg>
          <h3 className="sidebar-title">Kategoriler</h3>
        </div>
        
        <div className="sidebar-categories">
          {Object.entries(categories).map(([category, count]) => (
            <button 
              key={category}
              className="sidebar-category-button"
              onClick={() => handleCategoryClick(category)}
              aria-label={`${category} kategorisi`}
            >
              <span className="category-name">{category}</span>
              <span className="category-count">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Son Yazılar */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          <h3 className="sidebar-title">Son Yazılar</h3>
        </div>
        
        <div className="sidebar-recent-posts">
          {recentPosts.map((post) => (
            <article 
              key={post.slug} 
              className="sidebar-recent-post"
              onClick={() => handlePostClick(post.slug)}
            >
              <h4 className="sidebar-post-title">{post.title}</h4>
              <div className="sidebar-post-meta">
                <span className="sidebar-post-date">{post.date}</span>
                <span className="sidebar-post-separator">•</span>
                <span className="sidebar-post-read-time">{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
} 