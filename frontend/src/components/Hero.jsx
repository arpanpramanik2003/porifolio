import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check, Terminal, ChevronDown, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'
import SparklesCore from './SparklesCore'

const Hero = () => {
  const [copiedCommand, setCopiedCommand] = useState(false)
  const heroRef = useRef(null)

  // Scroll Progress binding inside Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  // Scroll-driven transformations for the Hero container
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0])

  // Parallax backdrop lighting shift
  const bgGlowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.05])

  // Dynamic Scroll Indicator fade on scroll
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const scrollCueY = useTransform(scrollYProgress, [0, 0.12], [0, 20])

  const copyCommand = () => {
    navigator.clipboard.writeText('npx arpan-pramanik')
    setCopiedCommand(true)
    setTimeout(() => setCopiedCommand(false), 2000)
  }

  // Character-by-Character Staggered Reveal Animation
  const firstName = "ARPAN"
  const lastName = "PRAMANIK"
  const firstChars = Array.from(firstName)
  const lastChars = Array.from(lastName)

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      filter: 'blur(12px)',
      scale: 0.85
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.65,
        delay: 0.12 + i * 0.035,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  // Container variants for components following the name
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.65
      }
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

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
         PARALLAX AMBIENT GLOW BACKDROP (Scroll-responsive lighting)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          scale: bgGlowScale,
          opacity: bgGlowOpacity,
          background: 'radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 75%)'
        }}
      />

      {/* Subtle floating architectural grid highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />


      {/* ─────────────────────────────────────────────────────────────
         MAIN CENTERED SCROLL CONTAINER (Optical Viewport Alignment)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center my-auto"
      >
        {/* Top Minimal Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 sm:mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase shadow-xs card-arch"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)'
            }}
          >
            <Sparkles size={13} style={{ color: 'var(--accent)' }} />
            <span className="font-semibold">FULL-STACK & AI ARCHITECT</span>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════
           MAIN HERO TITLE: Character-by-Character Animated Name
           Responsive: Separate lines on mobile, side-by-side on sm+
           ════════════════════════════════════════════════════ */}
        <div className="mt-2 sm:mt-4 mb-0 w-full flex justify-center items-center overflow-hidden">
          <h1 id="hero-title" className="font-display text-4xl min-[380px]:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] font-black tracking-tighter leading-[0.95] uppercase text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 select-none">
            {/* First Name: ARPAN */}
            <span className="flex items-center justify-center">
              {firstChars.map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-tertiary)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Surname: PRAMANIK */}
            <span className="flex items-center justify-center">
              {lastChars.map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  custom={firstChars.length + index}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-tertiary)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>
        {/* ════════════════════════════════════════════════════
           ACETERITY 21ST.DEV RUNNING SPARKLES & CYAN BEAM EFFECT
           (Non-blocking layout: buttons sit right under cyan line while sparkles float behind)
           ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-[40rem] max-w-full h-0 relative pointer-events-none flex flex-col items-center justify-start overflow-visible z-0 mt-2 sm:mt-3 mb-8 sm:mb-12"
        >
          {/* Cyan & Sky Highlight Glow Lines — Cleanly positioned below name text */}
          <div className="absolute inset-x-12 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[2px] w-3/4 blur-sm opacity-90 z-20" />
          <div className="absolute inset-x-12 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4 opacity-90 z-20" />
          <div className="absolute inset-x-32 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-300 to-transparent h-[5px] w-1/4 blur-sm opacity-80 z-20" />
          <div className="absolute inset-x-32 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-200 to-transparent h-px w-1/4 opacity-80 z-20" />

          {/* Masked Particle Canvas Container — Floats seamlessly behind buttons */}
          <div
            className="w-full h-36 sm:h-48 relative top-0"
            style={{
              maskImage: 'radial-gradient(350px 220px at top, white 25%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(350px 220px at top, white 25%, transparent 100%)'
            }}
          >
            <SparklesCore
              id="hero-name-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={800}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.8}
            />
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════
           SUB-COMPONENTS: Action Bar, NPX Command & Metrics Grid
           ════════════════════════════════════════════════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full"
        >
          {/* Action Bar: CTAs & Social Links (Centered) */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-8 w-full">
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
            <div className="flex items-center gap-2">
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

          {/* Terminal Command Snippet (Centered) */}
          <motion.div variants={itemVariants} className="w-full max-w-md mb-10">
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
                    <Check size={12} style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--accent)' }}>Copied</span>
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

          {/* Key Engineering Metric Pills Grid */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-4 rounded-xl border card-arch text-center flex flex-col items-center justify-center transition-all"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                <div className="text-xl sm:text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                <div className="text-[11px] font-mono font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
         SCROLL-DRIVEN DIRECTIONAL CUE
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
