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
    { prefix: '>', text: 'const dev = new Arpan()', color: 'text-blue-400' },
    { prefix: '$', text: 'skills.push("AI/ML", "React", "Node")', color: 'text-green-400' },
    { prefix: '~', text: 'await dev.buildAmazingThings()', color: 'text-purple-400' },
  ]

  const stats = [
    { label: 'CGPA', value: '9.42', suffix: '', icon: '🎓', grad: 'from-blue-500 to-cyan-400' },
    { label: 'Projects', value: '20', suffix: '+', icon: '💻', grad: 'from-violet-500 to-purple-400' },
    { label: 'Internships', value: '3', suffix: '', icon: '🚀', grad: 'from-pink-500 to-rose-400' },
    { label: 'Certificates', value: '5', suffix: '+', icon: '🏆', grad: 'from-amber-500 to-orange-400' },
  ]

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* ── Animated mesh grid background ── */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glowing orbs */}
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-3/4 left-1/2 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl"
        />
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ════════════ LEFT — Text Content ════════════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Greeting chip */}
            <motion.div variants={item} className="mb-5">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                  bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300
                  border border-blue-200 dark:border-blue-700/60
                  backdrop-blur-sm shadow-sm"
              >
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  👋
                </motion.span>
                Hello, I'm
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-green-600 dark:text-green-400 text-xs">Available for work</span>
              </motion.span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item} className="mb-4 overflow-hidden">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {personalInfo.firstName}
                  </span>
                  {/* Shine sweep */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  />
                </span>
                {' '}
                <span className="text-slate-800 dark:text-slate-100">Pramanik</span>
              </h1>
            </motion.div>

            {/* Typing role */}
            <motion.div variants={item} className="mb-5 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm">
                <Terminal size={16} className="text-violet-500" />
                <TypeAnimation
                  sequence={[
                    'Full-Stack Developer', 2200,
                    'AI / ML Engineer', 2200,
                    'CSE Undergrad @ TNU', 2200,
                    'Open-Source Builder', 2200,
                  ]}
                  wrapper="span"
                  speed={55}
                  className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200"
                  repeat={Infinity}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-violet-500"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              {personalInfo.tagline}{' '}
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {personalInfo.description}
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mb-7 w-full sm:w-auto">
              <Link to="projects" smooth duration={500}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(99,102,241,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-sm text-white overflow-hidden group shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)' }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-sm border-2 border-violet-500 text-violet-600 dark:text-violet-400
                  hover:bg-violet-500/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Download size={15} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex gap-3 mb-10">
              {[
                { icon: Github, href: personalInfo.social.github, label: 'GitHub', color: 'hover:border-slate-500 hover:text-slate-900 dark:hover:text-white hover:shadow-slate-500/30' },
                { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: 'hover:border-blue-500 hover:text-blue-600 hover:shadow-blue-500/30' },
                { icon: Mail, href: personalInfo.social.email, label: 'Email', color: 'hover:border-purple-500 hover:text-purple-600 hover:shadow-purple-500/30' },
              ].map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  title={label}
                  className={`p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400
                    border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm
                    shadow-sm hover:shadow-lg transition-all duration-200 ${color}`}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group relative p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60
                    backdrop-blur-sm shadow-sm hover:shadow-xl overflow-hidden cursor-default transition-all duration-200"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className={`text-xl font-black bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>
                      <CountUp end={s.value} suffix={s.suffix} duration={2000} />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════ RIGHT — Visual Panel ════════════ */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="flex-1 flex flex-col items-center gap-4 max-w-lg mx-auto lg:mx-0 w-full"
          >
            {/* 3-D Tilting card — extra padding accommodates orbiting badges */}
            <motion.div
              style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-10"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a855f7, #ec4899, #6366f1)',
                  padding: '3px',
                  borderRadius: '50%',
                }}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-950" />
              </motion.div>

              {/* Secondary spinner ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border-2 border-dashed border-blue-400/40"
              />

              {/* Profile image */}
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl ring-4 ring-violet-500/30">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-transparent to-pink-600/20"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Animated terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="hidden md:block w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/60"
            >
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 bg-slate-800 dark:bg-slate-900">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-slate-400 font-mono tracking-wide">arpan@portfolio ~ %</span>
              </div>
              {/* Terminal body */}
              <div className="bg-slate-900/95 dark:bg-slate-950/95 px-4 py-4 font-mono text-sm space-y-2">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.4 }}
                    className="flex gap-2"
                  >
                    <span className="text-slate-500 select-none">{line.prefix}</span>
                    <TypeAnimation
                      sequence={[i * 600, line.text]}
                      wrapper="span"
                      speed={70}
                      className={line.color}
                      cursor={false}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="flex gap-2 text-green-400"
                >
                  <span className="text-slate-500">✓</span>
                  <span>Ready to collaborate!</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  )
}

export default Hero
