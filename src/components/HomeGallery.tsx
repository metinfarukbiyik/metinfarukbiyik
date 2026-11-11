'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type GalleryPhoto = {
  src: StaticImageData;
  alt: string;
  /** Küçük kutudaki kırpma noktası, ör. '50% 30%'. */
  position?: string;
};

/**
 * Ana sayfa galerisi: üç sütun. Her fotoğraf kendi oranında durur, sabit bir
 * kareye kırpılmaz; sütunlar aynı hizada bitsin diye kısa sütundaki kutular
 * yalnızca birkaç piksel uzar. Tıklanan fotoğraf sayfadan ayrılmadan, kırpılmadan ve tam
 * boyutunda bir pencerede açılır.
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
                  style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 30vw, 245px"
                    placeholder="blur"
                    priority={index < 3}
                    style={photo.position ? { objectPosition: photo.position } : undefined}
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
