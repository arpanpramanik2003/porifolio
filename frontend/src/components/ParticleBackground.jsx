import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Authentic "Antigravity" 3D Particle System
 * 
 * - Uses WebGL via React Three Fiber for professional, fluid rendering.
 * - Creates a massive galaxy/vortex of 2500 particles.
 * - The particles form an expansive structure that slowly, organically rotates.
 * - Cursor Interaction: mouse movement creates a subtle 3D parallax tilt, rather
 *   than dragging the entire globe cartoonishly around the screen. 
 */

const PARTICLE_COUNT = 2500
const GALAXY_RADIUS = 22

// Generates the initial point cloud
function generateGalaxy() {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  
  // High-contrast neon palette matching the portfolio theme
  const neonColors = [
    new THREE.Color('#00e5ff'), // cyan
    new THREE.Color('#b388ff'), // lavender
    new THREE.Color('#ff6be6'), // hot pink
    new THREE.Color('#ffc740'), // amber
    new THREE.Color('#00ff88'), // green
    new THREE.Color('#ea80fc'), // light pink
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // 1. Generate position inside a sprawling 3D sphere/galaxy volume
    // Using a distribution that clusters slightly toward the center but spreads wide
    const r = GALAXY_RADIUS * Math.cbrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)
    
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    // 2. Assign a random neon color to each particle
    const color = neonColors[Math.floor(Math.random() * neonColors.length)]
    
    // Optionally mix in a little bit of white to some particles to make them "hotter"
    if (Math.random() > 0.8) {
      color.lerp(new THREE.Color('#ffffff'), 0.5)
    }

    colors[i * 3]     = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  return { positions, colors }
}

const ParticleGalaxy = ({ isDark }) => {
  const pointsRef = useRef()
  const { positions, colors } = useMemo(() => generateGalaxy(), [])
  
  // Parallax target smoothing
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    // 1. Authentic Fluid Motion: The entire galaxy slowly and continuously rotates
    pointsRef.current.rotation.y -= delta * 0.05
    pointsRef.current.rotation.x -= delta * 0.02

    // 2. Smooth Cursor Parallax: Rather than attaching the globe to the cursor,
    // the mouse subtly tilts the entire 3D camera/system.
    // Maps screen coordinates (-1 to 1) to subtle rotation angles
    const targetX = (state.pointer.x * Math.PI) * 0.15
    const targetY = (state.pointer.y * Math.PI) * 0.15

    // Lerp (smoothly interpolate) current rotation towards the target parallax
    mouse.current.x += (targetX - mouse.current.x) * 0.02
    mouse.current.y += (targetY - mouse.current.y) * 0.02

    pointsRef.current.rotation.y += mouse.current.x * delta
    pointsRef.current.rotation.x -= mouse.current.y * delta
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={pointsRef}
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          vertexColors
          size={isDark ? 0.12 : 0.14} // Slightly larger in light mode to stand out
          sizeAttenuation={true}
          depthWrite={false}
          // Additive blending works great on dark backgrounds (creates hotspots)
          // Normal blending works better on light backgrounds to prevent washing out to white
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          opacity={isDark ? 0.7 : 0.5} 
        />
      </Points>
    </group>
  )
}

const ParticleBackground = () => {
  const [isDark, setIsDark] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'))
    updateTheme()
    
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  return (
    <div 
      className={`fixed inset-0 z-0 pointer-events-none ${isDark ? 'mix-blend-screen' : 'mix-blend-normal'}`} 
      style={{ opacity: isDark ? 1 : 0.8 }}
    >
      {/* 
        Canvas acts as the 3D viewport. 
        Camera is positioned back slightly so the galaxy fills the screen beautifully.
      */}
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        {/* Fog creates depth. In dark mode it fades to black, in light mode to white */}
        <fog attach="fog" args={[isDark ? '#000000' : '#ffffff', 20, 50]} />
        <ParticleGalaxy isDark={isDark} />
      </Canvas>
    </div>
  )
}

export default ParticleBackground
