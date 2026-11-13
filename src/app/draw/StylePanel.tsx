'use client';

import type { ReactNode } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  BringToFront,
  Copy,
  Group,
  SendToBack,
  Trash2,
  Ungroup,
} from 'lucide-react';
import {
  BACKGROUND_COLORS,
  STROKE_COLORS,
  type Arrowhead,
  type Editor,
  type ElementType,
  type StyleProps,
  type Tool,
} from '@/lib/sketch';
import { useEditor } from './useEditor';

const TOOL_TYPE: Partial<Record<Tool, ElementType>> = {
  rectangle: 'rectangle',
  diamond: 'diamond',
  ellipse: 'ellipse',
  arrow: 'arrow',
  line: 'line',
  freedraw: 'freedraw',
  text: 'text',
};

const SHAPES: ElementType[] = ['rectangle', 'diamond', 'ellipse'];

/* Küçük, kendine ait çizim ikonları (kalınlık, stil, özensizlik, dolgu) */
const Glyph = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden>
    {children}
  </svg>
);

const FILL_ICONS = {
  hachure: (
    <Glyph>
      <rect x="3" y="3" width="14" height="14" rx="2" strokeWidth="1.4" />
      <path d="M3 11 11 3M5 17 17 5M11 17l6-6" strokeWidth="1.2" />
    </Glyph>
  ),
  cross: (
    <Glyph>
      <rect x="3" y="3" width="14" height="14" rx="2" strokeWidth="1.4" />
      <path d="M3 11 11 3M5 17 17 5M11 17l6-6M9 3l8 8M3 5l12 12M3 11l6 6" strokeWidth="1" />
    </Glyph>
  ),
  solid: (
    <Glyph>
      <rect x="3" y="3" width="14" height="14" rx="2" strokeWidth="1.4" fill="currentColor" />
    </Glyph>
  ),
};

const ARROWHEADS: { value: Arrowhead; label: string; end: string; start: string }[] = [
  { value: 'none', label: 'Yok', end: 'M3 10h14', start: 'M3 10h14' },
  { value: 'arrow', label: 'Ok', end: 'M3 10h14M12 5l5 5-5 5', start: 'M3 10h14M8 5l-5 5 5 5' },
  { value: 'triangle', label: 'Üçgen', end: 'M3 10h10M12 5.5 17 10l-5 4.5z', start: 'M7 10h10M8 5.5 3 10l5 4.5z' },
  { value: 'dot', label: 'Nokta', end: 'M3 10h10M17 10a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z', start: 'M7 10h10M8.2 10a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z' },
  { value: 'bar', label: 'Çubuk', end: 'M3 10h14M17 5v10', start: 'M3 10h14M3 5v10' },
];

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="sk-row">
      <legend className="sk-row-label">{label}</legend>
      <div className="sk-row-body">{children}</div>
    </fieldset>
  );
}

function Opt({
  active,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className="sk-opt" aria-pressed={!!active} aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}

function Swatches({
  colors,
  value,
  onChange,
  label,
}: {
  colors: string[];
  value: string;
  onChange: (c: string) => void;
  label: string;
}) {
  const custom = !colors.includes(value);
  return (
    <>
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className={`sk-swatch${c === 'transparent' ? ' is-none' : ''}`}
          style={c === 'transparent' ? undefined : { background: c }}
          aria-pressed={value === c}
          aria-label={c === 'transparent' ? 'Dolgu yok' : c}
          title={c === 'transparent' ? 'Dolgu yok' : c}
          onClick={() => onChange(c)}
        />
      ))}
      <label className="sk-swatch is-custom" aria-pressed={custom} title={`Özel ${label.toLowerCase()} rengi`}>
        <input
          type="color"
          value={custom && value !== 'transparent' ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Özel ${label.toLowerCase()} rengi`}
        />
      </label>
    </>
  );
}

export default function StylePanel({ editor }: { editor: Editor }) {
  const state = useEditor(editor);
  const editing = editor.getElement(state.editingId);
  const selected = editor.selectedElements();
  const targets = editing ? [editing] : selected;
  const toolType = TOOL_TYPE[state.tool];
  if (!targets.length && !toolType) return null;

  const types = new Set<ElementType>(targets.length ? targets.map((t) => t.type) : [toolType!]);
  const v: StyleProps = targets[0] ?? state.style;
  const set = (patch: Partial<StyleProps>) => editor.setStyle(patch);
  const has = (...t: ElementType[]) => t.some((x) => types.has(x));
  const onlyImages = types.size === 1 && types.has('image');

  const hasShape = has(...SHAPES);
  const showText = has('text') || targets.some((t) => SHAPES.includes(t.type) && t.text) || (editing && SHAPES.includes(editing.type));
  const multi = selected.length > 1;
  const grouped = selected.some((el) => el.groupId);

  return (
    <aside
      className="sk-panel sk-glass"
      aria-label="Stil"
      // Metin yazılırken panel düğmeleri odağı metin kutusundan almasın
      onMouseDown={(e) => {
        if (editing && !(e.target instanceof HTMLInputElement)) e.preventDefault();
      }}
    >
      {!onlyImages && (
        <Row label="Kontur">
          <Swatches colors={STROKE_COLORS} value={v.strokeColor} onChange={(c) => set({ strokeColor: c })} label="Kontur" />
        </Row>
      )}

      {hasShape && (
        <Row label="Arka plan">
          <Swatches
            colors={BACKGROUND_COLORS}
            value={v.backgroundColor}
            onChange={(c) => set({ backgroundColor: c })}
            label="Arka plan"
          />
        </Row>
      )}

      {hasShape && v.backgroundColor !== 'transparent' && (
        <Row label="Dolgu">
          <Opt label="Tarama" active={v.fillStyle === 'hachure'} onClick={() => set({ fillStyle: 'hachure' })}>
            {FILL_ICONS.hachure}
          </Opt>
          <Opt label="Çapraz tarama" active={v.fillStyle === 'cross'} onClick={() => set({ fillStyle: 'cross' })}>
            {FILL_ICONS.cross}
          </Opt>
          <Opt label="Tam dolgu" active={v.fillStyle === 'solid'} onClick={() => set({ fillStyle: 'solid' })}>
            {FILL_ICONS.solid}
          </Opt>
        </Row>
      )}

      {has(...SHAPES, 'line', 'arrow', 'freedraw') && (
        <Row label="Kalınlık">
          {[
            [1, 'İnce'],
            [2, 'Orta'],
            [4, 'Kalın'],
          ].map(([w, label]) => (
            <Opt key={w} label={label as string} active={v.strokeWidth === w} onClick={() => set({ strokeWidth: w as number })}>
              <Glyph>
                <path d="M3 10h14" strokeWidth={(w as number) * 0.9 + 0.6} />
              </Glyph>
            </Opt>
          ))}
        </Row>
      )}

      {has(...SHAPES, 'line', 'arrow') && (
        <>
          <Row label="Çizgi stili">
            <Opt label="Düz" active={v.strokeStyle === 'solid'} onClick={() => set({ strokeStyle: 'solid' })}>
              <Glyph>
                <path d="M3 10h14" strokeWidth="1.8" />
              </Glyph>
            </Opt>
            <Opt label="Kesik" active={v.strokeStyle === 'dashed'} onClick={() => set({ strokeStyle: 'dashed' })}>
              <Glyph>
                <path d="M3 10h14" strokeWidth="1.8" strokeDasharray="4 3" />
              </Glyph>
            </Opt>
            <Opt label="Noktalı" active={v.strokeStyle === 'dotted'} onClick={() => set({ strokeStyle: 'dotted' })}>
              <Glyph>
                <path d="M3 10h14" strokeWidth="2" strokeDasharray="0.1 3.6" />
              </Glyph>
            </Opt>
          </Row>
          <Row label="El izi">
            <Opt label="Düz" active={v.roughness === 0} onClick={() => set({ roughness: 0 })}>
              <Glyph>
                <path d="M3 14C7 6 13 6 17 6" strokeWidth="1.6" />
              </Glyph>
            </Opt>
            <Opt label="Doğal" active={v.roughness === 1} onClick={() => set({ roughness: 1 })}>
              <Glyph>
                <path d="M3 14c3-6 6-8 14-8.4M3.6 14.6C7 8 10 6.4 17 6.6" strokeWidth="1.2" />
              </Glyph>
            </Opt>
            <Opt label="Serbest el" active={v.roughness === 2} onClick={() => set({ roughness: 2 })}>
              <Glyph>
                <path d="M3 14c2-4 5-9 8-7s3 1 6-2M3.5 15c3-5 4-8 7.6-6.6 2.6 1 3.4.4 6.4-2" strokeWidth="1.2" />
              </Glyph>
            </Opt>
          </Row>
        </>
      )}

      {has('rectangle', 'diamond', 'line', 'arrow') && (
        <Row label="Köşeler">
          <Opt label="Keskin" active={v.edges === 'sharp'} onClick={() => set({ edges: 'sharp' })}>
            <Glyph>
              <path d="M4 16V4h12" strokeWidth="1.6" />
            </Glyph>
          </Opt>
          <Opt label="Yuvarlak" active={v.edges === 'round'} onClick={() => set({ edges: 'round' })}>
            <Glyph>
              <path d="M4 16V9a5 5 0 0 1 5-5h7" strokeWidth="1.6" />
            </Glyph>
          </Opt>
        </Row>
      )}

      {has('arrow') && (
        <>
          <Row label="Başlangıç ucu">
            {ARROWHEADS.map((a) => (
              <Opt key={a.value} label={a.label} active={v.startArrowhead === a.value} onClick={() => set({ startArrowhead: a.value })}>
                <Glyph>
                  <path d={a.start} strokeWidth="1.5" strokeLinejoin="round" />
                </Glyph>
              </Opt>
            ))}
          </Row>
          <Row label="Bitiş ucu">
            {ARROWHEADS.map((a) => (
              <Opt key={a.value} label={a.label} active={v.endArrowhead === a.value} onClick={() => set({ endArrowhead: a.value })}>
                <Glyph>
                  <path d={a.end} strokeWidth="1.5" strokeLinejoin="round" />
                </Glyph>
              </Opt>
            ))}
          </Row>
        </>
      )}

      {showText && (
        <>
          <Row label="Yazı tipi">
            <Opt label="El yazısı" active={v.fontFamily === 'hand'} onClick={() => set({ fontFamily: 'hand' })}>
              <span className="sk-opt-text is-hand">Aa</span>
            </Opt>
            <Opt label="Normal" active={v.fontFamily === 'sans'} onClick={() => set({ fontFamily: 'sans' })}>
              <span className="sk-opt-text">Aa</span>
            </Opt>
            <Opt label="Kod" active={v.fontFamily === 'mono'} onClick={() => set({ fontFamily: 'mono' })}>
              <span className="sk-opt-text is-mono">{'{}'}</span>
            </Opt>
          </Row>
          <Row label="Boyut">
            {[
              [16, 'S'],
              [24, 'M'],
              [32, 'L'],
              [48, 'XL'],
            ].map(([size, label]) => (
              <Opt key={size} label={`Boyut ${label}`} active={v.fontSize === size} onClick={() => set({ fontSize: size as number })}>
                <span className="sk-opt-text">{label}</span>
              </Opt>
            ))}
          </Row>
          <Row label="Hizalama">
            <Opt label="Sola" active={v.textAlign === 'left'} onClick={() => set({ textAlign: 'left' })}>
              <AlignLeft size={16} />
            </Opt>
            <Opt label="Ortaya" active={v.textAlign === 'center'} onClick={() => set({ textAlign: 'center' })}>
              <AlignCenter size={16} />
            </Opt>
            <Opt label="Sağa" active={v.textAlign === 'right'} onClick={() => set({ textAlign: 'right' })}>
              <AlignRight size={16} />
            </Opt>
          </Row>
        </>
      )}

      <Row label={`Opaklık · ${v.opacity}`}>
        <input
          className="sk-range"
          type="range"
          min={0}
          max={100}
          step={10}
          value={v.opacity}
          onChange={(e) => set({ opacity: Number(e.target.value) })}
          aria-label="Opaklık"
        />
      </Row>

      {selected.length > 0 && !editing && (
        <>
          <Row label="Katman">
            <Opt label="En alta (⌘⇧[)" onClick={() => editor.reorder('back')}>
              <SendToBack size={16} />
            </Opt>
            <Opt label="Bir alta (⌘[)" onClick={() => editor.reorder('backward')}>
              <ArrowDown size={16} />
            </Opt>
            <Opt label="Bir üste (⌘])" onClick={() => editor.reorder('forward')}>
              <ArrowUp size={16} />
            </Opt>
            <Opt label="En üste (⌘⇧])" onClick={() => editor.reorder('front')}>
              <BringToFront size={16} />
            </Opt>
          </Row>
          <Row label="Eylemler">
            <Opt label="Çoğalt (⌘D)" onClick={() => editor.duplicateSelected()}>
              <Copy size={16} />
            </Opt>
            <Opt label="Sil (Delete)" onClick={() => editor.deleteSelected()}>
              <Trash2 size={16} />
            </Opt>
            {multi && !grouped && (
              <Opt label="Grupla (⌘G)" onClick={() => editor.group()}>
                <Group size={16} />
              </Opt>
            )}
            {grouped && (
              <Opt label="Grubu çöz (⌘⇧G)" onClick={() => editor.ungroup()}>
                <Ungroup size={16} />
              </Opt>
            )}
          </Row>
        </>
      )}
    </aside>
  );
}
