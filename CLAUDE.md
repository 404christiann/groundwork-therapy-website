# Ground Work Therapy — Project Brief for Claude

## What this is

Single-page private practice site for **Tiffany Venegas, LCSW #130210**, a telehealth therapist for teens and adults in California. Next.js on Vercel, with a Supabase table for contact form submissions.

- **Production:** https://groundwork-therapy-website.vercel.app (pushes to `main` auto-deploy via Vercel)
- **Remote:** `https://github.com/404christiann/groundwork-therapy-website.git`
- **Checkout:** `~/Downloads/groundwork-therapy-website` (ignore the older sibling `groundwork-therapy-holistic` checkout)

`HANDOFF.md` (local-only) is the detailed log of approved design decisions, verification history and release state. Read it before design or release work. `AGENTS.md`: this Next.js version has breaking changes, so read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.5 (App Router, TypeScript, Turbopack), React 19 |
| Styling | Tailwind CSS v4, but most styling is named CSS classes in `src/app/globals.css` |
| Animation | GSAP + ScrollTrigger (scroll reveals, Specialities card stack), Framer Motion (accordions, tabs, menu, form) |
| Icons | `lucide-react` (Consultation accordion) |
| Backend | Supabase (`contact_submissions` insert only) |
| Fonts | Newsreader 300 (display headings, wordmark), Nunito (body/UI), Jost (loaded in `layout.tsx` but `--font-jost` is currently unused), all via `next/font/google` |

`page.tsx` is a client component that renders every section.

---

## Approved design (don't change without a request)

- **Palette** (tokens in `globals.css`): cream page `--studio`/`--ivory` `#FEF7ED`, secondary panels `--sand` `#F5EBDD`, text `--charcoal` `#2A2B2F`, accent `--accent` Sunshine `#FFD43B`, small accent text `--accent-ink` `#785500`.
- **Hero** uses its own photo gray `#DCD2D0`; the mobile header matches it until 80px of scroll, then turns cream.
- **Footer** is `#E2725B` with white text and white logo.
- Filled accent buttons use **white text on yellow**. The user chose this knowingly: it's low-contrast, so don't claim otherwise or silently change it.
- Legacy token names (`--teal-*`, `--cream`, `--warm-white`, `--gold`, `--font-playfair`) are aliases to the current palette and Newsreader. They are **not** instructions to restore the old teal/Playfair design.
- **Brand:** `src/components/ui/BrandWordmark.tsx` ("Ground Work" plus small spaced "THERAPY" with flanking lines) and the tree mark `/images/mark-ink.png`. The favicon and `src/app/icon.png` use the tree mark.
- **Hero heading:** `Where insight` / italic `becomes change.`, and the second line must stay on one line, including mobile.
- The six "Is this you?" accordion rows stay neutral (white icon circles, charcoal strokes). The user excluded them from accent recoloring.
- **Specialities:** six colored cards with illustrations, images `object-fit: cover` at every width (the `contain` experiment was rejected).
- **Mobile Approach:** a tabbed gallery below 900px, with artwork intentionally `contain`.
- **Photos:** don't recompress, regenerate or swap `public/images/groundWorkTherapyHome.jpg` (hero, `unoptimized`) or `groundWorkTherapyAbout.jpg`.
- **Clinical content:** don't invent clinical claims, credentials, rates or licensing details.

---

## Section order (`src/app/page.tsx`)

| # | Component | Anchor | Notes |
|---|---|---|---|
| — | `ui/NavBar.tsx` | — | Desktop floating "island" that compacts on scroll; mobile sticky header plus full-screen menu with focus trap, Escape and scroll lock |
| 1 | `sections/Hero.tsx` | — | Portrait with gradient mask, GSAP word reveal, "Let's connect" → `#contact` |
| 2 | `sections/Consultation.tsx` | — | "Is this you?" `IDEAL_TRAITS` accordion (lucide icons) plus image gallery |
| 3 | `sections/About.tsx` | `#about` | Photo, bio, `CREDENTIALS` array |
| 4 | `sections/Approach.tsx` | `#approach` | `PILLARS` (Resilience / Presence / Connection); desktop layout plus mobile tab gallery |
| 5 | `sections/Services.tsx` | `#services` | Labeled "Specialities"; its own 6-item `SERVICES` array; GSAP sticky card stack |
| 6 | `sections/FAQ.tsx` | `#faq` | `FAQS` accordion (rates, insurance/superbill, telehealth, Good Faith Estimate) |
| 7 | `sections/Contact.tsx` | `#contact` | Form → Supabase |
| 8 | `ui/Footer.tsx` | — | Brand, license card, nav, 988 crisis line |

