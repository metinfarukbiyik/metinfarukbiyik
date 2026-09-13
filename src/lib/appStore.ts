import { geocam } from '@/data/geocamData';

export interface AppStoreStats {
  rating: number;
  ratingCount: number;
  version: string;
}

const fallback: AppStoreStats = {
  rating: Number(geocam.rating.replace(',', '.')),
  ratingCount: geocam.ratingCount,
  version: geocam.version,
};

const LOOKUP_URL = 'https://itunes.apple.com/lookup?id=6797103829&country=tr';

/** Puan ve sürüm bilgisi App Store'dan sunucu tarafında çekilir, günde bir tazelenir. */
export const getAppStoreStats = async (): Promise<AppStoreStats> => {
  try {
    const response = await fetch(LOOKUP_URL, { next: { revalidate: 86400 } });
    if (!response.ok) return fallback;

    const data = (await response.json()) as {
      results?: { averageUserRating?: number; userRatingCount?: number; version?: string }[];
    };
    const app = data.results?.[0];
    if (!app) return fallback;

    return {
      rating: typeof app.averageUserRating === 'number' ? app.averageUserRating : fallback.rating,
      ratingCount:
        typeof app.userRatingCount === 'number' ? app.userRatingCount : fallback.ratingCount,
      version: typeof app.version === 'string' ? app.version : fallback.version,
    };
  } catch {
    return fallback;
  }
};
