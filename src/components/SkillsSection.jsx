import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'
import skills from '../data/skills'

const MAX_SWING = 6

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const track = trackRef.current
    const progress = progressRef.current
    const cards = gsap.utils.toArray(track.querySelectorAll('.service-hang-card'))
    if (cards.length === 0) return

    // Native swipe (reduced motion only): keep the progress bar in sync
    const onNativeScroll = () => {
      const max = wrapper.scrollWidth - wrapper.clientWidth
      gsap.set(progress, { scaleX: max > 0 ? wrapper.scrollLeft / max : 0 })
    }
    wrapper.addEventListener('scroll', onNativeScroll, { passive: true })

    const mm = gsap.matchMedia()

    // Every screen size: the section is pinned and scrolling down moves the cards sideways
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      section.classList.add('is-pinned')

      const distance = () => Math.max(0, track.scrollWidth - wrapper.clientWidth)
      const swing = gsap.quickTo(cards, 'rotation', { duration: 1, ease: 'elastic.out(1, 0.35)' })
      let settleTimer

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const max = distance()
              if (!max) return value
              const points = cards.map((c) => Math.min(1, (c.offsetLeft - cards[0].offsetLeft) / max))
              points.push(1)
              return gsap.utils.snap(points, value)
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power1.inOut'
          },
          onUpdate: (self) => {
            gsap.set(progress, { scaleX: self.progress })
            // Cards hang from the wire: lag behind the scroll direction, then settle
            swing(gsap.utils.clamp(-MAX_SWING, MAX_SWING, -self.getVelocity() / 250))
            clearTimeout(settleTimer)
            settleTimer = setTimeout(() => swing(0), 120)
          }
        }
      })

      // matchMedia reverts the tween, the pin and the swing when this query stops matching
      return () => {
        clearTimeout(settleTimer)
        section.classList.remove('is-pinned')
      }
    })

    return () => wrapper.removeEventListener('scroll', onNativeScroll)
  }, { scope: sectionRef })

  return (
    <section className="services" id="skills" ref={sectionRef}>
      <div className="services-header">
        <SectionHeader label="What I Know" title="Skills" />
      </div>
      <div className="services-wire-wrapper" ref={wrapperRef}>
        <div className="services-wire-track" ref={trackRef}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
          <div className="wire-line" />
        </div>
      </div>
      <div className="services-progress" aria-hidden="true">
        <div className="services-progress-fill" ref={progressRef} />
      </div>
    </section>
  )
}
