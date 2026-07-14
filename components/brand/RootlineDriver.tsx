'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  target?: string;
};

export function RootlineDriver({ target = 'main' }: Props) {
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    const page = document.querySelector<HTMLElement>(target);
    const ring = document.querySelector<HTMLElement>('.rootline-ring');
    if (!page || !ring) return;

    if (reduced) {
      ring.style.setProperty('--rootline-ring-y', '0px');
      return;
    }

    const tween = gsap.to(ring, {
      '--rootline-ring-y': () => `${page.getBoundingClientRect().bottom - 220}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: page,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4
      }
    });
    ctx.add(() => tween.scrollTrigger?.kill());
  }, [reduced, target]);

  return null;
}
