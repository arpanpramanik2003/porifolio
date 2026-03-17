import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, Sparkles, Clock, ChevronRight, ArrowRight } from 'lucide-react'
import { experienceData } from '../data/experience'
import useIsMobile from '../hooks/useIsMobile'

/* ── Glowing Timeline Node ── */
const TimelineNode = ({ index, isInView, shouldReduceMotion }) => (
  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-20">
    <motion.div
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.12, type: 'spring', stiffness: 300 }}
      className="relative w-5 h-5 rounded-full"
      style={{
        background: 'var(--gradient-accent)',
        boxShadow: '0 0 16px var(--neon-glow), 0 0 32px var(--neon-glow-secondary)',
      }}
    >
      {/* Inner white dot */}
      <div className="absolute inset-[5px] rounded-full bg-white/90" />
      {/* Pulsing ring */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.6 }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      )}
    </motion.div>
  </div>
)

/* ── Experience Card ── */
const ExperienceCard = ({ exp, index, shouldReduceMotion }) => {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <div ref={cardRef} className="relative">
      {/* Timeline Node (desktop) */}
      <TimelineNode index={index} isInView={cardInView} shouldReduceMotion={shouldReduceMotion} />

      {/* Card — alternates left/right on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        animate={cardInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
      >
        <motion.div
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="group relative rounded-2xl overflow-hidden cursor-default"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Neon border glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"
            style={{
              boxShadow: 'inset 0 0 0 1.5px var(--accent), 0 0 20px var(--neon-glow)',
            }}
          />

          {/* Top gradient accent bar — thicker, vibrant */}
          <div className="h-1.5 w-full neon-line" />

          {/* Card header with company & type badge */}
          <div className="relative px-6 pt-5 pb-4">
            {/* Decorative glow blob */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"
              style={{ background: 'var(--accent)' }}
            />

            {/* Type badge + Order number */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full shadow-sm neon-btn">
                <Briefcase size={11} />
                {exp.type}
              </span>
              <span
                className="text-3xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}
              >
                0{index + 1}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-xl sm:text-2xl font-bold leading-tight mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              {exp.title}
            </h3>

            {/* Company */}
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>
              {exp.company}
            </p>

            {/* Meta row — date / period / location */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: <Calendar size={12} style={{ color: 'var(--accent)' }} />, text: exp.duration },
                { icon: <Clock size={12} style={{ color: 'var(--accent-secondary)' }} />, text: exp.period },
                { icon: <MapPin size={12} style={{ color: 'var(--accent-tertiary)' }} />, text: exp.location },
              ].map((meta, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold backdrop-blur-sm"
                  style={{
                    background: 'var(--bg-card-hover)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {meta.icon}
                  {meta.text}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6" style={{ borderTop: '1px solid var(--border)' }} />

          {/* Body — Description + Highlights */}
          <div className="px-6 py-4">
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              {exp.description}
            </p>

            {/* Key Highlights */}
            {exp.highlights && (
              <div className="mb-5">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="flex items-center justify-center w-5 h-5 rounded" style={{ background: 'rgba(255,199,64,0.15)' }}>
                    <Sparkles size={10} style={{ color: 'var(--accent-warm)' }} />
                  </span>
                  Key Highlights
                </h4>
                <ul className="space-y-2.5">
                  {exp.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={cardInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <ArrowRight size={13} style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer — Tech Stack */}
          {exp.skills && (
            <div className="px-6 pb-5">
              <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="flex items-center justify-center w-5 h-5 rounded" style={{ background: 'rgba(179,136,255,0.15)' }}>
                    <Briefcase size={10} style={{ color: 'var(--accent-secondary)' }} />
                  </span>
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + si * 0.03 }}
                      whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.15 } }}
                      className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all cursor-default"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Connector line from card to center node (desktop) */}
        <motion.div
          initial={{ width: 0 }}
          animate={cardInView ? { width: '40px' } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
          className={`hidden md:block absolute top-10 h-0.5 opacity-30 ${
            isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
          }`}
          style={{ background: 'var(--accent)' }}
        />
      </motion.div>
    </div>
  )
}

/* ── Main Experience Component ── */
const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { shouldReduceMotion } = useIsMobile()

  const totalTech = [...new Set(experienceData.flatMap(e => e.skills || []))].length

  const quickStats = [
    { label: 'Total Duration', value: '6+ Months', icon: '⏱️', color: '--accent' },
    { label: 'Internships', value: experienceData.length, icon: '💼', color: '--accent-secondary' },
    { label: 'Technologies', value: `${totalTech}+`, icon: '🚀', color: '--accent-tertiary' }
  ]

  return (
    <section id="experience" className="pt-12 pb-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none hidden md:block" style={{ background: 'var(--neon-glow)', opacity: 0.06 }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none hidden md:block" style={{ background: 'var(--neon-glow-secondary)', opacity: 0.06 }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                Professional Journey
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Experience & Training
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 mx-auto rounded-full mb-4 neon-line"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hands-on experience through internships and intensive training programs
            </motion.p>
          </div>

          {/* Quick Stats — redesigned as horizontal cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-3 gap-3 sm:gap-5 mb-16 max-w-2xl mx-auto"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                className="relative rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all group overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px var(${stat.color}), 0 0 15px var(--neon-glow)` }}
                />
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <div className="text-2xl sm:text-3xl font-black" style={{ color: `var(${stat.color})` }}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ══════ Alternating Timeline ══════ */}
          <div className="relative">
            {/* Center vertical line (desktop) */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 origin-top"
              style={{
                background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), transparent)',
                opacity: 0.25,
              }}
            />

            <div className="space-y-10 md:space-y-16">
              {experienceData.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-16 text-center"
          >
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4">
              Continuously gaining experience and expanding my skill set 🚀
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

export default Experience
