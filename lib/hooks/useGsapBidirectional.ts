'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

type RevealSpec = {
  readonly enter: gsap.TweenVars;
  readonly leave: gsap.TweenVars;
  readonly duration?: number;
  readonly ease?: string;
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly repeat?: boolean;
};

/**
 * IO-driven bidirectional gsap tween. Element enters -> tweens leave→enter,
 * element leaves -> tweens enter→leave. Re-runnable on every viewport entry by
 * default (overridable via spec.repeat). Replaces ScrollTrigger for V3.5 components
 * that previously failed to fire because of production-bundle ticker timing.
 */
export function useGsapBidirectional(
  ref: React.RefObject<HTMLElement | null>,
  spec: RevealSpec
) {
  const stateRef = useRef<'in' | 'out'>('out');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(el, { ...spec.enter });
      stateRef.current = 'in';
      return;
    }

    const duration = spec.duration ?? 0.54;
    const ease = spec.ease ?? 'power3.out';
    const repeat = spec.repeat ?? true;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nowIn = entry.isIntersecting;
        const before = stateRef.current;
        if (nowIn && before === 'out') {
          stateRef.current = 'in';
          gsap.fromTo(el, spec.leave, { ...spec.enter, duration, ease, overwrite: 'auto' });
        } else if (!nowIn && before === 'in' && repeat) {
          stateRef.current = 'out';
          gsap.fromTo(el, spec.enter, { ...spec.leave, duration, ease, overwrite: 'auto' });
        }
      },
      {
        threshold: spec.threshold ?? 0.15,
        rootMargin: spec.rootMargin ?? '0px 0px -10% 0px'
      }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      gsap.set(el, { clearProps: 'transform,opacity,filter' });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, spec.duration, spec.ease, spec.threshold, spec.rootMargin, spec.repeat]);
}
