'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download, ImagePlus, LockKeyhole, MapPin, ShieldCheck, Upload } from 'lucide-react';
import {
  cleanFileName,
  cleanImage,
  mapLink,
  metaGroups,
  readMetadata,
  type MetaGroup,
  type PhotoMetadata,
} from '@/lib/exif';
import { saveBlob } from '@/lib/svg-export';

const MAX_SIZE = 50 * 1024 * 1024;
const mime = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' } as const;
const kb = (bytes: number) => (bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

type Loaded = { name: string; bytes: Uint8Array; meta: PhotoMetadata; url: string };
type Cleaned = { bytes: Uint8Array; meta: PhotoMetadata };

export default function ExifCleanerTool() {
  const [photo, setPhoto] = useState<Loaded | null>(null);
  const [remove, setRemove] = useState<Set<MetaGroup>>(new Set(metaGroups.map((group) => group.value)));
  const [cleaned, setCleaned] = useState<Cleaned | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo.url);
    },
    [photo],
  );

  async function load(file: File | undefined) {
    if (!file) return;
    setError('');
    setStatus('');
    setCleaned(null);
    if (/\.(heic|heif)$/i.test(file.name) || /hei[cf]/.test(file.type))
      return setError(
        'HEIC biçimi tarayıcıda açılamıyor. iPhone’da fotoğrafı paylaşırken JPEG’e dönüşür; ya da Ayarlar → Kamera → Biçimler → “En Uyumlu” seçeneğini kullan.',
      );
    if (file.size > MAX_SIZE) return setError('Fotoğraf en fazla 50 MB olabilir.');
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const meta = readMetadata(bytes);
      setPhoto({ name: file.name, bytes, meta, url: URL.createObjectURL(file) });
    } catch (cause) {
      setPhoto(null);
      setError(cause instanceof Error ? cause.message : 'Fotoğraf okunamadı.');
    }
  }

  function toggle(group: MetaGroup) {
    setCleaned(null);
    setRemove((current) => {
      const next = new Set(current);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  function clean() {
    if (!photo) return;
    setError('');
    try {
      const bytes = cleanImage(photo.bytes, remove);
      const meta = readMetadata(bytes);
      setCleaned({ bytes, meta });
      saveBlob(new Blob([bytes as BlobPart], { type: mime[meta.kind] }), cleanFileName(photo.name, meta.kind));
      setStatus('Temiz kopya indirildi. Fotoğrafın kendisi yeniden sıkıştırılmadı; kalite aynı.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Temiz kopya hazırlanamadı.');
    }
  }

  const meta = photo?.meta;
  const total = meta ? Object.values(meta.counts).reduce((sum, count) => sum + count, 0) : 0;
  const remaining = cleaned ? Object.values(cleaned.meta.counts).reduce((sum, count) => sum + count, 0) : 0;

  return (
    <>
      <p className="photo-privacy">
        <LockKeyhole aria-hidden="true" /> Fotoğrafın cihazında kalır; okuma ve temizleme tarayıcında yapılır.
      </p>
      <div className="photo-workspace">
        <section className="photo-controls" aria-label="Fotoğraf ve silinecek bilgiler">
          <div className="photo-step-title">
            <span>1</span>
            <h2>Fotoğrafını seç</h2>
          </div>
          <input
            ref={input}
            className="photo-file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,.heic,.heif"
            onChange={(event) => {
              void load(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
          <button
            type="button"
            className={`photo-upload ${dragOver ? 'is-dragging' : ''}`}
            onClick={() => input.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              void load(event.dataTransfer.files[0]);
            }}
          >
            {photo ? <ImagePlus size={22} aria-hidden="true" /> : <Upload size={22} aria-hidden="true" />}
            <strong>{photo ? 'Başka fotoğraf seç' : 'Fotoğraf yükle veya sürükle'}</strong>
            <span>JPG, PNG, WebP · En fazla 50 MB</span>
          </button>
          {photo && (
            <p className="photo-filename" title={photo.name}>
              {photo.name} · {kb(photo.bytes.length)}
            </p>
          )}

          <div className="photo-step-title">
            <span>2</span>
            <h2>Neleri silelim?</h2>
          </div>
          <fieldset className="photo-field exif-groups">
            <legend>Silinecek bilgiler</legend>
            {metaGroups.map((group) => (
              <label key={group.value} className="exif-group-option">
                <input type="checkbox" checked={remove.has(group.value)} onChange={() => toggle(group.value)} />
                <span>
                  <strong>
                    {group.label}
                    {meta && <small className="mono">{meta.counts[group.value]} bilgi</small>}
                  </strong>
                  <em>{group.hint}</em>
                </span>
              </label>
            ))}
          </fieldset>
          <p className="exif-note">
            XMP, IPTC, yorumlar ve gömülü küçük önizleme her zaman silinir. Fotoğrafın doğru yönde görünmesi için yön
            bilgisi korunur.
          </p>

          <button type="button" className="btn btn-accent btn-lg btn-block" disabled={!photo} onClick={clean}>
            <Download aria-hidden="true" /> Temiz kopyayı indir
          </button>
          {error && (
            <p className="photo-error" role="alert">
              {error}
            </p>
          )}
          <p className="photo-status" role="status">
            {status}
          </p>
        </section>

        <section className="photo-preview exif-preview" aria-labelledby="exif-preview-title">
          <div className="photo-preview-heading">
            <h2 id="exif-preview-title">Fotoğrafta neler var?</h2>
            <span>{meta ? `${meta.kind.toUpperCase()} · ${total} bilgi` : 'önizleme'}</span>
          </div>
          {photo && meta ? (
            <>
              <div className="exif-photo">
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
                <img src={photo.url} alt="Seçilen fotoğraf" />
              </div>
              {total === 0 && meta.extras.length === 0 ? (
                <p className="exif-clean-badge">
                  <ShieldCheck aria-hidden="true" /> Bu fotoğrafta EXIF veya ek meta veri bulunamadı.
                </p>
              ) : (
                <div className="exif-report">
                  {metaGroups.map((group) => {
                    const fields = meta.fields.filter((field) => field.group === group.value);
                    const count = meta.counts[group.value];
                    if (!count) return null;
                    return (
                      <section key={group.value} className="exif-report-group" data-remove={remove.has(group.value) || undefined}>
                        <h3>
                          {group.label}
                          <span className="mono">
                            {count} bilgi · {remove.has(group.value) ? 'silinecek' : 'kalacak'}
                          </span>
                        </h3>
                        {fields.length > 0 && (
                          <dl>
                            {fields.map((field) => (
                              <div key={field.label}>
                                <dt>{field.label}</dt>
                                <dd className="mono">{field.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {group.value === 'location' && meta.gps && (
                          <a className="exif-map" href={mapLink(meta.gps)} target="_blank" rel="noopener noreferrer">
                            <MapPin aria-hidden="true" /> Konumu haritada gör
                            <ArrowUpRight aria-hidden="true" />
                          </a>
                        )}
                      </section>
                    );
                  })}
                  {meta.extras.length > 0 && (
                    <section className="exif-report-group" data-remove>
                      <h3>
                        Ek meta veri <span className="mono">her zaman silinir</span>
                      </h3>
                      <p>{meta.extras.join(' · ')}</p>
                    </section>
                  )}
                </div>
              )}
              {cleaned && (
                <p className="exif-result" role="status">
                  <ShieldCheck aria-hidden="true" />
                  <span>
                    Temiz kopya: {kb(photo.bytes.length)} → {kb(cleaned.bytes.length)}.{' '}
                    {remaining
                      ? `Kalan: ${metaGroups
                          .filter((group) => cleaned.meta.counts[group.value])
                          .map((group) => `${group.label.toLocaleLowerCase('tr')} (${cleaned.meta.counts[group.value]})`)
                          .join(', ')}.`
                      : 'Kopyada EXIF bilgisi kalmadı.'}
                  </span>
                </p>
              )}
            </>
          ) : (
            <div className="exif-empty">
              <MapPin aria-hidden="true" />
              <p>
                Telefonla çekilen fotoğraflar çoğu zaman çekildiği yerin koordinatlarını, tarihini ve cihaz modelini
                taşır. Fotoğrafını seçtiğinde burada görürsün.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
