const halls = [
  {
    num: '01',
    name: 'Sabbi Hall',
    capacity: '250 – 600 Guests',
    img: '/assets/images/gallery-1.jpg',
    alt: 'Sabbi Hall – Grand Ballroom Sapphire Palace',
    badge: 'Grand Hall',
    features: ['Grand Ballroom with Starlit Crystal Ceiling', 'Private Bridal Suite', 'Professional Stage & Lighting', 'Valet & Ample Parking'],
  },
  {
    num: '02',
    name: 'Rabbi Hall',
    capacity: '200 – 450 Guests',
    img: '/assets/images/gallery-2.jpg',
    alt: 'Rabbi Hall – Elegant Wedding Stage Sapphire Palace',
    badge: 'Premium',
    features: ['Floral Stage & Crystal Drape Wall', 'Private Bridal Suite', 'Advanced Sound System', 'Full Catering Service'],
  },
  {
    num: '03',
    name: 'Roshany Hall',
    capacity: '100 – 200 Guests',
    img: '/assets/images/gallery-3.jpg',
    alt: 'Roshany Hall – Garden Waterfall Theme Sapphire Palace',
    badge: 'Intimate',
    features: ['Garden & Waterfall Theme', 'Private Bridal Suite', 'Luxury Rustic Décor', 'Personalized Service'],
  },
  {
    num: '04',
    name: 'Mohiman Hall',
    capacity: '50 – 100 Guests',
    img: '/assets/images/gallery-4.jpg',
    alt: 'Mohiman Hall – Mehndi Stage Sapphire Palace',
    badge: 'VIP',
    features: ['Exclusive VIP Experience', 'Private Bridal Suite', 'Boutique Luxury Setting', 'Dedicated Event Manager'],
  },
]

export default function HallsSection() {
  return (
    <section id="halls" className="section halls-section">
      <div className="container">
        <div className="reveal text-center" style={{ maxWidth: '700px', margin: '0 auto 20px' }}>
          <span className="section-tag">Our Event Halls</span>
          <h2 className="section-title">
            Four Halls of<br /><em style={{ color: 'var(--gold)' }}>Magnificent</em> Grandeur
          </h2>
          <div className="gold-line" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Each hall is a masterpiece of luxury design, offering unique ambiance and world-class amenities.
          </p>
        </div>
        <div className="halls-grid">
          {halls.map((hall, i) => (
            <div key={hall.num} className={`hall-card reveal delay-${i + 1}`}>
              <div className="hall-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hall.img} alt={hall.alt} />
                <div className="hall-card-img-overlay" />
                <div className="hall-card-number">{hall.num}</div>
              </div>
              <div className="hall-card-body">
                <div className="hall-name">{hall.name}</div>
                <div className="hall-capacity">✦ {hall.capacity} ✦</div>
                <ul className="hall-features">
                  {hall.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="#booking" className="btn-gold" style={{ fontSize: '10px', padding: '12px 24px' }}>
                  <span>Inquire Now</span>
                </a>
              </div>
              <div className="hall-badge">{hall.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
