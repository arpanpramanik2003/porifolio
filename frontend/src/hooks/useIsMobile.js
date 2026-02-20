import { useState, useEffect } from 'react'

/**
 * Detects mobile viewport (<= 768px) for performance optimisations.
 * Also exposes `prefersReducedMotion` so components can skip heavy animations.
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  )

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')

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
