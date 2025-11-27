import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'

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
    await loadStarsPreset(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'stars',
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
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
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: isDark ? '#3b82f6' : '#60a5fa',
            opacity: isDark ? 0.2 : 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      }}
      className="fixed inset-0 z-0"
    />
  )
}

export default ParticleBackground
