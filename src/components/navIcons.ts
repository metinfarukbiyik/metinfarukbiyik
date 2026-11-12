import { FolderGit2, House, Mail, UserRound, Wrench, type LucideIcon } from 'lucide-react';
import type { IslandTone } from '@/lib/island';

/**
 * Her sayfanın ikonu ve rengi — macOS Sistem Ayarları kenar çubuğundaki gibi
 * renkli, yuvarlatılmış kare kutular. Menü, Dinamik Ada ve ana sayfa bunu paylaşır.
 */
export const navIcons: Record<string, { icon: LucideIcon; tone: IslandTone }> = {
  '/': { icon: House, tone: 'blue' },
  '/hakkimda': { icon: UserRound, tone: 'orange' },
  '/projeler': { icon: FolderGit2, tone: 'purple' },
  '/araclar': { icon: Wrench, tone: 'gray' },
  '/iletisim': { icon: Mail, tone: 'green' },
};
