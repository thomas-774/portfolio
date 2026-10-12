import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion, fadeIn } from '../lib/motion'
import SectionHeader from './SectionHeader'
import experience from '../data/experience'

export default function ExperienceSection() {
  const listRef = useRef(null)

  useGSAP(() => {
    const reduced = prefersReducedMotion()

    gsap.utils.toArray('.exp-card').forEach((card) => {
      const line = card.querySelector('.exp-line')
      if (reduced) {
        fadeIn(card, card)
        return
      }

      // The card rises, then its bullet points follow one by one
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
        .fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(card.querySelectorAll('.exp-points li'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          0.3)

      // Timeline line draws down the card as you scroll through it
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 75%', end: 'bottom 60%', scrub: true }
      })
    })
  }, { scope: listRef })

  return (
    <section className="experience" id="experience">
      <SectionHeader label="Experience" title="Where I've\nworked" />
      <div className="exp-list" ref={listRef}>
        {experience.map((job) => (
          <article className="exp-card" key={job.id}>
            <span className="exp-line" aria-hidden="true" />
            <div className="exp-meta">
              <span className="exp-period">{job.period}</span>
              <span className="exp-location">{job.location}</span>
            </div>
            <div className="exp-body">
              <h3 className="exp-role">{job.role}</h3>
              <p className="exp-company">
                {job.company}
                {job.companyNote && <span> · {job.companyNote}</span>}
              </p>
              <ul className="exp-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="work-card-tech">
                {job.tech.map((t) => (
                  <span className="tech-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
