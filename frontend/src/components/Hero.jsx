import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, Code2, Terminal } from 'lucide-react'
import { Link } from 'react-scroll'
import { personalInfo } from '../data/personalInfo'
import useIsMobile from '../hooks/useIsMobile'
import { useRef, useEffect, useState } from 'react'

/* ── Animated counting number ── */
const CountUp = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const isFloat = String(end).includes('.')
    const endNum = parseFloat(end)
    const step = endNum / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= endNum) { setCount(endNum); clearInterval(timer) }
      else setCount(isFloat ? parseFloat(start.toFixed(2)) : Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return <>{count}{suffix}</>
}

const Hero = () => {
  const { shouldReduceMotion } = useIsMobile()
  const containerRef = useRef(null)

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [12, -12])
  const rotateY = useTransform(springX, [-300, 300], [-12, 12])

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  /* ── Variants ── */
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.2 } }
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
  }

  /* ── Terminal lines ── */
  const terminalLines = [
    { prefix: '>', text: 'const dev = new Arpan()', color: 'text-[var(--accent)]' },
    { prefix: '$', text: 'skills.push("AI/ML", "React", "Node")', color: 'text-[var(--accent-secondary)]' },
    { prefix: '~', text: 'await dev.buildAmazingThings()', color: 'text-[var(--accent-tertiary)]' },
  ]

  const stats = [
    { label: 'CGPA', value: '9.42', suffix: '', icon: '🎓', color: '--accent' },
    { label: 'Projects', value: '20', suffix: '+', icon: '💻', color: '--accent-secondary' },
    { label: 'Internships', value: '3', suffix: '', icon: '🚀', color: '--accent-tertiary' },
    { label: 'Certificates', value: '5', suffix: '+', icon: '🏆', color: '--accent-warm' },
  ]

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* ── Animated mesh grid background ── */}
      <div className="absolute inset-0 z-0">
        {/* Grid lines — neon tinted */}
        <div
          className="absolute inset-0 opacity-15 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col items-center justify-center gap-10">

          {/* ════════════ Center Content Panel ════════════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center text-center"
          >
            {/* Greeting chip */}
            <motion.div variants={item} className="mb-6">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                  neon-pill backdrop-blur-sm shadow-sm"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  👋
                </motion.span>
                Hello, I'm
                <motion.span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs" style={{ color: 'var(--text-primary)' }}>Available for work</span>
              </motion.span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="mb-5 overflow-hidden">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none">
                <span className="relative inline-block">
                  <span style={{ color: 'var(--text-primary)' }}>
                    {personalInfo.firstName}
                  </span>
                  {/* Shine sweep */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text text-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  />
                </span>
                {' '}
                <span className="hero-name-outline">Pramanik</span>
              </h1>
            </motion.div>

            {/* Typing role */}
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm neon-card h-[40px] sm:h-[46px]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <Terminal size={16} style={{ color: 'var(--accent)' }} />
                <TypeAnimation
                  sequence={[
                    'Full-Stack Developer', 2200,
                    'AI / ML Engineer', 2200,
                    'CSE Undergrad @ TNU', 2200,
                    'Open-Source Builder', 2200,
                  ]}
                  wrapper="span"
                  speed={55}
                  className="text-base sm:text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                  repeat={Infinity}
                  cursor={false}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-5"
                  style={{ background: 'var(--accent)' }}
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-row flex-wrap justify-center items-center gap-4 mb-8 w-full">
              <Link to="projects" smooth duration={500} className="w-auto">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px var(--neon-glow-strong)' }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-auto px-6 py-2.5 rounded-full font-semibold text-sm text-black overflow-hidden group shadow-lg neon-btn"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    <Code2 size={15} />
                    View My Work
                  </span>
                </motion.button>
              </Link>

              <motion.a
                href={personalInfo.resume}
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-auto px-6 py-2.5 rounded-full font-semibold text-sm border-2 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,229,255,0.1)'
                  e.currentTarget.style.boxShadow = '0 0 15px var(--neon-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Download size={15} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex gap-3 mb-10 justify-center">
              {[
                { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: personalInfo.social.email, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  title={label}
                  className="p-3 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-200 neon-card"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group relative p-4 rounded-2xl backdrop-blur-sm shadow-sm overflow-hidden cursor-default transition-all duration-200 neon-card"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-xl font-black" style={{ color: `var(${s.color})` }}>
                      <CountUp end={s.value} suffix={s.suffix} duration={2000} />
                    </div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
