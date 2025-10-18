import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'

const ParticleBackground = () => {
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
            value: ['#3b82f6', '#8b5cf6', '#06b6d4'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.6,
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
            color: '#3b82f6',
            opacity: 0.2,
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
      className="absolute inset-0"
    />
  )
}

export default ParticleBackground
