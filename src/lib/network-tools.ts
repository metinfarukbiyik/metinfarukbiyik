export const SPEED_HISTORY_KEY = 'biyik-dev:speed-results:v1';
export const MIN_TRANSFER = 5_000_000;
export const MAX_TRANSFER = 50_000_000;
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
};
export type SpeedProgress = {
  phase: SpeedPhase;
  fraction: number;
  mbps?: number;
  latency?: number;
  jitter?: number;
};
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
          ),
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

export async function runSpeedTest(
  signal: AbortSignal,
  onProgress: (progress: SpeedProgress) => void,
): Promise<SpeedResult> {
  const samples: number[] = [];
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
  const latency = median(samples);
  const jitter =
    samples
      .slice(1)
      .reduce((total, sample, i) => total + Math.abs(sample - samples[i]), 0) /
    (samples.length - 1);
  onProgress({ phase: 'latency', fraction: 1, latency, jitter });
  const measure = async (phase: 'download' | 'upload') => {
    onProgress({ phase, fraction: 0 });
    const firstDuration = await transfer(
      phase,
      MIN_TRANSFER,
      signal,
      (loaded, duration) =>
        onProgress({
          phase,
          fraction: (loaded / MIN_TRANSFER) * 0.35,
          mbps: mbpsFromTransfer(loaded, Math.max(duration, 1)),
        }),
    );
    const extra = additionalTransfer(MIN_TRANSFER, firstDuration);
    let totalDuration = firstDuration;
    if (extra > 0)
      totalDuration += await transfer(
        phase,
        extra,
        signal,
        (loaded, duration) =>
          onProgress({
            phase,
            fraction: 0.35 + (loaded / extra) * 0.65,
            mbps: mbpsFromTransfer(
              MIN_TRANSFER + loaded,
              Math.max(firstDuration + duration, 1),
            ),
          }),
      );
    const bytes = MIN_TRANSFER + extra;
    const mbps = mbpsFromTransfer(bytes, Math.max(totalDuration, 1));
    onProgress({ phase, fraction: 1, mbps });
    return { bytes, mbps };
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
  };
}
