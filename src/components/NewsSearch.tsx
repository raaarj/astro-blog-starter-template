'use client';

import { useMemo, useState } from 'react';
import { NewsArticle, SportKey } from '@/types';
import { NewsCard } from './cards';
import { SportTabs } from './SportTabs';

export function NewsSearch({ articles }: { articles: NewsArticle[] }) {
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState<SportKey | 'all'>('all');

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const bySport = sport === 'all' || a.sport === sport;
      const byQuery = `${a.headline} ${a.summary}`.toLowerCase().includes(query.toLowerCase());
      return bySport && byQuery;
    });
  }, [articles, query, sport]);

  return (
    <section>
      <SportTabs active={sport} onChange={setSport} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles"
        className="mb-4 w-full rounded-lg border border-slate-300 p-2"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      {filtered.length === 0 && <p className="card text-sm text-slate-500">No articles found.</p>}
    </section>
  );
}
