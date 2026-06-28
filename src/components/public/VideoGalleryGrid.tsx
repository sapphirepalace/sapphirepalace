'use client'

import { useState } from 'react'
import type { Video } from '@/lib/types'
import VideoLightbox from './VideoLightbox'

interface Props {
  videos: Video[]
}

function ytFallback(e: React.SyntheticEvent<HTMLImageElement>, src: string) {
  // maxresdefault can 404 — fall back to mqdefault (320x180, true 16:9, always exists)
  if (src.includes('maxresdefault')) {
    e.currentTarget.src = src.replace('maxresdefault', 'mqdefault')
  }
}

export default function VideoGalleryGrid({ videos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (videos.length === 0) return null

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null

  return (
    <>
      <div className="video-gallery-grid reveal">
        {videos.map((v, i) => (
          <div key={v.id} className="video-card" onClick={() => setActiveIndex(i)}>
            <div className="video-card-thumb">
              {v.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.thumbnail_url}
                  alt={v.title}
                  onLoad={(e) => {
                    const img = e.currentTarget
                    if (img.naturalHeight > img.naturalWidth) img.classList.add('portrait-thumb')
                  }}
                  onError={(e) => ytFallback(e, v.thumbnail_url!)}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0a1628,#050f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              )}

              {/* Play button */}
              <div className="video-play-btn">
                <div className="play-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)" style={{ marginLeft: '3px' }}>
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>

              {/* Source badge */}
              {v.source_type === 'youtube' ? (
                <div className="video-source-badge youtube" aria-label="YouTube">
                  {/* YouTube logo: red rounded rect + white play triangle */}
                  <svg viewBox="0 0 48 34" width="38" height="27" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="34" rx="8" fill="#FF0000"/>
                    <polygon points="18,9 18,25 34,17" fill="white"/>
                  </svg>
                </div>
              ) : (
                <div className="video-source-badge upload">Video</div>
              )}

              {/* Title overlay — sits over the bottom gradient */}
              <div className="video-card-info">
                <div className="video-card-title">{v.title}</div>
                {(v.hall_tag || v.event_tag) && (
                  <div className="video-card-tags">
                    {v.hall_tag && <span className="video-tag">{v.hall_tag}</span>}
                    {v.event_tag && <span className="video-tag">{v.event_tag}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <VideoLightbox
          video={activeVideo}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setActiveIndex((i) => (i !== null && i < videos.length - 1 ? i + 1 : i))}
          hasPrev={activeIndex !== null && activeIndex > 0}
          hasNext={activeIndex !== null && activeIndex < videos.length - 1}
        />
      )}
    </>
  )
}
