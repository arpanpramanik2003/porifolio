import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, X, Code2, Sparkles, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react'
import { projectsData } from '../data/projects'

/* ── Bento Card ── */
const BentoCard = ({ project, index, isHero, setSelectedProject }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: (index % 4) * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: true, amount: 0.15 }}
      onClick={() => setSelectedProject(project)}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        isHero ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      style={{
        minHeight: isHero ? undefined : '280px',
      }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay — darkens bottom for text readability */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          background: isHero
            ? 'linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.7) 40%, rgba(3,7,18,0.2) 70%, rgba(3,7,18,0.1) 100%)'
            : 'linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.65) 50%, rgba(3,7,18,0.25) 100%)',
        }}
      />

      {/* Neon border glow on hover */}
      <div
        className="absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 2px var(--accent), 0 0 20px var(--neon-glow), inset 0 0 20px var(--neon-glow)',
        }}
      />

      {/* Top badges */}
      <div className="absolute top-4 left-4 z-30 flex gap-2">
        <span className="px-3 py-1.5 backdrop-blur-md bg-black/50 text-white text-[11px] font-bold rounded-full border border-white/10 shadow-xl">
          {project.category}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <span className="px-3 py-1.5 backdrop-blur-md bg-black/50 text-white/80 text-[11px] font-bold rounded-full border border-white/10">
          {project.year}
        </span>
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            project.status === 'Completed'
              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
              : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
          }`}
          title={project.status}
        />
      </div>

      {/* Content — sits at the bottom */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 p-5 ${isHero ? 'sm:p-8' : 'p-5'}`}>
        <h3
          className={`font-bold leading-tight mb-2 text-white group-hover:text-[var(--accent)] transition-colors duration-300 ${
            isHero ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          {project.title}
        </h3>

        {/* Description — only on hero or all cards */}
        <p
          className={`text-white/60 leading-relaxed mb-4 ${
            isHero ? 'text-sm sm:text-base line-clamp-3' : 'text-xs line-clamp-2'
          }`}
        >
          {project.description}
        </p>

        {/* Tech pills — frosted glass */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, isHero ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-semibold rounded-md backdrop-blur-md bg-white/10 text-white/70 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > (isHero ? 5 : 3) && (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md text-white/40">
              +{project.tech.length - (isHero ? 5 : 3)}
            </span>
          )}
        </div>

        {/* Action buttons — slide up on hover */}
        <div
          className="flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold backdrop-blur-md bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-[var(--accent)] transition-all"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-black transition-all hover:shadow-[0_0_15px_var(--neon-glow)] neon-btn"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
            className="ml-auto flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold backdrop-blur-md bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-all"
          >
            Details <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Projects Component ── */
const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const categories = ['All', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Web Development']

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === filter)

  const displayedProjects = showAll
    ? filteredProjects
    : filter === 'All'
      ? filteredProjects.filter(project => project.featured).slice(0, 3)
      : filteredProjects.slice(0, 3)

  const hasMoreProjects = filteredProjects.length > displayedProjects.length

  return (
    <section id="projects" className="pt-12 pb-20 relative overflow-hidden">
      {/* Floating background accents */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute top-20 left-10 opacity-5 dark:opacity-[0.03] hidden md:block"
      >
        <div className="w-64 h-64 rounded-3xl blur-3xl" style={{ background: 'var(--accent)' }} />
      </motion.div>
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10], transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-5 dark:opacity-[0.03] hidden md:block"
      >
        <div className="w-80 h-80 rounded-full blur-3xl" style={{ background: 'var(--accent-secondary)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                My Work
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Featured Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full mb-4 neon-line"
            />
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-2xl mx-auto">
              A showcase of my AI/ML projects featuring deep learning, computer vision, and full-stack web applications
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter(category)
                  setShowAll(false)
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === category ? 'neon-btn shadow-lg' : ''
                }`}
                style={filter !== category ? {
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                } : {}}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Project Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mb-8"
          >
            <span style={{ color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--accent)' }}>{displayedProjects.length}</strong> of <strong style={{ color: 'var(--accent-secondary)' }}>{filteredProjects.length}</strong> projects
            </span>
          </motion.div>

          {/* ══════ BENTO GRID ══════ */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
              style={{ gridAutoFlow: 'dense', gridAutoRows: 'minmax(300px, auto)' }}
            >
              {displayedProjects.map((project, index) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHero={index === 0 && !showAll}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View More / View Less Button */}
          {filteredProjects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAll(!showAll)
                  if (showAll) {
                    setTimeout(() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 300)
                  }
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all neon-btn"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={20} />
                    Show Less
                    <ChevronUp size={20} />
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} />
                    View All {filteredProjects.length} Projects
                    <ChevronDown size={20} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ─── Project Detail Modal ─── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl sm:rounded-3xl w-full sm:max-w-5xl max-h-[90vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Accent bar */}
              <div className="h-1.5 w-full neon-line flex-shrink-0" />

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1">
                {/* Hero: image + title */}
                <div className="sm:flex">
                  <div className="relative sm:w-2/5 h-56 sm:h-auto flex-shrink-0">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm"
                        style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                      >
                        📅 {selectedProject.year}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                        selectedProject.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {selectedProject.status === 'Completed' ? '✓' : '⏳'} {selectedProject.status}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex-1 px-6 py-6 sm:px-8 sm:py-8" style={{ background: 'var(--bg-secondary)' }}>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:rotate-90"
                      style={{
                        background: 'var(--bg-card-hover)',
                        color: 'var(--text-tertiary)',
                      }}
                      title="Close"
                    >
                      <X size={18} />
                    </button>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-sm neon-btn">
                      <Code2 size={11} />
                      {selectedProject.category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 pr-8" style={{ color: 'var(--text-primary)' }}>
                      {selectedProject.title}
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />

                {/* Features + Tech */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 grid sm:grid-cols-2 gap-6 sm:gap-10">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(255,199,64,0.15)' }}>
                        <Sparkles size={13} style={{ color: 'var(--accent-warm)' }} />
                      </span>
                      Key Features
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(0,229,255,0.15)' }}
                          >
                            <span className="font-bold" style={{ fontSize: 10, color: 'var(--accent)' }}>✓</span>
                          </span>
                          <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(179,136,255,0.15)' }}>
                        <Code2 size={13} style={{ color: 'var(--accent-secondary)' }} />
                      </span>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-default"
                          style={{
                            background: 'var(--bg-card-hover)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mx-6 sm:mx-8" style={{ borderTop: '1px solid var(--border)' }} />

                {/* Action Buttons */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row gap-3">
                  {selectedProject.github ? (
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Github size={18} />
                      View Source Code
                    </motion.a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm cursor-not-allowed opacity-60 border border-dashed"
                      style={{ background: 'var(--bg-card-hover)', color: 'var(--text-tertiary)', borderColor: 'var(--border)' }}
                    >
                      <Github size={18} />
                      Code Not Available
                    </div>
                  )}

                  {selectedProject.live ? (
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md neon-btn"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm cursor-not-allowed border border-dashed"
                      style={{ background: 'var(--bg-card-hover)', color: 'var(--text-tertiary)', borderColor: 'var(--border)' }}
                    >
                      <ExternalLink size={18} />
                      Demo Not Available
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
