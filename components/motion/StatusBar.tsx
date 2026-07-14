'use client';

import { useEffect, useState } from 'react';
import { formatStamp } from '@/lib/clock';

type Props = {
  index: string;
  brand: string;
  signature: string;
};

export function StatusBar({ index, brand, signature }: Props) {
  const [stamp, setStamp] = useState<string>(() => formatStamp());

  useEffect(() => {
    const id = window.setInterval(() => setStamp(formatStamp()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="v35-status-bar" aria-hidden="true">
      <span className="v35-status-bar-cap" />
      <span className="v35-status-bar-cell v35-status-bar-left">
        <span className="v35-status-bar-index">{index}</span>
        <span className="v35-status-bar-sep">/</span>
        <span>{brand}</span>
      </span>
      <span className="v35-status-bar-cell v35-status-bar-mid">
        <span className="v35-status-bar-dot" />
        <span>{signature}</span>
        <span className="v35-status-bar-dot" />
      </span>
      <span className="v35-status-bar-cell v35-status-bar-right">
        <time suppressHydrationWarning>{stamp}</time>
      </span>
      <span className="v35-status-bar-cap" />
    </div>
  );
}
