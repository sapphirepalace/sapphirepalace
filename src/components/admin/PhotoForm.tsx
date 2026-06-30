'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createPhoto, updatePhoto } from '@/lib/actions/photos'
import type { Photo } from '@/lib/types'
import PhotoUploadZone from './PhotoUploadZone'
import { Loader2 } from 'lucide-react'

interface Props {
  photo?: Photo
}

const HALLS = ['Sabbi Hall', 'Rabbi Hall', 'Roshany Hall', 'Mohiman Hall', 'All Halls']
const EVENTS = ['Wedding', 'Mehndi', 'Walima', 'Corporate', 'Birthday', 'VIP']

export default function PhotoForm({ photo }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [storagePath, setStoragePath] = useState(photo?.storage_path ?? '')
  const [imageUrl, setImageUrl] = useState(photo?.image_url ?? '')
  const [title, setTitle] = useState(photo?.title ?? '')
  const [hallTag, setHallTag] = useState(photo?.hall_tag ?? '')
  const [eventTag, setEventTag] = useState(photo?.event_tag ?? '')
  const [isActive, setIsActive] = useState(photo?.is_active ?? true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!photo && !storagePath) {
      toast.error('Please upload an image first')
      return
    }

    const fd = new FormData()
    fd.set('title', title.trim())
    fd.set('storage_path', storagePath)
    fd.set('image_url', imageUrl)
    fd.set('hall_tag', hallTag)
    fd.set('event_tag', eventTag)
    fd.set('is_active', String(isActive))

    startTransition(async () => {
      const label = photo ? 'Updating photo…' : 'Adding photo…'
      const successMsg = photo ? 'Photo updated successfully' : 'Photo added to gallery'

      const promise = (async () => {
        const result = photo
          ? await updatePhoto(photo.id, fd)
          : await createPhoto(fd)
        if (result?.error) throw new Error(result.error)
      })()

      toast.promise(promise, {
        loading: label,
        success: successMsg,
        error: (err: Error) => err.message || 'Something went wrong. Please try again.',
      })

      try {
        await promise
        router.push('/admin/photos')
      } catch {
        // error already shown by toast.promise
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {/* Image upload — only for new photos (image can't be swapped on edit) */}
      {!photo ? (
        <div className="admin-form-group">
          <label className="admin-form-label">Image *</label>
          <PhotoUploadZone
            value={storagePath}
            onChange={(path, url) => { setStoragePath(path); setImageUrl(url) }}
          />
        </div>
      ) : (
        <div className="admin-form-group">
          <label className="admin-form-label">Image</label>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title || 'Photo'}
            style={{ maxWidth: '260px', borderRadius: '4px', border: '1px solid var(--border-gold)' }}
          />
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>
            To change the image, delete this photo and upload a new one.
          </div>
        </div>
      )}

      {/* Title */}
      <div className="admin-form-group">
        <label className="admin-form-label">
          Title / Caption
          <span style={{ opacity: 0.4, fontWeight: 400, marginLeft: '6px' }}>(optional)</span>
        </label>
        <input
          className="admin-form-input"
          placeholder="e.g. Sabbi Hall Bridal Stage"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
              ? '✓ Visible — guests can see this photo'
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
          {photo ? 'Save Changes' : 'Add Photo'}
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={() => router.push('/admin/photos')}
          style={{ fontSize: '11px' }}
          disabled={pending}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
