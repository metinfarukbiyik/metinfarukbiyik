import type { SpeedResult } from './network-tools';

export type SpeedDisplayUnit = 'Mbps' | 'MB/s';

const format = (value: number) =>
  value.toLocaleString('tr-TR', { maximumFractionDigits: 2 });

export function speedResultFileName(result: SpeedResult) {
  const date = new Date(result.timestamp);
  const two = (value: number) => String(value).padStart(2, '0');
  return `biyik-dev_hiz-testi_${date.getFullYear()}-${two(date.getMonth() + 1)}-${two(date.getDate())}_${two(date.getHours())}-${two(date.getMinutes())}.png`;
}

/** Draw a self-contained share card; no network request or private IP is needed. */
export async function createSpeedResultImage(
  result: SpeedResult,
  unit: SpeedDisplayUnit,
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 900;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Görsel bu tarayıcıda oluşturulamadı.');

  const rounded = (
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number,
    color: string,
  ) => {
    context.beginPath();
    if (typeof context.roundRect === 'function') {
      context.roundRect(x, y, w, h, radius);
    } else {
      context.moveTo(x + radius, y);
      context.lineTo(x + w - radius, y);
      context.quadraticCurveTo(x + w, y, x + w, y + radius);
      context.lineTo(x + w, y + h - radius);
      context.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      context.lineTo(x + radius, y + h);
      context.quadraticCurveTo(x, y + h, x, y + h - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    }
    context.fillStyle = color;
    context.fill();
  };
  const label = (
    value: string,
    x: number,
    y: number,
    size: number,
    color: string,
    weight = 400,
    maxWidth?: number,
  ) => {
    context.font = `${weight} ${size}px Arial, sans-serif`;
    context.fillStyle = color;
    if (maxWidth) context.fillText(value, x, y, maxWidth);
    else context.fillText(value, x, y);
  };
  const gradient = context.createLinearGradient(0, 0, 1200, 900);
  gradient.addColorStop(0, '#eaf1f6');
  gradient.addColorStop(1, '#f7f9fa');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1200, 900);

  rounded(54, 48, 1092, 804, 32, '#ffffff');
  rounded(98, 90, 64, 64, 19, '#e8f0f6');
  context.strokeStyle = '#5c7e99';
  context.lineWidth = 4;
  context.beginPath();
  context.arc(130, 122, 17, Math.PI, 0);
  context.moveTo(130, 122);
  context.lineTo(141, 110);
  context.stroke();
  label('biyik.dev', 182, 117, 28, '#30475a', 600);
  label('İNTERNET ARAÇLARI', 182, 145, 15, '#788d9d', 600);
  label('İnternet hız testi', 98, 229, 46, '#263d50', 600);
  label('Bağlantı ölçümüm', 100, 272, 22, '#6c8191');

  const metrics = [
    {
      title: 'İNDİRME',
      value: format(unit === 'Mbps' ? result.download : result.download / 8),
      unit,
      x: 98,
      y: 315,
    },
    {
      title: 'YÜKLEME',
      value: format(unit === 'Mbps' ? result.upload : result.upload / 8),
      unit,
      x: 607,
      y: 315,
    },
    {
      title: 'GECİKME · HTTP',
      value: format(result.latency),
      unit: 'ms',
      x: 98,
      y: 510,
    },
    {
      title: 'JITTER',
      value: format(result.jitter),
      unit: 'ms',
      x: 607,
      y: 510,
    },
  ];
  for (const metric of metrics) {
    rounded(metric.x, metric.y, 495, 180, 20, '#f2f6f9');
    label(metric.title, metric.x + 28, metric.y + 42, 17, '#70889a', 600);
    label(metric.value, metric.x + 28, metric.y + 119, 54, '#355a76', 600, 340);
    label(metric.unit, metric.x + 28, metric.y + 150, 18, '#718696');
  }
  context.strokeStyle = '#e4ebf0';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(98, 741);
  context.lineTo(1102, 741);
  context.stroke();
  const date = new Date(result.timestamp).toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  label(date, 98, 788, 19, '#687e8e');
  context.textAlign = 'right';
  label('Cloudflare ağı üzerinden ölçüldü', 1102, 788, 18, '#687e8e');

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('Sonuç görseli oluşturulamadı.')),
      'image/png',
    ),
  );
}
