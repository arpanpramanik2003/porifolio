import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Sparkles, TrendingUp } from 'lucide-react'
import { skillsData } from '../data/skills'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────
 *  3D Logo Node — a single floating skill icon
 * ────────────────────────────────────────────── */
function LogoNode({ skill, position, isDark, sphereRadius }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  const over = useCallback((e) => { e.stopPropagation(); setHovered(true) }, [])
  const out  = useCallback(() => setHovered(false), [])

  // Billboard: always face camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.quaternion.copy(camera.quaternion)
    }
  })

  // Scale based on distance from center (nearer = bigger) for depth effect
  const distFactor = Math.max(0.6, 1 - (new THREE.Vector3(...position).length() / sphereRadius) * 0.4)
  const baseSize = 52 * distFactor
  const size = hovered ? baseSize * 1.4 : baseSize

  return (
    <group ref={groupRef} position={position}>
      <Html
        center
        distanceFactor={12}
        zIndexRange={[16777271, 0]}
        style={{
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: `scale(${hovered ? 1.3 : 1})`,
        }}
      >
        <div
          onMouseEnter={over}
          onMouseLeave={out}
          title={skill.name}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(248, 250, 252, 0.85)',
            backdropFilter: 'blur(10px)',
            border: hovered
              ? `2px solid ${isDark ? '#00e5ff' : '#0284c7'}`
              : `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(100,116,139,0.2)'}`,
            boxShadow: hovered
              ? isDark
                ? '0 0 24px rgba(0,229,255,0.5), 0 0 48px rgba(0,229,255,0.2)'
                : '0 0 24px rgba(2,132,199,0.4), 0 0 48px rgba(2,132,199,0.15)'
              : isDark
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          <img
            src={skill.logo}
            alt={skill.name}
            style={{
              width: '60%',
              height: '60%',
              objectFit: 'contain',
              // Add a white glowing halo around logos in Dark Mode so black shapes (like Framer) are fully visible!
              filter: isDark ? 'drop-shadow(0 0 6px rgba(255,255,255,0.85)) brightness(1.15)' : 'none',
              transition: 'filter 0.3s ease',
            }}
            onError={(e) => {
              // Fallback to emoji if logo fails to load
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span style="font-size:${size * 0.45}px">${skill.icon}</span>`
            }}
          />
          {/* Tooltip on hover */}
          {hovered && (
            <div
              style={{
                position: 'absolute',
                bottom: '-32px',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: isDark ? '#f1f5f9' : '#0f172a',
                background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.95)',
                border: `1px solid ${isDark ? 'rgba(148,163,184,0.3)' : 'rgba(100,116,139,0.3)'}`,
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              {skill.name}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

/* ──────────────────────────────────────────────
 *  3D Logo Cloud — distributes logos on a sphere
 * ────────────────────────────────────────────── */
function LogoCloud({ skills, radius, isDark }) {
  const positions = useMemo(() => {
    const temp = []
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      temp.push([
        r * Math.cos(theta) * radius,
        y * radius,
        r * Math.sin(theta) * radius,
      ])
    }
    return temp
  }, [skills, radius])

  return (
    <group>
      {skills.map((skill, i) => (
        <LogoNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          isDark={isDark}
          sphereRadius={radius}
        />
      ))}
    </group>
  )
}

/* ──────────────────────────────────────────────
 *  Skill Tag — small pill inside the category card
 * ────────────────────────────────────────────── */
const SkillTag = ({ skill, categoryColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{
      y: -4,
      scale: 1.06,
      transition: { duration: 0.15 }
    }}
    className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-default max-w-full overflow-hidden neon-card"
    style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
    }}
  >
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none`} />
    {skill.logo ? (
      <img src={skill.logo} alt="" className="w-5 h-5 object-contain flex-shrink-0 relative z-10" />
    ) : (
      <span className="text-lg relative z-10 flex-shrink-0">{skill.icon}</span>
    )}
    <span className="text-xs sm:text-sm font-semibold relative z-10 truncate" style={{ color: 'var(--text-secondary)' }}>
      {skill.name}
    </span>
  </motion.div>
)

/* ──────────────────────────────────────────────
 *  Category Card — groups skills under a label
 * ────────────────────────────────────────────── */
const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative group rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden neon-card"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="h-1 w-full neon-line" />
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.span
            className="text-2xl sm:text-3xl"
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {category.icon}
          </motion.span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
              {category.category}
            </h3>
            <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
              {category.skills.length} technologies
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, si) => (
            <SkillTag
              key={skill.name}
              skill={skill}
              categoryColor={category.color}
              delay={0.05 * si}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
 *  Main Skills Section
 * ────────────────────────────────────────────── */
const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [isDark, setIsDark] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'))
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Flatten all skills for the 3D sphere
  const allSkills = useMemo(() => {
    return skillsData.flatMap(cat => cat.skills)
  }, [])

  const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)

  const quickStats = [
    { label: 'Total Skills', value: totalSkills, icon: '🎯', color: '--accent' },
    { label: 'Categories', value: skillsData.length, icon: '📂', color: '--accent-secondary' },
    { label: 'Frameworks', value: '12+', icon: '⚙️', color: '--accent-tertiary' },
    { label: 'Cloud Platforms', value: '6+', icon: '☁️', color: '--accent' }
  ]

  // Responsive sphere settings
  const sphereRadius = isMobile ? 5 : 7
  const cameraZ = isMobile ? 14 : 16

  return (
    <section id="skills" className="pt-12 pb-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 opacity-5 dark:opacity-[0.03]">
        <TrendingUp size={200} style={{ color: 'var(--accent-secondary)' }} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 dark:opacity-[0.03]">
        <Sparkles size={250} style={{ color: 'var(--accent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                Technical Expertise
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Skills & Technologies
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full neon-line"
            />
            <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              A comprehensive toolkit spanning full-stack development, AI/ML, and cloud technologies
            </p>
          </div>

          {/* Split View: 3D Sphere + Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

            <div
              className="h-[320px] sm:h-[380px] w-full relative rounded-2xl overflow-hidden neon-card order-2 lg:order-1"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {/* Soft backlight glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full blur-[80px] pointer-events-none"
                style={{ background: isDark
                  ? 'radial-gradient(circle, rgba(0,229,255,0.12), rgba(179,136,255,0.08))'
                  : 'radial-gradient(circle, rgba(2,132,199,0.1), rgba(126,34,206,0.06))'
                }}
              />

              <Canvas camera={{ position: [0, 0, cameraZ], fov: 50 }}>
                <LogoCloud skills={allSkills} radius={sphereRadius} isDark={isDark} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.4}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI * 3 / 4}
                />
              </Canvas>

              {/* Helper label */}
              <div
                className="absolute bottom-3 right-3 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                style={{
                  color: 'var(--text-tertiary)',
                  background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(248,250,252,0.8)',
                  border: '1px solid var(--border)',
                }}
              >
                ✨ Drag to explore
              </div>
            </div>

            {/* Right: Stats + Category Cards - Hidden on Mobile */}
            <div className="hidden lg:flex order-1 lg:order-2 flex-col gap-4 lg:h-[380px]">
              {/* Quick Stats — compact inline row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-4 gap-2"
              >
                {quickStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="relative rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-all neon-card"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span className="text-base block">{stat.icon}</span>
                    <div className="text-lg font-bold truncate" style={{ color: `var(${stat.color})` }}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Scrollable Category Cards — fills remaining height */}
              <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                <AnimatePresence mode="sync">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                    {skillsData.map((category, index) => (
                      <CategoryCard
                        key={category.category}
                        category={category}
                        index={index}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-10 sm:mt-14 text-center"
          >
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4 sm:mb-5 text-sm sm:text-base">
              Constantly learning and expanding my skill set to stay ahead in tech
            </p>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Sparkles style={{ color: 'var(--accent-secondary)' }} size={28} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
