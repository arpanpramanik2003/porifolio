import { useEffect, useRef } from 'react'

export const SparklesCore = ({
  id = 'sparkles-canvas',
  className = '',
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1.4,
  speed = 1,
  particleColor = '#FFFFFF',
  particleDensity = 120
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate random particles
    const particleCount = Math.floor((width * height * particleDensity) / 100000)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * 0.3 * speed,
      speedY: -Math.random() * 0.5 * speed - 0.1,
      opacity: Math.random(),
      opacitySpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX
        p.y += p.speedY
        p.opacity += p.opacitySpeed

        // Wrap around boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Opacity ping-pong twinkle
        if (p.opacity >= 1) {
          p.opacity = 1
          p.opacitySpeed = -p.opacitySpeed
        } else if (p.opacity <= 0.1) {
          p.opacity = 0.1
          p.opacitySpeed = Math.abs(p.opacitySpeed)
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [minSize, maxSize, speed, particleColor, particleDensity])

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none ${className}`}
      style={{ background }}
    />
  )
}

export default SparklesCore
