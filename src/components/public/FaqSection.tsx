'use client'

import { useState } from 'react'

const faqs = [
  { q: 'What is the maximum guest capacity?', a: 'Our largest hall, Sabbi Hall, accommodates up to 600 guests. Across all four halls we host events from 50 to 600 guests.' },
  { q: 'Does every hall have a dedicated bridal room?', a: 'Yes — every hall at Sapphire Palace includes a private, luxuriously appointed bridal suite for your preparation and comfort.' },
  { q: 'Do you offer catering and decoration services?', a: 'Absolutely. We offer premium in-house catering by our master chefs and a full luxury decoration service. Our décor team brings your vision to life.' },
  { q: 'Is parking available at the venue?', a: 'Yes. We feature a large dedicated parking area with professional valet parking service for all your guests.' },
  { q: 'Can we book for a pre-wedding photoshoot?', a: 'Yes! We have a dedicated Shooting Palace — beautifully designed for bridal shoots, cinematic videography and pre-wedding sessions.' },
  { q: 'How far in advance should I book?', a: 'We recommend 3–6 months in advance for weddings. We also accommodate last-minute bookings subject to availability.' },
  { q: 'Where exactly is Sapphire Palace Event Complex?', a: 'We are at Shamim Ul Haq Chowk, Nasheman-e-Iqbal Phase 2, Lahore — easily accessible from all major areas of Lahore.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="reveal text-center" style={{ maxWidth: '600px', margin: '0 auto 56px' }}>
          <span className="section-tag">FAQs</span>
          <h2 className="section-title">
            Frequently Asked<br /><em style={{ color: 'var(--gold)' }}>Questions</em>
          </h2>
          <div className="gold-line" />
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {faq.q}
                <span className="faq-arrow">+</span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
