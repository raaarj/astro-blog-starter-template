import { notFound } from 'next/navigation';
import { NewsCard, ScoreCard } from '@/components/cards';
import { SPORT_LABELS } from '@/lib/constants';
import { getSportData } from '@/lib/data';
import { SportKey } from '@/types';

const validSports: SportKey[] = ['football', 'mens-basketball', 'womens-basketball', 'baseball', 'softball', 'other'];

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  if (!validSports.includes(sport as SportKey)) return notFound();

  const data = await getSportData(sport as SportKey);
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">{SPORT_LABELS[sport as SportKey]}</h1>
      <p className="mb-4 text-sm text-slate-600">Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      <h2 className="mb-2 text-xl font-semibold">News</h2>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {data.news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      <h2 className="mb-2 text-xl font-semibold">Games</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.games.map((game) => (
          <ScoreCard key={game.id + game.date} game={game} />
        ))}
      </div>
    </div>
  );
}
