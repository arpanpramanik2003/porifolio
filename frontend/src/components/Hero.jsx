import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check, Terminal, Cpu, Layers, Sparkles, ChevronDown } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Hero = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedCommand, setCopiedCommand] = useState(false)

  // Section reference for Framer Motion scroll telemetry
  const heroRef = useRef(null)

  // 3D Cursor Tilt State (Card relative)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  // Scroll Progress binding inside Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  // Spring-smoothed scroll progress for liquid-smooth physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Scroll-driven transformations for the Hero container
  const heroY = useTransform(smoothProgress, [0, 1], [0, -70])
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.95])
  const heroOpacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.85, 0])

  // Parallax & 3D Spatial rotation for Telemetry Console on scroll
  const cardScrollRotateX = useTransform(smoothProgress, [0, 1], [0, 14])
  const cardScrollScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.03, 0.97])
  const cardScrollY = useTransform(smoothProgress, [0, 1], [0, -35])

  // Parallax backdrop lighting shift
  const bgGlowScale = useTransform(smoothProgress, [0, 1], [1, 1.3])
  const bgGlowOpacity = useTransform(smoothProgress, [0, 1], [0.4, 0.05])

  // Dynamic Scroll Indicator fade on scroll
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0])
  const scrollCueY = useTransform(smoothProgress, [0, 0.12], [0, 20])

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect()
    const cardWidth = card.width
    const cardHeight = card.height
    const centerX = card.left + cardWidth / 2
    const centerY = card.top + cardHeight / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Precision Cursor Tilt (-8deg to +8deg)
    const rX = (-mouseY / (cardHeight / 2)) * 8
    const rY = (mouseX / (cardWidth / 2)) * 8

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
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const stats = [
    { label: 'Academic Standing', value: '9.42 CGPA', subtext: 'The Neotia University' },
    { label: 'Engineering Projects', value: '20+ Built', subtext: 'Full-Stack & ML' },
    { label: 'Work Experience', value: '3 Roles', subtext: 'Internships' },
    { label: 'Key Innovation', value: 'PaperLens AI', subtext: 'Research Co-Pilot' }
  ]

  const stack = [
    { domain: '01. LANGUAGES', tech: 'Python • Java • JavaScript • C • SQL', role: 'Runtime Logic' },
    { domain: '02. AI SYSTEMS', tech: 'PyTorch • TensorFlow • Grad-CAM • Hugging Face', role: 'Deep Learning & XAI' },
    { domain: '03. FULL-STACK', tech: 'React.js • Next.js • FastAPI • Express.js', role: 'Reactive Web & APIs' },
    { domain: '04. CLOUD INFRA', tech: 'PostgreSQL • Supabase • AWS • Docker', role: 'Vector Store & Infra' },
    { domain: '05. MLOPS', tech: 'Git/GitHub • Linux • Postman • Vite • Vercel', role: 'CI/CD Pipelines' }
  ]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden perspective-1000"
    >
      {/* ─────────────────────────────────────────────────────────────
         PARALLAX AMBIENT GLOW BACKDROP (Scroll-responsive lighting)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          scale: bgGlowScale,
          opacity: bgGlowOpacity,
          background: 'radial-gradient(ellipse at 50% 25%, rgba(99, 102, 241, 0.15) 0%, rgba(217, 119, 6, 0.05) 45%, transparent 75%)'
        }}
      />

      {/* Subtle floating architectural grid highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
         MAIN SCROLL CONTAINER (Applies smooth Y, scale & opacity on scroll)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
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
            
            {/* Status availability badge with glowing signal */}
            <motion.div variants={itemVariants} className="mb-6">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono tracking-wide uppercase transition-all shadow-sm card-arch"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)'
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: 'var(--accent-tertiary)' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ background: 'var(--accent-tertiary)' }}
                  />
                </span>
                <span className="font-medium">Open for Full-Stack & AI Engineering Roles</span>
              </div>
            </motion.div>

            {/* Architectural Display Name with Gradient Reveal */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
                style={{ color: 'var(--text-primary)' }}
              >
                ARPAN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-[var(--accent-secondary)]">
                  PRAMANIK
                </span>
              </h1>
            </motion.div>

            {/* Engineer Identity & Statement */}
            <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
              <p
                className="font-body text-lg sm:text-xl font-normal leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Full-Stack Engineer & AI/ML Specialist building production-grade web systems, grounded LLM workflows, and intelligent software interfaces with mathematical rigor and refined user experience.
              </p>
            </motion.div>

            {/* Action Bar: CTAs & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10 w-full">
              <Link to="projects" smooth duration={500} className="cursor-pointer">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 transition-all shadow-md group"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                </motion.button>
              </Link>

              <motion.a
                href={personalInfo.resume}
                download
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 border transition-all card-arch"
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
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                    className="p-3 rounded-xl border flex items-center justify-center transition-all card-arch"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Terminal Command Snippet */}
            <motion.div variants={itemVariants} className="w-full max-w-md">
              <div
                className="flex items-center justify-between px-4 py-2.5 rounded-xl border font-mono text-xs card-arch shadow-sm"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              >
                <div className="flex items-center gap-2">
                  <Terminal size={14} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-tertiary)' }}>$</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>npx arpan-pramanik</span>
                </div>
                <button
                  onClick={copyCommand}
                  className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded border transition-all hover:border-[var(--accent)]"
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
             RIGHT COLUMN: Interactive 3D Cursor & Scroll Telemetry Console (5 Cols)
             ════════════════════════════════════════════════════ */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            
            {/* Floating Tech Pill Accents */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono shadow-md card-arch"
              style={{ background: 'var(--bg-card)', color: 'var(--accent)' }}
            >
              <Cpu size={12} />
              <span>PyTorch • XAI</span>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono shadow-md card-arch"
              style={{ background: 'var(--bg-card)', color: 'var(--accent-secondary)' }}
            >
              <Layers size={12} />
              <span>FastAPI • React</span>
            </motion.div>

            {/* Scroll + Cursor 3D Spatial Telemetry Console Wrapper */}
            <motion.div
              style={{
                rotateX: cardScrollRotateX,
                scale: cardScrollScale,
                y: cardScrollY,
                perspective: 1000,
                transformStyle: 'preserve-3d'
              }}
              className="w-full"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX, rotateY }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="rounded-2xl border shadow-xl overflow-hidden card-arch min-h-[400px] flex flex-col justify-between cursor-pointer"
              >
                {/* Terminal Window Header Bar */}
                <div
                  className="px-4 py-3 border-b flex items-center justify-between shrink-0"
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
                  <div
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ borderColor: 'var(--border)', color: 'var(--accent-tertiary)', background: 'var(--bg-primary)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-tertiary)' }} />
                    LIVE TELEMETRY
                  </div>
                </div>

                {/* Console Mode Selector Tabs */}
                <div
                  className="flex border-b font-mono text-xs overflow-x-auto scrollbar-hide shrink-0"
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

                {/* Tab Display Area */}
                <div
                  className="p-4 sm:p-5 font-mono text-xs flex-1 flex flex-col justify-between"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <div className="flex-1 flex flex-col justify-start mb-3">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-3"
                        >
                          <div className="grid grid-cols-2 gap-2.5">
                            {stats.map((s) => (
                              <div
                                key={s.label}
                                className="p-2.5 rounded-xl border card-arch transition-all hover:border-[var(--accent)]"
                                style={{ background: 'var(--bg-secondary)' }}
                              >
                                <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                                <div className="text-sm font-bold font-display mt-0.5" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                                <div className="text-[10px] mt-0.5 font-semibold" style={{ color: 'var(--accent)' }}>{s.subtext}</div>
                              </div>
                            ))}
                          </div>

                          <div
                            className="p-3 rounded-xl border font-mono text-[11px] space-y-1"
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
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-1.5"
                        >
                          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
                            ECOSYSTEM STACK (5 CORE DOMAINS)
                          </div>
                          <div className="space-y-1.5">
                            {stack.map((item) => (
                              <div
                                key={item.domain}
                                className="py-1.5 px-2.5 rounded-lg border text-[11px] flex items-center justify-between gap-2 transition-all hover:border-[var(--accent)]"
                                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                              >
                                <div className="min-w-0">
                                  <div className="font-bold text-[9px]" style={{ color: 'var(--accent)' }}>{item.domain}</div>
                                  <div className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.tech}</div>
                                </div>
                                <span
                                  className="text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0"
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
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18 }}
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

                  {/* Console System Line */}
                  <div
                    className="pt-2.5 border-t flex items-center justify-between text-[10px] shrink-0"
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
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
         SCROLL-DRIVEN DIRECTIONAL CUE & PROGRESS INDICATOR
         (Fades out gracefully as user scrolls)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: scrollCueOpacity, y: scrollCueY }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <Link to="about" smooth duration={600} className="pointer-events-auto cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase backdrop-blur-md shadow-sm card-arch"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)'
            }}
          >
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={14} style={{ color: 'var(--accent)' }} />
            </motion.span>
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
