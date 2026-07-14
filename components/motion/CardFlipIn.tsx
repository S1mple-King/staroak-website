'use client';

import { useRef, type ReactNode } from 'react';
import { useGsapBidirectional } from '@/lib/hooks/useGsapBidirectional';

type Props = {
  children: ReactNode;
  index?: number;
  className?: string;
};

export function CardFlipIn({ children, index = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Stagger by index only on enter (smaller value for cards 6+).
  const enterStagger = Math.min(index, 5) * 0.06;

  useGsapBidirectional(ref, {
    enter: { opacity: 1, y: 0, duration: 0.54, ease: 'power3.out', delay: enterStagger },
    leave: { opacity: 0, y: 18, duration: 0.4, ease: 'power3.in' }
  });

  return (
    <div ref={ref} className={`v35-card-flip ${className}`}>
      {children}
    </div>
  );
}
