import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion, fadeIn } from '../lib/motion'

export default function AboutVisual() {
  const frameRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) {
      fadeIn(frameRef.current, frameRef.current)
      return
    }

    // Reveal from the bottom and settle the zoom. Never start off to the side:
    // a start state past the right edge widens the page and phones zoom out
    gsap.timeline({
      defaults: { duration: 1.1, ease: 'power3.out' },
      scrollTrigger: {
        trigger: frameRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
      .fromTo(frameRef.current,
        { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 24px)' })
      .fromTo(imgRef.current, { scale: 1.1 }, { scale: 1 }, 0)
  })

  return (
    <div className="about-visual">
      <div className="about-img-frame" ref={frameRef}>
        <img ref={imgRef} src="/about.webp" alt="Thomas Sameh" className="about-img" loading="lazy" width="800" height="1067" />
      </div>
    </div>
  )
}
