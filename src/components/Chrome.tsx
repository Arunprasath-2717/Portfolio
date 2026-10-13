import { useEffect, useState, type FormEvent } from 'react';
import { Link, useRouter } from '../lib/router';
import { LINKS, PROFILE } from '../content';
import { Arrow } from './Icons';
import { Magnet } from './fx/Motion';

const NAV = [
  { label: 'Work', to: '/#work' },
  { label: 'Path', to: '/#path' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Contact', to: '/#contact' },
];

export function Nav() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <Link to="/" className="nav-mark" aria-label="Arun Prasath P, home">
        <span className="nav-mark-holder" aria-hidden="true" />
        <span>AP</span>
      </Link>
      <nav aria-label="Primary" className="nav-links" id="nav-links" data-open={open}>
        {NAV.map((n) => (
          <Link key={n.label} to={n.to} className="nav-link" onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        {PROFILE.resume && <a className="nav-link" href={PROFILE.resume} download>Resume</a>}
        <Magnet className="mag mag--nav"><Link to={PROFILE.github} className="nav-link nav-link--ext">GitHub <Arrow dir="out" /></Link></Magnet>
      </nav>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Menu'}
      </button>
    </header>
  );
}

type Status = 'idle' | 'opened' | 'copied' | 'error';

// No backend: the form composes a pre-filled email and hands it to the visitor's mail app.
export function ContactStrip() {
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const name = data.name?.trim() ?? '';
    const message = data.message?.trim() ?? '';
    if (!name || message.length < 10) {
      setStatus('error');
      setMsg('Add your name and a message of at least 10 characters.');
      return;
    }
    const subject = data.subject?.trim() || `Hello from ${name}`;
    const body = `${message}\n\n- ${name}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('opened');
    setMsg(`Your mail app should open with the message ready. If nothing happened, email ${PROFILE.email}.`);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setStatus('copied');
      setMsg('Email address copied.');
    } catch {
      setStatus('error');
      setMsg(`Copy failed. The address is ${PROFILE.email}.`);
    }
  }

  return (
    <form className="strip strip--form" onSubmit={submit} noValidate>
      <div className="strip-holder strip-holder--ink" aria-hidden="true"><span>NEW</span></div>
      <div className="strip-body form-grid">
        <label className="field">
          <span className="field-k">Your name</span>
          <input name="name" autoComplete="name" required maxLength={80} enterKeyHint="next" />
        </label>
        <label className="field">
          <span className="field-k">Subject</span>
          <input name="subject" maxLength={120} placeholder="Internship opportunity" enterKeyHint="next" />
        </label>
        <label className="field field--wide">
          <span className="field-k">Message</span>
          <textarea name="message" rows={4} required maxLength={3000} placeholder="Role, team, or what you'd like to build" />
        </label>
        <div className="form-foot">
          <p className="form-status" role="status" aria-live="polite" data-state={status}>{msg}</p>
          <div className="form-acts">
            <button className="btn btn--ghost" type="button" onClick={copy}>Copy email</button>
            <Magnet className="mag"><button className="btn btn--ink" type="submit">Open in mail app <Arrow /></button></Magnet>
          </div>
        </div>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <div className="contact-head">
          <h2 id="contact-h" className="h-lg">Hiring for an internship? <em>Let's talk.</em></h2>
          <p className="board-copy">
            Writing here opens your mail app addressed to me. You can also find my code on GitHub, my problem-solving on LeetCode, and my background on LinkedIn.
          </p>
        </div>
        <ContactStrip />
        <ul className="link-rack" role="list">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.href} className="link-tag">
                <span className="link-tag-k">{l.label}</span>
                <span className="link-tag-v">{l.value}</span>
                <Arrow dir="out" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>{PROFILE.base}</span>
        </div>
      </div>
    </footer>
  );
}
