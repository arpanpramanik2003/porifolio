import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check, Terminal, Cpu, Layers, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Hero = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedCommand, setCopiedCommand] = useState(false)

  // 3D Cursor Tilt State
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect()
    const cardWidth = card.width
    const cardHeight = card.height
    const centerX = card.left + cardWidth / 2
    const centerY = card.top + cardHeight / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Tilt calculations (-7deg to +7deg)
    const rX = (-mouseY / (cardHeight / 2)) * 7
    const rY = (mouseX / (cardWidth / 2)) * 7

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const copyCommand = () => {
    navigator.clipboard.writeText('npx arpan-pramanik')
    setCopiedCommand(true)
    setTimeout(() => setCopiedCommand(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const stats = [
    { label: 'Academic Standing', value: '9.42 CGPA', subtext: 'The Neotia University' },
    { label: 'Engineering Projects', value: '20+ Built', subtext: 'Full-Stack & ML' },
    { label: 'Work Experience', value: '3 Roles', subtext: 'Internships' },
    { label: 'Key Innovation', value: 'PaperLens AI', subtext: 'Research Co-Pilot' }
  ]

  // Stack data referencing the 5 domains in TECHNICAL ECOSYSTEM
  const stack = [
    { domain: '01. LANGUAGES', tech: 'Python • Java • JavaScript • C • SQL', role: 'Runtime Logic' },
    { domain: '02. AI SYSTEMS', tech: 'PyTorch • TensorFlow • Grad-CAM • Hugging Face', role: 'Deep Learning & XAI' },
    { domain: '03. FULL-STACK', tech: 'React.js • Next.js • FastAPI • Express.js', role: 'Reactive Web & APIs' },
    { domain: '04. CLOUD INFRA', tech: 'PostgreSQL • Supabase • AWS • Docker', role: 'Vector Store & Infra' },
    { domain: '05. MLOPS', tech: 'Git/GitHub • Linux • Postman • Vite • Vercel', role: 'CI/CD Pipelines' }
  ]

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* Ambient background architectural grid accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >

          {/* ════════════════════════════════════════════════════
             LEFT COLUMN: Editorial Heading & Professional Pitch (7 Cols)
             ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status availability badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wide uppercase transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)'
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent-tertiary)' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-tertiary)' }}></span>
                </span>
                <span>Open for Full-Stack & AI Engineering Opportunities</span>
              </div>
            </motion.div>

            {/* Large Architectural Display Name */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
                style={{ color: 'var(--text-primary)' }}
              >
                ARPAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-[var(--text-secondary)]">
                  PRAMANIK
                </span>
              </h1>
            </motion.div>

            {/* Engineer Identity & Value Statement */}
            <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
              <p className="font-body text-lg sm:text-xl font-normal leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Full-Stack Engineer & AI/ML Specialist building production-grade web systems, grounded LLM workflows, and intelligent software interfaces with mathematical rigor and refined user experience.
              </p>
            </motion.div>

            {/* Action Bar: CTAs & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10 w-full">
              
              <Link to="projects" smooth duration={500} className="cursor-pointer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 transition-all shadow-sm"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <motion.a
                href={personalInfo.resume}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 border transition-colors card-arch"
                style={{
                  color: 'var(--text-primary)',
                }}
              >
                <Download size={16} />
                <span>Curriculum Vitae</span>
              </motion.a>

              {/* Social Channels */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                {[
                  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: personalInfo.social.email, label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                    className="p-3 rounded-xl border flex items-center justify-center transition-colors card-arch"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>

            </motion.div>

            {/* Quick NPX Terminal Command Snippet */}
            <motion.div variants={itemVariants} className="w-full max-w-md">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border font-mono text-xs card-arch"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              >
                <div className="flex items-center gap-2">
                  <Terminal size={14} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-tertiary)' }}>$</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>npx arpan-pramanik</span>
                </div>
                <button
                  onClick={copyCommand}
                  className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded border transition-colors hover:border-[var(--accent)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  {copiedCommand ? (
                    <>
                      <Check size={12} style={{ color: 'var(--accent-tertiary)' }} />
                      <span style={{ color: 'var(--accent-tertiary)' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

          </div>

          {/* ════════════════════════════════════════════════════
             RIGHT COLUMN: Interactive 3D Cursor-Tilted Telemetry Console (5 Cols)
             ════════════════════════════════════════════════════ */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
              className="rounded-2xl border shadow-xl overflow-hidden card-arch min-h-[380px] flex flex-col justify-between cursor-pointer"
            >
              
              {/* Terminal Window Top Bar */}
              <div className="px-4 py-3 border-b flex items-center justify-between shrink-0"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    arpan@telemetry:~
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{ borderColor: 'var(--border)', color: 'var(--accent-tertiary)', background: 'var(--bg-primary)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-tertiary)' }} />
                  LIVE TELEMETRY
                </div>
              </div>

              {/* Console Mode Selector Tabs */}
              <div className="flex border-b font-mono text-xs overflow-x-auto scrollbar-hide shrink-0"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}
              >
                {[
                  { id: 'overview', label: '01. Overview', icon: Cpu },
                  { id: 'architecture', label: '02. Stack', icon: Layers },
                  { id: 'focus', label: '03. Focus', icon: Sparkles }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="flex-1 min-w-[110px] py-2.5 px-3 flex items-center justify-center gap-2 border-r transition-colors relative"
                    style={{
                      borderColor: 'var(--border)',
                      color: activeTab === id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      background: activeTab === id ? 'var(--bg-card)' : 'transparent'
                    }}
                  >
                    <Icon size={13} style={{ color: activeTab === id ? 'var(--accent)' : 'inherit' }} />
                    <span className="font-medium">{label}</span>
                    {activeTab === id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Flex-1 Tab Display: Utilizes 100% of vertical space with zero wasted dark gaps */}
              <div className="p-4 sm:p-5 font-mono text-xs flex-1 flex flex-col justify-between"
                style={{ background: 'var(--bg-card)' }}
              >
                <div className="flex-1 flex flex-col justify-start mb-3">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2.5"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {stats.map((s) => (
                            <div key={s.label} className="p-2 rounded-xl border card-arch" style={{ background: 'var(--bg-secondary)' }}>
                              <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                              <div className="text-sm font-bold font-display mt-0.5" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                              <div className="text-[10px] mt-0.5" style={{ color: 'var(--accent)' }}>{s.subtext}</div>
                            </div>
                          ))}
                        </div>

                        <div className="p-2.5 rounded-xl border font-mono text-[11px] space-y-1"
                          style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}
                        >
                          <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                            <span>CURRENT STATUS</span>
                            <span style={{ color: 'var(--accent-tertiary)' }}>ACTIVE DEPLOYMENT</span>
                          </div>
                          <div className="font-semibold text-xs leading-tight" style={{ color: 'var(--text-primary)' }}>
                            Building PaperLens AI & Advanced Web Workflows
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'architecture' && (
                      <motion.div
                        key="architecture"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-1.5"
                      >
                        <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                          ECOSYSTEM STACK (5 CORE DOMAINS)
                        </div>
                        <div className="space-y-1.5">
                          {stack.map((item) => (
                            <div key={item.domain} className="py-1.5 px-2.5 rounded-lg border text-[11px] flex items-center justify-between gap-2"
                              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-[9px]" style={{ color: 'var(--accent)' }}>{item.domain}</div>
                                <div className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.tech}</div>
                              </div>
                              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0"
                                style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)' }}
                              >
                                {item.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'focus' && (
                      <motion.div
                        key="focus"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2.5"
                      >
                        <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                          R&D INITIATIVES & CORE FOCUS
                        </div>
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl border space-y-1" style={{ background: 'var(--bg-secondary)' }}>
                            <div className="font-semibold text-xs" style={{ color: 'var(--accent)' }}>01. Hybrid RAG & Vector Retrieval</div>
                            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              Combining FAISS, BM25, and CrossEncoder reranking for grounded scientific paper QA.
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl border space-y-1" style={{ background: 'var(--bg-secondary)' }}>
                            <div className="font-semibold text-xs" style={{ color: 'var(--accent-secondary)' }}>02. Scalable Web Architectures</div>
                            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              End-to-end full-stack applications built with Next.js, FastAPI, PostgreSQL, and Clerk auth.
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Console Bottom System Line */}
                <div className="pt-2.5 border-t flex items-center justify-between text-[10px] shrink-0"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span>SYSTEM ID: TNU-CSE-2027</span>
                  </div>
                  <span>LOCATION: W.B., INDIA</span>
                </div>

              </div>

            </motion.div>
          </motion.div>

        </motion.div>
      </div>

    </section>
  )
}

export default Hero
