/**
 * Hazır ikon ve çıkartma kütüphanesi: dosya türleri, sosyal medya, sayılar, etiketler,
 * emojiler, çıkartmalar ve konu ikonları. Her ikon bir SVG olarak çizilir ve tuvale görsel
 * öğe olarak eklenir; dışa aktarma ve paylaşım bağlantısıyla birlikte taşınır.
 *
 * Simgelerin çoğunun iç çizimi lucide ikonlarıdır (ISC lisansı). Sosyal medya logoları
 * Simple Icons'tan (CC0) alınmıştır, bkz. ./brand-icons.ts. Dosya ikonları marka logosu
 * değildir; türün bilinen rengini ve uzantısını taşır.
 */
import type { ReactNode } from 'react';
import {
  Activity,
  Ambulance,
  Anchor,
  Apple,
  Archive,
  Atom,
  Award,
  Baby,
  Backpack,
  Banana,
  Banknote,
  Bike,
  Bird,
  BookOpen,
  Bot,
  Brain,
  Braces,
  Briefcase,
  Bug,
  Building2,
  Bus,
  Cake,
  Calculator,
  Calendar,
  CalendarCheck,
  Camera,
  Car,
  Carrot,
  Cat,
  ChartColumn,
  ChartLine,
  ChartPie,
  Cherry,
  CircleCheck,
  CircleX,
  Citrus,
  Clapperboard,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  CloudRain,
  CloudSun,
  Code,
  Coffee,
  Compass,
  Contact,
  Cookie,
  Cpu,
  CreditCard,
  Croissant,
  Crown,
  CupSoda,
  Database,
  Dices,
  Dog,
  Donut,
  Download,
  Drama,
  Dumbbell,
  Earth,
  Egg,
  Factory,
  Film,
  Fish,
  Flag,
  Flame,
  Flower2,
  Folder,
  Fuel,
  Gamepad2,
  Gift,
  Globe,
  GraduationCap,
  Grape,
  Guitar,
  Hammer,
  Handshake,
  HardDrive,
  Headphones,
  Headset,
  Heart,
  HeartPulse,
  Hospital,
  Hourglass,
  House,
  IceCreamCone,
  Image,
  Info,
  Kanban,
  Key,
  Landmark,
  Laptop,
  Leaf,
  Library,
  Lightbulb,
  Link,
  Linkedin,
  ListChecks,
  Lock,
  Mail,
  Map as MapIcon,
  MapPin,
  Medal,
  Megaphone,
  MessageSquare,
  Mic,
  Microscope,
  Milk,
  Monitor,
  Moon,
  Mountain,
  Music,
  Network,
  Package,
  Paintbrush,
  Palette,
  PartyPopper,
  PawPrint,
  PenTool,
  Pencil,
  Phone,
  Piano,
  Pill,
  Pizza,
  Plane,
  Popcorn,
  Presentation,
  Printer,
  Puzzle,
  QrCode,
  Rabbit,
  Radio,
  Rainbow,
  Receipt,
  Rocket,
  Router,
  Ruler,
  Sailboat,
  Salad,
  Sandwich,
  Scale,
  School,
  Scissors,
  Search,
  Send,
  Server,
  Settings,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Signpost,
  Slack,
  Smartphone,
  Snail,
  Snowflake,
  Soup,
  Sprout,
  Squirrel,
  Star,
  Stethoscope,
  Store,
  Sun,
  Syringe,
  Table,
  Tablet,
  Target,
  Tent,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  Ticket,
  Tractor,
  TrainFront,
  TreePine,
  TriangleAlert,
  Trophy,
  Truck,
  Turtle,
  Tv,
  Umbrella,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  Utensils,
  Video,
  Volleyball,
  Warehouse,
  Wifi,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { BRANDS } from './brand-icons';
import type { Lang } from './i18n';

export type IconCategory =
  | 'files'
  | 'social'
  | 'communication'
  | 'people'
  | 'business'
  | 'tech'
  | 'education'
  | 'numbers'
  | 'labels'
  | 'stickers'
  | 'emoji'
  | 'nature'
  | 'food'
  | 'travel'
  | 'health'
  | 'hobby'
  | 'status';

export const ICON_CATEGORIES: IconCategory[] = [
  'files',
  'social',
  'communication',
  'people',
  'business',
  'tech',
  'education',
  'numbers',
  'labels',
  'stickers',
  'emoji',
  'nature',
  'food',
  'travel',
  'health',
  'hobby',
  'status',
];

/** Çizilmiş ikon: SVG içeriği ve görünüm kutusu (varsayılan 64×64). */
export interface Drawn {
  body: ReactNode;
  w?: number;
  h?: number;
}

export interface IconDef {
  id: string;
  category: IconCategory;
  tr: string;
  en: string;
  /** Aramada eşleşen ek sözcükler. */
  keywords: string;
  /** Dil, yalnızca yazı içeren ikonlarda (etiketler) çizimi değiştirir. */
  draw: (lang: Lang) => Drawn;
}

const C = {
  green: '#1D8A50',
  teal: '#0E8F86',
  blue: '#2563EB',
  sky: '#0284C7',
  indigo: '#4F46E5',
  purple: '#7C3AED',
  pink: '#DB2777',
  red: '#DC2626',
  orange: '#EA580C',
  amber: '#D97706',
  slate: '#475569',
  ink: '#1F2937',
};

const PALETTE = [C.blue, C.red, C.green, C.orange, C.purple, C.teal, C.pink, C.amber, C.indigo, C.sky, C.slate];

const FONT = 'Arial, Helvetica, sans-serif';

/** Ortalanmış kalın yazı. */
function Label({ x, y, size, fill = '#fff', children }: { x: number; y: number; size: number; fill?: string; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontFamily={FONT} fontWeight="700" fontSize={size} fill={fill}>
      {children}
    </text>
  );
}

/* ───────────── Çizim yardımcıları ───────────── */

/** Belge sayfası, köşesi kıvrık; altta renkli uzantı etiketi. */
function file(label: string, color: string, Glyph: LucideIcon | 'lines'): ReactNode {
  return (
    <>
      <path
        d="M18 4h24l14 14v38a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#fff"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M42 4v10a4 4 0 0 0 4 4h10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
      {Glyph === 'lines' ? (
        <path d="M22 14h14M22 20h20M22 26h20" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <g transform="translate(22 11)">
          <Glyph size={18} color={color} strokeWidth={2.2} />
        </g>
      )}
      <rect x="6" y="34" width="42" height="18" rx="4" fill={color} />
      <text
        x="27"
        y="47.2"
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight="700"
        fontSize={label.length > 4 ? 10 : 11.5}
        letterSpacing="0.3"
        fill="#fff"
      >
        {label}
      </text>
    </>
  );
}

/** Renkli yuvarlak köşeli kare üzerinde beyaz simge. */
function tile(color: string, Glyph: LucideIcon): ReactNode {
  return (
    <>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={color} />
      <g transform="translate(16 16)">
        <Glyph size={32} color="#fff" strokeWidth={2} />
      </g>
    </>
  );
}

/** Logo: marka renginde kare, üzerinde beyaz (ya da verilen renkte) logo. */
function brand(key: keyof typeof BRANDS, opts: { fg?: string; bg?: string } = {}): ReactNode {
  const b = BRANDS[key];
  return (
    <>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={opts.bg ?? b.hex} />
      <path d={b.path} fill={opts.fg ?? '#fff'} transform="translate(16 16) scale(1.3333)" />
    </>
  );
}

function instagram(): ReactNode {
  return (
    <>
      <defs>
        <radialGradient id="sk-ig-grad" cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="0.45" stopColor="#FF0069" />
          <stop offset="1" stopColor="#7638FA" />
        </radialGradient>
      </defs>
      {brand('instagram', { bg: 'url(#sk-ig-grad)' })}
    </>
  );
}

/** Renkli dairede sayı ya da harf. */
function disc(text: string, color: string): ReactNode {
  return (
    <>
      <circle cx="32" cy="32" r="27" fill={color} />
      <Label x={32} y={33} size={text.length > 1 ? 25 : 31}>
        {text}
      </Label>
    </>
  );
}

/** Kurdeleli madalya (1., 2., 3.). */
function medal(n: string, color: string, edge: string): ReactNode {
  return (
    <>
      <path d="M18 2h11l7 20H25z" fill="#2563EB" />
      <path d="M46 2H35l-7 20h11z" fill="#DC2626" />
      <circle cx="32" cy="40" r="20" fill={color} stroke={edge} strokeWidth="3.5" />
      <Label x={32} y={41} size={22}>
        {n}
      </Label>
    </>
  );
}

/** Renkli kare üzerinde matematik sembolü. */
function symbol(sym: string, color: string, size = 34): ReactNode {
  return (
    <>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={color} />
      <Label x={32} y={32} size={size}>
        {sym}
      </Label>
    </>
  );
}

/** Hap biçiminde yazılı etiket; genişlik yazıya göre. */
function pill(text: string, color: string): Drawn {
  const size = 15;
  const h = 34;
  const w = Math.round(Math.max(52, [...text].length * size * 0.74 + 30));
  return {
    w,
    h,
    body: (
      <>
        <rect x="1" y="1" width={w - 2} height={h - 2} rx={(h - 2) / 2} fill={color} />
        <Label x={w / 2} y={h / 2 + 0.5} size={size}>
          {text}
        </Label>
      </>
    ),
  };
}

function starPoints(n: number, outer: number, inner: number, cx = 32, cy = 32) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / n - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

/** Dört köşeli parıltı. */
function sparkle(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;
}

/** Lucide simgesi, dolgulu ve büyük (çıkartmalar için). */
function filled(Glyph: LucideIcon, fill: string, stroke: string): ReactNode {
  return (
    <g transform="translate(4 4)">
      <Glyph size={56} fill={fill} color={stroke} strokeWidth={1.5} />
    </g>
  );
}

/* ── Emoji yüzler ── */

const FACE_INK = '#3F2A14';

function face(inner: ReactNode, opts: { fill?: string; edge?: string } = {}): ReactNode {
  return (
    <>
      <circle cx="32" cy="32" r="28" fill={opts.fill ?? '#FCD34D'} stroke={opts.edge ?? '#F59E0B'} strokeWidth="2" />
      <g stroke={FACE_INK} strokeWidth="3.5" strokeLinecap="round" fill="none">
        {inner}
      </g>
    </>
  );
}

const dotEyes = (
  <>
    <circle cx="23" cy="26" r="3.5" fill={FACE_INK} stroke="none" />
    <circle cx="41" cy="26" r="3.5" fill={FACE_INK} stroke="none" />
  </>
);
const smile = <path d="M20 38q12 12 24 0" />;

function heartAt(cx: number, cy: number, s: number) {
  return `M${cx} ${cy + s * 0.9}C${cx - s * 1.6} ${cy - s * 0.1} ${cx - s * 0.9} ${cy - s * 1.3} ${cx} ${cy - s * 0.5}C${cx + s * 0.9} ${cy - s * 1.3} ${cx + s * 1.6} ${cy - s * 0.1} ${cx} ${cy + s * 0.9}Z`;
}

/* ───────────── İkon listesi ───────────── */

type Art = ReactNode | ((lang: Lang) => Drawn);
type Row = [id: string, tr: string, en: string, keywords: string, art: Art];

/** Dile göre yazısı değişen etiket satırı. */
function labelRow(id: string, tr: string, en: string, color: string, keywords = ''): Row {
  return [id, tr, en, `etiket label rozet badge ${keywords}`, (lang) => pill(lang === 'en' ? en : tr, color)];
}

const SOCIAL = 'sosyal medya social media';

const rows: Record<IconCategory, Row[]> = {
  files: [
    ['xlsx', 'Excel (XLSX)', 'Excel (XLSX)', 'excel xls xlsx tablo spreadsheet sheet hesap', file('XLSX', C.green, Table)],
    ['docx', 'Word (DOCX)', 'Word (DOCX)', 'word doc docx belge document metin', file('DOCX', C.blue, 'lines')],
    ['pptx', 'PowerPoint (PPTX)', 'PowerPoint (PPTX)', 'powerpoint ppt pptx sunum presentation slayt slide', file('PPTX', C.orange, Presentation)],
    ['pdf', 'PDF', 'PDF', 'pdf belge document acrobat', file('PDF', C.red, 'lines')],
    ['csv', 'CSV', 'CSV', 'csv veri data tablo table', file('CSV', C.teal, Table)],
    ['txt', 'Metin (TXT)', 'Text (TXT)', 'txt metin text not note', file('TXT', C.slate, 'lines')],
    ['png', 'PNG görsel', 'PNG image', 'png resim görsel image picture foto', file('PNG', C.purple, Image)],
    ['jpg', 'JPG görsel', 'JPG image', 'jpg jpeg resim görsel image photo foto', file('JPG', C.pink, Image)],
    ['gif', 'GIF', 'GIF', 'gif animasyon animation resim', file('GIF', C.amber, Image)],
    ['svg', 'SVG', 'SVG', 'svg vektör vector çizim', file('SVG', C.indigo, PenTool)],
    ['mp4', 'Video (MP4)', 'Video (MP4)', 'mp4 video film', file('MP4', C.red, Film)],
    ['mp3', 'Ses (MP3)', 'Audio (MP3)', 'mp3 ses audio müzik music', file('MP3', C.sky, Music)],
    ['zip', 'ZIP arşiv', 'ZIP archive', 'zip rar arşiv archive sıkıştır compress', file('ZIP', C.amber, Archive)],
    ['html', 'HTML', 'HTML', 'html web sayfa page kod code', file('HTML', C.orange, Code)],
    ['json', 'JSON', 'JSON', 'json veri data api kod code', file('JSON', C.slate, Braces)],
    ['folder', 'Klasör', 'Folder', 'klasör folder dizin directory', tile(C.amber, Folder)],
  ],
  social: [
    ['instagram', 'Instagram', 'Instagram', `${SOCIAL} insta foto reels`, instagram()],
    ['facebook', 'Facebook', 'Facebook', `${SOCIAL} fb meta`, brand('facebook')],
    ['x-twitter', 'X (Twitter)', 'X (Twitter)', `${SOCIAL} twitter tweet`, brand('x')],
    ['youtube', 'YouTube', 'YouTube', `${SOCIAL} video kanal channel`, brand('youtube')],
    ['linkedin', 'LinkedIn', 'LinkedIn', `${SOCIAL} iş kariyer career`, tile('#0A66C2', Linkedin)],
    ['whatsapp', 'WhatsApp', 'WhatsApp', `${SOCIAL} mesaj message chat`, brand('whatsapp')],
    ['tiktok', 'TikTok', 'TikTok', `${SOCIAL} video`, brand('tiktok')],
    ['telegram', 'Telegram', 'Telegram', `${SOCIAL} mesaj message`, brand('telegram')],
    ['threads', 'Threads', 'Threads', SOCIAL, brand('threads')],
    ['pinterest', 'Pinterest', 'Pinterest', SOCIAL, brand('pinterest')],
    ['snapchat', 'Snapchat', 'Snapchat', SOCIAL, brand('snapchat', { fg: '#111' })],
    ['reddit', 'Reddit', 'Reddit', `${SOCIAL} forum`, brand('reddit')],
    ['discord', 'Discord', 'Discord', `${SOCIAL} sohbet chat oyun`, brand('discord')],
    ['twitch', 'Twitch', 'Twitch', `${SOCIAL} yayın stream`, brand('twitch')],
    ['messenger', 'Messenger', 'Messenger', `${SOCIAL} mesaj`, brand('messenger')],
    ['bluesky', 'Bluesky', 'Bluesky', SOCIAL, brand('bluesky')],
    ['mastodon', 'Mastodon', 'Mastodon', SOCIAL, brand('mastodon')],
    ['medium', 'Medium', 'Medium', `${SOCIAL} blog yazı`, brand('medium')],
    ['substack', 'Substack', 'Substack', `${SOCIAL} bülten newsletter`, brand('substack')],
    ['vimeo', 'Vimeo', 'Vimeo', `${SOCIAL} video`, brand('vimeo')],
    ['behance', 'Behance', 'Behance', `${SOCIAL} portfolyo tasarım design`, brand('behance')],
    ['dribbble', 'Dribbble', 'Dribbble', `${SOCIAL} tasarım design`, brand('dribbble')],
    ['signal', 'Signal', 'Signal', `${SOCIAL} mesaj`, brand('signal')],
    ['wechat', 'WeChat', 'WeChat', SOCIAL, brand('wechat')],
    ['spotify', 'Spotify', 'Spotify', 'müzik music podcast', brand('spotify')],
    ['apple-music', 'Apple Music', 'Apple Music', 'müzik music', brand('applemusic')],
    ['soundcloud', 'SoundCloud', 'SoundCloud', 'müzik music ses', brand('soundcloud')],
    ['netflix', 'Netflix', 'Netflix', 'dizi film video', brand('netflix')],
    ['github', 'GitHub', 'GitHub', 'kod code git yazılım', brand('github')],
    ['gmail', 'Gmail', 'Gmail', 'e-posta email mail google', brand('gmail')],
    ['meet', 'Google Meet', 'Google Meet', 'toplantı meeting video google', brand('googlemeet')],
    ['zoom', 'Zoom', 'Zoom', 'toplantı meeting video', brand('zoom')],
    ['slack', 'Slack', 'Slack', 'mesaj ekip team chat', tile('#4A154B', Slack)],
    ['notion', 'Notion', 'Notion', 'not wiki doküman', brand('notion')],
    ['trello', 'Trello', 'Trello', 'pano kanban proje', brand('trello')],
    ['figma', 'Figma', 'Figma', 'tasarım design', brand('figma')],
    ['drive', 'Google Drive', 'Google Drive', 'bulut cloud dosya google', brand('googledrive')],
    ['dropbox', 'Dropbox', 'Dropbox', 'bulut cloud dosya', brand('dropbox')],
    ['maps', 'Google Maps', 'Google Maps', 'harita konum map google', brand('googlemaps')],
    ['paypal', 'PayPal', 'PayPal', 'ödeme payment para', brand('paypal')],
    ['shopify', 'Shopify', 'Shopify', 'e-ticaret mağaza shop', brand('shopify')],
    ['wordpress', 'WordPress', 'WordPress', 'web site blog', brand('wordpress')],
    ['apple-logo', 'Apple', 'Apple', 'ios mac iphone', brand('apple')],
    ['android', 'Android', 'Android', 'mobil telefon google', brand('android', { fg: '#073042' })],
  ],
  communication: [
    ['mail', 'E-posta', 'Email', 'mail eposta e-posta email posta outlook', tile(C.blue, Mail)],
    ['send', 'Gönder', 'Send', 'gönder send ilet', tile(C.sky, Send)],
    ['message', 'Mesaj', 'Message', 'mesaj message chat sohbet yorum', tile(C.green, MessageSquare)],
    ['phone', 'Telefon', 'Phone', 'telefon phone arama call', tile(C.teal, Phone)],
    ['video', 'Görüntülü görüşme', 'Video call', 'video toplantı meeting görüşme', tile(C.indigo, Video)],
    ['calendar', 'Takvim', 'Calendar', 'takvim calendar tarih date', tile(C.red, Calendar)],
    ['calendar-check', 'Toplantı', 'Meeting', 'toplantı meeting randevu appointment', tile(C.purple, CalendarCheck)],
    ['megaphone', 'Duyuru', 'Announcement', 'duyuru announcement pazarlama marketing', tile(C.orange, Megaphone)],
    ['headset', 'Destek', 'Support', 'destek support çağrı call center müşteri', tile(C.sky, Headset)],
    ['link', 'Bağlantı', 'Link', 'bağlantı link url', tile(C.slate, Link)],
    ['globe', 'Web sitesi', 'Website', 'web site internet dünya globe', tile(C.blue, Globe)],
  ],
  people: [
    ['user', 'Kişi', 'Person', 'kişi kullanıcı user person çalışan', tile(C.blue, User)],
    ['users', 'Ekip', 'Team', 'ekip takım team grup group', tile(C.indigo, Users)],
    ['user-plus', 'Yeni kişi', 'New person', 'yeni kişi ekle add user işe alım', tile(C.green, UserPlus)],
    ['user-check', 'Onaylı kişi', 'Approved person', 'onay yetkili approved user', tile(C.teal, UserCheck)],
    ['contact', 'Kartvizit', 'Contact', 'kartvizit iletişim contact rehber', tile(C.slate, Contact)],
    ['baby', 'Bebek', 'Baby', 'bebek çocuk baby child', tile(C.pink, Baby)],
    ['building', 'Şirket', 'Company', 'şirket ofis company office bina building', tile(C.slate, Building2)],
    ['landmark', 'Kurum', 'Institution', 'kurum banka bank devlet government', tile(C.indigo, Landmark)],
    ['factory', 'Fabrika', 'Factory', 'fabrika üretim factory production', tile(C.orange, Factory)],
    ['store', 'Mağaza', 'Store', 'mağaza dükkan store shop şube', tile(C.pink, Store)],
    ['warehouse', 'Depo', 'Warehouse', 'depo ambar warehouse stok stock', tile(C.amber, Warehouse)],
    ['briefcase', 'İş', 'Business', 'iş çanta briefcase business proje', tile(C.slate, Briefcase)],
    ['handshake', 'Anlaşma', 'Deal', 'anlaşma ortaklık handshake deal partner', tile(C.green, Handshake)],
    ['house', 'Ev', 'Home', 'ev home ana sayfa', tile(C.sky, House)],
  ],
  business: [
    ['chart-bar', 'Sütun grafik', 'Bar chart', 'grafik chart rapor report sütun bar', tile(C.blue, ChartColumn)],
    ['chart-pie', 'Pasta grafik', 'Pie chart', 'pasta grafik pie chart oran', tile(C.purple, ChartPie)],
    ['chart-line', 'Çizgi grafik', 'Line chart', 'çizgi grafik line chart trend büyüme', tile(C.green, ChartLine)],
    ['money', 'Para', 'Money', 'para money nakit cash ödeme payment', tile(C.green, Banknote)],
    ['card', 'Kredi kartı', 'Credit card', 'kart kredi credit card ödeme payment', tile(C.indigo, CreditCard)],
    ['receipt', 'Fatura', 'Invoice', 'fatura invoice fiş receipt', tile(C.slate, Receipt)],
    ['cart', 'Sepet', 'Cart', 'sepet alışveriş cart shopping sipariş order', tile(C.orange, ShoppingCart)],
    ['package', 'Paket', 'Package', 'paket kargo package ürün product', tile(C.amber, Package)],
    ['truck', 'Teslimat', 'Delivery', 'kargo teslimat lojistik truck delivery', tile(C.teal, Truck)],
    ['target', 'Hedef', 'Goal', 'hedef amaç target goal', tile(C.red, Target)],
    ['trophy', 'Başarı', 'Achievement', 'kupa başarı trophy ödül', tile(C.amber, Trophy)],
    ['lightbulb', 'Fikir', 'Idea', 'fikir ampul idea öneri', tile(C.amber, Lightbulb)],
    ['rocket', 'Lansman', 'Launch', 'roket lansman launch başlangıç startup', tile(C.pink, Rocket)],
    ['scale', 'Hukuk', 'Legal', 'hukuk adalet terazi legal law', tile(C.slate, Scale)],
    ['clipboard-check', 'Onay listesi', 'Checklist', 'onay kontrol checklist clipboard denetim', tile(C.green, ClipboardCheck)],
    ['clipboard-list', 'Görev listesi', 'Task list', 'görev liste task list todo', tile(C.blue, ClipboardList)],
    ['kanban', 'Pano', 'Board', 'kanban pano board proje', tile(C.indigo, Kanban)],
    ['workflow', 'İş akışı', 'Workflow', 'iş akışı süreç workflow process', tile(C.teal, Workflow)],
    ['clock', 'Saat', 'Time', 'saat zaman time clock süre', tile(C.slate, Clock)],
    ['hourglass', 'Bekleme', 'Waiting', 'kum saati bekleme waiting deadline', tile(C.amber, Hourglass)],
    ['flag', 'Kilometre taşı', 'Milestone', 'bayrak milestone kilometre taşı', tile(C.red, Flag)],
  ],
  tech: [
    ['monitor', 'Bilgisayar', 'Computer', 'bilgisayar monitör ekran computer desktop pc', tile(C.slate, Monitor)],
    ['laptop', 'Dizüstü', 'Laptop', 'laptop dizüstü notebook', tile(C.slate, Laptop)],
    ['tablet', 'Tablet', 'Tablet', 'tablet ipad', tile(C.slate, Tablet)],
    ['smartphone', 'Akıllı telefon', 'Smartphone', 'telefon mobil cep smartphone mobile', tile(C.slate, Smartphone)],
    ['printer', 'Yazıcı', 'Printer', 'yazıcı printer çıktı print', tile(C.slate, Printer)],
    ['server', 'Sunucu', 'Server', 'sunucu server backend', tile(C.indigo, Server)],
    ['database', 'Veritabanı', 'Database', 'veritabanı database db sql', tile(C.blue, Database)],
    ['hard-drive', 'Depolama', 'Storage', 'disk depolama storage drive yedek backup', tile(C.slate, HardDrive)],
    ['cloud', 'Bulut', 'Cloud', 'bulut cloud', tile(C.sky, Cloud)],
    ['wifi', 'Wi-Fi', 'Wi-Fi', 'wifi kablosuz wireless internet', tile(C.blue, Wifi)],
    ['router', 'Modem', 'Router', 'modem router ağ network', tile(C.teal, Router)],
    ['network', 'Ağ', 'Network', 'ağ network topoloji', tile(C.teal, Network)],
    ['cpu', 'İşlemci', 'Processor', 'işlemci cpu çip chip donanım hardware', tile(C.indigo, Cpu)],
    ['code', 'Kod', 'Code', 'kod yazılım code software geliştirme', tile(C.slate, Code)],
    ['bot', 'Yapay zekâ', 'AI bot', 'bot yapay zeka ai robot otomasyon', tile(C.purple, Bot)],
    ['lock', 'Kilit', 'Lock', 'kilit güvenlik lock security şifre', tile(C.slate, Lock)],
    ['key', 'Anahtar', 'Key', 'anahtar key şifre password erişim', tile(C.amber, Key)],
    ['shield', 'Güvenlik', 'Security', 'güvenlik kalkan shield security koruma', tile(C.green, ShieldCheck)],
    ['settings', 'Ayarlar', 'Settings', 'ayar ayarlar settings yapılandırma config', tile(C.slate, Settings)],
    ['wrench', 'Bakım', 'Maintenance', 'anahtar tamir bakım wrench maintenance', tile(C.orange, Wrench)],
    ['hammer', 'Yapım', 'Build', 'çekiç yapım inşaat hammer build', tile(C.amber, Hammer)],
    ['qr', 'QR kod', 'QR code', 'qr kod code karekod', tile(C.slate, QrCode)],
    ['search', 'Arama', 'Search', 'arama ara search bul', tile(C.sky, Search)],
    ['download', 'İndir', 'Download', 'indir download', tile(C.blue, Download)],
    ['upload', 'Yükle', 'Upload', 'yükle upload', tile(C.green, Upload)],
  ],
  education: [
    ['school', 'Okul', 'School', 'okul school eğitim education', tile(C.red, School)],
    ['graduation', 'Mezuniyet', 'Graduation', 'mezuniyet kep öğrenci student graduation', tile(C.indigo, GraduationCap)],
    ['book', 'Kitap', 'Book', 'kitap book okuma reading ders', tile(C.blue, BookOpen)],
    ['library', 'Kütüphane', 'Library', 'kütüphane library kaynak', tile(C.amber, Library)],
    ['pencil', 'Kalem', 'Pencil', 'kalem pencil yazı ödev homework', tile(C.orange, Pencil)],
    ['ruler', 'Cetvel', 'Ruler', 'cetvel ruler ölçü geometri', tile(C.teal, Ruler)],
    ['calculator', 'Hesap makinesi', 'Calculator', 'hesap makinesi calculator matematik math', tile(C.slate, Calculator)],
    ['microscope', 'Mikroskop', 'Microscope', 'mikroskop fen bilim science biyoloji', tile(C.green, Microscope)],
    ['atom', 'Atom', 'Atom', 'atom fizik kimya physics chemistry', tile(C.sky, Atom)],
    ['earth', 'Dünya', 'Earth', 'dünya coğrafya earth geography gezegen', tile(C.blue, Earth)],
    ['palette', 'Sanat', 'Art', 'palet resim sanat art boya', tile(C.pink, Palette)],
    ['backpack', 'Çanta', 'Backpack', 'okul çantası backpack öğrenci', tile(C.purple, Backpack)],
    ['list-checks', 'Sınav', 'Quiz', 'sınav test quiz kontrol listesi', tile(C.green, ListChecks)],
    ['award', 'Ödül', 'Award', 'ödül madalya award sertifika certificate', tile(C.amber, Award)],
  ],
  numbers: [
    ...Array.from({ length: 11 }, (_, n): Row => [
      `num-${n}`,
      `${n} sayısı`,
      `Number ${n}`,
      `sayı rakam number digit numara adım step ${n}`,
      disc(String(n), PALETTE[n % PALETTE.length]),
    ]),
    ...['A', 'B', 'C', 'D', 'E'].map((ch, i): Row => [
      `letter-${ch}`,
      `${ch} şıkkı`,
      `Option ${ch}`,
      `harf şık seçenek letter option test sınav quiz ${ch}`,
      disc(ch, [C.blue, C.green, C.orange, C.purple, C.pink][i]),
    ]),
    ['medal-1', 'Birinci', 'First place', 'madalya birinci altın gold first 1', medal('1', '#F59E0B', '#B45309')],
    ['medal-2', 'İkinci', 'Second place', 'madalya ikinci gümüş silver second 2', medal('2', '#9CA3AF', '#4B5563')],
    ['medal-3', 'Üçüncü', 'Third place', 'madalya üçüncü bronz bronze third 3', medal('3', '#C2410C', '#7C2D12')],
    ['plus', 'Artı', 'Plus', 'artı toplama plus add matematik math', symbol('+', C.green, 40)],
    ['minus', 'Eksi', 'Minus', 'eksi çıkarma minus subtract matematik math', symbol('−', C.red, 40)],
    ['times', 'Çarpı', 'Times', 'çarpı çarpma times multiply matematik math', symbol('×', C.blue, 40)],
    ['divide', 'Bölü', 'Divide', 'bölü bölme divide matematik math', symbol('÷', C.orange, 40)],
    ['equals', 'Eşittir', 'Equals', 'eşittir eşit equals matematik math', symbol('=', C.slate, 40)],
    ['not-equal', 'Eşit değil', 'Not equal', 'eşit değil not equal matematik', symbol('≠', C.slate, 38)],
    ['less', 'Küçüktür', 'Less than', 'küçüktür less than matematik', symbol('<', C.indigo, 38)],
    ['greater', 'Büyüktür', 'Greater than', 'büyüktür greater than matematik', symbol('>', C.indigo, 38)],
    ['percent', 'Yüzde', 'Percent', 'yüzde percent oran indirim', symbol('%', C.pink)],
    ['pi', 'Pi', 'Pi', 'pi sayısı matematik geometri daire', symbol('π', C.purple, 38)],
    ['sqrt', 'Karekök', 'Square root', 'karekök kök square root matematik', symbol('√', C.teal)],
    ['infinity', 'Sonsuz', 'Infinity', 'sonsuz sonsuzluk infinity', symbol('∞', C.sky, 40)],
    ['sum', 'Toplam', 'Sum', 'toplam sigma sum', symbol('Σ', C.amber)],
    ['half', 'Yarım', 'Half', 'kesir yarım half fraction', symbol('½', C.green)],
    ['degree', 'Derece', 'Degree', 'derece açı sıcaklık degree angle', symbol('°', C.red, 44)],
    ['question-mark', 'Soru işareti', 'Question mark', 'soru işareti question mark ?', symbol('?', C.blue, 38)],
    ['exclamation', 'Ünlem', 'Exclamation', 'ünlem dikkat exclamation !', symbol('!', C.orange, 38)],
  ],
  labels: [
    labelRow('tag-new', 'YENİ', 'NEW', C.red, 'yeni new'),
    labelRow('tag-important', 'ÖNEMLİ', 'IMPORTANT', C.orange, 'önemli important'),
    labelRow('tag-urgent', 'ACİL', 'URGENT', C.red, 'acil urgent'),
    labelRow('tag-draft', 'TASLAK', 'DRAFT', C.slate, 'taslak draft'),
    labelRow('tag-pending', 'BEKLEMEDE', 'PENDING', C.amber, 'beklemede pending'),
    labelRow('tag-progress', 'DEVAM EDİYOR', 'IN PROGRESS', C.blue, 'devam ediyor süreçte in progress'),
    labelRow('tag-approved', 'ONAYLANDI', 'APPROVED', C.green, 'onaylandı approved'),
    labelRow('tag-done', 'TAMAMLANDI', 'DONE', C.teal, 'tamamlandı bitti done completed'),
    labelRow('tag-cancelled', 'İPTAL', 'CANCELLED', C.slate, 'iptal cancelled'),
    labelRow('tag-confidential', 'GİZLİ', 'CONFIDENTIAL', C.ink, 'gizli confidential'),
    labelRow('tag-beta', 'BETA', 'BETA', C.purple, 'beta deneme'),
    labelRow('tag-free', 'ÜCRETSİZ', 'FREE', C.green, 'ücretsiz bedava free'),
    labelRow('tag-sale', 'İNDİRİM', 'SALE', C.pink, 'indirim kampanya sale'),
    labelRow('tag-50', '%50', '50% OFF', C.red, 'yüzde indirim percent off'),
    labelRow('tag-hot', 'POPÜLER', 'POPULAR', C.orange, 'popüler trend hot popular'),
    labelRow('tag-question', 'SORU', 'QUESTION', C.blue, 'soru question'),
    labelRow('tag-note', 'NOT', 'NOTE', C.amber, 'not note'),
    labelRow('tag-tip', 'İPUCU', 'TIP', C.green, 'ipucu öneri tip'),
    labelRow('tag-example', 'ÖRNEK', 'EXAMPLE', C.indigo, 'örnek example'),
    labelRow('tag-homework', 'ÖDEV', 'HOMEWORK', C.purple, 'ödev homework okul'),
    labelRow('tag-exam', 'SINAV', 'EXAM', C.red, 'sınav exam test'),
    labelRow('tag-true', 'DOĞRU', 'TRUE', C.green, 'doğru true'),
    labelRow('tag-false', 'YANLIŞ', 'FALSE', C.red, 'yanlış false'),
  ],
  stickers: [
    [
      'bubble',
      'Konuşma balonu',
      'Speech bubble',
      'konuşma balonu baloncuk speech bubble diyalog',
      <path
        key="b"
        d="M10 8h44a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H30L16 57V46h-6a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6z"
        fill="#fff"
        stroke={C.ink}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />,
    ],
    [
      'bubble-blue',
      'Renkli balon',
      'Colored bubble',
      'konuşma balonu mavi speech bubble color',
      <path
        key="b"
        d="M54 8H10a6 6 0 0 0-6 6v26a6 6 0 0 0 6 6h24l14 11V46h6a6 6 0 0 0 6-6V14a6 6 0 0 0-6-6z"
        fill="#DBEAFE"
        stroke={C.blue}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />,
    ],
    [
      'thought',
      'Düşünce balonu',
      'Thought bubble',
      'düşünce balonu thought bubble hayal',
      <>
        <path
          d="M47 40H22a13 13 0 1 1 9-22 11 11 0 0 1 19 4 9 9 0 0 1-3 18z"
          fill="#fff"
          stroke={C.ink}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="49" r="4" fill="#fff" stroke={C.ink} strokeWidth="2.5" />
        <circle cx="8" cy="57" r="2.5" fill="#fff" stroke={C.ink} strokeWidth="2" />
      </>,
    ],
    [
      'note-yellow',
      'Yapışkan not',
      'Sticky note',
      'yapışkan not post-it sticky note',
      <>
        <path d="M8 10h48v34L42 58H8z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M42 58V44h14" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="22" y="3" width="20" height="10" rx="1.5" fill="#D1D5DB" opacity="0.85" transform="rotate(-6 32 8)" />
      </>,
    ],
    [
      'note-pink',
      'Pembe not',
      'Pink note',
      'yapışkan not pembe sticky note pink',
      <>
        <path d="M8 10h48v34L42 58H8z" fill="#FBCFE8" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M42 58V44h14" fill="#F9A8D4" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="32" cy="12" r="4.5" fill="#DC2626" />
      </>,
    ],
    [
      'note-blue',
      'Mavi not',
      'Blue note',
      'yapışkan not mavi sticky note blue',
      <>
        <path d="M8 10h48v34L42 58H8z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M42 58V44h14" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="22" y="3" width="20" height="10" rx="1.5" fill="#D1D5DB" opacity="0.85" transform="rotate(5 32 8)" />
      </>,
    ],
    [
      'banner',
      'Şerit',
      'Ribbon banner',
      'şerit kurdele afiş banner ribbon başlık',
      () => ({
        w: 128,
        h: 48,
        body: (
          <>
            <path d="M2 16h22v28H2l8-14z" fill="#991B1B" />
            <path d="M126 16h-22v28h22l-8-14z" fill="#991B1B" />
            <path d="M16 36l8 8V36z" fill="#7F1D1D" />
            <path d="M112 36l-8 8V36z" fill="#7F1D1D" />
            <rect x="16" y="6" width="96" height="30" fill={C.red} />
          </>
        ),
      }),
    ],
    [
      'burst',
      'Patlama',
      'Starburst',
      'patlama yıldız rozet burst star badge vurgu',
      <polygon key="p" points={starPoints(14, 30, 22)} fill="#FACC15" stroke="#EAB308" strokeWidth="2" strokeLinejoin="round" />,
    ],
    [
      'burst-new',
      'Yeni rozeti',
      'New burst',
      'yeni rozet patlama new badge burst',
      (lang) => ({
        body: (
          <>
            <polygon points={starPoints(14, 30, 23)} fill={C.red} stroke="#991B1B" strokeWidth="2" strokeLinejoin="round" />
            <Label x={32} y={33} size={lang === 'en' ? 15 : 13}>
              {lang === 'en' ? 'NEW' : 'YENİ'}
            </Label>
          </>
        ),
      }),
    ],
    [
      'rosette',
      'Rozet',
      'Rosette',
      'rozet ödül madalya rosette award badge kalite',
      <>
        <path d="M20 40l-8 22 10-4 6 8 6-20z" fill="#1D4ED8" />
        <path d="M44 40l8 22-10-4-6 8-6-20z" fill="#1D4ED8" />
        <polygon points={starPoints(16, 26, 23, 32, 28)} fill={C.blue} />
        <circle cx="32" cy="28" r="17" fill="none" stroke="#fff" strokeWidth="2" />
        <polygon points={starPoints(5, 10, 4.2, 32, 28.5)} fill="#FACC15" />
      </>,
    ],
    [
      'price-tag',
      'Fiyat etiketi',
      'Price tag',
      'fiyat etiket price tag satış',
      <>
        <path d="M4 32L22 12h36v40H22z" fill={C.orange} stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="21" cy="32" r="4.5" fill="#fff" />
      </>,
    ],
    [
      'arrow-curve',
      'Kıvrık ok',
      'Curved arrow',
      'ok kıvrık el çizimi arrow curved hand drawn',
      <g key="g" fill="none" stroke={C.blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 52C10 26 30 12 54 14" />
        <path d="M44 6l10 8-9 9" />
      </g>,
    ],
    [
      'arrow-loop',
      'Döngülü ok',
      'Loop arrow',
      'ok döngü kıvrım el çizimi arrow loop',
      <g key="g" fill="none" stroke={C.orange} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 50c14 0 22-10 18-20s-16-4-10 6 26 10 40-14" />
        <path d="M44 20l10 2 0-10" />
      </g>,
    ],
    [
      'arrow-sketch',
      'Çizgi ok',
      'Sketch arrow',
      'ok el çizimi arrow sketch işaret',
      () => ({
        w: 96,
        h: 40,
        body: (
          <g fill="none" stroke={C.red} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22c20-3 46-2 82-2" />
            <path d="M76 9l13 11-13 12" />
          </g>
        ),
      }),
    ],
    [
      'circle-mark',
      'Yuvarlak işaret',
      'Circle mark',
      'daire işaret vurgu çember el çizimi circle highlight',
      () => ({
        w: 96,
        h: 64,
        body: (
          <path
            d="M24 12C46 2 86 8 90 28S58 60 30 56 2 40 8 26 40 6 62 8"
            fill="none"
            stroke={C.red}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ),
      }),
    ],
    [
      'underline',
      'Dalgalı çizgi',
      'Squiggle',
      'alt çizgi dalgalı vurgu underline squiggle',
      () => ({
        w: 128,
        h: 24,
        body: (
          <path
            d="M6 14q10-10 19.5 0t19.5 0 19.5 0 19.5 0 19.5 0 19.5 0"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ),
      }),
    ],
    [
      'sparkles',
      'Parıltı',
      'Sparkles',
      'parıltı yıldız sparkles sihir',
      <g key="g" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" strokeLinejoin="round">
        <path d={sparkle(26, 34, 22)} />
        <path d={sparkle(50, 14, 10)} />
        <path d={sparkle(52, 50, 7)} />
      </g>,
    ],
    ['heart-solid', 'Kalp', 'Heart', 'kalp sevgi heart love', filled(Heart, '#EF4444', '#B91C1C')],
    ['star-solid', 'Yıldız', 'Star', 'yıldız star favori', filled(Star, '#FACC15', '#CA8A04')],
    ['crown', 'Taç', 'Crown', 'taç kral kraliçe crown lider', filled(Crown, '#FBBF24', '#B45309')],
    ['flame', 'Alev', 'Flame', 'ateş alev flame hot popüler', filled(Flame, '#FB923C', '#C2410C')],
    ['bolt', 'Şimşek', 'Lightning', 'şimşek yıldırım bolt hızlı', filled(Zap, '#FACC15', '#CA8A04')],
    [
      'stamp-ok',
      'Onay damgası',
      'Approved stamp',
      'onay damga mühür check stamp approved',
      <g key="g" transform="rotate(-10 32 32)" fill="none" stroke={C.green} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="26" strokeWidth="4" />
        <circle cx="32" cy="32" r="20" strokeWidth="1.5" />
        <path d="M21 33l8 8 15-17" strokeWidth="5" />
      </g>,
    ],
    [
      'stamp-x',
      'Ret damgası',
      'Rejected stamp',
      'ret damga red x stamp rejected',
      <g key="g" transform="rotate(8 32 32)" fill="none" stroke={C.red} strokeLinecap="round">
        <circle cx="32" cy="32" r="26" strokeWidth="4" />
        <circle cx="32" cy="32" r="20" strokeWidth="1.5" />
        <path d="M23 23l18 18M41 23L23 41" strokeWidth="5" />
      </g>,
    ],
  ],
  emoji: [
    ['face-smile', 'Gülümseyen', 'Smiling', 'emoji yüz mutlu gülümseme smile happy', face(<>{dotEyes}{smile}</>)],
    [
      'face-laugh',
      'Kahkaha',
      'Laughing',
      'emoji yüz kahkaha gülme laugh',
      face(
        <>
          <path d="M17 27q6-7 12 0M35 27q6-7 12 0" />
          <path d="M18 36h28a14 14 0 0 1-28 0z" fill={FACE_INK} />
        </>,
      ),
    ],
    [
      'face-wink',
      'Göz kırpan',
      'Winking',
      'emoji yüz göz kırpma wink',
      face(
        <>
          <circle cx="23" cy="26" r="3.5" fill={FACE_INK} stroke="none" />
          <path d="M36 26h10" />
          {smile}
        </>,
      ),
    ],
    [
      'face-love',
      'Aşık',
      'In love',
      'emoji yüz kalp göz aşk love heart eyes',
      face(
        <>
          <path d={heartAt(23, 26, 5.5)} fill="#EF4444" stroke="none" />
          <path d={heartAt(41, 26, 5.5)} fill="#EF4444" stroke="none" />
          {smile}
        </>,
      ),
    ],
    [
      'face-cool',
      'Havalı',
      'Cool',
      'emoji yüz gözlük havalı cool sunglasses',
      face(
        <>
          <path d="M13 22h38" strokeWidth="3" />
          <path d="M15 22h14v5a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6zM35 22h14v5a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z" fill={FACE_INK} stroke="none" />
          <path d="M22 41q10 7 20 0" />
        </>,
      ),
    ],
    [
      'face-surprised',
      'Şaşkın',
      'Surprised',
      'emoji yüz şaşkın şaşırma surprised wow',
      face(
        <>
          {dotEyes}
          <circle cx="32" cy="43" r="6" fill={FACE_INK} stroke="none" />
        </>,
      ),
    ],
    [
      'face-neutral',
      'Nötr',
      'Neutral',
      'emoji yüz nötr düz neutral meh',
      face(
        <>
          {dotEyes}
          <path d="M22 42h20" />
        </>,
      ),
    ],
    [
      'face-confused',
      'Kafası karışık',
      'Confused',
      'emoji yüz kafası karışık düşünceli confused thinking',
      face(
        <>
          {dotEyes}
          <path d="M20 43q4-4 8 0t8 0 8 0" />
        </>,
      ),
    ],
    [
      'face-sad',
      'Üzgün',
      'Sad',
      'emoji yüz üzgün mutsuz sad',
      face(
        <>
          {dotEyes}
          <path d="M21 46q11-10 22 0" />
          <path d="M45 32q-3 5 0 7q3-2 0-7z" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" />
        </>,
      ),
    ],
    [
      'face-angry',
      'Kızgın',
      'Angry',
      'emoji yüz kızgın sinirli angry',
      face(
        <>
          <path d="M17 20l10 5M47 20l-10 5" />
          <circle cx="23" cy="29" r="3.2" fill={FACE_INK} stroke="none" />
          <circle cx="41" cy="29" r="3.2" fill={FACE_INK} stroke="none" />
          <path d="M22 46q10-8 20 0" />
        </>,
        { fill: '#FCA5A5', edge: '#EF4444' },
      ),
    ],
    ['thumbs-up', 'Beğen', 'Thumbs up', 'beğen başparmak like thumbs up süper', filled(ThumbsUp, '#FCD34D', '#B45309')],
    ['thumbs-down', 'Beğenme', 'Thumbs down', 'beğenme dislike thumbs down', filled(ThumbsDown, '#FCD34D', '#B45309')],
    ['party', 'Kutlama', 'Celebration', 'kutlama parti tebrik party celebration konfeti', tile(C.pink, PartyPopper)],
    [
      'hundred',
      'Yüz puan',
      'Hundred points',
      'yüz 100 puan tam not perfect score',
      <g key="g" transform="rotate(-8 32 32)">
        <Label x={32} y={28} size={30} fill="#EF4444">
          <tspan fontStyle="italic">100</tspan>
        </Label>
        <path d="M8 44h48M12 51h40" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      </g>,
    ],
  ],
  nature: [
    ['sun', 'Güneş', 'Sun', 'güneş hava güneşli sun weather', filled(Sun, '#FDE047', '#EAB308')],
    ['moon', 'Ay', 'Moon', 'ay gece moon night', filled(Moon, '#FDE68A', '#CA8A04')],
    ['cloud-sun', 'Parçalı bulutlu', 'Partly cloudy', 'bulut güneş hava cloudy weather', tile(C.sky, CloudSun)],
    ['rain', 'Yağmur', 'Rain', 'yağmur hava rain weather', tile(C.blue, CloudRain)],
    ['snow', 'Kar', 'Snow', 'kar kış snow winter', tile(C.sky, Snowflake)],
    ['rainbow', 'Gökkuşağı', 'Rainbow', 'gökkuşağı rainbow renk', tile(C.purple, Rainbow)],
    ['umbrella', 'Şemsiye', 'Umbrella', 'şemsiye umbrella yağmur', tile(C.indigo, Umbrella)],
    ['leaf', 'Yaprak', 'Leaf', 'yaprak doğa çevre leaf eco yeşil', tile(C.green, Leaf)],
    ['tree', 'Ağaç', 'Tree', 'ağaç orman tree forest', tile(C.green, TreePine)],
    ['flower', 'Çiçek', 'Flower', 'çiçek bahar flower spring', tile(C.pink, Flower2)],
    ['sprout', 'Filiz', 'Sprout', 'filiz büyüme sprout growth', tile(C.teal, Sprout)],
    ['mountain', 'Dağ', 'Mountain', 'dağ doğa mountain', tile(C.slate, Mountain)],
    ['cat', 'Kedi', 'Cat', 'kedi hayvan cat animal', tile(C.orange, Cat)],
    ['dog', 'Köpek', 'Dog', 'köpek hayvan dog animal', tile(C.amber, Dog)],
    ['bird', 'Kuş', 'Bird', 'kuş hayvan bird animal', tile(C.sky, Bird)],
    ['fish', 'Balık', 'Fish', 'balık deniz fish sea', tile(C.blue, Fish)],
    ['rabbit', 'Tavşan', 'Rabbit', 'tavşan hayvan rabbit', tile(C.pink, Rabbit)],
    ['turtle', 'Kaplumbağa', 'Turtle', 'kaplumbağa yavaş turtle slow', tile(C.green, Turtle)],
    ['squirrel', 'Sincap', 'Squirrel', 'sincap hayvan squirrel', tile(C.orange, Squirrel)],
    ['snail', 'Salyangoz', 'Snail', 'salyangoz yavaş snail', tile(C.amber, Snail)],
    ['bug', 'Böcek', 'Bug', 'böcek hata bug insect', tile(C.red, Bug)],
    ['paw', 'Pati', 'Paw', 'pati hayvan paw pet', tile(C.slate, PawPrint)],
  ],
  food: [
    ['apple', 'Elma', 'Apple', 'elma meyve apple fruit', tile(C.red, Apple)],
    ['banana', 'Muz', 'Banana', 'muz meyve banana fruit', tile(C.amber, Banana)],
    ['cherry', 'Kiraz', 'Cherry', 'kiraz meyve cherry', tile(C.red, Cherry)],
    ['grape', 'Üzüm', 'Grape', 'üzüm meyve grape', tile(C.purple, Grape)],
    ['citrus', 'Limon', 'Citrus', 'limon portakal narenciye lemon citrus', tile(C.amber, Citrus)],
    ['carrot', 'Havuç', 'Carrot', 'havuç sebze carrot vegetable', tile(C.orange, Carrot)],
    ['salad', 'Salata', 'Salad', 'salata sağlıklı salad healthy', tile(C.green, Salad)],
    ['soup', 'Çorba', 'Soup', 'çorba yemek soup', tile(C.orange, Soup)],
    ['pizza', 'Pizza', 'Pizza', 'pizza yemek', tile(C.red, Pizza)],
    ['sandwich', 'Sandviç', 'Sandwich', 'sandviç tost sandwich', tile(C.amber, Sandwich)],
    ['croissant', 'Kruvasan', 'Croissant', 'kruvasan kahvaltı croissant breakfast', tile(C.amber, Croissant)],
    ['egg', 'Yumurta', 'Egg', 'yumurta kahvaltı egg', tile(C.amber, Egg)],
    ['cake', 'Pasta', 'Cake', 'pasta doğum günü cake birthday', tile(C.pink, Cake)],
    ['cookie', 'Kurabiye', 'Cookie', 'kurabiye cookie tatlı', tile(C.amber, Cookie)],
    ['donut', 'Donut', 'Donut', 'donut tatlı', tile(C.pink, Donut)],
    ['ice-cream', 'Dondurma', 'Ice cream', 'dondurma yaz ice cream', tile(C.sky, IceCreamCone)],
    ['popcorn', 'Patlamış mısır', 'Popcorn', 'patlamış mısır sinema popcorn', tile(C.red, Popcorn)],
    ['coffee', 'Kahve', 'Coffee', 'kahve mola coffee break', tile('#78350F', Coffee)],
    ['soda', 'İçecek', 'Drink', 'içecek soda drink', tile(C.red, CupSoda)],
    ['milk', 'Süt', 'Milk', 'süt milk', tile(C.sky, Milk)],
    ['utensils', 'Yemek', 'Meal', 'yemek restoran çatal bıçak meal restaurant', tile(C.slate, Utensils)],
  ],
  travel: [
    ['car', 'Araba', 'Car', 'araba otomobil car', tile(C.red, Car)],
    ['bus', 'Otobüs', 'Bus', 'otobüs servis bus', tile(C.amber, Bus)],
    ['train', 'Tren', 'Train', 'tren metro train', tile(C.blue, TrainFront)],
    ['plane', 'Uçak', 'Plane', 'uçak seyahat plane travel', tile(C.sky, Plane)],
    ['ship', 'Gemi', 'Ship', 'gemi vapur ship', tile(C.indigo, Ship)],
    ['sailboat', 'Yelkenli', 'Sailboat', 'yelkenli tekne sailboat', tile(C.sky, Sailboat)],
    ['bike', 'Bisiklet', 'Bike', 'bisiklet bike', tile(C.green, Bike)],
    ['tractor', 'Traktör', 'Tractor', 'traktör tarım tractor farm', tile(C.green, Tractor)],
    ['ambulance', 'Ambulans', 'Ambulance', 'ambulans acil ambulance', tile(C.red, Ambulance)],
    ['fuel', 'Akaryakıt', 'Fuel', 'benzin akaryakıt fuel gas', tile(C.slate, Fuel)],
    ['map', 'Harita', 'Map', 'harita map', tile(C.teal, MapIcon)],
    ['map-pin', 'Konum', 'Location', 'konum adres location harita map pin', tile(C.red, MapPin)],
    ['compass', 'Pusula', 'Compass', 'pusula yön compass', tile(C.indigo, Compass)],
    ['signpost', 'Tabela', 'Signpost', 'tabela yön signpost', tile(C.amber, Signpost)],
    ['tent', 'Kamp', 'Camping', 'çadır kamp tent camping', tile(C.green, Tent)],
    ['anchor', 'Çapa', 'Anchor', 'çapa liman anchor port', tile(C.blue, Anchor)],
  ],
  health: [
    ['hospital', 'Hastane', 'Hospital', 'hastane sağlık hospital health', tile(C.red, Hospital)],
    ['stethoscope', 'Doktor', 'Doctor', 'doktor steteskop doctor', tile(C.teal, Stethoscope)],
    ['pill', 'İlaç', 'Medicine', 'ilaç hap medicine pill', tile(C.pink, Pill)],
    ['syringe', 'Aşı', 'Vaccine', 'aşı şırınga vaccine syringe', tile(C.sky, Syringe)],
    ['heart-pulse', 'Nabız', 'Heart rate', 'nabız kalp sağlık heart rate', tile(C.red, HeartPulse)],
    ['thermometer', 'Ateş', 'Temperature', 'ateş derece termometre temperature', tile(C.orange, Thermometer)],
    ['activity', 'Aktivite', 'Activity', 'aktivite grafik nabız activity', tile(C.green, Activity)],
    ['brain', 'Beyin', 'Brain', 'beyin zeka düşünme brain', tile(C.pink, Brain)],
  ],
  hobby: [
    ['camera', 'Fotoğraf', 'Camera', 'kamera fotoğraf camera photo', tile(C.slate, Camera)],
    ['gamepad', 'Oyun', 'Game', 'oyun gamepad game', tile(C.purple, Gamepad2)],
    ['dice', 'Zar', 'Dice', 'zar oyun dice', tile(C.red, Dices)],
    ['puzzle', 'Yapboz', 'Puzzle', 'yapboz puzzle bulmaca', tile(C.green, Puzzle)],
    ['guitar', 'Gitar', 'Guitar', 'gitar müzik guitar music', tile(C.orange, Guitar)],
    ['piano', 'Piyano', 'Piano', 'piyano müzik piano', tile(C.slate, Piano)],
    ['mic', 'Mikrofon', 'Microphone', 'mikrofon podcast konuşma mic', tile(C.indigo, Mic)],
    ['headphones', 'Kulaklık', 'Headphones', 'kulaklık müzik headphones', tile(C.blue, Headphones)],
    ['tv', 'Televizyon', 'TV', 'televizyon tv', tile(C.slate, Tv)],
    ['radio', 'Radyo', 'Radio', 'radyo radio', tile(C.amber, Radio)],
    ['clapperboard', 'Sinema', 'Cinema', 'sinema film klaket cinema', tile(C.ink, Clapperboard)],
    ['drama', 'Tiyatro', 'Theater', 'tiyatro maske drama theater', tile(C.purple, Drama)],
    ['ticket', 'Bilet', 'Ticket', 'bilet etkinlik ticket event', tile(C.pink, Ticket)],
    ['paintbrush', 'Fırça', 'Paintbrush', 'fırça boya resim paint brush', tile(C.orange, Paintbrush)],
    ['scissors', 'Makas', 'Scissors', 'makas kes scissors', tile(C.slate, Scissors)],
    ['ball', 'Top', 'Ball', 'top voleybol spor ball sport', tile(C.blue, Volleyball)],
    ['dumbbell', 'Spor', 'Fitness', 'spor ağırlık dumbbell fitness', tile(C.slate, Dumbbell)],
    ['medal', 'Madalya', 'Medal', 'madalya yarışma medal', tile(C.amber, Medal)],
  ],
  status: [
    ['check', 'Tamam', 'Done', 'tamam onay doğru check done ok başarılı', tile(C.green, CircleCheck)],
    ['x', 'Hata', 'Error', 'hata yanlış iptal error x cancel red', tile(C.red, CircleX)],
    ['warning', 'Uyarı', 'Warning', 'uyarı dikkat warning alert risk', tile(C.amber, TriangleAlert)],
    ['info', 'Bilgi', 'Info', 'bilgi info not', tile(C.blue, Info)],
    ['star', 'Favori', 'Favorite', 'yıldız star favori önemli', tile(C.amber, Star)],
    ['heart', 'Beğeni', 'Like', 'kalp beğeni heart like', tile(C.pink, Heart)],
    ['zap', 'Hızlı', 'Fast', 'şimşek hızlı enerji zap fast', tile(C.orange, Zap)],
    ['gift', 'Hediye', 'Gift', 'hediye gift kampanya', tile(C.purple, Gift)],
  ],
};

export const ICONS: IconDef[] = ICON_CATEGORIES.flatMap((category) =>
  rows[category].map(([id, tr, en, keywords, art]): IconDef => ({
    id,
    category,
    tr,
    en,
    keywords,
    draw: typeof art === 'function' ? art : () => ({ body: art }),
  })),
);

/** Geniş ikonlar (şerit, etiket) panelde iki sütun kaplar. */
export const isWide = (d: Drawn) => (d.w ?? 64) / (d.h ?? 64) > 1.6;

/** İkonun önizleme ve tuvale eklenen SVG'si. */
export function IconSvg({ drawn }: { drawn: Drawn }) {
  const w = drawn.w ?? 64;
  const h = drawn.h ?? 64;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${w} ${h}`} width={w * 8} height={h * 8} fill="none" aria-hidden>
      {drawn.body}
    </svg>
  );
}

/** Türkçe karakterleri de sadeleştirerek arar (ör. "eposta" → "E-posta"). */
export function normalizeSearch(text: string) {
  return text
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9%]+/g, ' ')
    .trim();
}

/** Önizlemedeki <svg>'yi tuvale eklenecek veri adresine çevirir. */
export function svgToDataUrl(svg: SVGSVGElement): string {
  const markup = new XMLSerializer()
    .serializeToString(svg)
    .replace(/\s(class|aria-hidden)="[^"]*"/g, '');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}

/** İçerik değişirse dosya kimliği de değişsin (görsel önbelleği eski çizimi göstermesin). */
export function iconFileId(id: string, url: string) {
  let h = 5381;
  for (let i = 0; i < url.length; i++) h = ((h << 5) + h + url.charCodeAt(i)) | 0;
  return `icon-${id}-${(h >>> 0).toString(36)}`;
}

export const ICON_DRAG_TYPE = 'application/x-biyik-icon';
