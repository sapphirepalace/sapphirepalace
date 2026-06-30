import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PhotoTable from '@/components/admin/PhotoTable'
import { PlusCircle } from 'lucide-react'
import type { Photo } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminPhotosPage() {
  const supabase = await createClient()

  const { data: photos, error } = await supabase
    .from('photos')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="admin-content">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="admin-page-title">Photos</div>
          <div className="admin-page-sub">
            {photos?.length ?? 0} photo{(photos?.length ?? 0) !== 1 ? 's' : ''} · Drag rows to reorder
          </div>
        </div>
        <Link href="/admin/photos/new">
          <button className="btn-gold" type="button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={14} />
              Add Photo
            </span>
          </button>
        </Link>
      </div>

      {error && (
        <div className="admin-login-error">{error.message}</div>
      )}

      <div className="admin-card">
        <PhotoTable initialPhotos={(photos ?? []) as Photo[]} />
      </div>
    </div>
  )
}
