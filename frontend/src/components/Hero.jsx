'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check, Terminal, ChevronDown, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'
import BlueprintGridCanvas from './BlueprintGridCanvas'

const glyphs = '01#*><%{}[]/@&$!~?'

const nameCycleData = [
  { text: 'অর্পন প্রামানিক', lang: 'Bengali', fontFamily: "'Noto Sans Bengali', sans-serif" },
  { text: 'अर्पन प्रामाणिक', lang: 'Hindi', fontFamily: "'Noto Sans Devanagari', sans-serif" },
  { text: 'அர்பன் பிரமாணிக்', lang: 'Tamil', fontFamily: "'Noto Sans Tamil', sans-serif" },
  { text: 'అర్పన్ ప్రామాణిక్', lang: 'Telugu', fontFamily: "'Noto Sans Telugu', sans-serif" },
  { text: 'ARPAN PRAMANIK', lang: 'English', isFinal: true }
]

const ScrambleText = ({ text, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text)
      return
    }

    const timer = setTimeout(() => {
      let iteration = 0
      const maxIterations = text.length * 3
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration / 3) return text[index]
              if (char === ' ') return ' '
              return glyphs[Math.floor(Math.random() * glyphs.length)]
            })
            .join('')
        )

        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
        }
        iteration += 1
      }, 25)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return <span className={className}>{displayText}</span>
}

const CountUpStat = ({ targetNum, suffix = '', label, subtext, rawText }) => {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (targetNum === null || targetNum === undefined) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(targetNum)
      return
    }

    let start = 0
    const duration = 1200
    const stepTime = 30
    const steps = duration / stepTime
    const increment = targetNum / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= targetNum) {
        setVal(targetNum)
        clearInterval(timer)
      } else {
        setVal(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [targetNum])

  const renderVal = () => {
    if (rawText) return rawText
    if (targetNum !== undefined && targetNum !== null) {
      return Number.isInteger(targetNum)
        ? `${Math.round(val)}${suffix}`
        : `${val.toFixed(2)}${suffix}`
    }
    return ''
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className="p-4 rounded-xl border card-arch text-center flex flex-col items-center justify-center transition-all cursor-default"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>
        {label}
      </div>
      <div className="text-xl sm:text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
        {renderVal()}
      </div>
      <div className="text-[11px] font-mono font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        {subtext}
      </div>
    </motion.div>
  )
}

const Hero = ({ isIntroComplete = true }) => {
  const [copiedCommand, setCopiedCommand] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [cycleIndex, setCycleIndex] = useState(0)
  const heroRef = useRef(null)

  // Manage Multi-Language Name Cycle Timer
  useEffect(() => {
    if (!isIntroComplete) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCycleIndex(nameCycleData.length - 1)
      return
    }

    if (cycleIndex < nameCycleData.length - 1) {
      const timer = setTimeout(() => {
        setCycleIndex((prev) => prev + 1)
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [isIntroComplete, cycleIndex])

  // Scroll bindings
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0])

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const scrollCueY = useTransform(scrollYProgress, [0, 0.12], [0, 20])

  const copyCommand = () => {
    navigator.clipboard.writeText('npx arpan-pramanik')
    setCopiedCommand(true)
    setShowToast(true)
    setTimeout(() => {
      setCopiedCommand(false)
      setShowToast(false)
    }, 2200)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    { label: 'Academic Standing', targetNum: 9.42, suffix: ' CGPA', subtext: 'The Neotia University' },
    { label: 'Engineering Projects', targetNum: 20, suffix: '+ Built', subtext: 'Full-Stack & ML' },
    { label: 'Work Experience', targetNum: 3, suffix: ' Roles', subtext: 'Internships' },
    { label: 'Key Innovation', rawText: 'PaperLens AI', subtext: 'Research Co-Pilot' }
  ]

  const currentLangObj = nameCycleData[cycleIndex]
  const isFinalEnglish = currentLangObj.isFinal

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* GPU-Accelerated Cursor-Reactive Blueprint Grid Background */}
      <BlueprintGridCanvas />

      {/* ─────────────────────────────────────────────────────────────
         MAIN CENTERED SCROLL CONTAINER
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

        {/* Static Accessible H1 for Search Engines (Bing, Google) & Screen Readers */}
        <h1 id="hero-title" className="sr-only">
          Arpan Pramanik — Full-Stack Developer &amp; AI/ML Engineer
        </h1>

        {/* ════════════════════════════════════════════════════
           MULTI-LANGUAGE NAME CYCLE & DROP-IN REVEAL HEADLINE (Visual Layer)
           ════════════════════════════════════════════════════ */}
        <div aria-hidden="true" className="mt-2 sm:mt-4 mb-6 sm:mb-10 w-full flex justify-center items-center min-h-[120px] sm:min-h-[180px] overflow-hidden select-none">
          <AnimatePresence mode="wait">
            {!isFinalEnglish ? (
              /* Regional Language Cycle Step (Bengali, Hindi, Tamil, Telugu) */
              <motion.div
                key={currentLangObj.lang}
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="text-center"
              >
                <div
                  className="font-black text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-tertiary)]"
                  style={{ fontFamily: currentLangObj.fontFamily }}
                >
                  {currentLangObj.text}
                </div>
              </motion.div>
            ) : (
              /* Final English Resting State: Drop-In Fall from Above + Scramble Lock */
              <motion.div
                key="english-final"
                initial={{ y: -50, opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 130,
                  damping: 15,
                  mass: 0.8
                }}
                className="font-display text-4xl min-[380px]:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-black tracking-tighter leading-[0.95] uppercase text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6"
              >
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-tertiary)]">
                  <ScrambleText text="ARPAN" delay={50} />
                </span>
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--accent-secondary)] to-[var(--text-tertiary)]">
                  <ScrambleText text="PRAMANIK" delay={200} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════
           SUB-COMPONENTS: Action Bar, NPX Command & Metrics Grid
           ════════════════════════════════════════════════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isIntroComplete ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Action Bar: CTAs & Social Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-8 w-full">
            <Link to="projects" smooth duration={500} className="cursor-pointer">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 transition-all shadow-md group focus-outline"
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
              className="px-6 py-3.5 rounded-xl font-display font-semibold text-sm flex items-center gap-2.5 border transition-all card-arch focus-outline"
              style={{
                color: 'var(--text-primary)'
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
                  aria-label={label}
                  className="p-3 rounded-xl border flex items-center justify-center transition-all card-arch focus-outline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Terminal Command Snippet with Blinking Caret & Toast Confirmation */}
          <motion.div variants={itemVariants} className="w-full max-w-md mb-10 relative">
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-xl border font-mono text-xs card-arch shadow-sm relative z-10"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-tertiary)' }}>$</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>npx arpan-pramanik</span>
                <span className="w-2 h-4 bg-[var(--accent)] animate-pulse inline-block" />
              </div>
              <button
                onClick={copyCommand}
                aria-label="Copy terminal command npx arpan-pramanik"
                className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded border transition-all hover:border-[var(--accent)] focus-outline cursor-pointer"
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

            {/* Toast Tooltip Confirmation */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold shadow-lg z-20 pointer-events-none"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    borderColor: 'var(--border)'
                  }}
                >
                  ✓ Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Key Engineering Metric Cards (Count-Up Numbers) */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <CountUpStat
                key={s.label}
                targetNum={s.targetNum}
                suffix={s.suffix}
                rawText={s.rawText}
                label={s.label}
                subtext={s.subtext}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Cue Direction Indicator */}
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
