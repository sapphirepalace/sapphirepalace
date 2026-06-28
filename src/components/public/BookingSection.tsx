'use client'

import { useState } from 'react'

export default function BookingSection() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [event, setEvent] = useState('')
  const [hall, setHall] = useState('')
  const [guests, setGuests] = useState('')
  const [date, setDate] = useState('')
  const [msg, setMsg] = useState('')
  function openWA(e: React.MouseEvent) {
    e.preventDefault()
    const text = `Assalamu Alaikum! I'm ${name || 'Guest'} and I'd like to inquire about booking Sapphire Palace Event Complex.\n\nEvent: ${event || 'event'}\nHall: ${hall || 'hall'}\nDate: ${date || 'TBD'}\nGuests: ${guests || 'TBD'}\n${msg ? 'Message: ' + msg : ''}`
    window.open('https://wa.me/923210512345?text=' + encodeURIComponent(text), '_blank')
  }

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        <div className="booking-inner">
          <div className="reveal-left">
            <span className="section-tag">Online Booking</span>
            <h2 className="booking-info-title">
              Reserve Your<br /><em style={{ color: 'var(--gold)' }}>Perfect</em><br />Occasion
            </h2>
            <div className="gold-line" style={{ margin: '18px 0 28px' }} />
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, maxWidth: '400px' }}>
              Take the first step towards your dream event. Our luxury specialists will contact you within 24 hours to discuss every detail.
            </p>
            <ul className="contact-list">
              <li className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <a href="https://maps.app.goo.gl/vhodg3PenFtkZ9hs9" target="_blank" rel="noreferrer" className="contact-value">
                    Shamim Ul Haq Chowk, Nasheman-e-Iqbal Phase 2, Lahore
                  </a>
                  <br />
                  <a href="https://maps.app.goo.gl/vhodg3PenFtkZ9hs9" target="_blank" rel="noreferrer" className="map-link">
                    View on Google Maps →
                  </a>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <a href="tel:+923210512345" className="contact-value">+92 321 0512345</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">✉</div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:saphirepalace123@gmail.com" className="contact-value">saphirepalace123@gmail.com</a>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <a href="https://wa.me/923210512345" target="_blank" rel="noreferrer" className="contact-value">+92 321 0512345</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="reveal-right">
            <div className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+92 3XX XXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Event Type</label>
                  <select className="form-select" value={event} onChange={(e) => setEvent(e.target.value)}>
                    <option value="">Select Event Type</option>
                    {['Wedding', 'Mehndi', 'Walima', 'Corporate Event', 'Birthday', 'VIP / Private Event', 'Other'].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Hall Selection</label>
                  <select className="form-select" value={hall} onChange={(e) => setHall(e.target.value)}>
                    <option value="">Choose a Hall</option>
                    {['Sabbi Hall (250–600 guests)', 'Rabbi Hall (200–450 guests)', 'Roshany Hall (100–200 guests)', 'Mohiman Hall (50–100 guests)', 'Not Sure Yet'].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Guest Count</label>
                  <input className="form-input" type="number" placeholder="Expected guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Event Date</label>
                  <input className="form-input" type="date" style={{ colorScheme: 'dark' }} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell us about your vision, requirements or special requests..." value={msg} onChange={(e) => setMsg(e.target.value)} />
              </div>
              {!name || !phone || !event || !hall ? (
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', marginBottom: '12px' }}>
                  ✦ Fill in Name, Phone, Event Type and Hall to enable the button
                </p>
              ) : null}
              <div className="form-btns">
                <a href="#" onClick={openWA} className="btn-gold" style={{ fontSize: '11px' }}>
                  <span>💬 Send via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
