'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const codeSnippets = [
  { text: 'print("Arpan Pramanik")', lang: 'Python', comment: '# Python 3.12' },
  { text: 'console.log("Arpan Pramanik");', lang: 'JavaScript', comment: '// ES2026' },
  { text: 'std::cout << "Arpan Pramanik";', lang: 'C++', comment: '// ISO C++20' },
  { text: 'System.out.println("Arpan Pramanik");', lang: 'Java', comment: '// OpenJDK 21' }
]

const glyphs = '01#*><{}[]/@&$!~?=+'
const particleChars = ['0', '1', '{', '}', '<', '>', '/', '*', '#', '&']

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    char: particleChars[i % particleChars.length],
    left: `${(i * 7.3 + 13) % 100}%`,
    duration: 5 + (i % 4) * 2,
    delay: (i * 0.8) % 5,
    fontSize: 10 + (i % 3) * 2
  }))

const IntroPreloader = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [charStates, setCharStates] = useState([])
  const [isFinished, setIsFinished] = useState(false)
  const rafRef = useRef(null)
  const timerRef = useRef(null)
  const particles = useMemo(() => generateParticles(14), [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSkip = useCallback(() => {
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
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    if (stepIndex < codeSnippets.length) {
      const targetText = codeSnippets[stepIndex].text
      const totalChars = targetText.length
      const scrambleWindow = Math.min(5, totalChars)
      let lockedCount = 0
      let lastFrameTime = 0

      // Balanced frame interval for optimal readability (24ms -> 14ms)
      const getFrameInterval = () => {
        const progress = lockedCount / totalChars
        return 24 - progress * 10
      }

      const animate = (timestamp) => {
        if (!lastFrameTime) lastFrameTime = timestamp
        const elapsed = timestamp - lastFrameTime

        if (elapsed >= getFrameInterval()) {
          lastFrameTime = timestamp

          if (lockedCount <= totalChars) {
            const states = []
            for (let i = 0; i < totalChars; i++) {
              if (i < lockedCount) {
                states.push({ char: targetText[i], locked: true })
              } else if (i < lockedCount + scrambleWindow) {
                states.push({
                  char: glyphs[Math.floor(Math.random() * glyphs.length)],
                  locked: false
                })
              }
            }
            setCharStates(states)
            lockedCount++
          } else {
            // Balanced pause (160ms) for pleasant pacing between languages
            timerRef.current = setTimeout(() => {
              setStepIndex((prev) => prev + 1)
            }, 160)
            return
          }
        }

        rafRef.current = requestAnimationFrame(animate)
      }

      rafRef.current = requestAnimationFrame(animate)

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    } else if (stepIndex === codeSnippets.length) {
      setIsFinished(true)

      // Hold success state (750ms) so user can comfortably view completion before upward slide
      timerRef.current = setTimeout(() => {
        onComplete()
      }, 750)

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [stepIndex, onComplete])

  return (
    <motion.div
      key="intro-preloader"
      id="intro-preloader"
      role="dialog"
      aria-label="Compiling identity intro sequence"
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      className="intro-root"
    >
      {/* ── Background Layers ── */}
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-scanline" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />

      {/* ── Floating Particles ── */}
      <div className="intro-particles" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="intro-particle"
            style={{
              left: p.left,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              fontSize: `${p.fontSize}px`
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* ── Top Bar ── */}
      <div className="intro-topbar">
        <div className="intro-topbar-left">
          <Terminal size={14} className="intro-topbar-icon" />
          <span>COMPILING IDENTITY v2.6</span>
        </div>
        <button onClick={handleSkip} className="intro-skip">
          [ESC / Skip Intro]
        </button>
      </div>

      {/* ── Center Stage ── */}
      <div className="intro-stage">
        {/* Status Row */}
        <div className="intro-status-row">
          <span>TARGET: ARPAN PRAMANIK</span>
          <span>
            {isFinished
              ? 'STATUS: ONLINE [0.00ms]'
              : `STEP 0${Math.min(stepIndex + 1, 4)} / 04`}
          </span>
        </div>

        {/* Terminal Box */}
        <div className={`intro-terminal${isFinished ? ' is-finished' : ''}`}>
          {/* Leading Edge */}
          <div className="intro-edge" />

          {/* Header */}
          <div className="intro-terminal-header">
            <span className="intro-lang-tag">
              {isFinished ? 'EXECUTION_COMPLETE' : codeSnippets[stepIndex]?.lang}
            </span>
            <span className="intro-comment-tag">
              {isFinished ? '// ZERO_ERRORS' : codeSnippets[stepIndex]?.comment}
            </span>
          </div>

          {/* Code Display */}
          <div className="intro-code-display">
            {isFinished ? (
              <div className="intro-success-wrapper">
                <span className="intro-pulse-dot" />
                <span className="intro-success-tag">SYSTEM_READY</span>
                <span className="intro-success-divider">//</span>
                <span className="intro-success-name">ARPAN PRAMANIK</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="intro-prompt">$ </span>
                <span>
                  {charStates.map((s, i) => (
                    <span
                      key={i}
                      className={
                        s.locked ? 'intro-char-locked' : 'intro-char-scramble'
                      }
                    >
                      {s.char}
                    </span>
                  ))}
                </span>
                <span className="intro-cursor" />
              </div>
            )}
          </div>
        </div>

        {/* Segment Progress */}
        <div className="intro-segments">
          {codeSnippets.map((_, i) => (
            <div key={i} className="intro-segment">
              <div
                className={`intro-segment-fill${
                  isFinished
                    ? ' complete'
                    : i <= stepIndex
                    ? ' active'
                    : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Footer ── */}
      <div className="intro-footer">
        <span>FULL-STACK & AI ARCHITECT</span>
        <span>PRESS ESC TO BYPASS</span>
      </div>
    </motion.div>
  )
}

export default IntroPreloader
