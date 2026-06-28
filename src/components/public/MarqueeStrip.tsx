const items = [
  'Weddings', 'Mehndi Ceremonies', 'Walima Events', 'Corporate Gatherings',
  'Birthday Celebrations', 'VIP Events', 'Bridal Shoots', 'Luxury Banquets',
]

export default function MarqueeStrip() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <div className="marquee-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
