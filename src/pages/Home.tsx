import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { gsap, prefersReducedMotion } from '../lib/smooth';
import { useMeta } from '../lib/meta';
import { Link } from '../lib/router';
import { CAPABILITIES, CERTS, FLAGSHIPS, INK_LABEL, LINKS, PROFILE, RAIL, WORKS, type Ink } from '../content';
import { FlagshipStrip, INK_VAR } from '../components/Strip';
import { Arrow } from '../components/Icons';
import { useReveals } from '../lib/reveal';
import { BlurHeading, StaggerList, TiltSpot, VelocityMarquee } from '../components/fx/Motion';
import { decode, splitFlap } from '../components/fx/anime';

gsap.registerPlugin(Flip);

type Filter = 'all' | Ink;
const TICKER = CAPABILITIES.filter((c) => c.title !== 'Core CS').flatMap((c) => c.items);
const FILTERS: Filter[] = ['all', 'amber', 'cobalt', 'red'];

function Header() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const a = splitFlap(ref.current);
    const b = decode(ref.current);
    return () => { a(); b(); };
  }, []);
  return (
    <section className="hero" aria-labelledby="hero-h" ref={ref}>
      <div className="strip strip--self" data-ink="amber">
        <div className="strip-holder" aria-hidden="true"><span>Active</span></div>
        <div className="self-call">
          <h1 id="hero-h" className="self-name">
            <span className="flap-line" data-flap="">Arun</span>
            <span className="flap-line" data-flap="">Prasath P</span>
          </h1>
          <p className="self-role" data-hero-fade="">{PROFILE.role}</p>
        </div>
        <dl className="self-fields" data-hero-fade="">
          <div className="field"><dt className="field-k" data-decode="">Status</dt><dd>{PROFILE.status}</dd></div>
          <div className="field"><dt className="field-k" data-decode="">Base</dt><dd>{PROFILE.base}</dd></div>
          <div className="field field--hot"><dt className="field-k" data-decode="">Seeking</dt><dd>{PROFILE.availability}</dd></div>
        </dl>
        <ul className="self-links" role="list" data-hero-fade="">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.href} className="self-link">
                <span className="field-k" data-decode="">{l.label}</span>
                <span className="self-link-v">{l.value}</span>
                <Arrow dir="out" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="hero-statement" data-hero-fade="">{PROFILE.statement}</p>
    </section>
  );
}

function Rack() {
  return (
    <section className="rack" aria-labelledby="rack-h" id="flagships">
      <div className="bay-head">
        <BlurHeading id="rack-h" className="h-md" text="Four I'd walk you through first" />
        <p className="board-copy">Each strip says what the system reads and what it decides. Open one for the build and its tradeoffs.</p>
      </div>
      <div className="rack-strips">
        {FLAGSHIPS.map((f, i) => <TiltSpot key={f.slug}><FlagshipStrip f={f} index={i} /></TiltSpot>)}
      </div>
    </section>
  );
}

