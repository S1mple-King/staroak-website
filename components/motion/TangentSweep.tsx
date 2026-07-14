'use client';

import { useRef } from 'react';
import { useGsapBidirectional } from '@/lib/hooks/useGsapBidirectional';

type Props = {
  trackSelector: string;
};

export function TangentSweep({ trackSelector: _trackSelector }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapBidirectional(ref, {
    enter: { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
    leave: { scaleX: 0, opacity: 0, duration: 0.45, ease: 'power2.in' },
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });

  return (
    <div ref={ref} className="v35-tangent v35-tangent-sweep" aria-hidden="true" />
  );
}
