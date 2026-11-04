export const SPEED_HISTORY_KEY = 'biyik-dev:speed-results:v1';
export const MIN_TRANSFER = 5_000_000;
export const MAX_TRANSFER = 50_000_000;
/**
 * Concurrent requests per direction. One request cannot fill a fast line when the
 * round trip is long (Turkey → Cloudflare often routes via Amsterdam, ~60 ms).
 */
export const STREAMS = 6;
export type SpeedPhase = 'latency' | 'download' | 'upload';
export type SpeedResult = {
  id: string;
  timestamp: string;
  download: number;
  upload: number;
  latency: number;
  jitter: number;
  downloadBytes: number;
  uploadBytes: number;
  /** Cloudflare data centre that served the test, e.g. "Amsterdam (AMS)". */
  server?: string;
};
export type SpeedProgress = {
  phase: SpeedPhase;
  fraction: number;
  mbps?: number;
  latency?: number;
  jitter?: number;
  server?: string;
};

/** Common Cloudflare data centres near Türkiye; unknown codes are shown as-is. */
const COLO_CITIES: Record<string, string> = {
  IST: 'İstanbul',
  ESB: 'Ankara',
  ADB: 'İzmir',
  SOF: 'Sofya',
  OTP: 'Bükreş',
  ATH: 'Atina',
  SKG: 'Selanik',
  BEG: 'Belgrad',
  BUD: 'Budapeşte',
  VIE: 'Viyana',
  FRA: 'Frankfurt',
  AMS: 'Amsterdam',
  CDG: 'Paris',
  LHR: 'Londra',
  MXP: 'Milano',
  WAW: 'Varşova',
  PRG: 'Prag',
  TLV: 'Tel Aviv',
  TBS: 'Tiflis',
  KBP: 'Kiev',
};

export function describeColo(colo: string | null | undefined) {
  const code = colo?.trim().toUpperCase();
  if (!code || !/^[A-Z]{3}$/.test(code)) return undefined;
  return COLO_CITIES[code] ? `${COLO_CITIES[code]} (${code})` : code;
}

/** Splits a byte budget into near-equal parts, one per concurrent request. */
export function splitBytes(total: number, parts: number) {
  const count = Math.max(1, Math.min(parts, Math.floor(total / 65_536) || 1));
  const base = Math.floor(total / count);
  return Array.from({ length: count }, (_, i) => (i === count - 1 ? total - base * (count - 1) : base));
}
export const mbpsFromTransfer = (bytes: number, milliseconds: number) =>
  (bytes * 8) / (milliseconds * 1000);
export const additionalTransfer = (bytes: number, milliseconds: number) =>
  Math.max(
    0,
    Math.min(
      MAX_TRANSFER - bytes,
      Math.round((bytes / Math.max(milliseconds, 1)) * 4000 - bytes),
    ),
  );
export const median = (samples: number[]) => {
  const sorted = [...samples].sort((a, b) => a - b);
  return sorted.length % 2
    ? sorted[Math.floor(sorted.length / 2)]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
};
export function mergeSpeedHistory(...groups: SpeedResult[][]) {
  return [...new Map(groups.flat().map((item) => [item.id, item])).values()]
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .slice(0, 50);
}
export function parseSpeedHistory(raw: string | null): SpeedResult[] {
  try {
    const data: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (value): value is SpeedResult =>
          value &&
          typeof value.id === 'string' &&
          typeof value.timestamp === 'string' &&
          Number.isFinite(Date.parse(value.timestamp)) &&
          [
            'download',
            'upload',
            'latency',
            'jitter',
            'downloadBytes',
            'uploadBytes',
          ].every(
            (key) =>
              typeof value[key] === 'number' &&
              Number.isFinite(value[key]) &&
              value[key] >= 0,
          ) &&
          (value.server === undefined ||
            (typeof value.server === 'string' && value.server.length <= 40)),
      )
      .slice(0, 50);
  } catch {
    return [];
  }
}

export async function fetchNetworkJson(
  url: string,
  signal: AbortSignal,
  timeout = 10000,
): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(timeout)]),
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  });
  if (!response.ok) throw new Error('Ağ bilgisi servisine ulaşılamadı.');
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new Error('Ağ bilgisi geçerli bir yanıt içermiyor.');
  return data as Record<string, unknown>;
}

