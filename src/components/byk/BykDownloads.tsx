'use client';
import { useEffect, useState } from 'react';
import { byk, downloads } from '@/data/bykData';
import ProductDownloads from '@/components/ProductDownloads';

export default function BykDownloads() {
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
  return (
    <ProductDownloads
      downloads={downloads.map((item) => ({
        label: `${item.label} için indir`,
        url: item.url,
      }))}
      note={`Windows 10 / 11 · macOS 12+ · TSPL yazıcılar${version ? ` · Sürüm ${version}` : ''}`}
      repository="https://github.com/metinfarukbiyik/bykseripro"
    />
  );
}
