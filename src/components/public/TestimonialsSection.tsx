const testimonials = [
  {
    avatar: 'A',
    text: 'Our wedding at Sapphire Palace was nothing short of magical. The Sabbi Hall was breathtaking — every guest couldn\'t stop complimenting the starlit ceiling and the floral décor.',
    name: 'Ayesha & Bilal Chaudhry',
    event: 'Wedding · Sabbi Hall',
    delay: 1,
  },
  {
    avatar: 'S',
    text: 'We hosted our daughter\'s mehndi at Roshany Hall and it was absolutely perfect. The garden and waterfall setup was like a dream. The bridal suite was immaculate.',
    name: 'Sadia Mahmood',
    event: 'Mehndi · Roshany Hall',
    delay: 2,
  },
  {
    avatar: 'H',
    text: 'Our corporate gala in Rabbi Hall was flawlessly executed. The team\'s professionalism and the venue\'s elegance exceeded every expectation we had.',
    name: 'Hassan Enterprises',
    event: 'Corporate Gala · Rabbi Hall',
    delay: 3,
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="reveal text-center" style={{ marginBottom: '56px' }}>
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            Stories of <em style={{ color: 'var(--gold)' }}>Unforgettable</em><br />Celebrations
          </h2>
          <div className="gold-line" />
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className={`testimonial-card reveal delay-${t.delay}`}>
              <span className="testimonial-quote">&quot;</span>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-stars">★★★★★</div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-event">{t.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
