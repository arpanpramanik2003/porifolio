import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { BookOpen, ExternalLink, Award, FileText, ArrowUpRight, CheckCircle2, X, Sparkles, ChevronDown, Github } from 'lucide-react'
import { researchData } from '../data/research'

const Research = () => {
  const [expandedId, setExpandedId] = useState(researchData[0]?.id || null)
  const [selectedPaperModal, setSelectedPaperModal] = useState(null)
  const sectionRef = useRef(null)
  const modalRef = useRef(null)

  // Focus trapping & Escape key dismissal for modal
  useEffect(() => {
    if (!selectedPaperModal) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPaperModal(null)
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
  }, [selectedPaperModal])

  // Scroll tracking for section header entrance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end start']
  })

  const headerY = useTransform(scrollYProgress, [0.05, 0.35], [35, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1])

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Animation variants
  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        delayChildren: 0.04
      }
    }
  }

  const metricCellVariants = {
    collapsed: { opacity: 0, y: 6 },
    expanded: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="research" aria-labelledby="research-heading" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] pointer-events-none opacity-10 dark:opacity-5 blur-3xl rounded-full z-0"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ASYMMETRIC SECTION HEADER */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[05]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>SCIENTIFIC PUBLICATIONS & RESEARCH</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 id="research-heading" className="font-display text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              CONFERENCE PAPERS & DEEP LEARNING RESEARCH.
            </h2>

            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border card-arch shrink-0 font-mono text-xs shadow-xs"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Award size={15} style={{ color: 'var(--accent)' }} />
              <span>{researchData.length} Conference Papers (IEEE & Springer)</span>
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           EXPANDABLE RESEARCH DOSSIER ROWS (Spec-Sheet List)
           ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {researchData.map((paper, idx) => {
            const isExpanded = paper.id === expandedId

            // Format primary metric preview string
            const resultEntries = Object.entries(paper.results || {})
            const primaryPreviewStr = resultEntries
              .slice(0, 2)
              .map(([key, val]) => `${key.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${val}`)
              .join('  |  ')

            return (
              <div
                key={paper.id}
                className={`rounded-2xl border transition-all duration-300 card-arch overflow-hidden ${
                  isExpanded ? 'shadow-xl' : 'hover:border-[var(--border-hover)] shadow-xs'
                }`}
                style={{
                  background: 'var(--bg-card)',
                  borderColor: isExpanded ? 'var(--accent)' : 'var(--border)',
                  borderLeftWidth: '4px',
                  borderLeftColor: isExpanded ? 'var(--accent)' : 'var(--border)'
                }}
              >
                {/* Collapsed Row Header Trigger */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`paper-dossier-${paper.id}`}
                  onClick={() => toggleExpand(paper.id)}
                  className="w-full text-left p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 focus-outline cursor-pointer group"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    
                    {/* Spec Header Metadata */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span
                        className="font-bold tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          color: isExpanded ? 'var(--accent)' : 'var(--text-tertiary)',
                          borderColor: isExpanded ? 'var(--accent)' : 'var(--border)'
                        }}
                      >
                        DOSSIER // 0{idx + 1}
                      </span>
                      <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        {paper.journal} ({paper.year})
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full border text-[11px] card-arch"
                        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                      >
                        {paper.category}
                      </span>
                      {/* Preserved Green Status Signal */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 size={11} />
                        <span>{paper.conference}</span>
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3
                      className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {paper.title}
                    </h3>

                    {/* Monospace Quick Metric Preview (Single Line) */}
                    {!isExpanded && primaryPreviewStr && (
                      <p className="font-mono text-xs truncate pt-1 opacity-80" style={{ color: 'var(--text-tertiary)' }}>
                        {primaryPreviewStr}
                      </p>
                    )}
                  </div>

                  {/* Expand Chevron Icon Indicator */}
                  <div
                    className={`w-9 h-9 rounded-xl border card-arch flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                    style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Expanded Dossier Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`paper-dossier-${paper.id}`}
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className="p-5 sm:p-8 space-y-6 font-body text-xs sm:text-sm">
                        
                        {/* Authors Ledger */}
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                            <FileText size={12} style={{ color: 'var(--accent)' }} />
                            <span>AUTHOR SHIP & RESEARCHERS</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                            {paper.authors.map((author, i) => {
                              const isMe = author.includes('Arpan Pramanik')
                              return (
                                <span key={i} className="inline-flex items-center">
                                  <span
                                    className={`px-2.5 py-1 rounded-md border ${
                                      isMe
                                        ? 'font-bold border-[var(--accent)] bg-[var(--bg-secondary)]'
                                        : 'border-transparent'
                                    }`}
                                    style={{
                                      color: isMe ? 'var(--text-primary)' : 'var(--text-secondary)'
                                    }}
                                  >
                                    {author}
                                  </span>
                                  {i < paper.authors.length - 1 && (
                                    <span className="ml-1 text-[var(--text-tertiary)]">•</span>
                                  )}
                                </span>
                              )
                            })}
                          </div>
                        </div>

                        {/* Abstract Summary */}
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                            // ABSTRACT SUMMARY
                          </div>
                          <p className="leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                            {paper.abstract}
                          </p>
                        </div>

                        {/* Terminal Spec-Sheet Metric Grid */}
                        {paper.results && (
                          <div>
                            <div className="font-mono text-[11px] uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                              <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                              <span>EMPIRICAL PERFORMANCE METRICS & SPECIFICATIONS</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                              {Object.entries(paper.results).map(([key, val], idx) => (
                                <motion.div
                                  key={key}
                                  variants={metricCellVariants}
                                  className="p-3.5 rounded-xl border card-arch space-y-1"
                                  style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border)'
                                  }}
                                >
                                  <div className="text-[10px] uppercase tracking-wider text-ellipsis overflow-hidden whitespace-nowrap" style={{ color: 'var(--text-tertiary)' }}>
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </div>
                                  <div className="text-sm sm:text-base font-bold tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>
                                    {val}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Methodology Overview */}
                        {paper.methodology && (
                          <div className="pt-2">
                            <div className="font-mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-tertiary)' }}>
                              // MODEL ARCHITECTURE & PIPELINE
                            </div>
                            <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              {paper.methodology}
                            </p>
                          </div>
                        )}

                        {/* Keywords Matrix */}
                        {paper.keywords && (
                          <div>
                            <div className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                              // INDEXING KEYWORDS
                            </div>
                            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                              {paper.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="px-2.5 py-1 rounded-md border"
                                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Footer Links */}
                        <div className="pt-5 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
                          <div className="flex flex-wrap items-center gap-3">
                            {paper.doi && (
                              <a
                                href={`https://doi.org/${paper.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-xl font-bold border transition-colors shadow-xs flex items-center gap-1.5 focus-outline"
                                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                              >
                                <span>IEEE / Springer DOI</span>
                                <ArrowUpRight size={13} />
                              </a>
                            )}

                            {paper.github && (
                              <a
                                href={paper.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-xl border transition-colors card-arch flex items-center gap-1.5 focus-outline"
                                style={{ color: 'var(--text-primary)' }}
                              >
                                <Github size={13} />
                                <span>Code Repository</span>
                              </a>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedPaperModal(paper)}
                            className="inline-flex items-center gap-1.5 hover:underline focus-outline ml-auto"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <BookOpen size={13} />
                            <span>Full Specification Dossier</span>
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>

      {/* Full Specification Dossier Modal */}
      <AnimatePresence>
        {selectedPaperModal && (
          <div
            onClick={() => setSelectedPaperModal(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="paper-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="rounded-3xl border max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl card-arch relative z-50"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="p-6 border-b flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                    [PAPER DOSSIER // {selectedPaperModal.journal}]
                  </div>
                  <h3 id="paper-modal-title" className="font-display font-bold text-xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {selectedPaperModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPaperModal(null)}
                  aria-label="Close modal"
                  className="p-2 rounded-xl border card-arch hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus-outline"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div data-lenis-prevent="true" className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0 overscroll-contain space-y-6 font-body text-sm">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    METHODOLOGY & MODEL ARCHITECTURE
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {selectedPaperModal.methodology}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    FULL ABSTRACT
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {selectedPaperModal.abstract}
                  </p>
                </div>

                {selectedPaperModal.results && (
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      EXPERIMENTAL RESULTS SUMMARY
                    </div>
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      {Object.entries(selectedPaperModal.results).map(([k, v]) => (
                        <div key={k} className="p-3 rounded-xl border card-arch" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                          <div className="text-[10px] uppercase text-[var(--text-tertiary)] mb-0.5">{k}</div>
                          <div className="font-bold text-[var(--text-primary)]">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                {selectedPaperModal.doi && (
                  <a
                    href={`https://doi.org/${selectedPaperModal.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl font-bold border transition-colors shadow-sm focus-outline"
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                  >
                    IEEE / SPRINGER DOI
                  </a>
                )}
                <button
                  onClick={() => setSelectedPaperModal(null)}
                  className="hover:underline ml-auto focus-outline"
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

export default Research
