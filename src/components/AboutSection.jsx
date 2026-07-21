import SectionHeader from './SectionHeader'
import AboutStats from './AboutStats'
import AboutVisual from './AboutVisual'
import profile from '../data/profile'

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-text">
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
