import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import WorkCard from './WorkCard'
import projects from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const stackRef = useRef(null)

  useEffect(() => {
    const cards = stackRef.current?.querySelectorAll('.work-card-full')
    if (!cards || cards.length < 2) return

    // Stacking only on desktop: on phones the cards are taller than the screen
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const inner = card.querySelector('.work-card-inner')
          ScrollTrigger.create({
            trigger: card,
            start: 'top top+=20',
            endTrigger: cards[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            animation: gsap.to(inner, {
              scale: 0.94,
              borderRadius: '20px',
              boxShadow: '0 8px 30px oklch(15% 0.02 260 / 0.2)',
              y: -10,
              ease: 'none'
            })
          })
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="work" id="work">
      <div className="work-header">
        <SectionHeader label="Selected Work" title="Things I've built" />
      </div>
      <div className="work-stack" ref={stackRef}>
        {projects.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} isFirst={i === 0} />
        ))}
      </div>
    </section>
  )
}
