'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import ProjectList from './ProjectList';
import { portfolioProjects } from '@/data/projects';

export default function ProjectExplorer() {
  const [category, setCategory] = useState('Tümü');
  const [query, setQuery] = useState('');
  const filtered = portfolioProjects.filter(
    (p) =>
      (category === 'Tümü' || p.category === category) &&
      `${p.name} ${p.description} ${p.keywords.join(' ')}`
        .toLocaleLowerCase('tr')
        .includes(query.trim().toLocaleLowerCase('tr')),
  );
  return (
    <>
      <div className="explorer-toolbar">
        <div className="filter-tabs" aria-label="Proje kategorisi">
          {['Tümü', 'Uygulama', 'Web sitesi'].map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c === 'Uygulama'
                ? 'Uygulamalar'
                : c === 'Web sitesi'
                  ? 'Web siteleri'
                  : c}
              <span>
                {c === 'Tümü'
                  ? portfolioProjects.length
                  : portfolioProjects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Proje ara</span>
          <input
            type="search"
            placeholder="Proje ara…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="list-panel">
          <ProjectList projects={filtered} />
        </div>
      ) : (
        <div className="empty-state">
          <Search size={26} />
          <h2>Proje bulunamadı</h2>
          <p>Başka bir kelime veya kategori deneyebilirsin.</p>
          <button
            className="pill-button"
            onClick={() => {
              setCategory('Tümü');
              setQuery('');
            }}
          >
            <X size={14} /> Filtreleri temizle
          </button>
        </div>
      )}
      <p className="result-count" aria-live="polite">
        {filtered.length} proje gösteriliyor
      </p>
    </>
  );
}
