const posts = [
  {
    img: '/assets/images/gallery-15.jpg',
    cat: 'Weddings',
    date: 'May 2025',
    title: 'Top 10 Wedding Décor Trends in Lahore for 2025',
    excerpt: 'Discover the hottest wedding decoration styles sweeping Lahore — from ethereal floral arches to starlit ceilings.',
    delay: 1,
  },
  {
    img: '/assets/images/gallery-16.jpg',
    cat: 'Ceremonies',
    date: 'April 2025',
    title: 'How to Plan the Perfect Mehndi Night in Lahore',
    excerpt: 'From dholki arrangements to stage design, our guide covers everything for an unforgettable mehndi.',
    delay: 2,
  },
  {
    img: '/assets/images/gallery-17.jpg',
    cat: 'Events',
    date: 'March 2025',
    title: "Why Sapphire Palace is Lahore's Top Corporate Event Venue",
    excerpt: "What makes a truly premium event? We explore how Sapphire's facilities set the gold standard in Pakistan.",
    delay: 3,
  },
]

export default function BlogSection() {
  return (
    <section id="blog" className="section blog-section">
      <div className="container">
        <div className="reveal text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span className="section-tag">Our Blog</span>
          <h2 className="section-title">
            Inspiration &amp;<br /><em style={{ color: 'var(--gold)' }}>Ideas</em> for Your Event
          </h2>
          <div className="gold-line" />
        </div>
        <div className="blog-grid">
          {posts.map((p) => (
            <div key={p.title} className={`blog-card reveal delay-${p.delay}`}>
              <div className="blog-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} />
                <div className="blog-card-cat">{p.cat}</div>
              </div>
              <div className="blog-card-body">
                <div className="blog-date">{p.date}</div>
                <div className="blog-title">{p.title}</div>
                <div className="blog-excerpt">{p.excerpt}</div>
                <div className="blog-read">Read More</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
