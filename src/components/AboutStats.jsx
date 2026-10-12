import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function AboutStats({ stats }) {
  const statRefs = useRef([])

  useGSAP(() => {
    // Reduced motion: show the final numbers without counting up
    if (prefersReducedMotion()) return

    statRefs.current.forEach((stat) => {
      if (!stat) return

      const raw = stat.textContent
      const target = parseInt(raw) || 0
      const suffix = raw.replace(/[0-9]/g, '') || ''
      const counter = { val: 0 }

      if (!suffix) return

      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          stat.textContent = Math.round(counter.val) + suffix
        },
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    })
  })

  return (
    <div className="about-stats">
      {stats.map((stat, i) => (
        <div key={stat.label}>
          <div className="stat-number" ref={(el) => (statRefs.current[i] = el)}>
            {stat.number}{stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
