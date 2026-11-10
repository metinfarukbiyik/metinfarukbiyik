/**
 * Browser-independent logic of the flip clock tool: stopwatch, pomodoro and
 * time formatting. Every function takes the current time as an argument, so
 * timers stay correct when a background tab throttles its intervals.
 */

export const pad = (value: number) => String(value).padStart(2, '0');

/** Whole hours, minutes and seconds of a duration in milliseconds. */
export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Countdowns round up, so a fresh 25 minute timer reads 25:00 and ends at 00:00. */
export const splitCountdown = (ms: number) =>
  splitDuration(Math.ceil(Math.max(0, ms) / 1000) * 1000);

/** Lap time with hundredths: 01:23.45, or 1:01:23.45 past the first hour. */
export function formatLap(ms: number) {
  const { hours, minutes, seconds } = splitDuration(ms);
  const hundredths = Math.floor((Math.max(0, ms) % 1000) / 10);
  return `${hours ? `${hours}:` : ''}${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
}

// ── Stopwatch ────────────────────────────────────────────

export interface Stopwatch {
  running: boolean;
  /** Timestamp of the last start; meaningful only while running. */
  startedAt: number;
  /** Time collected before the last start. */
  elapsed: number;
  /** Total elapsed time at each lap, oldest first. */
  laps: number[];
}

export const initialStopwatch: Stopwatch = {
  running: false,
  startedAt: 0,
  elapsed: 0,
  laps: [],
};

export const MAX_LAPS = 99;

export const stopwatchElapsed = (watch: Stopwatch, now: number) =>
  watch.elapsed + (watch.running ? Math.max(0, now - watch.startedAt) : 0);

export type StopwatchAction = 'toggle' | 'lap' | 'reset';

export function updateStopwatch(
  watch: Stopwatch,
  action: StopwatchAction,
  now: number,
): Stopwatch {
  if (action === 'reset') return initialStopwatch;
  if (action === 'toggle')
    return watch.running
      ? { ...watch, running: false, elapsed: stopwatchElapsed(watch, now) }
      : { ...watch, running: true, startedAt: now };
  if (!watch.running || watch.laps.length >= MAX_LAPS) return watch;
  return { ...watch, laps: [...watch.laps, stopwatchElapsed(watch, now)] };
}

/** Laps as rows: duration of each lap and the running total, newest first. */
export const lapRows = (laps: number[]) =>
  laps
    .map((total, index) => ({
      number: index + 1,
      lap: total - (laps[index - 1] ?? 0),
      total,
    }))
    .reverse();

// ── Pomodoro ─────────────────────────────────────────────

export type PomodoroPhase = 'focus' | 'short' | 'long';

export const phaseLabels: Record<PomodoroPhase, string> = {
  focus: 'Odak',
  short: 'Kısa mola',
  long: 'Uzun mola',
};

/** Durations in minutes; a long break follows every `rounds` focus sessions. */
export interface PomodoroPlan {
  focus: number;
  short: number;
  long: number;
  rounds: number;
}

export const pomodoroPlans = {
  classic: { label: '25 / 5', focus: 25, short: 5, long: 15, rounds: 4 },
  medium: { label: '45 / 10', focus: 45, short: 10, long: 20, rounds: 4 },
  deep: { label: '60 / 15', focus: 60, short: 15, long: 30, rounds: 3 },
} as const satisfies Record<string, PomodoroPlan & { label: string }>;
export type PomodoroPlanKey = keyof typeof pomodoroPlans;

export const isPlanKey = (value: unknown): value is PomodoroPlanKey =>
  typeof value === 'string' && Object.hasOwn(pomodoroPlans, value);

export interface Pomodoro {
  phase: PomodoroPhase;
  /** Focus session within the current cycle, starting at 1. */
  round: number;
  running: boolean;
  /** Timestamp at which the running phase ends. */
  endsAt: number;
  /** Time left while paused. */
  remaining: number;
  /** Focus sessions finished since the last reset. */
  completed: number;
  /** Phases that ran to the end; a change here means "ring the bell". */
  finished: number;
}

export const phaseDuration = (plan: PomodoroPlan, phase: PomodoroPhase) =>
  plan[phase] * 60_000;

export const initialPomodoro = (plan: PomodoroPlan): Pomodoro => ({
  phase: 'focus',
  round: 1,
  running: false,
  endsAt: 0,
  remaining: phaseDuration(plan, 'focus'),
  completed: 0,
  finished: 0,
});

export const pomodoroRemaining = (pomodoro: Pomodoro, now: number) =>
  pomodoro.running ? Math.max(0, pomodoro.endsAt - now) : pomodoro.remaining;

/** Share of the current phase that has passed, from 0 to 1. */
export const pomodoroProgress = (
  pomodoro: Pomodoro,
  plan: PomodoroPlan,
  now: number,
) => {
  const duration = phaseDuration(plan, pomodoro.phase);
  return Math.min(
    1,
    Math.max(0, 1 - pomodoroRemaining(pomodoro, now) / duration),
  );
};

/** Moves to the phase that follows; `finishedFocus` counts the session as done. */
function nextPhase(
  pomodoro: Pomodoro,
  plan: PomodoroPlan,
  finishedFocus: boolean,
): Pick<Pomodoro, 'phase' | 'round' | 'completed' | 'remaining'> {
  const completed = pomodoro.completed + (finishedFocus ? 1 : 0);
  if (pomodoro.phase === 'focus') {
    const phase = pomodoro.round >= plan.rounds ? 'long' : 'short';
    return {
      phase,
      round: pomodoro.round,
      completed,
      remaining: phaseDuration(plan, phase),
    };
  }
  return {
    phase: 'focus',
    round: pomodoro.phase === 'long' ? 1 : pomodoro.round + 1,
    completed,
    remaining: phaseDuration(plan, 'focus'),
  };
}

export type PomodoroAction =
  { type: 'toggle' | 'skip' | 'tick'; now: number } | { type: 'reset' };

export function updatePomodoro(
  pomodoro: Pomodoro,
  plan: PomodoroPlan,
  action: PomodoroAction,
  autoStart = true,
): Pomodoro {
  switch (action.type) {
    case 'reset':
      return initialPomodoro(plan);
    case 'toggle':
      return pomodoro.running
        ? {
            ...pomodoro,
            running: false,
            remaining: pomodoroRemaining(pomodoro, action.now),
          }
        : {
            ...pomodoro,
            running: true,
            endsAt: action.now + pomodoro.remaining,
          };
    case 'skip': {
      // Skipping a focus session does not count it as completed.
      const next = nextPhase(pomodoro, plan, false);
      return {
        ...pomodoro,
        ...next,
        endsAt: action.now + next.remaining,
      };
    }
    case 'tick': {
      if (!pomodoro.running || action.now < pomodoro.endsAt) return pomodoro;
      const next = nextPhase(pomodoro, plan, pomodoro.phase === 'focus');
      return {
        ...pomodoro,
        ...next,
        running: autoStart,
        // The next phase starts now, even if the tab slept past the end.
        endsAt: action.now + next.remaining,
        finished: pomodoro.finished + 1,
      };
    }
  }
}
