'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Info, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Terminal, 
  ArrowRight, 
  Activity, 
  Workflow, 
  Binary,
  Code,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react'
import { projectsData } from '../data/projects'
import { personalInfo } from '../data/personalInfo'

// Monochromatic Cursor-Tracked Spotlight Card
const SpotlightCard = ({ children, className = '', style = {}, onClick }) => {
  const cardRef = useRef(null)
  const rafId = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      cardRef.current.style.setProperty('--mouse-x', `${x}px`)
      cardRef.current.style.setProperty('--mouse-y', `${y}px`)

      // Restrained 3D perspective tilt
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -1.8
      const rotateY = ((x - centerX) / centerX) * 1.8

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`
    })
  }

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.15s ease-out, border-color 0.3s ease'
    }
  }

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s ease-out, border-color 0.3s ease'
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group rounded-3xl border overflow-hidden transition-all duration-300 card-arch ${className}`}
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
    >
      {/* Crisp Monochromatic Edge Glow Mask (Pure White / Deep Zinc Accent) */}
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-[24px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--text-primary) 0%, var(--border-hover) 50%, transparent 80%)`,
          padding: '1.5px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          filter: 'drop-shadow(0 0 6px var(--text-primary))'
        }}
      />

      {/* Subtle Ambient Radial Highlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.04) 0%, transparent 75%)`
        }}
      />

      {children}
    </div>
  )
}

