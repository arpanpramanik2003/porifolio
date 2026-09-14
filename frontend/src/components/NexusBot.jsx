'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Terminal, Activity, Wifi, Zap } from 'lucide-react'

export default function NexusBot({ activeField = null, status = '', onInjectPreset = null }) {
  const botRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isWinking, setIsWinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [customDialogue, setCustomDialogue] = useState(null)

  // Trigonometric mouse tracking
  useEffect(() => {
    let animationFrameId
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        if (!botRef.current) return
        const rect = botRef.current.getBoundingClientRect()
        const botCenterX = rect.left + rect.width / 2
        const botCenterY = rect.top + rect.height / 2

        const dx = e.clientX - botCenterX
        const dy = e.clientY - botCenterY
        const distance = Math.hypot(dx, dy)
        const angle = Math.atan2(dy, dx)

        // Clamped pupil movement (max 6px)
        const maxPupilOffset = 6
        const clampedDist = Math.min(distance / 25, maxPupilOffset)
        const pupilX = Math.cos(angle) * clampedDist
        const pupilY = Math.sin(angle) * clampedDist

        // 3D subtle chassis tilt (max 10 degrees)
        const maxTilt = 8
        const tiltX = Math.max(Math.min(-dy / 50, maxTilt), -maxTilt)
        const tiltY = Math.max(Math.min(dx / 50, maxTilt), -maxTilt)

        setEyeOffset({ x: pupilX, y: pupilY })
        setTilt({ x: tiltX, y: tiltY })
        setMousePos({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 180)
    }, 4500 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Interactive dialogue logic
  const getBotDialogue = () => {
    if (customDialogue) return customDialogue

    if (status === 'sending') {
      return {
        tag: 'DISPATCHING',
        text: 'Encrypting packet & transmitting telemetry across wire...',
        mood: 'busy'
      }
    }
    if (status === 'success') {
      return {
        tag: 'ACKNOWLEDGED',
        text: 'Transmission delivered! Arpan has received your ping.',
        mood: 'happy'
      }
    }
    if (status === 'error') {
      return {
        tag: 'HANDSHAKE ERROR',
        text: 'Telemetry packet dropped. Try WhatsApp or direct email below.',
        mood: 'alert'
      }
    }

    switch (activeField) {
      case 'name':
        return {
          tag: 'IDENT_SCAN',
          text: 'Greetings! Who is transmitting this signal?',
          mood: 'curious'
        }
      case 'email':
        return {
          tag: 'RETURN_COORDS',
          text: 'Return route locked. Arpan will direct his response here.',
          mood: 'focused'
        }
      case 'message':
        return {
          tag: 'PAYLOAD_DRAFT',
          text: 'Drafting message. Feel free to detail your project or proposal.',
          mood: 'listening'
        }
      case 'preset':
        return {
          tag: 'TEMPLATE_INJECT',
          text: 'Preset injected! Modify any specifics to match your needs.',
          mood: 'happy'
        }
      default:
        if (isHovered) {
          return {
            tag: 'NEXUS-01 ONLINE',
            text: 'I track your cursor and monitor transmission readiness.',
            mood: 'happy'
          }
        }
        return {
          tag: 'STANDBY TELEMETRY',
          text: 'Awaiting input. Select a quick preset or type directly.',
          mood: 'idle'
        }
    }
  }

  const dialogue = getBotDialogue()

  // Easter egg easter cycle on bot click
  const handleBotPoke = () => {
    setIsWinking(true)
    setTimeout(() => setIsWinking(false), 500)
    setClickCount((prev) => prev + 1)

    const funLogs = [
      { tag: 'SYS_STATUS', text: 'All circuits nominal. Ready to connect you with Arpan!', mood: 'happy' },
      { tag: 'INTEL_LOG', text: "Arpan's current focus: Autonomous AI agents & PaperLens AI.", mood: 'focused' },
      { tag: 'DIRECT_LINK', text: 'Tip: You can also reach Arpan instantly via WhatsApp on the left.', mood: 'curious' },
      { tag: 'EASTER_EGG', text: 'BEEP BOOP! You found the tactile feedback protocol.', mood: 'happy' }
    ]
    const nextLog = funLogs[clickCount % funLogs.length]
    setCustomDialogue(nextLog)
    setTimeout(() => setCustomDialogue(null), 4000)
  }

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border card-arch bg-[var(--bg-secondary)] border-[var(--border)]">
      
      {/* Interactive 3D Droid Container */}
      <div
        ref={botRef}
        onClick={handleBotPoke}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer select-none group flex-shrink-0"
        style={{ perspective: 600 }}
        title="NEXUS-01 Interactive Companion — Click to ping!"
      >
        <motion.div
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            y: [0, -3, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
            rotateX: { type: 'spring', stiffness: 200, damping: 20 },
            rotateY: { type: 'spring', stiffness: 200, damping: 20 }
          }}
          className="relative w-20 h-20 rounded-2xl border p-2 flex flex-col items-center justify-between shadow-lg transition-colors"
          style={{
            background: 'var(--bg-card)',
            borderColor: isHovered ? 'var(--text-primary)' : 'var(--border)'
          }}
        >
          {/* Antenna with Radar Ping */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <div className="w-[2px] h-2 bg-[var(--border)]" />
          </div>

          {/* Top Chassis HUD Bar */}
          <div className="w-full flex items-center justify-between px-1 text-[8px] font-mono text-[var(--text-tertiary)]">
            <span className="flex items-center gap-0.5">
              <Activity size={9} className="text-emerald-500 animate-pulse" />
              <span>NEXUS</span>
            </span>
            <span className="tracking-tighter">01</span>
          </div>

          {/* Droid Digital Visor Screen */}
          <div className="w-full h-9 rounded-xl bg-black flex items-center justify-center gap-3 px-2 border border-zinc-800 relative overflow-hidden shadow-inner">
            {/* CRT Screen Scanlines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] pointer-events-none opacity-40" />

            {/* Left Eye */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={
                  dialogue.mood === 'happy' || status === 'success'
                    ? { scaleY: 0.25, borderRadius: '4px' }
                    : isBlinking
                    ? { scaleY: 0.1 }
                    : { scaleY: 1 }
                }
                transition={{ duration: 0.1 }}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.div
                  style={{
                    x: eyeOffset.x,
                    y: eyeOffset.y
                  }}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
                />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={
                  isWinking
                    ? { scaleY: 0.15 }
                    : dialogue.mood === 'happy' || status === 'success'
                    ? { scaleY: 0.25, borderRadius: '4px' }
                    : isBlinking
                    ? { scaleY: 0.1 }
                    : { scaleY: 1 }
                }
                transition={{ duration: 0.1 }}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.div
                  style={{
                    x: eyeOffset.x,
                    y: eyeOffset.y
                  }}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
                />
              </motion.div>
            </div>
          </div>

          {/* Subtle Audio Oscilloscope Mouth Bar */}
          <div className="flex items-center gap-0.5 h-1">
            <span className="w-1 h-1 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1 bg-[var(--text-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </motion.div>

        {/* Hover Hint Ping */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
          Click to poke
        </div>
      </div>

      {/* Dynamic Telemetry Dialogue Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)]">
            <Terminal size={10} className="text-zinc-400" />
            <span>{dialogue.tag}</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
            // TELEMETRY LINK ACTIVE
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={dialogue.text}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
            className="font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)]"
          >
            {dialogue.text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Mini Ping Pulse */}
      <div className="hidden lg:flex flex-col items-end text-[10px] font-mono text-[var(--text-tertiary)] border-l pl-3 border-[var(--border)]">
        <span className="flex items-center gap-1">
          <Wifi size={11} className="text-emerald-500" />
          <span>60 FPS</span>
        </span>
        <span className="text-[9px] text-[var(--text-tertiary)]">CURSOR-LOCKED</span>
      </div>

    </div>
  )
}
