import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import SectionHeader from './SectionHeader'
import WorkCard from './WorkCard'
import projects from '../data/projects'

export default function WorkSection() {
  const stackRef = useRef(null)

  useGSAP(() => {
    const cards = stackRef.current?.querySelectorAll('.work-card-full')
    if (!cards || cards.length < 2) return

    // Stacking only on desktop (on phones the cards are taller than the screen)
    // and only when the visitor has not asked for less motion
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
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
  }, { scope: stackRef })

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
