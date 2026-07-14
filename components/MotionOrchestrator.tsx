'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const revealSelector = [
  '.section-head',
  '.card-grid > *',
  '.split > *',
  '.editorial-contrast > *',
  '.identity-grid > *',
  '.intelligence-grid > *',
  '.cooperation-grid > *',
  '.governance-grid > *',
  '.selection-grid > *',
  '.process-line > *',
  '.capability-layer',
  '.reserve-ribbon > *',
  '.architecture-diagram',
  '.flywheel-shell',
  '.contrast-panel',
  '.list.panel',
  '.compliance-band',
  '.inner-cta',
  '.final-cta'
].join(',');

function motionKind(element: HTMLElement) {
  if (element.matches('.section-head')) return 'heading';
  if (element.matches('.lux-card, .insight-card, .governance-card, .selection-card, .process-step')) return 'card';
  return 'panel';
}

export function MotionOrchestrator() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const main = document.getElementById('main-content');

    if (!main || prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const targets = Array.from(main.querySelectorAll<HTMLElement>(revealSelector));

      targets.forEach((target) => {
        const siblings = target.parentElement
          ? Array.from(target.parentElement.children).filter((item) => item.matches(revealSelector))
          : [];
        const order = Math.max(0, siblings.indexOf(target));

        target.dataset.motionKind = motionKind(target);
        target.style.setProperty('--reveal-delay', `${Math.min(order, 5) * 72}ms`);
        target.style.setProperty('--reveal-offset', `${18 + Math.min(order, 5) * 3}px`);
        target.classList.add('motion-item', 'motion-pending');
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
      );

      targets.forEach((target) => observer?.observe(target));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
