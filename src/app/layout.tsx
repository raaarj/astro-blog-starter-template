import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Ole Miss Sports Hub',
  description: 'Latest Ole Miss sports news, scores, and schedules in one dashboard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-[var(--ole-red)]">
              Ole Miss Sports Hub
            </Link>
            <div className="flex gap-4 text-sm font-medium text-slate-700">
              <Link href="/news">News</Link>
              <Link href="/scores">Scores</Link>
              <Link href="/about">About</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
