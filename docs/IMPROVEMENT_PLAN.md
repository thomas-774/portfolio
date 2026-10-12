# Portfolio Improvement Plan

The site stays fully static (Vite + React on Vercel's free plan): no backend and no database.
The contact form keeps using Formspree.

---

## Phase 1: Content

### 1.1 Add a "Backend" skills card
`src/data/skills.js`: add a new card right after "Frontend" (WEB):

| name        | tool            |
|-------------|-----------------|
| Node.js     | Express         |
| PHP         | Laravel         |
| REST APIs   | Design / JSON   |
| Auth        | Sanctum / JWT   |

- Change the existing **Databases** card to real engines: `MySQL`, `MongoDB`, `SQL`, `DB Design`. Both Teby (MySQL) and Rove (MongoDB) show you use them.
- Optionally add a **Testing / Quality** row (Pest, Vitest, CI), because Teby really uses these tools and recruiters notice them.
- `App.css` colours each card with `:nth-child(1..6)`. A 7th card would get no colour, so add a rule for `nth-child(7)` (or move the colour into the data as a CSS variable).

### 1.2 Add Teby as project #1
`src/data/projects.js`: insert at the top:

```js
{
  id: 'teby',
  tag: 'SaaS · Full-Stack',
  title: 'Teby\nClinic Management',
  description:
    'A clinic management SaaS for doctors: patient profiles and medical history, visits and payments with installments, online booking with automatic slot generation, and printable prescriptions with PDF/Word export. Bilingual Arabic/English (RTL) and audited against WCAG 2.1 AA.',
  tech: ['React', 'Laravel 13', 'PHP 8.3', 'MySQL', 'Sanctum', 'TanStack Query', 'Tailwind', 'i18next'],
  link: 'https://github.com/thomas-774/clinic-management',
  linkLabel: 'View on GitHub',
  liveLink: 'https://teby-demo.vercel.app/login',
  liveLabel: 'Live Demo',
  media: { type: 'video', src: '/promo-video-ar.mp4', poster: '/posters/teby.webp' }
}
```

- If the demo has a test account, show its email and password on the card (for example "Demo: demo@teby.app / ••••"). Recruiters will not sign up just to look.
- Update `profile.stats` to "6+ Projects delivered".

### 1.3 Required refactor: make WorkCard read its media from data
`WorkCard.jsx` currently picks the media by **index** (`index === 0 → rove.mp4`, `1 → movie.mp4`, …).
Adding Teby first would shift every video onto the wrong project.
- Add a `media` field (`{ type: 'video' | 'image', src, poster }`) to every project.
- Replace the `index === …` chain with one `<video>` or `<img>` built from `project.media`.
- Use one `videoRef` instead of three.

---

## Phase 2: Skills section (horizontal scroll + remove the blue block)

### What causes the blue block
In `SkillsSection.jsx`:
```js
wrapper.style.height = `${distance}px`   // e.g. ~1800px
```
`.services-wire-track` is `position: absolute`, so the wrapper is sized by the **scroll distance** instead of the cards' height. `pin: true` + `pinSpacing: true` then adds the same distance **again** as padding. The result is a large empty area of `--bg` (blue) after the cards.

### Fix
1. Remove `wrapper.style.height = ...`.
2. Make the track `position: relative` (in normal flow) so the wrapper's height equals the cards' height. Use a small fixed top padding for the "wire".
3. Pin the **whole section** (`.services`) instead of the wrapper, so the "Skills" title stays visible while the cards slide.
4. Calculate the distance as `track.scrollWidth - window.innerWidth` and use `end: () => '+=' + distance()` with `invalidateOnRefresh: true`, so it stays correct after a resize. Remove the manual resize listener; ScrollTrigger already handles resize.
5. Remove `html { scroll-behavior: smooth }` from `App.css`. It conflicts with ScrollTrigger pinning and causes jumps.

### Animation improvements
- `scrub: 0.6` (smoother than 1, still responsive).
- Use `containerAnimation` so each card swings gently (`rotation: ±4deg → 0`) as it reaches the centre. This makes the "hanging on a wire" metaphor move.
- Add a thin progress bar under the wire, driven by the same ScrollTrigger.
- `snap: 1 / (cards - 1)` so scrolling always stops on a whole card.
- Use `gsap.matchMedia()`:
  - **Desktop (≥ 768px):** pinned horizontal scroll as above.
  - **Mobile / touch:** no pin. Use native horizontal swipe with `overflow-x: auto; scroll-snap-type: x mandatory`. Pinning on mobile feels heavy and fights the address bar resize.
  - **`prefers-reduced-motion`:** no pin and no swing. Show a plain swipeable row.
- Move the hover lift from GSAP (`SkillCard` handlers) to a CSS `:hover` transition. It does the same thing with less JS.

---

## Phase 3: Performance (the biggest wins)

Current payload: **~46 MB of video**, **~4.7 MB of images**, 342 KB JS.

### 3.1 Videos (most important)
| file | now | target |
|---|---|---|
| movie.mp4 | 16.6 MB | ~1.5 MB |
| promo-video-ar.mp4 | 13.5 MB | ~2 MB |
| rove.mp4 | 9.9 MB | ~1.5 MB |
| GPA.mp4 | 5.7 MB | ~0.8 MB |

- Re-encode to 720p, H.264, CRF 28, no audio, `+faststart`; optionally also export WebM/AV1:
  ```bash
  ffmpeg -i in.mp4 -vf "scale=-2:720,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart out.mp4
  ffmpeg -i in.mp4 -vf "scale=-2:720,fps=30" -c:v libvpx-vp9 -crf 38 -b:v 0 -an out.webm
  ```
  (ffmpeg is not installed on this machine yet: `choco install ffmpeg` or `winget install ffmpeg`.)
- Shorten each clip to an 8–15 s loop. A card preview does not need the full demo.
- Add a **poster image** (the first frame, as WebP) to every video.
- Use `preload="none"` and set `src` only when the card is near the viewport (an IntersectionObserver with `rootMargin: '200px'`). Right now every `<video src>` starts downloading on page load.

### 3.2 Images
- `photo.png` (476 KB, hero / LCP image) → WebP/AVIF at the size it is shown (~600px), about 40–60 KB. Add `fetchpriority="high"` and `width`/`height`.
- `e-commer.png` 1.6 MB → WebP about 100 KB, `loading="lazy"`.
- `logo 4.png` (nav, 278 KB) → SVG or a 64px WebP (about 3 KB).
- Favicon `logo 2.png` (286 KB) → use the existing `favicon.svg`, or a 32px PNG.
- `abuot.jpeg` → WebP with `loading="lazy"`; rename it to `about.webp`.
- Delete unused files: `logo.png`, `logo 3.png`, `about 2.jpeg`, `icons.svg`, `src/assets/*`. Vercel uploads the whole `public/` folder.
- Replace spaces in file names (`logo%204.png`) with dashes.

### 3.3 Fonts
- Self-host the fonts with `@fontsource/inter` and `@fontsource/dm-serif-display`, so there is no render-blocking request to Google. If you keep Google Fonts, at least add `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com`.
- Load only the font weights you use (400/500/600).

### 3.4 JavaScript
- Register GSAP plugins once (`src/lib/gsap.js`) instead of in every file. Remove the unused `TextPlugin`.
- Use `useGSAP` (`@gsap/react`) or `gsap.context()` for cleanup. This is safer under StrictMode.
- `Navbar`: replace the scroll listener that calls `getBoundingClientRect` on every scroll with an IntersectionObserver.
- `Cursor`: don't run the rAF loop on touch devices (`matchMedia('(pointer: fine)')`), and pause it when the mouse is idle. Use `transform: translate3d` instead of `left`/`top` (no layout work).
- Lazy-load below-the-fold sections (`About`, `Contact`, `Footer`) with `React.lazy`, so the first paint only needs Hero + Work.
- `vite.config.js`: `build.rollupOptions.output.manualChunks` → put `gsap` in its own chunk so the browser caches it separately.

### 3.5 Vercel config (free plan)
Add a `vercel.json` with long cache headers for hashed assets and media:
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)\\.(mp4|webm|webp|avif|png|jpg|svg)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000" }] }
  ]
}
```
Also turn on **Vercel Speed Insights** (free) to measure real-user results.

**Target:** Lighthouse Performance ≥ 95 on mobile, LCP < 1.8 s, total first-load size < 1 MB.

---

## Phase 4: Other things worth improving

1. **Contact form feedback.** It has no "sending…", "sent ✓" or error state, and the button stays clickable. Add a status state, and disable the button while it sends. Formspree still works on Vercel free.
2. **SEO and sharing.** Add a meta `description`, Open Graph and Twitter tags, and an `og-image.png` (1200×630), so links shared on LinkedIn or WhatsApp show a preview card. Add JSON-LD `Person` schema.
3. **Download CV button** in the hero or navbar (`/Thomas-Sameh-CV.pdf` in `public/`). This is the main thing a recruiter looks for.
4. **Clickable phone number.** Use `<a href="tel:+201551001938">` and a WhatsApp link, instead of a plain `<span>`.
5. **Accessibility.**
   - Respect `prefers-reduced-motion` everywhere (the hero char animation, the work-card stacking, the skills section).
   - Projects 2–4 start at `opacity: 0`. If JS fails or loads slowly, they stay invisible. Prefer `gsap.from` with a CSS fallback.
   - Give real `alt` text to the about image and the project images.
   - The hidden custom cursor must not remove the normal cursor on touch devices or for keyboard users.
6. **Cursor hover bug.** `Cursor.jsx` attaches listeners only to elements that exist when it mounts. Use event delegation (`document` + `closest('a,button')`).
7. **Hero letters under StrictMode.** The greeting is split with `innerHTML` in an effect. Render the letters as JSX spans instead: it is cleaner and safe when the effect runs twice.
8. **`#root { overflow: hidden }`** can break `position: sticky` and cause pinning bugs. Use `overflow-x: clip` on `body` instead.
9. **Stale content.** Change the "2+ Year coding" label to "Years". Change the footer `© 2026` to `new Date().getFullYear()`. Rename `abuot.jpeg`.
10. **Project card extras (optional).** Add a short "My role / Highlights" list for Teby, for example: "Bilingual RTL UI", "Automatic slot generation", "PDF/Word export", "CI with tests". Highlights like these help a project stand out in a CV.

---

## Suggested order of work
1. Phase 1.3 refactor → 1.2 add Teby → 1.1 Backend skills *(content first, small risk)*
2. Phase 2 skills fix *(the visible bug)*
3. Phase 3.1 + 3.2 media compression *(about 90% of the speed gain)*
4. Phases 3.3–3.5, then Phase 4

Check after each step: `npm run build && npm run preview`, then run Lighthouse in Chrome DevTools (mobile).
