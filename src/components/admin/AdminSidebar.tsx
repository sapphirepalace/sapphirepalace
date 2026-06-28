'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/actions/auth'
import { Film, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

  return (
    <>
      {/* Mobile top bar — hidden on desktop via CSS */}
      <div className="admin-mobile-bar">
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '17px', fontWeight: 700, color: 'var(--white)' }}>
          Sapphire Palace
        </span>
        <button className="admin-hamburger" onClick={() => setOpen(true)} aria-label="Open navigation">
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay backdrop */}
      <div className={`admin-mobile-overlay${open ? ' open' : ''}`} onClick={close} />

      {/* Sidebar — static on desktop, slide-in drawer on mobile */}
      <div className={`admin-sidebar${open ? ' admin-sidebar-open' : ''}`}>
        <button className="admin-sidebar-close" onClick={close} aria-label="Close navigation">
          <X size={20} />
        </button>

        <div className="admin-logo">
          <div className="admin-logo-text">Sapphire Palace</div>
          <div className="admin-logo-sub">Admin Panel</div>
        </div>

        <nav className="admin-nav">
          <Link
            href="/admin/videos"
            className={`admin-nav-item${pathname.startsWith('/admin/videos') ? ' active' : ''}`}
            onClick={close}
          >
            <Film size={16} />
            Videos
          </Link>
          <Link href="/" className="admin-nav-item" target="_blank" onClick={close}>
            <LayoutDashboard size={16} />
            View Site
          </Link>
        </nav>

        <div style={{ padding: '0 12px' }}>
          <form action={signOut}>
            <button type="submit" className="admin-nav-item" style={{ color: 'rgba(255,100,100,0.7)' }}>
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
