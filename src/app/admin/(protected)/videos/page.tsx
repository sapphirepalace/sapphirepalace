import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import VideoTable from '@/components/admin/VideoTable'
import { PlusCircle } from 'lucide-react'
import type { Video } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminVideosPage() {
  const supabase = await createClient()

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="admin-content">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="admin-page-title">Videos</div>
          <div className="admin-page-sub">
            {videos?.length ?? 0} video{(videos?.length ?? 0) !== 1 ? 's' : ''} · Drag rows to reorder
          </div>
        </div>
        <Link href="/admin/videos/new">
          <button className="btn-gold" type="button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={14} />
              Add Video
            </span>
          </button>
        </Link>
      </div>

      {error && (
        <div className="admin-login-error">{error.message}</div>
      )}

      <div className="admin-card">
        <VideoTable initialVideos={(videos ?? []) as Video[]} />
      </div>
    </div>
  )
}
