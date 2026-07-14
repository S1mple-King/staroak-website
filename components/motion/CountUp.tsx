'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function CountUp({
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  // Reduced motion: stay at target
  useEffect(() => {
    if (reduced) setValue(to);
  }, [reduced, to]);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let observer: IntersectionObserver | null = null;
    const state = { v: 0 };
    const enter = () => {
      // On enter: animate 0 -> to
      state.v = 0;
      setValue(0);
      gsap.fromTo(state,
        { v: 0 },
        {
          v: to,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
          onUpdate: () => setValue(state.v)
        }
      );
    };
    const leave = () => {
      // On leave: animate back to 0 (so re-entering shows the count-up again)
      const current = state.v;
      gsap.to(state, {
        v: 0,
        duration: Math.max(0.4, (current / to) * duration),
        ease: 'power3.in',
        overwrite: 'auto',
        onUpdate: () => setValue(state.v)
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) enter(); else leave();
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);

    return () => {
      observer?.disconnect();
      gsap.killTweensOf(state);
    };
  }, [reduced, to, duration]);

  const formatted = value.toFixed(decimals);
  return (
    <span ref={ref} className={`v35-countup ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
