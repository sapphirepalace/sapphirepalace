export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div
        className="cta-banner-bg"
        style={{ backgroundImage: "url('/assets/images/section-18.jpg')" }}
      />
      <div className="cta-banner-overlay" />
      <div className="cta-bg-text">SAPPHIRE</div>
      <div className="container cta-inner">
        <div className="reveal">
          <span className="section-tag">Your Dream Event Awaits</span>
          <h2 className="cta-title">
            Begin Your<br /><em style={{ color: 'var(--gold-light)' }}>Extraordinary</em><br />Journey
          </h2>
          <p className="cta-sub">
            Contact us today and let our luxury event specialists create the celebration of your dreams
          </p>
          <div className="cta-btns">
            <a href="#booking" className="btn-gold"><span>Book a Consultation</span></a>
            <a
              href="https://wa.me/923210512345?text=Assalamu%20Alaikum%21%20I%20want%20to%20inquire%20about%20Sapphire%20Event%20Complex%20Palace."
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              💬 WhatsApp Us
            </a>
            <a href="tel:+923210512345" className="btn-outline">📞 Call Now</a>
          </div>
        </div>
      </div>
    </section>
  )
}
