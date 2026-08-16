import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { screenshots } from '../../data/geocamData';

const INTERVAL = 5000;

const ScreenshotCarousel: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback((next: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = (next + screenshots.length) % screenshots.length;
    el.scrollTo({
      left: target * el.clientWidth,
      behavior: smooth ? 'smooth' : 'auto',
    });
    setIndex(target);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const next = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(Math.min(screenshots.length - 1, Math.max(0, next)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      scrollTo((current + 1) % screenshots.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, scrollTo]);

  return (
    <section>
      <h2 className="px-4 pb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-label-tertiary">
        App Store Görselleri
      </h2>

      <div
        className="relative overflow-hidden rounded-[22px] shadow-[0_24px_50px_rgba(26,115,233,0.28)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div
          ref={scrollerRef}
          className="flex h-[min(72vh,680px)] snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="relative h-full w-full shrink-0 snap-center bg-[#1a73e9]"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                draggable={false}
                className="h-full w-full object-contain select-none"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo(index - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          aria-label="Önceki görsel"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => scrollTo(index + 1)}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          aria-label="Sonraki görsel"
        >
          <ChevronRight size={22} />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-10">
          <p className="text-center text-[13px] font-medium text-white">{screenshots[index].caption}</p>
          <div className="pointer-events-auto mt-3 flex items-center justify-center gap-1.5">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
                }`}
                aria-label={shot.caption}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
