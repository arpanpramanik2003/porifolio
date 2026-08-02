import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { domainEcosystem } from '../data/skills'

const Skills = () => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollDistance, setScrollDistance] = useState(0)

  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        const distance = trackWidth - viewportWidth
        setScrollDistance(Math.max(0, distance))
      }
    }

    updateDistance()

    const resizeObserver = new ResizeObserver(() => {
      updateDistance()
    })

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current)
    }

    window.addEventListener('resize', updateDistance)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDistance)
    }
  }, [])

  // Track vertical scroll progress starting strictly when section top touches bottom of Navbar (80px)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80px', 'end 100%']
  })

  // Direct 1:1 scroll transform (Lenis handles smooth interpolation, eliminating spring wobble/shaking)
  const headerY = useTransform(scrollYProgress, [0, 0.1], [10, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.95, 1])

  // Map vertical scroll progress 0 -> 1 to exact pixel horizontal translation 0 -> -scrollDistance
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])
  const progressPercent = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full"
      style={{
        height: scrollDistance ? `${window.innerHeight + scrollDistance}px` : '280vh'
      }}
    >
      
      {/* Sticky Viewport */}
      <div className="sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full flex flex-col justify-between py-3 sm:py-4 overflow-hidden z-10">
        
        {/* Top Header & Telemetry Progress Bar */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-20 shrink-0">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b"
            style={{ borderColor: 'var(--border)', y: headerY, opacity: headerOpacity }}
          >
            <div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
                <span>[02]</span>
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span>ENGINEERING TOOLKIT & PRODUCTION STACK</span>
              </div>
              <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-black tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                TECHNICAL ECOSYSTEM.
              </h2>
            </div>

            {/* Scroll Direction Guide & Progress Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-4 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border card-arch">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span>SCROLL TO EXPLORE DOMAINS</span>
                <ArrowRight size={14} className="text-[var(--accent)]" />
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-20 sm:w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  <motion.div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: progressPercent }}
                  />
                </div>
                <span className="font-bold text-[11px] sm:text-xs" style={{ color: 'var(--text-primary)' }}>5 DOMAINS</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Track Area */}
        <div className="flex-1 flex items-center overflow-hidden my-auto py-1 sm:py-2">
          <motion.div
            ref={trackRef}
            style={{ x: xTransform }}
            className="flex items-stretch gap-4 sm:gap-8 px-3 sm:px-8 lg:px-16 will-change-transform"
          >
            {domainEcosystem.map((domain) => (
              <div
                key={domain.id}
                className="w-[88vw] sm:w-[540px] md:w-[620px] shrink-0 rounded-2xl border p-4 sm:p-8 flex flex-col justify-between card-arch"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)'
                }}
              >
                {/* Domain Header */}
                <div>
                  {/* Desktop Only Domain Tagline & Number */}
                  <div className="hidden sm:flex items-center justify-between gap-4 mb-4 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                      <span>[DOMAIN // {domain.index}]</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border card-arch"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                    >
                      {domain.tagline}
                    </span>
                  </div>

                  {/* Main Domain Category Title (Directly shown on Mobile) */}
                  <h3 className="font-display font-black text-xl sm:text-3xl mb-2 sm:mb-3" style={{ color: 'var(--text-primary)' }}>
                    {domain.category}
                  </h3>

                  {/* Paragraph Description: Full on Desktop, Hidden on Mobile for max vertical space */}
                  <p className="hidden sm:block font-body text-xs sm:text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {domain.description}
                  </p>

                  {/* Grouped Technology Clusters */}
                  <div className="space-y-3 sm:space-y-5">
                    {domain.clusters.map((cluster) => (
                      <div key={cluster.name} className="space-y-1.5 sm:space-y-2">
                        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                          • {cluster.name}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                          {cluster.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="p-2 sm:p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-colors card-arch"
                              style={{
                                background: 'var(--bg-secondary)',
                                borderColor: 'var(--border)'
                              }}
                            >
                              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                {skill.logo ? (
                                  typeof skill.logo === 'string' && skill.logo.startsWith('http') ? (
                                    <img src={skill.logo} alt="" className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0" />
                                  ) : (
                                    <span className="text-sm sm:text-base leading-none shrink-0">{skill.logo}</span>
                                  )
                                ) : (
                                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center font-mono text-[8px] sm:text-[9px] font-bold shrink-0 bg-[var(--accent)] text-white">
                                    {skill.tag || 'AI'}
                                  </span>
                                )}
                                <span className="font-body font-semibold text-xs truncate" style={{ color: 'var(--text-primary)' }}>
                                  {skill.name}
                                </span>
                              </div>

                              <span className="font-mono text-[9px] sm:text-[10px] truncate shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                                {skill.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Domain Panel Footer */}
                <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t flex items-center justify-between font-mono text-[9px] sm:text-[10px]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>PRODUCTION READY</span>
                  </div>
                  <span>ECOSYSTEM NODE {domain.index} OF 05</span>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Nav Helper */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 shrink-0 z-20">
          <div className="flex items-center justify-between font-mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
            <span>PROGRESSION: LANGUAGES ➔ AI SYSTEMS ➔ FULL-STACK ➔ CLOUD INFRASTRUCTURE ➔ MLOPS</span>
            <span className="hidden sm:inline">END OF TOOLKIT JOURNEY ➔</span>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Skills
