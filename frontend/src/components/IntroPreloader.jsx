import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, CheckCircle2 } from 'lucide-react'

const codeSnippets = [
  { text: 'print("Arpan Pramanik")', lang: 'Python', comment: '# Python 3.12' },
  { text: 'console.log("Arpan Pramanik");', lang: 'JavaScript', comment: '// ES2026' },
  { text: 'std::cout << "Arpan Pramanik";', lang: 'C++', comment: '// ISO C++20' },
  { text: 'System.out.println("Arpan Pramanik");', lang: 'Java', comment: '// OpenJDK 21' }
]

const glyphs = '01#*><%{}[]/@&$!~?'

const IntroPreloader = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [isWiping, setIsWiping] = useState(false)
  const intervalRef = useRef(null)

  // Skip handler (manual bypass only)
  const handleSkip = () => {
    setIsWiping(true)
    setTimeout(() => {
      onComplete()
    }, 450)
  }

  // Handle keyboard ESC key for skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Sequence compilation lines
  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }

    if (stepIndex < codeSnippets.length) {
      const targetText = codeSnippets[stepIndex].text
      let charIdx = 0

      // Quick decode/scramble loop
      intervalRef.current = setInterval(() => {
        if (charIdx <= targetText.length) {
          const locked = targetText.slice(0, charIdx)
          const scrambled = Array.from({ length: Math.min(3, targetText.length - charIdx) })
            .map(() => glyphs[Math.floor(Math.random() * glyphs.length)])
            .join('')
          setDisplayedText(locked + scrambled)
          charIdx++
        } else {
          clearInterval(intervalRef.current)
          // Hold briefly before advancing to next language
          setTimeout(() => {
            setStepIndex((prev) => prev + 1)
          }, 220)
        }
      }, 24)

      return () => clearInterval(intervalRef.current)
    } else if (stepIndex === codeSnippets.length) {
      // Build successful final state
      setDisplayedText('✓ Build successful — Arpan Pramanik')
      setIsFinished(true)

      const timer = setTimeout(() => {
        handleSkip()
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [stepIndex])

  return (
    <AnimatePresence>
      {!isWiping && (
        <motion.div
          id="intro-preloader"
          role="dialog"
          aria-label="Compiling identity intro sequence"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-6 sm:p-12 font-mono select-none overflow-hidden"
        >
          {/* Top Bar: Telemetry & Skip Button */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400 animate-pulse" />
              <span>COMPILING IDENTITY v2.6</span>
            </div>

            <button
              onClick={handleSkip}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors focus-outline cursor-pointer"
            >
              [ESC / Skip Intro]
            </button>
          </div>

          {/* Center Stage: Monospace Code Compilation Screen */}
          <div className="max-w-3xl w-full mx-auto my-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-800">
              <span>TARGET: ARPAN PRAMANIK</span>
              <span>{isFinished ? 'STATUS: READY' : `STEP 0${Math.min(stepIndex + 1, 4)} / 04`}</span>
            </div>

            {/* Active Code Display Box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 min-h-[140px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Terminal Glowing Leading Edge Cursor Bar */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mb-4">
                <span className="text-cyan-400 font-semibold">
                  {isFinished ? 'BUILD_SUCCESS' : codeSnippets[stepIndex]?.lang}
                </span>
                <span>{isFinished ? '✓ ZERO ERRORS' : codeSnippets[stepIndex]?.comment}</span>
              </div>

              <div className="font-mono text-lg sm:text-2xl font-bold tracking-tight min-h-[40px] flex items-center gap-2">
                {isFinished ? (
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 size={24} className="shrink-0 animate-bounce" />
                    <span>{displayedText}</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-zinc-400">$ </span>
                    <span className="text-white">{displayedText}</span>
                    <span className="inline-block w-2.5 h-5 bg-cyan-400 ml-1 animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Compilation Progress Bar */}
            <div className="space-y-1">
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                  animate={{
                    width: isFinished ? '100%' : `${((stepIndex + 1) / codeSnippets.length) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer Telemetry */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>FULL-STACK & AI ARCHITECT</span>
            <span>PRESS ESC TO BYPASS</span>
          </div>

          {/* Wipe Leading Edge Glow Curtain Line */}
          {isWiping && (
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 bottom-0 right-0 w-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-[10000] pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroPreloader
