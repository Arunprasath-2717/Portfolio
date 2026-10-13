import { useRef } from 'react';
import { FLAGSHIPS, INK_LABEL, type Flagship } from '../content';
import { useMeta } from '../lib/meta';
import { Link } from '../lib/router';
import { useReveals } from '../lib/reveal';
import { INK_VAR } from '../components/Strip';
import { Arrow } from '../components/Icons';
import { DEMOS } from '../demos/Demos';

export default function CaseStudy({ project: f }: { project: Flagship }) {
  const scope = useRef<HTMLElement>(null);
  useMeta(`${f.name}: ${f.tagline} | Arun Prasath P`, `${f.name}: ${f.problem}`, `/work/${f.slug}`);
  useReveals(scope, true);
  const idx = FLAGSHIPS.findIndex((x) => x.slug === f.slug);
  const next = FLAGSHIPS[(idx + 1) % FLAGSHIPS.length];
  const demo = DEMOS[f.slug];

  return (
    <main id="main" ref={scope} className="page page--case" data-ink={f.ink}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/#work">Board</Link><span aria-hidden="true">/</span><span>{INK_LABEL[f.ink]}</span>
        </nav>

        <section className="hero hero--case" aria-labelledby="case-h">
          <div className="strip strip--self" data-ink={f.ink}>
            <div className="strip-holder" aria-hidden="true"><span>{INK_LABEL[f.ink]}</span></div>
            <div className="self-call">
              <span className="strip-code" aria-hidden="true">{f.code}</span>
              <h1 id="case-h" className="self-name" data-long={f.name.length > 10 ? "" : undefined}><span data-hero-line=""><span>{f.name}</span></span></h1>
              <p className="self-role" data-hero-fade="">{f.tagline}</p>
            </div>
            <dl className="self-fields" data-hero-fade="">
              <div className="field"><dt className="field-k">Takes in</dt><dd>{f.intake}</dd></div>
              <div className="field"><dt className="field-k">Decides</dt><dd>{f.decides}</dd></div>
              <div className="field"><dt className="field-k">Year</dt><dd>{f.year}</dd></div>
            </dl>
            <ul className="self-links" role="list" data-hero-fade="">
              <li><Link to={f.repo} className="self-link"><span className="field-k">Source</span><span className="self-link-v">GitHub</span><Arrow dir="out" /></Link></li>
              {f.live && <li><Link to={f.live} className="self-link"><span className="field-k">Live</span><span className="self-link-v">{new URL(f.live).host}</span><Arrow dir="out" /></Link></li>}
            </ul>
          </div>
        </section>

        <section className="case-grid" aria-labelledby="why-h">
          <h2 id="why-h" className="h-md">Why it exists</h2>
          <p className="case-lede" data-reveal="">{f.problem}</p>
        </section>

        <section className="case-grid" aria-labelledby="built-h">
          <h2 id="built-h" className="h-md">What I built</h2>
          <ol className="built">
            {f.built.map((b, i) => <li key={i} data-reveal=""><span className="built-n">{String(i + 1).padStart(2, '0')}</span><p>{b}</p></li>)}
          </ol>
        </section>

        {demo && (
          <section className="demo-bay" aria-labelledby="demo-h">
            <div className="bay-head">
              <h2 id="demo-h" className="h-md">{demo.title}</h2>
              <p className="board-copy">{demo.note}</p>
            </div>
            <demo.C />
          </section>
        )}

        <section className="case-grid" aria-labelledby="dec-h">
          <h2 id="dec-h" className="h-md">Decisions worth defending</h2>
          <div className="decisions">
            {f.decisions.map((d) => (
              <div key={d.title} className="decision" data-reveal="">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-grid" aria-labelledby="facts-h">
          <h2 id="facts-h" className="h-md">From the repo</h2>
          <div>
            <dl className="facts">
              {f.facts.map((x) => <div key={x.k} className="fact" data-reveal=""><dt className="field-k">{x.k}</dt><dd>{x.v}</dd></div>)}
            </dl>
            <p className="facts-src">Numbers as stated in the project README. Stack: {f.stack.join(', ')}.</p>
          </div>
        </section>

        <Link to={`/work/${next.slug}`} className="next" data-ink={next.ink} curtain={{ label: next.name, ink: INK_VAR[next.ink] }}>
          <span className="field-k">Next strip</span>
          <span className="next-name">{next.name}</span>
          <span className="next-tag">{next.tagline}</span>
          <Arrow />
        </Link>
      </div>
    </main>
  );
}
