import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion, fadeIn } from '../lib/motion'

export default function SectionHeader({ label, title }) {
  const labelRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(() => {
    const el = titleRef.current
    if (!el) return
    if (prefersReducedMotion()) {
      fadeIn([labelRef.current, el], el)
      return
    }

    // Each line slides up from behind its own mask (.section-title-line clips it)
    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
      .fromTo(labelRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .fromTo(el.querySelectorAll('.section-title-line > span'),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        0.1)
  })

  const parts = title.replace(/\\n/g, '\n').split('\n')

  return (
    <>
      <span className="section-label" ref={labelRef}>{label}</span>
      <h2 className="section-title" ref={titleRef}>
        {parts.map((part, i) => (
          <span className="section-title-line" key={i}><span>{part}</span></span>
        ))}
      </h2>
    </>
  )
}