function WorkBoard() {
  const [filter, setFilter] = useState<Filter>('all');
  const listRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const choose = (f: Filter) => {
    if (f === filter) return;
    if (!prefersReducedMotion && listRef.current) flipState.current = Flip.getState(listRef.current.children);
    setFilter(f);
  };

  useGSAP(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.55, ease: 'expo.out', absolute: true, stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'expo.out' }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, x: 24, duration: 0.25 }),
    });
    flipState.current = null;
  }, { dependencies: [filter] });

  const count = (f: Filter) => (f === 'all' ? WORKS.length : WORKS.filter((w) => w.ink === f).length);

  return (
    <section className="board" id="work" aria-labelledby="work-h">
      <div className="bay-head">
        <BlurHeading id="work-h" className="h-md" text="Everything on the board" />
        <div className="filters" role="group" aria-label="Filter projects by kind">
          {FILTERS.map((f) => (
            <button key={f} className="filter" data-ink={f} aria-pressed={filter === f} onClick={() => choose(f)}>
              {filter === f && <motion.span layoutId="filter-pill" className="filter-pill" aria-hidden="true" transition={{ type: 'spring', bounce: 0, duration: 0.5 }} />}
              <span className="filter-chip" aria-hidden="true" />
              {f === 'all' ? 'All' : INK_LABEL[f]}
              <span className="filter-n">{count(f)}</span>
            </button>
          ))}
        </div>
      </div>
      <ul className="slots" role="list" ref={listRef}>
        {WORKS.map((w) => (
          <li key={w.code} className="slot" data-ink={w.ink} data-flip-id={w.code} hidden={filter !== 'all' && w.ink !== filter}>
            <span className="slot-holder" aria-hidden="true" />
            <span className="slot-code" aria-hidden="true">{w.code}</span>
            <div className="slot-main">
              <h3 className="slot-name">
                {w.route
                  ? <Link to={w.route} curtain={{ label: w.name, ink: INK_VAR[w.ink] }}>{w.name}</Link>
                  : <Link to={w.href}>{w.name}</Link>}
              </h3>
              <p className="slot-blurb">{w.blurb}</p>
            </div>
            <p className="slot-stack">{w.stack.join(' · ')}</p>
            <div className="slot-acts">
              {w.route && <Link to={w.route} className="slot-act" curtain={{ label: w.name, ink: INK_VAR[w.ink] }} aria-label={`${w.name} case study`}>Case <Arrow /></Link>}
              <Link to={w.href} className="slot-act" aria-label={`${w.name} source on GitHub`}>Code <Arrow dir="out" /></Link>
              {w.live && <Link to={w.live} className="slot-act" aria-label={`${w.name} live demo`}>Live <Arrow dir="out" /></Link>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Path() {
  return (
    <section className="path" id="path" aria-labelledby="path-h">
      <div className="bay-head">
        <BlurHeading id="path-h" className="h-md" text="The path so far" />
        <p className="board-copy">Education, internships, and events, on one line.</p>
      </div>
      <ol className="rail" data-rail="">
        <li className="rail-fill" aria-hidden="true" />
        {RAIL.map((r, i) => (
          <li key={i} className="rail-stop" data-kind={r.kind} data-reveal="">
            <span className="rail-when">{r.when}</span>
            <span className="rail-dot" aria-hidden="true" />
            <div className="rail-card">
              <h3 className="rail-what">{r.what}</h3>
              <p className="rail-where">{r.where}</p>
              <p className="rail-detail">{r.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-h">
      <div className="bay-head">
        <BlurHeading id="skills-h" className="h-md" text="What I build with" />
        <p className="board-copy">Only tools that appear in my repositories or internships.</p>
      </div>
      <dl className="cap-grid">
        {CAPABILITIES.map((c) => (
          <div key={c.title} className="cap" data-reveal="">
            <dt className="cap-t">{c.title}</dt>
            <dd><StaggerList className="cap-items" items={c.items} /></dd>
          </div>
        ))}
      </dl>
      <div className="certs" data-reveal="">
        <h3 className="certs-h">Certifications</h3>
        <dl className="certs-list">
          {CERTS.map((c) => (
            <div key={c.v} className="cert"><dt className="field-k">{c.k}</dt><dd>{c.v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function Home() {
  const scope = useRef<HTMLElement>(null);
  useMeta(
    'Arun Prasath P | Software Engineer, Backend + Applied AI',
    'Portfolio of Arun Prasath P, a CSE student building FastAPI backends and NLP pipelines: Atlox AI, VerifAI, CANE, CadastraVision.',
    '/',
  );
  useReveals(scope, true);
  return (
    <main id="main" ref={scope} className="page page--home">
      <div className="wrap">
        <Header />
      </div>
      <VelocityMarquee items={TICKER} />
      <div className="wrap">
        <Rack />
        <WorkBoard />
        <Path />
        <Skills />
      </div>
    </main>
  );
}
