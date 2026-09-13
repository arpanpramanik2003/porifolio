'use client'

import { useEffect, useRef } from 'react'

const BlueprintGridCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
    let animationFrameId = null
    let isVisible = true
    let isLoopRunning = false
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const gridSize = 36
    let cols = Math.ceil(width / gridSize) + 1
    let rows = Math.ceil(height / gridSize) + 1

    // Store grid points for warp physics
    let points = []
    const initPoints = () => {
      points = []
      cols = Math.ceil(width / gridSize) + 1
      rows = Math.ceil(height / gridSize) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * gridSize
          const baseY = r * gridSize
          points.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0
          })
        }
      }
    }

    initPoints()

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[r * cols + c]
          const p2 = points[r * cols + c + 1]
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
          }
        }
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r * cols + c]
          const p2 = points[(r + 1) * cols + c]
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
          }
        }
      }
      ctx.stroke()
    }

    // Initial static draw
    drawGrid()

    // On touch devices without cursor interactions, static grid is sufficient
    if (isTouch) {
      const handleTouchResize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        initPoints()
        drawGrid()
      }
      window.addEventListener('resize', handleTouchResize)
      return () => window.removeEventListener('resize', handleTouchResize)
    }

    const mouse = { x: -1000, y: -1000, active: false }
    const radius = 180
    const forceFactor = 18
    const damping = 0.82
    const stiffness = 0.08

    const render = () => {
      if (!isVisible) {
        isLoopRunning = false
        return
      }

      let totalMotion = 0

      // Update point physics
      for (let i = 0; i < points.length; i++) {
        const pt = points[i]

        if (mouse.active) {
          const dx = pt.x - mouse.x
          const dy = pt.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius && dist > 0) {
            const angle = Math.atan2(dy, dx)
            const force = ((radius - dist) / radius) * forceFactor
            pt.vx += Math.cos(angle) * force
            pt.vy += Math.sin(angle) * force
          }
        }

        // Spring return to base position
        const springX = (pt.baseX - pt.x) * stiffness
        const springY = (pt.baseY - pt.y) * stiffness

        pt.vx = (pt.vx + springX) * damping
        pt.vy = (pt.vy + springY) * damping

        pt.x += pt.vx
        pt.y += pt.vy

        totalMotion += Math.abs(pt.vx) + Math.abs(pt.vy) + Math.abs(pt.x - pt.baseX) + Math.abs(pt.y - pt.baseY)
      }

      drawGrid()

      // When mouse is inactive and points have returned to baseline, pause RAF to save CPU
      if (!mouse.active && totalMotion < 0.1) {
        for (let i = 0; i < points.length; i++) {
          points[i].x = points[i].baseX
          points[i].y = points[i].baseY
          points[i].vx = 0
          points[i].vy = 0
        }
        drawGrid()
        isLoopRunning = false
        return
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const startLoop = () => {
      if (isLoopRunning || !isVisible) return
      isLoopRunning = true
      animationFrameId = requestAnimationFrame(render)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      startLoop()
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initPoints()
      drawGrid()
      startLoop()
    }

    // Observe visibility to suspend rendering when Hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !isLoopRunning) {
          startLoop()
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          isLoopRunning = false
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}

export default BlueprintGridCanvas
