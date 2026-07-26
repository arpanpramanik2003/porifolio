import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll — Wraps the app with Lenis smooth scrolling.
 *
 * Tuned for a natural, weighted feel:
 *  - Fast initial response (no "floaty" delay)
 *  - Smooth deceleration tail
 *  - Proper cleanup on unmount
 */
const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // RAF render loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
