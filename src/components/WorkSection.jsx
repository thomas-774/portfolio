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

    // Only when the visitor has not asked for less motion
    const mm = gsap.matchMedia()

    // Every screen size: each card is pinned and the next one stacks on top of it.
    // A card taller than the screen (phones) pins once its bottom reaches the
    // bottom of the screen, so all of it is seen before the next card covers it
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const inner = card.querySelector('.work-card-inner')
          ScrollTrigger.create({
            trigger: card,
            start: () => (card.offsetHeight > window.innerHeight - 20 ? 'bottom bottom' : 'top top+=20'),
            endTrigger: cards[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
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