// Visual Architecture Pipeline Flowchart Component
const ArchitectureBlueprint = ({ architecture, title }) => {
  return (
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between bg-zinc-950/90 text-zinc-100 font-mono select-none overflow-y-auto max-h-[440px]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Workflow size={14} className="text-white" />
          <span className="font-bold tracking-wider text-white">[DATAFLOW_PIPELINE]</span>
        </div>
        <span className="text-[10px] text-zinc-500 uppercase">{title}</span>
      </div>

      {/* Flow Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-auto">
        {architecture.pipeline.map((node, i) => (
          <div
            key={node.step}
            className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:border-zinc-500 transition-colors relative group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                STEP {node.step}
              </span>
              {i < architecture.pipeline.length - 1 && (
                <ArrowRight size={11} className="text-zinc-600 group-hover:text-zinc-300 transition-colors hidden sm:block" />
              )}
            </div>
            <div className="text-xs font-bold text-white mb-1 tracking-tight">
              {node.name}
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              {node.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Footer architecture summary */}
      <div className="pt-3 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate">{architecture.summary}</span>
        </div>
        <span className="text-[10px] text-zinc-500 shrink-0 hidden md:block">Deterministic Routing</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeModalTab, setActiveModalTab] = useState('benchmarks') // 'benchmarks' | 'architecture' | 'capabilities'
  const [copiedCloneId, setCopiedCloneId] = useState(null)
  // Per-card Dual-View mode state: { [projectId]: 'ui' | 'arch' }
  const [cardViews, setCardViews] = useState({})

  // Category list
  const categories = [
    { id: 'All', label: 'All Systems (05)' },
    { id: 'AI Agents & RAG', label: 'AI Agents & RAG (02)' },
    { id: 'Enterprise Full-Stack', label: 'Enterprise Full-Stack (02)' },
    { id: 'Computer Vision', label: 'Computer Vision (01)' }
  ]

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0]

  // Toggle card view mode
  const toggleCardView = (id, mode) => {
    setCardViews((prev) => ({
      ...prev,
      [id]: mode
    }))
  }

  // Copy git clone command with timeout feedback
  const handleCopyClone = (project) => {
    if (!project.quickClone) return
    navigator.clipboard.writeText(project.quickClone)
    setCopiedCloneId(project.id)
    setTimeout(() => {
      setCopiedCloneId(null)
    }, 2500)
  }

  // Lock body scroll and Escape key listener for modal
  useEffect(() => {
    if (!selectedProject) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProject])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24"
    >
      {/* ─────────────────────────────────────────────────────────────
         SECTION HEADER & MONOCHROMATIC STAMP
         ───────────────────────────────────────────────────────────── */}
      <div>
        {/* Monospace Header Stamp */}
        <div className="relative mb-8 pb-4 border-b border-[var(--border)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-bold text-[var(--accent)]">[SYS_ARCHIVES]</span>
              <span>ENGINEERING CASE STUDIES &amp; PRODUCTION PLATFORMS</span>
            </div>
            <div className="flex items-center gap-4">
              <span>INDEX: AP-PROJ-2026</span>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)] font-semibold hover:underline"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight size={12} />
              </a>
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
              AUTONOMOUS AI AGENTS &amp; FULL-STACK SYSTEMS.
            </h1>
            <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Explore high-performance research platforms, multi-tenant enterprise accreditation engines, and computer vision models engineered with strict memory bounds and deterministic routing.
            </p>
          </div>

          {/* Category Filter HUD (Full width with clean wrapping, preventing any screen cut-off) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
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
         FLAGSHIP SPOTLIGHT: PAPERLENS AI (DUAL-VIEW MODE)
         ───────────────────────────────────────────────────────────── */}
      {featuredProject && (activeCategory === 'All' || activeCategory === featuredProject.category) && (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--accent)]" />
              <span className="font-bold text-[var(--text-primary)]">FLAGSHIP RESEARCH ARCHITECTURE</span>
            </div>
            <span>{featuredProject.status} • {featuredProject.year}</span>
          </div>

          <SpotlightCard className="shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Visual Screen or Architecture Flow (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] border-b lg:border-b-0 lg:border-r border-[var(--border)] overflow-hidden bg-zinc-950 flex flex-col">
                
                {/* Top Overlay: Dual-View Mode Switcher Pill */}
                <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-black/80 backdrop-blur-md text-white font-mono text-xs font-bold pointer-events-auto shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{featuredProject.category}</span>
                  </div>

                  {/* The Dual-View Mode Switcher */}
                  <div className="inline-flex p-1 rounded-xl border border-white/20 bg-black/85 backdrop-blur-md font-mono text-xs pointer-events-auto shadow-lg">
                    <button
                      type="button"
                      onClick={() => toggleCardView(featuredProject.id, 'ui')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                        (cardViews[featuredProject.id] || 'ui') === 'ui'
                          ? 'bg-white text-black shadow-xs'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Layers size={13} />
                      <span>UI Screen</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCardView(featuredProject.id, 'arch')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                        cardViews[featuredProject.id] === 'arch'
                          ? 'bg-white text-black shadow-xs'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      <Workflow size={13} />
                      <span>Architecture</span>
                    </button>
                  </div>
                </div>

                {/* View Content: UI Mode vs Architecture Mode */}
                <div className="flex-1 w-full h-full relative">
                  {(cardViews[featuredProject.id] || 'ui') === 'ui' ? (
                    <div className="w-full h-full min-h-[340px] lg:min-h-[460px] relative group/img-card cursor-pointer overflow-hidden flex items-center justify-center">
                      {/* Brand Logo resting center state */}
                      <div className="absolute inset-0 flex items-center justify-center p-8 z-20 pointer-events-none transition-all duration-500 ease-out group-hover/img-card:opacity-0 group-hover/img-card:scale-90">
                        {featuredProject.logo ? (
                          <img
                            src={featuredProject.logo}
                            alt={`${featuredProject.title} logo`}
                            className="max-w-[70%] max-h-[60%] h-auto w-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
                          />
                        ) : (
                          <div className="text-3xl font-display font-black text-white tracking-wider">
                            {featuredProject.title}
                          </div>
                        )}
                      </div>

                      {/* Hover screenshot reveal */}
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover transition-all duration-700 ease-out opacity-25 group-hover/img-card:opacity-100 group-hover/img-card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-15 group-hover/img-card:opacity-40 transition-opacity" />
                    </div>
                  ) : (
                    <ArchitectureBlueprint
                      architecture={featuredProject.architecture}
                      title={featuredProject.title}
                    />
                  )}
                </div>

              </div>

              {/* Right Column: Case Study Dossier & Key Telemetry (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 relative z-20">
                
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 text-[var(--accent)] font-semibold">
                    <Zap size={13} />
                    <span>{featuredProject.tagline}</span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] tracking-tight mb-3">
                    {featuredProject.title}
                  </h2>

                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    {featuredProject.description}
                  </p>

                  {/* High-Impact Performance KPI Pills */}
                  <div className="grid grid-cols-2 gap-2 mb-6 font-mono text-xs">
                    {featuredProject.benchmarks.slice(0, 4).map((bench, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]"
                      >
                        <div className="font-bold text-[var(--accent)] text-[11px] truncate">
                          {bench.gain}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] truncate mt-0.5">
                          {bench.metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {featuredProject.tech.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons & Deep Dive Trigger */}
                <div className="pt-5 border-t border-[var(--border)] flex flex-wrap items-center gap-3">
                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      style={{
                        background: 'var(--text-primary)',
                        color: 'var(--bg-primary)'
                      }}
                    >
                      <span>Launch Live App</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}

                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all cursor-pointer card-arch"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredProject)}
                    className="px-3.5 py-2.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] transition-all ml-auto cursor-pointer card-arch"
                  >
                    <Info size={13} />
                    <span>Deep Dossier</span>
                  </button>
                </div>

              </div>

            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
         SECONDARY ENGINEERING SYSTEMS: ASYMMETRIC BENTO GRID
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
          <Binary size={14} />
          <span>PRODUCTION SYSTEMS &amp; SPECIALIZED ENGINES</span>
        </div>

        {/* Stable Grid Container to prevent jumping */}
        <div className="min-h-[480px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects
                .filter((p) => p.id !== (activeCategory === 'All' ? featuredProject.id : null))
                .map((project) => {
                  const viewMode = cardViews[project.id] || 'ui'

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col"
                    >
                      <SpotlightCard className="h-full flex flex-col justify-between shadow-md">
                        
                        {/* Card Media Preview Header */}
                        <div className="relative h-64 border-b border-[var(--border)] overflow-hidden bg-zinc-950 flex flex-col">
                          
                          {/* Top Controls Overlay */}
                          <div className="absolute top-3.5 left-3.5 right-3.5 z-40 flex items-center justify-between gap-2 pointer-events-none">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold pointer-events-auto">
                              <span>{project.category}</span>
                            </div>

                            {/* Dual-View Switcher for Secondary Project */}
                            <div className="inline-flex p-0.5 rounded-lg border border-white/20 bg-black/85 backdrop-blur-md font-mono text-[10px] pointer-events-auto shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleCardView(project.id, 'ui')}
                                className={`px-2 py-0.5 rounded transition-all cursor-pointer font-semibold ${
                                  viewMode === 'ui' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                UI
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleCardView(project.id, 'arch')}
                                className={`px-2 py-0.5 rounded transition-all cursor-pointer font-semibold ${
                                  viewMode === 'arch' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Architecture
                              </button>
                            </div>
                          </div>

                          {/* Media Display */}
                          <div className="flex-1 w-full h-full relative">
                            {viewMode === 'ui' ? (
                              <div className="w-full h-full relative group/img-card cursor-pointer overflow-hidden flex items-center justify-center">
                                {/* Brand Logo */}
                                <div className="absolute inset-0 flex items-center justify-center p-6 z-20 pointer-events-none transition-all duration-500 ease-out group-hover/img-card:opacity-0 group-hover/img-card:scale-90">
                                  {project.logo ? (
                                    <img
                                      src={project.logo}
                                      alt={`${project.title} logo`}
                                      className="max-w-[75%] max-h-[65%] h-auto w-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
                                    />
                                  ) : (
                                    <div className="text-xl font-display font-bold text-white tracking-wider">
                                      {project.title}
                                    </div>
                                  )}
                                </div>

                                {/* Hover Screenshot */}
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={350}
                                  className="w-full h-full object-cover transition-all duration-700 ease-out opacity-20 group-hover/img-card:opacity-100 group-hover/img-card:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-15 group-hover/img-card:opacity-40 transition-opacity" />

                                {/* Bottom status badge */}
                                <div className="absolute bottom-3 left-3 z-30 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/70 text-zinc-300 border border-white/10 backdrop-blur-sm pointer-events-none">
                                  {project.status} • {project.year}
                                </div>
                              </div>
                            ) : (
                              <ArchitectureBlueprint
                                architecture={project.architecture}
                                title={project.title}
                              />
                            )}
                          </div>

                        </div>

                        {/* Card Body Dossier */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-20">
                          <div>
                            <div className="font-mono text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1">
                              {project.tagline}
                            </div>

                            <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] tracking-tight mb-2">
                              {project.title}
                            </h3>

                            <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                              {project.description}
                            </p>

                            {/* Performance Gain Snippets */}
                            {project.benchmarks && project.benchmarks.length > 0 && (
                              <div className="grid grid-cols-2 gap-1.5 mb-4 font-mono text-[10px]">
                                {project.benchmarks.slice(0, 2).map((b, i) => (
                                  <div
                                    key={i}
                                    className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]"
                                  >
                                    <span className="font-bold text-[var(--text-primary)] block truncate">
                                      {b.gain}
                                    </span>
                                    <span className="text-[var(--text-tertiary)] block truncate">
                                      {b.metric}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                              {project.tech.slice(0, 6).map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer Action Links */}
                          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                            <div className="flex items-center gap-3">
                              {project.live && (
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline"
                                >
                                  <span>Live Demo</span>
                                  <ArrowUpRight size={12} />
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                >
                                  <Github size={12} />
                                  <span>Code</span>
                                </a>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedProject(project)}
                              className="inline-flex items-center gap-1 text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                            >
                              <Info size={12} />
                              <span>Deep Dossier</span>
                            </button>
                          </div>

                        </div>

                      </SpotlightCard>
                    </motion.div>
                  )
                })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         INTERACTIVE SYSTEM DOSSIER SPECIFICATION MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] card-arch overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between pb-5 mb-5 border-b border-[var(--border)] shrink-0">
                <div className="pr-4 space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] font-semibold uppercase">
                    <Shield size={13} />
                    <span>SYSTEM SPECIFICATION DOSSIER // {selectedProject.category}</span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)]">
                    {selectedProject.tagline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all cursor-pointer shadow-xs shrink-0"
                  aria-label="Close project dossier"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-[var(--border)] font-mono text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModalTab('benchmarks')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer border ${
                    activeModalTab === 'benchmarks'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  ⚡ Key Benchmarks &amp; Rigor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('architecture')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer border ${
                    activeModalTab === 'architecture'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  🏗 Architecture Pipeline
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab('capabilities')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer border ${
                    activeModalTab === 'capabilities'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] font-bold'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  🛠 Modular Engines ({selectedProject.capabilities?.length || 0})
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-1 font-body">
                
                {/* TAB 1: BENCHMARKS */}
                {activeModalTab === 'benchmarks' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                        Executive Architecture Summary
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border)]">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                        Measured Engineering Benchmarks
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.benchmarks?.map((b, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-display font-bold text-xs text-[var(--text-primary)]">
                                {b.metric}
                              </span>
                              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--accent)] border border-[var(--border)]">
                                {b.gain}
                              </span>
                            </div>
                            <p className="font-body text-[11px] text-[var(--text-secondary)] leading-relaxed">
                              {b.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Git Clone Snippet */}
                    {selectedProject.quickClone && (
                      <div className="p-4 rounded-xl border border-[var(--border)] bg-zinc-950 font-mono text-xs text-zinc-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 truncate">
                          <Terminal size={14} className="text-zinc-400 shrink-0" />
                          <span className="text-zinc-400 select-none">$</span>
                          <span className="truncate text-zinc-200">{selectedProject.quickClone}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyClone(selectedProject)}
                          className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs text-white shrink-0 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          {copiedCloneId === selectedProject.id ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy CLI</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: ARCHITECTURE PIPELINE */}
                {activeModalTab === 'architecture' && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                      <ArchitectureBlueprint
                        architecture={selectedProject.architecture}
                        title={selectedProject.title}
                      />
                    </div>
                    
                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] space-y-2">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                        Full-Stack Component Ecosystem
                      </h4>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CAPABILITIES */}
                {activeModalTab === 'capabilities' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.capabilities?.map((cap, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <Code size={13} className="text-[var(--accent)]" />
                            <h5 className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                              {cap.name}
                            </h5>
                          </div>
                          <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                            {cap.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer Bar */}
              <div className="mt-5 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 shrink-0 font-mono text-xs">
                <div className="flex items-center gap-3">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)] hover:underline"
                    >
                      <span>Live Platform</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <Github size={13} />
                      <span>Repository</span>
                    </a>
                  )}
                  {selectedProject.docs && (
                    <a
                      href={selectedProject.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--accent)] hidden sm:inline-flex"
                    >
                      <FileText size={13} />
                      <span>Docs</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all cursor-pointer font-sans text-xs font-semibold"
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
