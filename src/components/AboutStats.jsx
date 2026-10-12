import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function AboutStats({ stats }) {
  const statRefs = useRef([])

  useGSAP(() => {
    // Reduced motion: show the final numbers without counting up
    if (prefersReducedMotion()) return

    // Count up to the values from the data, never from the DOM: the DOM text
    // is changed by this animation, so reading it back (e.g. when StrictMode
    // runs the effect twice) would give 0
    stats.forEach(({ number, suffix }, i) => {
      const stat = statRefs.current[i]
      // Only "N+" stats count up; the graduation year stays as it is
      if (!stat || !suffix) return

      const counter = { val: 0 }

      gsap.to(counter, {
        val: number,
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
  }, { dependencies: [stats] })

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