- `section[id]` has `scroll-margin-top: 96px`, and every nav destination should land about 96px below the top. Keep these IDs stable.
- Nav labels come from `NAV_LINKS` in `src/lib/content.ts`; "Specialities" maps to `#services`.

---

## Where copy lives

Most copy is hardcoded in the component that renders it:

- `Consultation.tsx` → `IDEAL_TRAITS`, `GALLERY_IMAGES`
- `About.tsx` → `CREDENTIALS` and bio JSX
- `Approach.tsx` → `PILLARS`
- `Services.tsx` → `SERVICES` (the live Specialities content, colors, images in `public/images/stack-services/`)
- `FAQ.tsx` → `FAQS`
- `Contact.tsx` → `DETAILS`
- `src/lib/content.ts` → `NAV_LINKS` and a **legacy** 5-item `SERVICES` list. Only the Contact form's "Interested in" dropdown uses that legacy list, so the dropdown lacks Life Transitions. Its `imageSrc` paths are unused.

---

## Fragile behavior (preserve)

**Specialities stack (`Services.tsx` + `globals.css`):**
- `gsap.matchMedia` rebuilds the stack for compact/desktop and reduced-motion.
- Completed cards are hidden, exit travel is clamped, and the stack rebuilds itself when scrolling back up.
- A `ResizeObserver` and a measured fit check decide when the stack can't fit. Below 600px tall, or with reduced motion, the cards fall back to normal document flow.
- `.services-stack-section` uses `isolation: isolate; overflow: clip` so cards never paint over FAQ.

**Mobile menu (`NavBar.tsx`):**
- A pending-destination ref, focus restoration to the toggle with `preventScroll`, and scroll unlock on close.
- The active nav item tracks the *last* section containing the marker.

**Animation conventions:**
- GSAP-revealed elements start with `opacity-0` and use `gsap.context()` cleanup.
- Every animation has a `prefers-reduced-motion` branch.

---

## Supabase

- `src/lib/supabase.ts` creates the client from `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `Contact.tsx` imports it dynamically on submit.
- The migration is `supabase/migrations/001_contact_submissions.sql`.
- RLS: anyone can INSERT; any **authenticated** user can SELECT. That's only safe if public sign-ups are disabled on the Supabase project.
- There's no `.env.local` in the checkout by default, so copy `.env.local.example` to run the form locally.
- Never submit the real contact form during verification.

---

## Running and verifying

```bash
npm install
npm run dev     # http://localhost:3000 (port 3000 has served stale CSS before)
npm run lint
npm run build   # includes TypeScript; may need network access for Google Fonts, so don't swap fonts to avoid it
```

- Past handoffs used a production preview: `npm run build && npm run start -- --hostname 127.0.0.1 --port 3105`. Check who owns a listener (`lsof -nP -iTCP:3105 -sTCP:LISTEN`) before killing it.
- Typical browser matrix: 360×640, 390×844, 430×932, 768×1024, 844×390, 1440×900.
  - Check for horizontal overflow, all nav destinations, menu Escape/focus/scroll cleanup, Specialities into FAQ and back, and FAQ refresh.

---

## Git and release rules

- **Never commit, push or deploy without explicit approval.** `main` pushes go straight to production.
- Stage explicit paths only, never `git add -A`.
- These are **local-only** and stay unstaged:
  - `HANDOFF.md`, `MOBILE_DESIGN_HANDOFF.md`, the README change that links them
  - `design-previews/` (unselected proposals; don't integrate them)
  - `public/images/newlogo_newfont_white_solid-cropped.png`, `signature-3095-*.png`, `tree-only-white-transparent.png`
- After a release, confirm the Vercel deployment for that commit is `READY` and check the live site. A push alone doesn't prove it deployed.

---

## Not verified yet

- Physical-device Safari
- Reduced-motion emulation in a browser (reviewed in source only)
- A full accessibility audit
- A mobile performance audit

## Open content items

- **Booking:** every CTA (Hero, NavBar, Consultation, FAQ, Footer) scrolls to `#contact`. If the therapist adopts a scheduler (SimplePractice, Jane, etc.), swap in its URL.
- **Domain:** the only production URL on record is the `vercel.app` alias; connect a custom domain in Vercel when there is one.
