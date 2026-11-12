'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type GalleryPhoto = {
  src: StaticImageData;
  alt: string;
  /** Çerçeve: yatay 3/2, dikey 3/4 ya da sütunun tamamı (1/2). */
  shape: 'wide' | 'portrait' | 'tall';
  /** Kırpmada odak noktası (object-position), ör. 'center 30%'. */
  focus?: string;
};

/**
 * Ana sayfa galerisi: eşit genişlikte sütunlar, her sütunda yatay (3/2) ve
 * dikey (3/4) çerçeveler sırayla değişir; tek fotoğraflı sütunda fotoğraf
 * sütunun tamamını kaplar. Sütun yükseklikleri böylece eşit kalır.
 * Tıklanan fotoğraf sayfadan ayrılmadan kırpılmamış hâliyle açılır.
 */
export default function HomeGallery({ columns }: { columns: GalleryPhoto[][] }) {
  const photos = columns.flat();
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;
  const selected = active !== null ? photos[active] : null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const bodyOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  const move = (direction: number) =>
    setActive((current) => (current === null ? null : (current + direction + photos.length) % photos.length));

  return (
    <>
      <div className="gallery">
        {columns.map((column, columnIndex) => (
          <div className="gallery-column" key={columnIndex}>
            {column.map((photo) => {
              const index = photos.indexOf(photo);
              return (
                <button
                  type="button"
                  className="gallery-photo"
                  key={photo.alt}
                  onClick={() => setActive(index)}
                  aria-label={`Büyüt: ${photo.alt}`}
                  aria-haspopup="dialog"
                  data-shape={photo.shape}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 46vw, 220px"
                    style={photo.focus ? { objectPosition: photo.focus } : undefined}
                    placeholder="blur"
                    priority={index < 3}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="photo-viewer"
        aria-label={selected?.alt ?? 'Fotoğraf'}
        onClose={() => setActive(null)}
        onClick={(event) => {
          // Fotoğrafın ve düğmelerin dışına (bulanık zemine) tıklamak kapatır.
          if (!(event.target as HTMLElement).closest('img, button')) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {selected && (
          <figure className="photo-viewer-figure">
            <Image
              key={selected.alt}
              src={selected.src}
              alt={selected.alt}
              sizes="95vw"
              placeholder="blur"
              className="photo-viewer-image"
            />
            <figcaption>
              <span className="mono">
                {(active ?? 0) + 1} / {photos.length}
              </span>
              {selected.alt}
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          className="photo-viewer-button photo-viewer-close"
          aria-label="Fotoğrafı kapat"
          onClick={() => dialogRef.current?.close()}
          autoFocus
        >
          <X aria-hidden="true" />
        </button>
        <button
          type="button"
          className="photo-viewer-button photo-viewer-prev"
          aria-label="Önceki fotoğraf"
          onClick={() => move(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="photo-viewer-button photo-viewer-next"
          aria-label="Sonraki fotoğraf"
          onClick={() => move(1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}
