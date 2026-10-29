import { ArrowUpRight, Download, Github } from 'lucide-react';

export interface ProductDownload {
  label: string;
  url: string;
  external?: boolean;
}
export default function ProductDownloads({
  downloads,
  note,
  repository,
}: {
  downloads: ProductDownload[];
  note: string;
  repository?: string;
}) {
  return (
    <>
      <div className="download-actions">
        {downloads.map((item, index) => (
          <a
            key={item.url}
            href={item.url}
            className={`pill-button${index === 0 ? ' primary-button' : ''}`}
            {...(item.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <Download size={16} /> {item.label}
          </a>
        ))}
        {repository && (
          <a
            href={repository}
            target="_blank"
            rel="noopener noreferrer"
            className="text-button"
          >
            <Github size={15} /> GitHub <ArrowUpRight size={13} />
          </a>
        )}
      </div>
      <p className="download-note">{note}</p>
    </>
  );
}
