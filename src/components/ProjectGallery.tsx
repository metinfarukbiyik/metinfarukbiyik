'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ProjectImage } from '@/data/projectPresentation';

export default function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const captionId = useId();
  const isOpen = active !== null;
  const selected = active !== null ? images[active] : null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function move(direction: number) {
    setActive((current) => current === null ? null : (current + direction + images.length) % images.length);
  }

  return (
    <>
      <div className="project-gallery">
        {images.map((image, index) => (
          <figure key={image.src} className="project-preview">
            <button type="button" className="project-preview-image" onClick={() => setActive(index)} aria-label={`${image.caption} görselini büyüt`} aria-haspopup="dialog">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 85vw, 400px" className="object-contain p-3" />
            </button>
            <figcaption>
              <span>{image.caption}</span>
              <button type="button" className="pill-button" onClick={() => setActive(index)} aria-label={`${image.caption} görselini büyüt`} aria-haspopup="dialog">
                <Expand size={13} aria-hidden="true" /> Büyüt
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="image-viewer"
        aria-labelledby={titleId}
        aria-describedby={captionId}
        onClose={() => setActive(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
        onKeyDown={(event) => {
          if (images.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <div className="image-viewer-panel">
          <div className="image-viewer-header">
            <h2 id={titleId}>Proje görselleri</h2>
            <button type="button" className="viewer-control" aria-label="Görseli kapat" onClick={() => dialogRef.current?.close()} autoFocus>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="image-viewer-stage">
            {selected && <Image key={selected.src} src={selected.src} alt={selected.alt} fill sizes="95vw" className="object-contain" />}
          </div>
          <div className="image-viewer-footer">
            <p id={captionId} aria-live="polite">{selected?.caption}</p>
            {images.length > 1 && (
              <div className="image-viewer-navigation">
                <button type="button" className="viewer-control" aria-label="Önceki görsel" onClick={() => move(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
                <span>{(active ?? 0) + 1} / {images.length}</span>
                <button type="button" className="viewer-control" aria-label="Sonraki görsel" onClick={() => move(1)}><ChevronRight size={20} aria-hidden="true" /></button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
