import { useMeta } from '../lib/meta';
import { Link } from '../lib/router';
import { Arrow } from '../components/Icons';

export default function NotFound() {
  useMeta('Not on the board | Arun Prasath P', 'This page does not exist.', '/404');
  return (
    <main id="main" className="page page--404">
      <div className="wrap">
        <div className="strip strip--self strip--void" data-ink="red">
          <div className="strip-holder" aria-hidden="true"><span>Unknown</span></div>
          <div className="self-call">
            <span className="strip-code" aria-hidden="true">404</span>
            <h1 className="self-name">Not on the board</h1>
            <p className="self-role">No strip matches this address. It may have been renamed.</p>
          </div>
          <div className="void-act">
            <Link to="/" className="btn btn--ink">Back to the board <Arrow /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
