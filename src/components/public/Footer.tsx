export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Sapphire Palace<br /><span style={{ fontSize: '18px' }}>Event Complex</span></div>
            <div className="footer-tagline">Where Luxury Meets Celebration</div>
            <p className="footer-desc">
              Lahore&apos;s most prestigious luxury event complex — crafting unforgettable celebrations in the heart of Nasheman-e-Iqbal.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social">f</a>
              <a href="#" className="footer-social">in</a>
              <a href="#" className="footer-social">📸</a>
              <a href="https://wa.me/923210512345" target="_blank" rel="noreferrer" className="footer-social">💬</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#halls">Event Halls</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#booking">Book Now</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Events We Host</div>
            <ul className="footer-links">
              {['Weddings', 'Mehndi Nights', 'Walima Events', 'Corporate Events', 'Birthday Parties', 'VIP Events'].map((e) => (
                <li key={e}><a href="#booking">{e}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Contact Us</div>
            <ul className="footer-links" style={{ gap: '14px' }}>
              <li style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Address</span>
                <a href="https://maps.app.goo.gl/vhodg3PenFtkZ9hs9" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', lineHeight: 1.6 }}>
                  Shamim Ul Haq Chowk, Nasheman-e-Iqbal Phase 2, Lahore
                </a>
              </li>
              <li style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Phone</span>
                <a href="tel:+923210512345" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+92 321 0512345</a>
              </li>
              <li style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Email</span>
                <a href="mailto:saphirepalace123@gmail.com" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>saphirepalace123@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 <span>Sapphire Palace Event Complex</span>. All Rights Reserved. Lahore, Pakistan.</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#booking">Book Now</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
