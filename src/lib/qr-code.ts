import QRCode from 'qrcode';

export type QrKind = 'url' | 'wifi' | 'text' | 'email' | 'phone';
export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';
export type ErrorLevel = 'L' | 'M' | 'Q' | 'H';
export type ModuleStyle = 'square' | 'rounded' | 'dots';
export type EyeStyle = 'square' | 'rounded' | 'circle';

export interface QrContent {
  kind: QrKind;
  url: string;
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden: boolean;
  text: string;
  email: string;
  subject: string;
  body: string;
  phone: string;
}

export interface QrStyle {
  foreground: string;
  background: string;
  eyeColor: string;
  transparent: boolean;
  moduleStyle: ModuleStyle;
  eyeStyle: EyeStyle;
  errorLevel: ErrorLevel;
  /** Quiet zone in modules. Scanners expect 4. */
  margin: number;
  caption: string;
  /** data: URL of an optional centre logo. */
  logo: string | null;
  /** Logo width as a share of the code width (0.1 – 0.3). */
  logoScale: number;
}

export const defaultContent: QrContent = {
  kind: 'url',
  url: '',
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: false,
  text: '',
  email: '',
  subject: '',
  body: '',
  phone: '',
};

export const defaultStyle: QrStyle = {
  foreground: '#1e2227',
  background: '#ffffff',
  eyeColor: '#1e2227',
  transparent: false,
  moduleStyle: 'square',
  eyeStyle: 'square',
  errorLevel: 'M',
  margin: 4,
  caption: '',
  logo: null,
  logoScale: 0.22,
};

/** Escapes the characters the Wi-Fi QR format reserves: \ ; , : " */
export function escapeWifi(value: string) {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

export function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Builds the string the QR code encodes. Returns '' while required fields are empty. */
export function buildPayload(content: QrContent) {
  switch (content.kind) {
    case 'url':
      return normalizeUrl(content.url);
    case 'wifi': {
      if (!content.ssid) return '';
      const parts = [`T:${content.security}`, `S:${escapeWifi(content.ssid)}`];
      if (content.security !== 'nopass') parts.push(`P:${escapeWifi(content.password)}`);
      if (content.hidden) parts.push('H:true');
      return `WIFI:${parts.join(';')};;`;
    }
    case 'text':
      return content.text;
    case 'email': {
      const to = content.email.trim();
      if (!to) return '';
      const query = new URLSearchParams();
      if (content.subject) query.set('subject', content.subject);
      if (content.body) query.set('body', content.body);
      const search = query.toString().replace(/\+/g, '%20');
      return `mailto:${to}${search ? `?${search}` : ''}`;
    }
    case 'phone': {
      const phone = content.phone.replace(/[^\d+]/g, '');
      return phone ? `tel:${phone}` : '';
    }
  }
}

/** Returns a problem with the content, or null when it can be encoded as-is. */
export function validateContent(content: QrContent): string | null {
  if (content.kind === 'url' && content.url.trim()) {
    try {
      const url = new URL(normalizeUrl(content.url));
      if (!url.hostname.includes('.') && url.protocol.startsWith('http'))
        return 'Bağlantı geçerli bir alan adı içermiyor.';
    } catch {
      return 'Bağlantı geçerli bir adres değil.';
    }
  }
  if (content.kind === 'wifi' && content.ssid) {
    if (content.security === 'WPA' && content.password && content.password.length < 8)
      return 'WPA/WPA2 şifreleri en az 8 karakter olmalıdır.';
    if (content.security !== 'nopass' && !content.password) return 'Şifreli ağ için şifreyi gir.';
  }
  if (content.kind === 'email' && content.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.email.trim()))
    return 'E-posta adresi geçerli görünmüyor.';
  return null;
}

export interface QrMatrix {
  size: number;
  isDark: (row: number, col: number) => boolean;
}

export function createMatrix(payload: string, errorLevel: ErrorLevel): QrMatrix {
  const { modules } = QRCode.create(payload, { errorCorrectionLevel: errorLevel });
  return { size: modules.size, isDark: (row, col) => Boolean(modules.get(row, col)) };
}

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

const round = (value: number) => Math.round(value * 1000) / 1000;

function inFinder(row: number, col: number, size: number) {
  return (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);
}

function eye(x: number, y: number, style: EyeStyle, color: string) {
  if (style === 'circle') {
    return (
      `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="3" fill="none" stroke="${color}" stroke-width="1"/>` +
      `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.5" fill="${color}"/>`
    );
  }
  const outer = style === 'rounded' ? 2 : 0;
  const inner = style === 'rounded' ? 0.9 : 0;
  return (
    `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="${outer}" fill="none" stroke="${color}" stroke-width="1"/>` +
    `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="${inner}" fill="${color}"/>`
  );
}

