import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FileText, ExternalLink, Award, Users, Calendar, Code2, Sparkles, BookOpen, Target, X } from 'lucide-react'
import { researchData } from '../data/research'

const Research = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedPaper, setSelectedPaper] = useState(null)

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }

  return (
    <section id="research" className="pt-12 pb-20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div animate={floatingAnimation} className="absolute top-20 left-10 opacity-[0.03] hidden sm:block">
        <div className="w-64 h-64 rounded-3xl blur-3xl" style={{ background: 'var(--accent)' }} />
      </motion.div>
      <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }} className="absolute bottom-20 right-10 opacity-[0.03] hidden sm:block">
        <div className="w-80 h-80 rounded-full blur-3xl" style={{ background: 'var(--accent-tertiary)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg neon-pill">
                Academic Contributions
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Research & Publications
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 mx-auto rounded-full mb-4 shadow-lg neon-line"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg px-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Exploring the intersection of AI/ML and agriculture through cutting-edge research
            </motion.p>
          </div>

          {/* Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {[
              { label: 'Publications', value: researchData.length, icon: '📄', color: '--accent' },
              { label: 'Under Progress', value: researchData.filter(p => p.status === 'Under Progress').length, icon: '⏳', color: '--accent-warm' },
              { label: 'Co-authors', value: '7', icon: '👥', color: '--accent-secondary' },
              { label: 'Research Areas', value: '3', icon: '🎯', color: '--accent-tertiary' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.08, y: -8, transition: { duration: 0.2 } }}
                className="p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl text-center cursor-pointer relative overflow-hidden group neon-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <motion.div
                  className="text-2xl sm:text-4xl mb-2 sm:mb-3 relative z-10"
                  animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 relative z-10" style={{ color: `var(${stat.color})` }}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold relative z-10" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Research Papers */}
          <div className="space-y-5 sm:space-y-8">
            {researchData.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, y: -8, transition: { duration: 0.2 } }}
                className="p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer relative overflow-hidden group neon-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onClick={() => setSelectedPaper(paper)}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Paper Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${paper.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}
                  >
                    {paper.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {paper.title}
                    </h3>

                    <div className="flex items-start gap-2 mb-3 flex-wrap">
                      <Users size={16} style={{ color: 'var(--text-tertiary)' }} className="flex-shrink-0 mt-0.5" />
                      <p className="font-medium text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {paper.authors.map((author, i) => (
                          <span key={i} style={author === 'Arpan Pramanik' ? { fontWeight: 700, color: 'var(--accent)' } : {}}>
                            {author}{i < paper.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} style={{ color: 'var(--text-tertiary)' }} className="flex-shrink-0" />
                        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{paper.journal}</span>
                      </div>
                      <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                      <span className="px-2 py-0.5 rounded-md font-semibold neon-pill">{paper.year}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                      <span className="px-2 py-0.5 rounded-md font-semibold"
                        style={{
                          background: 'rgba(179,136,255,0.12)',
                          color: 'var(--accent-secondary)',
                          border: '1px solid color-mix(in srgb, var(--accent-secondary) 25%, transparent)',
                        }}
                      >{paper.category}</span>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                        paper.status === 'Published'
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : paper.status === 'Completed'
                          ? 'bg-sky-500/15 text-sky-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}>
                        {paper.status}
                      </span>
                    </div>

                    <p className="mb-3 sm:mb-4 leading-relaxed line-clamp-3 text-xs sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                      {paper.abstract}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {paper.keywords.slice(0, 5).map((keyword) => (
                        <span key={keyword} className="px-2 py-1 sm:px-3 sm:py-1 text-xs rounded-md font-medium"
                          style={{ background: 'var(--bg-card-hover)', color: 'var(--text-secondary)' }}
                        >{keyword}</span>
                      ))}
                      {paper.keywords.length > 5 && (
                        <span className="px-2 py-1 text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                          +{paper.keywords.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {Object.entries(paper.results).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 rounded-lg"
                          style={{ background: 'var(--bg-card-hover)' }}
                        >
                          <div className="text-xs sm:text-sm font-bold" style={{ color: 'var(--accent)' }}>{value}</div>
                          <div className="text-[11px] sm:text-xs capitalize" style={{ color: 'var(--text-tertiary)' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>

                    {paper.doi && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg"
                        style={{
                          background: 'rgba(0,229,255,0.06)',
                          border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Award size={14} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>DOI Number</div>
                            <a
                              href={`https://doi.org/${paper.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] sm:text-sm font-mono break-all transition-colors"
                              style={{ color: 'var(--accent)' }}
                            >
                              {paper.doi}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full relative z-10">
                      {paper.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={paper.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md text-xs sm:text-sm font-semibold"
                          style={{
                            background: 'var(--bg-elevated)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <Code2 size={16} />
                          Code
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPaper(paper)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md text-xs sm:text-sm font-semibold neon-btn"
                      >
                        <FileText size={16} />
                        Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Research Paper Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPaper(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl sm:rounded-3xl w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="h-1.5 w-full neon-line flex-shrink-0" />

              <div className="overflow-y-auto flex-1">
                <div className="relative px-6 pt-8 pb-6 sm:px-8 sm:pt-9 sm:pb-7" style={{ background: 'var(--bg-secondary)' }}>
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:rotate-90"
                    style={{ background: 'var(--bg-card-hover)', color: 'var(--text-tertiary)' }}
                    title="Close"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex flex-wrap items-center gap-2 mb-4 pr-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm neon-btn">
                      <BookOpen size={11} />
                      {selectedPaper.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'var(--bg-card-hover)', color: 'var(--text-secondary)' }}
                    >
                      📅 {selectedPaper.year}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      selectedPaper.status === 'Published' ? 'bg-emerald-500'
                        : selectedPaper.status === 'Completed' ? 'bg-sky-500'
                        : 'bg-amber-500'
                    }`}>
                      {selectedPaper.status === 'Published' ? '✓' : selectedPaper.status === 'Completed' ? '✔' : '⏳'} {selectedPaper.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                    {selectedPaper.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    <BookOpen size={14} className="flex-shrink-0" />
                    <span className="font-semibold">{selectedPaper.journal}</span>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />

                {/* Authors */}
                <div className="px-6 pt-6 pb-0 sm:px-8 sm:pt-7">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(0,229,255,0.12)' }}>
                      <Users size={13} style={{ color: 'var(--accent)' }} />
                    </span>
                    Authors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.authors.map((author) => (
                      <span
                        key={author}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          author === 'Arpan Pramanik'
                            ? 'text-black shadow-sm neon-btn'
                            : ''
                        }`}
                        style={author !== 'Arpan Pramanik' ? {
                          background: 'var(--bg-card-hover)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        } : {}}
                      >
                        {author === 'Arpan Pramanik' ? '★ ' : ''}{author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Abstract + Methodology */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(0,255,136,0.12)' }}>
                        <FileText size={13} style={{ color: '#00ff88' }} />
                      </span>
                      Abstract
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedPaper.abstract}</p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(179,136,255,0.12)' }}>
                        <Target size={13} style={{ color: 'var(--accent-secondary)' }} />
                      </span>
                      Methodology
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedPaper.methodology}</p>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />

                {/* Results + Keywords */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(255,199,64,0.12)' }}>
                        <Award size={13} style={{ color: 'var(--accent-warm)' }} />
                      </span>
                      Key Results
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedPaper.results).map(([key, value]) => (
                        <div key={key} className="p-3 rounded-xl text-center"
                          style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border)' }}
                        >
                          <div className="text-base font-bold mb-0.5" style={{ color: 'var(--accent)' }}>{value}</div>
                          <div className="text-[11px] capitalize leading-tight" style={{ color: 'var(--text-tertiary)' }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(255,107,230,0.12)' }}>
                        <Sparkles size={13} style={{ color: 'var(--accent-tertiary)' }} />
                      </span>
                      Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPaper.keywords.map((keyword) => (
                        <span key={keyword}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-default"
                          style={{
                            background: 'var(--bg-card-hover)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                          }}
                        >{keyword}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DOI */}
                {selectedPaper.doi && (
                  <>
                    <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />
                    <div className="px-6 py-5 sm:px-8 sm:py-6">
                      <div className="flex items-start gap-3 p-4 rounded-xl"
                        style={{
                          background: 'rgba(0,229,255,0.06)',
                          border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                        }}
                      >
                        <Award size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>Digital Object Identifier (DOI)</div>
                          <a href={`https://doi.org/${selectedPaper.doi}`} target="_blank" rel="noopener noreferrer"
                            className="text-sm font-mono break-all transition-colors" style={{ color: 'var(--accent)' }}
                          >{selectedPaper.doi}</a>
                          <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>Click to open on publisher's website</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />

                {/* Action Buttons */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row gap-3">
                  {selectedPaper.github && (
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={selectedPaper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Code2 size={18} />
                      View Source Code
                    </motion.a>
                  )}
                  {selectedPaper.doi && (
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://doi.org/${selectedPaper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md neon-btn"
                    >
                      <ExternalLink size={18} />
                      View Publication
                    </motion.a>
                  )}
                  {!selectedPaper.doi && !selectedPaper.github && (
                    <div className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm cursor-default border border-dashed"
                      style={{ background: 'var(--bg-card-hover)', color: 'var(--text-tertiary)', borderColor: 'var(--border)' }}
                    >
                      <FileText size={18} />
                      Under Review
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Research
