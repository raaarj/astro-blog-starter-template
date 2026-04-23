import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CACHE_TTL_MS } from './constants';
import { DashboardData } from '@/types';

const cacheFile = path.join(process.cwd(), '.cache', 'dashboard.json');

export async function readCache(): Promise<DashboardData | null> {
  try {
    const content = await fs.readFile(cacheFile, 'utf8');
    const parsed = JSON.parse(content) as DashboardData;
    if (Date.now() - new Date(parsed.updatedAt).getTime() > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeCache(data: DashboardData): Promise<void> {
  await fs.mkdir(path.dirname(cacheFile), { recursive: true });
  await fs.writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf8');
}
