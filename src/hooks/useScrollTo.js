import { useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export function useScrollTo() {
  const scrollTo = useCallback((href) => {
    gsap.killTweensOf(window)
    if (!href || href === '#') {
      gsap.to(window, { scrollTo: { y: 0 }, duration: 0.9, ease: 'power3.inOut' })
      return
    }
    const target = document.querySelector(href)
    if (target) {
      const nav = document.querySelector('nav')
      const offset = (nav ? nav.offsetHeight : 80) - 130
      gsap.to(window, {
        scrollTo: { y: target, offsetY: offset },
        duration: 0.9,
        ease: 'power3.inOut'
      })
    }
  }, [])

  return scrollTo
}
