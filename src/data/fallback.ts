import { DashboardData } from '@/types';

export const fallbackDashboardData: DashboardData = {
  updatedAt: new Date('2026-04-23T00:00:00.000Z').toISOString(),
  news: [
    {
      id: 'fallback-news-1',
      sport: 'football',
      headline: 'Spring football updates from Oxford',
      source: 'Ole Miss Sports Hub Fallback',
      publishDate: new Date('2026-04-22T18:00:00.000Z').toISOString(),
      summary: 'Fallback story shown when live sources are unavailable. Configure network/API access for fresh headlines.',
      link: 'https://olemisssports.com/',
    },
    {
      id: 'fallback-news-2',
      sport: 'baseball',
      headline: 'Baseball weekend preview',
      source: 'Ole Miss Sports Hub Fallback',
      publishDate: new Date('2026-04-21T15:00:00.000Z').toISOString(),
      summary: 'Fallback content ensures the UI remains populated even when feed requests fail.',
      link: 'https://olemisssports.com/',
    },
  ],
  games: [
    {
      id: 'fallback-game-1',
      sport: 'football',
      opponent: 'TBD',
      date: new Date('2026-09-01T23:00:00.000Z').toISOString(),
      homeAway: 'home',
      status: 'upcoming',
    },
    {
      id: 'fallback-game-2',
      sport: 'baseball',
      opponent: 'TBD',
      date: new Date('2026-04-25T00:30:00.000Z').toISOString(),
      homeAway: 'away',
      status: 'upcoming',
    },
  ],
};
