import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function AboutVisual() {
  const ref = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.fromTo(ref.current,
      { opacity: 0, x: 60 },
      {
        scrollTrigger: {
          trigger: '.about-visual',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
  })

  return (
    <div className="about-visual">
      <img ref={ref} src="/about.webp" alt="Thomas Sameh" className="about-img" loading="lazy" width="800" height="1067" />
    </div>
  )
}