/**
 * Renders the matrix as a standalone SVG string in module units.
 * Finder patterns are drawn separately so they can carry their own style and colour.
 */
export function renderQrSvg(matrix: QrMatrix, style: QrStyle) {
  const { size } = matrix;
  const margin = Math.max(0, Math.min(10, Math.round(style.margin)));
  const width = size + margin * 2;
  const captionHeight = style.caption.trim() ? Math.max(4, width * 0.14) : 0;
  const height = width + captionHeight;

  const logoSize = style.logo ? round(size * Math.min(0.3, Math.max(0.1, style.logoScale))) : 0;
  const logoStart = (size - logoSize) / 2;
  // Modules behind the logo (plus half a module of breathing room) are left out.
  const underLogo = (row: number, col: number) =>
    logoSize > 0 &&
    row + 1 > logoStart - 0.5 &&
    row < logoStart + logoSize + 0.5 &&
    col + 1 > logoStart - 0.5 &&
    col < logoStart + logoSize + 0.5;

  let modules = '';
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!matrix.isDark(row, col) || inFinder(row, col, size) || underLogo(row, col)) continue;
      const x = col + margin;
      const y = row + margin;
      if (style.moduleStyle === 'dots') modules += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.42"/>`;
      else if (style.moduleStyle === 'rounded')
        modules += `<rect x="${x + 0.05}" y="${y + 0.05}" width="0.9" height="0.9" rx="0.32"/>`;
      else modules += `M${x} ${y}h1v1h-1z`;
    }
  }
  const moduleMarkup =
    style.moduleStyle === 'square'
      ? `<path fill="${style.foreground}" d="${modules}"/>`
      : `<g fill="${style.foreground}">${modules}</g>`;

  const eyes = [
    [margin, margin],
    [margin + size - 7, margin],
    [margin, margin + size - 7],
  ]
    .map(([x, y]) => eye(x, y, style.eyeStyle, style.eyeColor))
    .join('');

  let logo = '';
  if (style.logo) {
    const x = round(margin + logoStart);
    const pad = 0.4;
    logo =
      `<rect x="${round(x - pad)}" y="${round(x - pad)}" width="${round(logoSize + pad * 2)}" height="${round(logoSize + pad * 2)}" rx="${round(logoSize * 0.18)}" fill="${style.transparent ? '#ffffff' : style.background}"/>` +
      `<image href="${escapeXml(style.logo)}" x="${x}" y="${x}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  const caption = captionHeight
    ? `<text x="${width / 2}" y="${round(width + captionHeight * 0.42)}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="${round(captionHeight * 0.48)}" font-weight="600" fill="${style.foreground}">${escapeXml(style.caption.trim())}</text>`
    : '';

  const background = style.transparent
    ? ''
    : `<rect width="${width}" height="${round(height)}" fill="${style.background}"/>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${round(height)}" shape-rendering="${style.moduleStyle === 'square' ? 'crispEdges' : 'geometricPrecision'}">` +
    background +
    moduleMarkup +
    eyes +
    logo +
    caption +
    `</svg>`
  );
}

/** Relative luminance contrast ratio between two #rrggbb colours (WCAG formula). */
export function contrastRatio(a: string, b: string) {
  const luminance = (hex: string) => {
    const value = hex.replace('#', '');
    const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
    const [r, g, bl] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Dark modules must be darker than the background or many scanners fail. */
export function styleWarning(style: QrStyle): string | null {
  const background = style.transparent ? '#ffffff' : style.background;
  const ratio = Math.min(contrastRatio(style.foreground, background), contrastRatio(style.eyeColor, background));
  if (ratio < 3) return 'Renkler arasındaki kontrast düşük; bazı cihazlar kodu okuyamayabilir.';
  const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
  if (!style.transparent && lum(style.foreground) > lum(style.background))
    return 'Açık renkli kod koyu zeminde bazı tarayıcılarla okunmayabilir.';
  if (style.margin < 2) return 'Kenar boşluğu çok dar; baskıda en az 2–4 modül bırakman önerilir.';
  return null;
}

export function qrFileName(kind: QrKind, extension: 'png' | 'svg') {
  const names: Record<QrKind, string> = {
    url: 'baglanti',
    wifi: 'wifi',
    text: 'metin',
    email: 'eposta',
    phone: 'telefon',
  };
  return `biyik-dev_qr_${names[kind]}.${extension}`;
}
