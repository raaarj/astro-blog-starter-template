import { describe, expect, it } from 'vitest';
import { dedupeGames, dedupeNews, inferSport } from '@/lib/normalize';

describe('inferSport', () => {
  it('matches core sports', () => {
    expect(inferSport('Ole Miss Football defeats LSU')).toBe('football');
    expect(inferSport("Ole Miss Women's Basketball preview")).toBe('womens-basketball');
  });
});

describe('dedupeNews', () => {
  it('drops duplicate headlines from same source', () => {
    const result = dedupeNews([
      {
        id: '1',
        sport: 'football',
        headline: 'Big Win',
        source: 'ESPN',
        publishDate: new Date().toISOString(),
        summary: 'a',
        link: 'https://a',
      },
      {
        id: '2',
        sport: 'football',
        headline: 'Big Win!',
        source: 'ESPN',
        publishDate: new Date().toISOString(),
        summary: 'b',
        link: 'https://b',
      },
    ]);

    expect(result).toHaveLength(1);
  });
});

describe('dedupeGames', () => {
  it('prefers non-upcoming status when duplicate exists', () => {
    const games = dedupeGames([
      {
        id: '1',
        sport: 'football',
        opponent: 'LSU',
        date: '2026-01-01T00:00:00Z',
        homeAway: 'home',
        status: 'upcoming',
      },
      {
        id: '1',
        sport: 'football',
        opponent: 'LSU',
        date: '2026-01-01T00:00:00Z',
        homeAway: 'home',
        status: 'final',
        score: { oleMiss: 24, opponent: 14 },
      },
    ]);

    expect(games[0].status).toBe('final');
  });
});
