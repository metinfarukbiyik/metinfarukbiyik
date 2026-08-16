import React, { useRef } from 'react';
import { screenshots } from '../../data/geocamData';

const ScreenshotCarousel: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <h2 className="px-4 pb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-label-tertiary">
        Önizleme
      </h2>

      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((shot) => (
          <figure key={shot.src} className="w-[210px] shrink-0 snap-start sm:w-[232px]">
            <img
              src={shot.src}
              alt={shot.alt}
              draggable={false}
              loading="lazy"
              className="aspect-[9/19.5] w-full rounded-[22px] bg-[#1a73e9] object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-black/10 select-none"
            />
            <figcaption className="mt-2 px-0.5 text-center text-[12px] font-medium text-label-secondary">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
