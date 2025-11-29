import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

const ParticleBackground = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'))
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 1000,
            },
          },
          color: {
            value: isDark ? ['#3b82f6', '#8b5cf6', '#06b6d4'] : ['#60a5fa', '#a78bfa', '#22d3ee'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: isDark ? 0.6 : 0.4,
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.1,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 120,
            color: isDark ? '#3b82f6' : '#60a5fa',
            opacity: isDark ? 0.2 : 0.15,
            width: 1,
            triangles: {
              enable: false,
            },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: false,
            straight: false,
            outModes: 'out',
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: [],
              parallax: {
                enable: true,
                force: 20,
                smooth: 30,
              },
            },
            onClick: {
              enable: false,
            },
            resize: true,
          },
        },
        smooth: true,
        detectRetina: true,
      }}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ pointerEvents: 'auto' }}
    />
  )
}

export default ParticleBackground
