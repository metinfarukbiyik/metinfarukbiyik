'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { screenshots } from '@/data/geocamData';

const ScreenshotGallery = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-mono text-xs tracking-wide text-muted">Önizleme</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted hover:bg-hover hover:text-fg"
            aria-label="Önceki görseller"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted hover:bg-hover hover:text-fg"
            aria-label="Sonraki görseller"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1"
      >
        {screenshots.map((shot) => (
          <figure key={shot.src} className="w-[190px] shrink-0 snap-start sm:w-[220px]">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-2xl">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="220px"
                className="select-none object-cover"
                draggable={false}
              />
            </div>
            <figcaption className="mt-2 text-center font-mono text-[11px] text-subtle">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotGallery;
