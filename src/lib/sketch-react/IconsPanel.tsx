'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
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
  type IconCategory,
  type IconDef,
} from './icons';

/** Tuvalde 64 birimlik ikonun boyutu (dünya birimi); geniş görseller orantılı büyür. */
export const ICON_SIZE = 72;

export interface IconDrop {
  id: string;
  name: string;
  url: string;
  /** SVG görünüm kutusu (64 = bir ikon boyu). */
  w: number;
  h: number;
}

function iconData(icon: IconDef, button: HTMLElement, lang: Lang): IconDrop | null {
  const svg = button.querySelector('svg');
  if (!svg) return null;
  const box = svg.viewBox.baseVal;
  return { id: icon.id, name: icon[lang], url: svgToDataUrl(svg), w: box.width || 64, h: box.height || 64 };
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
  });
}

export default function IconsPanel({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<IconCategory | 'all'>('all');
  // Art arda eklenen ikonlar üst üste binmesin: panel açıkken sayılır
  const cascade = useRef(0);
  const gridRef = useRef<HTMLUListElement>(null);

  const visible = useMemo(() => {
    const q = normalizeSearch(query);
    return ICONS.filter((icon) => {
      if (category !== 'all' && icon.category !== category) return false;
      if (!q) return true;
      const hay = normalizeSearch(`${icon.tr} ${icon.en} ${icon.keywords}`);
      return q.split(' ').every((word) => hay.includes(word));
    });
  }, [query, category]);

  // "Tümü" görünümünde kategori başlıklarıyla gösterilir
  const showHeadings = category === 'all';

  const add = (icon: IconDef, button: HTMLElement) => {
    const data = iconData(icon, button, lang);
    if (!data) return;
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
    <aside className="sk-layers sk-icons sk-glass" aria-label={t('icons.title')}>
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
        <Search size={14} aria-hidden />
        <input
          type="search"
          value={query}
          placeholder={t('icons.search')}
          aria-label={t('icons.search')}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </div>

      <div className="sk-icons-cats" role="tablist" aria-label={t('icons.categories')}>
        {(['all', ...ICON_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            className="sk-icons-cat"
            onClick={(e) => {
              setCategory(cat);
              gridRef.current?.scrollTo({ top: 0 });
              e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
            }}
          >
            {t(`icons.cat.${cat}` as MessageKey)}
          </button>
        ))}
      </div>

      {visible.length ? (
        <ul ref={gridRef} className="sk-icons-grid" role="list">
          {visible.map((icon, i) => {
            const drawn = icon.draw(lang);
            const heading = showHeadings && visible[i - 1]?.category !== icon.category;
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
                      const data = iconData(icon, e.currentTarget, lang);
                      if (!data) return;
                      e.dataTransfer.setData(ICON_DRAG_TYPE, JSON.stringify(data));
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    onClick={(e) => add(icon, e.currentTarget)}
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

      <p className="sk-layers-foot">{t('icons.foot')}</p>
    </aside>
  );
}
