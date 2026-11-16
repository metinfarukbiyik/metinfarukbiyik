/**
 * Hazır ikon kütüphanesi: dosya türleri (Excel, Word, PDF, PNG…) ve kurumsal çizimlerde
 * sık kullanılan simgeler. İkonlar 64×64 SVG olarak çizilir, tuvale görsel öğe olarak
 * eklenir; dolayısıyla dışa aktarma ve paylaşım bağlantısıyla birlikte taşınır.
 *
 * Simgelerin iç çizimleri lucide ikonlarıdır (ISC lisansı). Marka logosu kullanılmaz;
 * dosya ikonları türün bilinen rengini ve uzantısını taşır.
 */
import type { ReactNode } from 'react';
import {
  Archive,
  Atom,
  Award,
  Backpack,
  Banknote,
  BookOpen,
  Bot,
  Braces,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  ChartColumn,
  ChartLine,
  ChartPie,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Code,
  Contact,
  Cpu,
  CreditCard,
  Database,
  Download,
  Factory,
  Film,
  Flag,
  Folder,
  Gift,
  Globe,
  GraduationCap,
  Handshake,
  HardDrive,
  Headset,
  Heart,
  Hourglass,
  House,
  Image,
  Info,
  Kanban,
  Key,
  Landmark,
  Laptop,
  Library,
  Lightbulb,
  Link,
  ListChecks,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Microscope,
  Monitor,
  Music,
  Network,
  Package,
  Palette,
  PenTool,
  Pencil,
  Phone,
  Plane,
  Presentation,
  Printer,
  QrCode,
  Receipt,
  Rocket,
  Router,
  Ruler,
  Scale,
  School,
  Search,
  Send,
  Server,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Star,
  Store,
  Table,
  Tablet,
  Target,
  TriangleAlert,
  Trophy,
  Truck,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Warehouse,
  Wifi,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type IconCategory = 'files' | 'communication' | 'people' | 'business' | 'tech' | 'education' | 'status';

export const ICON_CATEGORIES: IconCategory[] = [
  'files',
  'communication',
  'people',
  'business',
  'tech',
  'education',
  'status',
];

export interface IconDef {
  id: string;
  category: IconCategory;
  tr: string;
  en: string;
  /** Aramada eşleşen ek sözcükler. */
  keywords: string;
  /** 64×64 SVG'nin içeriği. */
  body: ReactNode;
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
};

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
        fontFamily="Arial, Helvetica, sans-serif"
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

type Row = [id: string, tr: string, en: string, keywords: string, body: ReactNode];

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
  communication: [
    ['mail', 'E-posta', 'Email', 'mail eposta e-posta email posta outlook gmail', tile(C.blue, Mail)],
    ['send', 'Gönder', 'Send', 'gönder send ilet', tile(C.sky, Send)],
    ['message', 'Mesaj', 'Message', 'mesaj message chat sohbet yorum', tile(C.green, MessageSquare)],
    ['phone', 'Telefon', 'Phone', 'telefon phone arama call', tile(C.teal, Phone)],
    ['video', 'Görüntülü görüşme', 'Video call', 'video toplantı meeting zoom teams görüşme', tile(C.indigo, Video)],
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
    ['plane', 'Seyahat', 'Travel', 'uçak seyahat plane travel', tile(C.sky, Plane)],
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
    ['map-pin', 'Konum', 'Location', 'konum adres location harita map', tile(C.red, MapPin)],
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
    ['palette', 'Sanat', 'Art', 'palet resim sanat art boya', tile(C.pink, Palette)],
    ['backpack', 'Çanta', 'Backpack', 'okul çantası backpack öğrenci', tile(C.purple, Backpack)],
    ['list-checks', 'Sınav', 'Quiz', 'sınav test quiz kontrol listesi', tile(C.green, ListChecks)],
    ['award', 'Ödül', 'Award', 'ödül madalya award sertifika certificate', tile(C.amber, Award)],
  ],
  status: [
    ['check', 'Tamam', 'Done', 'tamam onay doğru check done ok başarılı', tile(C.green, CircleCheck)],
    ['x', 'Hata', 'Error', 'hata yanlış iptal error x cancel red', tile(C.red, CircleX)],
    ['warning', 'Uyarı', 'Warning', 'uyarı dikkat warning alert risk', tile(C.amber, TriangleAlert)],
    ['info', 'Bilgi', 'Info', 'bilgi info not', tile(C.blue, Info)],
    ['star', 'Yıldız', 'Star', 'yıldız star favori önemli', tile(C.amber, Star)],
    ['heart', 'Beğeni', 'Like', 'kalp beğeni heart like', tile(C.pink, Heart)],
    ['zap', 'Hızlı', 'Fast', 'şimşek hızlı enerji zap fast', tile(C.orange, Zap)],
    ['gift', 'Hediye', 'Gift', 'hediye gift kampanya', tile(C.purple, Gift)],
  ],
};

export const ICONS: IconDef[] = ICON_CATEGORIES.flatMap((category) =>
  rows[category].map(([id, tr, en, keywords, body]) => ({ id, category, tr, en, keywords, body })),
);

/** İkonun önizleme ve tuvale eklenen SVG'si. */
export function IconSvg({ icon }: { icon: IconDef }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none" aria-hidden>
      {icon.body}
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
    .replace(/[^a-z0-9]+/g, ' ')
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
