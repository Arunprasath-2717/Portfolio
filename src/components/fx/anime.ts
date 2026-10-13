import { animate } from 'animejs/animation';
import { splitText, scrambleText } from 'animejs/text';
import { stagger } from 'animejs/utils';
import { prefersReducedMotion } from '../../lib/smooth';

/* Split-flap board reveal for the hero name: each letter flips down into place like a departures board.
   Uses anime.js splitText (accessible mode keeps the original text for screen readers). */
export function splitFlap(root: HTMLElement | null, delay = 150) {
  if (!root || prefersReducedMotion) return () => {};
  const targets = root.querySelectorAll<HTMLElement>('[data-flap]');
  const splits = Array.from(targets).map((t) => splitText(t, { chars: { class: 'flap' }, accessible: true }));
  const chars = splits.flatMap((s) => s.chars as HTMLElement[]);
  const anim = animate(chars, {
    rotateX: [{ from: -95, to: 12, duration: 520 }, { to: 0, duration: 380 }],
    opacity: { from: 0, to: 1, duration: 260 },
    y: { from: '-0.18em', to: 0, duration: 700 },
    ease: 'out(4)',
    delay: stagger(42, { start: delay }),
  });
  return () => { anim.revert(); splits.forEach((s) => s.revert()); };
}

/* Decrypt the data fields once the name has landed (React Bits DecryptedText / anime.js scrambleText). */
export function decode(root: HTMLElement | null, delay = 650) {
  if (!root || prefersReducedMotion) return () => {};
  const els = root.querySelectorAll<HTMLElement>('[data-decode]');
  const anim = animate(els, {
    innerHTML: scrambleText({ chars: 'A-Z0-9', duration: 900 }),
    delay: stagger(110, { start: delay }),
  });
  return () => anim.revert();
}

/* React Bits "ClickSpark": short-lived ticks burst from the press point. Delegated globally. */
export function installClickSpark() {
  if (prefersReducedMotion) return () => {};
  const onDown = (e: PointerEvent) => {
    const t = (e.target as Element).closest('.btn, .filter, .self-link, .link-tag, .nav-mark');
    if (!t) return;
    const host = document.createElement('span');
    host.className = 'spark';
    host.style.left = `${e.clientX}px`;
    host.style.top = `${e.clientY}px`;
    const n = 8;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      s.style.setProperty('--a', `${(360 / n) * i}deg`);
      host.appendChild(s);
    }
    document.body.appendChild(host);
    animate(host.children, {
      scaleX: [{ from: 0, to: 1, duration: 140 }, { to: 0, duration: 260 }],
      translateX: { from: 4, to: 22, duration: 400 },
      ease: 'out(3)',
      onComplete: () => host.remove(),
    });
  };
  window.addEventListener('pointerdown', onDown, { passive: true });
  return () => window.removeEventListener('pointerdown', onDown);
}
