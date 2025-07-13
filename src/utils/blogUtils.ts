export interface BlogPost {
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  published: boolean;
  content?: string;
}

// Markdown dosyasından metadata ve içeriği parse eden fonksiyon
export function parseMarkdown(markdownContent: string): { metadata: BlogPost; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdownContent.match(frontMatterRegex);
  
  if (!match || !match[1] || !match[2]) {
    throw new Error('Markdown dosyasında front matter bulunamadı');
  }
  
  const [, frontMatter, content] = match;
  
  // Front matter'ı parse et
  const metadata: any = {};
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      metadata[key.trim()] = value === 'true' ? true : value === 'false' ? false : value;
    }
  });
  
  return {
    metadata: metadata as BlogPost,
    content: content.trim()
  };
}

// Blog yazısını dosyadan yükleyen fonksiyon
export async function loadBlogPost(slug: string): Promise<{ metadata: BlogPost; content: string } | null> {
  try {
    const response = await fetch(`/blog/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    const markdownContent = await response.text();
    return parseMarkdown(markdownContent);
  } catch (error) {
    console.error('Blog yazısı yüklenirken hata:', error);
    return null;
  }
}

// Tüm blog yazılarının listesini döndüren fonksiyon
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Şimdilik public/blog/ klasöründeki dosyaları manuel olarak listeleyelim
  // Gerçek uygulamada bu bir API endpoint'i olabilir
  const slugs = [
    'merhaba-blog-yazim-biyikdev',
    // Buraya yeni yazıların slug'larını ekleyebilirsiniz
  ];
  
  const posts: BlogPost[] = [];
  
  for (const slug of slugs) {
    const post = await loadBlogPost(slug);
    if (post && post.metadata.published) {
      posts.push({
        ...post.metadata,
        slug
      });
    }
  }
  
  // Tarihe göre sırala (en yeni önce)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 