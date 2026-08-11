'use client'

import { useState, useEffect } from 'react'

/**
 * Detects mobile viewport (<= 768px) for performance optimisations.
 * Also exposes `prefersReducedMotion` so components can skip heavy animations.
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')

    setIsMobile(mql.matches)
    setPrefersReducedMotion(motionMql.matches)

    const handleResize = (e) => setIsMobile(e.matches)
    const handleMotion = (e) => setPrefersReducedMotion(e.matches)

    mql.addEventListener('change', handleResize)
    motionMql.addEventListener('change', handleMotion)

    return () => {
      mql.removeEventListener('change', handleResize)
      motionMql.removeEventListener('change', handleMotion)
    }
  }, [breakpoint])

  return { isMobile, prefersReducedMotion, shouldReduceMotion: isMobile || prefersReducedMotion }
}

export default useIsMobile
