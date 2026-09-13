export interface InlineText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
}

export type PostBlock =
  | { type: 'paragraph'; text: InlineText[] }
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'list'; ordered: boolean; items: InlineText[][] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: 'divider' };

export interface PostImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  cover?: PostImage;
  location?: string;
  featured?: boolean;
  readingMinutes: number;
}

export interface Post extends PostSummary {
  blocks: PostBlock[];
  seoDescription?: string;
}

export interface BlogProvider {
  /** Yönetim panelinde ve hata mesajlarında görünen kaynak adı. */
  name: string;
  listPosts(): Promise<PostSummary[]>;
  getPost(slug: string): Promise<Post | null>;
}

export const toSummary = (post: Post): PostSummary => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  tags: post.tags,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  cover: post.cover,
  location: post.location,
  featured: post.featured,
  readingMinutes: post.readingMinutes,
});

export const estimateReadingMinutes = (blocks: PostBlock[]): number => {
  const words = blocks.reduce((total, block) => {
    if (block.type === 'paragraph') return total + block.text.map((t) => t.text).join(' ').split(/\s+/).length;
    if (block.type === 'heading') return total + block.text.split(/\s+/).length;
    if (block.type === 'quote') return total + block.text.split(/\s+/).length;
    if (block.type === 'list')
      return total + block.items.flat().map((t) => t.text).join(' ').split(/\s+/).length;
    return total;
  }, 0);

  return Math.max(1, Math.round(words / 200));
};

export const slugifyHeading = (text: string): string =>
  text
    .toLocaleLowerCase('tr')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
