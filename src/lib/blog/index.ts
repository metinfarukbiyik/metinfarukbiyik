import { isSanityConfigured } from '@/sanity/env';
import demoProvider from './providers/demo';
import notionProvider from './providers/notion';
import sanityProvider from './providers/sanity';
import type { BlogProvider, Post, PostSummary } from './types';

/**
 * Yazıların nereden geleceğini BLOG_SOURCE belirler; tanımlı değilse
 * Sanity bağlıysa Sanity, değilse örnek içerik kullanılır.
 * Sayfalar tek bir arayüze baktığı için kaynak değişince arayüz kodu değişmez.
 */
const providers: Record<string, BlogProvider> = {
  demo: demoProvider,
  sanity: sanityProvider,
  notion: notionProvider,
};

const fallbackProvider = isSanityConfigured ? sanityProvider : demoProvider;
const requestedSource = process.env.BLOG_SOURCE?.toLowerCase();
const provider = (requestedSource && providers[requestedSource]) || fallbackProvider;

export const blogSource = provider.name;

export const getPosts = (): Promise<PostSummary[]> => provider.listPosts();

export const getPost = (slug: string): Promise<Post | null> => provider.getPost(slug);

export const getFeaturedPost = async (): Promise<PostSummary | undefined> => {
  const posts = await getPosts();
  return posts.find((post) => post.featured) ?? posts[0];
};

export const getLatestPosts = async (limit: number): Promise<PostSummary[]> =>
  (await getPosts()).slice(0, limit);

export type { Post, PostSummary };
