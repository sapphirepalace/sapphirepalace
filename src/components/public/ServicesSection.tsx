const services = [
  { icon: '💍', title: 'Wedding Planning', desc: 'Complete wedding coordination from décor to catering, creating your perfect day.' },
  { icon: '🌸', title: 'Mehndi Nights', desc: 'Vibrant mehndi setups with traditional motifs and festive lighting.' },
  { icon: '♛', title: 'Walima Banquets', desc: 'Elegant walima arrangements with gourmet cuisine and sophisticated décor.' },
  { icon: '🏢', title: 'Corporate Events', desc: 'Professional corporate gatherings with premium AV equipment.' },
  { icon: '🎂', title: 'Birthday Events', desc: 'Spectacular birthday celebrations tailored to every age and taste.' },
  { icon: '📸', title: 'Shooting Palace', desc: 'Dedicated spaces for stunning bridal and event photography.' },
  { icon: '🍽️', title: 'Gourmet Catering', desc: 'Pakistani and continental cuisine crafted by master chefs.' },
  { icon: '🎵', title: 'Sound & Lighting', desc: 'Professional AV production with cinematic lighting systems.' },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="services-intro reveal">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            Everything Your<br /><em style={{ color: 'var(--gold)' }}>Celebration</em> Deserves
          </h2>
          <div className="gold-line" />
          <p className="section-subtitle">
            From the first consultation to the final farewell, every detail is crafted with perfection.
          </p>
        </div>
        <div className="services-grid reveal">
          {services.map((s) => (
            <div key={s.title} className="service-item">
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
