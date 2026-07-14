'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
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
  const headRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);

  // Element creation lives in useLayoutEffect so the DOM exists before GSAP reads.
  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;

    const head = el.querySelector<HTMLElement>('.section-head');
    if (!head) return;
    headRef.current = head;
    el.dataset.tone = tone;

    if (reduced) {
      // mark visible; IO observer will not animate but element stays in 'enter' state
      setArmed(true);
      return;
    }

    // Pre-create the span line in the from-state (scaleX 0, opacity 0)
    if (!head.querySelector('.v35-section-tangent')) {
      const line = document.createElement('span');
      line.className = 'v35-section-tangent';
      head.prepend(line);
      gsap.set(line, { scaleX: 0, opacity: 0 });
      lineRef.current = line;
    }
    gsap.set(head, { y: 18, opacity: 0 });
    setArmed(true);

    return () => {
      lineRef.current?.remove();
      lineRef.current = null;
    };
  }, [reduced, tone]);

  // Bidirectional IO animation triggered after armed
  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    const head = headRef.current;
    const line = lineRef.current;
    if (!el || !head) return;

    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      gsap.set(head, { y: 0, opacity: 1 });
      if (line) gsap.set(line, { scaleX: 1, opacity: 1 });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          if (line) gsap.fromTo(line,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.72, ease: 'power3.out', overwrite: 'auto' }
          );
          gsap.fromTo(head,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.18, overwrite: 'auto' }
          );
        } else {
          if (line) gsap.to(line, { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power3.in', overwrite: 'auto' });
          gsap.to(head, { y: 18, opacity: 0, duration: 0.5, ease: 'power3.in', overwrite: 'auto' });
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <section ref={ref as unknown as React.RefObject<HTMLElement>} data-tone={tone} className={`v35-section-tone ${className}`}>
      {children}
    </section>
  );
}
