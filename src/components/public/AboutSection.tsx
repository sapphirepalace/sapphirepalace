export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal-left">
            <div className="about-img-wrap">
              <div
                className="about-img-main"
                style={{ backgroundImage: "url('/assets/images/section-18.jpg')" }}
              />
              <div
                className="about-img-accent"
                style={{ backgroundImage: "url('/assets/images/section-18.jpg')" }}
              />
              <div className="about-badge">
                <div className="about-badge-text">Lahore&apos;s<br />✦ No.1 ✦<br />Luxury<br />Venue</div>
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">
              Where Every <em style={{ color: 'var(--gold)' }}>Dream</em><br />Becomes Reality
            </h2>
            <div className="gold-line" style={{ margin: '0 0 28px' }} />
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: '16px' }}>
              Nestled in the heart of Nasheman-e-Iqbal Phase 2, Lahore, Sapphire Palace Event Complex stands as a monument of luxury and grandeur. We have been crafting unforgettable memories for families across Pakistan since our inception.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: '28px' }}>
              Our meticulously designed halls blend timeless elegance with modern sophistication — from our starlit crystal ceilings and floral arches to our enchanting waterfall features and lush garden setups.
            </p>
            <ul className="about-list">
              <li>Four uniquely designed luxury event halls</li>
              <li>Dedicated bridal room in every hall</li>
              <li>Starlit crystal ceiling &amp; cinematic lighting</li>
              <li>Stunning waterfall &amp; garden feature</li>
              <li>Ample parking with valet service</li>
              <li>Exclusive bridal shooting palace</li>
            </ul>
            <div style={{ display: 'flex', gap: '16px', marginTop: '38px', flexWrap: 'wrap' }}>
              <a href="#booking" className="btn-gold"><span>Plan Your Event</span></a>
              <a href="#halls" className="btn-outline">View Our Halls</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
