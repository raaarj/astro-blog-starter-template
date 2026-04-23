# Ole Miss Sports Hub

Production-ready Next.js dashboard for Ole Miss fans with fresh-ish news + scores in one place.

## Architecture

- **Framework**: Next.js App Router + TypeScript + Tailwind CSS
- **Data flow**:
  1. Fetch RSS news from public feeds.
  2. Fetch Ole Miss schedules/scores from ESPN public endpoints.
  3. Normalize into shared `NewsArticle` and `Game` schemas.
  4. Deduplicate and cache for 10 minutes in `.cache/dashboard.json`.
  5. If every upstream source fails, serve safe fallback content.
- **Resilience strategy**:
  - Source-level fetches are wrapped in `safeFetch`.
  - Failures are isolated per source.
  - UI always shows loading, empty, and error states.

## Pages

- `/` Dashboard (news + scores + sport tabs + last-updated)
- `/sport/[sport]` Sport-specific view
- `/news` All articles with sport filters and search
- `/scores` All recent/upcoming games
- `/about` Source and update-frequency details

## Data sources

### News
- Google News RSS for `Ole Miss sports`
- OleMissSports.com RSS sport feeds

### Scores/Schedule
- ESPN public schedule endpoints for Ole Miss team id `145`
  - `football/college-football`
  - `basketball/mens-college-basketball`
  - `basketball/womens-college-basketball`
  - `baseball/college-baseball`
  - `softball/college-softball`

## Environment variables

Create `.env.local` only if you later add premium APIs:

```bash
NEWS_API_KEY=
SPORTS_API_KEY=
```

Current implementation works with public feeds/endpoints and does not require keys.

## Install + run

```bash
npm install
npm run dev
```

Build and run production locally:

```bash
npm run build
npm run start
```

Run tests:

```bash
npm run test
```

## Troubleshooting

If pages appear empty:
- Confirm internet access to `news.google.com`, `olemisssports.com`, and `site.api.espn.com`.
- Delete stale cache and restart:

```bash
rm -f .cache/dashboard.json
npm run dev
```

If all external sources are unreachable, the app displays built-in fallback content so the site still works.

## Extending data sources

- Update feed list in `src/lib/constants.ts` (`NEWS_FEEDS`)
- Add score mappings in `SPORT_ENDPOINTS`
- Keep normalization rules in `src/lib/normalize.ts`
- Reuse `safeFetch` in `src/lib/errors.ts`
