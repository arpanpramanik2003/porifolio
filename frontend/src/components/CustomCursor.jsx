'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'

/**
 * CustomCursor — Larger, elegant, theme-aware custom cursor.
 *
 * Design:
 *  - 20px fluid precision dot (scaled up from 10px).
 *  - Tailored color palette for Light vs Dark themes.
 *  - Light theme: Crisp deep indigo (#4338ca) with soft elevation shadow.
 *  - Dark theme: Vibrant glowing electric indigo (#6366f1) with ambient glow.
 *  - Uses requestAnimationFrame lerp for buttery 60fps tracking.
 *  - Scales smoothly to 1.75x on interactive hover.
 */
const CustomCursor = () => {
  const { isDarkMode } = useTheme()
  const dotRef = useRef(null)
  const mouse = useRef({ x: -50, y: -50 })
  const pos = useRef({ x: -50, y: -50 })
  const scale = useRef(1)
  const targetScale = useRef(1)
  const opacity = useRef(1)
  const targetOpacity = useRef(1)
  const rafId = useRef(null)
  const isTouch = useRef(false)

  const lerp = useCallback((a, b, n) => a + (b - a) * n, [])

  useEffect(() => {
    // Detect touch devices — disable entirely on touch/mobile
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      isTouch.current = true
      return
    }

    const dot = dotRef.current
    if (!dot) return

    let isRunning = false

    const startLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true
        rafId.current = requestAnimationFrame(animate)
      }
    }

    const stopLoop = () => {
      isRunning = false
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      startLoop()
    }

    const onMouseOver = (e) => {
      const t = e.target
      if (
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.closest('a') ||
        t.closest('button') ||
        t.classList?.contains('card-arch') ||
        t.classList?.contains('cursor-pointer') ||
        t.getAttribute('role') === 'button'
      ) {
        targetScale.current = 1.75
        targetOpacity.current = 0.85
      } else {
        targetScale.current = 1
        targetOpacity.current = 1
      }
      startLoop()
    }

    const onMouseDown = () => {
      targetScale.current = 0.75
      startLoop()
    }

    const onMouseUp = () => {
      targetScale.current = 1
      startLoop()
    }

    const onMouseLeave = () => {
      targetOpacity.current = 0
      startLoop()
    }

    const onMouseEnter = () => {
      targetOpacity.current = 1
      startLoop()
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      } else {
        startLoop()
      }
    }

    // Animation loop — pure RAF lerp for 60fps tracking with idle auto-pause
    const animate = () => {
      if (!isRunning || document.hidden) return

      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.18)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.18)
      scale.current = lerp(scale.current, targetScale.current, 0.18)
      opacity.current = lerp(opacity.current, targetOpacity.current, 0.15)

      // Center offset for 20px size (-10px)
      dot.style.transform = `translate3d(${pos.current.x - 10}px, ${pos.current.y - 10}px, 0) scale(${scale.current})`
      dot.style.opacity = opacity.current

      // Settle check: pause loop when cursor position has settled
      const dx = Math.abs(pos.current.x - mouse.current.x)
      const dy = Math.abs(pos.current.y - mouse.current.y)
      const ds = Math.abs(scale.current - targetScale.current)
      const dop = Math.abs(opacity.current - targetOpacity.current)

      if (dx < 0.05 && dy < 0.05 && ds < 0.005 && dop < 0.005) {
        isRunning = false
        rafId.current = null
      } else {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('visibilitychange', onVisibilityChange)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    startLoop()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      stopLoop()
    }
  }, [lerp])

  if (typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  )) {
    return null
  }

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        willChange: 'transform, opacity',
      }}
      aria-hidden="true"
    />
  )
}

export default CustomCursor
