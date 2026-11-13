import type { Metadata } from 'next';
import DocsPage from '../DocsPage';

export const metadata: Metadata = {
  title: { absolute: 'Documentation — draw.biyik.dev' },
  description:
    'How to use draw.biyik.dev: drawing shapes, text, arrow binding, layers, export and adding the board to your own React app. A short tutorial with screenshots.',
  alternates: {
    canonical: 'https://draw.biyik.dev/docs/en',
    languages: { tr: 'https://draw.biyik.dev/docs', en: 'https://draw.biyik.dev/docs/en' },
  },
};

export default function Page() {
  return <DocsPage lang="en" />;
}
