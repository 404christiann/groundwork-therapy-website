# Ground Work Therapy — Project Brief for Claude

## What this is

Single-page private practice site for **Tiffany Venegas, LCSW #130210**, a telehealth therapist for teens and adults in California. Next.js on Vercel. The contact form emails Tiffany through Resend.

- **Production:** https://www.tiffanyvenegaslcsw.com (domain bought and DNS managed in Vercel, team `404christianns-projects`; the `groundwork-therapy-website.vercel.app` alias still works). Pushes to `main` auto-deploy via Vercel.
- **Remote:** `https://github.com/404christiann/groundwork-therapy-website.git`
- **Checkout:** `~/Downloads/groundwork-therapy-website` (ignore the older sibling `groundwork-therapy-holistic` checkout)

`HANDOFF.md` (local-only) is the detailed log of approved design decisions, verification history and release state. Read it before design or release work. `AGENTS.md`: this Next.js version has breaking changes, so read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.5 (App Router, TypeScript, Turbopack), React 19 |
| Styling | Tailwind CSS v4, but most styling is named CSS classes in `src/app/globals.css` |
| Animation | GSAP + ScrollTrigger (scroll reveals), Framer Motion (accordions, tabs, menu, form, Specialities copy swap) |
| Icons | `lucide-react` (Consultation accordion) |
| Backend | `src/app/api/contact/route.ts` sends the form by email via Resend's REST API (no SDK). Supabase code remains but is unused: no Supabase project or env vars exist for this site |
| Fonts | Newsreader 300 (display headings, wordmark), Nunito (body/UI), Jost (loaded in `layout.tsx` but `--font-jost` is currently unused), all via `next/font/google` |

`page.tsx` is a client component that renders every section.

---

## Approved design (don't change without a request)

- **Palette** (tokens in `globals.css`): cream page `--studio`/`--ivory` `#FEF7ED`, secondary panels `--sand` `#F5EBDD`, text `--charcoal` `#2A2B2F`, accent `--accent` Sunshine `#FFD43B`, small accent text `--accent-ink` `#785500`.
- **Hero** uses its own photo gray `#DCD2D0`; the mobile header matches it until 80px of scroll, then turns cream.
- **Footer** is Dusty Plum `--footer` `#45323D` with white text and white logo, in the approved "Quiet Center" layout: one centred column (tree mark + lockup, tagline, nav, one-line license, 988 crisis pill, legal). The user asked for moderate white space, not the roomier preview, so keep the spacing in the `.site-footer` block of `globals.css`.
- **Filled buttons** (nav Connect, hero "Let’s connect" pill with arrow, mobile menu CTA, Consultation, FAQ, Contact submit, Specialities next arrow) are Dusty Plum `--button` `#6A4A5C` with cream `--button-ink` text, hovering to `--button-hover` `#553A49`. Plum also covers the About bio card (`--footer`) and the scrollbar thumb (`--button`). The page background stays cream.
- **Nav logos** (desktop, mobile header, open mobile menu) scroll back to the top of the landing page and clear any `#hash`. A plain `Link href="/"` is a no-op on this one-page site, so keep `handleLogoClick` / `scrollToLanding` in `NavBar.tsx`.
- Legacy token names (`--teal-*`, `--cream`, `--warm-white`, `--gold`, `--font-playfair`) are aliases to the current palette and Newsreader. They are **not** instructions to restore the old teal/Playfair design.
- **Brand:** the tree mark `/images/mark-ink.png` plus the name lockup in `src/components/ui/BrandWordmark.tsx`: "Tiffany Venegas" over a spaced "LCSW" with thin rules running to the name's edges. The favicon and `src/app/icon.png` use the tree mark.
  - LCSW is deliberately centred under the space between the two names, not the lockup's exact middle ("Venegas" is wider). The `--wm-shift` constant in `globals.css` (-0.183 × name size) was measured with the site's own fonts. Re-measure it if the name, font or tracking changes.
  - Each context sets its own `--wm-name` / `--wm-cred` sizes (desktop 31/9px, mobile 23/7px, footer 29/8.5px). The desktop word slot is fixed at 193.3px wide for the scroll collapse.
  - "Ground Work Therapy" still appears in the page title/Open Graph metadata and the About photo alt text. The footer copyright reads "Tiffany Venegas, LCSW".
