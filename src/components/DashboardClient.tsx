'use client';

import { useMemo, useState } from 'react';
import { DashboardData, SportKey } from '@/types';
import { NewsCard, ScoreCard } from './cards';
import { SportTabs } from './SportTabs';

export function DashboardClient({ data }: { data: DashboardData }) {
  const [sport, setSport] = useState<SportKey | 'all'>('all');

  const news = useMemo(
    () => data.news.filter((item) => sport === 'all' || item.sport === sport).slice(0, 8),
    [data.news, sport],
  );

  const games = useMemo(
    () => data.games.filter((item) => sport === 'all' || item.sport === sport).slice(0, 10),
    [data.games, sport],
  );

  return (
    <>
      <SportTabs active={sport} onChange={setSport} />
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold">Latest News</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        {news.length === 0 && <p className="card text-slate-500">No news available for this sport.</p>}
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">Scores & Upcoming Games</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <ScoreCard key={game.id + game.date} game={game} />
          ))}
        </div>
        {games.length === 0 && <p className="card text-slate-500">No games found.</p>}
      </section>
    </>
  );
}
