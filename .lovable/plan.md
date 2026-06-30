## Goal

A single premium, cinematic one-page experience at `/` celebrating Madhu Mitha — dark-luxury aesthetic, Apple-inspired polish, smooth scroll storytelling, glassmorphism, and tasteful 3D.

## Experience flow (single route `/`)

1. **Intro / Cover scene** (full viewport, dark)
   - Dark gradient backdrop (near-black charcoal → deep plum) with ambient radial glow and slow drifting particle field.
   - Centerpiece: realistic 3D **wrapped gift sculpture** (R3F) — soft satin material, subtle ribbon, slow idle float + rotation, soft rim light and contact shadow.
   - Typography: "For Someone Truly Special" (serif display) above the sculpture; "Click to Begin" (tracked uppercase sans) below with a soft pulsing dot.
   - Click anywhere triggers cinematic transition: camera dolly-in toward the gift, light-ray sweep, particles streak, gentle white bloom → fade into act 2.

2. **Birthday hero reveal**
   - Full-screen dark section, soft golden god-rays, faint particles continuing.
   - Title: "Happy Birthday, Madhu Mitha ❤️" with staggered word reveal + subtle gold gradient text.
   - Paragraph as provided, fading in with gentle blur-to-focus.
   - Scroll indicator: thin animated line.

3. **Horizontal photo gallery**
   - Pinned section; vertical scroll drives horizontal translate via GSAP ScrollTrigger.
   - 6–8 placeholder portrait/landscape images, rounded-2xl, soft shadow, parallax depth on hover (tilt + scale).
   - Click opens fullscreen lightbox (Framer Motion shared layout, backdrop blur, prev/next, ESC/click to close).

4. **"Our Memories" timeline**
   - Vertical alternating cards (left/right) with a luminous vertical spine.
   - Each card: glass panel, small image, year chip, short caption — fade + slide in on scroll (Framer Motion `whileInView`).
   - Uses elegant placeholder captions (user didn't specify memories).

5. **Cake finale**
   - Minimal premium cake (CSS/SVG with subtle 3D shading — simpler and reliable, matches "minimal premium" brief).
   - State 1: unlit. Click → candles light (flame SVG with flicker animation, warm glow on cake).
   - State 2: lit. Click → flames blow out, smoke wisps rise (SVG path animation), distant soft fireworks (particle bursts in background), and final message fades in:
     "Happy Birthday once again, Madhu Mitha. May every new year of your life be even more beautiful than the last. ❤️"
   - Subtle footer credit line.

## Design system

- Palette (added as tokens in `src/styles.css` via `@theme inline`):
  - `--background` near-black `oklch(0.12 0.02 300)`
  - `--foreground` warm off-white `oklch(0.96 0.01 80)`
  - `--primary` champagne gold `oklch(0.82 0.12 85)`
  - `--accent` deep plum `oklch(0.35 0.09 350)`
  - `--muted` soft graphite, glass surfaces via `bg-white/5 backdrop-blur-xl border-white/10`
  - Gradient tokens: `--gradient-gold`, `--gradient-aurora`; shadow tokens: `--shadow-glow`, `--shadow-elegant`.
- Typography (via `@fontsource`):
  - Display: **Cormorant Garamond** (romantic serif) for hero titles.
  - Body/UI: **Inter Tight** for paragraphs and UI accents.
- Motion: Framer Motion for component reveals + lightbox; GSAP + ScrollTrigger for pinned horizontal gallery and cinematic intro→hero transition.
- Responsive: stacks on mobile (gallery becomes snap-scroll carousel; timeline becomes single column; 3D scene scales down with lower DPR).

## Technical plan

- Stack: TanStack Start (existing), React 19, Tailwind v4, Framer Motion, GSAP + ScrollTrigger, @react-three/fiber + @react-three/drei, @fontsource/cormorant-garamond, @fontsource/inter-tight.
- New files:
  - `src/routes/index.tsx` — orchestrates sections, manages intro→reveal state.
  - `src/components/birthday/IntroScene.tsx` — R3F canvas with gift sculpture, particles, lighting; click handler.
  - `src/components/birthday/GiftSculpture.tsx` — 3D gift mesh (box + ribbon + bow), idle float.
  - `src/components/birthday/ParticleField.tsx` — ambient particle system (R3F points).
  - `src/components/birthday/BirthdayHero.tsx` — title + message reveal.
  - `src/components/birthday/PhotoGallery.tsx` — GSAP horizontal scroll + Lightbox.
  - `src/components/birthday/Lightbox.tsx` — Framer Motion fullscreen viewer.
  - `src/components/birthday/MemoriesTimeline.tsx` — alternating cards.
  - `src/components/birthday/CakeFinale.tsx` — SVG cake, candle/flame/smoke states, fireworks, final message.
  - `src/components/birthday/Fireworks.tsx` — canvas/SVG particle bursts.
- Update `src/styles.css` — add new color/gradient/shadow tokens; import font CSS at top.
- Update root `head()` meta for SEO (title "Happy Birthday, Madhu Mitha", description, OG tags).
- Placeholder photos generated via `imagegen` (8 gallery + 4 timeline) — elegant, soft-lit, abstract/portrait silhouettes that match the luxury aesthetic without depicting a specific person; saved under `src/assets/`.
- Keep R3F scene SSR-safe: dynamic import / `ClientOnly` wrapper since `window`/WebGL is browser-only.
- Performance: lazy-load gallery and cake sections; lower DPR on mobile; pause R3F frameloop when intro is dismissed.

## Out of scope

- No backend, no auth, no analytics, no real photo upload UI (placeholders only per your answer).
- Specific timeline captions left as elegant generic copy (you can edit later).

## Acceptance

- Lands on dark intro with 3D gift + "Click to Begin"; click smoothly transitions to birthday hero.
- Scrolling reveals hero → horizontal gallery (pinned) → timeline → cake.
- Cake: click-to-light, click-to-blow-out with smoke + distant fireworks + final message.
- Smooth on desktop and mobile; no console errors; build passes.
