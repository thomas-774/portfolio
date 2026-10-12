import { useEffect, useRef, useState, useCallback } from 'react'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { useScrollTo } from '../hooks/useScrollTo'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const navRef = useRef(null)
  const linksRef = useRef([])
  const menuRef = useRef(null)
  const scrollTo = useScrollTo()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => navRef.current?.classList.add('scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('scrolled')
    })
  })

  useEffect(() => {
    // A section is active while it crosses the line 40% down the screen
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const activeIdx = links.findIndex((l) => l.href === `#${entry.target.id}`)
          linksRef.current.forEach((el, i) => {
            el?.classList.toggle('active', i === activeIdx)
          })
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    links.forEach((l) => {
      const section = document.querySelector(l.href)
      if (section) obs.observe(section)
    })
    return () => obs.disconnect()
  }, [])

  const handleLinkClick = useCallback((href) => {
    closeMenu()
    scrollTo(href)
  }, [closeMenu, scrollTo])

  return (
    <nav ref={navRef}>
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('#') }}>
        <img src="/logo.webp" alt="Thomas Sameh logo" className="nav-logo-img" width="40" height="40" />
      </a>

      <div className="nav-actions">
        <button
          className={`menu-btn${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} ref={menuRef}>
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                ref={(el) => (linksRef.current[i] = el)}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  )
}
