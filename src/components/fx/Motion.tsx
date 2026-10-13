import { useEffect, useRef, type ReactNode, type PointerEvent as RPE } from 'react';
import {
  motion, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame,
  useMotionTemplate,
} from 'motion/react';
import { prefersReducedMotion } from '../../lib/smooth';

const finePointer = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const richMotion = !prefersReducedMotion && finePointer;

/* React Bits "BlurText": words rise out of a blur, staggered. Text stays readable for assistive tech. */
export function BlurHeading({ text, as: Tag = 'h2', id, className }: { text: string; as?: 'h2' | 'h3'; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const words = text.split(' ');
  const MotionTag = Tag === 'h2' ? motion.h2 : motion.h3;
  if (prefersReducedMotion) return <Tag id={id} className={className}>{text}</Tag>;
  return (
    <MotionTag ref={ref} id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i} aria-hidden="true" className="bw"
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
        >{w}{i < words.length - 1 ? '\u00a0' : ''}</motion.span>
      ))}
    </MotionTag>
  );
}

/* React Bits "Magnet": the element leans toward the pointer with an interruptible spring. */
export function Magnet({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });
  if (!richMotion) return <span className={className}>{children}</span>;
  const move = (e: RPE<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.span className={className} style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.span>
  );
}

/* Aceternity card spotlight + 3D tilt. Writes motion values only: no React renders per frame. */
export function TiltSpot({ children, className, max = 4 }: { children: ReactNode; className?: string; max?: number }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgba(255,255,255,0.42), transparent 45%)`;
  if (!richMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`tilt ${className ?? ''}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
    >
      {children}
      <motion.span className="tilt-glare" aria-hidden="true" style={{ backgroundImage: glare }} />
    </motion.div>
  );
}

/* Flight progress: a thin amber bar tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div className="progress" aria-hidden="true" style={{ scaleX }} />;
}

/* React Bits "ScrollVelocity" / Magic UI "Marquee": drifts on its own, speeds up and flips with scroll. */
export function VelocityMarquee({ items, base = 3 }: { items: string[]; base?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(offset, (v) => `${(((v % 50) + 50) % 50) * -1}%`);
  useAnimationFrame((_, delta) => {
    if (!inView || prefersReducedMotion) return;
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    offset.set(offset.get() + dir.current * base * (delta / 1000) * (1 + Math.abs(f)));
  });
  const row = items.map((it, i) => <span key={i} className="mq-item">{it}<i aria-hidden="true" /></span>);
  return (
    <div className="mq" ref={ref} aria-label={`Stack: ${items.join(', ')}`} role="img">
      <motion.div className="mq-track" style={{ x }} aria-hidden="true">{row}{row}</motion.div>
    </div>
  );
}

/* Staggered chip entrance for skill lists. */
export function StaggerList({ items, className }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  if (prefersReducedMotion) return <ul className={className} role="list">{items.map((it) => <li key={it}>{it}</li>)}</ul>;
  return (
    <ul ref={ref} className={className} role="list">
      {items.map((it, i) => (
        <motion.li key={it}
          initial={{ opacity: 0, y: 10, scale: 0.94 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ type: 'spring', bounce: 0, duration: 0.55, delay: 0.05 + i * 0.045 }}
        >{it}</motion.li>
      ))}
    </ul>
  );
}

/* React Bits "TargetCursor": a crosshair that snaps around interactive targets. Fine pointers only. */
export function TargetCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const w = useMotionValue(28);
  const h = useMotionValue(28);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 });
  const sw = useSpring(w, { stiffness: 500, damping: 40 });
  const sh = useSpring(h, { stiffness: 500, damping: 40 });
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!richMotion) return;
    document.documentElement.classList.add('has-cursor');
    let locked: Element | null = null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      ring.current?.setAttribute('data-on', 'true');
      dot.current?.setAttribute('data-on', 'true');
      const t = (e.target as Element).closest('a, button, input, textarea, label, [data-cursor]');
      if (t && !t.matches('input, textarea')) {
        const r = t.getBoundingClientRect();
        locked = t;
        x.set(r.left + r.width / 2); y.set(r.top + r.height / 2);
        w.set(r.width + 14); h.set(r.height + 14);
        ring.current?.setAttribute('data-lock', 'true');
      } else {
        locked = null;
        x.set(e.clientX); y.set(e.clientY); w.set(28); h.set(28);
        ring.current?.removeAttribute('data-lock');
      }
    };
    const onScroll = () => {
      if (!locked) return;
      const r = locked.getBoundingClientRect();
      x.set(r.left + r.width / 2); y.set(r.top + r.height / 2);
    };
    const onLeave = () => { ring.current?.setAttribute('data-on', 'false'); dot.current?.setAttribute('data-on', 'false'); };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y, w, h]);

  if (!richMotion) return null;
  return (
    <>
      <motion.div ref={ring} className="cur-ring" aria-hidden="true" style={{ x: sx, y: sy, width: sw, height: sh }}>
        <i /><i /><i /><i />
      </motion.div>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
