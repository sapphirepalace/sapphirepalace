'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      let cur = ''
      document.querySelectorAll('section[id]').forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120) cur = s.id
      })
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">
              <span className="nav-logo-main">
                Sapphire Palace <span>Event Complex</span>
              </span>
              <span className="nav-logo-sub">Event Complex · Lahore</span>
            </a>
            <ul className="nav-links" id="navLinks">
              {['about', 'halls', 'services', 'gallery', 'testimonials', 'blog', 'faq'].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    className={activeSection === s ? 'active' : ''}
                  >
                    {s === 'testimonials' ? 'Reviews' : s === 'faq' ? 'FAQ' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="nav-cta">
                  Book Now
                </a>
              </li>
            </ul>
            <div className="hamburger" onClick={() => setMenuOpen(true)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <button className="mobile-close" onClick={closeMenu}>✕</button>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#halls" onClick={closeMenu}>Event Halls</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#testimonials" onClick={closeMenu}>Reviews</a>
        <a href="#blog" onClick={closeMenu}>Blog</a>
        <a href="#faq" onClick={closeMenu}>FAQs</a>
        <a href="#booking" onClick={closeMenu}>Book Now</a>
        <a href="tel:+923210512345" style={{ color: 'var(--gold)' }}>+92 321 0512345</a>
      </div>
    </>
  )
}
