import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, Building2, CheckCircle2, Sparkles, Award } from 'lucide-react'
import { experienceData } from '../data/experience'

const Experience = () => {
  const sectionRef = useRef(null)

  // Scroll tracking for left vertical neon timeline stem animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 85%']
  })

  // Dynamic vertical timeline fill height (0% to 100%)
  const timelineLineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  // Silky smooth scroll entrance for section title
  const headerY = useTransform(scrollYProgress, [0.05, 0.38], [45, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])

  // Distinct Neon Sunset & Cyber Solar Palette for Industrial Roles
  const roleAccents = [
    { accent: '#ff5e36', shadow: '0 0 16px rgba(255, 94, 54, 0.85)', bg: 'rgba(255, 94, 54, 0.12)' },   // Sunset Coral (Role 1)
    { accent: '#f59e0b', shadow: '0 0 16px rgba(245, 158, 11, 0.85)', bg: 'rgba(245, 158, 11, 0.12)' },  // Solar Amber (Role 2)
    { accent: '#ec4899', shadow: '0 0 16px rgba(236, 72, 153, 0.85)', bg: 'rgba(236, 72, 153, 0.12)' },  // Neon Magenta (Role 3)
    { accent: '#d946ef', shadow: '0 0 16px rgba(217, 70, 239, 0.85)', bg: 'rgba(217, 70, 239, 0.12)' }   // Cyber Violet (Role 4)
  ]

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden perspective-1000"
    >
      {/* Ambient background lighting glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none opacity-15 dark:opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ASYMMETRIC SECTION HEADER */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3.5" style={{ color: 'var(--accent)' }}>
            <span>[03]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>INDUSTRIAL ROLES & RESEARCH LEDGER</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="experience-heading"
              className="font-display text-xl sm:text-3xl lg:text-5xl font-black tracking-tight max-w-3xl leading-[1.1]"
              style={{ color: 'var(--text-primary)' }}
            >
              PRACTICAL EXPERIENCE & RESEARCH INTERNSHIPS.
            </h2>

            <div className="hidden lg:flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border card-arch shrink-0">
              <Sparkles size={14} style={{ color: 'var(--accent-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>4 ROLES COMPLETED</span>
            </div>
          </div>
        </motion.div>

        {/* BESPOKE INDUSTRIAL TIMELINE LEDGER WITH ANIMATED NEON ROOT STEM */}
        <div className="relative pl-8 sm:pl-12 md:pl-16">
          
          {/* Static Background Root Stem Track */}
          <div
            className="absolute left-3 sm:left-5 md:left-7 top-4 bottom-4 w-1 -translate-x-1/2 rounded-full opacity-20"
            style={{ background: 'var(--border)' }}
          />

          {/* Dynamic Animated Glowing Sunset Neon Root Line */}
          <motion.div
            className="absolute left-3 sm:left-5 md:left-7 top-4 w-1 origin-top rounded-full -translate-x-1/2 z-10 overflow-visible pointer-events-none"
            style={{
              height: timelineLineHeight,
              background: 'linear-gradient(180deg, #ff5e36 0%, #f59e0b 33%, #ec4899 66%, #d946ef 100%)',
              boxShadow: '0 0 14px #ff5e36, 0 0 24px #ec4899, 0 0 34px #d946ef'
            }}
          >
            {/* Glowing Neon Lead Tip Particle */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_14px_#ff5e36,0_0_24px_#d946ef] animate-ping opacity-80" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#ff5e36]" />
          </motion.div>

          {/* Experience Cards Stack */}
          <div className="space-y-12 md:space-y-16">
            {experienceData.map((exp, idx) => {
              const theme = roleAccents[idx % roleAccents.length]

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 40, rotateY: -6 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Timeline Neon Bullet Node Point */}
                  <div
                    className="absolute -left-[20px] sm:-left-[28px] md:-left-[36px] -translate-x-1/2 top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 group-hover:scale-130 z-20"
                    style={{
                      borderColor: theme.accent,
                      background: 'var(--bg-card)',
                      boxShadow: theme.shadow
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{
                        background: theme.accent,
                        boxShadow: `0 0 8px ${theme.accent}`
                      }}
                    />
                  </div>

                  {/* Main Stylish Architectural Glass Card */}
                  <div
                    className="rounded-2xl border p-6 sm:p-8 transition-all duration-500 card-arch shadow-lg relative overflow-hidden group-hover:border-[var(--border-hover)] cursor-pointer"
                    style={{
                      background: 'var(--bg-card)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Top Accent Gradient Border Highlight */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: `linear-gradient(to right, ${theme.accent}, transparent)`
                      }}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Column: Role Header & Meta Info (5 Cols) */}
                      <div className="lg:col-span-5 space-y-4">
                        
                        {/* Role Index & Type Badge */}
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className="font-mono text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border"
                            style={{
                              color: theme.accent,
                              borderColor: theme.accent,
                              background: theme.bg
                            }}
                          >
                            [ROLE // 0{idx + 1}]
                          </span>
                          <span
                            className="font-mono text-[11px] font-medium px-3 py-1 rounded-full border card-arch shadow-xs"
                            style={{
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)',
                              background: 'var(--bg-secondary)'
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>

                        {/* Role Title & Organization */}
                        <div className="pt-1">
                          <h3
                            className="font-display font-black text-2xl sm:text-3xl leading-snug group-hover:text-[var(--accent)] transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 font-mono text-sm font-semibold mt-2" style={{ color: 'var(--text-secondary)' }}>
                            <Building2 size={15} style={{ color: theme.accent }} />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Duration & Location Metadata Badges */}
                        <div className="flex flex-wrap gap-2.5 font-mono text-xs pt-2">
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border card-arch"
                            style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                          >
                            <Calendar size={13} style={{ color: theme.accent }} />
                            <span>{exp.duration} ({exp.period})</span>
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border card-arch"
                            style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                          >
                            <MapPin size={13} style={{ color: 'var(--accent-tertiary)' }} />
                            <span>{exp.location}</span>
                          </span>
                        </div>

                      </div>

                      {/* Right Column: Description, Deliverables & Tooling (7 Cols) */}
                      <div
                        className="lg:col-span-7 space-y-6 lg:border-l lg:pl-8"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        {/* Summary Description */}
                        <p
                          className="font-body text-sm sm:text-base leading-relaxed text-justify sm:text-left"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {exp.description}
                        </p>

                        {/* Highlights Ledger */}
                        {exp.highlights && (
                          <div className="space-y-3 pt-2">
                            <div
                              className="font-mono text-xs uppercase tracking-wider flex items-center gap-2"
                              style={{ color: 'var(--text-tertiary)' }}
                            >
                              <Award size={13} style={{ color: theme.accent }} />
                              <span>KEY DELIVERABLES & TECHNICAL IMPACT</span>
                            </div>
                            <ul className="space-y-2.5">
                              {exp.highlights.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 font-body text-xs sm:text-sm leading-normal group/item"
                                  style={{ color: 'var(--text-secondary)' }}
                                >
                                  <ArrowRight
                                    size={14}
                                    className="shrink-0 mt-1 transition-transform group-hover/item:translate-x-1"
                                    style={{ color: theme.accent }}
                                  />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Environment & Tooling Badges */}
                        {exp.skills && (
                          <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div className="font-mono text-[11px] uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                              <CheckCircle2 size={12} className="text-emerald-500" />
                              <span>ENVIRONMENT & TOOLING STACK</span>
                            </div>
                            <div className="flex flex-wrap gap-2 font-mono text-xs">
                              {exp.skills.map((skill) => (
                                <motion.span
                                  key={skill}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="px-3 py-1.5 rounded-lg border transition-all card-arch cursor-pointer"
                                  style={{
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)'
                                  }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Experience
