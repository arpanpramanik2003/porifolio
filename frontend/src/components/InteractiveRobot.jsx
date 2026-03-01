import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

// ─── Sparkle particle component ───
const Sparkle = ({ delay, x, y }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: x,
      top: y,
      background: `radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(99,102,241,0.6) 100%)`,
      boxShadow: '0 0 6px 2px rgba(251,191,36,0.5)',
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1, 0],
      y: [0, -30 - Math.random() * 30],
      x: [0, (Math.random() - 0.5) * 40],
    }}
    transition={{
      duration: 1.2 + Math.random() * 0.6,
      delay,
      ease: 'easeOut',
    }}
  />
)

// ─── Messages the robot can say ───
const MESSAGES = [
  "Hey there! 👋",
  "Welcome!  ✨",
  "Click me! 🤖",
  "Nice to see you!",
  "Let's explore! 🚀",
  "I'm Pixel! 💜",
  "Have fun! 🎉",
  "You're awesome! 🌟",
]

const InteractiveRobot = () => {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [headTilt, setHeadTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [bodyLean, setBodyLean] = useState(0)
  const [isWaving, setIsWaving] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [clickCount, setClickCount] = useState(0)
  const [expression, setExpression] = useState('happy') // happy, excited, love, surprised
  const robotRef = useRef(null)
  const blinkTimerRef = useRef(null)
  const messageTimerRef = useRef(null)

  // ─── Eye tracking: follows cursor with clamped offset ───
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!robotRef.current) return
      const rect = robotRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxEye = 4
      const eyeX = (dx / Math.max(dist, 1)) * Math.min(dist / 40, maxEye)
      const eyeY = (dy / Math.max(dist, 1)) * Math.min(dist / 40, maxEye)
      setEyeOffset({ x: eyeX, y: eyeY })

      // 3D head tilt towards cursor
      const maxTilt = 12
      const tiltY = Math.max(-maxTilt, Math.min(maxTilt, (dx / window.innerWidth) * maxTilt * 2))
      const tiltX = Math.max(-maxTilt / 2, Math.min(maxTilt / 2, -(dy / window.innerHeight) * maxTilt))
      setHeadTilt({ rotateX: tiltX, rotateY: tiltY })

      // Subtle body lean
      setBodyLean(tiltY * 0.15)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ─── Random blink every 2-5 seconds ───
  useEffect(() => {
    const scheduleBlink = () => {
      blinkTimerRef.current = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
        scheduleBlink()
      }, 2000 + Math.random() * 3000)
    }
    scheduleBlink()
    return () => clearTimeout(blinkTimerRef.current)
  }, [])

  // ─── Auto-show message periodically ───
  useEffect(() => {
    const scheduleMessage = () => {
      messageTimerRef.current = setTimeout(() => {
        setCurrentMessage(prev => (prev + 1) % MESSAGES.length)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 3000)
        scheduleMessage()
      }, 8000 + Math.random() * 5000)
    }
    // Show first message after 3s
    const initialTimer = setTimeout(() => {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
      scheduleMessage()
    }, 3000)
    return () => {
      clearTimeout(messageTimerRef.current)
      clearTimeout(initialTimer)
    }
  }, [])

  // ─── Spawn sparkles on click ───
  const spawnSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 60,
      y: 20 + Math.random() * 80,
      delay: Math.random() * 0.3,
    }))
    setSparkles(prev => [...prev, ...newSparkles])
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)))
    }, 2500)
  }, [])

  // ─── Click handler: wave + sparkles + expression change ───
  const handleClick = useCallback(() => {
    setIsWaving(true)
    spawnSparkles()
    setClickCount(prev => prev + 1)

    // Cycle expressions
    const expressions = ['happy', 'excited', 'love', 'surprised']
    setExpression(expressions[(clickCount + 1) % expressions.length])

    // Show message
    setCurrentMessage(prev => (prev + 1) % MESSAGES.length)
    setShowMessage(true)

    setTimeout(() => setIsWaving(false), 1800)
    setTimeout(() => setShowMessage(false), 3000)
    setTimeout(() => setExpression('happy'), 4000)
  }, [clickCount, spawnSparkles])

  // ─── Expression-based mouth path ───
  const mouthPath = useMemo(() => {
    switch (expression) {
      case 'excited':
        return 'M 40 48 Q 50 56 60 48' // Big smile
      case 'love':
        return 'M 42 48 Q 50 54 58 48' // Sweet smile
      case 'surprised':
        return 'M 46 50 Q 50 46 54 50 Q 50 54 46 50' // 'O' shape
      default:
        return 'M 42 47 Q 50 53 58 47' // Normal smile
    }
  }, [expression])

  // ─── Expression-based eye extra ───
  const renderExpressionExtra = useMemo(() => {
    if (expression === 'love') {
      return (
        <>
          {/* Heart eyes */}
          <motion.text
            x={41 + eyeOffset.x}
            y={40 + eyeOffset.y}
            textAnchor="middle"
            fontSize="8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            ❤️
          </motion.text>
          <motion.text
            x={59 + eyeOffset.x}
            y={40 + eyeOffset.y}
            textAnchor="middle"
            fontSize="8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, delay: 0.05 }}
          >
            ❤️
          </motion.text>
        </>
      )
    }
    if (expression === 'surprised') {
      return null // wider eyes handled by radius
    }
    return null
  }, [expression, eyeOffset])

  const eyeRadius = expression === 'surprised' ? 4.5 : 3.5
  const pupilRadius = expression === 'surprised' ? 2.2 : 1.8

  return (
    <div
      ref={robotRef}
      className="fixed bottom-6 left-6 z-40 cursor-pointer select-none"
      style={{ perspective: '600px' }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── Speech Bubble ─── */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap z-50"
          >
            <div
              className="relative px-4 py-2 rounded-2xl text-xs font-bold shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(99,102,241,0.4), 0 0 40px rgba(139,92,246,0.2)',
              }}
            >
              {MESSAGES[currentMessage]}
              {/* Speech bubble tail */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '8px solid #7c3aed',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Sparkles ─── */}
      {sparkles.map(s => (
        <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
      ))}

      {/* ─── Ground Shadow ─── */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 80,
          height: 12,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }}
        animate={{
          scaleX: [1, 0.9, 1],
          opacity: [0.4, 0.25, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── Main Robot Container with 3D + Float ─── */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateZ: bodyLean,
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { type: 'spring', stiffness: 100, damping: 20 },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-36 h-44"
        style={{
          transformStyle: 'preserve-3d',
          filter: isHovered
            ? 'drop-shadow(0 0 20px rgba(99,102,241,0.6)) drop-shadow(0 8px 25px rgba(0,0,0,0.3))'
            : 'drop-shadow(0 0 10px rgba(99,102,241,0.3)) drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
          transition: 'filter 0.3s ease',
        }}
      >
        <svg
          viewBox="0 0 100 140"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Body gradient */}
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            {/* 3D Head gradient */}
            <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="35%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            {/* Face screen gradient */}
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
            {/* Chest panel gradient */}
            <linearGradient id="chestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            {/* Gold gradient for accents */}
            <radialGradient id="goldGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            {/* Antenna glow */}
            <radialGradient id="antennaGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            {/* Eye glow */}
            <radialGradient id="eyeGlow" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fbbf24" />
            </radialGradient>
            {/* Body shadow */}
            <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feOffset dx="2" dy="2" result="offsetBlur" />
              <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
            </filter>
            {/* Overall glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Chest light glow */}
            <filter id="chestGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ════════ BODY ════════ */}
          <motion.g
            animate={{ rotate: bodyLean * 0.2 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            style={{ transformOrigin: '50px 85px' }}
          >
            {/* Body main */}
            <rect x="25" y="62" width="50" height="48" rx="10" fill="url(#bodyGrad)" />
            {/* Body highlight (3D shine) */}
            <rect x="27" y="64" width="22" height="44" rx="8" fill="rgba(255,255,255,0.08)" />
            {/* Body bottom edge (3D depth) */}
            <rect x="25" y="100" width="50" height="10" rx="5" fill="rgba(0,0,0,0.15)" />

            {/* Chest panel */}
            <rect x="33" y="70" width="34" height="28" rx="6" fill="url(#chestGrad)" stroke="#6366f1" strokeWidth="0.5" />
            {/* Chest panel inner shine */}
            <rect x="35" y="72" width="14" height="24" rx="4" fill="rgba(255,255,255,0.05)" />

            {/* Chest light with glow */}
            <motion.circle
              cx="50"
              cy="84"
              r="4"
              fill="url(#goldGlow)"
              filter="url(#chestGlow)"
              animate={{
                r: [4, 4.8, 4],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Chest detail lines */}
            <line x1="40" y1="92" x2="48" y2="92" stroke="#818cf8" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <line x1="52" y1="92" x2="60" y2="92" stroke="#818cf8" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <line x1="42" y1="95" x2="58" y2="95" stroke="#818cf8" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />

            {/* ════════ LEGS ════════ */}
            {/* Left leg */}
            <motion.g
              animate={{ rotate: isWaving ? [0, -3, 3, 0] : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ transformOrigin: '35px 110px' }}
            >
              <rect x="31" y="110" width="11" height="22" rx="5.5" fill="url(#bodyGrad)" />
              <rect x="31" y="110" width="5" height="18" rx="3" fill="rgba(255,255,255,0.07)" />
              {/* Left foot */}
              <rect x="28" y="130" width="16" height="7" rx="3.5" fill="url(#goldGlow)" />
              <rect x="28" y="130" width="8" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            </motion.g>

            {/* Right leg */}
            <motion.g
              animate={{ rotate: isWaving ? [0, 3, -3, 0] : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ transformOrigin: '65px 110px' }}
            >
              <rect x="58" y="110" width="11" height="22" rx="5.5" fill="url(#bodyGrad)" />
              <rect x="58" y="110" width="5" height="18" rx="3" fill="rgba(255,255,255,0.07)" />
              {/* Right foot */}
              <rect x="56" y="130" width="16" height="7" rx="3.5" fill="url(#goldGlow)" />
              <rect x="56" y="130" width="8" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
            </motion.g>

            {/* ════════ LEFT ARM ════════ */}
            <motion.g
              animate={{
                rotate: isHovered ? -8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              style={{ transformOrigin: '22px 68px' }}
            >
              <rect x="12" y="68" width="13" height="32" rx="6.5" fill="url(#bodyGrad)" />
              <rect x="12" y="68" width="6" height="28" rx="3" fill="rgba(255,255,255,0.07)" />
              {/* Left hand */}
              <circle cx="18.5" cy="103" r="6.5" fill="url(#goldGlow)" />
              <circle cx="16" cy="101" r="2" fill="rgba(255,255,255,0.2)" />
            </motion.g>

          </motion.g>

          {/* ════════ RIGHT ARM (STATIC) ════════ */}
          <g>
            <rect x="75" y="68" width="13" height="32" rx="6.5" fill="url(#bodyGrad)" />
            <rect x="75" y="68" width="6" height="28" rx="3" fill="rgba(255,255,255,0.07)" />
            <circle cx="81.5" cy="103" r="6.5" fill="url(#goldGlow)" />
            <circle cx="79" cy="101" r="2" fill="rgba(255,255,255,0.2)" />
          </g>

          {/* ════════ HEAD (3D tilt) ════════ */}
          <motion.g
            animate={{
              rotate: headTilt.rotateY * 0.3,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{ transformOrigin: '50px 55px' }}
          >
            {/* Neck connector */}
            <rect x="42" y="55" width="16" height="10" rx="3" fill="#4f46e5" />

            {/* Head main */}
            <rect x="28" y="18" width="44" height="40" rx="10" fill="url(#headGrad)" />
            {/* Head highlight (3D shine) */}
            <rect x="30" y="20" width="18" height="34" rx="8" fill="rgba(255,255,255,0.1)" />
            {/* Head bottom edge */}
            <rect x="28" y="48" width="44" height="10" rx="5" fill="rgba(0,0,0,0.1)" />

            {/* Face screen */}
            <rect x="33" y="23" width="34" height="30" rx="7" fill="url(#faceGrad)" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8" />
            {/* Screen reflection */}
            <rect x="35" y="25" width="12" height="8" rx="4" fill="rgba(255,255,255,0.25)" />

            {/* ───── EYES ───── */}
            {expression !== 'love' && (
              <>
                {/* Left eye white */}
                <motion.circle
                  cx={42}
                  cy={36}
                  r={eyeRadius}
                  fill="url(#eyeGlow)"
                  filter="url(#glow)"
                  animate={{
                    scaleY: isBlinking ? 0.1 : 1,
                  }}
                  transition={{ duration: 0.08 }}
                  style={{ transformOrigin: '42px 36px' }}
                />
                {/* Left pupil */}
                <motion.circle
                  animate={{
                    cx: 42 + eyeOffset.x,
                    cy: 36 + eyeOffset.y,
                    scaleY: isBlinking ? 0.1 : 1,
                  }}
                  transition={{
                    cx: { type: 'spring', stiffness: 300, damping: 20 },
                    cy: { type: 'spring', stiffness: 300, damping: 20 },
                    scaleY: { duration: 0.08 },
                  }}
                  r={pupilRadius}
                  fill="#1e1b4b"
                  style={{ transformOrigin: '42px 36px' }}
                />
                {/* Left eye sparkle */}
                <motion.circle
                  animate={{
                    cx: 40.5 + eyeOffset.x * 0.3,
                    cy: 34.5 + eyeOffset.y * 0.3,
                  }}
                  r="0.8"
                  fill="white"
                />

                {/* Right eye white */}
                <motion.circle
                  cx={58}
                  cy={36}
                  r={eyeRadius}
                  fill="url(#eyeGlow)"
                  filter="url(#glow)"
                  animate={{
                    scaleY: isBlinking ? 0.1 : 1,
                  }}
                  transition={{ duration: 0.08 }}
                  style={{ transformOrigin: '58px 36px' }}
                />
                {/* Right pupil */}
                <motion.circle
                  animate={{
                    cx: 58 + eyeOffset.x,
                    cy: 36 + eyeOffset.y,
                    scaleY: isBlinking ? 0.1 : 1,
                  }}
                  transition={{
                    cx: { type: 'spring', stiffness: 300, damping: 20 },
                    cy: { type: 'spring', stiffness: 300, damping: 20 },
                    scaleY: { duration: 0.08 },
                  }}
                  r={pupilRadius}
                  fill="#1e1b4b"
                  style={{ transformOrigin: '58px 36px' }}
                />
                {/* Right eye sparkle */}
                <motion.circle
                  animate={{
                    cx: 56.5 + eyeOffset.x * 0.3,
                    cy: 34.5 + eyeOffset.y * 0.3,
                  }}
                  r="0.8"
                  fill="white"
                />
              </>
            )}

            {/* Expression extras (heart eyes, etc) */}
            {renderExpressionExtra}

            {/* ───── MOUTH ───── */}
            <motion.path
              d={mouthPath}
              stroke="#6366f1"
              strokeWidth="1.8"
              fill={expression === 'surprised' ? '#6366f1' : 'none'}
              fillOpacity={expression === 'surprised' ? 0.3 : 0}
              strokeLinecap="round"
              animate={{ d: mouthPath }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Cheek blush */}
            <motion.circle
              cx="35"
              cy="44"
              r="3"
              fill="#f472b6"
              opacity={isHovered || expression === 'love' ? 0.5 : 0.2}
              animate={{
                opacity: isHovered || expression === 'love' ? 0.5 : 0.2,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              cx="65"
              cy="44"
              r="3"
              fill="#f472b6"
              opacity={isHovered || expression === 'love' ? 0.5 : 0.2}
              animate={{
                opacity: isHovered || expression === 'love' ? 0.5 : 0.2,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* ───── ANTENNA ───── */}
            <motion.g
              animate={{
                rotate: [0, 8, -8, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '50px 18px' }}
            >
              <line x1="50" y1="18" x2="50" y2="4" stroke="url(#bodyGrad)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Antenna ball with glow */}
              <motion.circle
                cx="50"
                cy="3"
                r="3.5"
                fill="url(#goldGlow)"
                filter="url(#glow)"
                animate={{
                  r: [3.5, 4.2, 3.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Antenna glow aura */}
              <motion.circle
                cx="50"
                cy="3"
                r="6"
                fill="url(#antennaGlow)"
                animate={{
                  r: [6, 9, 6],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* ─── Ear bolts (3D detail) ─── */}
            <circle cx="28" cy="38" r="3" fill="#4f46e5" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="28" cy="38" r="1.2" fill="#818cf8" />
            <circle cx="72" cy="38" r="3" fill="#4f46e5" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="72" cy="38" r="1.2" fill="#818cf8" />
          </motion.g>
        </svg>

        {/* ─── Hover glow ring ─── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── Click hint (shown only initially) ─── */}
      {clickCount === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 5 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-indigo-400 font-medium whitespace-nowrap pointer-events-none"
        >
          tap me!
        </motion.div>
      )}
    </div>
  )
}

export default InteractiveRobot
