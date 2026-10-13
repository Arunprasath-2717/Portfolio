import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type AnchorHTMLAttributes, type MouseEvent, type ReactNode,
} from 'react';
import { gsap, prefersReducedMotion, scrollToTarget, scrollToTop, ScrollTrigger } from './smooth';

type Curtain = { label: string; ink: string };
type RouterCtx = { path: string; navigate: (to: string, curtain?: Curtain) => void };

const Ctx = createContext<RouterCtx>({ path: '/', navigate: () => {} });
export const useRouter = () => useContext(Ctx);

export function normalizePath(p: string) {
  const clean = p.replace(/\/+$/, '').toLowerCase();
  return clean === '' ? '/' : clean;
}

function settle(hash: string) {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (hash) scrollToTarget(hash);
  });
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const busy = useRef(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onPop = () => {
      setPath(normalizePath(window.location.pathname));
      scrollToTop();
      settle(window.location.hash);
    };
    window.addEventListener('popstate', onPop);
    if (window.location.hash) setTimeout(() => scrollToTarget(window.location.hash), 300);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, curtain?: Curtain) => {
    const url = new URL(to, window.location.origin);
    const next = normalizePath(url.pathname);
    const hash = url.hash;
    if (next === normalizePath(window.location.pathname)) {
      if (hash) {
        history.pushState(null, '', next + hash);
        scrollToTarget(hash);
      } else scrollToTop();
      return;
    }
    if (busy.current) return;
    const swap = () => {
      history.pushState(null, '', next + hash);
      setPath(next);
      scrollToTop();
    };
    const el = curtainRef.current;
    if (prefersReducedMotion || !el) {
      swap();
      settle(hash);
      return;
    }
    busy.current = true;
    el.style.setProperty('--curtain-ink', curtain?.ink ?? 'var(--board)');
    if (labelRef.current) labelRef.current.textContent = curtain?.label ?? 'Board';
    gsap.timeline({ onComplete: () => { busy.current = false; settle(hash); } })
      .set(el, { visibility: 'visible' })
      .fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'expo.inOut' })
      .fromTo(labelRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: 'expo.out' }, '-=0.15')
      .add(swap)
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut', delay: 0.12 })
      .set(el, { visibility: 'hidden' });
  }, []);

  return (
    <Ctx.Provider value={{ path, navigate }}>
      {children}
      <div ref={curtainRef} className="curtain" aria-hidden="true">
        <span className="curtain-mask"><span ref={labelRef} className="curtain-label" /></span>
      </div>
    </Ctx.Provider>
  );
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; curtain?: Curtain };

export function Link({ to, curtain, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const external = /^(https?:|mailto:)/.test(to);
  if (external) {
    const ext = to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={to} {...ext} {...rest} onClick={onClick}>{children}</a>;
  }
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to, curtain);
  };
  return <a href={to} {...rest} onClick={handle}>{children}</a>;
}
