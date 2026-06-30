'use client'

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  /** Pixels per second of auto-scroll. */
  speed?: number
  children: ReactNode
}

/**
 * Auto-scrolling, drag-able, arrow-controllable marquee.
 * - Auto-scrolls continuously via rAF.
 * - Pauses on hover, while dragging, and ~2s after any manual interaction.
 * - Seamlessly loops by duplicating children and wrapping scrollLeft at the half-way point.
 * - Drag/swipe to scrub; click still works (a real drag suppresses the click).
 */
export default function MediaMarquee({ speed = 40, children }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const pausedUntilRef = useRef(0)
  const hoveringRef = useRef(false)
  const draggingRef = useRef(false)
  const lastTsRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  // Drag state
  const dragStartXRef = useRef(0)
  const dragStartScrollRef = useRef(0)
  const movedRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Wrap scrollLeft so the duplicated second half loops seamlessly back to the first.
  const wrap = useCallback((el: HTMLDivElement) => {
    const half = el.scrollWidth / 2
    if (half <= 0) return
    if (el.scrollLeft >= half) el.scrollLeft -= half
    else if (el.scrollLeft < 0) el.scrollLeft += half
  }, [])

  useEffect(() => {
    if (reduced) return
    const el = trackRef.current
    if (!el) return

    const step = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      const now = ts
      const active = !hoveringRef.current && !draggingRef.current && now >= pausedUntilRef.current
      if (active) {
        el.scrollLeft += speed * dt
        wrap(el)
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [reduced, speed, wrap])

  const nudge = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6 * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
    pausedUntilRef.current = performance.now() + 2500
  }

  // Pointer drag-to-scrub
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    draggingRef.current = true
    movedRef.current = false
    dragStartXRef.current = e.clientX
    dragStartScrollRef.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const el = trackRef.current
    if (!el) return
    const dx = e.clientX - dragStartXRef.current
    if (Math.abs(dx) > 4) movedRef.current = true
    el.scrollLeft = dragStartScrollRef.current - dx
    wrap(el)
  }
  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    pausedUntilRef.current = performance.now() + 2500
    try { trackRef.current?.releasePointerCapture(e.pointerId) } catch {}
  }

  // Suppress click after a real drag so the lightbox doesn't open on a scrub.
  const onClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.stopPropagation()
      e.preventDefault()
      movedRef.current = false
    }
  }

  return (
    <div
      className="media-marquee"
      onMouseEnter={() => { hoveringRef.current = true }}
      onMouseLeave={() => { hoveringRef.current = false }}
    >
      <button
        type="button"
        className="marquee-arrow left"
        aria-label="Scroll left"
        onClick={() => nudge(-1)}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={trackRef}
        className={`media-marquee-viewport${reduced ? ' reduced' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className="media-marquee-track">
          {children}
        </div>
      </div>

      <button
        type="button"
        className="marquee-arrow right"
        aria-label="Scroll right"
        onClick={() => nudge(1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
