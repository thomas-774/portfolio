import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollTo } from '../hooks/useScrollTo'

gsap.registerPlugin(ScrollTrigger)

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

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => navRef.current?.classList.add('scrolled'),
      onLeaveBack: () => navRef.current?.classList.remove('scrolled')
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const update = () => {
      let activeIdx = 0
      for (let i = 0; i < links.length; i++) {
        const section = document.querySelector(links[i].href)
        if (!section) continue
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.4) {
          activeIdx = i
        }
      }
      linksRef.current.forEach((el, i) => {
        el?.classList.toggle('active', i === activeIdx)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const handleLinkClick = useCallback((href) => {
    closeMenu()
    scrollTo(href)
  }, [closeMenu, scrollTo])

  return (
    <nav ref={navRef}>
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('#') }}>
        <img src="/logo%204.png" alt="Logo" className="nav-logo-img" />
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
