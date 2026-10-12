import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function SectionHeader({ label, title }) {
  const titleRef = useRef(null)

  useGSAP(() => {
    const el = titleRef.current
    if (!el || prefersReducedMotion()) return

    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    )
  })

  const parts = title.replace(/\\n/g, '\n').split('\n')

  return (
    <>
      <span className="section-label">{label}</span>
      <h2 className="section-title" ref={titleRef}>
        {parts.map((part, i) => (
          <span key={i}>{i > 0 && <br />}{part}</span>
        ))}
      </h2>
    </>
  )
}
