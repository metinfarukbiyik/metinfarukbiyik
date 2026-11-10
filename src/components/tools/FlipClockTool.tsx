'use client';

import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import {
  Clock,
  Flag,
  Hourglass,
  Maximize2,
  Minimize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Sun,
  Timer,
} from 'lucide-react';
import {
  formatLap,
  initialPomodoro,
  initialStopwatch,
  isPlanKey,
  lapRows,
  MAX_LAPS,
  pad,
  phaseLabels,
  pomodoroPlans,
  pomodoroProgress,
  pomodoroRemaining,
  splitCountdown,
  splitDuration,
  stopwatchElapsed,
  updatePomodoro,
  updateStopwatch,
  type Pomodoro,
  type PomodoroAction,
  type PomodoroPlanKey,
  type Stopwatch,
  type StopwatchAction,
} from '@/lib/study-clock';

type Mode = 'clock' | 'stopwatch' | 'pomodoro';
const modes: { key: Mode; label: string; icon: typeof Clock }[] = [
  { key: 'clock', label: 'Saat', icon: Clock },
  { key: 'stopwatch', label: 'Kronometre', icon: Timer },
  { key: 'pomodoro', label: 'Pomodoro', icon: Hourglass },
];

interface State {
  /** Current time; 0 until the page is mounted in the browser. */
  now: number;
  stopwatch: Stopwatch;
  pomodoro: Pomodoro;
  plan: PomodoroPlanKey;
}
type Action =
  | { type: 'tick'; now: number }
  | { type: 'stopwatch'; action: StopwatchAction; now: number }
  | { type: 'pomodoro'; action: PomodoroAction }
  | { type: 'plan'; plan: PomodoroPlanKey };

function reducer(state: State, action: Action): State {
  const plan = pomodoroPlans[state.plan];
  switch (action.type) {
    case 'tick':
      return {
        ...state,
        now: action.now,
        pomodoro: updatePomodoro(state.pomodoro, plan, action),
      };
    case 'stopwatch':
      return {
        ...state,
        now: action.now,
        stopwatch: updateStopwatch(state.stopwatch, action.action, action.now),
      };
    case 'pomodoro':
      return {
        ...state,
        pomodoro: updatePomodoro(state.pomodoro, plan, action.action),
      };
    case 'plan':
      // A new plan starts from a fresh, paused focus session.
      return {
        ...state,
        plan: action.plan,
        pomodoro: initialPomodoro(pomodoroPlans[action.plan]),
      };
  }
}

const initialState: State = {
  now: 0,
  stopwatch: initialStopwatch,
  pomodoro: initialPomodoro(pomodoroPlans.classic),
  plan: 'classic',
};

/**
 * Themes change the whole look (layout, shapes, type and colours), each with
 * its own day and night palette in tools.css under `.clock-stage[data-design]`:
 * the original split-flap cards, plus three lock-screen moods: crisp desktop
 * (thin type, sharp corners), frosted glass over a glowing wallpaper, and a
 * soft tonal phone look with stacked digits.
 */
const designs = {
  flip: { label: 'Flip', hint: 'Klasik yapraklı saat' },
  safir: { label: 'Safir', hint: 'İnce rakamlar, keskin hatlar' },
  sedef: { label: 'Sedef', hint: 'Buzlu cam, yumuşak ışık' },
  yesim: { label: 'Yeşim', hint: 'Yuvarlak hatlar, üst üste rakamlar' },
} as const;
type Design = keyof typeof designs;

/** Every theme has a bright palette for daylight and a dark one for the evening. */
const tones = {
  day: { label: 'Gündüz', icon: Sun },
  night: { label: 'Gece', icon: Moon },
} as const;
type Tone = keyof typeof tones;
const isTone = (value: unknown): value is Tone =>
  typeof value === 'string' && Object.hasOwn(tones, value);
const isDesign = (value: unknown): value is Design =>
  typeof value === 'string' && Object.hasOwn(designs, value);

