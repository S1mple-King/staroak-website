'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  align?: 'left' | 'right' | 'center';
  length?: string; // CSS length, e.g. '1280px'
  thickness?: number; // px
  trigger?: boolean; // reserved for future scroll-trigger wiring
};

export function TangentLine({
  align = 'left',
  length = '1280px',
  thickness = 1,
  trigger: _trigger = false
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    if (!ref.current) return;
    if (reduced) {
      gsap.set(ref.current, { scaleX: 1, opacity: 1, transformOrigin: `${align} center` });
      return;
    }
    gsap.fromTo(
      ref.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.72,
        ease: 'power3.out',
        transformOrigin: `${align} center`
      }
    );
  }, [reduced, align]);

  return (
    <div
      ref={ref}
      className="v35-tangent"
      data-align={align}
      style={{ width: length, height: thickness }}
      aria-hidden="true"
    />
  );
}
