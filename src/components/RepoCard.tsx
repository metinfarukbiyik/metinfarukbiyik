import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export interface RepoTopic {
  label: string;
  color: string;
}

interface RepoCardProps {
  href: string;
  name: string;
  description: string;
  topics: RepoTopic[];
  icon?: ReactNode;
  external?: boolean;
}

const TopicList = ({ topics }: { topics: RepoTopic[] }) => (
  <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
    {topics.map((topic) => (
      <li key={topic.label} className="inline-flex items-center gap-1.5 text-xs text-muted">
        <span className={`h-3 w-3 rounded-full ${topic.color}`} aria-hidden />
        {topic.label}
      </li>
    ))}
  </ul>
);

const RepoCard = ({ href, name, description, topics, icon, external }: RepoCardProps) => {
  const className =
    'group flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition-colors hover:bg-hover';

  const body = (
    <>
      <div className="flex items-start gap-3">
        {icon}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-link group-hover:underline">{name}</h3>
            {external && <ArrowUpRight size={14} className="shrink-0 text-subtle" aria-hidden />}
          </div>
          <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
        </div>
      </div>
      <TopicList topics={topics} />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
};

export default RepoCard;
