'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  MapPin, 
  ShieldCheck, 
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
  ChevronRight
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

  // Category Tabs
  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'ai-engineering', label: 'AI & Neural Nets' },
    { id: 'full-stack', label: 'Full-Stack & APIs' },
    { id: 'data-cloud', label: 'Data & Cloud' },
    { id: 'languages', label: 'Languages' },
    { id: 'workflow-mlops', label: 'MLOps & Tooling' }
  ]

  const activeRole = experienceData[activeRoleIndex] || experienceData[0]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 sm:space-y-28">

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

        {/* 2-Column Split: Profile Matrix + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Hologram Card & Spec Sheet (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch relative overflow-hidden shadow-lg">
              {/* Executive Identity Badge Header */}
              <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-[var(--border)]">
                {/* Verified Pill */}
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--accent)] font-bold mb-4 shadow-2xs">
                  <ShieldCheck size={12} className="text-[var(--accent)]" />
                  <span>VERIFIED ENGINEER</span>
                </div>

                {/* Profile Portrait with Status Beacon */}
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
                  {/* Online Status Beacon */}
                  <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black"></span>
                  </span>
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

              {/* Download CV Action */}
              <div className="pt-6">
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

          {/* Right: Bio Narrative & Engineering Pillars (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
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

            {/* 3 Core Discipline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
                    className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch hover:border-[var(--accent)] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] mb-3">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-display font-bold text-sm text-[var(--text-primary)] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
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
         ZONE 2: THE INTERACTIVE TOOL MATRIX (TOOL ANIMATED)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 text-[var(--accent)]">
              <span>[TECH_STACK]</span>
              <span className="w-6 h-px bg-[var(--accent)]" />
              <span>INTERACTIVE TOOL CONSTELLATION</span>
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

        {/* Category Filter Pills with Spring Physics Highlight */}
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

        {/* Animated Tool Grid with Lensing Effect */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isHovered = hoveredSkill?.name === skill.name
              const isDimmed = hoveredSkill && !isHovered

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isDimmed ? 0.4 : 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ y: -4, scale: 1.04 }}
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
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         ZONE 3: CHRONOLOGY & PROOF (EXPERIENCE + CREDENTIALS DUAL VIEW)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Pane: Professional Experience Timeline (7 cols) */}
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

            {/* Role Tab Selector */}
            <div className="space-y-3">
              {experienceData.map((role, idx) => {
                const isSelected = activeRoleIndex === idx

                return (
                  <div
                    key={role.id}
                    onClick={() => setActiveRoleIndex(idx)}
                    className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                      background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-card)] text-[var(--accent)]">
                          0{idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                          {role.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-[var(--text-tertiary)] shrink-0">
                        {role.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] mb-3">
                      <Building2 size={13} className="text-[var(--accent)]" />
                      <span>{role.company}</span>
                      <span>•</span>
                      <span className="text-[var(--text-tertiary)]">{role.location}</span>
                    </div>

                    {/* Expandable Highlight Details */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 border-t border-[var(--border)] space-y-2 font-body text-xs text-[var(--text-secondary)]"
                      >
                        <p className="leading-relaxed mb-3">{role.description}</p>
                        <ul className="space-y-1.5 list-disc list-inside">
                          {role.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {role.skills.map((s, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}
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

            <div className="space-y-3">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] card-arch hover:border-[var(--accent)] transition-all cursor-pointer flex items-center justify-between gap-3 group"
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
         MODAL: CERTIFICATE IMAGE VIEWER
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] card-arch overflow-hidden shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {selectedCert.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-tertiary)]">
                    {selectedCert.issuer} • {selectedCert.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[var(--border)] bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedCert.file}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='24'%3E" + encodeURIComponent(selectedCert.title) + "%3C/text%3E%3C/svg%3E"
                  }}
                />
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-between items-center font-mono text-xs">
                <span className="text-[var(--text-tertiary)]">{selectedCert.type}</span>
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--accent)] font-semibold hover:underline"
                >
                  <span>Open Full Asset</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
