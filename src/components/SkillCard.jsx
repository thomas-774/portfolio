export default function SkillCard({ skill }) {
  return (
    <div className="service-hang-card">
      <div className="service-hang-assembly">
        <div className="service-hang-hole" />
        <div className="service-hang-string" />
      </div>
      <div className="service-hang-body">
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
