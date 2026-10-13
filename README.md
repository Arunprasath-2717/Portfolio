# Arun Prasath P, portfolio

Vite + React 19 + TypeScript single-page site with GSAP/Lenis motion and a mailto contact form.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

## Edit content

Every word on the site lives in `src/content.ts`:

- `PROFILE`: name, role, email, social links, `resume` (put a PDF in `public/` and set `'/resume.pdf'`).
- `FLAGSHIPS`: the four case-study projects (routes `/work/<slug>`).
- `WORKS`: every project on the board.
- `RAIL`: education, internships and events. `CAPABILITIES`, `CERTS`: skills and certifications.

Interactive case-study demos are in `src/demos/Demos.tsx`. Design rules are in `DESIGN.md`.

## Contact

The contact form has no backend. Submitting it opens the visitor's mail app with a pre-filled `mailto:` to `arunprasath6035@gmail.com` (set in `PROFILE.email`). A "Copy email" button is the fallback for visitors without a mail app. No env vars or secrets are needed.

## Deploy (Vercel) on www.arunprasath.me

1. Import the repo in Vercel (framework preset: Vite). No environment variables are required.
2. Project, Settings, Domains: add `www.arunprasath.me` and `arunprasath.me` (redirect the apex to `www`).
3. At your domain registrar, add the DNS records Vercel shows (typically `CNAME www -> cname.vercel-dns.com` and an `A` record for the apex).

The canonical URL is set in `index.html`, `src/lib/meta.ts`, `public/robots.txt` and `public/sitemap.xml`.
