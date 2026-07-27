import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ExternalLink, Award, Users, FileText, ArrowUpRight, CheckCircle2, X } from 'lucide-react'
import { researchData } from '../data/research'

const Research = () => {
  const [selectedPaper, setSelectedPaper] = useState(null)

  return (
    <section id="research" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-16">
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

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-xs card-arch"
              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              <Award size={15} style={{ color: 'var(--accent-secondary)' }} />
              <span>4 Conference Papers & Manuscripts (IEEE & Springer)</span>
            </div>
          </div>
        </div>

        {/* Academic Publication Cards List */}
        <div className="space-y-8">
          {researchData.map((paper, idx) => (
            <div
              key={paper.id}
              className="p-6 sm:p-8 rounded-2xl border transition-all card-arch"
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
                <h3 className="font-display font-bold text-2xl sm:text-3xl leading-snug" style={{ color: 'var(--text-primary)' }}>
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
                    <div key={key} className="p-3 rounded-xl border card-arch" style={{ background: 'var(--bg-secondary)' }}>
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
                      className="inline-flex items-center gap-1.5 font-semibold hover:underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      <Award size={14} />
                      <span>DOI: {paper.doi}</span>
                      <ArrowUpRight size={12} />
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
                      className="px-3 py-1.5 rounded-lg border card-arch"
                      style={{ color: 'var(--text-primary)', background: 'var(--bg-secondary)' }}
                    >
                      FULL ABSTRACT & METHODOLOGY
                    </button>
                  </div>
                </div>

              </div>
            </div>
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
                <button onClick={() => setSelectedPaper(null)} className="p-2 rounded-xl border card-arch" style={{ color: 'var(--text-tertiary)' }}>
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
                {selectedPaper.doi && (
                  <a href={`https://doi.org/${selectedPaper.doi}`} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: 'var(--accent)' }}>
                    VIEW PUBLICATION DOI
                  </a>
                )}
                <button onClick={() => setSelectedPaper(null)} style={{ color: 'var(--text-tertiary)' }}>
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
