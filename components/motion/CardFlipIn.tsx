'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  index?: number; // for stagger
  className?: string;
};

export function CardFlipIn({ children, index = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, rotateY: 0, y: 0 });
      return;
    }

    const isDesktop =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

    gsap.fromTo(
      el,
      isDesktop
        ? { opacity: 0, rotateY: -6, y: 0, transformPerspective: 1200 }
        : { opacity: 0, y: 18 },
      {
        opacity: 1,
        rotateY: 0,
        y: 0,
        duration: 0.54,
        ease: 'power3.out',
        delay: Math.min(index, 5) * 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      }
    );
  }, [reduced, index]);

  return (
    <div ref={ref} className={`v35-card-flip ${className}`}>
      {children}
    </div>
  );
}
