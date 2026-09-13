'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  MapPin, 
  Terminal, 
  ExternalLink, 
  Calendar, 
  Building2, 
  Award, 
  Eye, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  Code, 
  Brain, 
  Database,
  CheckCircle2,
  ChevronRight,
  Briefcase
} from 'lucide-react'
import { personalInfo } from '../data/personalInfo'
import { domainEcosystem } from '../data/skills'
import { experienceData } from '../data/experience'
import { certificatesData } from '../data/certificates'

export default function AboutDossier() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedCert, setSelectedCert] = useState(null)
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (!selectedCert) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedCert])

  // Flattened all skills with category tagging
  const allSkills = useMemo(() => {
    const list = []
    domainEcosystem.forEach((domain) => {
      domain.clusters.forEach((cluster) => {
        cluster.skills.forEach((skill) => {
          list.push({
            ...skill,
            categoryId: domain.id,
            categoryName: domain.category,
            clusterName: cluster.name
          })
        })
      })
    })
    return list
  }, [])

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return allSkills
    return allSkills.filter((s) => s.categoryId === activeCategory)
  }, [activeCategory, allSkills])

  // Category Tabs (Streamlined to 4 authentic categories)
  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'full-stack', label: 'Full-Stack Systems' },
    { id: 'data-cloud', label: 'Data & Cloud' },
    { id: 'tooling-mlops', label: 'MLOps & Tooling' }
  ]

  const activeRole = experienceData[activeRoleIndex] || experienceData[0]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 sm:space-y-28"
    >

      {/* ─────────────────────────────────────────────────────────────
         ZONE 1: DECLASSIFIED EXECUTIVE IDENTITY DOSSIER
         ───────────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Top Monospace Header Stamp with Glowing Scanline */}
        <div className="relative mb-8 pb-4 border-b border-[var(--border)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-bold text-[var(--accent)]">[SYS_INIT]</span>
              <span>ENGINEERING DOSSIER // ARPAN PRAMANIK</span>
            </div>
            <div className="flex items-center gap-4">
              <span>CLEARANCE: PUBLIC</span>
              <span>INDEX: AP-2026</span>
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

        {/* 2-Column Split: Profile Matrix + Narrative (Aligned at bottom via items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Spec Sheet & Identity Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch relative overflow-hidden shadow-lg flex flex-col justify-between h-full">
              
              {/* Identity Header */}
              <div>
                <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-[var(--border)]">
                  {/* Profile Portrait Frame */}
                  <div className="relative mb-4">
                    <div className="w-28 h-32 rounded-2xl overflow-hidden border-2 border-[var(--accent)] shadow-md relative group bg-zinc-950">
                      <img
                        src="/profile.webp"
                        alt="Arpan Pramanik"
                        width={112}
                        height={128}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-[var(--text-primary)] leading-snug">
                    Arpan Pramanik
                  </h2>

                  {/* Academic Degree */}
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-1.5 font-medium">
                    B.Tech CSE (AI &amp; ML)
                  </p>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-1.5 font-mono text-xs text-[var(--text-tertiary)] mt-1">
                    <MapPin size={12} className="text-[var(--accent)] shrink-0" />
                    <span>West Bengal, India</span>
                  </div>
                </div>

                {/* Specification Table */}
                <div className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                  <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
                    <span className="text-[var(--text-tertiary)]">INSTITUTION</span>
                    <span className="font-semibold text-[var(--text-primary)] text-right">The Neotia University</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
                    <span className="text-[var(--text-tertiary)]">CORE FOCUS</span>
                    <span className="font-bold text-[var(--accent)] text-right">AI Agents &amp; Full-Stack</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]">
                    <span className="text-[var(--text-tertiary)]">DEPLOYMENTS</span>
                    <span className="font-semibold text-[var(--text-primary)] text-right">10+ Production Systems</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[var(--text-tertiary)]">RESEARCH</span>
                    <span className="font-semibold text-[var(--text-primary)] text-right">4 Conference Papers</span>
                  </div>
                </div>
              </div>

              {/* Download CV Action pinned to bottom */}
              <div className="pt-6 mt-auto">
                <a
                  href={personalInfo.resume}
                  download
                  className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-card)] transition-all card-arch cursor-pointer shadow-xs"
                >
                  <Download size={14} />
                  <span>Download Curriculum Vitae</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right: Bio Narrative & Engineering Pillars (8 cols, Aligned with Left Card) */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6 lg:space-y-0">
            
            {/* Editorial Bio */}
            <div className="space-y-4 font-body text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                ENGINEERING WITH RIGOR: AI AGENTS, RAG &amp; PRODUCTION PLATFORMS.
              </h2>
              <p>
                I am an AI/ML Engineer and Full-Stack Developer specializing in building autonomous AI agents, intelligent retrieval systems (RAG), and production-grade web platforms. My focus centers on engineering scalable deep learning architectures and high-performance software that bridge scientific research with real-world utility.
              </p>
              <p>
                From authoring <strong className="font-semibold text-[var(--text-primary)]">PaperLens AI</strong> (an autonomous academic research co-pilot with hybrid FAISS+BM25 retrieval) to deploying distributed enterprise platforms like <strong className="font-semibold text-[var(--text-primary)]">CampusSphere</strong> and explainable deep learning pipelines, I emphasize clean architecture, deterministic latencies, and visual polish.
              </p>
            </div>

            {/* 3 Core Discipline Cards (Aligned horizontally with left card bottom) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-auto">
              {[
                {
                  icon: Brain,
                  title: 'Autonomous AI Agents',
                  desc: 'ReAct agent loops, streaming citations, tool execution, and prompt compression.'
                },
                {
                  icon: Layers,
                  title: 'Grounded RAG Pipelines',
                  desc: 'In-memory BM25 + FAISS hybrid search paired with remote Supabase pgvector.'
                },
                {
                  icon: Cpu,
                  title: 'Production Full-Stack',
                  desc: 'Next.js 15, React 19, FastAPI, PostgreSQL, and distributed OpenTelemetry tracing.'
                }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch hover:border-[var(--accent)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] mb-3">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         ZONE 2: THE INTERACTIVE TOOL MATRIX (STABLE CONTAINER)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 text-[var(--accent)]">
              <span>[TECH_STACK]</span>
              <span className="w-6 h-px bg-[var(--accent)]" />
              <span>AUTHENTIC TOOL ECOSYSTEM</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
              TECHNICAL ECOSYSTEM &amp; CAPABILITIES.
            </h2>
          </div>
          {/* Active Hover Telemetry readout */}
          <div className="font-mono text-xs text-[var(--text-tertiary)] hidden sm:block">
            {hoveredSkill ? (
              <span className="text-[var(--accent)] font-semibold">
                ACTIVE: {hoveredSkill.name} • {hoveredSkill.role}
              </span>
            ) : (
              <span>HOVER OVER ANY TOOL TO INSPECT ROLE</span>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border border-[var(--border)]"
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

        {/* Stable Tool Grid Container (min-h prevents layout jumping) */}
        <div className="min-h-[220px] sm:min-h-[190px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isHovered = hoveredSkill?.name === skill.name
                const isDimmed = hoveredSkill && !isHovered

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: isDimmed ? 0.4 : 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch flex flex-col items-center text-center justify-center transition-all cursor-default relative group"
                    style={{
                      borderColor: isHovered ? 'var(--accent)' : 'var(--border)'
                    }}
                  >
                    {/* Tool Icon */}
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 overflow-hidden shrink-0">
                      {typeof skill.logo === 'string' && skill.logo.startsWith('http') ? (
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          width={28}
                          height={28}
                          loading="lazy"
                          className="w-7 h-7 object-contain transition-transform group-hover:scale-110"
                        />
                      ) : typeof skill.logo === 'string' ? (
                        <span className="text-xl">{skill.logo}</span>
                      ) : (
                        <div className="w-7 h-7 rounded bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center font-mono text-[9px] font-bold text-[var(--accent)]">
                          {skill.tag || 'AI'}
                        </div>
                      )}
                    </div>

                    {/* Tool Name */}
                    <div className="font-display font-bold text-xs text-[var(--text-primary)] truncate max-w-full">
                      {skill.name}
                    </div>

                    {/* Role Subtext */}
                    <div className="font-mono text-[10px] text-[var(--text-tertiary)] mt-0.5 truncate max-w-full">
                      {skill.role}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         ZONE 3: CHRONOLOGY & PROOF (ISOLATED PANELS, ZERO JITTER)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Pane: Professional Experience (7 cols, Isolated viewport) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 text-[var(--accent)]">
                <span>[CHRONOLOGY]</span>
                <span className="w-6 h-px bg-[var(--accent)]" />
                <span>EXPERIENCE &amp; INTERNSHIPS</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                PROFESSIONAL ROLES.
              </h2>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {experienceData.map((role, idx) => {
                const isSelected = activeRoleIndex === idx

                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRoleIndex(idx)}
                    className="p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between"
                    style={{
                      borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                      background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)'
                    }}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border border-[var(--border)] bg-[var(--bg-card)] text-[var(--accent)]">
                        0{idx + 1}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-tertiary)]">
                        {role.duration}
                      </span>
                    </div>
                    <div className="font-display font-bold text-xs text-[var(--text-primary)] truncate w-full">
                      {role.company.split('&')[0].trim()}
                    </div>
                    <div className="font-mono text-[9px] text-[var(--text-tertiary)] truncate w-full">
                      {role.title}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Dedicated Fixed-Height Role Detail Viewport (Isolated from footer & accreditation) */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch min-h-[310px] sm:min-h-[285px] flex flex-col justify-between shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[var(--border)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-[var(--accent)]" />
                        <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                          {activeRole.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
                        <Building2 size={13} className="text-[var(--accent)]" />
                        <span className="font-semibold text-[var(--text-primary)]">{activeRole.company}</span>
                        <span>•</span>
                        <span className="text-[var(--text-tertiary)]">{activeRole.location}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--accent)]">
                        {activeRole.duration} ({activeRole.period})
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {activeRole.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                      Key Deliverables &amp; Research:
                    </span>
                    <ul className="space-y-1 font-body text-xs text-[var(--text-secondary)] list-disc list-inside">
                      {activeRole.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                    {activeRole.skills.map((s, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Pane: Verified Certifications Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 text-[var(--accent)]">
                <span>[VERIFICATION]</span>
                <span className="w-6 h-px bg-[var(--accent)]" />
                <span>CREDENTIALS &amp; CERTIFICATIONS</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                ACCREDITATION.
              </h2>
            </div>

            <div className="space-y-2.5">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch hover:border-[var(--accent)] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{cert.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-[10px] text-[var(--text-tertiary)] truncate">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors shrink-0">
                    <Eye size={13} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         MODAL: CERTIFICATE IMAGE VIEWER (HIGH Z-INDEX & FIXED ACCESSIBILITY)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch overflow-hidden shadow-2xl p-5 sm:p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)] shrink-0">
                <div className="pr-4 min-w-0">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] truncate">
                    {selectedCert.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-tertiary)] truncate">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCert(null)
                  }}
                  className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all cursor-pointer shadow-xs flex items-center justify-center shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image Viewport */}
              <div className="relative max-h-[52vh] w-full rounded-xl overflow-hidden border border-[var(--border)] bg-zinc-950 flex items-center justify-center shrink-0">
                <img
                  src={selectedCert.file}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[52vh] object-contain"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='24'%3E" + encodeURIComponent(selectedCert.title) + "%3C/text%3E%3C/svg%3E"
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center font-mono text-xs shrink-0">
                <span className="text-[var(--text-tertiary)] truncate">{selectedCert.type}</span>
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold hover:underline"
                >
                  <span>Open Full Asset</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
