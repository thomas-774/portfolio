# Portfolio Tasks

Full details for each task are in [IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md).
The site stays static (Vercel free): no backend, no database.

## To do: needs something from you

- [ ] **Teby demo login on the card:** send the demo account email and password, if there is one
- [ ] **Vercel dashboard:** disconnect the project you don't use (`portfolio` / `portfolio-od1d`) so each push builds once (that project → Settings → Git → Disconnect)
- [ ] **Vercel dashboard:** turn on Speed Insights (project → Speed Insights → Enable). The code is already in the site
- [ ] **CV:** the portfolio link in the PDF points to `thomas-sameh-portfolio.netlify.app`; change it to the Vercel URL

## To do: phone view

Full details for each task are in [MOBILE_PLAN.md](MOBILE_PLAN.md).

**Phase 1: fix what is broken**
- [x] 1.1 Page zooms out around Skills/About: the About photo starts at `x: 60` and makes the page 430px wide; also add `overflow-x: clip` on `html`
- [x] 1.2 Menu: solid full-screen overlay, links centred (not stuck at the bottom), `100dvh`, scroll lock, close on Escape / tap outside, `visibility: hidden` + `aria-expanded` when closed, "Let's Talk" inside the menu
- [x] 1.3 Navbar when scrolled: almost solid background on phones so text doesn't show through; a bit shorter
- [x] 1.4 Hero fits the first screen: `100svh`, smaller photo, "Download CV" visible without scrolling
- [x] 1.5 Skills cards: text at least 12px (now 8–10px), cards `78vw` so the next one peeks in
- [x] 1.6 Hover only on mouse (`@media (hover: hover)`), `:active` press feedback on touch
- [x] 1.7 Layout tidy-up: smaller gaps between sections, work media `aspect-ratio` instead of `30vh`, smaller "01" number, About text left-aligned, Contact buttons in 2 columns with the phone number readable, full-width Send button

**Phase 2: phone animations**
- [x] 2.1 Work cards: same stacking as desktop on phones (a card taller than the screen pins by its bottom edge, so nothing is cut off)
- [x] 2.2 Skills: same pinned sideways scroll as desktop on phones (cards swing, snap, progress bar)
- [x] 2.3 Navbar hides on scroll down / shows on scroll up; menu links slide in one by one; scroll progress bar
- [x] 2.4 Section titles: label pill pops in, title lines slide up from a mask
- [x] 2.5 Experience: bullets stagger in, timeline line draws down the card
- [x] 2.6 Hero: background circles drift (CSS), photo moves up and fades as you scroll away
- [x] 2.7 About: photo clip-path reveal (no sideways start), paragraphs fade up one by one
- [x] 2.8 Contact: buttons pop in with a stagger, inputs fade up, bounce when the message is sent

**Phase 3: reduced motion and testing**
- [x] 3.1 Reduced motion gets short opacity fades instead of nothing
- [ ] 3.1 Check on your phone whether *Remove animations* / *Reduce Motion* is on (it turns all animations off)
- [x] 3.2 Test at 360, 390, 430 and 768px wide, plus landscape: no sideways scroll, no zoom-out (headless Chrome with phone emulation: `scrollWidth === innerWidth` everywhere, "Download CV" above the fold from 360×740 up)
- [ ] 3.2 Test on a real phone (`npm run dev -- --host`) and with a 4× CPU slowdown; Lighthouse mobile Performance ≥ 90, CLS 0

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
