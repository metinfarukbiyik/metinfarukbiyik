'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import {
  Apple,
  AtSign,
  Briefcase,
  CircleCheck,
  FileText,
  Gamepad2,
  GraduationCap,
  Hash,
  HeartPulse,
  LayoutGrid,
  Leaf,
  MessageSquare,
  Monitor,
  Plane,
  Search,
  Smile,
  Sticker,
  Tag,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { Editor } from '../sketch';
import { useI18n, type Lang, type MessageKey } from './i18n';
import {
  ICON_CATEGORIES,
  ICON_DRAG_TYPE,
  ICONS,
  IconSvg,
  iconFileId,
  isWide,
  normalizeSearch,
  svgToDataUrl,
  type Drawn,
  type IconCategory,
  type IconDef,
} from './icons';

type CategoryTab = IconCategory | 'all';

/** Kategori şeridindeki simgeler. */
const CATEGORY_ICONS: Record<CategoryTab, LucideIcon> = {
  all: LayoutGrid,
  files: FileText,
  social: AtSign,
  communication: MessageSquare,
  people: Users,
  business: Briefcase,
  tech: Monitor,
  education: GraduationCap,
  numbers: Hash,
  labels: Tag,
  stickers: Sticker,
  emoji: Smile,
  nature: Leaf,
  food: Apple,
  travel: Plane,
  health: HeartPulse,
  hobby: Gamepad2,
  status: CircleCheck,
};

const TABS: CategoryTab[] = ['all', ...ICON_CATEGORIES];

/** Tuvalde 64 birimlik ikonun boyutu (dünya birimi); geniş görseller orantılı büyür. */
export const ICON_SIZE = 72;

export interface IconDrop {
  id: string;
  name: string;
  url: string;
  /** SVG görünüm kutusu (64 = bir ikon boyu). */
  w: number;
  h: number;
  /** Tuvalde değiştirilebilen renkler (bkz. Drawn). */
  primary?: string;
  secondary?: string;
}

function iconData(icon: IconDef, drawn: Drawn, button: HTMLElement, lang: Lang): IconDrop | null {
  const svg = button.querySelector('svg');
  if (!svg) return null;
  const box = svg.viewBox.baseVal;
  return {
    id: icon.id,
    name: icon[lang],
    url: svgToDataUrl(svg),
    w: box.width || 64,
    h: box.height || 64,
    primary: drawn.primary,
    secondary: drawn.secondary,
  };
}

/** İkonu tuvale ekler (dokunma ya da sürükle-bırak). */
export function insertIcon(editor: Editor, data: IconDrop, at?: [number, number] | null) {
  const scale = ICON_SIZE / 64;
  editor.insertImageUrl(data.url, {
    width: (data.w || 64) * scale,
    height: (data.h || 64) * scale,
    fileId: iconFileId(data.id, data.url),
    name: data.name,
    at,
    paint: { primary: data.primary, secondary: data.secondary },
  });
}

