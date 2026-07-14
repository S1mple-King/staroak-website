'use client';

import { usePathname } from 'next/navigation';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
};

export function CinematicStage({ children }: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: '0%', filter: 'blur(0px)' });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: '6%', filter: 'blur(12px)' },
      {
        opacity: 1,
        y: '0%',
        filter: 'blur(0px)',
        duration: 0.56,
        ease: 'power3.out'
      }
    );
  }, [reduced, pathname]);

  return (
    <div ref={ref} className="v35-route-stage">
      {children}
    </div>
  );
}
