'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  value: string
  onChange: (path: string) => void
  onThumbnail?: (publicUrl: string) => void
}

function extractVideoFrame(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true

    const blobUrl = URL.createObjectURL(file)
    video.src = blobUrl

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(5, video.duration * 0.15)
    })

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      URL.revokeObjectURL(blobUrl)
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.85)
    })

    video.addEventListener('error', () => {
      URL.revokeObjectURL(blobUrl)
      resolve(null)
    })

    setTimeout(() => { URL.revokeObjectURL(blobUrl); resolve(null) }, 8000)
  })
}

// XHR upload gives us real byte-level progress, unlike fetch
function xhrUpload(
  url: string,
  file: File,
  headers: Record<string, string>,
  onProgress: (pct: number) => void,
): Promise<{ path: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 90)) // reserve last 10% for thumbnail
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText)
          resolve({ path: res.Key?.split('/').slice(1).join('/') ?? res.path ?? '' })
        } catch {
          reject(new Error('Upload succeeded but response could not be parsed'))
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText)
          reject(new Error(err.message || err.error || `Upload failed (${xhr.status})`))
        } catch {
          reject(new Error(`Upload failed (${xhr.status})`))
        }
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Network error — check your connection')))
    xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')))

    xhr.open('POST', url)
    Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v))
    xhr.send(file)
  })
}

export default function VideoUploadZone({ value, onChange, onThumbnail }: Props) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [phase, setPhase] = useState<'uploading' | 'thumbnail' | ''>('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, WebM, MOV)')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      setError('File too large — maximum 500 MB')
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)
    setPhase('uploading')
    setFileName(file.name)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setError('Not authenticated — please log in again')
      setUploading(false)
      return
    }

    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
    const uploadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/videos/${path}`

    let uploadedPath: string
    try {
      const result = await xhrUpload(
        uploadUrl,
        file,
        {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': file.type,
          'x-upsert': 'false',
        },
        setProgress,
      )
      uploadedPath = result.path || path
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploading(false)
      setPhase('')
      return
    }

    onChange(uploadedPath)
    setProgress(90)

    // Extract + upload thumbnail
    if (onThumbnail) {
      setPhase('thumbnail')
      try {
        const frame = await extractVideoFrame(file)
        if (frame) {
          const thumbPath = `${crypto.randomUUID()}.jpg`
          const { data: thumbData } = await supabase.storage
            .from('thumbnails')
            .upload(thumbPath, frame, { contentType: 'image/jpeg' })
          if (thumbData) {
            const { data: { publicUrl } } = supabase.storage
              .from('thumbnails')
              .getPublicUrl(thumbData.path)
            onThumbnail(publicUrl)
          }
        }
      } catch {
        // best-effort
      }
    }

    setProgress(100)
    setUploading(false)
    setPhase('')
  }

  const progressLabel = phase === 'thumbnail'
    ? 'Extracting thumbnail…'
    : `Uploading… ${progress}%`

  return (
    <div>
      <div
        className={`upload-zone${dragOver ? ' drag-over' : ''}`}
        onClick={() => { if (!uploading) inputRef.current?.click() }}
        onDragOver={(e) => { e.preventDefault(); if (!uploading) setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (!uploading) { const f = e.dataTransfer.files[0]; if (f) handleFile(f) }
        }}
        style={{ cursor: uploading ? 'default' : 'pointer' }}
      >
        <div className="upload-zone-icon">
          {value && !uploading
            ? <CheckCircle size={36} color="var(--gold)" />
            : <Upload size={36} />}
        </div>

        {value && !uploading ? (
          <>
            <div className="upload-zone-text" style={{ color: 'var(--gold)' }}>
              Video uploaded successfully
            </div>
            <div className="upload-zone-sub">{fileName || value.split('-').slice(1).join('-')}</div>
            <div className="upload-zone-sub" style={{ marginTop: '4px', opacity: 0.5 }}>Click to replace</div>
          </>
        ) : (
          <>
            <div className="upload-zone-text">
              {uploading ? progressLabel : 'Drop your video here or click to browse'}
            </div>
            <div className="upload-zone-sub">MP4, WebM, MOV — max 500 MB</div>
            {!uploading && (
              <div className="upload-zone-sub" style={{ marginTop: '4px' }}>
                Thumbnail will be extracted automatically
              </div>
            )}
          </>
        )}

        {uploading && (
          <div className="upload-progress" style={{ marginTop: '16px' }}>
            <div
              className="upload-progress-bar"
              style={{ width: `${progress}%`, transition: progress === 0 ? 'none' : 'width 0.3s ease' }}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="admin-form-error" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