function transfer(
  direction: 'download' | 'upload',
  bytes: number,
  signal: AbortSignal,
  onProgress: (loaded: number, milliseconds: number) => void,
): Promise<number> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('İptal edildi', 'AbortError'));
      return;
    }
    const xhr = new XMLHttpRequest();
    let started = 0;
    const cancel = () => xhr.abort();
    const cleanup = () => signal.removeEventListener('abort', cancel);
    xhr.open(
      direction === 'download' ? 'GET' : 'POST',
      `https://speed.cloudflare.com/${direction === 'download' ? '__down' : '__up'}?${direction === 'download' ? `bytes=${bytes}&` : ''}r=${crypto.randomUUID()}`,
    );
    xhr.timeout = 60000;
    xhr.responseType = direction === 'download' ? 'arraybuffer' : 'text';
    const progress = (event: ProgressEvent) =>
      onProgress(event.loaded, performance.now() - started);
    if (direction === 'download') xhr.onprogress = progress;
    else xhr.upload.onprogress = progress;
    xhr.onload = () => {
      cleanup();
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error('Ölçüm sunucusu yanıt vermedi.'));
        return;
      }
      if (
        direction === 'download' &&
        (xhr.response as ArrayBuffer).byteLength !== bytes
      ) {
        reject(new Error('Test verisi eksik alındı.'));
        return;
      }
      const elapsed = performance.now() - started;
      onProgress(bytes, elapsed);
      resolve(elapsed);
    };
    xhr.onerror = () => {
      cleanup();
      reject(
        new Error(
          'Test sunucusuna ulaşılamadı. Bağlantını veya içerik engelleyicini kontrol edip tekrar dene.',
        ),
      );
    };
    xhr.ontimeout = () => {
      cleanup();
      reject(
        new Error(
          'Aktarım zaman aşımına uğradı. Bağlantı çok yavaş veya kesilmiş olabilir.',
        ),
      );
    };
    xhr.onabort = () => {
      cleanup();
      reject(new DOMException('İptal edildi', 'AbortError'));
    };
    signal.addEventListener('abort', cancel, { once: true });
    let body: Blob | undefined;
    if (direction === 'upload') {
      const data = new Uint8Array(bytes);
      for (let offset = 0; offset < bytes; offset += 65536)
        crypto.getRandomValues(
          data.subarray(offset, Math.min(offset + 65536, bytes)),
        );
      body = new Blob([data], { type: 'application/octet-stream' });
    }
    started = performance.now();
    xhr.send(body);
  });
}

/**
 * Runs a byte budget as several concurrent requests and reports the combined progress.
 * If one request fails, the others are cancelled so no orphan traffic keeps running.
 */
async function parallelTransfer(
  direction: 'download' | 'upload',
  total: number,
  signal: AbortSignal,
  onProgress: (loaded: number, milliseconds: number) => void,
): Promise<number> {
  const parts = splitBytes(total, STREAMS);
  const loaded = parts.map(() => 0);
  const group = new AbortController();
  const stop = () => group.abort();
  signal.addEventListener('abort', stop, { once: true });
  const started = performance.now();
  try {
    await Promise.all(
      parts.map((bytes, index) =>
        transfer(direction, bytes, group.signal, (value) => {
          loaded[index] = value;
          onProgress(
            loaded.reduce((sum, part) => sum + part, 0),
            performance.now() - started,
          );
        }).catch((cause) => {
          group.abort();
          throw cause;
        }),
      ),
    );
  } catch (cause) {
    if (signal.aborted) throw new DOMException('İptal edildi', 'AbortError');
    throw cause;
  } finally {
    signal.removeEventListener('abort', stop);
  }
  return performance.now() - started;
}

export async function runSpeedTest(
  signal: AbortSignal,
  onProgress: (progress: SpeedProgress) => void,
): Promise<SpeedResult> {
  const samples: number[] = [];
  // Which data centre answers; read in parallel and never blocks or fails the test.
  // Only the `colo=` line is kept from the trace response.
  const colo = fetch(`https://speed.cloudflare.com/cdn-cgi/trace?r=${crypto.randomUUID()}`, {
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
  })
    .then((response) => (response.ok ? response.text() : ''))
    .then((text) => describeColo(text.match(/^colo=(\w+)$/m)?.[1]))
    .catch(() => undefined);
  for (let index = 0; index < 6; index++) {
    onProgress({ phase: 'latency', fraction: index / 6 });
    const start = performance.now();
    const response = await fetch(
      `https://speed.cloudflare.com/__down?bytes=0&r=${crypto.randomUUID()}`,
      {
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
      },
    );
    if (!response.ok) throw new Error('Ölçüm sunucusuna ulaşılamadı.');
    await response.arrayBuffer();
    if (index > 0) samples.push(performance.now() - start);
  }
  const server = await colo;
  const latency = median(samples);
  const jitter =
    samples
      .slice(1)
      .reduce((total, sample, i) => total + Math.abs(sample - samples[i]), 0) /
    (samples.length - 1);
  onProgress({ phase: 'latency', fraction: 1, latency, jitter, server });

  const measure = async (phase: 'download' | 'upload') => {
    onProgress({ phase, fraction: 0 });
    // Warm-up: opens the connection, lets TCP leave slow start and sizes the main stage.
    const warmup = await parallelTransfer(phase, MIN_TRANSFER, signal, (loaded, duration) =>
      onProgress({
        phase,
        fraction: (loaded / MIN_TRANSFER) * 0.35,
        mbps: mbpsFromTransfer(loaded, Math.max(duration, 1)),
      }),
    );
    const extra = additionalTransfer(MIN_TRANSFER, warmup);
    let mbps = mbpsFromTransfer(MIN_TRANSFER, Math.max(warmup, 1));
    if (extra > 0) {
      // Main stage on the warm connection: this is the speed we report.
      const duration = await parallelTransfer(phase, extra, signal, (loaded, elapsed) =>
        onProgress({
          phase,
          fraction: 0.35 + (loaded / extra) * 0.65,
          mbps: mbpsFromTransfer(loaded, Math.max(elapsed, 1)),
        }),
      );
      mbps = mbpsFromTransfer(extra, Math.max(duration, 1));
    }
    onProgress({ phase, fraction: 1, mbps });
    return { bytes: MIN_TRANSFER + extra, mbps };
  };
  const download = await measure('download');
  const upload = await measure('upload');
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    download: download.mbps,
    upload: upload.mbps,
    latency,
    jitter,
    downloadBytes: download.bytes,
    uploadBytes: upload.bytes,
    ...(server ? { server } : {}),
  };
}
