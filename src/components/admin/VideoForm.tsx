'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createVideo, updateVideo } from '@/lib/actions/videos'
import type { Video, VideoSourceType } from '@/lib/types'
import VideoUploadZone from './VideoUploadZone'
import { Loader2, Search } from 'lucide-react'

interface Props {
  video?: Video
}

const HALLS = ['Sabbi Hall', 'Rabbi Hall', 'Roshany Hall', 'Mohiman Hall', 'All Halls']
const EVENTS = ['Wedding', 'Mehndi', 'Walima', 'Corporate', 'Birthday', 'VIP']

export default function VideoForm({ video }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [sourceType, setSourceType] = useState<VideoSourceType>(
    video?.source_type === 'upload' ? 'upload' : 'youtube'
  )
  const [embedUrl, setEmbedUrl] = useState(video?.embed_url ?? '')
  const [storagePath, setStoragePath] = useState(video?.storage_path ?? '')
  const [title, setTitle] = useState(video?.title ?? '')
  const [description, setDescription] = useState(video?.description ?? '')
  const [hallTag, setHallTag] = useState(video?.hall_tag ?? '')
  const [eventTag, setEventTag] = useState(video?.event_tag ?? '')
  const [isActive, setIsActive] = useState(video?.is_active ?? true)
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnail_url ?? '')
  const [fetchingOembed, setFetchingOembed] = useState(false)

  async function fetchOEmbed() {
    if (!embedUrl.trim()) {
      toast.warning('Please enter a YouTube URL first')
      return
    }
    setFetchingOembed(true)
    try {
      const res = await fetch(`/api/oembed?url=${encodeURIComponent(embedUrl)}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Could not fetch video info')
      }
      const data = await res.json()
      if (!title) setTitle(data.title ?? '')
      if (!thumbnailUrl) setThumbnailUrl(data.thumbnailUrl ?? '')
      toast.success('Video info fetched', {
        description: data.title ? `"${data.title}"` : 'Title and thumbnail auto-filled',
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      toast.error('Could not fetch video info', {
        description: msg + '. Make sure the URL is a valid YouTube link.',
      })
    } finally {
      setFetchingOembed(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (sourceType === 'upload' && !storagePath) {
      toast.error('Please upload a video file first')
      return
    }
    if (!title.trim()) {
      toast.error('Please enter a title for the video')
      return
    }

    const fd = new FormData()
    fd.set('source_type', sourceType)
    fd.set('title', title.trim())
    fd.set('description', description)
    fd.set('hall_tag', hallTag)
    fd.set('event_tag', eventTag)
    fd.set('is_active', String(isActive))
    fd.set('thumbnail_url', thumbnailUrl)
    fd.set('thumbnail_type', thumbnailUrl.startsWith('http') ? 'external' : 'storage')
    if (sourceType === 'youtube') fd.set('embed_url', embedUrl)
    if (sourceType === 'upload') fd.set('storage_path', storagePath)

    startTransition(async () => {
      const label = video ? 'Updating video…' : 'Adding video…'
      const successMsg = video ? 'Video updated successfully' : 'Video added to catalogue'

      const promise = (async () => {
        const result = video
          ? await updateVideo(video.id, fd)
          : await createVideo(fd)
        if (result?.error) throw new Error(result.error)
      })()

      toast.promise(promise, {
        loading: label,
        success: successMsg,
        error: (err: Error) => err.message || 'Something went wrong. Please try again.',
      })

      try {
        await promise
        router.push('/admin/videos')
      } catch {
        // error already shown by toast.promise
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      {/* Source type tabs */}
      <div className="admin-form-group">
        <label className="admin-form-label">Video Source</label>
        <div className="admin-source-tabs">
          {(['youtube', 'upload'] as VideoSourceType[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`admin-source-tab${sourceType === t ? ' active' : ''}`}
              onClick={() => setSourceType(t)}
            >
              {t === 'youtube' ? '▶ YouTube Link' : '⬆ Upload Video'}
            </button>
          ))}
        </div>
      </div>

      {/* YouTube URL */}
      {sourceType === 'youtube' && (
        <div className="admin-form-group">
          <label className="admin-form-label">YouTube Video URL *</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              className="admin-form-input"
              placeholder="https://www.youtube.com/watch?v=..."
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              required
            />
            <button
              type="button"
              className="admin-btn-sm"
              onClick={fetchOEmbed}
              disabled={fetchingOembed || !embedUrl.trim()}
              style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {fetchingOembed
                ? <><Loader2 size={12} className="animate-spin" /> Fetching…</>
                : <><Search size={12} /> Fetch Info</>
              }
            </button>
          </div>
          <div style={{ marginTop: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
            Paste the YouTube URL then click &quot;Fetch Info&quot; to auto-fill the title and thumbnail.
          </div>
        </div>
      )}

      {/* File upload */}
      {sourceType === 'upload' && (
        <div className="admin-form-group">
          <label className="admin-form-label">Video File *</label>
          <VideoUploadZone
            value={storagePath}
            onChange={setStoragePath}
            onThumbnail={(url) => { if (!thumbnailUrl) setThumbnailUrl(url) }}
          />
        </div>
      )}

      {/* Title */}
      <div className="admin-form-group">
        <label className="admin-form-label">Title *</label>
        <input
          className="admin-form-input"
          placeholder="e.g. Sabbi Hall Wedding Highlight"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="admin-form-group">
        <label className="admin-form-label">Description <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
        <textarea
          className="admin-form-textarea"
          placeholder="A short description shown with the video..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Thumbnail */}
      <div className="admin-form-group">
        <label className="admin-form-label">
          Thumbnail
          <span style={{ opacity: 0.4, fontWeight: 400, marginLeft: '6px' }}>
            {sourceType === 'youtube' ? '(auto-filled from YouTube)' : '(auto-extracted from video)'}
          </span>
        </label>
        {thumbnailUrl ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              style={{ width: '160px', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid var(--border-gold)', borderRadius: '4px' }}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div style={{ flex: 1 }}>
              <input
                className="admin-form-input"
                placeholder="Or paste a custom image URL"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
              <button
                type="button"
                style={{ marginTop: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setThumbnailUrl('')}
              >
                Remove thumbnail
              </button>
            </div>
          </div>
        ) : (
          <input
            className="admin-form-input"
            placeholder={sourceType === 'youtube'
              ? 'Auto-filled when you click "Fetch Info"'
              : 'Auto-extracted after video uploads'}
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        )}
      </div>

      {/* Tags row */}
      <div className="admin-form-tags-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Hall</label>
          <select className="admin-form-select" value={hallTag} onChange={(e) => setHallTag(e.target.value)}>
            <option value="">— Select hall —</option>
            {HALLS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Event Type</label>
          <select className="admin-form-select" value={eventTag} onChange={(e) => setEventTag(e.target.value)}>
            <option value="">— Select event —</option>
            {EVENTS.map((ev) => <option key={ev}>{ev}</option>)}
          </select>
        </div>
      </div>

      {/* Active toggle */}
      <div className="admin-form-group">
        <label className="admin-form-label">Visibility on Website</label>
        <div
          className="admin-toggle"
          onClick={() => setIsActive(!isActive)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div className={`admin-toggle-switch${isActive ? ' on' : ''}`} />
          <span className="admin-toggle-label">
            {isActive
              ? '✓ Visible — guests can see this video'
              : '✗ Hidden — not shown on the website'}
          </span>
        </div>
      </div>

      {/* Submit */}
      <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
        <button
          type="submit"
          className="btn-gold"
          disabled={pending}
          style={{ opacity: pending ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {video ? 'Save Changes' : 'Add Video'}
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={() => router.push('/admin/videos')}
          style={{ fontSize: '11px' }}
          disabled={pending}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
