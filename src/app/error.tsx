'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="card space-y-3">
      <h2 className="text-lg font-semibold text-[var(--ole-red)]">We hit a temporary issue loading updates.</h2>
      <p className="text-sm text-slate-600">Please try again in a moment.</p>
      <button className="rounded bg-[var(--ole-blue)] px-3 py-1.5 text-sm text-white" onClick={() => reset()}>
        Retry
      </button>
    </div>
  );
}
