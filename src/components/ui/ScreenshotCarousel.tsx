import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { screenshots } from '../../data/geocamData';

const INTERVAL = 4500;

const ScreenshotCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setIndex((current) => (current + delta + screenshots.length) % screenshots.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(timer);
  }, [go, paused, index]);

  return (
    <section>
      <h2 className="px-4 pb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-label-tertiary">
        App Store Görselleri
      </h2>

      <div
        className="relative overflow-hidden rounded-[22px] bg-[#1a73e9] shadow-[0_24px_50px_rgba(26,115,233,0.28)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div className="relative mx-auto h-[min(72vh,680px)] w-full">
          {screenshots.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              draggable={false}
              className={`absolute inset-0 h-full w-full object-contain select-none transition-opacity duration-700 ease-out ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          aria-label="Önceki görsel"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40"
          aria-label="Sonraki görsel"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-10">
          <p className="text-center text-[13px] font-medium text-white">{screenshots[index].caption}</p>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {screenshots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setIndex(i)}
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
