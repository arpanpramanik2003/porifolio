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

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const gridSize = 36
    const cols = Math.ceil(width / gridSize) + 1
    const rows = Math.ceil(height / gridSize) + 1

    // Store grid points for warp physics
    const points = []
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

    const mouse = { x: -1000, y: -1000, active: false }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    const radius = 180
    const forceFactor = 18
    const damping = 0.82
    const stiffness = 0.08

    const render = () => {
      ctx.clearRect(0, 0, width, height)

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
      }

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[r * cols + c]
          const p2 = points[r * cols + c + 1]
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
        }
      }

      // Draw vertical grid lines
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r * cols + c]
          const p2 = points[(r + 1) * cols + c]
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
        }
      }
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
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
