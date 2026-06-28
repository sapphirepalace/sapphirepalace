import Link from 'next/link'
import VideoForm from '@/components/admin/VideoForm'
import { ChevronLeft } from 'lucide-react'

export default function NewVideoPage() {
  return (
    <div className="admin-content">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gold)', textDecoration: 'none', marginBottom: '16px' }}>
          <ChevronLeft size={14} /> Back to Videos
        </Link>
        <div className="admin-page-title">Add Video</div>
        <div className="admin-page-sub">Add a YouTube, Vimeo, or uploaded video to the gallery</div>
      </div>

      <div className="admin-card">
        <VideoForm />
      </div>
    </div>
  )
}
