'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowRight, Gauge, RotateCcw } from 'lucide-react';
import {
  connections,
  diagnose,
  media,
  planPresets,
  symptoms,
  type Connection,
  type Medium,
  type Symptom,
} from '@/lib/network-diagnosis';
import { parseSpeedHistory, SPEED_HISTORY_KEY, type SpeedResult } from '@/lib/network-tools';
import { Field, Options, Step } from './ToolForm';

type Measure = { download: string; upload: string; latency: string; jitter: string };
const emptyMeasure: Measure = { download: '', upload: '', latency: '', jitter: '' };
const toNumber = (value: string) => {
  const number = Number(value.replace(',', '.'));
  return value.trim() && Number.isFinite(number) && number >= 0 ? number : null;
};
const fixed = (value: number) => String(Math.round(value * 10) / 10);

/** Speed test history lives in localStorage; read it as an external store (null on the server). */
const subscribe = (notify: () => void) => {
  window.addEventListener('storage', notify);
  return () => window.removeEventListener('storage', notify);
};
const readHistory = () => {
  try {
    return localStorage.getItem(SPEED_HISTORY_KEY);
  } catch {
    return null;
  }
};

const measureFields: { key: keyof Measure; label: string; unit: string }[] = [
  { key: 'download', label: 'İndirme', unit: 'Mbps' },
  { key: 'upload', label: 'Yükleme', unit: 'Mbps' },
  { key: 'latency', label: 'Gecikme', unit: 'ms' },
  { key: 'jitter', label: 'Jitter', unit: 'ms' },
];

export default function NetworkDiagnosisTool() {
  const stored = useSyncExternalStore(subscribe, readHistory, () => null);
  const latest: SpeedResult | null = useMemo(() => parseSpeedHistory(stored)[0] ?? null, [stored]);
  // Values typed by the visitor win over the last speed test.
  const [edited, setEdited] = useState<Partial<Measure>>({});
  const measure: Measure = useMemo(() => {
    const fromTest = latest
      ? { download: fixed(latest.download), upload: fixed(latest.upload), latency: fixed(latest.latency), jitter: fixed(latest.jitter) }
      : emptyMeasure;
    return { ...fromTest, ...edited };
  }, [latest, edited]);
  const [connection, setConnection] = useState<Connection>('fiber');
  const [medium, setMedium] = useState<Medium>('wifi');
  const [plan, setPlan] = useState('');
  const [selected, setSelected] = useState<Symptom[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set());

  const diagnosis = useMemo(
    () =>
      diagnose({
        connection,
        medium,
        plan: toNumber(plan) || null,
        download: toNumber(measure.download),
        upload: toNumber(measure.upload),
        latency: toNumber(measure.latency),
        jitter: toNumber(measure.jitter),
        symptoms: selected,
      }),
    [connection, medium, plan, measure, selected],
  );
  const completed = diagnosis.steps.filter((step) => done.has(step.id)).length;

  const toggleSymptom = (symptom: Symptom) =>
    setSelected((current) => (current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]));
  const toggleDone = (id: string) =>
    setDone((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="photo-workspace diag-workspace">
      <section className="photo-controls" aria-label="Ölçüm ve bağlantı bilgileri">
        <Step index={1} title="Ölçüm sonucun">
          {latest ? (
            <p className="diag-source">
              <Gauge aria-hidden="true" />
              <span>
                Son hız testin yüklendi
                <small className="mono">{new Date(latest.timestamp).toLocaleString('tr-TR')}</small>
              </span>
            </p>
          ) : (
            <p className="diag-source">
              <Gauge aria-hidden="true" />
              <span>
                Bu tarayıcıda hız testi sonucu yok.{' '}
                <Link href="/araclar/internet-hiz-testi">Önce hız testi yap</Link> ya da değerleri elle gir.
              </span>
            </p>
          )}
          <div className="diag-measures">
            {measureFields.map((field) => (
              <Field key={field.key} id={`diag-${field.key}`} label={field.label} hint={field.unit}>
                <input
                  id={`diag-${field.key}`}
                  className="input mono"
                  inputMode="decimal"
                  value={measure[field.key]}
                  onChange={(e) => setEdited((current) => ({ ...current, [field.key]: e.target.value }))}
                />
              </Field>
            ))}
          </div>
        </Step>

        <Step index={2} title="Bağlantın">
          <Options legend="Bağlantı türü" name="diag-connection" options={connections} value={connection} onChange={setConnection} />
          <Options
            legend="Test nasıl yapıldı?"
            name="diag-medium"
            options={media}
            value={medium}
            onChange={setMedium}
            className="diag-media"
          />
          <Field id="diag-plan" label="Paket hızın" hint="Mbps · faturanda yazar">
            <input
              id="diag-plan"
              className="input mono"
              inputMode="numeric"
              placeholder="ör. 100"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />
          </Field>
          <div className="diag-presets" aria-label="Hazır paket hızları">
            {planPresets.map((value) => (
              <button
                key={value}
                type="button"
                className="mono"
                aria-pressed={plan === String(value)}
                onClick={() => setPlan(String(value))}
              >
                {value >= 1000 ? '1 Gbps' : value}
              </button>
            ))}
          </div>
        </Step>

        <Step index={3} title="Ne yaşıyorsun?">
          <div className="diag-symptoms">
            {symptoms.map((symptom) => (
              <label key={symptom.value}>
                <input
                  type="checkbox"
                  checked={selected.includes(symptom.value)}
                  onChange={() => toggleSymptom(symptom.value)}
                />
                <span>{symptom.label}</span>
              </label>
            ))}
          </div>
        </Step>
      </section>

      <section className="photo-preview diag-result" aria-labelledby="diag-title" aria-live="polite">
        <div className="photo-preview-heading">
          <h2 id="diag-title">Şimdi neyi kontrol edeyim?</h2>
          <span>
            {completed}/{diagnosis.steps.length} adım
          </span>
        </div>
        <div className="diag-verdict" data-tone={diagnosis.tone}>
          <strong>{diagnosis.headline}</strong>
          <p>{diagnosis.summary}</p>
        </div>
        {diagnosis.findings.length > 0 && (
          <ul className="diag-findings">
            {diagnosis.findings.map((finding) => (
              <li key={finding.text} data-tone={finding.tone}>
                {finding.text}
              </li>
            ))}
          </ul>
        )}
        <ol className="diag-steps">
          {diagnosis.steps.map((step, index) => (
            <li key={step.id} data-done={done.has(step.id) || undefined}>
              <label>
                <input type="checkbox" checked={done.has(step.id)} onChange={() => toggleDone(step.id)} />
                <span className="diag-step-index mono">{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
              </label>
              <p>{step.detail}</p>
              {step.link && (
                <Link href={step.link.href} className="diag-step-link">
                  {step.link.label} <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ol>
        {done.size > 0 && (
          <button type="button" className="photo-reset" onClick={() => setDone(new Set())}>
            <RotateCcw size={13} aria-hidden="true" /> İşaretleri temizle
          </button>
        )}
      </section>
    </div>
  );
}
