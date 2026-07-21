import { useRef } from 'react'
import { gsap } from 'gsap'

export default function SkillCard({ skill }) {
  const bodyRef = useRef(null)

  const handleEnter = () => {
    gsap.to(bodyRef.current, {
      y: -6,
      boxShadow: '0 20px 50px oklch(15% 0.02 260 / 0.4)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleLeave = () => {
    gsap.to(bodyRef.current, {
      y: 0,
      boxShadow: '0 12px 40px oklch(15% 0.02 260 / 0.35)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  return (
    <div className="service-hang-card">
      <div className="service-hang-assembly">
        <div className="service-hang-hole" />
        <div className="service-hang-string" />
      </div>
      <div
        className="service-hang-body"
        ref={bodyRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="service-hang-header">
          <div className="service-hang-header-badge">
            <div className="service-hang-header-badge-dot" />
            {skill.badge}
          </div>
          <div className="service-hang-header-text">{skill.header}</div>
        </div>
        <div className="service-hang-content">
          <div className="service-hang-label">{skill.label}</div>
          <div className="service-hang-name">{skill.name}</div>
          <div className="service-hang-skills">
            {skill.skills.map((s) => (
              <div className="service-hang-skill" key={s.name}>
                <div className="service-hang-skill-name">{s.name}</div>
                <div className="service-hang-skill-tool">{s.tool}</div>
              </div>
            ))}
          </div>
          <div className="service-hang-bottom">
            {skill.bottom} <span>&rarr;</span> {skill.bottomEnd}
          </div>
        </div>
      </div>
    </div>
  )
}
