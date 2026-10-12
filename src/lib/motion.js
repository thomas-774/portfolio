import { gsap } from './gsap'

// True when the visitor asked the OS for less motion
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// gsap.matchMedia() queries shared by the components
export const PHONE_MOTION = '(max-width: 768px) and (prefers-reduced-motion: no-preference)'

// Reduced motion still gets feedback: a short opacity fade, no movement or zoom.
// gsap.from() keeps each element's own final opacity (e.g. the faint "01")
export function fadeIn(targets, trigger, start = 'top 85%') {
  return gsap.from(targets, {
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: 'none',
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined
  })
}
