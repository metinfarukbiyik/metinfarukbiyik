import { notifyIsland } from '@/lib/island';

/** Rasterises an SVG string to a PNG of the given pixel width (height keeps the aspect ratio). */
export function svgToPng(svg: string, width: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const image = new Image();
    image.onload = () => {
      const ratio = image.height / image.width || 1;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = Math.round(width * ratio);
      const context = canvas.getContext('2d');
      if (!context) {
        URL.revokeObjectURL(url);
        return reject(new Error('canvas'));
      }
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('blob'))), 'image/png');
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('svg'));
    };
    image.src = url;
  });
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  notifyIsland({ title: 'İndirildi', detail: filename, icon: 'download', tone: 'blue' });
}

export async function copyPng(blob: Blob) {
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  notifyIsland({ title: 'Görsel kopyalandı', detail: 'PNG panoda', icon: 'copy', tone: 'green' });
}
