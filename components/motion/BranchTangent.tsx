'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapBidirectional } from '@/lib/hooks/useGsapBidirectional';

type Props = {
  trackSelector: string;
  align?: 'start' | 'end';
};

export function BranchTangent({ trackSelector, align = 'start' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  // The BranchTangent's "track" is the page-hero underneath it, but the line itself
  // lives in page-hero-branch-slot (a sibling). IntersectionObserver on the line
  // element auto-targets the closest viewport — equivalent semantic for our case.
  // We still resolve the trackSelector to position the line near its hero.
  useEffect(() => {
    const line = ref.current;
    const track = document.querySelector<HTMLElement>(trackSelector);
    if (line && track) {
      const rect = track.getBoundingClientRect();
      // place the line at the start of the hero's left edge (already done via
      // .page-hero-branch-slot's flex layout); this effect is a no-op placeholder
      // kept for future alignment work and to give a stable hook point.
    }
  }, [trackSelector]);

  useGsapBidirectional(ref, {
    enter: { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power3.out' },
    leave: { scaleX: 0, opacity: 0, duration: 0.45, ease: 'power3.in' },
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px'
  });

  return (
    <span
      ref={ref as unknown as React.RefObject<HTMLSpanElement>}
      className="v35-branch-tangent"
      data-align={align}
      aria-hidden="true"
    />
  );
}
