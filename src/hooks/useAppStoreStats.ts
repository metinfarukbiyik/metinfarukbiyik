import { useEffect, useState } from 'react';
import { geocam } from '../data/geocamData';

export interface AppStoreStats {
  rating: number;
  ratingCount: number;
  version: string;
}

const FALLBACK: AppStoreStats = {
  rating: Number(geocam.rating.replace(',', '.')),
  ratingCount: geocam.ratingCount,
  version: geocam.version,
};

const LOOKUP_URL = 'https://itunes.apple.com/lookup?id=6797103829&country=tr';

const useAppStoreStats = (): AppStoreStats => {
  const [stats, setStats] = useState<AppStoreStats>(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();

    fetch(LOOKUP_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const app = data?.results?.[0];
        if (!app) return;

        setStats({
          rating: typeof app.averageUserRating === 'number' ? app.averageUserRating : FALLBACK.rating,
          ratingCount: typeof app.userRatingCount === 'number' ? app.userRatingCount : FALLBACK.ratingCount,
          version: typeof app.version === 'string' ? app.version : FALLBACK.version,
        });
      })
      .catch(() => {
        /* App Store yanıt vermezse sabit değerler kalır */
      });

    return () => controller.abort();
  }, []);

  return stats;
};

export default useAppStoreStats;
