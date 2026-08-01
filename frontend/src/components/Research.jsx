import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { BookOpen, ExternalLink, Award, Users, FileText, ArrowUpRight, CheckCircle2, X, Sparkles } from 'lucide-react'
import { researchData } from '../data/research'

const Research = () => {
  const [selectedPaper, setSelectedPaper] = useState(null)
  const sectionRef = useRef(null)

  // Scroll tracking for parallax background lighting pulse
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  })

  const ambientGlowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1.25, 0.8])
  const ambientGlowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.25, 0.18, 0])

  // Framer Motion Animation Variants for smooth landing transition
  const headerVariants = {
    hidden: { opacity: 0, y: 45, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const paperListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  }

  const paperCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section id="research" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Parallax Ambient Glow */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] pointer-events-none blur-3xl rounded-full z-0"
        style={{
          scale: ambientGlowScale,
          opacity: ambientGlowOpacity,
          background: 'radial-gradient(circle, var(--accent-secondary) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header with Smooth Landing Fade */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[05]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>SCIENTIFIC PUBLICATIONS & RESEARCH</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              CONFERENCE PAPERS & DEEP LEARNING RESEARCH.
            </h2>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-xs card-arch shadow-sm"
              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              <Award size={15} style={{ color: 'var(--accent-secondary)' }} />
              <span>4 Conference Papers & Manuscripts (IEEE & Springer)</span>
            </div>
          </div>
        </motion.div>

        {/* Academic Publication Cards List (Individual Card Viewport Scroll Landing) */}
        <div className="space-y-8">
          {researchData.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 55, scale: 0.96, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.008, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className="p-6 sm:p-8 rounded-2xl border transition-all card-arch shadow-md hover:shadow-xl relative overflow-hidden group"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex flex-col space-y-6">
                
                {/* Top Meta Row: Index, Status, Journal */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b font-mono text-xs"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>[PAPER // 0{idx + 1}]</span>
                    <span className="px-2.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}>
                      {paper.journal} ({paper.year})
                    </span>
                    <span className="px-2.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--accent-tertiary)', background: 'var(--bg-secondary)' }}>
                      {paper.category}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded font-bold ${
                    paper.status === 'Completed' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'
                  }`}>
                    {paper.status === 'Completed' ? '✓ PRESENTED / PUBLISHED' : '⏳ IN PROGRESS'}
                  </span>
                </div>

                {/* Paper Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl leading-snug transition-colors group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                  {paper.title}
                </h3>

                {/* Authors List */}
                <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Users size={14} style={{ color: 'var(--text-tertiary)' }} />
                  <div>
                    {paper.authors.map((author, i) => (
                      <span key={i} className={author === 'Arpan Pramanik' ? 'font-bold underline' : ''}
                        style={{ color: author === 'Arpan Pramanik' ? 'var(--accent)' : 'inherit' }}
                      >
                        {author}{i < paper.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Abstract Text */}
                <p className="font-body text-sm leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                  {paper.abstract}
                </p>

                {/* Results Metrics Grid & DOI */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                  {Object.entries(paper.results).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-xl border card-arch transition-transform hover:scale-[1.03]" style={{ background: 'var(--bg-secondary)' }}>
                      <div className="text-[10px] uppercase" style={{ color: 'var(--text-tertiary)' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-base font-bold font-display mt-0.5" style={{ color: 'var(--accent)' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* DOI & Repository Links Bar */}
                <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {paper.doi ? (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold hover:underline group/link"
                      style={{ color: 'var(--accent)' }}
                    >
                      <Award size={14} />
                      <span>DOI: {paper.doi}</span>
                      <ArrowUpRight size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-tertiary)' }}>DOI: PUBLICATION IN PROGRESS</span>
                  )}

                  <div className="flex items-center gap-3">
                    {paper.github && (
                      <a
                        href={paper.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span>GitHub Code</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedPaper(paper)}
                      className="px-3.5 py-2 rounded-lg border card-arch hover:scale-[1.03] active:scale-[0.97] transition-all font-semibold"
                      style={{ color: 'var(--text-primary)', background: 'var(--bg-secondary)' }}
                    >
                      FULL ABSTRACT & METHODOLOGY
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Abstract Modal View */}
      <AnimatePresence>
        {selectedPaper && (
          <div
            onClick={() => setSelectedPaper(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl border max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                    [PAPER DOSSIER // {selectedPaper.journal}]
                  </div>
                  <h3 className="font-display font-bold text-xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {selectedPaper.title}
                  </h3>
                </div>
                <button onClick={() => setSelectedPaper(null)} className="p-2 rounded-xl border card-arch hover:bg-black/10 dark:hover:bg-white/10 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-body text-sm">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    METHODOLOGY & MODEL ARCHITECTURE
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {selectedPaper.methodology}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    KEYWORDS & INDEX TERMS
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedPaper.keywords.map((k) => (
                      <span key={k} className="px-2.5 py-1 rounded-lg border card-arch"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                      >
                        #{k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t flex items-center justify-between font-mono text-xs"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
              >
                {selectedPaper.doi ? (
                  <a href={`https://doi.org/${selectedPaper.doi}`} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: 'var(--accent)' }}>
                    VIEW PUBLICATION DOI
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-tertiary)' }}>DOI: PUBLICATION IN PROGRESS</span>
                )}
                <button onClick={() => setSelectedPaper(null)} className="hover:underline" style={{ color: 'var(--text-tertiary)' }}>
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
