import { NewsSearch } from '@/components/NewsSearch';
import { getDashboardData } from '@/lib/data';

export default async function NewsPage() {
  const data = await getDashboardData();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">All Ole Miss News</h1>
      <NewsSearch articles={data.news} />
    </div>
  );
}
