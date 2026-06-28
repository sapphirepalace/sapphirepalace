import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import VideoForm from '@/components/admin/VideoForm'
import type { Video } from '@/lib/types'
import { ChevronLeft } from 'lucide-react'

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (!video) notFound()

  return (
    <div className="admin-content">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gold)', textDecoration: 'none', marginBottom: '16px' }}>
          <ChevronLeft size={14} /> Back to Videos
        </Link>
        <div className="admin-page-title">Edit Video</div>
        <div className="admin-page-sub">Update video details</div>
      </div>

      <div className="admin-card">
        <VideoForm video={video as Video} />
      </div>
    </div>
  )
}
