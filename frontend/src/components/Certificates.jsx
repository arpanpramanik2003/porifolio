import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Award, Calendar, Building, Sparkles, TrendingUp, CheckCircle, ChevronDown, Eye, RotateCcw } from 'lucide-react'
import { certificatesData } from '../data/certificates'

const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showAll, setShowAll] = useState(false)
  const [expandedCert, setExpandedCert] = useState(null)
  const [animatedStats, setAnimatedStats] = useState({
    certifications: 0,
    hours: 0,
    institutions: 0,
    completed: 0
  })

  useEffect(() => {
    if (!isInView) return

    const targetStats = {
      certifications: certificatesData.length,
      hours: 200,
      institutions: 4,
      completed: 100
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        certifications: Math.floor(targetStats.certifications * progress),
        hours: Math.floor(targetStats.hours * progress),
        institutions: Math.floor(targetStats.institutions * progress),
        completed: Math.floor(targetStats.completed * progress)
      })

      if (currentStep >= steps) {
        setAnimatedStats(targetStats)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isInView])

  const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 2)

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }

  return (
    <section id="certificates" className="pt-12 pb-20 relative overflow-hidden">
      {/* Floating Background */}
      <motion.div animate={floatingAnimation} className="absolute top-20 left-10 opacity-[0.03] hidden md:block">
        <div className="w-64 h-64 rounded-3xl blur-3xl" style={{ background: 'var(--accent-warm)' }} />
      </motion.div>
      <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }} className="absolute bottom-20 right-10 opacity-[0.03] hidden md:block">
        <div className="w-80 h-80 rounded-full blur-3xl" style={{ background: 'var(--accent-secondary)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255,199,64,0.12)',
                  color: 'var(--accent-warm)',
                  border: '1px solid color-mix(in srgb, var(--accent-warm) 30%, transparent)',
                }}
              >
                Professional Development
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Certificates & Training
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full mb-4 neon-line"
            />
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-2xl mx-auto">
              Professional certifications and intensive training programs in cutting-edge technologies
            </p>
          </div>

          {/* Certificate Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Certifications', value: animatedStats.certifications, suffix: '', icon: '🏆', color: '--accent-warm' },
              { label: 'Training Hours', value: animatedStats.hours, suffix: '+', icon: '⏱️', color: '--accent' },
              { label: 'Institutions', value: animatedStats.institutions, suffix: '', icon: '🏛️', color: '--accent-secondary' },
              { label: 'Completed', value: animatedStats.completed, suffix: '%', icon: '✅', color: '--accent-tertiary' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl shadow-lg hover:shadow-2xl text-center transition-shadow relative overflow-hidden group neon-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <motion.div
                  className="text-4xl mb-3 relative z-10"
                  animate={isInView ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold mb-2 font-mono tabular-nums relative z-10" style={{ color: `var(${stat.color})` }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-medium relative z-10" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                className="cert-flip-container cursor-pointer"
                style={{ perspective: '1200px' }}
                onClick={() => cert.file && setExpandedCert(expandedCert === cert.id ? null : cert.id)}
              >
                <motion.div
                  className="cert-flip-inner relative w-full min-h-[320px] sm:min-h-[340px] md:min-h-[360px]"
                  animate={{ rotateY: expandedCert === cert.id ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    className="cert-flip-face absolute inset-0 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl overflow-hidden neon-card"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderLeft: '4px solid var(--accent)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15, transition: { duration: 0.5 } }}
                          className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-lg neon-btn"
                        >
                          {cert.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1 sm:mb-2 transition-colors leading-tight" style={{ color: 'var(--text-primary)' }}>
                            {cert.title}
                          </h3>
                          <span className="inline-block px-3 py-1 text-xs rounded-full font-semibold neon-pill">
                            {cert.type}
                          </span>
                        </div>
                      </div>

                      <p className="mb-3 leading-relaxed text-xs sm:text-sm line-clamp-3 md:line-clamp-none" style={{ color: 'var(--text-secondary)' }}>
                        {cert.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--bg-card-hover)' }}
                          >
                            <Building size={14} style={{ color: 'var(--accent)' }} />
                          </div>
                          <span className="text-sm font-medium">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                          <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--bg-card-hover)' }}
                          >
                            <Calendar size={14} style={{ color: 'var(--accent-secondary)' }} />
                          </div>
                          <span className="text-sm font-medium">{cert.date}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-5 flex items-center justify-between gap-4 flex-wrap"
                        style={{ borderTop: '1px solid var(--border)' }}
                      >
                        <div className="flex items-center gap-2" style={{ color: '#00ff88' }}>
                          <CheckCircle size={18} className="fill-current" />
                          <span className="text-sm font-bold">Certificate Earned</span>
                        </div>
                        {cert.file && (
                          <motion.button
                            onClick={(e) => { e.stopPropagation(); setExpandedCert(cert.id); }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow hover:shadow-lg transition-shadow neon-btn"
                          >
                            <Eye size={14} />
                            <span>View Certificate</span>
                          </motion.button>
                        )}
                        <span className="flex md:hidden text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tap to view →</span>
                      </div>
                    </div>

                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-bl-full blur-2xl"
                      style={{ background: 'var(--neon-glow)' }}
                    />
                  </div>

                  {/* ── BACK FACE (Certificate Image) ── */}
                  <div
                    className="cert-flip-face absolute inset-0 rounded-2xl shadow-xl overflow-hidden neon-card flex flex-col"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Certificate image */}
                    <div className="flex-1 overflow-hidden p-3">
                      <img
                        src={cert.file}
                        alt={cert.title}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>

                    {/* Bottom bar */}
                    <div className="p-4 flex items-center justify-between"
                      style={{ borderTop: '1px solid var(--border)' }}
                    >
                      <h4 className="text-sm font-bold truncate mr-3" style={{ color: 'var(--text-primary)' }}>
                        {cert.title}
                      </h4>
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); setExpandedCert(null); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex flex-shrink-0 items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow hover:shadow-lg transition-shadow neon-btn"
                      >
                        <RotateCcw size={14} />
                        <span>Flip Back</span>
                      </motion.button>
                      <span className="flex md:hidden text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tap to go back →</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View More/Less Button */}
          {certificatesData.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden neon-btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showAll ? (
                    <>
                      Show Less
                      <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={20} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      View All Certificates ({certificatesData.length})
                      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown size={20} />
                      </motion.div>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* Timeline View */}
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp style={{ color: 'var(--accent)' }} size={32} />
                </motion.div>
                <span className="gradient-text">
                  Learning Journey Timeline
                </span>
              </motion.h3>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 neon-line hidden md:block" />
                <div className="absolute left-[9px] top-0 bottom-0 w-0.5 neon-line md:hidden" />

                <div className="space-y-8 md:space-y-12">
                  {certificatesData.map((cert, index) => (
                    <motion.div
                      key={`timeline-${cert.id}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                      className={`flex flex-row-reverse items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <motion.div
                        className={`flex-1 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="inline-block backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all group w-full md:w-auto neon-card"
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <h4 className="font-bold mb-2 transition-colors text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>{cert.title}</h4>
                          <div className="flex items-center gap-2 text-sm justify-start" style={{ color: 'var(--text-secondary)' }}>
                            <Calendar size={14} style={{ color: 'var(--accent-secondary)' }} className="flex-shrink-0" />
                            <span>{cert.date}</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                        whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                        className="relative z-10 flex-shrink-0 w-5 h-5 rounded-full border-4 shadow-lg cursor-pointer neon-btn"
                        style={{ borderColor: 'var(--bg-primary)' }}
                      />

                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="inline-block p-8 rounded-2xl shadow-xl neon-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-lg font-semibold mb-6 max-w-md" style={{ color: 'var(--text-primary)' }}>
                Continuously upskilling in emerging technologies and industry best practices
              </p>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <Award style={{ color: 'var(--accent-warm)' }} className="drop-shadow-lg" size={56} />
              </motion.div>
              <p className="text-sm mt-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                🚀 Always Learning, Always Growing
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
