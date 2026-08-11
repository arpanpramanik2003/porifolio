'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, Building2, CheckCircle2, Sparkles, ArrowRight, ChevronRight } from 'lucide-react'
import { experienceData } from '../data/experience'

const Experience = () => {
  const [activeTabId, setActiveTabId] = useState(experienceData[0]?.id || 1)
  const sectionRef = useRef(null)
  const tabRefs = useRef({})

  // Scroll tracking for section header entrance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end start']
  })

  const headerY = useTransform(scrollYProgress, [0.05, 0.35], [35, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1])

  const activeRole = experienceData.find((r) => r.id === activeTabId) || experienceData[0]

  // Keyboard navigation for WAI-ARIA tablist
  const handleKeyDown = (e, currentIdx) => {
    let nextIdx = currentIdx
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      nextIdx = (currentIdx + 1) % experienceData.length
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      nextIdx = (currentIdx - 1 + experienceData.length) % experienceData.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIdx = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIdx = experienceData.length - 1
    }

    if (nextIdx !== currentIdx) {
      const nextId = experienceData[nextIdx].id
      setActiveTabId(nextId)
      tabRefs.current[nextId]?.focus()
    }
  }

  // Animation variants
  const panelVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.04,
        delayChildren: 0.05
      }
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } }
  }

  const itemVariants = {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Subtle background ambient spotlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-10 dark:opacity-5 blur-3xl rounded-full z-0"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ASYMMETRIC SECTION HEADER */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[03]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>INDUSTRIAL EXPERIENCE & ROLES LEDGER</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="experience-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-[1.1]"
              style={{ color: 'var(--text-primary)' }}
            >
              PROFESSIONAL EXPERIENCE & INDUSTRIAL ROLES.
            </h2>

            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border card-arch shrink-0 font-mono text-xs shadow-xs self-start md:self-auto"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent)' }} />
              <span className="font-semibold">{experienceData.length} ROLES COMPLETED</span>
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           DESKTOP MASTER-DETAIL TABS CONSOLE (lg:grid)
           ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Role Selector Tablist (4 Cols) */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Experience roles selector"
            className="lg:col-span-4 flex flex-col space-y-2 p-2 rounded-2xl border card-arch"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {experienceData.map((exp, idx) => {
              const isActive = exp.id === activeTabId

              return (
                <button
                  key={exp.id}
                  ref={(el) => (tabRefs.current[exp.id] = el)}
                  role="tab"
                  id={`tab-${exp.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${exp.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTabId(exp.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer focus-outline ${
                    isActive
                      ? 'border-transparent shadow-sm'
                      : 'border-transparent hover:bg-[var(--bg-card-hover)]'
                  }`}
                  style={{
                    background: isActive ? 'var(--bg-secondary)' : 'transparent',
                    borderColor: isActive ? 'var(--border)' : 'transparent'
                  }}
                >
                  {/* Left Accent Selection Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                        borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                        background: 'transparent'
                      }}
                    >
                      ROLE // 0{idx + 1}
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-base tracking-tight leading-snug transition-colors group-hover:text-[var(--text-primary)]"
                    style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {exp.title}
                  </h3>

                  <div className="flex items-center justify-between mt-1">
                    <p className="font-mono text-xs truncate max-w-[200px]" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 shrink-0 ${
                        isActive ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`}
                      style={{ color: 'var(--accent)' }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Active Role Detail Showcase Panel (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                role="tabpanel"
                id={`panel-${activeRole.id}`}
                aria-labelledby={`tab-${activeRole.id}`}
                tabIndex={0}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="rounded-2xl border p-8 card-arch shadow-xl relative overflow-hidden focus-outline"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                {/* Subtle top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'var(--accent)' }}
                />

                {/* Header Meta Info */}
                <div className="pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span
                      className="font-mono text-xs font-semibold px-3 py-1 rounded-full border shadow-xs"
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

                  <h3
                    className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-snug mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {activeRole.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <Building2 size={14} style={{ color: 'var(--accent)' }} />
                      <span>{activeRole.company}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} style={{ color: 'var(--text-tertiary)' }} />
                      <span>{activeRole.location}</span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="py-6 space-y-6">
                  {/* Summary Description */}
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      // OVERVIEW & SCOPE
                    </div>
                    <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {activeRole.description}
                    </p>
                  </div>

                  {/* Key Deliverables Staggered List */}
                  {activeRole.highlights && (
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>
                        // KEY DELIVERABLES & TECHNICAL IMPACT
                      </div>
                      <motion.ul className="space-y-2.5">
                        {activeRole.highlights.map((highlight, idx) => (
                          <motion.li
                            key={idx}
                            variants={itemVariants}
                            className="flex items-start gap-3 font-body text-xs sm:text-sm leading-normal group/item"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <ArrowRight
                              size={14}
                              className="shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-1"
                              style={{ color: 'var(--accent)' }}
                            />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  )}
                </div>

                {/* Tooling Stack Pills */}
                {activeRole.skills && (
                  <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="font-mono text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} />
                      <span>ENVIRONMENT & TOOLING STACK</span>
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                      {activeRole.skills.map((skill) => (
                        <span
                          key={skill}
                          tabIndex={0}
                          className="px-3 py-1.5 rounded-lg border transition-all duration-200 card-arch hover:border-[var(--accent)] hover:shadow-xs focus-outline cursor-default"
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

        {/* ─────────────────────────────────────────────────────────────
           MOBILE ACCORDION CONSOLE (< lg Breakpoint)
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:hidden space-y-4">
          {experienceData.map((exp, idx) => {
            const isOpen = exp.id === activeTabId

            return (
              <div
                key={exp.id}
                className="rounded-2xl border card-arch overflow-hidden transition-colors"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: isOpen ? 'var(--accent)' : 'var(--border)'
                }}
              >
                {/* Accordion Header Trigger */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${exp.id}`}
                  onClick={() => setActiveTabId(isOpen ? null : exp.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus-outline"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
                      <span className="font-bold" style={{ color: 'var(--accent)' }}>
                        ROLE // 0{idx + 1}
                      </span>
                      <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>{exp.period}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {exp.title}
                    </h3>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border card-arch flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                    style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
                  >
                    <ChevronRight size={16} />
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`accordion-content-${exp.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className="p-5 space-y-5 font-body text-xs sm:text-sm">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap gap-2 font-mono text-xs">
                          <span className="px-2.5 py-1 rounded-md border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                            {exp.type}
                          </span>
                          <span className="px-2.5 py-1 rounded-md border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                            {exp.duration}
                          </span>
                          <span className="px-2.5 py-1 rounded-md border" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                            {exp.location}
                          </span>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-tertiary)' }}>
                            // OVERVIEW
                          </div>
                          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {exp.description}
                          </p>
                        </div>

                        {/* Highlights */}
                        {exp.highlights && (
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                              // KEY DELIVERABLES
                            </div>
                            <ul className="space-y-2">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                  <ArrowRight size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        {exp.skills && (
                          <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                              // TOOLING STACK
                            </div>
                            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                              {exp.skills.map((s) => (
                                <span
                                  key={s}
                                  className="px-2.5 py-1 rounded-md border"
                                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Experience
