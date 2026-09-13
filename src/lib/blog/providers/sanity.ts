import { apiVersion, dataset, isSanityConfigured, projectId } from '@/sanity/env';
import type { BlogProvider, InlineText, PostBlock, PostSummary } from '../types';
import { estimateReadingMinutes, slugifyHeading } from '../types';

interface PortableSpan {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
}

interface PortableBlock {
  _type: string;
  style?: string;
  listItem?: string;
  children?: PortableSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface SanityCover {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface SanityPost extends Omit<PostSummary, 'readingMinutes' | 'cover'> {
  charCount?: number;
  cover?: SanityCover;
  body?: PortableBlock[];
  seoDescription?: string;
}

const summaryFields = `
  "slug": slug.current,
  title,
  excerpt,
  "category": coalesce(category, "Genel"),
  "tags": coalesce(tags, []),
  publishedAt,
  "updatedAt": _updatedAt,
  location,
  "featured": coalesce(featured, false),
  seoDescription,
  "charCount": length(pt::text(body)),
  "cover": {
    "src": cover.asset->url,
    "alt": coalesce(cover.alt, title),
    "width": cover.asset->metadata.dimensions.width,
    "height": cover.asset->metadata.dimensions.height
  }`;

const bodyProjection = `
  "body": body[]{
    ...,
    _type == "image" => {
      "src": asset->url,
      alt,
      caption,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }`;

const runQuery = async <T>(groq: string, params: Record<string, string> = {}): Promise<T> => {
  if (!isSanityConfigured) {
    throw new Error(
      'Sanity proje kimliği tanımlı değil. .env.local dosyasına NEXT_PUBLIC_SANITY_PROJECT_ID ekleyin.',
    );
  }

  const search = new URLSearchParams({ query: groq });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }

  // Geliştirmede Studio'daki değişiklik anında görünsün diye önbelleksiz ve CDN'siz çalışılır.
  const isDev = process.env.NODE_ENV === 'development';
  const host = isDev ? 'api' : 'apicdn';

  const response = await fetch(
    `https://${projectId}.${host}.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`,
    isDev ? { cache: 'no-store' } : { next: { revalidate: 3600, tags: ['posts'] } },
  );

  if (!response.ok) {
    throw new Error(`Sanity isteği başarısız oldu (${response.status}).`);
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
};

/** Ortalama okuma hızına göre yaklaşık süre (yaklaşık 1300 karakter/dakika). */
const readingMinutesFromChars = (charCount = 0) => Math.max(1, Math.round(charCount / 1300));

/** Kapak görseli yüklenmemişse alanları boş gelir; bu durumda degrade kapak kullanılır. */
const toCover = (cover: SanityCover | undefined) =>
  cover?.src ? { src: cover.src, alt: cover.alt ?? '', width: cover.width, height: cover.height } : undefined;

const toInline = (block: PortableBlock): InlineText[] =>
  (block.children ?? []).map((span) => {
    const marks = span.marks ?? [];
    const link = block.markDefs?.find((def) => marks.includes(def._key) && def._type === 'link');

    return {
      text: span.text ?? '',
      bold: marks.includes('strong'),
      italic: marks.includes('em'),
      href: link?.href,
    };
  });

const toBlocks = (raw: PortableBlock[]): PostBlock[] => {
  const blocks: PostBlock[] = [];

  for (const item of raw) {
    if (item._type === 'image' && item.src) {
      blocks.push({
        type: 'image',
        src: item.src,
        alt: item.alt ?? '',
        caption: item.caption,
        width: item.width,
        height: item.height,
      });
      continue;
    }

    if (item._type !== 'block') continue;

    if (item.listItem) {
      const ordered = item.listItem === 'number';
      const previous = blocks[blocks.length - 1];

      if (previous?.type === 'list' && previous.ordered === ordered) {
        previous.items.push(toInline(item));
      } else {
        blocks.push({ type: 'list', ordered, items: [toInline(item)] });
      }
      continue;
    }

    const text = toInline(item);
    const plain = text.map((part) => part.text).join('');

    if (item.style === 'h2' || item.style === 'h3') {
      blocks.push({
        type: 'heading',
        level: item.style === 'h2' ? 2 : 3,
        text: plain,
        id: slugifyHeading(plain),
      });
      continue;
    }

    if (item.style === 'blockquote') {
      blocks.push({ type: 'quote', text: plain });
      continue;
    }

    if (plain.trim().length > 0) {
      blocks.push({ type: 'paragraph', text });
    }
  }

  return blocks;
};

const publishedFilter =
  '_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && publishedAt <= now()';

const sanityProvider: BlogProvider = {
  name: 'sanity',

  async listPosts() {
    const result = await runQuery<SanityPost[]>(
      `*[${publishedFilter}] | order(publishedAt desc) { ${summaryFields} }`,
    );

    return result.map(({ charCount, cover, ...post }) => ({
      ...post,
      cover: toCover(cover),
      readingMinutes: readingMinutesFromChars(charCount),
    }));
  },

  async getPost(slug) {
    const result = await runQuery<SanityPost | null>(
      `*[${publishedFilter} && slug.current == $slug][0] { ${summaryFields}, ${bodyProjection} }`,
      { slug },
    );

    if (!result) return null;

    const { charCount, body, cover, ...post } = result;
    const blocks = toBlocks(body ?? []);

    return {
      ...post,
      cover: toCover(cover),
      blocks,
      readingMinutes: charCount ? readingMinutesFromChars(charCount) : estimateReadingMinutes(blocks),
    };
  },
};

export default sanityProvider;
