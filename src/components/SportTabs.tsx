'use client';

import { SportKey } from '@/types';
import { SPORT_LABELS } from '@/lib/constants';

export function SportTabs({ active, onChange }: { active: SportKey | 'all'; onChange: (sport: SportKey | 'all') => void }) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto">
      {(['all', 'football', 'mens-basketball', 'womens-basketball', 'baseball', 'softball', 'other'] as const).map((sport) => (
        <button
          key={sport}
          onClick={() => onChange(sport)}
          className={`rounded-full px-3 py-1 text-sm ${active === sport ? 'bg-[var(--ole-red)] text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          {sport === 'all' ? 'All Sports' : SPORT_LABELS[sport]}
        </button>
      ))}
    </div>
  );
}
