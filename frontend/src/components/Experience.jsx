'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Calendar, MapPin, Building2, CheckCircle2, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'
import { experienceData } from '../data/experience'

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1: scrolling/translating down, -1: up
  const activeIndexRef = useRef(0)
  const isClickingRef = useRef(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const tabRefs = useRef([])

  const totalRoles = experienceData.length
  const activeRole = experienceData[activeIndex] || experienceData[0]

  // Track scroll progress strictly while the console is pinned in view
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80px', 'end end']
  })

  // Synchronize active role with scroll progress with jitter-free threshold detection
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (isClickingRef.current) return

    const clamped = Math.max(0, Math.min(1, progress))
    const targetIndex = Math.min(
      Math.floor(clamped * totalRoles),
      totalRoles - 1
    )

    if (targetIndex !== activeIndexRef.current) {
      const dir = targetIndex > activeIndexRef.current ? 1 : -1
      activeIndexRef.current = targetIndex
      setDirection(dir)
      setActiveIndex(targetIndex)
    }
  })

  // Select role on click and sync window scroll position
  const handleSelectRole = (idx) => {
    if (idx === activeIndex) return
    const dir = idx > activeIndex ? 1 : -1
    activeIndexRef.current = idx
    setDirection(dir)
    setActiveIndex(idx)
    tabRefs.current[idx]?.focus()

    if (trackRef.current) {
      isClickingRef.current = true
      const trackTop = trackRef.current.offsetTop
      const trackHeight = trackRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const navbarOffset = 80
      const scrollableDistance = trackHeight - (viewportHeight - navbarOffset)

      if (scrollableDistance > 0) {
        // Center scroll position in the selected role's segment
        const segmentProgress = (idx + 0.5) / totalRoles
        const targetScroll = trackTop - navbarOffset + segmentProgress * scrollableDistance

        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        })
      }

      setTimeout(() => {
        isClickingRef.current = false
      }, 500)
    }
  }

  // Keyboard navigation for accessible tablist
  const handleKeyDown = (e, currentIdx) => {
    let nextIdx = currentIdx
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      nextIdx = (currentIdx + 1) % totalRoles
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      nextIdx = (currentIdx - 1 + totalRoles) % totalRoles
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIdx = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIdx = totalRoles - 1
    }

    if (nextIdx !== currentIdx) {
      handleSelectRole(nextIdx)
    }
  }

  // High-performance GPU-accelerated vertical translation variants (NO costly filter blur)
  const cardVariants = {
    initial: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? 20 : -20,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? -16 : 16,
      transition: {
        duration: 0.16,
        ease: 'easeIn'
      }
    })
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      className="relative w-full"
    >
      {/* ─────────────────────────────────────────────────────────────
         1. INITIAL SECTION HEADER:
         Visible initially as user scrolls down to this section.
         As user scrolls in, this header scrolls above out of view,
         leaving only the attached console cards visible in the viewpoint.
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-8 sm:pb-12">
        <div
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
          style={{ color: 'var(--accent)' }}
        >
          <span>[03]</span>
          <span className="w-8 h-px bg-[var(--accent)]" />
          <span>WORK EXPERIENCE & ENGINEERING INTERNSHIPS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            id="experience-heading"
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            PROFESSIONAL EXPERIENCE & RESEARCH ROLES.
          </h2>

          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border card-arch shrink-0 font-mono text-xs shadow-xs self-start md:self-auto"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)'
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--accent)' }} />
            <span className="font-semibold">{totalRoles} ROLES COMPLETED</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         2. PINNED EXPERIENCE CONSOLE TRACK:
         Once the header moves above out of view, this console pins
         directly below the navigation bar, attaching cleanly to the
         viewport with ZERO content clipping and ZERO scroll lag.
         ───────────────────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{
          height: `${totalRoles * 85}vh`
        }}
      >
        {/* Sticky Viewport pinned directly below top navigation bar */}
        <div className="sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden z-10 px-4 sm:px-6 lg:px-8 py-2">
          
          {/* Subtle background ambient spotlight */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-10 dark:opacity-5 blur-3xl rounded-full z-0"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />

          {/* Main 2-Column Console Frame */}
          <div className="max-w-7xl w-full mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
              
              {/* ─────────────────────────────────────────────────────────
                 LEFT COLUMN: Role Selector Stack Card (lg:col-span-4)
                 ───────────────────────────────────────────────────────── */}
              <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Experience roles list"
                className="lg:col-span-4 flex flex-col space-y-1.5 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border card-arch shadow-lg"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                {experienceData.map((exp, idx) => {
                  const isActive = idx === activeIndex

                  return (
                    <button
                      key={exp.id}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      role="tab"
                      id={`experience-tab-${exp.id}`}
                      aria-selected={isActive}
                      aria-controls={`experience-panel-${exp.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleSelectRole(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`group relative text-left p-3 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer focus-outline ${
                        isActive
                          ? 'shadow-sm'
                          : 'hover:bg-[var(--bg-card-hover)]'
                      }`}
                      style={{
                        background: isActive ? 'var(--bg-secondary)' : 'transparent'
                      }}
                    >
                      {/* Hardware-accelerated left accent bar for active role */}
                      <div
                        className={`absolute left-0 top-2.5 bottom-2.5 w-1 sm:w-1.5 rounded-r-full transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ background: 'var(--accent)' }}
                      />

                      {/* Role Index & Period Meta Row */}
                      <div className="flex items-center justify-between gap-2 mb-1 pl-2 sm:pl-2.5">
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border transition-colors"
                          style={{
                            color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                            borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                            background: 'transparent'
                          }}
                        >
                          ROLE // 0{idx + 1}
                        </span>
                        <span className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {exp.period}
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3
                        className="font-display font-bold text-sm sm:text-base tracking-tight leading-snug pl-2 sm:pl-2.5 transition-colors group-hover:text-[var(--text-primary)]"
                        style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {exp.title}
                      </h3>

                      {/* Company and Arrow */}
                      <div className="flex items-center justify-between mt-1 pl-2 sm:pl-2.5">
                        <p className="font-mono text-xs truncate max-w-[210px]" style={{ color: 'var(--text-secondary)' }}>
                          {exp.company}
                        </p>
                        <ChevronRight
                          size={14}
                          className={`transition-all duration-150 shrink-0 ${
                            isActive
                              ? 'translate-x-1 opacity-100'
                              : 'opacity-0 group-hover:opacity-40'
                          }`}
                          style={{ color: 'var(--accent)' }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* ─────────────────────────────────────────────────────────
                 RIGHT COLUMN: Active Role Detail Showcase Panel (lg:col-span-8)
                 Optimized compact spacing to guarantee ALL info fits inside
                 the card without clipping or overflow scrollbars.
                 ───────────────────────────────────────────────────────── */}
              <div className="lg:col-span-8">
                <div
                  className="rounded-2xl sm:rounded-3xl border card-arch shadow-xl relative overflow-hidden"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeRole.id}
                      custom={direction}
                      role="tabpanel"
                      id={`experience-panel-${activeRole.id}`}
                      aria-labelledby={`experience-tab-${activeRole.id}`}
                      tabIndex={0}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="p-5 sm:p-6 lg:p-7 focus-outline transform-gpu will-change-transform"
                    >
                      {/* Top Metadata Row: Type Tag & Duration */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span
                          className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-xs"
                          style={{
                            borderColor: 'var(--border)',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-secondary)'
                          }}
                        >
                          {activeRole.type}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-xs"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Calendar size={13} style={{ color: 'var(--accent)' }} />
                          <span>{activeRole.duration} ({activeRole.period})</span>
                        </span>
                      </div>

                      {/* Role Title (Calibrated for crisp elegance without overflowing) */}
                      <h3
                        className="font-display font-black text-xl sm:text-2xl lg:text-[28px] tracking-tight leading-snug my-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {activeRole.title}
                      </h3>

                      {/* Company & Location Details */}
                      <div
                        className="flex flex-wrap items-center gap-3.5 font-mono text-xs pb-2.5 mb-3 border-b"
                        style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                      >
                        <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                          <Building2 size={13} style={{ color: 'var(--accent)' }} />
                          <span>{activeRole.company}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} style={{ color: 'var(--text-tertiary)' }} />
                          <span>{activeRole.location}</span>
                        </span>
                      </div>

                      {/* Body Content */}
                      <div className="space-y-3">
                        {/* Overview & Scope */}
                        <div>
                          <div
                            className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            // OVERVIEW & SCOPE
                          </div>
                          <p
                            className="font-body text-xs sm:text-[13px] leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {activeRole.description}
                          </p>
                        </div>

                        {/* Key Deliverables & Technical Impact */}
                        {activeRole.highlights && activeRole.highlights.length > 0 && (
                          <div>
                            <div
                              className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5"
                              style={{ color: 'var(--text-tertiary)' }}
                            >
                              // KEY DELIVERABLES & TECHNICAL IMPACT
                            </div>
                            <ul className="space-y-1.5">
                              {activeRole.highlights.map((highlight, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="flex items-start gap-2 font-body text-xs sm:text-[13px] leading-snug"
                                  style={{ color: 'var(--text-secondary)' }}
                                >
                                  <ArrowRight
                                    size={13}
                                    className="shrink-0 mt-0.5"
                                    style={{ color: 'var(--accent)' }}
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Environment & Tooling Stack - Full pill set comfortably visible */}
                      {activeRole.skills && activeRole.skills.length > 0 && (
                        <div className="pt-2.5 mt-2.5 border-t" style={{ borderColor: 'var(--border)' }}>
                          <div
                            className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <CheckCircle2 size={12} style={{ color: 'var(--accent)' }} />
                            <span>ENVIRONMENT & TOOLING STACK</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                            {activeRole.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md sm:rounded-lg border text-[11px] font-medium transition-colors card-arch hover:border-[var(--accent)] cursor-default"
                                style={{
                                  background: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)',
                                  borderColor: 'var(--border)'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience
