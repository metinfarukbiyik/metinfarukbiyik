'use client';

import {
  ArrowRight,
  Circle,
  Diamond,
  Eraser,
  Hand,
  ImagePlus,
  Lock,
  LockOpen,
  Minus,
  MousePointer2,
  Pencil,
  Square,
  Type,
  type LucideIcon,
} from 'lucide-react';
import type { Editor, Tool } from '@/lib/sketch';
import { useEditor } from './useEditor';

const TOOLS: { tool: Tool; label: string; key: string; Icon: LucideIcon }[] = [
  { tool: 'hand', label: 'El (kaydır)', key: 'H', Icon: Hand },
  { tool: 'select', label: 'Seç', key: 'V', Icon: MousePointer2 },
  { tool: 'rectangle', label: 'Dikdörtgen', key: 'R', Icon: Square },
  { tool: 'diamond', label: 'Eşkenar dörtgen', key: 'D', Icon: Diamond },
  { tool: 'ellipse', label: 'Elips', key: 'O', Icon: Circle },
  { tool: 'arrow', label: 'Ok', key: 'A', Icon: ArrowRight },
  { tool: 'line', label: 'Çizgi', key: 'L', Icon: Minus },
  { tool: 'freedraw', label: 'Kalem', key: 'P', Icon: Pencil },
  { tool: 'text', label: 'Metin', key: 'T', Icon: Type },
  { tool: 'image', label: 'Görsel ekle', key: '9', Icon: ImagePlus },
  { tool: 'eraser', label: 'Silgi', key: 'E', Icon: Eraser },
];

export default function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditor(editor);
  return (
    <div className="sk-toolbar sk-glass" role="toolbar" aria-label="Çizim araçları">
      <button
        type="button"
        className="sk-tool sk-tool-lock"
        aria-pressed={state.toolLocked}
        title={`Aracı kilitle — çizimden sonra seçime dönmez (Q)`}
        onClick={() => editor.toggleToolLock()}
      >
        {state.toolLocked ? <Lock size={16} /> : <LockOpen size={16} />}
      </button>
      <span className="sk-toolbar-sep" aria-hidden />
      {TOOLS.map(({ tool, label, key, Icon }) => (
        <button
          key={tool}
          type="button"
          className="sk-tool"
          aria-pressed={state.tool === tool}
          aria-label={label}
          title={`${label} — ${key}`}
          onClick={() => editor.setTool(tool)}
        >
          <Icon size={17} strokeWidth={1.75} />
          <span className="sk-tool-key" aria-hidden>
            {key}
          </span>
        </button>
      ))}
    </div>
  );
}
