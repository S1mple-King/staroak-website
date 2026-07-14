'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/lib/site-data';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => first?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const isCurrent = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={`site-header${pathname === '/' ? ' home-header' : ''}`}>
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="StarOak 首页">
            <Image
              src="/assets/staroak-mark-transparent.png"
              alt="StarOak 星橡"
              width={650}
              height={442}
              priority
            />
            <span className="brand-copy" aria-hidden="true">
              <strong>星橡 StarOak</strong>
              <small>Rooted Intelligence. Starward Future.</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="主导航">
            {navItems.map((item) => (
              <Link
                className="nav-link"
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="nav-cta desktop-cta" href="/ecosystem">生态合作</Link>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-layer">
          <button
            className="menu-backdrop"
            type="button"
            aria-label="关闭导航菜单"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={drawerRef}
            className="mobile-drawer"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="网站导航"
          >
            <div className="drawer-head">
              <p><span>StarOak</span> / Site Index</p>
              <button className="drawer-close" type="button" onClick={() => setMenuOpen(false)}>
                <span aria-hidden="true">×</span><span className="sr-only">关闭导航菜单</span>
              </button>
            </div>
            <nav className="mobile-nav" aria-label="移动端主导航">
              {navItems.map((item, index) => (
                <Link
                  className="mobile-nav-link"
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  key={item.href}
                  href={item.href}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link className="btn btn-primary drawer-cta" href="/ecosystem">洽谈生态合作</Link>
            <p className="drawer-signature">Rooted Intelligence. Starward Future.</p>
          </div>
        </div>
      )}
    </>
  );
}
