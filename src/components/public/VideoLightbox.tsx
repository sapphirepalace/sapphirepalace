'use client'

import { useEffect, useRef, useState } from 'react'
import type { Video } from '@/lib/types'
import { getEmbedUrl } from '@/lib/utils/oembed'

interface Props {
  video: Video | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

export default function VideoLightbox({ video, onClose, onPrev, onNext, hasPrev, hasNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [portrait, setPortrait] = useState(false)

  // Reset portrait state when video changes
  useEffect(() => {
    setPortrait(false)
  }, [video?.id])

  useEffect(() => {
    if (!video) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [video, onClose, onPrev, onNext, hasPrev, hasNext])

  if (!video) return null

  const embedUrl = video.source_type !== 'upload' && video.embed_url
    ? getEmbedUrl(video.embed_url)
    : null

  return (
    <div className="video-lightbox open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <button className="video-lightbox-close" onClick={onClose}>✕</button>

      <div className={`video-lightbox-inner${portrait ? ' portrait' : ''}`}>
        {video.source_type === 'upload' && video.storage_path ? (
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', display: 'block', background: '#000' }}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              setPortrait(v.videoHeight > v.videoWidth)
            }}
          >
            <source src={`/api/video-stream?path=${encodeURIComponent(video.storage_path)}`} />
          </video>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : null}
      </div>

      <div className="video-lightbox-caption">{video.title}</div>

      <div className="video-lightbox-nav">
        {hasPrev && <button className="video-lightbox-prev" onClick={onPrev}>‹</button>}
        {hasNext && <button className="video-lightbox-next" onClick={onNext}>›</button>}
      </div>
    </div>
  )
}
