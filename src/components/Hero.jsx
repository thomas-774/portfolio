import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import profile from '../data/profile'

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
      <h1 className="hero-greeting" ref={greetingRef}>{profile.greeting}</h1>
      <div className="hero-intro" ref={introRef}>
        <p>
          <strong>{profile.title}</strong> {profile.subtitle} Welcome to my portfolio.
        </p>
      </div>
    </div>
  )
}

function HeroAvatar({ imgRef }) {
  return (
    <div className="hero-avatar">
      <img ref={imgRef} src={profile.photoSrc} alt={profile.name} className="avatar-img" fetchPriority="high" width="1000" height="747" />
    </div>
  )
}

export default function Hero() {
  const greetingRef = useRef(null)
  const introRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const greeting = greetingRef.current
    if (!greeting) return

    const text = greeting.textContent
    greeting.innerHTML = ''
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = 'char'
      span.textContent = char === ' ' ? '\u00A0' : char
      greeting.appendChild(span)
    })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .to('.hero-greeting .char', { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 })
      .to(introRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-avatar', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6')

    const float = gsap.to('.hero-avatar', {
      y: -6,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })

    return () => {
      tl.kill()
      float.kill()
    }
  }, [])


  return (
    <section className="hero" id="hero">
      <HeroBackground />
      <div className="hero-content">
        <HeroText greetingRef={greetingRef} introRef={introRef} />
        <HeroAvatar imgRef={imgRef} />
      </div>

    </section>
  )
}
