import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Exercise the stopwatch and pomodoro logic without a browser or real time.
const source = await readFile(
  new URL('../src/lib/study-clock.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const mod = { exports: {} };
new Function('exports', 'module', compiled)(mod.exports, mod);
const {
  splitDuration,
  splitCountdown,
  formatLap,
  initialStopwatch,
  stopwatchElapsed,
  updateStopwatch,
  lapRows,
  MAX_LAPS,
  pomodoroPlans,
  isPlanKey,
  initialPomodoro,
  pomodoroRemaining,
  pomodoroProgress,
  updatePomodoro,
} = mod.exports;

// Formatting
assert.deepEqual(splitDuration(0), { hours: 0, minutes: 0, seconds: 0 });
assert.deepEqual(splitDuration(3_725_999), {
  hours: 1,
  minutes: 2,
  seconds: 5,
});
assert.deepEqual(splitDuration(-50), { hours: 0, minutes: 0, seconds: 0 });
assert.deepEqual(splitCountdown(1_500_000), {
  hours: 0,
  minutes: 25,
  seconds: 0,
});
assert.deepEqual(splitCountdown(1_499_001), {
  hours: 0,
  minutes: 25,
  seconds: 0,
});
assert.deepEqual(splitCountdown(1), { hours: 0, minutes: 0, seconds: 1 });
assert.deepEqual(splitCountdown(0), { hours: 0, minutes: 0, seconds: 0 });
assert.equal(formatLap(83_456), '01:23.45');
assert.equal(formatLap(3_683_450), '1:01:23.45');
assert.equal(formatLap(0), '00:00.00');

// Stopwatch: start, pause, resume, laps, reset
{
  let watch = initialStopwatch;
  assert.equal(stopwatchElapsed(watch, 5000), 0);
  assert.equal(updateStopwatch(watch, 'lap', 1000), watch);
  watch = updateStopwatch(watch, 'toggle', 1000);
  assert.equal(watch.running, true);
  assert.equal(stopwatchElapsed(watch, 4500), 3500);
  watch = updateStopwatch(watch, 'lap', 3000);
  watch = updateStopwatch(watch, 'toggle', 6000);
  assert.equal(watch.running, false);
  // Paused time does not count.
  assert.equal(stopwatchElapsed(watch, 60_000), 5000);
  watch = updateStopwatch(watch, 'toggle', 100_000);
  assert.equal(stopwatchElapsed(watch, 101_000), 6000);
  watch = updateStopwatch(watch, 'lap', 103_000);
  assert.deepEqual(watch.laps, [2000, 8000]);
  assert.deepEqual(lapRows(watch.laps), [
    { number: 2, lap: 6000, total: 8000 },
    { number: 1, lap: 2000, total: 2000 },
  ]);
  // A clock that jumps backwards never produces negative time.
  assert.equal(stopwatchElapsed(watch, 0), 5000);
  for (let i = 0; i < MAX_LAPS + 5; i++)
    watch = updateStopwatch(watch, 'lap', 104_000 + i);
  assert.equal(watch.laps.length, MAX_LAPS);
  assert.equal(updateStopwatch(watch, 'reset', 0), initialStopwatch);
}

// Pomodoro plans
for (const [key, plan] of Object.entries(pomodoroPlans)) {
  assert(isPlanKey(key));
  assert(plan.focus > plan.short && plan.long > plan.short && plan.rounds >= 2);
}
assert(!isPlanKey('toString') && !isPlanKey(undefined) && !isPlanKey('x'));

// Pomodoro: a full classic cycle, driven only by ticks
{
  const plan = pomodoroPlans.classic;
  const min = 60_000;
  let p = initialPomodoro(plan);
  assert.equal(pomodoroRemaining(p, 123), 25 * min);
  assert.equal(pomodoroProgress(p, plan, 123), 0);
  // Ticks do nothing while paused.
  assert.equal(updatePomodoro(p, plan, { type: 'tick', now: 10 ** 9 }), p);
  let now = 1_000_000;
  p = updatePomodoro(p, plan, { type: 'toggle', now });
  assert.equal(p.running, true);
  assert.equal(pomodoroRemaining(p, now + 10 * min), 15 * min);
  assert.equal(pomodoroProgress(p, plan, now + 10 * min), 0.4);
  // Pause keeps the remaining time; resume continues from it.
  p = updatePomodoro(p, plan, { type: 'toggle', now: now + 10 * min });
  assert.equal(pomodoroRemaining(p, now + 500 * min), 15 * min);
  now += 600 * min;
  p = updatePomodoro(p, plan, { type: 'toggle', now });
  assert.equal(
    updatePomodoro(p, plan, { type: 'tick', now: now + 15 * min - 1 }),
    p,
  );
  const phases = [];
  for (let i = 0; i < 9; i++) {
    now = p.endsAt;
    p = updatePomodoro(p, plan, { type: 'tick', now });
    phases.push(`${p.phase}${p.round}`);
    assert.equal(p.running, true);
    assert.equal(pomodoroRemaining(p, now), plan[p.phase] * min);
  }
  assert.deepEqual(phases, [
    'short1',
    'focus2',
    'short2',
    'focus3',
    'short3',
    'focus4',
    'long4',
    'focus1',
    'short1',
  ]);
  assert.equal(p.completed, 5);
  assert.equal(p.finished, 9);
  // A tab that slept past the end starts the next phase from "now".
  const late = updatePomodoro(p, plan, {
    type: 'tick',
    now: p.endsAt + 90 * min,
  });
  assert.equal(late.phase, 'focus');
  assert.equal(pomodoroRemaining(late, p.endsAt + 90 * min), 25 * min);
  // Skipping a focus session moves on without counting it.
  const skipped = updatePomodoro(late, plan, { type: 'skip', now: 5 });
  assert.equal(skipped.phase, 'short');
  assert.equal(skipped.completed, late.completed);
  assert.equal(skipped.finished, late.finished);
  assert.equal(skipped.running, true);
  assert.equal(pomodoroRemaining(skipped, 5), 5 * min);
  // Without auto-start the next phase waits, fully charged.
  const waiting = updatePomodoro(
    late,
    plan,
    { type: 'tick', now: late.endsAt },
    false,
  );
  assert.equal(waiting.running, false);
  assert.equal(pomodoroRemaining(waiting, 0), 5 * min);
  assert.deepEqual(
    updatePomodoro(p, plan, { type: 'reset' }),
    initialPomodoro(plan),
  );
}
// The long break comes after `rounds` focus sessions in every plan.
for (const plan of Object.values(pomodoroPlans)) {
  let p = updatePomodoro(initialPomodoro(plan), plan, {
    type: 'toggle',
    now: 0,
  });
  let focusSessions = 0;
  while (p.phase !== 'long') {
    if (p.phase === 'focus') focusSessions++;
    p = updatePomodoro(p, plan, { type: 'tick', now: p.endsAt });
  }
  assert.equal(focusSessions, plan.rounds);
}
console.log(
  'Study clock checks passed: formatting, stopwatch laps and pauses, pomodoro cycles, skipping and late ticks.',
);
