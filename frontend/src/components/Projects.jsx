import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, Info, X, Code2, Sparkles } from 'lucide-react'
import { projectsData } from '../data/projects'
import { personalInfo } from '../data/personalInfo'

/* ── Main Projects Component ── */
const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)

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
              A showcase of selected projects with focused outcomes, tools, and live links
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {projectsData.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch p-4 sm:p-6 rounded-2xl neon-card ${
                  index % 2 !== 0 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                }`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full min-h-[220px] sm:min-h-[280px] object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <span
                      className="inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        background: 'var(--bg-card-hover)',
                        color: 'var(--accent)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {project.category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
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

                  <div className="flex flex-wrap gap-3 pt-2">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm"
                      style={{
                        background: 'var(--bg-card-hover)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Info size={16} />
                      Info
                    </motion.button>

                    {project.github && (
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm"
                        style={{
                          background: 'var(--bg-elevated)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <Github size={16} />
                        Source
                      </motion.a>
                    )}

                    {project.live && (
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm neon-btn"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="text-center mt-10 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            For more projects, visit{' '}
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              GitHub
            </a>
            .
          </p>
        </motion.div>
      </div>

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
              <div className="h-1.5 w-full neon-line flex-shrink-0" />

              <div className="overflow-y-auto flex-1">
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
