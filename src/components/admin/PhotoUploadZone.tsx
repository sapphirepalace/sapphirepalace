'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  value: string // storage path
  onChange: (storagePath: string, publicUrl: string) => void
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
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
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

export default function PhotoUploadZone({ value, onChange }: Props) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image (JPG, PNG, WebP)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large — maximum 10 MB')
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setError('Not authenticated — please log in again')
      setUploading(false)
      return
    }

    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
    const uploadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/photos/${path}`

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
      const uploadedPath = result.path || path
      const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(uploadedPath)
      setPreview(publicUrl)
      onChange(uploadedPath, publicUrl)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

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
        {(preview || value) && !uploading ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded preview"
              style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', margin: '0 auto 12px', display: 'block', border: '1px solid var(--border-gold)' }}
            />
            <div className="upload-zone-text" style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Image uploaded
            </div>
            <div className="upload-zone-sub" style={{ marginTop: '4px', opacity: 0.5 }}>Click to replace</div>
          </>
        ) : (
          <>
            <div className="upload-zone-icon">
              <Upload size={36} />
            </div>
            <div className="upload-zone-text">
              {uploading ? `Uploading… ${progress}%` : 'Drop your image here or click to browse'}
            </div>
            <div className="upload-zone-sub">JPG, PNG, WebP — max 10 MB</div>
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
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
