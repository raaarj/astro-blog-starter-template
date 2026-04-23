import { ScoreCard } from '@/components/cards';
import { getDashboardData } from '@/lib/data';

export default async function ScoresPage() {
  const data = await getDashboardData();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Scores & Schedule</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.games.map((game) => (
          <ScoreCard key={game.id + game.date} game={game} />
        ))}
      </div>
      {data.games.length === 0 && <p className="card text-slate-500">No score data available.</p>}
    </div>
  );
}
