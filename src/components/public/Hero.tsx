export default function Hero() {
  return (
    <section id="hero">
      <video
        className="hero-img"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/images/hero.jpg"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-overlay2" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">
          <span>Lahore&apos;s Premier Luxury Venue</span>
        </div>
        <h1 className="hero-title">
          <div className="line1">Sapphire Palace</div>
          <div className="line2">Event Complex</div>
          <div className="line3">LAHORE</div>
        </h1>
        <p className="hero-tagline">✦ &nbsp; Where Luxury Meets Celebration &nbsp; ✦</p>
        <div className="hero-btns">
          <a href="#booking" className="btn-gold"><span>Book Your Event</span></a>
          <a href="#halls" className="btn-outline">Explore Halls</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><div className="stat-num">4</div><div className="stat-label">Luxury Halls</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">600+</div><div className="stat-label">Guest Capacity</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">500+</div><div className="stat-label">Events Hosted</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Satisfaction</div></div>
        </div>
      </div>
      <a href="#about" className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </a>
    </section>
  )
}
