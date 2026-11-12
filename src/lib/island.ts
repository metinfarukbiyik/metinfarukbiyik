/**
 * Dinamik Ada — sitenin herhangi bir yerinden "canlı etkinlik" göstermek için
 * küçük bir olay kanalı. Ada (src/components/DynamicIsland.tsx) bu olayı dinler,
 * kısa bir süre genişleyip mesajı gösterir ve yeniden küçülür.
 *
 *   notifyIsland({ title: 'Kopyalandı', detail: '192.168.1.1', icon: 'copy' });
 */
export type IslandIcon = 'check' | 'copy' | 'download' | 'moon' | 'sun' | 'page' | 'error' | 'link';
export type IslandTone = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'gray' | 'red';

export type IslandActivity = {
  title: string;
  detail?: string;
  icon?: IslandIcon;
  tone?: IslandTone;
  /** Ekranda kalma süresi (ms). Varsayılan 2200. */
  duration?: number;
};

export const ISLAND_EVENT = 'island:activity';

export function notifyIsland(activity: IslandActivity) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<IslandActivity>(ISLAND_EVENT, { detail: activity }));
}
