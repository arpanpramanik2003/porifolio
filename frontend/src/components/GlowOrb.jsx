import { useEffect, useRef, useState } from 'react'

/**
 * GlowOrb — a large radial glow that follows the cursor.
 * Reminiscent of the Antigravity-style cursor-tracking dot,
 * but rendered as a smooth, neon ambient light.
 */
const GlowOrb = () => {
  const orbRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsMobile(checkMobile)
    if (checkMobile) return

    let rafId = null
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const handleMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      // Smooth lerp towards target position
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (isMobile) return null

  return <div ref={orbRef} className="glow-orb" />
}

export default GlowOrb
