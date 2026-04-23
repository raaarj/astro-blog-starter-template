import { Game, NewsArticle, SportKey } from '@/types';

const sportMatchers: Array<{ sport: SportKey; patterns: RegExp[] }> = [
  { sport: 'womens-basketball', patterns: [/women'?s basketball/i, /lady rebels/i] },
  { sport: 'mens-basketball', patterns: [/men'?s basketball/i, /rebels basketball/i] },
  { sport: 'football', patterns: [/football/i] },
  { sport: 'baseball', patterns: [/baseball/i] },
  { sport: 'softball', patterns: [/softball/i] },
];

export function inferSport(input: string): SportKey {
  return sportMatchers.find((m) => m.patterns.some((pattern) => pattern.test(input)))?.sport ?? 'other';
}

export function dedupeNews(news: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  return news.filter((article) => {
    const key = `${article.headline.toLowerCase().replace(/[^a-z0-9]/g, '')}-${article.source.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function dedupeGames(games: Game[]): Game[] {
  const map = new Map<string, Game>();
  for (const game of games) {
    const key = `${game.sport}-${game.opponent}-${game.date}`;
    const existing = map.get(key);
    if (!existing || existing.status === 'upcoming') {
      map.set(key, game);
    }
  }
  return [...map.values()];
}
