import { DashboardClient } from '@/components/DashboardClient';
import { getDashboardData } from '@/lib/data';

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold text-[var(--ole-blue)]">Ole Miss Sports Dashboard</h1>
      <p className="mb-4 text-sm text-slate-600">Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      <DashboardClient data={data} />
    </div>
  );
}