export default function IconsPanel({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryTab>('all');
  // Art arda eklenen ikonlar üst üste binmesin: panel açıkken sayılır
  const cascade = useRef(0);
  const gridRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const q = normalizeSearch(query);
  // Arama her zaman tüm kategorilerde yapılır
  const active: CategoryTab = q ? 'all' : category;

  const visible = useMemo(
    () =>
      ICONS.filter((icon) => {
        if (q) {
          const hay = normalizeSearch(`${icon.tr} ${icon.en} ${icon.keywords}`);
          return q.split(' ').every((word) => hay.includes(word));
        }
        return category === 'all' || icon.category === category;
      }),
    [q, category],
  );

  const counts = useMemo(() => {
    const out: Partial<Record<CategoryTab, number>> = { all: ICONS.length };
    for (const icon of ICONS) out[icon.category] = (out[icon.category] ?? 0) + 1;
    return out;
  }, []);

  const pick = (cat: CategoryTab) => {
    setCategory(cat);
    setQuery('');
    gridRef.current?.scrollTo({ top: 0 });
  };

  const add = (data: IconDrop) => {
    // Ekranın ortasından başlayarak en çok 6 yuvalık satırlar halinde dizilir;
    // geniş öğeler (etiket, şerit) birden fazla yuva kaplar, üst üste binmez.
    const { width, height } = editor.state.viewport;
    const { zoom } = editor.state.view;
    const gap = (ICON_SIZE + 24) * zoom;
    // Dar ekranda (telefon) satır ekrana sığacak kadar kısa tutulur
    const cols = Math.max(1, Math.min(6, Math.floor((width - 24) / gap)));
    const itemWidth = ((data.w || 64) / 64) * ICON_SIZE * zoom;
    const span = Math.min(cols, Math.max(1, Math.ceil((itemWidth + 24 * zoom) / gap)));
    let n = cascade.current;
    if ((n % cols) + span > cols) n = (Math.floor(n / cols) + 1) * cols; // satıra sığmıyor: alt satır
    cascade.current = n + span;
    // 4 satır dolunca baştan başlanır; her tur çaprazlama kayar, öncekilerin üstüne binmez
    const round = Math.floor(n / (cols * 4)) % 4;
    const k = n % (cols * 4);
    const shift = round * gap * 0.3;
    const x = width / 2 + shift + ((k % cols) + (span - 1) / 2 - (cols - 1) / 2) * gap;
    const y = height / 2 + shift + (Math.floor(k / cols) - 1.5) * gap;
    insertIcon(editor, data, editor.toWorld(x, y));
  };

  return (
    <aside className="sk-layers sk-iconlib sk-glass" aria-label={t('icons.title')}>
      <header className="sk-layers-head">
        <span>
          {t('icons.title')} <span className="sk-layers-count">{ICONS.length}</span>
        </span>
        <span className="sk-layers-actions">
          <button type="button" className="sk-ibtn" title={t('close')} aria-label={t('close')} onClick={onClose}>
            <X size={15} />
          </button>
        </span>
      </header>

      <div className="sk-icons-search">
        <Search size={15} aria-hidden />
        <input
          ref={searchRef}
          type="search"
          value={query}
          placeholder={t('icons.search')}
          aria-label={t('icons.search')}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Escape' && query) {
              e.preventDefault();
              setQuery('');
            }
          }}
        />
        {query && (
          <button
            type="button"
            className="sk-icons-clear"
            aria-label={t('icons.clear')}
            title={t('icons.clear')}
            onClick={() => {
              setQuery('');
              searchRef.current?.focus();
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="sk-icons-body">
        <nav className="sk-icons-rail" role="tablist" aria-orientation="vertical" aria-label={t('icons.categories')}>
          {TABS.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const label = t(`icons.cat.${cat}` as MessageKey);
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                data-cat={cat}
                aria-selected={active === cat}
                className="sk-icons-tab"
                title={`${label} (${counts[cat] ?? 0})`}
                onClick={() => pick(cat)}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {visible.length ? (
          <ul ref={gridRef} className="sk-icons-grid" role="list" aria-label={t(`icons.cat.${active}` as MessageKey)}>
            {visible.map((icon, i) => {
              const drawn = icon.draw(lang);
              // "Tümü" görünümünde ve aramada kategori başlıkları gösterilir
              const heading = active === 'all' && visible[i - 1]?.category !== icon.category;
              return (
                <Fragment key={icon.id}>
                  {heading && (
                    <li className="sk-icons-heading" aria-hidden>
                      {t(`icons.cat.${icon.category}` as MessageKey)}
                    </li>
                  )}
                  <li className={isWide(drawn) ? 'is-wide' : undefined}>
                    <button
                      type="button"
                      className="sk-icon-item"
                      title={icon[lang]}
                      draggable
                      onDragStart={(e) => {
                        const data = iconData(icon, drawn, e.currentTarget, lang);
                        if (!data) return;
                        e.dataTransfer.setData(ICON_DRAG_TYPE, JSON.stringify(data));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      onClick={(e) => {
                        const data = iconData(icon, drawn, e.currentTarget, lang);
                        if (data) add(data);
                      }}
                    >
                      <IconSvg drawn={drawn} />
                      {/* Etiketin adı zaten üzerinde yazılı */}
                      {icon.category !== 'labels' && <span>{icon[lang]}</span>}
                    </button>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        ) : (
          <p className="sk-layers-empty">{t('icons.empty')}</p>
        )}
      </div>

      <p className="sk-layers-foot">{t('icons.foot')}</p>
    </aside>
  );
}