const SETTINGS_KEY = 'biyik.flip-clock';
interface Settings {
  design: Design;
  tone: Tone;
  plan: PomodoroPlanKey;
  sound: boolean;
  seconds: boolean;
}
function readSettings(): Partial<Settings> {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(SETTINGS_KEY) ?? 'null',
    );
    if (!saved || typeof saved !== 'object') return {};
    const { design, tone, plan, sound, seconds } = saved as Record<
      string,
      unknown
    >;
    return {
      ...(isDesign(design) && { design }),
      ...(isTone(tone) && { tone }),
      ...(isPlanKey(plan) && { plan }),
      ...(typeof sound === 'boolean' && { sound }),
      ...(typeof seconds === 'boolean' && { seconds }),
    };
  } catch {
    return {};
  }
}
function writeSettings(settings: Settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Private mode or blocked storage: the settings just last for this visit.
  }
}

const dateFormat = new Intl.DateTimeFormat('tr-TR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

/** Three rising notes; short enough not to startle in a quiet room. */
function chime(context: AudioContext) {
  [660, 880, 1100].forEach((frequency, index) => {
    const start = context.currentTime + index * 0.22;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.55);
  });
}

/** One split-flap card. When `value` changes, the old top half folds down over the new one. */
function FlipCard({ value }: { value: string }) {
  const [shown, setShown] = useState({ current: value, previous: value });
  if (shown.current !== value)
    setShown({ current: value, previous: shown.current });
  const flipping = shown.previous !== shown.current;
  return (
    <span className="flip-card">
      <span className="flip-half flip-top">
        <span>{shown.current}</span>
      </span>
      <span className="flip-half flip-bottom">
        <span>{flipping ? shown.previous : shown.current}</span>
      </span>
      {flipping && (
        <>
          <span
            key={`fold-${shown.current}`}
            className="flip-half flip-top flip-fold"
          >
            <span>{shown.previous}</span>
          </span>
          <span
            key={`unfold-${shown.current}`}
            className="flip-half flip-bottom flip-unfold"
          >
            <span>{shown.current}</span>
          </span>
        </>
      )}
    </span>
  );
}

