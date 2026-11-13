import { screenshots as bizimKoyScreenshots } from './bizimKoyData';
import { downloads, portableDownload } from './bykData';
import { screenshots } from './geocamData';
import type { PortfolioProject } from './projects';

export interface ProjectAction {
  label: string;
  url: string;
  kind: 'download' | 'visit' | 'source';
  external?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectPresentation {
  actions: ProjectAction[];
  note: string;
  images: ProjectImage[];
}

export function getProjectPresentation(project: PortfolioProject): ProjectPresentation {
  if (project.slug === 'byk-music') {
    const release = `${project.url}/releases/latest/download`;
    return {
      actions: [
        { label: 'Windows için indir', url: `${release}/BYKMusic-Windows-Setup.exe`, kind: 'download' },
        { label: 'macOS için indir', url: `${release}/BYKMusic-macOS.dmg`, kind: 'download' },
        { label: 'GitHub’da görüntüle', url: project.url, kind: 'source', external: true },
      ],
      note: 'Windows 10 / 11 · Apple Silicon Mac (M1 ve sonrası)',
      images: [{ src: '/images/music/download.png', alt: 'BYK Music indirme ekranı', caption: 'Uygulama arayüzü' }],
    };
  }
  if (project.slug === 'byk-seri-baski-pro') {
    return {
      actions: [
        ...downloads.map((item): ProjectAction => ({ label: `${item.label} için indir`, url: item.url, kind: 'download' })),
        { label: 'Taşınabilir sürüm', url: portableDownload.url, kind: 'download' },
        { label: 'GitHub’da görüntüle', url: project.url, kind: 'source', external: true },
      ],
      note: 'Windows 10 / 11 · macOS 12+ · TSPL uyumlu termal yazıcı gerekir.',
      images: [
        { src: '/images/byk/banner.png', alt: 'BYK Seri Baskı Pro tanıtım görseli', caption: 'Toplu etiket baskısı' },
        { src: '/images/byk/label-square.png', alt: 'Kare barkod etiketi örneği', caption: 'Barkod etiketi' },
        { src: '/images/byk/label-qr.png', alt: 'QR kodlu etiket örneği', caption: 'QR kod etiketi' },
      ],
    };
  }
  if (project.slug === 'bizim-koy') {
    return {
      actions: [{ label: 'Hemen oyna', url: project.url, kind: 'visit', external: true }],
      note: 'İndirme yok · Masaüstü ve mobil tarayıcıda çalışır',
      images: bizimKoyScreenshots,
    };
  }
  if (project.slug === 'draw') {
    return {
      actions: [
        { label: 'Tahtayı aç', url: project.url, kind: 'visit', external: true },
        { label: 'Nasıl kullanılır?', url: `${project.url}/docs`, kind: 'visit', external: true },
        { label: 'GitHub’da görüntüle', url: 'https://github.com/metinfarukbiyik/biyik-draw', kind: 'source', external: true },
      ],
      note: 'Üyelik ve indirme yok · Masaüstü ve mobil tarayıcı · Çevrimdışı çalışır · MIT lisansı',
      images: [
        { src: '/draw-docs/tr-flowchart.webp', alt: 'draw.biyik.dev ile çizilmiş akış şeması', caption: 'El çizimi akış şeması' },
        { src: '/draw-docs/tr-share.webp', alt: 'Çizimi bağlantıyla paylaşma penceresi', caption: 'Bağlantıyla paylaşma' },
        { src: '/draw-docs/tr-layers.webp', alt: 'Katmanlar paneli ve gruplar', caption: 'Katmanlar ve gruplar' },
      ],
    };
  }
  if (project.slug === 'geocam') {
    return {
      actions: [{ label: 'App Store’dan indir', url: project.url, kind: 'download', external: true }],
      note: 'iPhone · iOS 17 ve sonrası',
      images: screenshots.slice(0, 3),
    };
  }
  return {
    actions: [{ label: 'Web sitesini aç', url: project.url, kind: 'visit', external: true }],
    note: 'Web tarayıcısı üzerinden erişilebilir.',
    images: [],
  };
}
