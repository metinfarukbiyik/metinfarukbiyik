import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { screenshots } from '../data/geocamData';

const ScreenshotGallery: React.FC = () => {
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
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">Önizleme</h2>
          <p className="mt-1 text-sm text-gray-600">Ekranlar arasında kaydırarak gezinebilirsiniz.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
            aria-label="Önceki görseller"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
            aria-label="Sonraki görseller"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {screenshots.map((shot) => (
          <figure key={shot.src} className="w-[190px] shrink-0 snap-start sm:w-[220px]">
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              draggable={false}
              className="aspect-[9/19.5] w-full select-none rounded-2xl object-cover ring-1 ring-gray-900/10"
            />
            <figcaption className="mt-2 text-center text-xs font-medium text-gray-600">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotGallery;
