import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function AboutVisual() {
  const ref = useRef(null)

  useEffect(() => {
    const anim = gsap.fromTo(ref.current,
      { opacity: 0, x: 60 },
      {
        scrollTrigger: {
          trigger: '.about-visual',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )

    return () => {
      anim.kill()
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
    }
  }, [])

  return (
    <div className="about-visual">
      <img ref={ref} src="/about.webp" alt="Thomas Sameh" className="about-img" loading="lazy" width="800" height="1067" />
    </div>
  )
}
