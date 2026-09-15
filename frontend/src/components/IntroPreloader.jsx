'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Terminal, CornerDownRight } from 'lucide-react'

export default function IntroPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [nameRevealed, setNameRevealed] = useState(false)
  const rafRef = useRef(null)
  const timerRef = useRef(null)

  const handleSkip = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSkip()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  useEffect(() => {
    // Respect user motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    const startTime = performance.now()
    const duration = 650 // fast 650ms progress ticker

    const updateTicker = (currentTime) => {
      const elapsed = currentTime - startTime
      const rawProgress = Math.min(elapsed / duration, 1)

      // Quartic ease-out for a snappy deceleration
      const easedProgress = 1 - Math.pow(1 - rawProgress, 4)
      const currentPercent = Math.round(easedProgress * 100)

      setProgress(currentPercent)

      if (rawProgress >= 0.65 && !nameRevealed) {
        setNameRevealed(true)
      }

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(updateTicker)
      } else {
        setProgress(100)
        setNameRevealed(true)
        setIsFinished(true)

        // Hold completed state briefly (~450ms) then trigger smooth curtain exit
        timerRef.current = setTimeout(() => {
          onComplete()
        }, 450)
      }
    }

    rafRef.current = requestAnimationFrame(updateTicker)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [onComplete, nameRevealed])

  return (
    <motion.div
      key="intro-preloader"
      id="intro-preloader"
      role="dialog"
      aria-label="Editorial identity initialization sequence"
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      className="intro-mono-root"
    >
      {/* ── Precision Engineering Background Grid ── */}
      <div className="intro-mono-grid" aria-hidden="true" />
      <div className="intro-mono-vignette" aria-hidden="true" />

      {/* ── Top Bar: System Coordinates & Instant Skip ── */}
      <div className="intro-mono-topbar">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-wider text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-zinc-100 font-bold">AP//SYS.INIT</span>
          <span className="text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-500">ENGINEERING & RESEARCH ARCHIVE</span>
        </div>

        <button
          onClick={handleSkip}
          className="intro-mono-skip font-mono text-[11px] tracking-wider text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          title="Skip intro animation"
        >
          [ESC / SKIP]
        </button>
      </div>

      {/* ── Center Architectural Stage ── */}
      <div className="intro-mono-stage">
        {/* Frame with Corner Crosshairs */}
        <div className="intro-mono-frame">
          {/* Corner Registration Marks */}
          <span className="intro-crosshair top-left">+</span>
          <span className="intro-crosshair top-right">+</span>
          <span className="intro-crosshair bottom-left">+</span>
          <span className="intro-crosshair bottom-right">+</span>

          {/* Subheader Strip */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-500 border-b border-zinc-900 pb-3 tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-zinc-400" />
              <span>IDENTITY INDEX</span>
            </span>
            <span className="font-semibold text-zinc-300">
              {isFinished ? 'STATUS: ONLINE [0.00ms]' : `COMPILING: ${String(progress).padStart(3, '0')}%`}
            </span>
          </div>

          {/* Main Monogram & Typographic Identity */}
          <div className="py-6 sm:py-8 space-y-4">
            {/* Identity Reveal with Mask Slide */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: nameRevealed ? '0%' : '100%', opacity: nameRevealed ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none uppercase select-none"
              >
                ARPAN PRAMANIK
              </motion.h1>
            </div>

            {/* Subtitle Spec & Domain */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: nameRevealed ? '0%' : '100%', opacity: nameRevealed ? 1 : 0 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-zinc-400"
              >
                <CornerDownRight size={13} className="text-zinc-500 shrink-0" />
                <span className="font-semibold text-zinc-200">AI/ML ENGINEER</span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-400">RESEARCHER</span>
                <span className="text-zinc-600">//</span>
                <span className="text-zinc-500 hidden sm:inline">FULL-STACK</span>
              </motion.div>
            </div>
          </div>

          {/* High-Contrast Monochromatic Progress Hairline */}
          <div className="space-y-2 pt-2">
            <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 tracking-wider">
              <span>INITIALIZING WEIGHTS</span>
              <span className="text-zinc-300 font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Strip: Equalizer & Telemetry ── */}
      <div className="intro-mono-footer">
        <div className="flex items-center gap-1.5">
          {/* Silent Equalizer Bars */}
          {[12, 18, 10, 16].map((h, i) => (
            <span
              key={i}
              className={`w-[2px] bg-zinc-400 transition-all duration-300 ${
                isFinished ? 'h-[2px] bg-zinc-600' : 'animate-pulse'
              }`}
              style={{
                height: isFinished ? '2px' : `${h}px`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
          <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase ml-2">
            NEURAL PIPELINE {isFinished ? 'LOCKED' : 'CALIBRATING'}
          </span>
        </div>

        <div className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
          PRESS ESC TO BYPASS
        </div>
      </div>
    </motion.div>
  )
}
