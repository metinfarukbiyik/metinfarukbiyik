import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const [day, month, year] = dateStr.split('.').map(Number);
  const aylar = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return `${day} ${aylar[month - 1]} ${year}`;
}

export function createMetaTitle(title: string) {
  return `${title} | Metin Faruk Bıyık`;
}

export function getImageSizes(type: 'card' | 'gallery' | 'full') {
  switch (type) {
    case 'card':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'full':
      return '100vw';
    default:
      return '100vw';
  }
}

export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}; 