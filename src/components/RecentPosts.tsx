import { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';
import { getAllBlogPosts, BlogPost } from '../utils/blogUtils';

export function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getAllBlogPosts()
      .then(posts => setRecentPosts(posts.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <section className="recent-posts">
      <div className="recent-posts-container">
        <div className="recent-posts-header">
          <h2>Son Yazılar</h2>
        </div>
        
        <div className="recent-posts-grid">
          {recentPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        
        <div className="recent-posts-footer">
          <a href="/blog" className="view-all-link">
            Tüm yazıları görüntüle
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
} 