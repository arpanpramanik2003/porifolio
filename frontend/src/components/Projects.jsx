import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Info, X, ArrowUpRight, Code, Sparkles, CheckCircle2 } from 'lucide-react'
import { projectsData } from '../data/projects'
import { personalInfo } from '../data/personalInfo'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const featuredProject = projectsData.find(p => p.featured) || projectsData[0]
  const secondaryProjects = projectsData.filter(p => p.id !== featuredProject.id)

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[04]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>FEATURED ENGINEERING CASE STUDIES</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              SELECTED PRODUCTION SYSTEMS & AI PLATFORMS.
            </h2>

            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              <span>VIEW ALL REPOSITORIES ON GITHUB</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Flagship Featured Case Study (Magazine Hero Card) */}
        <div className="mb-16 rounded-3xl border overflow-hidden transition-all card-arch"
          style={{ background: 'var(--bg-card)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Preview Banner (7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px] bg-slate-900 border-b lg:border-b-0 lg:border-r overflow-hidden img-hover-zoom"
              style={{ borderColor: 'var(--border)' }}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/800x500?text=PaperLens+AI'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-full font-bold shadow-md bg-indigo-600 text-white">
                  ★ FLAGSHIP PROJECT
                </span>
                <span className="px-3 py-1 rounded-full font-bold shadow-md bg-black/70 text-white backdrop-blur-sm border border-white/20">
                  {featuredProject.year}
                </span>
              </div>
            </div>

            {/* Content Dossier (5 Cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                  {featuredProject.category}
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  {featuredProject.title}
                </h3>

                <p className="font-body text-sm leading-relaxed mb-6 text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                  {featuredProject.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 font-mono text-xs mb-6">
                  {featuredProject.tech.slice(0, 7).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg border card-arch"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                {featuredProject.live && (
                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                    style={{
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)'
                    }}
                  >
                    <span>Launch Live App</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl font-display font-semibold text-xs flex items-center gap-2 border transition-colors card-arch"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="px-4 py-3 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-colors card-arch ml-auto"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <Info size={14} />
                  <span>Specs</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Secondary Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-2xl border flex flex-col justify-between overflow-hidden transition-all card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Image Preview */}
              <div className="relative h-56 bg-slate-900 border-b overflow-hidden img-hover-zoom" style={{ borderColor: 'var(--border)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://via.placeholder.com/600x350?text=${encodeURIComponent(project.title)}`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2 font-mono text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Body Dossier */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm leading-relaxed mb-4 text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.tech.slice(0, 5).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Github size={12} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1 hover:underline"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Info size={12} />
                    <span>Details</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Modal Specification View */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl border max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Modal Top Header */}
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                    [PROJECT SPECIFICATION // {selectedProject.year}]
                  </div>
                  <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl border card-arch"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scroll Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-body">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                    ARCHITECTURAL OVERVIEW
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                </div>

                {/* Features List */}
                {selectedProject.features && (
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      SYSTEM FEATURES & CAPABILITIES
                    </div>
                    <div className="space-y-2">
                      {selectedProject.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-tertiary)' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Matrix */}
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    TECHNOLOGY STACK
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg border card-arch"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-6 border-t flex items-center justify-between font-mono text-xs"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
              >
                <div className="flex items-center gap-3">
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl font-bold border transition-colors shadow-sm"
                      style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                    >
                      LAUNCH LIVE APP
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border transition-colors card-arch"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      GITHUB REPO
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  CLOSE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default Projects
