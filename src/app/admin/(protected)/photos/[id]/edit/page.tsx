import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PhotoForm from '@/components/admin/PhotoForm'
import type { Photo } from '@/lib/types'
import { ChevronLeft } from 'lucide-react'

export default async function EditPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: photo } = await supabase
    .from('photos')
    .select('*')
    .eq('id', id)
    .single()

  if (!photo) notFound()

  return (
    <div className="admin-content">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/photos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gold)', textDecoration: 'none', marginBottom: '16px' }}>
          <ChevronLeft size={14} /> Back to Photos
        </Link>
        <div className="admin-page-title">Edit Photo</div>
        <div className="admin-page-sub">Update photo details</div>
      </div>

      <div className="admin-card">
        <PhotoForm photo={photo as Photo} />
      </div>
    </div>
  )
}
