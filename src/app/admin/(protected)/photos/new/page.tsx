import Link from 'next/link'
import PhotoForm from '@/components/admin/PhotoForm'
import { ChevronLeft } from 'lucide-react'

export default function NewPhotoPage() {
  return (
    <div className="admin-content">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/photos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '2px', color: 'var(--gold)', textDecoration: 'none', marginBottom: '16px' }}>
          <ChevronLeft size={14} /> Back to Photos
        </Link>
        <div className="admin-page-title">Add Photo</div>
        <div className="admin-page-sub">Upload an image to the public gallery</div>
      </div>

      <div className="admin-card">
        <PhotoForm />
      </div>
    </div>
  )
}
