export default function AboutPage() {
  return (
    <article className="max-w-3xl space-y-3">
      <h1 className="text-2xl font-bold">About Ole Miss Sports Hub</h1>
      <p>
        This site aggregates public Ole Miss athletics coverage and schedule data into a single dashboard. News is sourced from
        public RSS feeds and game data comes from ESPN's public schedule endpoints.
      </p>
      <p>
        Data is cached for 10 minutes to reduce network traffic and improve response speed. If one source fails, the site still
        renders with available sources.
      </p>
      <p>Designed for fans who want a fast snapshot of headlines, finals, and upcoming games.</p>
    </article>
  );
}