- **Hero heading:** `Where insight` / italic `becomes change.`, and the second line must stay on one line, including mobile.
- **Every accent on the site is Dusty Plum** (site-wide audit, Nov 2026): buttons, eyebrows, counters, icons, plus signs, focus rings, glows, the highlighter and text selection. No `--accent` / `--accent-ink` (yellow, gold) remain in use; the legacy aliases `--teal-*`, `--gold` and `--text-light` now point at `--button`. Deliberately not plum: the six speciality card colours, the hero photo grey `#DCD2D0`, warm neutral shadows, and the red form-error text.
- **Accordion accents are Dusty Plum `--button`** (Nov 2026, replacing the earlier neutral rule): the "Is this you?" icons (no background circle) and plus signs, the FAQ and Approach plus signs, and the FAQ trigger focus ring. The "Common Questions" and "Get in Touch" eyebrows are plum too, as are the Contact checkmarks (detail list and "Message received"). The mobile menu's four links are plum as well. The highlighter under "you?", "want to know." and "what's possible?" (`.accent-highlight`) is the plum tint `--highlight` `#E6BCD4`; plain low opacity of `--button` read grey. Text selection uses `--highlight` too. The Approach section ("When the work starts to click.") uses plum for its plus signs, focus rings, background glow and the selected mobile gallery tab. Specialities uses plum for its "01 / 06" counter, the filled next arrow and the arrow focus rings; the six card colours stay as they are.
- **Specialities:** a loose deck of the six colored cards (chosen from four stageshow concepts, Nov 2026), dealt with arrow buttons, arrow keys or a swipe. Card images use `object-fit: cover` (the `contain` experiment was rejected). The filled arrow uses the plum `--button` tokens.
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
| 5 | `sections/Services.tsx` | `#services` | Labeled "Specialities"; its own 6-item `SERVICES` array; card deck with the copy beside the pile |
| 6 | `sections/FAQ.tsx` | `#faq` | `FAQS` accordion (rates, insurance/superbill, telehealth, Good Faith Estimate) |
| 7 | `sections/Contact.tsx` | `#contact` | One-step form → `/api/contact` → email: "What would you like support with?" (speciality menu + message), then "How can I reach you?" (name, email, optional phone), one Send |
| 8 | `ui/Footer.tsx` | — | Centred "Quiet Center" footer: brand (back to top), `NAV_LINKS` + Connect, license line, 988 crisis pill |

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
- `Contact.tsx` → `DETAILS` (the three facts) and `SPECIALITY_OPTIONS` (the speciality menu: plain-language line per option; list lives in `src/lib/content.ts` because the API route uses it too; `general` = "Not sure yet")
- `src/lib/content.ts` → `NAV_LINKS` and `SPECIALITY_OPTIONS` (shared by the form and the API route).

---

## Fragile behavior (preserve)

**Specialities deck (`Services.tsx` + `.deck-*` in `globals.css`):**
- The deck never pins or hijacks scroll. Next deals the top card away and it returns to the back, so the deck cycles; Previous slides the last card back on from the left (placed with no transition, then animated on the next frame).
- A `busy` ref ignores presses while a card is in flight (380ms). Under reduced motion the cards change with no travel.
- `.deck-text` / `.deck-desc` reserve room for the longest name and description so the arrow buttons never move between cards. Re-check that if copy gets longer.
- The card images set `draggable={false}`: a native image drag would cancel the swipe's pointer events.

**Mobile menu (`NavBar.tsx`):**
- A pending-destination ref, focus restoration to the toggle with `preventScroll`, and scroll unlock on close.
- The active nav item tracks the *last* section containing the marker.

**Contact form (`Contact.tsx` + `.contact-*` in `globals.css`):**
- Validation is in the component (`noValidate`): message, name and a valid email are required. Every field reserves a line for its error so nothing shifts, the first invalid field gets focus, and an error clears as soon as it's fixed.
- The speciality field is a custom listbox (button + `role="listbox"`), keyboard-complete (arrows, Home/End, Enter, Escape returns focus) and closes on outside click.
- Send has idle / sending / sent stacked in one place; on success the thank-you takes the card's box so the height doesn't jump. A failed submit shows "Something went wrong" and returns the button to idle.
- Never submit the real form while verifying. Test `/api/contact` with `CONTACT_TO_EMAIL=delivered@resend.dev` (Resend's test inbox).
- A hidden `website` field is a spam trap: if it's filled, the route returns success without sending.

**Animation conventions:**
- GSAP-revealed elements start with `opacity-0` and use `gsap.context()` cleanup.
- Every animation has a `prefers-reduced-motion` branch.

---

## Contact email (Resend)

- Resend account: Christian's. Domain `tiffanyvenegaslcsw.com` is verified there (DKIM `resend._domainkey`, `send` MX/TXT, `rsend` CNAME, all in Vercel DNS).
- Vercel env vars (production + preview): `RESEND_API_KEY` (sensitive, send-only key restricted to this domain) and `CONTACT_TO_EMAIL` (Tiffany's inbox). Missing either makes the route return 500 and the form show "Something went wrong".
- The route validates and trims fields itself, then sends a plain-text email: subject "New website message from {name}", reply-to the visitor.
- No copy of messages is stored anywhere except Resend's sent log. The old Supabase pieces (`src/lib/supabase.ts`, `supabase/migrations/`) are unused.

## Running and verifying

```bash
npm install
npm run dev     # http://localhost:3000 (port 3000 has served stale CSS before)
npm run lint
npm run build   # includes TypeScript; may need network access for Google Fonts, so don't swap fonts to avoid it
```

- Past handoffs used a production preview: `npm run build && npm run start -- --hostname 127.0.0.1 --port 3105`. Check who owns a listener (`lsof -nP -iTCP:3105 -sTCP:LISTEN`) before killing it.
- Typical browser matrix: 360×640, 390×844, 430×932, 768×1024, 844×390, 1440×900.
  - Check for horizontal overflow, all nav destinations, menu Escape/focus/scroll cleanup, dealing the Specialities deck forward and back, and FAQ refresh.

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
- **Email inbox:** the domain has no mailbox (no root MX records), so `@tiffanyvenegaslcsw.com` addresses can't receive mail. Form emails come from `website@tiffanyvenegaslcsw.com` with reply-to set to the visitor.
