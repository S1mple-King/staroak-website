'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  trackSelector: string;
  align?: 'start' | 'end';
};

export function BranchTangent({ trackSelector, align = 'start' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    const el = ref.current;
    const track = document.querySelector<HTMLElement>(trackSelector);
    if (!el || !track) return;

    if (reduced) {
      gsap.set(el, { scaleX: 1, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      el,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        ease: 'none',
        transformOrigin: `${align} center`,
        scrollTrigger: {
          trigger: track,
          start: 'top 85%',
          end: 'bottom 35%',
          scrub: 0.4
        }
      }
    );
    ctx.add(() => tween.scrollTrigger?.kill());
  }, [reduced, trackSelector, align]);

  return <span ref={ref} className="v35-branch-tangent" data-align={align} aria-hidden="true" />;
}
