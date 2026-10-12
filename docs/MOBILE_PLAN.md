# Phone View Plan

The site was checked at 390×844 (iPhone 14 size) in Chrome with phone emulation, scrolling section by section.
Tasks are in [TASKS.md](TASKS.md) under "To do: phone view".

**Why the phone feels broken and flat:**
1. Around Skills and About the page becomes **430px wide on a 390px screen**, so the browser zooms the whole site out. The navbar moves sideways and "Let's Talk" gets cut off.
2. The best animations (work card stacking, pinned Skills with swinging cards) only run at `min-width: 768/769px`. On phones they are switched off and **nothing replaces them**, so the phone gets only simple fades.
3. If the phone has *Remove animations* / battery saver on, `prefers-reduced-motion` is true and the site runs **no animation at all**.

Rules for every animation below:
- Animate only `transform` and `opacity` (and `clip-path` for reveals). No `box-shadow`, `border-radius`, `width` or `top`.
- Phone code goes in `gsap.matchMedia()` under `(max-width: 768px) and (prefers-reduced-motion: no-preference)` so it is cleaned up when the query stops matching.
- Never start an element off to the side (`x: 60`). On a phone, a start state that sticks out widens the page (see 1.1).
- No pinning on phones: cards are taller than the screen.

---

## Phase 1: Fix what is broken

### 1.1 Page zooms out / slides sideways (the biggest bug)
`AboutVisual.jsx` starts the photo at `x: 60`. Until the animation plays, the photo sticks 40px past the right edge, so `scrollWidth` becomes 430 and mobile Chrome zooms out to fit.
Measured: `document.documentElement.scrollWidth` = 390 at Hero/Work/Experience, **430 at Skills and About**, 390 at Contact.
- Animate the photo with `y` or a `clip-path` reveal instead of `x` (see 2.7).
- Safety net: `overflow-x: clip` on `html` as well as `body`. `body` alone does not stop mobile browsers from zooming out.
- Check: `scrollWidth === innerWidth` at every section.

### 1.2 Mobile menu
The open menu (screenshot check):
- The panel is 95% opaque with blur, so the hero text shows through the links.
- The links use `justify-content: flex-end`, so they sit at the bottom. "Contact" touches the bottom edge, and on iPhone `100vh` puts it behind the Safari toolbar.
- "Let's Talk" stays behind the panel; the rest of the page still scrolls and still takes taps.
- While closed, the menu is only moved off-screen, so keyboard and screen readers still reach the links.

Fix:
- Full-screen solid overlay (`height: 100dvh`), links centred, bigger tap targets (min 48px tall).
- Lock page scroll while open; close on a link tap, on Escape, or on a tap outside.
- Closed state: `visibility: hidden` (or `inert`); add `aria-expanded` and `aria-controls` to the button.
- Move "Let's Talk" inside the menu on phones, or hide it under 380px.

### 1.3 Navbar when scrolled
`nav.scrolled` is 75% opaque, so section text shows behind the logo and the menu button (Experience and About screenshots).
- On phones: almost solid background, less padding (64px tall instead of 72).
- Hide-on-scroll is in 2.3.

### 1.4 Hero does not fit the first screen
On 390×844 the photo comes first at 360px wide, then "THOMAS", then the white card. **"Download CV" is below the fold.**
- `min-height: 100svh` instead of `100vh` (the iPhone toolbar).
- Photo max height about `38svh`; tighter gap between photo, name and card.
- Goal: name, short intro and the CV button visible without scrolling on a 360×740 phone.

### 1.5 Skills cards text is too small
At `max-width: 1024px`: `.service-hang-skill-name` is **8px**, `.service-hang-skill-tool` **9px**, labels 10px. Unreadable on a phone.
- At least 12px for skill names and tools, 11px for the small uppercase labels.
- Card width `78vw` (max 300px) so one card fits with the next one peeking in. That shows people they can swipe.

### 1.6 Hover effects stick after a tap
On touch screens `:hover` stays after a tap: the work card lifts, tech pills, skill cards (`translateY(-6px)`), contact buttons, CV button.
- Wrap all hover rules in `@media (hover: hover)`.
- Add `:active` press feedback for touch (`scale(.97)`), and `-webkit-tap-highlight-color: transparent`.

### 1.7 Layout tidy-up
- **Spacing:** big empty blue gaps between sections (section padding plus header padding). Tighten them on phones.
- **Work cards:** the media is a fixed `30vh`, so desktop screenshots (Rove, E-Commerce) are tiny and cropped. Use `aspect-ratio: 16 / 10`. The big faint "01" number sits behind the title; make it smaller and put it top-right.
- **About:** long paragraphs are centred, which is hard to read. Left-align the body text on phones. Limit the photo height.
- **Contact:** the 3+2 grid leaves a lonely 5th button, and the phone number is 10.5px. Use 2 columns, with the phone number as a full-width row at normal size.
- **Contact "Send Message":** full width on phones.

