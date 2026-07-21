import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function AboutStats({ stats }) {
  const statRefs = useRef([])
  const animsRef = useRef([])

  useEffect(() => {
    statRefs.current.forEach((stat) => {
      if (!stat) return

      const raw = stat.textContent
      const target = parseInt(raw) || 0
      const suffix = raw.replace(/[0-9]/g, '') || ''
      const counter = { val: 0 }

      if (!suffix) return

      const anim = gsap.to(counter, {
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

      animsRef.current.push(anim)
    })

    return () => {
      animsRef.current.forEach((a) => {
        a.kill()
        if (a.scrollTrigger) a.scrollTrigger.kill()
      })
      animsRef.current = []
    }
  }, [])

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
