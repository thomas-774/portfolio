import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'
import skills from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    const cards = track?.querySelectorAll('.service-hang-card')
    if (!wrapper || !track || !cards || cards.length === 0) return

    function calcScrollDistance() {
      const lastCard = cards[cards.length - 1]
      const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth
      const viewportWidth = wrapper.offsetWidth
      return Math.max(0, lastCardRight - viewportWidth + viewportWidth * 0.15)
    }

    const distance = calcScrollDistance()
    wrapper.style.height = `${distance}px`

    const tween = gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: `+=${distance}`,
        pin: true,
        pinSpacing: true,
        scrub: window.innerWidth < 768 ? true : 1,
        invalidateOnRefresh: true
      }
    })

    stRef.current = tween.scrollTrigger

    ScrollTrigger.refresh()

    let timer
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 250)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      tween.kill()
      if (stRef.current) stRef.current.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="services" id="skills">
      <div className="services-header">
        <SectionHeader label="What I Know" title="Skills" />
      </div>
      <div className="services-wire-wrapper" ref={wrapperRef}>
        <div className="wire-line" />
        <div className="services-wire-track" ref={trackRef}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
