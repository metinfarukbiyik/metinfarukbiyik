'use client';

import { useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Editor } from '../sketch';
import { useI18n, type MessageKey } from './i18n';
import {
  ICON_CATEGORIES,
  ICON_DRAG_TYPE,
  ICONS,
  IconSvg,
  iconFileId,
  normalizeSearch,
  svgToDataUrl,
  type IconCategory,
  type IconDef,
} from './icons';

/** Tuvalde ikonun varsayılan boyutu (dünya birimi). */
export const ICON_SIZE = 72;

export interface IconDrop {
  id: string;
  name: string;
  url: string;
}

function iconData(icon: IconDef, button: HTMLElement, lang: 'tr' | 'en'): IconDrop | null {
  const svg = button.querySelector('svg');
  if (!svg) return null;
  return { id: icon.id, name: icon[lang], url: svgToDataUrl(svg) };
}

/** Sürükle-bırakla gelen ikonu tuvale ekler. */
export function insertIcon(editor: Editor, data: IconDrop, at?: [number, number] | null) {
  editor.insertImageUrl(data.url, {
    width: ICON_SIZE,
    height: ICON_SIZE,
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

  const add = (icon: IconDef, button: HTMLElement) => {
    const data = iconData(icon, button, lang);
    if (!data) return;
    // Ekranın ortasından başlayarak en çok 6'lı satırlar halinde dizilir
    const { width, height } = editor.state.viewport;
    const { zoom } = editor.state.view;
    const gap = (ICON_SIZE + 24) * zoom;
    // Dar ekranda (telefon) satır ekrana sığacak kadar kısa tutulur
    const cols = Math.max(1, Math.min(6, Math.floor((width - 24) / gap)));
    const k = cascade.current++ % (cols * 4);
    const x = width / 2 + ((k % cols) - (cols - 1) / 2) * gap;
    const y = height / 2 + (Math.floor(k / cols) - 1.5) * gap;
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
            onClick={() => {
              setCategory(cat);
              gridRef.current?.scrollTo({ top: 0 });
            }}
          >
            {t(`icons.cat.${cat}` as MessageKey)}
          </button>
        ))}
      </div>

      {visible.length ? (
        <ul ref={gridRef} className="sk-icons-grid" role="list">
          {visible.map((icon) => (
            <li key={icon.id}>
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
                <IconSvg icon={icon} />
                <span>{icon[lang]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sk-layers-empty">{t('icons.empty')}</p>
      )}

      <p className="sk-layers-foot">{t('icons.foot')}</p>
    </aside>
  );
}
