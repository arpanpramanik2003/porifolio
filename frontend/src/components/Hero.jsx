'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Download, ArrowRight, Copy, Check, Terminal, ChevronDown, Sparkles, Brain, Layers, Cpu } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'
import { useIntro } from '../contexts/IntroContext'
import BlueprintGridCanvas from './BlueprintGridCanvas'

const glyphs = '01#*><%{}[]/@&$!~?'

const nameCycleData = [
  { text: 'অর্পন প্রামানিক', lang: 'Bengali', fontFamily: "'Noto Sans Bengali', sans-serif" },
  { text: 'अर्पन प्रामाणिक', lang: 'Hindi', fontFamily: "'Noto Sans Devanagari', sans-serif" },
  { text: 'அர்பன் பிரமாணிக்', lang: 'Tamil', fontFamily: "'Noto Sans Tamil', sans-serif" },
  { text: 'అర్పన్ ప్రామాణిక్', lang: 'Telugu', fontFamily: "'Noto Sans Telugu', sans-serif" },
  { text: 'ARPAN PRAMANIK', lang: 'English', isFinal: true }
]

// Tactile mechanical split-flap letter with hover micro-scramble
const InteractiveLetter = ({ char, isFinalEnglish }) => {
  const [displayChar, setDisplayChar] = useState(char)
  const isHoveredRef = useRef(false)

  const scramble = useCallback(() => {
    if (char === ' ' || isHoveredRef.current) return
    isHoveredRef.current = true
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayChar(glyphs[Math.floor(Math.random() * glyphs.length)])
      iteration++
      if (iteration >= 3) {
        clearInterval(interval)
        setDisplayChar(char)
        isHoveredRef.current = false
      }
    }, 40)
  }, [char])

  useEffect(() => {
    setDisplayChar(char)
  }, [char])

  if (char === ' ') {
    return <span className="inline-block w-3 sm:w-6">&nbsp;</span>
  }

  return (
    <motion.span
      onMouseEnter={isFinalEnglish ? scramble : undefined}
      whileHover={isFinalEnglish ? { y: -4, scale: 1.06 } : undefined}
      transition={{ type: 'spring', stiffness: 450, damping: 18 }}
      className="inline-block cursor-default select-none tracking-tight"
    >
      {displayChar}
    </motion.span>
  )
}

// Full interactive word composed of interactive mechanical letters
const InteractiveWord = ({ text, isFinalEnglish }) => {
  return (
    <span className="inline-flex items-center">
      {text.split('').map((c, i) => (
        <InteractiveLetter key={i} char={c} isFinalEnglish={isFinalEnglish} />
      ))}
    </span>
  )
}

// 3D Perspective Tilt Card for Floating Instrumentation HUD
const TiltMetricCard = ({ targetNum, suffix = '', label, subtext, rawText }) => {
  const [val, setVal] = useState(0)
  const cardRef = useRef(null)
  const rafId = useRef(null)

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -5
      const rotateY = ((x - centerX) / centerX) * 5
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })
  }

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-3.5 sm:p-4 rounded-xl border card-arch text-center flex flex-col items-center justify-center transition-all duration-200 backdrop-blur-md cursor-default group"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <div 
        className="text-[10px] font-mono uppercase tracking-wider mb-1 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" 
      >
        {label}
      </div>
      <div 
        className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--text-primary)] leading-tight"
      >
        {renderVal()}
      </div>
      <div 
        className="text-[10px] font-mono text-[var(--text-secondary)] mt-0.5 truncate max-w-full" 
      >
        {subtext}
      </div>
    </div>
  )
}

