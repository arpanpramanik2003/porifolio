'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Code, 
  Brain, 
  Cpu, 
  Database,
  CheckCircle2
} from 'lucide-react'
import Hero from '../src/components/Hero'
import IntroPreloader from '../src/components/IntroPreloader'
import { useIntro } from '../src/contexts/IntroContext'
import { projectsData } from '../src/data/projects'
import { researchData } from '../src/data/research'

export default function ClientAppShell() {
  const { hasSeenIntro, setHasSeenIntro } = useIntro()

  const handleIntroComplete = () => {
    setHasSeenIntro()
  }

  // Top 2 Flagship Projects
  const flagshipProjects = projectsData.slice(0, 2)
  // Top 2 Research Papers
  const featuredPapers = researchData.slice(0, 2)

  // Primary Tech Stack Badges
  const techStack = [
    { name: 'Python', role: 'AI Engine' },
    { name: 'PyTorch', role: 'Neural Nets' },
    { name: 'Next.js 15', role: 'SSR & Edge' },
    { name: 'React 19', role: 'Reactive UI' },
    { name: 'FastAPI', role: 'Async Microservices' },
    { name: 'TypeScript', role: 'Type Safety' },
    { name: 'PostgreSQL', role: 'Relational DB' },
    { name: 'Supabase (pgvector)', role: 'Vector Search' },
    { name: 'Docker', role: 'Containers' },
    { name: 'Tailwind CSS v4', role: 'Design System' }
  ]

  return (
    <>
      {/* Fullscreen Root Preloader Overlay (Only on First Visit / Page Refresh) */}
      <AnimatePresence mode="wait">
        {!hasSeenIntro && (
          <IntroPreloader onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <Hero isIntroComplete={hasSeenIntro} />

        {/* 2. Core Engineering Pillars Highlights */}
        <section className="py-16 md:py-24 border-t border-b border-[var(--border)] relative bg-[var(--bg-secondary)]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2.5 text-[var(--accent)]">
                  <span>[DISCIPLINE]</span>
                  <span className="w-6 h-px bg-[var(--accent)]" />
                  <span>CORE PILLARS</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl tracking-tight text-[var(--text-primary)] leading-tight break-words">
                  ENGINEERED WITH RIGOR.
                </h2>
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer group"
              >
                <span>Read Background &amp; Dossier</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Autonomous AI Agents',
                  desc: 'Multi-step agentic orchestrators with tool integration, streaming citation tracking, and low-latency API consolidation.'
                },
                {
                  icon: Layers,
                  title: 'Grounded Retrieval (RAG)',
                  desc: 'Dual-pipeline hybrid architectures pairing memory-speed BM25 + FAISS with persistent remote pgvector storage.'
                },
                {
                  icon: Cpu,
                  title: 'Production Web Systems',
                  desc: 'Full-stack enterprise platforms with distributed tracing, RBAC JWT auth, and microsecond edge rendering.'
                }
              ].map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch hover:border-[var(--accent)] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)] mb-4 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 3. Featured Flagship Systems (Curated Top 2) */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2.5 text-[var(--accent)]">
                  <span>[FEATURED]</span>
                  <span className="w-6 h-px bg-[var(--accent)]" />
                  <span>PRODUCTION SYSTEMS</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-3xl lg:text-5xl tracking-tight text-[var(--text-primary)] leading-tight break-words">
                  FLAGSHIP ARCHITECTURES.
                </h2>
              </div>
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-all card-arch cursor-pointer"
              >
                <span>View All 5+ Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Curated Bento Grid (2 Flagship Projects) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {flagshipProjects.map((project) => (
                <div 
                  key={project.id}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-arch flex flex-col group hover:border-[var(--accent)] transition-all duration-300"
                >
                  {/* Visual Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950/80 border-b border-[var(--border)]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='28'%3E" + project.title + "%3C/text%3E%3C/svg%3E"
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-white uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                          {project.title}
                        </h3>
                        <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                          {project.year}
                        </span>
                      </div>

                      <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.slice(0, 5).map((t, idx) => (
                          <span 
                            key={idx}
                            className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.live && (
                          <a 
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <span>Source Code</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <Link 
                        href="/projects"
                        className="font-mono text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Peer-Reviewed Academic Research Teaser */}
        <section className="py-20 md:py-28 border-t border-[var(--border)] bg-[var(--bg-secondary)]/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2.5 text-[var(--accent)]">
                  <span>[SCIENTIFIC]</span>
                  <span className="w-6 h-px bg-[var(--accent)]" />
                  <span>PUBLICATIONS &amp; PAPERS</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-3xl lg:text-5xl tracking-tight text-[var(--text-primary)] leading-tight break-words">
                  ACADEMIC RESEARCH.
                </h2>
              </div>
              <Link 
                href="/research" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-all card-arch cursor-pointer"
              >
                <span>View All 4 Conference Papers</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPapers.map((paper) => (
                <div 
                  key={paper.id}
                  className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--text-tertiary)] mb-3">
                      <span className="font-bold text-[var(--accent)]">{paper.journal}</span>
                      <span>{paper.year}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-3 leading-snug">
                      {paper.title}
                    </h3>

                    <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">
                      {paper.abstract}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[var(--text-tertiary)]">
                      DOI: {paper.doi}
                    </span>
                    <a 
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                    >
                      <span>Publisher Link</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Production Stack Marquee / Badges */}
        <section className="py-14 border-t border-b border-[var(--border)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
              PRODUCTION TECHNOLOGY TOOLCHAIN
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-6xl mx-auto px-4">
            {techStack.map((tech, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch"
              >
                <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                  {tech.name}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                  • {tech.role}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. High-Conversion Fast Contact Banner */}
        <section className="py-20 md:py-28 relative text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-4 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--accent)]">
              <Terminal size={13} />
              <span>COLLABORATION TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-3xl md:text-5xl tracking-tight text-[var(--text-primary)] mb-6 leading-tight break-words">
              LET&apos;S ENGINEER SOMETHING EXCEPTIONAL.
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
              Available for AI/ML engineering roles, autonomous agent architectures, full-stack systems, or applied research consultations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <button className="px-7 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2 border-none bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer">
                  <span>Open Contact Terminal</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
              <a 
                href="/resume.pdf" 
                download
                className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2 border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-all card-arch cursor-pointer"
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