export default function FlipClockTool() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mode, setMode] = useState<Mode>('clock');
  const [design, setDesign] = useState<Design>('flip');
  const [tone, setTone] = useState<Tone>('night');
  const [seconds, setSeconds] = useState(true);
  const [sound, setSound] = useState(true);
  const [immersive, setImmersive] = useState(false);
  const [idle, setIdle] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const rung = useRef(0);
  const { now, stopwatch, pomodoro } = state;
  const plan = pomodoroPlans[state.plan];

  // One ticker drives everything; values are derived from timestamps, not tick counts.
  useEffect(() => {
    const start = window.setTimeout(() => {
      const saved = readSettings();
      if (saved.design) setDesign(saved.design);
      if (saved.tone) setTone(saved.tone);
      if (saved.plan) dispatch({ type: 'plan', plan: saved.plan });
      if (saved.sound !== undefined) setSound(saved.sound);
      if (saved.seconds !== undefined) setSeconds(saved.seconds);
      dispatch({ type: 'tick', now: Date.now() });
    }, 0);
    const interval = window.setInterval(
      () => dispatch({ type: 'tick', now: Date.now() }),
      200,
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  // Ring once per finished phase.
  useEffect(() => {
    if (pomodoro.finished === rung.current) return;
    rung.current = pomodoro.finished;
    if (sound && audio.current) chime(audio.current);
  }, [pomodoro.finished, sound]);

  const elapsed = splitDuration(stopwatchElapsed(stopwatch, now));
  const left = splitCountdown(pomodoroRemaining(pomodoro, now));
  const stopwatchText = `${pad(elapsed.hours)}:${pad(elapsed.minutes)}:${pad(elapsed.seconds)}`;
  const pomodoroText = `${pad(left.hours * 60 + left.minutes)}:${pad(left.seconds)}`;

  // A running timer stays readable from the browser tab.
  const tabTitle = pomodoro.running
    ? `${pomodoroText} · ${phaseLabels[pomodoro.phase]}`
    : stopwatch.running
      ? `${stopwatchText} · Kronometre`
      : null;
  useEffect(() => {
    if (!tabTitle) return;
    const original = document.title;
    document.title = tabTitle;
    return () => {
      document.title = original;
    };
  }, [tabTitle]);

  function wake() {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 3500);
  }

  function enterImmersive() {
    setImmersive(true);
    wake();
    // Take focus off the clicked button, so Space controls the timer instead of leaving full screen.
    stage.current?.focus();
    // Where the Fullscreen API is missing (iPhone), the fixed layout alone fills the page.
    stage.current?.requestFullscreen?.().catch(() => {});
  }

  function exitImmersive() {
    window.clearTimeout(idleTimer.current);
    setIdle(false);
    setImmersive(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  function primeAudio() {
    // Browsers only allow sound that was unlocked by a click or key press.
    try {
      audio.current ??= new AudioContext();
      void audio.current.resume();
    } catch {
      audio.current = null;
    }
  }

  function toggleTimer() {
    if (mode === 'stopwatch')
      dispatch({ type: 'stopwatch', action: 'toggle', now: Date.now() });
    if (mode === 'pomodoro') {
      primeAudio();
      dispatch({
        type: 'pomodoro',
        action: { type: 'toggle', now: Date.now() },
      });
    }
  }

  // Full screen: keep the display awake, lock page scroll, listen for Esc and Space.
  useEffect(() => {
    if (!immersive) return;
    let lock: WakeLockSentinel | null = null;
    let closed = false;
    const keepAwake = async () => {
      try {
        const sentinel = await navigator.wakeLock.request('screen');
        if (closed) void sentinel.release();
        else lock = sentinel;
      } catch {
        // Unsupported or denied (e.g. low battery): the clock still works.
      }
    };
    // The lock is dropped when the tab is hidden; take it again on return.
    const onVisibility = () => {
      if (document.visibilityState === 'visible') void keepAwake();
    };
    const onFullscreen = () => {
      if (document.fullscreenElement) return;
      window.clearTimeout(idleTimer.current);
      setIdle(false);
      setImmersive(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.clearTimeout(idleTimer.current);
        setIdle(false);
        setImmersive(false);
        if (document.fullscreenElement)
          document.exitFullscreen().catch(() => {});
        return;
      }
      window.clearTimeout(idleTimer.current);
      setIdle(false);
      idleTimer.current = window.setTimeout(() => setIdle(true), 3500);
      const target = event.target as HTMLElement | null;
      if (event.key !== ' ' || target?.closest('button, input, select, a'))
        return;
      event.preventDefault();
      if (mode === 'stopwatch')
        dispatch({ type: 'stopwatch', action: 'toggle', now: Date.now() });
      if (mode === 'pomodoro') {
        try {
          audio.current ??= new AudioContext();
          void audio.current.resume();
        } catch {
          audio.current = null;
        }
        dispatch({
          type: 'pomodoro',
          action: { type: 'toggle', now: Date.now() },
        });
      }
    };
    void keepAwake();
    const root = document.documentElement;
    const { overflow, scrollbarGutter } = root.style;
    root.style.overflow = 'hidden';
    // The site reserves a scrollbar strip; without this it would show beside the clock.
    root.style.scrollbarGutter = 'auto';
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('keydown', onKey);
    return () => {
      closed = true;
      lock?.release().catch(() => {});
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('keydown', onKey);
    };
  }, [immersive, mode]);

  function changeSettings(next: Partial<Settings>) {
    const settings = {
      design,
      tone,
      plan: state.plan,
      sound,
      seconds,
      ...next,
    };
    if (next.design) setDesign(next.design);
    if (next.tone) setTone(next.tone);
    if (next.plan) dispatch({ type: 'plan', plan: next.plan });
    if (next.sound !== undefined) setSound(next.sound);
    if (next.seconds !== undefined) setSeconds(next.seconds);
    writeSettings(settings);
  }

  const time = now ? new Date(now) : null;
  const groups =
    mode === 'clock'
      ? [
          time ? pad(time.getHours()) : '--',
          time ? pad(time.getMinutes()) : '--',
          ...(seconds ? [time ? pad(time.getSeconds()) : '--'] : []),
        ]
      : mode === 'stopwatch'
        ? stopwatchText.split(':')
        : pomodoroText.split(':');
  const readable =
    mode === 'clock'
      ? groups.join(':')
      : mode === 'stopwatch'
        ? `Kronometre ${stopwatchText}`
        : `${phaseLabels[pomodoro.phase]}, kalan süre ${pomodoroText}`;
  const caption =
    mode === 'clock'
      ? time
        ? dateFormat.format(time)
        : ' '
      : mode === 'stopwatch'
        ? 'Kronometre'
        : `${phaseLabels[pomodoro.phase]} · ${pomodoro.round} / ${plan.rounds}`;
  const running =
    mode === 'stopwatch'
      ? stopwatch.running
      : mode === 'pomodoro' && pomodoro.running;
  const started =
    mode === 'stopwatch'
      ? stopwatch.running || stopwatch.elapsed > 0
      : pomodoro.running ||
        pomodoro.remaining < plan[pomodoro.phase] * 60_000 ||
        pomodoro.completed > 0 ||
        pomodoro.phase !== 'focus';
  const laps = lapRows(stopwatch.laps);

  return (
    <div className="clock-tool">
      <div
        ref={stage}
        className="clock-stage"
        tabIndex={-1}
        data-mode={mode}
        data-design={design}
        data-tone={tone}
        data-phase={mode === 'pomodoro' ? pomodoro.phase : undefined}
        data-immersive={immersive || undefined}
        data-idle={(immersive && idle) || undefined}
        onPointerMove={immersive ? wake : undefined}
        onPointerDown={immersive ? wake : undefined}
      >
        <div className="clock-tabs clock-chrome" role="group" aria-label="Mod">
          {modes.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => setMode(key)}
            >
              <Icon size={14} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        <div className="clock-face">
          <p className="clock-caption">{caption}</p>
          {design === 'flip' ? (
            <div
              className="flip-clock"
              data-groups={groups.length}
              aria-hidden="true"
            >
              {groups.map((value, index) => (
                <FlipCard key={index} value={value} />
              ))}
            </div>
          ) : (
            <div
              className="plain-clock"
              data-groups={groups.length}
              aria-hidden="true"
            >
              {groups.map((value, index) => (
                <Fragment key={index}>
                  {index > 0 && <span className="plain-separator">:</span>}
                  <span className="plain-group">{value}</span>
                </Fragment>
              ))}
            </div>
          )}
          <p className="sr-only" role="timer">
            {readable}
          </p>
          {mode === 'pomodoro' && (
            <div className="clock-progress">
              <span
                style={{
                  width: `${pomodoroProgress(pomodoro, plan, now) * 100}%`,
                }}
              />
            </div>
          )}
          {mode === 'pomodoro' && (
            <div
              className="clock-rounds"
              role="img"
              aria-label={`Bu döngüde ${plan.rounds} odak seansından ${pomodoro.round}.`}
            >
              {Array.from({ length: plan.rounds }, (_, index) => (
                <span
                  key={index}
                  data-state={
                    index + 1 < pomodoro.round ||
                    (index + 1 === pomodoro.round && pomodoro.phase !== 'focus')
                      ? 'done'
                      : index + 1 === pomodoro.round
                        ? 'current'
                        : undefined
                  }
                />
              ))}
            </div>
          )}
          {mode === 'stopwatch' && (
            <p className="clock-lap-note">
              {laps.length
                ? `Tur ${laps[0].number} · ${formatLap(laps[0].lap)}`
                : ' '}
            </p>
          )}
        </div>

        <div className="clock-actions clock-chrome">
          {mode !== 'clock' && (
            <>
              <button
                type="button"
                className="clock-button clock-button-primary"
                onClick={toggleTimer}
              >
                {running ? (
                  <Pause size={16} aria-hidden="true" />
                ) : (
                  <Play size={16} aria-hidden="true" />
                )}
                {running ? 'Duraklat' : started ? 'Devam et' : 'Başlat'}
              </button>
              {mode === 'stopwatch' ? (
                <button
                  type="button"
                  className="clock-button"
                  disabled={
                    !stopwatch.running || stopwatch.laps.length >= MAX_LAPS
                  }
                  onClick={() =>
                    dispatch({
                      type: 'stopwatch',
                      action: 'lap',
                      now: Date.now(),
                    })
                  }
                >
                  <Flag size={15} aria-hidden="true" /> Tur
                </button>
              ) : (
                <button
                  type="button"
                  className="clock-button"
                  onClick={() =>
                    dispatch({
                      type: 'pomodoro',
                      action: { type: 'skip', now: Date.now() },
                    })
                  }
                >
                  <SkipForward size={15} aria-hidden="true" /> Atla
                </button>
              )}
              <button
                type="button"
                className="clock-button"
                disabled={!started}
                onClick={() =>
                  mode === 'stopwatch'
                    ? dispatch({
                        type: 'stopwatch',
                        action: 'reset',
                        now: Date.now(),
                      })
                    : dispatch({ type: 'pomodoro', action: { type: 'reset' } })
                }
              >
                <RotateCcw size={15} aria-hidden="true" /> Sıfırla
              </button>
            </>
          )}
          <button
            type="button"
            className="clock-button"
            onClick={immersive ? exitImmersive : enterImmersive}
          >
            {immersive ? (
              <Minimize2 size={15} aria-hidden="true" />
            ) : (
              <Maximize2 size={15} aria-hidden="true" />
            )}
            {immersive ? 'Tam ekrandan çık' : 'Tam ekran'}
          </button>
        </div>
      </div>

      <div className="clock-panel">
        <fieldset className="photo-field">
          <legend>Tema</legend>
          <div className="photo-options clock-theme-options">
            {(Object.keys(designs) as Design[]).map((key) => (
              <label key={key}>
                <input
                  type="radio"
                  name="clock-design"
                  value={key}
                  checked={design === key}
                  onChange={() => changeSettings({ design: key })}
                />
                <span>
                  <strong>{designs[key].label}</strong>
                  <small>{designs[key].hint}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="photo-field">
          <legend>Mod</legend>
          <div className="photo-options clock-tone-options">
            {(Object.keys(tones) as Tone[]).map((key) => {
              const Icon = tones[key].icon;
              return (
                <label key={key}>
                  <input
                    type="radio"
                    name="clock-tone"
                    value={key}
                    checked={tone === key}
                    onChange={() => changeSettings({ tone: key })}
                  />
                  <span>
                    <Icon size={14} aria-hidden="true" /> {tones[key].label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {mode === 'clock' && (
          <label className="photo-checkbox">
            <input
              type="checkbox"
              checked={seconds}
              onChange={(event) =>
                changeSettings({ seconds: event.target.checked })
              }
            />{' '}
            Saniyeyi göster
          </label>
        )}
        {mode === 'pomodoro' && (
          <>
            <fieldset className="photo-field">
              <legend>Odak / mola süresi (dakika)</legend>
              <div className="photo-options">
                {(Object.keys(pomodoroPlans) as PomodoroPlanKey[]).map(
                  (key) => (
                    <label key={key}>
                      <input
                        type="radio"
                        name="pomodoro-plan"
                        value={key}
                        checked={state.plan === key}
                        onChange={() => changeSettings({ plan: key })}
                      />
                      <span>
                        <strong>{pomodoroPlans[key].label}</strong>
                        <small>
                          {pomodoroPlans[key].rounds} seans · uzun mola{' '}
                          {pomodoroPlans[key].long} dk
                        </small>
                      </span>
                    </label>
                  ),
                )}
              </div>
            </fieldset>
            <label className="photo-checkbox">
              <input
                type="checkbox"
                checked={sound}
                onChange={(event) =>
                  changeSettings({ sound: event.target.checked })
                }
              />{' '}
              Süre bitince sesli uyar
            </label>
            <p className="clock-note">
              Tamamlanan odak seansı: <strong>{pomodoro.completed}</strong> ·{' '}
              <strong>{pomodoro.completed * plan.focus} dk</strong>. Süre
              seçimini değiştirmek sayacı sıfırlar.
            </p>
          </>
        )}
        {mode === 'stopwatch' &&
          (laps.length ? (
            <table className="clock-laps">
              <caption className="sr-only">Tur süreleri</caption>
              <thead>
                <tr>
                  <th scope="col">Tur</th>
                  <th scope="col">Tur süresi</th>
                  <th scope="col">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {laps.map((row) => (
                  <tr key={row.number}>
                    <td>{row.number}</td>
                    <td>{formatLap(row.lap)}</td>
                    <td>{formatLap(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="clock-note">
              Kronometre çalışırken <strong>Tur</strong> ile ara süreleri
              kaydedebilirsin; her konu veya soru için ayrı süre tutmak
              istediğinde işe yarar.
            </p>
          ))}
        <p className="clock-note">
          Tam ekranda ekran açık tutulur ve düğmeler birkaç saniye sonra
          gizlenir; fareyi oynatınca ya da ekrana dokununca geri gelir.{' '}
          <kbd>Boşluk</kbd> başlatır ve duraklatır, <kbd>Esc</kbd> tam ekrandan
          çıkar.
        </p>
      </div>
    </div>
  );
}