---

## Phase 2: Phone animations

Each item replaces something that only desktop has today, or adds feedback that touch screens need.

### 2.1 Work cards: scroll-driven "rise" (replaces the stacking)
In `WorkSection.jsx` add a phone `mm.add(...)` next to the desktop one:
- Each card goes from `scale: 0.92, opacity: .6` to `scale: 1, opacity: 1` with `scrub` as it enters (`start: 'top bottom'`, `end: 'top 60%'`).
- The media reveals with `clip-path: inset(0 0 100% 0)` → `inset(0)`, and the video/image zooms from `1.15` to `1`.
- The card you are leaving shrinks a little (`scale: .96`, `opacity: .7`) as it scrolls off the top, which feels like the desktop stack.
- Keep the existing staggered text reveal (tag → title → desc → pills → buttons), but make it faster on phones.

### 2.2 Skills: bring the hanging wire to touch (replaces the pin)
In `SkillsSection.jsx` the native-swipe path already has a scroll listener. Add:
- **Swing on swipe:** read the swipe speed from `wrapper.scrollLeft` changes and feed the same `gsap.quickTo(cards, 'rotation')` used on desktop, so the cards sway and settle with `elastic.out`.
- **Drop in:** when the section enters, the cards drop from the wire (`y: -60`, `rotation: -8`, stagger 0.08, `elastic.out(1, .5)`).
- **Swipe hint:** once, the track nudges 40px left and back, and a small "Swipe →" label fades out after the first swipe.

### 2.3 Navbar
- Hide on scroll down, show on scroll up (`yPercent: -100` / `0`, 0.3s). This gives the content more room.
- Menu open: the overlay fades in, the links slide up one by one (stagger 0.05), and "Let's Talk" comes last. Reverse on close.
- Thin accent **scroll progress bar** under the navbar (`scaleX` scrubbed to page progress).

### 2.4 Section titles
`SectionHeader.jsx`: the orange label pill pops in (`scale: .8` → `1`). The title lines slide up from behind a mask: wrap each line in `overflow: hidden` and move it from `yPercent: 100`. Cheap, works on all screen sizes, and more striking than the current fade.

### 2.5 Experience
- The bullet points stagger in after the card (0.06 each).
- A thin accent line draws down the left side of the card as you scroll (`scaleY` with `scrub`), like a timeline.

### 2.6 Hero
- The background circles drift slowly (CSS `@keyframes` on `transform`, 12–20s, ease-in-out). No JS.
- Scroll out: as the hero leaves, the photo moves up and fades a little (`y: -40`, `opacity: .6`, `scrub`).

### 2.7 About
- Photo: `clip-path` reveal from the bottom plus `scale: 1.1` → `1` (this replaces `x: 60` and fixes 1.1).
- Paragraphs fade up one after another. The stats counter already works.

### 2.8 Contact
- The link buttons pop in with a stagger (`scale: .8, opacity: 0`, `back.out`).
- The inputs fade up one after another.
- The magnetic button only works with a mouse. On touch, use the press scale from 1.6, and a small success bounce when the message is sent.

---

## Phase 3: Reduced motion and testing

### 3.1 Reduced motion should not mean no motion
Today every `prefersReducedMotion()` check returns early, so the phone gets nothing. Reduced-motion guidance allows **opacity fades**; it asks to avoid movement, zoom and parallax.
- Add a fade-only path: same triggers, `opacity` only, short (0.4s), no `y`, no `scale`, no scrub.
- On your phone, check whether reduced motion is on: Android → Settings → Accessibility → *Remove animations* (battery saver can turn it on too); iPhone → Settings → Accessibility → Motion → *Reduce Motion*.

### 3.2 Testing
- Sizes: 360×800 (small Android), 390×844, 430×932, 768×1024 (tablet), and a phone in landscape.
- At each section: no sideways scroll (`scrollWidth === innerWidth`) and no zoom-out.
- Chrome DevTools: CPU 4× slowdown, check that scrolling stays smooth (Performance panel, no long frames during scrub).
- Real phone over Wi-Fi: `npm run dev -- --host`, then open the shown IP address on the phone.
- Lighthouse mobile: Performance stays ≥ 90, CLS stays 0, Accessibility stays 100.

---

## Order

1. **1.1** (the zoom-out bug, a few lines) and **1.2** (the menu). These are the "broken" feeling.
2. 1.3 – 1.7 layout fixes.
3. 2.1 Work cards and 2.2 Skills: the two big missing animations.
4. 2.3 – 2.8 smaller animations.
5. Phase 3 checks after each step, and fully at the end.
