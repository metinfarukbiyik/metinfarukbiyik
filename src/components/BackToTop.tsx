'use client';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Başa dön"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
