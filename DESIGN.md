---
name: Arun Prasath P Portfolio
description: A flight-progress strip board where every project is a paper strip racked by what it does.
colors:
  board: "#1c2521"
  board-raised: "#25302b"
  board-high: "#2e3a34"
  board-fg: "#e6e9de"
  board-muted: "#aab3a7"
  paper: "#efe7d2"
  paper-deep: "#e3d9bd"
  ink: "#17140e"
  ink-soft: "#4a4336"
  amber: "#e09a1f"
  cobalt: "#3156c2"
  red: "#c63a2c"
  board-glow: "#2a3732"
  amber-on-board: "#e09a1f"
  cobalt-on-board: "#8ea6ec"
  cobalt-on-dark: "#9fb4f0"
  red-on-board: "#ee8a7f"
  red-on-dark: "#f0897d"
  paper-on-dark: "#d9d0b9"
  placeholder: "#6f6655"
  status-ok: "#2f6b3a"
  status-ok-deep: "#23562d"
  status-error: "#9b2418"
  white: "#fff"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 8.6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)"
    fontWeight: 700
  body:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "0.95rem"
  caption:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, sans-serif"
    fontSize: "0.9rem"
  holder:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 700
  title-long-mobile:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.2rem, 11vw, 3rem)"
    fontWeight: 900
  label:
    fontFamily: "B612 Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  hairline: "2px"
  strip: "3px"
  card: "4px"
  logo: "6px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3vw, 2.5rem)"
  bay: "clamp(4.5rem, 10vw, 8.5rem)"
components:
  strip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.strip}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.4rem"
---

## Overview

The site is an air-traffic flight-progress board. A matte steel-green board holds buff paper strips. Each strip is one thing (a person, a project, a message) and sits in a colored holder that says what kind of thing it is. The tone is operational and exact: fields with labels, callsigns, nothing decorative that does not carry data.

## Colors

- Board greens are the environment only. Never put long reading text on paper-on-paper; paper strips sit on board.
- Holder inks are semantic, not decorative: amber means AI systems, cobalt means platforms, red means data studies. A strip's `data-ink` sets `--hot` and `--hot-fg` for its holder, chips and route curtain.
- On-board and on-dark tints are lightened versions of each ink so numerals and verdicts pass contrast on green. Status green and deep red are only for form and demo verdicts.
- Amber is also the single interactive accent on the board (focus, selection, primary nav link).

## Typography

- Big Shoulders Display, uppercase, for names and section titles only.
- Atkinson Hyperlegible Next for all running text.
- B612 Mono only for field keys, callsigns and data values, never for sentences.

## Layout

- Content uses the full viewport up to 120rem with a fluid `--gutter` (1rem to 5rem); sections are separated by `--bay`. The home header strip fills the first screen.
- At 80rem and wider, Path and Skills use a sticky left heading rail with content on the right, and the timeline runs in two columns. Root font size steps up at 100rem and 140rem.
- Touch devices get 44px minimum targets; hover-only motion is gated behind `(hover: hover)`.
- Strips are CSS grids: a 2.75rem holder column, then field columns using `minmax(0, 1fr)`. Below 48rem fields stack inside the strip; the holder stays.
- Case studies use a 1:2 heading-to-body grid that collapses to one column on mobile.

## Elevation & Depth

Flat board, with strips lifted by a single `--lift` shadow (inset top highlight plus a soft drop); a hovered flagship strip deepens the same drop. No glass. Blur appears only as a transient entrance state (headings, hero fields), never at rest.

## Shapes

Strips have a 3px radius like cut card stock. Buttons are full pills to read as physical tabs. Rules are 1px at 20% ink.

## Components

- Strip: holder + callsign box + name + labelled fields (`TAKES IN`, `DECIDES`, `STACK`).
- Board filter: pills that re-rack strips with GSAP Flip; reduced motion swaps instantly.
- Route curtain: a full-screen wipe in the destination strip's ink on internal navigation.
- Demo panel: each flagship case study has one interactive, clearly labelled illustrative demo.

## Motion

One focal moment per page, then quieter supporting motion. Everything is visible without JavaScript and every effect has a reduced-motion path (instant, no transform).

- Hero: the name flips in letter by letter like a split-flap departures board (anime.js `splitText`, accessible mode); field keys decode with `scrambleText`; remaining hero content fades up out of a 6px blur.
- Section headings: words rise out of an 8px blur with a 70ms stagger (Motion, React Bits BlurText pattern).
- Flagship strips: pointer-tracked 3D tilt (max 4deg) plus a soft-light spotlight; springs only, no per-frame React renders.
- Stack ticker: velocity marquee that drifts, speeds up and reverses with scroll; paused offscreen.
- Board filter: a shared-layout pill (`layoutId`) slides between filters; GSAP Flip re-racks the slots.
- Global: amber scroll-progress bar, click sparks on buttons and links, press scale 0.96, a corner-bracket target cursor on fine pointers only, magnetic primary actions.
- Only transform, opacity and short-lived filter are animated. Easing is exponential ease-out (`--ease`) or zero-bounce springs.

## Do's and Don'ts

- Do add new projects in `src/content.ts`; pick the ink by what the project does.
- Do keep every claim traceable to a repo README or resume.
- Don't show LeetCode metrics; link to the profile only.
- Don't add a personal photo.
- Don't introduce a fourth ink, gradients on paper, or emoji.
