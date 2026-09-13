export interface CategoryStyle {
  badge: string;
  gradient: string;
  accent: string;
}

const styles: Record<string, CategoryStyle> = {
  Gezi: {
    badge: 'bg-teal-50 text-teal-700 ring-teal-600/20',
    gradient: 'from-teal-500 via-cyan-500 to-sky-600',
    accent: 'text-teal-600',
  },
  Hayat: {
    badge: 'bg-brand-50 text-brand-700 ring-brand-600/20',
    gradient: 'from-brand-500 via-indigo-500 to-violet-600',
    accent: 'text-brand-600',
  },
  Teknoloji: {
    badge: 'bg-violet-50 text-violet-700 ring-violet-600/20',
    gradient: 'from-violet-500 via-fuchsia-500 to-rose-500',
    accent: 'text-violet-600',
  },
  Kariyer: {
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    accent: 'text-amber-600',
  },
  Fotoğraf: {
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    accent: 'text-rose-600',
  },
};

const fallback: CategoryStyle = {
  badge: 'bg-gray-100 text-gray-700 ring-gray-600/20',
  gradient: 'from-gray-600 via-gray-700 to-gray-900',
  accent: 'text-gray-600',
};

export const getCategoryStyle = (category: string): CategoryStyle => styles[category] ?? fallback;

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
