'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  trackSelector: string; // container selector that scopes the sweep
};

export function TangentSweep({ trackSelector }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    const el = ref.current;
    const track = document.querySelector<HTMLElement>(trackSelector);
    if (!el || !track) return;

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    if (reduced) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top 85%',
        end: 'bottom 35%',
        scrub: 0.4
      }
    });
    ctx.add(() => tween.scrollTrigger?.kill());
  }, [reduced, trackSelector]);

  return <div ref={ref} className="v35-tangent v35-tangent-sweep" aria-hidden="true" />;
}
