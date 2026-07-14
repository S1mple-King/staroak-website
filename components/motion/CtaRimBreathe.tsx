'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  className?: string;
};

export function CtaRimBreathe({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const tween = gsap.to(el, {
      boxShadow: '0 0 0 6px rgba(213,179,110,0.12)',
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    return () => tween.kill();
  }, [reduced]);

  return (
    <div ref={ref} className={`v35-cta-rim ${className}`}>
      {children}
    </div>
  );
}
