import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { GraduationCap, MapPin, Download, ArrowUpRight, Cpu, Code, Brain, ShieldCheck, Sparkles } from 'lucide-react'
import { aboutData } from '../data/about'
import { personalInfo } from '../data/personalInfo'

const About = () => {
  const sectionRef = useRef(null)

  // Track scroll inside About section for parallax & 3D dynamics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Spring physics for natural, non-laggy motion
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  })

  // Parallax offsets for asymmetric columns
  const headerY = useTransform(smoothScroll, [0, 0.3], [40, 0])
  const headerOpacity = useTransform(smoothScroll, [0, 0.25], [0, 1])

  const leftColY = useTransform(smoothScroll, [0.1, 0.4], [50, 0])
  const rightColY = useTransform(smoothScroll, [0.1, 0.45], [80, 0])
  
  // Subtle 3D portrait perspective tilt on scroll
  const portraitRotateX = useTransform(smoothScroll, [0.2, 0.6], [8, -4])
  const portraitScale = useTransform(smoothScroll, [0.2, 0.5], [0.96, 1])

  const pillars = [
    {
      num: '01',
      title: 'Full-Stack Web Systems',
      desc: 'Architecting end-to-end applications using React, Next.js, FastAPI, Node.js, and PostgreSQL with robust auth & state management.',
      icon: Code,
      accent: 'var(--accent)'
    },
    {
      num: '02',
      title: 'Grounded AI & RAG',
      desc: 'Building intelligent copilots (PaperLens AI) using hybrid retrieval (FAISS + BM25), Groq LLM API, and structured markdown outputs.',
      icon: Brain,
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Computer Vision & Deep Learning',
      desc: 'Developing multi-headed CNNs, Grad-CAM visual explainability maps, and real-time Streamlit inference engines (FruitQ-GradeX).',
      icon: Cpu,
      accent: 'var(--accent-tertiary)'
    },
    {
      num: '04',
      title: 'Academic Excellence',
      desc: 'Maintaining a 9.42 / 10 CGPA in B.Tech CSE (AI & ML) at The Neotia University while shipping 10+ production deployments.',
      icon: GraduationCap,
      accent: 'var(--accent-warm)'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden perspective-1000"
    >
      {/* Parallax background accent gradient */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 pointer-events-none opacity-20 dark:opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─────────────────────────────────────────────────────────────
           ASYMMETRIC SECTION HEADER (Scroll Parallax & Fade-in)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3.5" style={{ color: 'var(--accent)' }}>
            <span>[01]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          
          <h2
            className="font-display text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight max-w-4xl leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            ENGINEERING WITH RIGOR, GROUNDED AI & INTENTIONAL DESIGN.
          </h2>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           2-COLUMN ASYMMETRIC GRID (Scroll-staggered columns)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Story & 4 Core Pillars (7 Cols) */}
          <motion.div
            style={{ y: leftColY }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Bio Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 font-body text-base sm:text-lg leading-relaxed text-justify sm:text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              <p>
                I am a Computer Science Undergraduate specializing in AI/ML at{' '}
                <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>The Neotia University</strong> (9.42 CGPA). My focus centers on building reliable web platforms, intelligent retrieval systems, and machine learning models that bridge scientific research with real-world utility.
              </p>
              <p>
                From authoring{' '}
                <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>PaperLens AI</strong> (an academic research co-pilot with hybrid FAISS+BM25 retrieval) to deploying full-stack web platforms and explainable deep learning pipelines, I emphasize clean architecture, high performance, and visual polish.
              </p>
            </motion.div>

            {/* Core Engineering Pillars Grid */}
            <div className="pt-2">
              <div className="font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <span>CORE ENGINEERING PILLARS</span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {pillars.map((p) => {
                  const Icon = p.icon
                  return (
                    <motion.div
                      key={p.num}
                      variants={cardVariants}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="p-5.5 rounded-2xl border transition-all card-arch relative group cursor-pointer"
                      style={{ background: 'var(--bg-card)' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110"
                          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                        >
                          <Icon size={18} style={{ color: p.accent }} />
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{p.num}</span>
                      </div>
                      
                      <h3 className="font-display font-bold text-base mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {p.title}
                      </h3>
                      <p className="font-body text-xs leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                        {p.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Profile Dossier & Key Credentials (5 Cols) */}
          <motion.div
            style={{ y: rightColY }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Profile Dossier Card */}
            <motion.div
              style={{
                rotateX: portraitRotateX,
                scale: portraitScale,
                transformStyle: 'preserve-3d',
                background: 'var(--bg-card)'
              }}
              className="p-6 rounded-2xl border card-arch relative overflow-hidden shadow-lg"
            >
              {/* Header: Vertical Portrait Frame + Info */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                {/* 530x690 Aspect Ratio Vertical Frame */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="w-28 sm:w-32 aspect-[530/690] rounded-xl overflow-hidden border-2 shrink-0 card-arch shadow-sm relative group cursor-pointer"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/530x690?text=Arpan'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Dossier Info Header */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs"
                    style={{ borderColor: 'var(--accent-tertiary)', color: 'var(--accent-tertiary)', background: 'var(--bg-secondary)' }}
                  >
                    <ShieldCheck size={12} />
                    <span className="font-semibold">VERIFIED ENGINEER</span>
                  </div>

                  <h3
                    className="font-display font-black text-2xl tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {personalInfo.name}
                  </h3>

                  <div className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    B.Tech CSE (AI & ML) • 2023–2027
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin size={13} className="text-[var(--accent)] shrink-0" />
                    <span>West Bengal, India</span>
                  </div>
                </div>
              </div>

              {/* Dossier Quick Ledger */}
              <div className="space-y-3 font-mono text-xs pt-2" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>INSTITUTION</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>The Neotia University</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>ACADEMIC SCORE</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded border"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                  >
                    9.42 CGPA
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>DEPLOYMENTS</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>10+ Production Live</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>RESEARCH FIELD</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>RAG & Vision AI</span>
                </div>
              </div>

              {/* Direct Resume Download Button */}
              <div className="pt-6">
                <motion.a
                  href={personalInfo.resume}
                  download
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border transition-all card-arch shadow-xs"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Download size={14} />
                  <span>Download Curriculum Vitae (PDF)</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
                </motion.a>
              </div>
            </motion.div>

            {/* Technical Focus & Domain Interests */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl border card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="font-mono text-xs uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <Sparkles size={13} style={{ color: 'var(--accent-secondary)' }} />
                <span>INTERESTS & EXPLORATION</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {aboutData.interests.map((interest) => (
                  <motion.span
                    key={interest}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-lg border transition-all card-arch cursor-pointer"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    #{interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default About
