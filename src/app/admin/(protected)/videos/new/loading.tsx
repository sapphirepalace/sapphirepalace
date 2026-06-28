export default function NewVideoLoading() {
  return (
    <div className="admin-content">
      <div style={{ marginBottom: 32 }}>
        <div className="skeleton-block" style={{ width: 140, height: 32, marginBottom: 10 }} />
        <div className="skeleton-block" style={{ width: 220, height: 13 }} />
      </div>
      <div className="admin-card admin-form">
        {/* Source tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          <div className="skeleton-block" style={{ width: 140, height: 40 }} />
          <div className="skeleton-block" style={{ width: 140, height: 40 }} />
        </div>
        {/* URL field */}
        <div style={{ marginBottom: 24 }}>
          <div className="skeleton-block" style={{ width: 120, height: 12, marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="skeleton-block" style={{ flex: 1, height: 44 }} />
            <div className="skeleton-block" style={{ width: 110, height: 44 }} />
          </div>
        </div>
        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <div className="skeleton-block" style={{ width: 60, height: 12, marginBottom: 8 }} />
          <div className="skeleton-block" style={{ width: '100%', height: 44 }} />
        </div>
        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <div className="skeleton-block" style={{ width: 90, height: 12, marginBottom: 8 }} />
          <div className="skeleton-block" style={{ width: '100%', height: 80 }} />
        </div>
        {/* Thumbnail */}
        <div style={{ marginBottom: 24 }}>
          <div className="skeleton-block" style={{ width: 100, height: 12, marginBottom: 8 }} />
          <div className="skeleton-block" style={{ width: '100%', height: 44 }} />
        </div>
        {/* Tags */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <div className="skeleton-block" style={{ width: 60, height: 12, marginBottom: 8 }} />
            <div className="skeleton-block" style={{ width: '100%', height: 44 }} />
          </div>
          <div>
            <div className="skeleton-block" style={{ width: 80, height: 12, marginBottom: 8 }} />
            <div className="skeleton-block" style={{ width: '100%', height: 44 }} />
          </div>
        </div>
        {/* Submit */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="skeleton-block" style={{ width: 120, height: 44 }} />
          <div className="skeleton-block" style={{ width: 80, height: 44 }} />
        </div>
      </div>
    </div>
  )
}
