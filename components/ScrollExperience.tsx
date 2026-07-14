'use client';

import { useEffect } from 'react';

const itemSelector = [
  '.identity-grid article',
  '.contrast-panel > *',
  '.architecture-diagram',
  '.lux-card',
  '.flywheel-shell',
  '.reserve-list li',
  '.insight-card',
  '.cooperation-grid > *',
  '.section-link',
  '.final-cta > *'
].join(',');

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollExperience() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.home-page');
    if (!page) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = Array.from(page.querySelectorAll<HTMLElement>('.section, .final-cta'));
    const driftTargets = Array.from(page.querySelectorAll<HTMLElement>('.section-head, .architecture-diagram, .flywheel-shell'));

    sections.forEach((section) => {
      section.querySelectorAll<HTMLElement>(itemSelector).forEach((item, index) => {
        item.classList.add('scroll-item');
        item.style.setProperty('--reveal-delay', `${100 + Math.min(index, 7) * 58}ms`);
      });
    });

    if (motionQuery.matches) {
      page.dataset.scrollReady = 'static';
      sections.forEach((section) => section.classList.add('is-revealed'));
      return;
    }

    page.dataset.scrollReady = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const heroProgress = clamp(window.scrollY / (viewportHeight * 0.92), 0, 1);
      page.style.setProperty('--hero-scroll', heroProgress.toFixed(4));
      page.style.setProperty('--hero-media-shift', `${(heroProgress * viewportHeight * -0.045).toFixed(2)}px`);
      page.style.setProperty('--hero-media-scale', (1 + heroProgress * 0.075).toFixed(4));
      page.style.setProperty('--hero-copy-shift', `${(heroProgress * -58).toFixed(2)}px`);
      page.style.setProperty('--hero-copy-opacity', (1 - heroProgress * 0.94).toFixed(4));

      driftTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const targetCenter = rect.top + rect.height / 2;
        const drift = clamp((viewportHeight / 2 - targetCenter) / viewportHeight, -1, 1);
        target.style.setProperty('--section-drift-y', `${(drift * -20).toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      delete page.dataset.scrollReady;
      page.style.removeProperty('--hero-scroll');
      page.style.removeProperty('--hero-media-shift');
      page.style.removeProperty('--hero-media-scale');
      page.style.removeProperty('--hero-copy-shift');
      page.style.removeProperty('--hero-copy-opacity');
      driftTargets.forEach((target) => target.style.removeProperty('--section-drift-y'));
    };
  }, []);

  return null;
}
