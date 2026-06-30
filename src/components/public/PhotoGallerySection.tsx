'use client'

import { useState, useEffect } from 'react'
import type { Photo } from '@/lib/types'

interface Props {
  photos: Photo[]
}

export default function PhotoGallerySection({ photos }: Props) {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowLeft') setIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : i))
      if (e.key === 'ArrowRight') setIndex((i) => (i !== null ? (i + 1) % photos.length : i))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, photos.length])

  if (photos.length === 0) return null

  const active = index !== null ? photos[index] : null

  return (
    <section id="photos" className="section gallery-section">
      <div className="container">
        <div className="reveal text-center">
          <span className="section-tag">Photo Gallery</span>
          <h2 className="section-title">A Glimpse of <em style={{ color: 'var(--gold)' }}>Our</em> Spaces</h2>
          <div className="gold-line" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore real photographs from events hosted at Sapphire Palace Event Complex.
          </p>
        </div>

        <div className="photo-gallery-grid reveal">
          {photos.map((p, i) => (
            <div key={p.id} className="photo-card" onClick={() => setIndex(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.title || 'Gallery photo'} loading="lazy" />
              <div className="photo-overlay">
                <span>View</span>
                {(p.title || p.hall_tag || p.event_tag) && (
                  <small>{p.title || [p.hall_tag, p.event_tag].filter(Boolean).join(' · ')}</small>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) setIndex(null) }}>
          <button className="lightbox-close" onClick={() => setIndex(null)}>✕</button>
          {photos.length > 1 && (
            <button className="lightbox-prev" onClick={() => setIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : i))}>&#8249;</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-img" src={active.image_url} alt={active.title || 'Gallery photo'} />
          {photos.length > 1 && (
            <button className="lightbox-next" onClick={() => setIndex((i) => (i !== null ? (i + 1) % photos.length : i))}>&#8250;</button>
          )}
          {(active.title || active.hall_tag || active.event_tag) && (
            <div className="lightbox-caption">
              {active.title || [active.hall_tag, active.event_tag].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
