import Parser from 'rss-parser';
import { NEWS_FEEDS } from './constants';
import { dedupeNews, inferSport } from './normalize';
import { safeFetch } from './errors';
import { NewsArticle } from '@/types';

const parser = new Parser();

function summarize(text: string): string {
  const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.length > 180 ? `${clean.slice(0, 177)}...` : clean;
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const buckets = await Promise.all(
    NEWS_FEEDS.map((feed) =>
      safeFetch(`news:${feed}`, async () => {
        const data = await parser.parseURL(feed);
        return (data.items ?? []).map((item, idx) => {
          const title = item.title ?? 'Untitled';
          const rawSummary = item.contentSnippet ?? item.content ?? '';
          return {
            id: `${feed}-${idx}-${item.guid ?? title}`,
            sport: inferSport(`${title} ${rawSummary}`),
            headline: title,
            source: data.title ?? new URL(feed).hostname,
            publishDate: item.isoDate ?? new Date().toISOString(),
            summary: summarize(rawSummary),
            link: item.link ?? '#',
            image: (item.enclosure as { url?: string } | undefined)?.url,
          } satisfies NewsArticle;
        });
      }, [] as NewsArticle[]),
    ),
  );

  return dedupeNews(buckets.flat())
    .filter((item) => item.link !== '#')
    .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));
}
