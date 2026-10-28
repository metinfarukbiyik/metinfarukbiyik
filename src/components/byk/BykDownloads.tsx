'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Download } from 'lucide-react';
import { byk, downloads, type Platform } from '@/data/bykData';

const subscribe = () => () => {};

const detectPlatform = (): Platform | null => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return null;
  if (/Windows/i.test(ua)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'macos';
  return null;
};

const useLatestVersion = () => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(byk.latestReleaseApi, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { tag_name?: string } | null) => {
        if (data?.tag_name) setVersion(data.tag_name);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return version;
};

const BykDownloads = () => {
  const detected = useSyncExternalStore(subscribe, detectPlatform, () => null);
  const version = useLatestVersion();
  const primary: Platform = detected ?? 'windows';
  const ordered = [
    ...downloads.filter((item) => item.platform === primary),
    ...downloads.filter((item) => item.platform !== primary),
  ];

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {ordered.map((item) => {
          const isPrimary = item.platform === primary;
          return (
            <a
              key={item.platform}
              href={item.url}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm ${
                isPrimary
                  ? 'bg-fg text-canvas hover:opacity-90'
                  : 'border border-border bg-surface text-fg hover:bg-hover'
              }`}
            >
              <Download size={15} aria-hidden />
              {item.label}
            </a>
          );
        })}
      </div>
      <p className="mt-2 font-mono text-[11px] text-subtle sm:text-right">
        {version ? `Sürüm ${version}` : 'En son sürüm'}
        {detected && ` · ${detected === 'windows' ? 'Windows' : 'macOS'} algılandı`}
      </p>
    </div>
  );
};

export default BykDownloads;
