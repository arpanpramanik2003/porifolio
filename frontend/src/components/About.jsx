import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, MapPin, Download, ArrowUpRight, Cpu, Code, Brain, ShieldCheck, Sparkles } from 'lucide-react'
import { aboutData } from '../data/about'
import { personalInfo } from '../data/personalInfo'

const About = () => {
  const sectionRef = useRef(null)

  // Track scroll inside About section for parallax entrance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'end start']
  })

  // Silky smooth scroll entrance for section title & columns
  const headerY = useTransform(scrollYProgress, [0.05, 0.38], [45, 0])
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])

  const leftColY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0])
  const rightColY = useTransform(scrollYProgress, [0.1, 0.45], [60, 0])

  const pillars = [
    {
      num: '01',
      title: 'Full-Stack Web Systems',
      desc: 'Architecting end-to-end applications using React, Next.js, FastAPI, Node.js, and PostgreSQL with robust auth & state management.',
      icon: Code
    },
    {
      num: '02',
      title: 'Grounded AI & RAG',
      desc: 'Building intelligent copilots (PaperLens AI) using hybrid retrieval (FAISS + BM25), Groq LLM API, and structured markdown outputs.',
      icon: Brain
    },
    {
      num: '03',
      title: 'Computer Vision & Deep Learning',
      desc: 'Developing multi-headed CNNs, Grad-CAM visual explainability maps, and real-time Streamlit inference engines (FruitQ-GradeX).',
      icon: Cpu
    },
    {
      num: '04',
      title: 'Academic Excellence',
      desc: 'Maintaining a 9.42 / 10 CGPA in B.Tech CSE (AI & ML) at The Neotia University while shipping 10+ production deployments.',
      icon: GraduationCap
    }
  ]

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Background ambient light spotlight */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 pointer-events-none opacity-15 dark:opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ASYMMETRIC SECTION HEADER */}
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
            id="about-heading"
            className="font-display text-xl sm:text-3xl lg:text-5xl font-black tracking-tight max-w-4xl leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            ENGINEERING WITH RIGOR, GROUNDED AI & INTENTIONAL DESIGN.
          </h2>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
           ANNOTATED TECHNICAL DOSSIER GRID (2-Column Spec Layout)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative & Refined Pillars List (7 Cols) */}
          <motion.div
            style={{ y: leftColY }}
            className="lg:col-span-7 space-y-12"
          >
            {/* Bio Narrative */}
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

            {/* Core Engineering Pillars Index List */}
            <div className="pt-2">
              <div className="font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <span>CORE ENGINEERING PILLARS</span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <div className="space-y-4">
                {pillars.map((p) => {
                  const Icon = p.icon
                  return (
                    <motion.div
                      key={p.num}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      tabIndex={0}
                      className="p-5 sm:p-6 rounded-2xl border card-arch relative group transition-all duration-300 focus-outline cursor-default"
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Number Badge & Icon */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]"
                          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                        >
                          <Icon size={20} className="transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }} />
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display font-bold text-base sm:text-lg tracking-tight relative inline-block group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                              {p.title}
                              
                              {/* Directional SVG Drawing Underline Annotation */}
                              <svg
                                aria-hidden="true"
                                className="absolute left-0 -bottom-1 w-full h-1 pointer-events-none overflow-visible"
                                viewBox="0 0 100 4"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M 0,2 Q 50,3.5 100,2"
                                  fill="none"
                                  stroke="var(--accent)"
                                  strokeWidth="2"
                                  strokeDasharray="100"
                                  className="transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                                  style={{
                                    strokeDashoffset: 'var(--draw-offset, 100)',
                                    animation: 'none'
                                  }}
                                />
                              </svg>
                            </h3>
                            <span className="font-mono text-xs font-bold shrink-0" style={{ color: 'var(--accent)' }}>
                              [{p.num}]
                            </span>
                          </div>

                          <p className="font-body text-xs sm:text-sm leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineer ID Dossier & Interests (5 Cols) */}
          <motion.div
            style={{ y: rightColY }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Engineer ID Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-2xl border card-arch relative overflow-hidden shadow-lg"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Top Shimmer Header: Photo + Verified Badge */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                {/* Profile Photo Frame */}
                <div
                  className="w-28 sm:w-32 aspect-[530/690] rounded-xl overflow-hidden border-2 shrink-0 card-arch shadow-xs relative group"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    width="530"
                    height="690"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='530' height='690' viewBox='0 0 530 690'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='sans-serif' font-size='24'%3EArpan Pramanik%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>

                {/* ID Card Headline */}
                <div className="space-y-2 flex-1 min-w-0">
                  {/* Verified Engineer Badge with Animated Light Sweep Shimmer */}
                  <div
                    className="relative inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs overflow-hidden"
                    style={{ borderColor: 'var(--border)', color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                  >
                    {/* Light Sweep Shimmer Layer */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        repeat: Infinity,
                        repeatDelay: 3.5,
                        duration: 1.5,
                        ease: 'easeInOut'
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 dark:via-white/15 to-transparent pointer-events-none"
                    />
                    <ShieldCheck size={13} style={{ color: 'var(--accent)' }} />
                    <span className="font-bold relative z-10">VERIFIED ENGINEER</span>
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
                    <MapPin size={13} className="shrink-0" style={{ color: 'var(--accent)' }} />
                    <span>West Bengal, India</span>
                  </div>
                </div>
              </div>

              {/* Spec-Sheet Stat Rows */}
              <div className="space-y-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>INSTITUTION</span>
                  <span className="font-semibold text-right" style={{ color: 'var(--text-primary)' }}>The Neotia University</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>ACADEMIC SCORE</span>
                  <span
                    className="font-bold px-2.5 py-0.5 rounded border shadow-xs"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                  >
                    9.42 CGPA
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>DEPLOYMENTS</span>
                  <span className="font-semibold text-right" style={{ color: 'var(--text-primary)' }}>10+ Production Live</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span style={{ color: 'var(--text-tertiary)' }}>RESEARCH FIELD</span>
                  <span className="font-semibold text-right" style={{ color: 'var(--text-primary)' }}>RAG & Vision AI</span>
                </div>
              </div>

              {/* Download Resume Action */}
              <div className="pt-6">
                <a
                  href={personalInfo.resume}
                  download
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border transition-all duration-200 card-arch shadow-xs hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] active:scale-[0.98] focus-outline"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <Download size={14} />
                  <span>Download Curriculum Vitae (PDF)</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
                </a>
              </div>
            </motion.div>

            {/* Technical Focus & Domain Interests */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl border card-arch"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <div className="font-mono text-xs uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                <span>INTERESTS & EXPLORATION</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {aboutData.interests.map((interest) => (
                  <span
                    key={interest}
                    tabIndex={0}
                    className="px-3 py-1.5 rounded-lg border transition-all duration-200 card-arch hover:border-[var(--accent)] hover:text-[var(--text-primary)] focus-outline cursor-default"
                    style={{
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    #{interest}
                  </span>
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
