'use client'

import { useState } from 'react'
import type { Video } from '@/lib/types'
import VideoGalleryGrid from './VideoGalleryGrid'

const staticImgs = [
  { src: '/assets/images/gallery-5.jpg', cap: 'Sabbi Grand Hall', i: 0 },
  { src: '/assets/images/gallery-6.jpg', cap: 'Floral Elegance', i: 1 },
  { src: '/assets/images/gallery-7.jpg', cap: 'Banquet Dining', i: 2 },
  { src: '/assets/images/gallery-8.jpg', cap: 'Bridal Stage', i: 3 },
  { src: '/assets/images/gallery-9.jpg', cap: 'Luxury Décor', i: 4 },
  { src: '/assets/images/gallery-10.jpg', cap: 'Mehndi Setup', i: 5 },
]

const bottomImgs = [
  { src: '/assets/images/gallery-11.jpg', cap: 'Garden Theme', i: 6 },
  { src: '/assets/images/gallery-12.jpg', cap: 'Waterfall Feature', i: 7 },
  { src: '/assets/images/gallery-13.jpg', cap: 'Traditional Art', i: 8 },
  { src: '/assets/images/gallery-14.jpg', cap: 'VIP Lounge', i: 9 },
]

const allImgs = [...staticImgs, ...bottomImgs]

interface Props {
  videos: Video[]
}

export default function GallerySection({ videos }: Props) {
  const [lightboxImg, setLightboxImg] = useState<number | null>(null)

  function closeLightbox() { setLightboxImg(null) }
  function changeLightbox(d: number) {
    setLightboxImg((cur) => cur !== null ? (cur + d + allImgs.length) % allImgs.length : null)
  }

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="reveal text-center">
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">Moments of <em style={{ color: 'var(--gold)' }}>Eternal</em> Beauty</h2>
          <div className="gold-line" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Real moments captured at Sapphire Palace Event Complex — every setup, every detail, every memory.
          </p>
        </div>

        {/* Static image gallery */}
        <div className="gallery-grid reveal">
          {staticImgs.map((img) => (
            <div key={img.i} className="gallery-item" onClick={() => setLightboxImg(img.i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.cap} />
              <div className="gallery-overlay"><span>View</span><small>{img.cap}</small></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '6px', marginBottom: '40px' }} className="reveal">
          {bottomImgs.map((img) => (
            <div key={img.i} className="gallery-item" style={{ height: '180px' }} onClick={() => setLightboxImg(img.i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.cap} />
              <div className="gallery-overlay"><span>View</span><small>{img.cap}</small></div>
            </div>
          ))}
        </div>

        {/* Video catalogue — only rendered when videos exist */}
        {videos.length > 0 && (
          <>
            <div className="reveal text-center" style={{ marginTop: '60px', marginBottom: '0' }}>
              <span className="section-tag">Video Showcase</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
                Experience the <em style={{ color: 'var(--gold)' }}>Magic</em>
              </h2>
              <div className="gold-line" />
              <p className="section-subtitle" style={{ margin: '0 auto 0' }}>
                Watch real event highlights from Sapphire Palace Event Complex.
              </p>
            </div>
            <VideoGalleryGrid videos={videos} />
          </>
        )}

        <div className="text-center reveal">
          <a href="#booking" className="btn-outline">Request a Venue Tour</a>
        </div>
      </div>

      {/* Image lightbox */}
      {lightboxImg !== null && (
        <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-prev" onClick={() => changeLightbox(-1)}>&#8249;</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-img" src={allImgs[lightboxImg].src} alt={allImgs[lightboxImg].cap} />
          <button className="lightbox-next" onClick={() => changeLightbox(1)}>&#8250;</button>
          <div className="lightbox-caption">{allImgs[lightboxImg].cap}</div>
        </div>
      )}
    </section>
  )
}
