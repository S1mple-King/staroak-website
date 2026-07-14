'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapContext(
  setup: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
