import { SportKey } from '@/types';

export const SPORT_LABELS: Record<SportKey, string> = {
  football: 'Football',
  'mens-basketball': "Men's Basketball",
  'womens-basketball': "Women's Basketball",
  baseball: 'Baseball',
  softball: 'Softball',
  other: 'Other Sports',
};

export const SPORT_ENDPOINTS: Array<{
  key: Exclude<SportKey, 'other'>;
  path: string;
}> = [
  { key: 'football', path: 'football/college-football' },
  { key: 'mens-basketball', path: 'basketball/mens-college-basketball' },
  { key: 'womens-basketball', path: 'basketball/womens-college-basketball' },
  { key: 'baseball', path: 'baseball/college-baseball' },
  { key: 'softball', path: 'softball/college-softball' },
];

export const NEWS_FEEDS = [
  'https://news.google.com/rss/search?q=Ole+Miss+sports&hl=en-US&gl=US&ceid=US:en',
  'https://olemisssports.com/sports/football/rss',
  'https://olemisssports.com/sports/mens-basketball/rss',
  'https://olemisssports.com/sports/womens-basketball/rss',
  'https://olemisssports.com/sports/baseball/rss',
  'https://olemisssports.com/sports/softball/rss',
];

export const CACHE_TTL_MS = 1000 * 60 * 10;
export const OLE_MISS_TEAM_ID = '145';
