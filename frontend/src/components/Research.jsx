'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, 
  ExternalLink, 
  FileText, 
  ArrowUpRight, 
  Sparkles, 
  Github, 
  Copy, 
  Check, 
  X, 
  BookOpen, 
  Layers, 
  Binary, 
  ShieldCheck, 
  Cpu, 
  Terminal,
  ChevronRight,
  Bookmark
} from 'lucide-react'
import { researchData } from '../data/research'

export default function Research() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [activeModalTab, setActiveModalTab] = useState('abstract') // 'abstract' | 'bibtex' | 'results'
  const [copiedBibtexId, setCopiedBibtexId] = useState(null)

  // Category list
  const categories = [
    { id: 'All', label: 'All Publications (04)' },
    { id: 'Explainable AI & Grad-CAM', label: 'Explainable AI & Grad-CAM (02)' },
    { id: 'Vision Transformers & ViTs', label: 'Vision Transformers & ViTs (01)' },
    { id: 'Computer Vision', label: 'Computer Vision (01)' }
  ]

  // Filtered papers
  const filteredPapers = useMemo(() => {
    if (activeCategory === 'All') return researchData
    return researchData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Copy BibTeX citation to clipboard
  const handleCopyBibtex = (paper) => {
    if (!paper.bibtex) return
    navigator.clipboard.writeText(paper.bibtex)
    setCopiedBibtexId(paper.id)
    setTimeout(() => {
      setCopiedBibtexId(null)
    }, 2500)
  }

  // Lock body scroll and Escape key listener for modal
  useEffect(() => {
    if (!selectedPaper) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPaper(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedPaper])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24"
    >
      {/* ─────────────────────────────────────────────────────────────
         SECTION HEADER & MONOCHROMATIC SCHOLARLY STAMP
         ───────────────────────────────────────────────────────────── */}
      <div>
        {/* Monospace Header Stamp */}
        <div className="relative mb-8 pb-4 border-b border-[var(--border)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-bold text-[var(--accent)]">[SYS_SCHOLARLY_ARCHIVES]</span>
              <span>PEER-REVIEWED SCIENTIFIC PROCEEDINGS // ARPAN PRAMANIK</span>
            </div>
            <div className="flex items-center gap-4">
              <span>INDEX: AP-RES-2026</span>
              <span className="text-[var(--text-primary)] font-semibold">IEEE &amp; SPRINGER PROCEEDINGS</span>
            </div>
          </div>
          {/* Animated laser scanline sweep */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
            className="absolute bottom-0 left-0 w-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
          />
        </div>

        {/* Section Title & Description */}
        <div className="space-y-6">
          <div className="max-w-4xl space-y-3">
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
              PEER-REVIEWED CONFERENCE PAPERS &amp; AI RESEARCH.
            </h1>
            <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Published scientific research focusing on Explainable Deep Learning (Grad-CAM), Multi-Task Convolutional Networks, and Parameter-Efficient Vision Transformers (ViTs) with registered global DOIs.
            </p>
          </div>

          {/* Scholarly Telemetry HUD Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { num: '04', label: 'Conference Papers', sub: 'Peer-Reviewed' },
              { num: '03 + 01', label: 'IEEE & Springer', sub: 'Proceedings' },
              { num: '04', label: 'Registered DOIs', sub: 'Permanent Resolvers' },
              { num: '99.9%', label: 'Empirical Accuracy', sub: 'Peak Classification' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch shadow-2xs space-y-1"
              >
                <div className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                  {stat.num}
                </div>
                <div className="font-mono text-xs font-bold text-[var(--accent)]">
                  {stat.label}
                </div>
                <div className="font-mono text-[10px] text-[var(--text-tertiary)]">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Category Filter HUD (Full width with clean wrapping) */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer border shadow-2xs"
                  style={{
                    background: isActive ? 'var(--text-primary)' : 'var(--bg-card)',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    borderColor: isActive ? 'var(--text-primary)' : 'var(--border)'
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         RESEARCH PUBLICATION CARDS (SCIENTIFIC JOURNAL SPEC-SHEET)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Bookmark size={13} className="text-[var(--accent)]" />
            <span className="font-bold text-[var(--text-primary)]">OFFICIAL SCIENTIFIC PROCEEDINGS</span>
          </div>
          <span>FILTERED: {filteredPapers.length} PAPERS</span>
        </div>

        {/* Stable Container to prevent layout shifting */}
        <div className="min-h-[500px] space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPapers.map((paper, idx) => {
              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] card-arch shadow-lg hover:shadow-xl transition-all space-y-6 relative overflow-hidden group"
                >
                  {/* Subtle Corner Ambient Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--border)]/30 to-transparent pointer-events-none rounded-bl-full" />

                  {/* Top Metadata Row: Venue + Publisher + Status + DOI Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--accent)]">
                        DOSSIER // 0{paper.id}
                      </span>
                      <span className="font-bold px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--text-primary)] text-[var(--bg-primary)]">
                        {paper.journal}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[11px]">
                        {paper.publisher}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{paper.conference}</span>
                      </span>
                    </div>

                    {paper.doi && (
                      <a
                        href={paper.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline font-bold text-[11px]"
                      >
                        <span>DOI: {paper.doi}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>

                  {/* Publication Title */}
                  <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[var(--text-primary)] tracking-tight leading-snug">
                    {paper.title}
                  </h2>

                  {/* Author Ledger with Arpan Pramanik Highlighted */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] flex items-center gap-1.5">
                      <FileText size={11} className="text-[var(--accent)]" />
                      <span>AUTHORSHIP &amp; SCIENTIFIC INVESTIGATORS</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                      {paper.authors.map((author, i) => {
                        const isMe = author.includes('Arpan Pramanik')
                        return (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                              isMe
                                ? 'border-[var(--accent)] font-bold text-[var(--text-primary)] bg-[var(--bg-secondary)] shadow-2xs'
                                : 'border-transparent text-[var(--text-secondary)]'
                            }`}
                          >
                            {author}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Abstract Preview */}
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed text-justify sm:text-left">
                    {paper.abstract}
                  </p>

                  {/* Empirical Performance Metric Grid */}
                  {paper.metrics && paper.metrics.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] flex items-center gap-1.5">
                        <Sparkles size={11} className="text-[var(--accent)]" />
                        <span>EMPIRICAL BENCHMARKS &amp; FINDINGS</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                        {paper.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] space-y-0.5"
                          >
                            <div className="text-[10px] text-[var(--text-tertiary)] truncate">
                              {metric.label}
                            </div>
                            <div className="font-bold text-sm sm:text-base text-[var(--text-primary)] truncate">
                              {metric.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keywords & Methodology */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                      {paper.keywords.slice(0, 5).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="font-mono text-xs text-[var(--text-tertiary)]">
                      <span>Venue: {paper.fullConference}</span>
                    </div>
                  </div>

                  {/* Action HUD Bar */}
                  <div className="pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* DOI Direct Link */}
                      <a
                        href={paper.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                        style={{
                          background: 'var(--text-primary)',
                          color: 'var(--bg-primary)'
                        }}
                      >
                        <span>Official {paper.publisher} DOI</span>
                        <ArrowUpRight size={13} />
                      </a>

                      {/* 1-Click BibTeX Citation Generator */}
                      <button
                        type="button"
                        onClick={() => handleCopyBibtex(paper)}
                        className="px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer flex items-center gap-1.5 card-arch"
                      >
                        {copiedBibtexId === paper.id ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400 font-bold">BibTeX Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy BibTeX</span>
                          </>
                        )}
                      </button>

                      {/* Code Repository if available */}
                      {paper.github && (
                        <a
                          href={paper.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer flex items-center gap-1.5 card-arch"
                        >
                          <Github size={13} />
                          <span>Code Repository</span>
                        </a>
                      )}
                    </div>

                    {/* Deep Specification Dossier Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaper(paper)}
                      className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline font-semibold cursor-pointer ml-auto"
                    >
                      <BookOpen size={13} />
                      <span>Full Paper Dossier</span>
                    </button>
                  </div>

                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE SCIENTIFIC DOSSIER SPECIFICATION MODAL
         ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE SCIENTIFIC DOSSIER SPECIFICATION MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPaper && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 pt-16 sm:pt-20 pb-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[86vh] flex flex-col rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] card-arch shadow-2xl overflow-hidden"
            >
              {/* Modal Top Header */}
              <div className="p-5 sm:p-6 border-b border-[var(--border)] shrink-0 bg-[var(--bg-secondary)]/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs">
                      <span className="font-bold px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-card)] text-[var(--accent)]">
                        DOSSIER // 0{selectedPaper.id}
                      </span>
                      <span className="font-semibold text-[var(--accent)]">
                        {selectedPaper.journal}
                      </span>
                      <span className="text-[var(--text-tertiary)]">• {selectedPaper.publisher}</span>
                    </div>

                    <h2 className="font-display font-bold text-base sm:text-lg lg:text-xl text-[var(--text-primary)] tracking-tight leading-snug">
                      {selectedPaper.title}
                    </h2>

                    <p className="font-mono text-[11px] text-[var(--text-tertiary)] truncate">
                      {selectedPaper.fullConference} ({selectedPaper.year})
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPaper(null)}
                    className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all cursor-pointer shadow-xs shrink-0 flex items-center justify-center"
                    aria-label="Close research dossier"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Navigation Segmented Control */}
              <div className="px-5 sm:px-6 pt-3 pb-3 border-b border-[var(--border)] shrink-0 bg-[var(--bg-card)]">
                <div className="inline-flex p-1 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] font-mono text-xs w-full sm:w-auto flex-wrap sm:flex-nowrap gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('abstract')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium text-center ${
                      activeModalTab === 'abstract'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Abstract &amp; Pipeline
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('bibtex')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium text-center ${
                      activeModalTab === 'bibtex'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    BibTeX Citation
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('results')}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium text-center ${
                      activeModalTab === 'results'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Empirical Metrics
                  </button>
                </div>
              </div>

              {/* Modal Body: Single Smooth Scrollable Container */}
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 font-body text-xs sm:text-sm">
                
                {/* TAB 1: ABSTRACT & METHODOLOGY */}
                {activeModalTab === 'abstract' && (
                  <div className="space-y-5">
                    <div>
                      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2 flex items-center gap-1.5">
                        <FileText size={12} className="text-[var(--accent)]" />
                        <span>RESEARCH ABSTRACT</span>
                      </div>
                      <p className="leading-relaxed text-[var(--text-secondary)] text-justify sm:text-left">
                        {selectedPaper.abstract}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)]">
                      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2 flex items-center gap-1.5">
                        <Cpu size={12} className="text-[var(--accent)]" />
                        <span>MODEL ARCHITECTURE &amp; METHODOLOGY</span>
                      </div>
                      <p className="leading-relaxed text-[var(--text-secondary)]">
                        {selectedPaper.methodology}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)]">
                      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                        INVESTIGATOR TEAM
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {selectedPaper.authors.map((author, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-md border ${
                              author.includes('Arpan Pramanik')
                                ? 'border-[var(--accent)] font-bold text-[var(--text-primary)] bg-[var(--bg-secondary)] shadow-2xs'
                                : 'border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50'
                            }`}
                          >
                            {author}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BIBTEX CITATION */}
                {activeModalTab === 'bibtex' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-[var(--text-tertiary)]">
                      <span>STANDARD BIBTEX ENTRY FOR LATEX / OVERLEAF</span>
                      <button
                        type="button"
                        onClick={() => handleCopyBibtex(selectedPaper)}
                        className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all cursor-pointer flex items-center gap-1.5 font-bold"
                      >
                        {copiedBibtexId === selectedPaper.id ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-950 font-mono text-xs text-zinc-200 overflow-x-auto select-all leading-relaxed shadow-inner">
                      <pre>{selectedPaper.bibtex}</pre>
                    </div>
                  </div>
                )}

                {/* TAB 3: RESULTS */}
                {activeModalTab === 'results' && (
                  <div className="space-y-5">
                    <div>
                      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                        EMPIRICAL PERFORMANCE BENCHMARKS
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        {selectedPaper.metrics?.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] space-y-1"
                          >
                            <div className="text-[10px] uppercase text-[var(--text-tertiary)] truncate">
                              {m.label}
                            </div>
                            <div className="font-bold text-base sm:text-lg text-[var(--text-primary)] truncate">
                              {m.val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)]">
                      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                        INDEXING KEYWORDS
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {selectedPaper.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer Bar */}
              <div className="p-4 sm:p-5 border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 flex flex-wrap items-center justify-between gap-3 shrink-0 font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={selectedPaper.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    style={{
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)'
                    }}
                  >
                    <span>Official {selectedPaper.publisher} DOI</span>
                    <ArrowUpRight size={13} />
                  </a>

                  {selectedPaper.github && (
                    <a
                      href={selectedPaper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all flex items-center gap-1.5 cursor-pointer card-arch"
                    >
                      <Github size={13} />
                      <span>Repository</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPaper(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer font-sans text-xs font-semibold ml-auto card-arch"
                >
                  Close Dossier
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
