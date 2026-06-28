'use client'

import { useActionState } from 'react'
import { signIn } from '@/lib/actions/auth'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-logo">
          <div className="admin-login-title">Sapphire Palace</div>
          <div className="admin-login-sub">Admin Portal</div>
        </div>

        {state?.error && (
          <div className="admin-login-error">{state.error}</div>
        )}

        <form action={action}>
          <div className="admin-form-group" style={{ marginBottom: '18px' }}>
            <label className="admin-form-label">Email Address</label>
            <input
              className="admin-form-input"
              type="email"
              name="email"
              placeholder="admin@sapphirepalace.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-form-group" style={{ marginBottom: '28px' }}>
            <label className="admin-form-label">Password</label>
            <input
              className="admin-form-input"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', justifyContent: 'center', opacity: pending ? 0.7 : 1 }}
            disabled={pending}
          >
            <span>{pending ? 'Signing In…' : 'Sign In'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
