import type { Flagship } from '../content';
import { INK_LABEL } from '../content';
import { Link } from '../lib/router';
import { Arrow } from './Icons';

export const INK_VAR = { amber: 'var(--amber)', cobalt: 'var(--cobalt)', red: 'var(--red)' } as const;

// A flagship rendered as a flight progress strip: holder, callsign, then ruled data fields.
export function FlagshipStrip({ f, index }: { f: Flagship; index: number }) {
  const to = `/work/${f.slug}`;
  return (
    <article className="strip strip--flag" data-ink={f.ink} data-reveal="" style={{ ['--i' as string]: index }}>
      <div className="strip-holder" aria-hidden="true">
        <span>{INK_LABEL[f.ink]}</span>
      </div>
      <div className="strip-call">
        <span className="strip-code" aria-hidden="true">{f.code}</span>
        <h3 className="strip-name">
          <Link to={to} curtain={{ label: f.name, ink: INK_VAR[f.ink] }} className="strip-hit">{f.name}</Link>
        </h3>
        <p className="strip-tag">{f.tagline}</p>
      </div>
      <dl className="strip-fields">
        <div className="field"><dt className="field-k">Takes in</dt><dd>{f.intake}</dd></div>
        <div className="field"><dt className="field-k">Decides</dt><dd>{f.decides}</dd></div>
        <div className="field field--stack"><dt className="field-k">Stack</dt><dd>{f.stack.slice(0, 4).join(' · ')}</dd></div>
      </dl>
      <div className="strip-go" aria-hidden="true"><span>Open</span><Arrow /></div>
    </article>
  );
}
