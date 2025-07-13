import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SEOHead } from './SEOHead';
import { BlogSidebar } from './BlogSidebar';
import { GiscusComments } from './GiscusComments';
import { usePageTitle } from '../hooks/usePageTitle';
import { loadBlogPost, BlogPost as BlogPostType } from '../utils/blogUtils';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ metadata: BlogPostType; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  usePageTitle(post?.metadata.title || 'Blog Yazısı');

  useEffect(() => {
    if (!slug) {
      setError(true);
      setLoading(false);
      return;
    }

    loadBlogPost(slug)
      .then((result) => {
        if (result) {
          setPost(result);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-layout">
          <div className="blog-post-main">
            <div className="loading-state">
              <p>Yazı yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/404" replace />;
  }

  const seo = {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: `${post.metadata.category}, ${post.metadata.title}, blog`,
    url: `${window.location.origin}/blog/${slug}`,
    type: 'article'
  };

  const pageTitle = post.metadata.title;

  return (
    <>
      <SEOHead seo={seo} />
      <div className="blog-post-page">
        <div className="blog-post-layout">
          {/* Ana İçerik */}
          <main className="blog-post-main">
            {/* Blog Header */}
            <header className="blog-post-header">
              <div className="blog-post-meta">
                <span className="blog-post-category">{post.metadata.category}</span>
                <span className="blog-post-date">{post.metadata.date}</span>
                <span className="blog-post-read-time">{post.metadata.readTime}</span>
              </div>
              
              <h1 className="blog-post-title">{post.metadata.title}</h1>
              <p className="blog-post-description">{post.metadata.description}</p>
            </header>

            {/* Blog Content */}
            <article className="blog-post-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h2 className="blog-h1">{children}</h2>,
                  h2: ({ children }) => <h3 className="blog-h2">{children}</h3>,
                  h3: ({ children }) => <h4 className="blog-h3">{children}</h4>,
                  code: ({ children, ...props }) => {
                    const isInline = !props.className;
                    return isInline ? (
                      <code className="blog-inline-code" {...props}>{children}</code>
                    ) : (
                      <code className="blog-code-block" {...props}>{children}</code>
                    );
                  },
                  pre: ({ children }) => <pre className="blog-pre">{children}</pre>,
                  blockquote: ({ children }) => <blockquote className="blog-quote">{children}</blockquote>,
                  ul: ({ children }) => <ul className="blog-list">{children}</ul>,
                  ol: ({ children }) => <ol className="blog-list blog-list-ordered">{children}</ol>,
                  li: ({ children }) => <li className="blog-list-item">{children}</li>,
                  p: ({ children }) => <p className="blog-paragraph">{children}</p>,
                  a: ({ children, href }) => (
                    <a href={href} className="blog-link" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="blog-image" loading="lazy" />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Yorumlar */}
            <section className="blog-comments-section">
              <GiscusComments 
                pageTitle={pageTitle}
              />
            </section>

            {/* Blog Footer */}
            <footer className="blog-post-footer">
              <a href="/blog" className="back-to-blog">
                ← Tüm yazılara dön
              </a>
            </footer>
          </main>

          {/* Sidebar */}
          <BlogSidebar />
        </div>
      </div>
    </>
  );
} 