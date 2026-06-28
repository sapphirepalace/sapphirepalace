'use client'

import { useEffect } from 'react'

export function useRevealAnimation() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
      obs.observe(el),
    )

    return () => obs.disconnect()
  }, [])
}
