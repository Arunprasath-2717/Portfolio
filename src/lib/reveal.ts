import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from './smooth';

// Content is visible by default; motion only animates FROM an offset.
export function useReveals(scope: RefObject<HTMLElement | null>, hero = false) {
  useGSAP(() => {
    if (prefersReducedMotion) return;
    if (hero) {
      const lines = scope.current?.querySelectorAll('[data-hero-line] > span');
      const tl = gsap.timeline({ delay: 0.1 });
      if (lines?.length) tl.from(lines, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08 });
      const fades = scope.current?.querySelectorAll('[data-hero-fade]');
      if (fades?.length) tl.from(fades, { autoAlpha: 0, y: 16, filter: 'blur(6px)', duration: 0.9, ease: 'expo.out', stagger: 0.09, clearProps: 'filter' }, lines?.length ? '-=0.8' : 0.35);
    }
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.closest('.hero')) return;
      gsap.from(el, {
        x: el.classList.contains('strip') ? -60 : 0,
        rotate: el.classList.contains('strip') ? -0.6 : 0,
        y: el.classList.contains('strip') ? 0 : 28,
        autoAlpha: 0, duration: 0.9, ease: 'expo.out', clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });
    const rail = scope.current?.querySelector<HTMLElement>('[data-rail]');
    const fill = rail?.querySelector<HTMLElement>('.rail-fill');
    if (rail && fill) {
      gsap.fromTo(fill, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 60%', scrub: 0.4 },
      });
    }
  }, { scope });
}
