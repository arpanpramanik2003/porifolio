'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Github, Info, X, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { projectsData } from '../data/projects'
import { personalInfo } from '../data/personalInfo'

// Cursor-Tracked Spotlight Bento Card Component
const SpotlightCard = ({ children, className = '', style = {}, onClick }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const rafId = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      cardRef.current.style.setProperty('--mouse-x', `${x}px`)
      cardRef.current.style.setProperty('--mouse-y', `${y}px`)

      // Restrained 3D perspective tilt (-2.5 deg to +2.5 deg max)
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -2.5
      const rotateY = ((x - centerX) / centerX) * 2.5

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.15s ease-out, border-color 0.3s ease'
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s ease-out, border-color 0.3s ease'
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group rounded-3xl border overflow-hidden transition-all duration-300 card-arch ${className}`}
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
    >
      {/* Dynamic Cursor Spotlight Edge Glow Mask (Vibrant Dual-Theme 2px Border) */}
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-[24px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--text-primary) 0%, #ff5e36 40%, transparent 75%)`,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          filter: 'drop-shadow(0 0 8px var(--text-primary)) drop-shadow(0 0 14px rgba(255, 94, 54, 0.85))'
        }}
      />

      {/* Dynamic Surface Radial Ambient Glow (Theme Adaptive Tint) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 94, 54, 0.08) 0%, rgba(9, 9, 11, 0.03) 50%, transparent 80%)`
        }}
      />

      {children}
    </div>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const modalRef = useRef(null)

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0]
  const secondaryProjects = projectsData.filter((p) => p.id !== featuredProject.id)

  // Bento span mapping helper
  const getBentoSpanClass = (id) => {
    switch (id) {
      case 4: // FruitQ-GradeX
        return 'lg:col-span-7'
      case 2: // SSH-V2
        return 'lg:col-span-5'
      case 5: // NeuroVoice
        return 'lg:col-span-5'
      case 3: // College Freshers Website
        return 'lg:col-span-7'
      default:
        return 'lg:col-span-6'
    }
  }

  // Focus trapping & Escape key dismissal for modal
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    const previousFocus = document.activeElement
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (previousFocus && previousFocus.focus) {
        previousFocus.focus()
      }
    }
  }, [selectedProject])

  // Scroll tracking for parallax background lighting pulse
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'end start']
  })

  const ambientGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.25, 0.8])
  const ambientGlowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.25, 0.2, 0])

  // Silky smooth scroll entrance for section title
  const headerY = useTransform(scrollYProgress, [0.05, 0.38], [45, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])

  return (
    <section id="projects" aria-labelledby="projects-heading" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Parallax Background Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] pointer-events-none blur-3xl rounded-full z-0"
        style={{
          scale: ambientGlowScale,
          opacity: ambientGlowOpacity,
          background: 'radial-gradient(circle, var(--accent) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header with Smooth Landing Fade */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[04]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>FEATURED ENGINEERING CASE STUDIES</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 id="projects-heading" className="font-display text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              SELECTED PRODUCTION SYSTEMS & AI PLATFORMS.
            </h2>

            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold hover:underline group focus-outline"
              style={{ color: 'var(--accent)' }}
            >
              <span>VIEW ALL REPOSITORIES ON GITHUB</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           FLAGSHIP HERO CARD (Full-width Spotlight Tile)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <SpotlightCard className="shadow-lg hover:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image Preview Banner (7 Cols) */}
              <div
                className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px] bg-slate-900 border-b lg:border-b-0 lg:border-r overflow-hidden"
                style={{ borderColor: 'var(--border)' }}
              >
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='28'%3EPaperLens AI%3C/text%3E%3C/svg%3E"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 flex gap-2 font-mono text-xs z-20">
                  <span className="px-3 py-1 rounded-full font-bold shadow-md bg-indigo-600 text-white flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>FLAGSHIP PROJECT</span>
                  </span>
                  <span className="px-3 py-1 rounded-full font-bold shadow-md bg-black/70 text-white backdrop-blur-sm border border-white/20">
                    {featuredProject.year}
                  </span>
                </div>
              </div>

              {/* Content Dossier (5 Cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 relative z-20">
                
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                    {featuredProject.category}
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {featuredProject.title}
                  </h3>

                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {featuredProject.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 font-mono text-xs mb-6">
                    {featuredProject.tech.slice(0, 7).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg border transition-colors duration-200 card-arch group-hover:border-[var(--accent)]"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] focus-outline"
                      style={{
                        background: 'var(--text-primary)',
                        color: 'var(--bg-primary)'
                      }}
                    >
                      <span>Launch Live App</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl font-display font-semibold text-xs flex items-center gap-2 border transition-colors card-arch hover:scale-[1.02] active:scale-[0.98] focus-outline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="px-4 py-3 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-colors card-arch ml-auto hover:text-[var(--accent)] focus-outline"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Info size={14} />
                    <span>Specs</span>
                  </button>
                </div>

              </div>

            </div>
          </SpotlightCard>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           ASYMMETRIC BENTO GRID (Secondary Case Studies)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {secondaryProjects.map((project, idx) => {
            const bentoSpan = getBentoSpanClass(project.id)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={bentoSpan}
              >
                <SpotlightCard className="h-full flex flex-col justify-between shadow-md hover:shadow-xl">
                  
                  {/* Image Preview Banner */}
                  <div
                    className="relative h-56 bg-slate-900 border-b overflow-hidden"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      width="600"
                      height="350"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='350' viewBox='0 0 600 350'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='20'%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 flex gap-2 font-mono text-[11px] z-20">
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Body Dossier */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-20">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                      </p>

                      {/* Tech Pills with Hover Glow */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                        {project.tech.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded border transition-colors duration-200 group-hover:border-[var(--accent)]"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Links */}
                    <div className="pt-4 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-3">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-semibold hover:underline focus-outline"
                            style={{ color: 'var(--accent)' }}
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline focus-outline"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <Github size={12} />
                            <span>Code</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1 hover:underline focus-outline"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        <Info size={12} />
                        <span>Details</span>
                      </button>
                    </div>

                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Project Modal Specification View */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="rounded-3xl border max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl card-arch relative z-50"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Modal Top Header */}
              <div className="p-6 border-b flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                    [PROJECT SPECIFICATION // {selectedProject.year}]
                  </div>
                  <h3 id="project-modal-title" className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                  className="p-2 rounded-xl border card-arch hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus-outline"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scroll Content */}
              <div data-lenis-prevent="true" className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0 overscroll-contain space-y-6 font-body">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    ARCHITECTURAL OVERVIEW
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                </div>

                {/* Features List */}
                {selectedProject.features && (
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      SYSTEM FEATURES & CAPABILITIES
                    </div>
                    <div className="space-y-2">
                      {selectedProject.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-tertiary)' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Matrix */}
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    TECHNOLOGY STACK
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg border card-arch"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-6 border-t flex items-center justify-between font-mono text-xs"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
              >
                <div className="flex items-center gap-3">
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl font-bold border transition-colors shadow-sm focus-outline"
                      style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                    >
                      LAUNCH LIVE APP
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border transition-colors card-arch focus-outline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      GITHUB REPO
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="hover:underline focus-outline"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  CLOSE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default Projects
