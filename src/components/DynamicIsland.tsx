'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ChevronDown,
  FileDown,
  Check,
  CircleAlert,
  Copy,
  Download,
  FileText,
  Link2,
  Moon,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import { navIcons } from '@/components/navIcons';
import { ISLAND_EVENT, type IslandActivity, type IslandIcon } from '@/lib/island';
import { toggleTheme } from '@/lib/theme';
import { isActivePath, navigation, site } from '@/lib/site';

const activityIcons: Record<IslandIcon, LucideIcon> = {
  check: Check,
  copy: Copy,
  download: Download,
  moon: Moon,
  sun: Sun,
  page: FileText,
  error: CircleAlert,
  link: Link2,
};

function currentPage(pathname: string) {
  return (
    [...navigation].reverse().find((item) => isActivePath(pathname, item.href)) ?? navigation[0]
  );
}

/** Kaydırma ilerlemesi (0–100); yalnızca tam sayı değiştiğinde yeniden çizer. */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

function ProgressRing({ value }: { value: number }) {
  const r = 7;
  const c = 2 * Math.PI * r;
  return (
    <svg className="island-ring" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r={r} className="island-ring-track" />
      <circle
        cx="9"
        cy="9"
        r={r}
        className="island-ring-value"
        strokeDasharray={c}
        strokeDashoffset={c - (c * value) / 100}
      />
    </svg>
  );
}

/**
 * Dinamik Ada: sayfanın üstünde ortalanmış, renksiz bir hap (sitenin kart yüzeyi).
 * - Sakin: bulunulan sayfanın ikonu ve kaydırma ilerlemesi.
 * - Etkinlik: sayfa değişimi, tema, kopyalama, indirme gibi olaylarda kısa süre genişler.
 * - Açık: dokununca/tıklayınca büyür; sayfalar arası geçiş, tema ve başa dönüş.
 */
export default function DynamicIsland() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const page = currentPage(pathname);
  const PageIcon = navIcons[page.href]?.icon ?? FileText;
  const pageTone = navIcons[page.href]?.tone ?? 'gray';

  // Ada açıldığı sayfaya aittir; başka sayfaya geçince kendiliğinden kapanır.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const expanded = openPath === pathname;
  const [activity, setActivity] = useState<IslandActivity | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Sayfa değişince kısa bir "geçiş" etkinliği (ilk yüklemede değil).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setActivity({
      title: page.name,
      detail: page.description,
      icon: 'page',
      tone: pageTone,
      duration: 1500,
    });
  }

  useEffect(() => {
    const onActivity = (event: Event) => {
      const detail = (event as CustomEvent<IslandActivity>).detail;
      if (!detail?.title) return;
      setActivity({ ...detail });
      setOpenPath(null);
    };
    window.addEventListener(ISLAND_EVENT, onActivity);
    return () => window.removeEventListener(ISLAND_EVENT, onActivity);
  }, []);

  useEffect(() => {
    if (!activity) return;
    const timer = window.setTimeout(() => setActivity(null), activity.duration ?? 2200);
    return () => window.clearTimeout(timer);
  }, [activity]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPath(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpenPath(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [expanded]);

  const state = expanded ? 'expanded' : activity ? 'activity' : 'compact';
  const ActivityIcon = activity ? activityIcons[activity.icon ?? 'check'] : Check;

  return (
    <div className="island-anchor">
      <div ref={root} className="island" data-state={state}>
        {/* Sakin hâl: sayfa adı, hızlı gezinme ikonları ve ilerleme halkası */}
        <div className="island-compact" inert={state !== 'compact'}>
          <button
            type="button"
            className="island-compact-open"
            aria-label={`${page.name} — gezinmeyi aç`}
            aria-expanded={expanded}
            aria-controls="island-panel"
            onClick={() => setOpenPath(pathname)}
          >
            <span className={`island-glyph tone-${pageTone}`} aria-hidden="true">
              <PageIcon strokeWidth={2.2} />
            </span>
            <span className="island-compact-label">{page.name}</span>
            <ChevronDown className="island-chevron" strokeWidth={2.4} aria-hidden="true" />
          </button>
          <nav className="island-compact-nav" aria-label="Ana menü">
            {navigation.map((item) => {
              const Icon = navIcons[item.href]?.icon ?? FileText;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.name}
                  title={item.name}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon strokeWidth={2} aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="island-compact-top"
            aria-label={`Başa dön (%${progress})`}
            title="Başa dön"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ProgressRing value={progress} />
          </button>
        </div>

        {/* Etkinlik */}
        <div className="island-activity" aria-hidden={state !== 'activity'}>
          {activity && (
            <>
              <span className={`island-activity-icon tone-${activity.tone ?? 'green'}`}>
                <ActivityIcon strokeWidth={2.4} />
              </span>
              <span className="island-activity-copy">
                <strong>{activity.title}</strong>
                {activity.detail && <span>{activity.detail}</span>}
              </span>
            </>
          )}
        </div>

        {/* Açık hâl */}
        <div id="island-panel" className="island-panel" aria-hidden={!expanded} inert={!expanded}>
          <div className="island-panel-head">
            <span className={`island-tile tone-${pageTone}`} aria-hidden="true">
              <PageIcon strokeWidth={2} />
            </span>
            <span className="island-panel-title">
              <strong>{page.name}</strong>
              <span>{page.description}</span>
            </span>
            <button
              type="button"
              className="island-round"
              aria-label="Başa dön"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setOpenPath(null);
              }}
            >
              <span className="island-round-progress tabular">%{progress}</span>
              <ArrowUp strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
          <nav className="island-dock" aria-label="Hızlı gezinme">
            {navigation.map((item) => {
              const entry = navIcons[item.href];
              const Icon = entry?.icon ?? FileText;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="island-dock-item"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpenPath(null)}
                >
                  <span className={`island-tile tone-${entry?.tone ?? 'gray'}`} aria-hidden="true">
                    <Icon strokeWidth={2} />
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <button type="button" className="island-dock-item" onClick={toggleTheme}>
              <span className="island-tile tone-indigo" aria-hidden="true">
                <Moon className="icon-moon" strokeWidth={2} />
                <Sun className="icon-sun" strokeWidth={2} />
              </span>
              <span>Tema</span>
            </button>
            <a className="island-dock-item" href={site.cv} download onClick={() => setOpenPath(null)}>
              <span className="island-tile tone-red" aria-hidden="true">
                <FileDown strokeWidth={2} />
              </span>
              <span>Özgeçmiş</span>
            </a>
          </nav>
        </div>
      </div>
      {/* Uydu: Ada açılmadan tema değiştirir */}
      <button
        type="button"
        className="island-satellite"
        data-hidden={expanded || undefined}
        aria-label="Temayı değiştir"
        title="Açık / koyu görünüm"
        tabIndex={expanded ? -1 : 0}
        onClick={toggleTheme}
      >
        <Moon className="icon-moon" strokeWidth={2.2} aria-hidden="true" />
        <Sun className="icon-sun" strokeWidth={2.2} aria-hidden="true" />
      </button>
      <p className="sr-only" aria-live="polite">
        {activity ? `${activity.title}${activity.detail ? `. ${activity.detail}` : ''}` : ''}
      </p>
    </div>
  );
}
