export async function safeFetch<T>(label: string, action: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await action();
  } catch (error) {
    console.error(`[${label}] failed`, error);
    return fallback;
  }
}
