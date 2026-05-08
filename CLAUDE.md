# Ground Work Therapy — Project Brief for Claude

## What this is

A private practice website for a licensed therapist. The site is a single-page Next.js app deployed to Vercel with a Supabase backend for contact form submissions.

**Live at:** `/` (single route, fully scroll-based navigation)
**Repo location:** `~/Downloads/groundwork-therapy-website`

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | GSAP + ScrollTrigger (scroll-based), Framer Motion (interactive) |
| Backend | Supabase (contact form submissions) |
| Fonts | Playfair Display (headings/serif), Geist (body) — both via `next/font/google` |
| Hosting | Vercel |

---

## Design language

The aesthetic is inspired by [jaytrang.com](https://www.jaytrang.com/) — dark, minimal, lots of whitespace, confident typography. Key rules:

- **Dark sections** use `linear-gradient(135deg, #0d1f20 → #1a3035 → #142828 → #0a1818)` — this exact gradient is used in Hero, Consultation, and Footer. Don't change it.
- **Light sections** alternate between `var(--warm-white)` (#FDFAF6) and `var(--cream)` (#F7F0E8).
- **Headings** always use `fontFamily: "var(--font-playfair)"`. First line is regular weight, second line is italic and slightly muted (`text-white/70` on dark, `text-[var(--text-mid)]` on light).
- **Section labels** (the small eyebrow text above every heading) are `text-xs uppercase tracking-[0.25em] text-[var(--teal-light)]`.
- **Buttons** use rounded-full pill shape. Primary: `bg-[var(--teal-deep)] text-white`. Outline: `border border-[var(--teal-deep)] text-[var(--teal-deep)]`. On dark backgrounds the outline button uses `border-white/40 text-white hover:bg-white hover:text-[var(--teal-deep)]`.
- **No drop shadows, no gradients on cards, no border-radius inconsistency.** Sections use `rounded-2xl` or `rounded-3xl` only where necessary.

### Color tokens (defined in `src/app/globals.css`)

```
--cream:        #F7F0E8
--cream-dark:   #EDE4D8
--teal-deep:    #1D4D4F
--teal-mid:     #2D6B6E
--teal-light:   #4A9B9E
--warm-white:   #FDFAF6
--text-dark:    #1A2E2E
--text-mid:     #3D5A5B
--text-light:   #6B8F8F
--gold:         #C4A96B
--gold-light:   #E8D5A3
```

---

## File structure

```
src/
├── app/
│   ├── globals.css          # CSS variables + scrollbar + base styles
│   ├── layout.tsx           # Metadata, Playfair + Geist fonts
│   └── page.tsx             # Assembles all sections in order
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Dark full-screen, GSAP stagger, "Where insight / becomes change."
│   │   ├── About.tsx        # Two-column: pull quote left, bio + photo placeholder right
│   │   ├── Approach.tsx     # Numbered list rows (01 ACT, 02 CBT, 03 DBT)
│   │   ├── Services.tsx     # Pill card grid with Framer Motion layoutId expand animation
│   │   ├── Consultation.tsx # Dark section, "Is This You?" numbered trait list
│   │   └── Contact.tsx      # Two-column: heading left, form right (Supabase)
│   └── ui/
│       ├── NavBar.tsx       # Fixed, transparent-on-dark, adapts color on scroll
│       └── Footer.tsx       # Dark, minimal three-column
├── lib/
│   ├── content.ts           # SERVICES array + NAV_LINKS — edit here to change copy
│   └── supabase.ts          # Supabase client + submitContactForm()
supabase/
└── migrations/
    └── 001_contact_submissions.sql
```

---

## Section order (top → bottom)

1. **NavBar** — fixed overlay, not part of scroll flow
2. **Hero** — dark, full viewport
3. **About** — light (warm-white)
4. **Approach** — light (cream)
5. **Services** — light (warm-white)
6. **Consultation** — dark (same gradient as Hero)
7. **Contact** — light (cream)
8. **Footer** — dark (#0a1818)

---

## Animation patterns

### GSAP (scroll-triggered reveals)
Every section uses `gsap.context()` with `ScrollTrigger`. The standard pattern:
```ts
gsap.fromTo(el, { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: el, start: "top 75%" }
})
```
Elements that are animated by GSAP **must start with `className="opacity-0"`** or GSAP will flash them visible before animating.

### Framer Motion (interactive)
- **Services cards** use `layoutId` for a shared-element expand animation. When a pill card is clicked, Framer Motion morphs it from its grid position to a centered overlay. This is in `Services.tsx` — don't replace it with a flip or modal, the layoutId morph is intentional.
- **NavBar** entrance uses `motion.nav` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`.
- **Contact form** success state uses `AnimatePresence` + `motion.div`.

---

## Content / copy

All editable content lives in **`src/lib/content.ts`**:

```ts
SERVICES = [
  { id, title, subtitle, description, imageSrc, color }
  // 5 entries: act, cbt, dbt, trauma, anxiety
]

NAV_LINKS = [
  { label, href }  // href = "#section-id"
]
```

Bio copy, credentials, and ideal client traits are hardcoded in their respective section components. To update:
- Therapist bio → `About.tsx`
- ACT/CBT/DBT descriptions → `Approach.tsx` (`PILLARS` array at top of file)
- "Is This You?" list → `Consultation.tsx` (`IDEAL_TRAITS` array)

---

## Supabase setup

The contact form inserts into a `contact_submissions` table. To set this up on a new Supabase project:

1. Run `supabase/migrations/001_contact_submissions.sql` in the SQL editor.
2. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Add those same env vars to the Vercel project settings.

The table has RLS enabled: anonymous users can only INSERT, authenticated users can SELECT. The therapist can read submissions by logging in via the Supabase dashboard.

---

## What's not done yet (known TODOs)

- **Therapist photo** — placeholder exists in `About.tsx`. Drop the real photo at `public/images/therapist.jpg` and replace the placeholder div with `<Image src="/images/therapist.jpg" alt="..." fill className="object-cover" />`.
- **Service card images** — the pill cards use solid teal color blocks. Real photos go in `public/images/{act,cbt,dbt,trauma,anxiety}.jpg`. In `Services.tsx`, add an `<Image>` with `fill` and `object-cover` inside the card and overlay the gradient on top.
- **Booking link** — the "Book a Session" button in the Services overlay and "Schedule Free Consult" in Consultation scroll to `#contact`. If the therapist uses SimplePractice, Jane App, or another scheduler, replace those with the direct booking URL.
- **Domain** — connect in Vercel project settings once purchased.
- **Therapist's name** — not on the site yet. Add it to the About section once confirmed.
- **License number** — California requires therapists to display their license number. Add it to the Footer once known.

---

## Running locally

```bash
cd ~/Downloads/groundwork-therapy-website
npm install
cp .env.local.example .env.local   # fill in Supabase keys
npm run dev                          # http://localhost:3000
```

```bash
npm run build   # production build check
```

---

## Deploy to Vercel

```bash
vercel                  # preview deploy
vercel --prod           # production
```

Or connect the GitHub repo to Vercel for automatic deploys on push. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel dashboard under Environment Variables.
