# Ole Miss Sports Hub

Production-ready Next.js dashboard for Ole Miss fans with live-ish news + score aggregation.

## Architecture

- **Framework**: Next.js App Router + TypeScript + Tailwind CSS
- **Data flow**:
  1. Fetch latest RSS news from multiple public feeds
  2. Fetch Ole Miss team schedules/scores from ESPN public endpoints
  3. Normalize into shared schemas (`NewsArticle`, `Game`)
  4. Dedupe + sort + cache for 10 minutes in `.cache/dashboard.json`
- **Fallback strategy**:
  - Each source fetch is wrapped in safe error handling
  - Source-level failures return empty lists instead of crashing the page
  - Remaining sources still render

## Pages

- `/` Dashboard (news + scores + sport tabs + last-updated)
- `/sport/[sport]` Sport-specific view
- `/news` All articles with sport filters and search
- `/scores` All recent/upcoming games
- `/about` Data source and refresh explanation

## Data sources

### News
- Google News RSS search for "Ole Miss sports"
- OleMissSports.com RSS feeds by sport (football, men's basketball, women's basketball, baseball, softball)

### Scores/Schedule
- ESPN public team schedule endpoints for Ole Miss team id `145`:
  - football/college-football
  - basketball/mens-college-basketball
  - basketball/womens-college-basketball
  - baseball/college-baseball
  - softball/college-softball

## Environment variables

Create `.env.local` only if needed for future premium API keys:

```bash
# Optional future use
NEWS_API_KEY=
SPORTS_API_KEY=
```

Current implementation uses public feeds/endpoints and does not require keys.

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

## Extending data sources

- Add/replace RSS feeds in `src/lib/constants.ts` (`NEWS_FEEDS`)
- Add new score endpoint mappings in `SPORT_ENDPOINTS`
- Keep normalization logic in `src/lib/normalize.ts`
- Reuse `safeFetch` wrapper (`src/lib/errors.ts`) for resilient source ingestion

## Known limitations

- Some college sports may not expose reliable public schedule endpoints or RSS coverage.
- "Live" status depends on ESPN schedule state values and may lag by a short interval.
- This project avoids brittle scraping and only uses public feed/API surfaces.
