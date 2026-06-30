export default function PhotosLoading() {
  return (
    <div className="admin-content">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="skeleton-block" style={{ width: 140, height: 32, marginBottom: 10 }} />
          <div className="skeleton-block" style={{ width: 220, height: 13 }} />
        </div>
        <div className="skeleton-block" style={{ width: 130, height: 44 }} />
      </div>
      <div className="admin-card">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <div className="skeleton-block" style={{ width: 14, height: 14 }} />
            <div className="skeleton-block" style={{ width: 64, height: 40 }} />
            <div className="skeleton-block" style={{ flex: 1, height: 16, maxWidth: 220 }} />
            <div className="skeleton-block" style={{ width: 70, height: 14 }} />
            <div className="skeleton-block" style={{ width: 70, height: 14 }} />
            <div className="skeleton-block" style={{ width: 44, height: 24 }} />
            <div className="skeleton-block" style={{ width: 70, height: 28 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
