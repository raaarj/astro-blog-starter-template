import { DashboardData, SportKey } from '@/types';
import { fetchNews } from './news';
import { fetchScores } from './scores';
import { readCache, writeCache } from './cache';

export async function getDashboardData(forceFresh = false): Promise<DashboardData> {
  if (!forceFresh) {
    const cached = await readCache();
    if (cached) return cached;
  }

  const [news, games] = await Promise.all([fetchNews(), fetchScores()]);
  const data = { updatedAt: new Date().toISOString(), news, games };
  await writeCache(data);
  return data;
}

export async function getSportData(sport: SportKey) {
  const data = await getDashboardData();
  return {
    updatedAt: data.updatedAt,
    news: data.news.filter((n) => n.sport === sport),
    games: data.games.filter((g) => g.sport === sport),
  };
}
