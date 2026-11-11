'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { buttonClass } from '@/components/ui';

export type GalleryPhoto = {
  src: StaticImageData;
  alt: string;
  /** Küçük kutudaki kırpma noktası, ör. '50% 30%'. */
  position?: string;
  /** Kutu oranı: yatay '3 / 2', dikey '3 / 4'; 'fill' sütunun tüm boyunu kaplar. */
  ratio?: '3 / 2' | '3 / 4' | 'fill';
};

/**
 * Ana sayfa galerisi: üç sütun; yatay ve dikey kareler sütundan sütuna yer
 * değiştirir. Tıklanan fotoğraf sayfadan ayrılmadan, kırpılmadan ve tam
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
                  className={photo.ratio === 'fill' ? 'gallery-photo gallery-photo-fill' : 'gallery-photo'}
                  key={photo.alt}
                  onClick={() => setActive(index)}
                  aria-label={`Büyüt: ${photo.alt}`}
                  aria-haspopup="dialog"
                  style={photo.ratio && photo.ratio !== 'fill' ? { aspectRatio: photo.ratio } : undefined}
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
        className="image-viewer"
        aria-label="Fotoğraf"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <div className="image-viewer-panel">
          <div className="image-viewer-header">
            <p className="text-small">{selected?.alt}</p>
            <button
              type="button"
              className={buttonClass({ iconOnly: true })}
              aria-label="Fotoğrafı kapat"
              onClick={() => dialogRef.current?.close()}
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="image-viewer-stage">
            {selected && (
              <Image key={selected.alt} src={selected.src} alt={selected.alt} fill sizes="95vw" placeholder="blur" />
            )}
          </div>
          <div className="image-viewer-footer">
            <span className="mono">
              {(active ?? 0) + 1} / {photos.length}
            </span>
            <div className="image-viewer-navigation">
              <button
                type="button"
                className={buttonClass({ iconOnly: true })}
                aria-label="Önceki fotoğraf"
                onClick={() => move(-1)}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={buttonClass({ iconOnly: true })}
                aria-label="Sonraki fotoğraf"
                onClick={() => move(1)}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
