'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Tone = 'cinematic' | 'tactical' | 'tactile';

type Props = {
  tone: Tone;
  className?: string;
  children: ReactNode;
};

export function SectionTone({ tone, className = '', children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const head = el.querySelector<HTMLElement>('.section-head');
    if (!head) return;

    const line = document.createElement('span');
    line.className = 'v35-section-tangent';
    head.prepend(line);

    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.72, ease: 'power3.out' }
    );
    gsap.fromTo(
      head,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.18 }
    );

    el.dataset.tone = tone;

    return () => {
      line.remove();
    };
  }, [reduced, tone]);

  return (
    <section ref={ref as never} data-tone={tone} className={`v35-section-tone ${className}`}>
      {children}
    </section>
  );
}
