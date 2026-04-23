import Image from 'next/image';
import Link from 'next/link';
import { Game, NewsArticle } from '@/types';
import { SPORT_LABELS } from '@/lib/constants';

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="card">
      {article.image && (
        <Image src={article.image} alt={article.headline} width={600} height={300} className="mb-3 h-40 w-full rounded-lg object-cover" />
      )}
      <p className="text-xs font-semibold text-[var(--ole-red)]">{SPORT_LABELS[article.sport]}</p>
      <h3 className="text-lg font-semibold">{article.headline}</h3>
      <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
      <p className="mt-2 text-xs text-slate-500">
        {article.source} • {new Date(article.publishDate).toLocaleString()}
      </p>
      <Link href={article.link} className="mt-3 inline-block text-sm font-semibold text-[var(--ole-blue)]" target="_blank">
        Read original →
      </Link>
    </article>
  );
}

export function ScoreCard({ game }: { game: Game }) {
  return (
    <article className={`card ${game.status === 'live' ? 'border-red-500' : ''}`}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-[var(--ole-red)]">{SPORT_LABELS[game.sport]}</p>
        <span className={`rounded-full px-2 py-0.5 text-xs ${game.status === 'live' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
          {game.status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-lg font-semibold">vs {game.opponent}</h3>
      <p className="text-sm text-slate-600">{new Date(game.date).toLocaleString()} • {game.homeAway}</p>
      {game.score && (
        <p className="mt-2 text-sm font-semibold">
          Ole Miss {game.score.oleMiss} - {game.score.opponent} {game.opponent}
        </p>
      )}
    </article>
  );
}
