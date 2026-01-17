import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

const ParticleBackground = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const updateTheme = () =>
      setIsDark(document.documentElement.classList.contains('dark'))

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
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
          color: { value: 'transparent' },
        },
        fpsLimit: 120,

        particles: {
          number: {
            value: 110,
            density: {
              enable: true,
              area: 900,
            },
          },

          color: {
            value: isDark
              ? ['#3b82f6', '#8b5cf6', '#06b6d4']
              : ['#60a5fa', '#a78bfa', '#22d3ee'],
          },

          shape: { type: 'circle' },

          opacity: {
            value: isDark ? 0.75 : 0.55,
            random: { enable: true, minimumValue: 0.25 },
            animation: {
              enable: true,
              speed: 1.2,
              minimumValue: 0.2,
              sync: false,
            },
          },

          size: {
            value: { min: 1.2, max: 3.2 },
            random: true,
            animation: {
              enable: true,
              speed: 2.5,
              minimumValue: 0.3,
              sync: false,
            },
          },

          links: {
            enable: true,
            distance: 140,
            color: isDark ? '#60a5fa' : '#3b82f6',
            opacity: isDark ? 0.35 : 0.25,
            width: 1.3,
          },

          move: {
            enable: true,
            speed: 1.1,
            direction: 'none',
            straight: false,
            outModes: 'out',
          },
        },

        interactivity: {
          detectsOn: 'window', // ✅ CRITICAL
          events: {
            onHover: {
              enable: true,
              mode: [],
              parallax: {
                enable: true,
                force: 30,
                smooth: 20,
              },
            },
            resize: true,
          },
        },

        detectRetina: true,
        smooth: true,
      }}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}

export default ParticleBackground
