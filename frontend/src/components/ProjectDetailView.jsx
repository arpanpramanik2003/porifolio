'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  ExternalLink,
  FileText,
  Terminal,
  Check,
  Copy,
  Layers,
  Cpu,
  Workflow,
  Sparkles,
  Zap,
  Activity,
  Code
} from 'lucide-react'

export default function ProjectDetailView({ project, prevProject, nextProject }) {
  const [copiedClone, setCopiedClone] = useState(false)
  const [activeTab, setActiveTab] = useState('benchmarks')

  const handleCopyClone = () => {
    if (!project.quickClone) return
    navigator.clipboard.writeText(project.quickClone)
    setCopiedClone(true)
    setTimeout(() => setCopiedClone(false), 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16"
    >
      {/* ─────────────────────────────────────────────────────────────
         TOP NAVIGATION & MONOSPACE BREADCRUMB BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="relative pb-5 border-b border-[var(--border)] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all card-arch"
          >
            <ArrowLeft size={14} />
            <span>ALL PROJECTS ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
            <span className="hidden sm:inline">INDEX: AP-PROJ-0{project.id}</span>
            <span className="hidden sm:inline">|</span>
            <span className="px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-bold text-[11px]">
              {project.status || 'Verified Production'}
            </span>
          </div>
        </div>

        {/* Animated laser scanline sweep */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 }}
          className="absolute bottom-0 left-0 w-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
         PROJECT HERO HEADER & QUICK DISPATCH
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Title, Tagline, Description & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
              <Sparkles size={12} />
              <span>{project.category}</span>
              <span className="text-[var(--text-tertiary)]">•</span>
              <span>{project.year}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
              {project.title}
            </h1>

            <p className="font-mono text-sm sm:text-base text-[var(--accent)] font-semibold leading-snug">
              {project.tagline}
            </p>
          </div>

          <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-card)] p-5 sm:p-6 rounded-2xl border border-[var(--border)] card-arch">
            {project.fullDescription || project.description}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all shadow-md cursor-pointer"
              >
                <span>Launch Live System</span>
                <ArrowUpRight size={15} />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all card-arch cursor-pointer"
              >
                <Github size={15} />
                <span>Source Repository</span>
              </a>
            )}

            {project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all card-arch cursor-pointer"
              >
                <FileText size={15} />
                <span>Architecture Spec</span>
              </a>
            )}
          </div>

          {/* Terminal Quick Clone Snippet */}
          {project.quickClone && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-xs text-zinc-100 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2 min-w-0 truncate">
                <Terminal size={14} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-500 select-none">$</span>
                <span className="truncate text-zinc-300 select-all">{project.quickClone}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyClone}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs text-white shrink-0 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                title="Copy clone command"
              >
                {copiedClone ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-zinc-400" />
                    <span className="text-[11px] font-medium">COPY</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Visual Showcase & System Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden card-arch shadow-md">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-[var(--border)]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                  NO PREVIEW AVAILABLE
                </div>
              )}
            </div>

            {/* Quick Meta Specs Strip */}
            <div className="p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-tertiary)]">DEPLOYMENT CATEGORY</span>
                <span className="font-bold text-[var(--text-primary)]">{project.category}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-tertiary)]">RELEASE CYCLE</span>
                <span className="font-bold text-[var(--text-primary)]">{project.year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-tertiary)]">SYSTEM HEALTH</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* High-Level Architecture Abstract */}
          {project.architecture?.summary && (
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] card-arch space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                <Workflow size={14} />
                <span>Architecture Overview</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.architecture.summary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE SEGMENTED TABS: BENCHMARKS / ARCHITECTURE / CAPABILITIES
         ───────────────────────────────────────────────────────────── */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer border flex items-center gap-2 ${
              activeTab === 'benchmarks'
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Zap size={14} />
            <span>MEASURED BENCHMARKS &amp; GAINS ({project.benchmarks?.length || 0})</span>
          </button>

          {project.architecture?.pipeline && (
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer border flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Workflow size={14} />
              <span>EXECUTION PIPELINE ({project.architecture.pipeline.length} STAGES)</span>
            </button>
          )}

          {project.capabilities && (
            <button
              type="button"
              onClick={() => setActiveTab('capabilities')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer border flex items-center gap-2 ${
                activeTab === 'capabilities'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold shadow-xs'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Cpu size={14} />
              <span>CORE ENGINES &amp; MODULES ({project.capabilities.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.benchmarks?.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch flex flex-col justify-between space-y-3 hover:border-[var(--accent)] transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                        {b.metric}
                      </span>
                    </div>
                    <span className="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] text-[var(--accent)] border border-[var(--border)]">
                      {b.gain}
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlights List */}
            {project.highlights && (
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>Engineering Highlights</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARCHITECTURE PIPELINE */}
        {activeTab === 'architecture' && project.architecture?.pipeline && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.architecture.pipeline.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch space-y-2.5 relative group hover:border-[var(--accent)] transition-all"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center font-bold text-[var(--accent)]">
                      {step.step}
                    </span>
                    <span className="text-[var(--text-tertiary)] uppercase text-[10px]">STAGE {step.step}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
                    {step.name}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CAPABILITIES */}
        {activeTab === 'capabilities' && project.capabilities && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch space-y-2 hover:border-[var(--accent)] transition-all"
              >
                <div className="flex items-center gap-2 font-display font-bold text-sm text-[var(--text-primary)]">
                  <Layers size={15} className="text-[var(--accent)] shrink-0" />
                  <span>{cap.name}</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
         TECH STACK ECOSYSTEM
         ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] card-arch space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-2">
            <Code size={14} />
            <span>TECHNOLOGY STACK ECOSYSTEM ({project.tech?.length || 0})</span>
          </h3>
          <span className="font-mono text-[11px] text-[var(--text-tertiary)]">ZERO RUNTIME BLOAT</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech?.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl font-mono text-xs border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors select-all"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         INTER-PROJECT PAGINATION FOOTER
         ───────────────────────────────────────────────────────────── */}
      <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-start gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all card-arch"
          >
            <ArrowLeft size={14} />
            <span className="truncate">PREV: {prevProject.title}</span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all card-arch"
          >
            <span className="truncate">NEXT: {nextProject.title}</span>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </motion.div>
  )
}
