'use client';

import { useRef, useState, useEffect } from 'react';
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

  useEffect(() => {
    if (reduced) setValue(to);
  }, [reduced, to]);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: to,
      duration,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => setValue(state.v)
    });
    return () => tween.kill();
  }, [reduced, to]);

  const formatted = value.toFixed(decimals);
  return (
    <span ref={ref} className={`v35-countup ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
