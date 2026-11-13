'use client';

import '@excalidraw/excalidraw/index.css';
import './draw.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  languages,
  restoreAppState,
  restoreElements,
  useHandleLibrary,
} from '@excalidraw/excalidraw';
import type {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types';
import { getItem, setItem } from './storage';

declare global {
  interface Window {
    EXCALIDRAW_ASSET_PATH?: string | string[];
  }
}

const SCENE_KEY = 'scene';
const LIBRARY_KEY = 'library';
const LANG_KEY = 'draw-lang';
const SAVE_DELAY = 300;

type StoredScene = {
  elements: unknown[];
  appState: Partial<AppState>;
  files: BinaryFiles;
};

/** Saklanacak görünüm ayarları; seçim, imleç gibi geçici durumlar saklanmaz. */
const persistedAppStateKeys = [
  'theme',
  'viewBackgroundColor',
  'gridSize',
  'gridModeEnabled',
  'zenModeEnabled',
  'objectsSnapModeEnabled',
  'scrollX',
  'scrollY',
  'zoom',
  'name',
  'currentItemStrokeColor',
  'currentItemBackgroundColor',
  'currentItemFillStyle',
  'currentItemStrokeWidth',
  'currentItemStrokeStyle',
  'currentItemRoughness',
  'currentItemOpacity',
  'currentItemFontFamily',
  'currentItemFontSize',
  'currentItemTextAlign',
  'currentItemRoundness',
  'currentItemStartArrowhead',
  'currentItemEndArrowhead',
  'currentItemArrowType',
] as const satisfies readonly (keyof AppState)[];

function pickAppState(appState: AppState): Partial<AppState> {
  const out: Record<string, unknown> = {};
  for (const key of persistedAppStateKeys) out[key] = appState[key];
  return out as Partial<AppState>;
}

/** Sitenin tema tercihi (biyik.dev ile ortak). */
function siteTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applySiteTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* tercih bu oturumla sınırlı kalır */
  }
}

function initialLang(): string {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && languages.some((l) => l.code === saved)) return saved;
  } catch {
    /* varsayılan dile düş */
  }
  const nav = navigator.language;
  return (
    languages.find((l) => l.code === nav)?.code ??
    languages.find((l) => l.code.split('-')[0] === nav.split('-')[0])?.code ??
    'tr-TR'
  );
}

async function loadInitialData(): Promise<ExcalidrawInitialDataState> {
  const stored = await getItem<StoredScene>(SCENE_KEY);
  const theme = siteTheme();
  if (!stored) return { appState: { theme } };
  return {
    elements: restoreElements(stored.elements as never, null, { repairBindings: true }),
    appState: { ...restoreAppState(stored.appState, null), theme },
    files: stored.files ?? {},
    scrollToContent: false,
  };
}

function Wordmark() {
  return (
    <span className="draw-wordmark">
      <span className="draw-wordmark-mark" aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20c2.5-.4 4-1.6 5.4-3l9.2-9.2a2.1 2.1 0 0 0-3-3L6.4 14c-1.4 1.4-2.6 2.9-3 5.4" />
          <path d="M14 6.5l3.5 3.5" />
        </svg>
      </span>
      <span className="draw-wordmark-text">
        draw<span className="draw-wordmark-domain">.biyik.dev</span>
      </span>
    </span>
  );
}

const GitHubIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const HomeIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);

const InfoIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.01" />
  </svg>
);

export default function DrawApp() {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const [langCode, setLangCode] = useState<string>(() => initialLang());
  const initialData = useMemo(() => loadInitialData(), []);
  const saveTimer = useRef<number | undefined>(undefined);
  const lastTheme = useRef<string | null>(null);

  // Kütüphane: kalıcı saklama ve libraries sitesinden "Ekle" bağlantıları
  const libraryAdapter = useMemo(
    () => ({
      load: async () => {
        const items = await getItem<unknown[]>(LIBRARY_KEY);
        return items ? { libraryItems: items as never } : null;
      },
      save: async ({ libraryItems }: { libraryItems: unknown }) => {
        await setItem(LIBRARY_KEY, libraryItems);
      },
    }),
    [],
  );
  useHandleLibrary({ excalidrawAPI: api, adapter: libraryAdapter });

  const onChange = useCallback(
    (elements: readonly unknown[], appState: AppState, files: BinaryFiles) => {
      if (appState.theme !== lastTheme.current) {
        if (lastTheme.current !== null) applySiteTheme(appState.theme);
        lastTheme.current = appState.theme;
      }
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        // Sahnede artık kullanılmayan görselleri saklamaya gerek yok
        const used = new Set<string>();
        for (const el of elements as { type: string; fileId?: string; isDeleted?: boolean }[]) {
          if (el.type === 'image' && el.fileId && !el.isDeleted) used.add(el.fileId);
        }
        const keptFiles: BinaryFiles = {};
        for (const id of used) if (files[id]) keptFiles[id] = files[id];
        void setItem(SCENE_KEY, {
          elements: elements as unknown[],
          appState: pickAppState(appState),
          files: keptFiles,
        } satisfies StoredScene);
      }, SAVE_DELAY);
    },
    [],
  );

  // Sekme kapanırken bekleyen kaydı hemen yaz
  useEffect(() => {
    if (!api) return;
    const flush = () => {
      if (saveTimer.current === undefined) return;
      window.clearTimeout(saveTimer.current);
      void setItem(SCENE_KEY, {
        elements: api.getSceneElementsIncludingDeleted() as unknown as unknown[],
        appState: pickAppState(api.getAppState()),
        files: api.getFiles(),
      } satisfies StoredScene);
    };
    const onHide = () => document.visibilityState === 'hidden' && flush();
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [api]);

  const changeLang = (code: string) => {
    setLangCode(code);
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {
      /* tercih bu oturumla sınırlı kalır */
    }
  };

  return (
    <div className="draw-root">
      <Excalidraw
        excalidrawAPI={setApi}
        initialData={initialData}
        onChange={onChange as never}
        langCode={langCode}
        name="draw.biyik.dev"
        libraryReturnUrl={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : undefined}
        UIOptions={{ canvasActions: { toggleTheme: true } }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.SaveToActiveFile />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.CommandPalette />
          <MainMenu.DefaultItems.SearchMenu />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.Separator />
          <MainMenu.ItemLink href="https://biyik.dev" icon={HomeIcon}>
            biyik.dev
          </MainMenu.ItemLink>
          <MainMenu.ItemLink href="https://github.com/metinfarukbiyik" icon={GitHubIcon}>
            GitHub
          </MainMenu.ItemLink>
          <MainMenu.ItemLink
            href="https://github.com/excalidraw/excalidraw/blob/master/LICENSE"
            icon={InfoIcon}
          >
            Açık kaynak lisansları
          </MainMenu.ItemLink>
          <MainMenu.Separator />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.ItemCustom>
            <select
              className="draw-lang-select"
              aria-label="Dil"
              value={langCode}
              onChange={(e) => changeLang(e.target.value)}
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </MainMenu.ItemCustom>
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>

        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.HelpHint />
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <Wordmark />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Çizimleriniz yalnızca bu tarayıcıda saklanır.
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLoadScene />
              <WelcomeScreen.Center.MenuItemHelp />
              <WelcomeScreen.Center.MenuItemLink href="https://biyik.dev" icon={HomeIcon}>
                biyik.dev
              </WelcomeScreen.Center.MenuItemLink>
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
}
