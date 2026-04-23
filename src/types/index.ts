export type SportKey =
  | 'football'
  | 'mens-basketball'
  | 'womens-basketball'
  | 'baseball'
  | 'softball'
  | 'other';

export interface NewsArticle {
  id: string;
  sport: SportKey;
  headline: string;
  source: string;
  publishDate: string;
  summary: string;
  link: string;
  image?: string;
}

export interface Game {
  id: string;
  sport: SportKey;
  opponent: string;
  date: string;
  homeAway: 'home' | 'away' | 'neutral';
  status: 'final' | 'live' | 'upcoming';
  score?: {
    oleMiss: number;
    opponent: number;
  };
  league?: string;
}

export interface DashboardData {
  updatedAt: string;
  news: NewsArticle[];
  games: Game[];
}
