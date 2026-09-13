import type { BlogProvider, InlineText, Post, PostBlock, PostSummary } from '../types';
import { estimateReadingMinutes, slugifyHeading } from '../types';

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

interface NotionRichText {
  plain_text: string;
  href: string | null;
  annotations?: { bold?: boolean; italic?: boolean };
}

interface NotionProperty {
  type: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: { name: string } | null;
  status?: { name: string } | null;
  multi_select?: { name: string }[];
  date?: { start: string } | null;
  checkbox?: boolean;
  files?: { file?: { url: string }; external?: { url: string } }[];
}

interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  cover?: { file?: { url: string }; external?: { url: string } } | null;
  properties: Record<string, NotionProperty>;
}

interface NotionBlock {
  type: string;
  paragraph?: { rich_text: NotionRichText[] };
  heading_2?: { rich_text: NotionRichText[] };
  heading_3?: { rich_text: NotionRichText[] };
  bulleted_list_item?: { rich_text: NotionRichText[] };
  numbered_list_item?: { rich_text: NotionRichText[] };
  quote?: { rich_text: NotionRichText[] };
  image?: {
    caption?: NotionRichText[];
    file?: { url: string };
    external?: { url: string };
  };
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!token || !databaseId) {
    throw new Error('NOTION_TOKEN ve NOTION_DATABASE_ID ortam değişkenleri tanımlı değil.');
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    next: { revalidate: 3600, tags: ['posts'] },
  });

  if (!response.ok) {
    throw new Error(`Notion isteği başarısız oldu (${response.status}).`);
  }

  return (await response.json()) as T;
};

const plain = (value?: NotionRichText[]) => (value ?? []).map((part) => part.plain_text).join('');

const toInline = (value?: NotionRichText[]): InlineText[] =>
  (value ?? []).map((part) => ({
    text: part.plain_text,
    bold: part.annotations?.bold,
    italic: part.annotations?.italic,
    href: part.href ?? undefined,
  }));

const fileUrl = (file?: { file?: { url: string }; external?: { url: string } } | null) =>
  file?.file?.url ?? file?.external?.url;

const findProperty = (page: NotionPage, names: string[], type: string) => {
  for (const name of names) {
    const property = page.properties[name];
    if (property?.type === type) return property;
  }
  return Object.values(page.properties).find((property) => property.type === type);
};

const toSummary = (page: NotionPage): PostSummary => {
  const title = plain(findProperty(page, ['Başlık', 'Title', 'Name'], 'title')?.title);
  const slug = plain(findProperty(page, ['Slug', 'Kısa Ad'], 'rich_text')?.rich_text);
  const excerpt = plain(findProperty(page, ['Özet', 'Excerpt', 'Açıklama'], 'rich_text')?.rich_text);
  const location = plain(findProperty(page, ['Konum', 'Location'], 'rich_text')?.rich_text);
  const category = findProperty(page, ['Kategori', 'Category'], 'select')?.select?.name ?? 'Genel';
  const tags = findProperty(page, ['Etiketler', 'Tags'], 'multi_select')?.multi_select ?? [];
  const date = findProperty(page, ['Tarih', 'Yayın Tarihi', 'Date'], 'date')?.date?.start;
  const featured = findProperty(page, ['Öne Çıkan', 'Featured'], 'checkbox')?.checkbox;
  const cover = fileUrl(page.cover);

  return {
    slug: slug || slugifyHeading(title),
    title,
    excerpt,
    category,
    tags: tags.map((tag) => tag.name),
    publishedAt: date ?? page.created_time,
    updatedAt: page.last_edited_time,
    location: location || undefined,
    featured: featured ?? false,
    cover: cover ? { src: cover, alt: title } : undefined,
    readingMinutes: 3,
  };
};

const toBlocks = (results: NotionBlock[]): PostBlock[] => {
  const blocks: PostBlock[] = [];

  for (const item of results) {
    switch (item.type) {
      case 'paragraph': {
        const text = toInline(item.paragraph?.rich_text);
        if (text.some((part) => part.text.trim())) blocks.push({ type: 'paragraph', text });
        break;
      }
      case 'heading_2':
      case 'heading_3': {
        const text = plain(
          item.type === 'heading_2' ? item.heading_2?.rich_text : item.heading_3?.rich_text,
        );
        blocks.push({
          type: 'heading',
          level: item.type === 'heading_2' ? 2 : 3,
          text,
          id: slugifyHeading(text),
        });
        break;
      }
      case 'bulleted_list_item':
      case 'numbered_list_item': {
        const ordered = item.type === 'numbered_list_item';
        const text = toInline(
          ordered ? item.numbered_list_item?.rich_text : item.bulleted_list_item?.rich_text,
        );
        const previous = blocks[blocks.length - 1];

        if (previous?.type === 'list' && previous.ordered === ordered) {
          previous.items.push(text);
        } else {
          blocks.push({ type: 'list', ordered, items: [text] });
        }
        break;
      }
      case 'quote':
        blocks.push({ type: 'quote', text: plain(item.quote?.rich_text) });
        break;
      case 'image': {
        const src = fileUrl(item.image);
        if (src) {
          blocks.push({ type: 'image', src, alt: plain(item.image?.caption), caption: plain(item.image?.caption) });
        }
        break;
      }
      case 'divider':
        blocks.push({ type: 'divider' });
        break;
      default:
        break;
    }
  }

  return blocks;
};

const queryDatabase = async () => {
  const payload = await request<{ results: NotionPage[] }>(`/databases/${databaseId}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        or: [
          { property: 'Durum', select: { equals: 'Yayında' } },
          { property: 'Status', select: { equals: 'Published' } },
        ],
      },
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      page_size: 50,
    }),
  });

  return payload.results;
};

const notionProvider: BlogProvider = {
  name: 'notion',

  async listPosts() {
    const pages = await queryDatabase();
    return pages
      .map(toSummary)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async getPost(slug) {
    const pages = await queryDatabase();
    const page = pages.find((item) => toSummary(item).slug === slug);
    if (!page) return null;

    const children = await request<{ results: NotionBlock[] }>(
      `/blocks/${page.id}/children?page_size=100`,
    );

    const blocks = toBlocks(children.results);
    const summary = toSummary(page);

    return { ...summary, blocks, readingMinutes: estimateReadingMinutes(blocks) } satisfies Post;
  },
};

export default notionProvider;
