'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

const poster = '/assets/staroak-sovereign-orbit-poster-v3.png';

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [staticMode, setStaticMode] = useState(true);
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as NavigatorWithConnection).connection;
    const updateMode = () => setStaticMode(motionQuery.matches || Boolean(connection?.saveData));

    updateMode();
    motionQuery.addEventListener('change', updateMode);
    return () => motionQuery.removeEventListener('change', updateMode);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMode) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [staticMode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMode) return;

    if (paused || !inView) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      setPaused(true);
    });
  }, [inView, paused, staticMode]);

  if (staticMode) {
    return (
      <div className="hero-media" aria-hidden="true">
        <div className="hero-media-stage">
          <Image src={poster} alt="" fill priority sizes="100vw" />
        </div>
      </div>
    );
  }

  return (
    <div className="hero-media">
      <div className="hero-media-stage">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/assets/staroak-sovereign-orbit-loop-v3.mp4" type="video/mp4" />
        </video>
      </div>
      <button
        className="hero-motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        <span aria-hidden="true">{paused ? 'PLAY' : 'PAUSE'}</span>
        <span className="sr-only">{paused ? '播放背景动态' : '暂停背景动态'}</span>
      </button>
    </div>
  );
}
