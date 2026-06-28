const reasons = [
  { num: '01', icon: '♛', title: 'Starlit Crystal Ceilings', desc: 'Our signature starlit crystal canopy ceiling creates a magical atmosphere unlike any other venue in Lahore — unforgettable in every photograph.' },
  { num: '02', icon: '✦', title: 'Dedicated Bridal Suites', desc: 'Every hall features a private, luxuriously appointed bridal suite — your personal sanctuary before your grand entrance.' },
  { num: '03', icon: '💧', title: 'Waterfall & Garden Feature', desc: 'A one-of-a-kind indoor waterfall and garden setting available for intimate gatherings and themed mehndi setups.' },
  { num: '04', icon: '❋', title: 'Premium Catering', desc: 'Our master chefs craft bespoke menus blending traditional Pakistani flavours with international cuisine.' },
  { num: '05', icon: '⬡', title: 'Valet Parking', desc: 'Professional valet service and expansive parking facility accommodates all your guests with grace and ease.' },
  { num: '06', icon: '◉', title: 'Prime Lahore Location', desc: 'Located at Shamim Ul Haq Chowk, Nasheman-e-Iqbal Phase 2 — easily accessible from all major areas of Lahore.' },
]

export default function WhySection() {
  return (
    <section id="why" className="section why-section">
      <div className="container">
        <div className="reveal text-center" style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">The Sapphire<br /><em style={{ color: 'var(--gold)' }}>Difference</em></h2>
          <div className="gold-line" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We don&apos;t just host events — we craft experiences that resonate for a lifetime.
          </p>
        </div>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className={`why-card reveal delay-${(i % 4) + 1}`}
              data-num={r.num}
            >
              <span className="why-icon">{r.icon}</span>
              <div className="why-title">{r.title}</div>
              <div className="why-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
