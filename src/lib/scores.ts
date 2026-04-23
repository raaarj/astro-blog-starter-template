import { OLE_MISS_TEAM_ID, SPORT_ENDPOINTS } from './constants';
import { dedupeGames } from './normalize';
import { safeFetch } from './errors';
import { Game } from '@/types';

type EspnEvent = {
  id: string;
  date: string;
  competitions: Array<{
    competitors: Array<{ homeAway: 'home' | 'away'; team: { shortDisplayName: string }; score?: string }>;
  }>;
  status: {
    type: { completed: boolean; state: string; shortDetail: string };
  };
  leagues?: Array<{ shortName: string }>;
};

function mapEvent(event: EspnEvent, sport: Game['sport']): Game {
  const comp = event.competitions[0];
  const oleMiss = comp.competitors.find((c) => c.team.shortDisplayName === 'Ole Miss') ?? comp.competitors[0];
  const opponent = comp.competitors.find((c) => c.team.shortDisplayName !== 'Ole Miss') ?? comp.competitors[1];

  const status: Game['status'] = event.status.type.completed
    ? 'final'
    : event.status.type.state === 'in'
      ? 'live'
      : 'upcoming';

  return {
    id: event.id,
    sport,
    opponent: opponent?.team.shortDisplayName ?? 'TBD',
    date: event.date,
    homeAway: oleMiss.homeAway,
    status,
    score:
      status === 'upcoming'
        ? undefined
        : {
            oleMiss: Number(oleMiss.score ?? 0),
            opponent: Number(opponent?.score ?? 0),
          },
    league: event.leagues?.[0]?.shortName,
  };
}

export async function fetchScores(): Promise<Game[]> {
  const allSports = await Promise.all(
    SPORT_ENDPOINTS.map(({ key, path }) =>
      safeFetch(`scores:${key}`, async () => {
        const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${path}/teams/${OLE_MISS_TEAM_ID}/schedule`, {
          headers: { 'User-Agent': 'Ole-Miss-Sports-Hub/1.0' },
          next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { events?: EspnEvent[] };
        return (json.events ?? []).map((event) => mapEvent(event, key));
      }, [] as Game[]),
    ),
  );

  return dedupeGames(allSports.flat()).sort((a, b) => +new Date(a.date) - +new Date(b.date));
}
