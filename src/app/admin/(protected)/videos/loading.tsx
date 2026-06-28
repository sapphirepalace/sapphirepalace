export default function VideosLoading() {
  return (
    <div className="admin-content">
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="skeleton-block" style={{ width: 90, height: 32, marginBottom: 10 }} />
          <div className="skeleton-block" style={{ width: 160, height: 13 }} />
        </div>
        <div className="skeleton-block" style={{ width: 120, height: 40 }} />
      </div>

      {/* Table card */}
      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th />
                <th>Thumb</th>
                <th>Title</th>
                <th>Source</th>
                <th>Hall</th>
                <th>Event</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  {/* Drag handle */}
                  <td style={{ width: 24 }}>
                    <div className="skeleton-block" style={{ width: 14, height: 14 }} />
                  </td>
                  {/* Thumbnail */}
                  <td>
                    <div className="skeleton-block admin-thumb" />
                  </td>
                  {/* Title + description */}
                  <td>
                    <div className="skeleton-block" style={{ width: '65%', height: 14, marginBottom: 7 }} />
                    <div className="skeleton-block" style={{ width: '40%', height: 11 }} />
                  </td>
                  {/* Source badge */}
                  <td>
                    <div className="skeleton-block" style={{ width: 62, height: 20 }} />
                  </td>
                  {/* Hall */}
                  <td>
                    <div className="skeleton-block" style={{ width: 72, height: 13 }} />
                  </td>
                  {/* Event */}
                  <td>
                    <div className="skeleton-block" style={{ width: 60, height: 13 }} />
                  </td>
                  {/* Toggle */}
                  <td>
                    <div className="skeleton-block" style={{ width: 44, height: 24, borderRadius: 12 }} />
                  </td>
                  {/* Actions */}
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div className="skeleton-block" style={{ width: 30, height: 30 }} />
                      <div className="skeleton-block" style={{ width: 30, height: 30 }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
