'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button, Segmented } from '@/components/ui';
import { portfolioProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

type Category = 'Tümü' | 'Uygulama' | 'Web sitesi';

const options: { value: Category; label: string; count: number }[] = [
  { value: 'Tümü', label: 'Tümü', count: portfolioProjects.length },
  {
    value: 'Uygulama',
    label: 'Uygulamalar',
    count: portfolioProjects.filter((p) => p.category === 'Uygulama').length,
  },
  {
    value: 'Web sitesi',
    label: 'Web & kurumsal',
    count: portfolioProjects.filter((p) => p.category === 'Web sitesi').length,
  },
];

export default function ProjectExplorer() {
  const [category, setCategory] = useState<Category>('Tümü');
  const [query, setQuery] = useState('');
  const needle = query.trim().toLocaleLowerCase('tr');
  const filtered = portfolioProjects.filter(
    (p) =>
      (category === 'Tümü' || p.category === category) &&
      `${p.name} ${p.description} ${p.platform} ${p.keywords.join(' ')}`
        .toLocaleLowerCase('tr')
        .includes(needle),
  );

  return (
    <>
      <div className="toolbar">
        <Segmented label="Proje kategorisi" options={options} value={category} onChange={setCategory} />
        <label className="field toolbar-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Proje ara</span>
          <input
            type="search"
            placeholder="Proje, platform veya konu ara…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="ref-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Search aria-hidden="true" />
          <h2 className="title-3">Eşleşen proje yok</h2>
          <p className="text-small">Başka bir kelime veya kategori deneyebilirsin.</p>
          <Button
            size="sm"
            icon={<X aria-hidden="true" />}
            onClick={() => {
              setCategory('Tümü');
              setQuery('');
            }}
          >
            Filtreleri temizle
          </Button>
        </div>
      )}
      <p className="text-meta result-count" aria-live="polite">
        {filtered.length} / {portfolioProjects.length} proje gösteriliyor
      </p>
    </>
  );
}
