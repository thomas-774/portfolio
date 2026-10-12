import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion, fadeIn } from '../lib/motion'
import SectionHeader from './SectionHeader'
import AboutStats from './AboutStats'
import AboutVisual from './AboutVisual'
import profile from '../data/profile'

export default function AboutSection() {
  const textRef = useRef(null)

  useGSAP(() => {
    const paragraphs = textRef.current.querySelectorAll('.about-body')
    if (prefersReducedMotion()) {
      fadeIn(paragraphs, paragraphs[0])
      return
    }

    gsap.fromTo(paragraphs,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphs[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, { scope: textRef })

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-text" ref={textRef}>
          <SectionHeader label="About Me" title="A bit about\nwho I am" />
          {profile.bio.map((paragraph, i) => (
            <p className="about-body" key={i}>{paragraph}</p>
          ))}
          <AboutStats stats={profile.stats} />
        </div>
        <AboutVisual />
      </div>
    </section>
  )
}
