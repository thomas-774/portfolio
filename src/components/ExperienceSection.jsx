import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'
import SectionHeader from './SectionHeader'
import experience from '../data/experience'

export default function ExperienceSection() {
  const listRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.utils.toArray('.exp-card').forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    })
  }, { scope: listRef })

  return (
    <section className="experience" id="experience">
      <SectionHeader label="Experience" title="Where I've\nworked" />
      <div className="exp-list" ref={listRef}>
        {experience.map((job) => (
          <article className="exp-card" key={job.id}>
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
