import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WorkCard({ project, index, isFirst }) {
  const cardRef = useRef(null)
  const visualRef = useRef(null)
  const numberRef = useRef(null)
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const techRef = useRef(null)
  const linkRef = useRef(null)
  const videoRef = useRef(null)
  const { media } = project

  useEffect(() => {
    const anim = []

    if (isFirst) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(numberRef.current, { opacity: 0, y: 40 }, { opacity: 0.06, y: 0, duration: 0.5 })
        .fromTo(visualRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.3')
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
        .fromTo(techRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15')
        .fromTo(linkRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1')
      anim.push(tl)
    } else {
      gsap.set([tagRef.current, titleRef.current, descRef.current, techRef.current, linkRef.current, numberRef.current], { opacity: 0, y: 40 })
      gsap.set(visualRef.current, { scale: 0.85, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          end: 'top 25%',
          toggleActions: 'play none none none'
        }
      })
      tl
        .to(numberRef.current, { opacity: 0.06, y: 0, duration: 0.3 })
        .to(visualRef.current, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.2 }, '-=0.2')
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15')
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
        .to(techRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
        .to(linkRef.current, { opacity: 1, y: 0, duration: 0.2 }, '-=0.15')
      anim.push(tl)
    }

    const parallax = gsap.to(visualRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -30,
      ease: 'none'
    })
    anim.push(parallax)

    const video = videoRef.current
    const observers = []

    if (video) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        },
        { threshold: 0.4 }
      )
      obs.observe(video)
      observers.push(obs)
    }

    return () => {
      anim.forEach((a) => {
        a.kill()
        if (a.scrollTrigger) a.scrollTrigger.kill()
      })
      observers.forEach((obs) => obs.disconnect())
    }
  }, [isFirst])

  return (
    <div className="work-card-full" ref={cardRef}>
      <div className="work-card-inner">
        <div className={`work-card-visual${media?.type === 'video' ? ' has-video' : ''}`} ref={visualRef}>
          {media?.type === 'video' && (
            <video ref={videoRef} src={media.src} poster={media.poster} muted loop playsInline preload="metadata" className="work-card-video" />
          )}
          {media?.type === 'image' && (
            <img src={media.src} alt={media.alt} loading="lazy" className="work-card-img" />
          )}
        </div>
        <div className="work-card-content">
          <span className="work-card-number" ref={numberRef}>{String(index + 1).padStart(2, '0')}</span>
          <span className="work-card-tag" ref={tagRef}>{project.tag}</span>
          <h3 className="work-card-title" ref={titleRef}>{project.title}</h3>
          <p className="work-card-desc" ref={descRef}>{project.description}</p>
          <div className="work-card-tech" ref={techRef}>
            {project.tech.map((t) => (
              <span className="tech-pill" key={t}>{t}</span>
            ))}
          </div>
          <div className="work-card-links" ref={linkRef}>
            <a href={project.link} className="work-card-link" target="_blank" rel="noopener noreferrer">
              {project.linkLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            {project.liveLink && (
              <a href={project.liveLink} className="work-card-link work-card-link-live" target="_blank" rel="noopener noreferrer">
                {project.liveLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
