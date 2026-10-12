import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useScrollTo } from '../hooks/useScrollTo'
import { prefersReducedMotion, PHONE_MOTION } from '../lib/motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const navRef = useRef(null)
  const btnRef = useRef(null)
  const menuRef = useRef(null)
  const progressRef = useRef(null)
  const menuTl = useRef(null)
  const scrollTo = useScrollTo()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useGSAP(() => {
    const nav = navRef.current

    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => nav.classList.add('scrolled'),
      onLeaveBack: () => nav.classList.remove('scrolled')
    })

    // Menu: the overlay fades in, then the links slide up one by one ("Let's Talk" last)
    const items = menuRef.current.querySelectorAll('.mobile-menu-item')
    const tl = gsap.timeline({ paused: true })
      .to(menuRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
    if (!prefersReducedMotion()) {
      tl.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, '-=0.1')
    }
    menuTl.current = tl

    const mm = gsap.matchMedia()
    mm.add(PHONE_MOTION, () => {
      // Hide on scroll down, show on scroll up: more room for the content
      let hidden = false
      const setHidden = (hide) => {
        if (hide === hidden) return
        hidden = hide
        gsap.to(nav, { yPercent: hide ? -100 : 0, duration: 0.3, ease: 'power2.out', overwrite: true })
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 120)
      })

      // Thin progress bar under the navbar
      gsap.fromTo(progressRef.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      })
    })
  })

  useEffect(() => {
    if (menuOpen) {
      gsap.to(navRef.current, { yPercent: 0, duration: 0.2, overwrite: true })
      menuTl.current?.timeScale(1).play()
    } else {
      menuTl.current?.timeScale(1.6).reverse()
    }
    // Locks page scroll while the menu is open (see html.menu-open in App.css)
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return

    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      btnRef.current?.focus()
    }
    // The overlay only exists up to 1024px: close it if the window grows past that
    const wide = window.matchMedia('(min-width: 1025px)')
    const onWide = (e) => e.matches && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [menuOpen])

  useEffect(() => {
    // A section is active while it crosses the line 40% down the screen
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          document.querySelectorAll('[data-nav-link]').forEach((el) => {
            el.classList.toggle('active', el.getAttribute('href') === `#${entry.target.id}`)
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

  const renderLink = (link) => (
    <a
      href={link.href}
      data-nav-link
      onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
    >
      {link.label}
    </a>
  )

  return (
    <>
      <nav ref={navRef}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('#') }}>
          <img src="/logo.webp" alt="Thomas Sameh logo" className="nav-logo-img" width="40" height="40" />
        </a>

        <div className="nav-actions">
          <button
            ref={btnRef}
            className={`menu-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>

          <ul className="nav-links">
            {links.map((link) => <li key={link.href}>{renderLink(link)}</li>)}
          </ul>

          <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>
            Let&apos;s Talk
          </a>
        </div>

        <div className="nav-progress" ref={progressRef} aria-hidden="true" />
      </nav>

      {/* Phone/tablet menu. Outside <nav>: the nav's blur and hide-on-scroll transform
          would otherwise trap this fixed overlay inside the bar */}
      <div
        id="mobile-menu"
        className="mobile-menu"
        ref={menuRef}
        onClick={(e) => { if (!e.target.closest('a')) closeMenu() }}
      >
        <ul className="mobile-menu-links">
          {links.map((link) => <li className="mobile-menu-item" key={link.href}>{renderLink(link)}</li>)}
          <li className="mobile-menu-item mobile-menu-cta-item">
            <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>
              Let&apos;s Talk
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
