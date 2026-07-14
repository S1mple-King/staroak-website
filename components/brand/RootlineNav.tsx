'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const chapters = [
  { key: '01', label: 'GROVE', href: '/about' },
  { key: '02', label: 'TRUNK', href: '/about#holding-architecture' },
  { key: '03', label: 'CANOPY', href: '/about#mission-vision' },
  { key: '04', label: 'ORBIT', href: '/ai-engine' },
  { key: '05', label: 'FRUIT', href: '/ecosystem' }
] as const;

export function RootlineNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  if (isHome) return null;

  return (
    <aside className="rootline" aria-label="StarOak 章节索引">
      <div className="rootline-rail" aria-hidden="true">
        <span className="rootline-ring" />
      </div>
      <ol>
        {chapters.map((c) => {
          const base = c.href.split('#')[0];
          const isCurrent = pathname.startsWith(base);
          return (
            <li key={c.key} aria-current={isCurrent ? 'page' : undefined}>
              <Link href={c.href} className="rootline-link">
                <span className="rootline-key">{c.key}</span>
                <span className="rootline-label">{c.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="rootline-cap" aria-hidden="true" />
    </aside>
  );
}
