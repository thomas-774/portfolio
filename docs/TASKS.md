# Portfolio Tasks

Full details for each task are in [IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md).
The site stays static (Vercel free): no backend, no database.

## To do: needs something from you

- [ ] **Teby demo login on the card:** send the demo account email and password, if there is one
- [ ] **Vercel dashboard:** disconnect the project you don't use (`portfolio` / `portfolio-od1d`) so each push builds once (that project → Settings → Git → Disconnect)
- [ ] **Vercel dashboard:** turn on Speed Insights (project → Speed Insights → Enable). The code is already in the site
- [ ] **CV:** the portfolio link in the PDF points to `thomas-sameh-portfolio.netlify.app`; change it to the Vercel URL

## Done

- [x] Teby added as project #1 (repo, live demo, promo video)
- [x] Project media read from data (no more choosing by position)
- [x] Backend skills card; Databases card lists MySQL and MongoDB
- [x] Skills horizontal scroll fixed: the empty blue block is gone, the whole section is pinned, cards swing and snap, progress bar
- [x] Skills on mobile / reduced motion: native swipe instead of pinning
- [x] Project links turned into buttons (GitHub + Live Demo); cards fit on small screens; no stacking on phones
- [x] First-card "01" number opacity bug
- [x] Images converted to WebP, favicon shrunk, unused files deleted (including the "M.ADEL" favicon.svg)
- [x] Videos load only when their card is near the screen
- [x] Videos compressed (46 MB → 6.1 MB) with poster images
- [x] Fonts self-hosted (no Google Fonts request)
- [x] `vercel.json` cache headers
- [x] Cursor (transform-based, idle when still, off on touch) and navbar (IntersectionObserver) do less work
- [x] Removed `scroll-behavior: smooth` (it conflicted with the pinning)
- [x] Phase 4: contact form shows Sending… / Sent ✓ / an error message, and the button is disabled while sending
- [x] Phase 4: SEO and link previews (meta description, Open Graph + Twitter tags, `og-image.png` 1200×630, JSON-LD `Person`)
- [x] Phase 4: phone number is a `tel:` link, plus a WhatsApp button
- [x] Phase 4: `prefers-reduced-motion` respected in the hero, work cards (no stacking or parallax), section titles, about, stats, contact and cursor
- [x] Phase 4: nothing is hidden in CSS any more; animations set their start state in JS before the first paint, so content still shows if JS fails
- [x] Phase 4: hero letters rendered as JSX spans (with `aria-label` on the heading)
- [x] Phase 4: `#root { overflow: hidden }` removed; `body` uses `overflow-x: clip`
- [x] Phase 4: footer year uses `new Date().getFullYear()`
- [x] Optional: Teby "Highlights" checklist on the card (RTL UI, slot generation, PDF/Word export, CI with tests)
- [x] Optional: Testing / Quality skills card (Pest, Vitest, GitHub Actions, ESLint)
- [x] Optional: WebM versions of the videos (6.1 MB → 4.3 MB; MP4 kept as fallback)
- [x] Optional: GSAP plugins registered once in `src/lib/gsap.js`; all animations use `useGSAP` for cleanup
- [x] Optional: Vercel Speed Insights component added (`@vercel/speed-insights`)
- [x] Optional: Lighthouse mobile check: Performance 91 → 93, SEO 92 → 100, first load 363 KB → 262 KB (720px hero photo with `srcset`, posters load with their card, `robots.txt` + `sitemap.xml`)
- [x] Download CV button in the hero (`Thomas_Sameh_Fouad_Resume.pdf`, saved as `Thomas-Sameh-CV.pdf`)
- [x] Rove video cropped: browser tabs, address bar, scrollbar and taskbar removed (also smaller: 1.19 MB → 0.87 MB)
- [x] Colour contrast fixed (Lighthouse Accessibility 96 → 100): accent darkened slightly, section labels as orange pills, white text on tech pills, darker Live Demo green, clearer small text
- [x] Pushed and deployed: https://portfolio-od1d.vercel.app

**Result:** the first load went from 3.4 MB to 255 KB.
