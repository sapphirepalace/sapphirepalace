const stats = [
  { icon: '✦', num: '4', label: 'Luxury Halls' },
  { icon: '♛', num: '600+', label: 'Max Capacity' },
  { icon: '◈', num: '500+', label: 'Events Hosted' },
  { icon: '❋', num: '15+', label: 'Years Experience' },
  { icon: '◉', num: '98%', label: 'Satisfaction Rate' },
]

export default function ExperienceStrip() {
  return (
    <div className="experience-strip">
      <div className="container">
        <div className="experience-grid">
          {stats.map((s, i) => (
            <div key={i} className={`experience-item reveal${i > 0 ? ` delay-${i}` : ''}`}>
              <span className="experience-icon">{s.icon}</span>
              <div className="experience-num">{s.num}</div>
              <div className="experience-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
