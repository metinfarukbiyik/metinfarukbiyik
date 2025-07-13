import { BlogPost } from '../utils/blogUtils';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/blog/${post.slug}`);
  };

  return (
    <article className="blog-card" onClick={handleClick}>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">{post.date}</span>
          <span className="blog-read-time">{post.readTime}</span>
        </div>
        
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-description">{post.description}</p>
        
        <div className="blog-card-footer">
          <button 
            className="blog-read-more"
            onClick={handleReadMoreClick}
            aria-label={`${post.title} yazısını oku`}
          >
            Devamını oku
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
} 