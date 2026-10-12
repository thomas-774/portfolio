import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import profile from '../data/profile'
import { prefersReducedMotion } from '../lib/motion'

function HeroBackground() {
  return (
    <div className="hero-bg-shapes">
      <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <circle cx="200" cy="150" r="300" fill="oklch(65% 0.15 260 / 0.3)" />
        <circle cx="1200" cy="700" r="400" fill="oklch(50% 0.18 280 / 0.2)" />
        <circle cx="800" cy="100" r="200" fill="oklch(70% 0.12 240 / 0.25)" />
      </svg>
    </div>
  )
}

function HeroText({ greetingRef, introRef }) {
  return (
    <div className="hero-text">
      <h1 className="hero-greeting" ref={greetingRef} aria-label={profile.greeting}>
        {profile.greeting.split('').map((char, i) => (
          <span className="char" aria-hidden="true" key={i}>{char === ' ' ? ' ' : char}</span>
        ))}
      </h1>
      <div className="hero-intro" ref={introRef}>
        <p>
          <strong>{profile.title}</strong> {profile.subtitle} Welcome to my portfolio.
        </p>
        <a href={profile.cvSrc} download="Thomas-Sameh-CV.pdf" className="hero-cv-btn">
          Download CV
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3v12"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="5" y1="20" x2="19" y2="20"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

function HeroAvatar({ imgRef }) {
  return (
    <div className="hero-avatar">
      <img ref={imgRef} src={profile.photoSrc} srcSet="/photo-720.webp 720w, /photo.webp 1000w" sizes="(max-width: 1024px) 360px, min(50vw, 700px)" alt={profile.name} className="avatar-img" fetchPriority="high" width="1000" height="747" />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const greetingRef = useRef(null)
  const introRef = useRef(null)
  const imgRef = useRef(null)

  // Runs before the first paint, so the start state is set without a flash;
  // nothing is hidden in CSS, so the text still shows if this never runs
  useGSAP(() => {
    if (prefersReducedMotion()) return

    const chars = greetingRef.current.querySelectorAll('.char')
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(chars, { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.08 })
      .fromTo(introRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-avatar', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')

    gsap.to('.hero-avatar', {
      y: -6,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })
  }, { scope: sectionRef })


  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <HeroBackground />
      <div className="hero-content">
        <HeroText greetingRef={greetingRef} introRef={introRef} />
        <HeroAvatar imgRef={imgRef} />
      </div>

    </section>
  )
}