const Hero = ({ isIntroComplete = true }) => {
  const { hasSeenNameCycle, setHasSeenNameCycle } = useIntro()
  const [copiedCommand, setCopiedCommand] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [confettiParticles, setConfettiParticles] = useState([])
  
  // If user already experienced the name cycle in this session/refresh, start immediately at English resting state
  const [cycleIndex, setCycleIndex] = useState(() => (hasSeenNameCycle ? nameCycleData.length - 1 : 0))
  const heroRef = useRef(null)

  // Manage Multi-Language Name Cycle Timer (only runs on initial open/refresh)
  useEffect(() => {
    if (!isIntroComplete || hasSeenNameCycle) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCycleIndex(nameCycleData.length - 1)
      setHasSeenNameCycle()
      return
    }

    if (cycleIndex < nameCycleData.length - 1) {
      const timer = setTimeout(() => {
        setCycleIndex((prev) => prev + 1)
      }, 420)
      return () => clearTimeout(timer)
    } else {
      // Reached final English state — mark as seen so navigating away and returning won't replay it
      setHasSeenNameCycle()
    }
  }, [isIntroComplete, cycleIndex, hasSeenNameCycle, setHasSeenNameCycle])

  // Scroll bindings for silky parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0])

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const scrollCueY = useTransform(scrollYProgress, [0, 0.12], [0, 20])

  // Whimsical binary mini-confetti burst on copy
  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText('npx arpan-pramanik')
    setCopiedCommand(true)
    setShowToast(true)

    // Generate burst particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      char: Math.random() > 0.5 ? '1' : '0',
      x: (Math.random() - 0.5) * 80,
      y: -25 - Math.random() * 45
    }))
    setConfettiParticles(particles)

    setTimeout(() => {
      setConfettiParticles([])
    }, 700)

    setTimeout(() => {
      setCopiedCommand(false)
      setShowToast(false)
    }, 2200)
  }, [])

  // Keyboard shortcut: pressing Ctrl+C or Cmd+C in hero triggers copy delight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !window.getSelection()?.toString()) {
        copyCommand()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [copyCommand])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const stats = [
    { label: 'AI & Systems', targetNum: 10, suffix: '+ Shipped', subtext: 'Production Deployments' },
    { label: 'Engineering', targetNum: 20, suffix: '+ Built', subtext: 'Full-Stack & ML Projects' },
    { label: 'Experience', targetNum: 3, suffix: ' Roles', subtext: 'Engineering Internships' },
    { label: 'Flagship System', rawText: 'PaperLens AI', subtext: 'Autonomous Research Co-Pilot' }
  ]

  const currentLangObj = nameCycleData[cycleIndex]
  const isFinalEnglish = currentLangObj.isFinal

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* GPU-Accelerated Cursor-Reactive Blueprint Grid Background */}
      <BlueprintGridCanvas />

      {/* ─────────────────────────────────────────────────────────────
         MAIN CENTERED SCROLL CONTAINER
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto"
      >
        {/* 1. Executive Status Pill (Clean Glassmorphism with Live Emerald Pulse) */}
        <motion.div
          initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 sm:mb-5"
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/80 backdrop-blur-xl shadow-xs transition-all duration-300 hover:border-[var(--accent)] select-none cursor-default card-arch"
          >
            {/* Live Status Pulse Indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-[var(--text-secondary)] tracking-wide">
              Available for Opportunities
            </span>
            <span className="text-[var(--text-tertiary)] opacity-40 font-mono text-xs">•</span>
            <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-primary)] tracking-wide">
              AI/ML &amp; Full-Stack
            </span>
          </div>
        </motion.div>

        {/* 2. Semantic Accessible Giant H1 Container (Calibrated for all desktop viewports) */}
        <h1
          id="hero-title"
          className="mt-1 mb-3 sm:mb-4 w-full max-w-full flex justify-center items-center overflow-hidden px-2"
        >
          <span className="sr-only">
            Arpan Pramanik — AI/ML Engineer &amp; Full-Stack Developer
          </span>
          <div aria-hidden="true" className="w-full flex justify-center items-center select-none">
            <AnimatePresence mode="wait">
              {!isFinalEnglish ? (
                /* Regional Language Cycle Step (Bengali, Hindi, Tamil, Telugu) */
                <motion.div
                  key={currentLangObj.lang}
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="text-center w-full"
                >
                  <div
                    className="font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)]"
                    style={{ fontFamily: currentLangObj.fontFamily }}
                  >
                    {currentLangObj.text}
                  </div>
                </motion.div>
              ) : (
                /* Final English Resting State: Monumental Heading Perfectly Proportioned */
                <motion.div
                  key="english-final"
                  initial={{ y: -25, opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 16,
                    mass: 0.8
                  }}
                  className="font-display font-black tracking-tight leading-none uppercase text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-full text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-tertiary)]"
                  style={{
                    fontSize: 'clamp(2.2rem, 5.2vw, 4.75rem)',
                    letterSpacing: '-0.03em'
                  }}
                >
                  <InteractiveWord text="ARPAN" isFinalEnglish={true} />
                  <InteractiveWord text="PRAMANIK" isFinalEnglish={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </h1>

        {/* 3. Refined Capability Capsule Chips */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-2xl mx-auto"
        >
          {[
            { icon: Brain, label: 'Autonomous AI Agents' },
            { icon: Layers, label: 'Grounded RAG' },
            { icon: Cpu, label: 'High-Scale Systems' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)]/70 backdrop-blur-md text-[11px] sm:text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-all duration-200 card-arch cursor-default select-none shadow-xs group"
              >
                <Icon size={13} className="text-[var(--accent)] group-hover:scale-110 transition-transform duration-200 shrink-0" />
                <span className="tracking-tight font-body">{item.label}</span>
              </div>
            )
          })}
        </motion.div>

        {/* 4. Action Deck: Elastic CTA, Binary Confetti Command & Social Coordinates */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isIntroComplete ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center w-full"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 mb-5 w-full">
            {/* Primary Magnetic CTA */}
            <Link href="/projects" className="cursor-pointer">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl font-display font-bold text-xs flex items-center gap-2 transition-all shadow-md group focus-outline cursor-pointer border-none bg-[var(--text-primary)] text-[var(--bg-primary)]"
              >
                <span>Explore Selected Work</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            {/* Curriculum Vitae Download */}
            <motion.a
              href={personalInfo.resume}
              download
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2.5 rounded-xl font-display font-semibold text-xs flex items-center gap-1.5 border border-[var(--border)] transition-all card-arch focus-outline text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)]"
            >
              <Download size={14} />
              <span>Resume</span>
            </motion.a>
          </motion.div>

          {/* Terminal Command Snippet with Binary Confetti Micro-Burst */}
          <motion.div variants={itemVariants} className="w-full max-w-sm mb-6 relative">
            <div
              className="flex items-center justify-between px-3.5 py-2 rounded-xl border font-mono text-[11px] card-arch shadow-sm relative z-10"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={13} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-tertiary)' }}>$</span>
                <span className="font-semibold text-[var(--text-primary)]">npx arpan-pramanik</span>
                <span className="w-1.5 h-3 bg-[var(--accent)] animate-pulse inline-block" />
              </div>
              <button
                onClick={copyCommand}
                aria-label="Copy terminal command npx arpan-pramanik"
                className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-all hover:border-[var(--accent)] focus-outline cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                {copiedCommand ? (
                  <>
                    <Check size={11} style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--accent)' }}>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Binary Floating Confetti Particle Emitters */}
            <AnimatePresence>
              {confettiParticles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, x: p.x, y: p.y, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute top-1/2 right-12 pointer-events-none font-mono text-xs font-bold text-[var(--accent)] z-30 select-none"
                >
                  {p.char}
                </motion.span>
              ))}
            </AnimatePresence>

            {/* HUD Toast Tooltip */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -38, scale: 1 }}
                  exit={{ opacity: 0, y: -45, scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold shadow-lg z-20 pointer-events-none"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    borderColor: 'var(--border)'
                  }}
                >
                  ✓ Copied CLI command!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 5. 3D Perspective Floating Metric HUD Cards */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <TiltMetricCard
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

      {/* 6. Scroll Cue Direction Indicator */}
      <motion.div
        style={{ opacity: scrollCueOpacity, y: scrollCueY }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <Link href="/about" className="pointer-events-auto cursor-pointer">
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
            <span>EXPLORE FULL ARCHITECTURE &amp; ABOUT →</span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
