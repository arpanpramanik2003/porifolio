import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, X, Code2, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { projectsData } from '../data/projects'

// Individual Project Card Component with scroll animation
const ProjectCard = ({ project, index, setSelectedProject }) => {
  // Determine neon color based on category
  const getNeonColor = (category) => {
    const colorMap = {
      'Deep Learning': 'from-blue-500 via-cyan-500 to-blue-600',
      'Computer Vision': 'from-purple-500 via-pink-500 to-purple-600',
      'Agricultural AI': 'from-green-500 via-emerald-500 to-green-600',
      'NLP': 'from-yellow-500 via-orange-500 to-yellow-600',
      'Web Development': 'from-indigo-500 via-blue-500 to-indigo-600',
      'Full Stack': 'from-rose-500 via-pink-500 to-rose-600',
    }
    return colorMap[category] || 'from-blue-500 via-purple-500 to-blue-600'
  }

  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.5, 
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
        transition: { duration: 0.2 }
      }}
      className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
    >
      {/* Neon glow background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getNeonColor(project.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-0`} />
      
      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />

        {/* Year and Status Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
            {project.year}
          </span>

          {project.status && (
            <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${
              project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
            }`}>
              {project.status}
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors mb-2">
          {project.title}
        </h3>

        <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full mb-3 font-semibold">
          {project.category}
        </span>

        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 text-slate-500 text-xs font-medium">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {project.github ? (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-700 dark:to-slate-900 rounded-lg hover:from-slate-800 hover:to-black dark:hover:from-slate-800 dark:hover:to-black transition-all"
              title="View Source Code"
            >
              <Github size={18} className="text-white" />
              <span className="text-xs font-bold text-white">Code</span>
            </motion.a>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed opacity-50"
              title="Source code not available"
            >
              <Github size={18} />
              <span className="text-xs font-semibold">Code</span>
            </div>
          )}

          {project.live ? (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-purple-600 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all"
              title="View Live Demo"
            >
              <ExternalLink size={18} className="text-white" />
              <span className="text-xs font-bold text-white">Live</span>
            </motion.a>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed opacity-50"
              title="Live demo not available"
            >
              <ExternalLink size={18} />
              <span className="text-xs font-semibold">N/A</span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-purple-600 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-700 transition-colors"
            title="View Project Details"
          >
            <Info size={18} />
            <span className="text-xs font-semibold">Info</span>
          </motion.button>
        </div>
      </div>
      </div>
    </motion.div>
  )
}

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

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  return (
    <section id="projects" className="pt-12 pb-20 relative overflow-hidden">
      {/* Animated Floating Background Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-5 dark:opacity-10"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-5 dark:opacity-10"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-5 dark:opacity-10"
      >
        <Code2 size={200} className="text-blue-500" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-5 dark:opacity-10"
      >
        <Sparkles size={150} className="text-purple-500" />
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
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                My Work
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-300 dark:text-slate-400 max-w-2xl mx-auto">
              A showcase of my AI/ML projects featuring deep learning, computer vision, and full-stack web applications
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter(category)
                  setShowAll(false)
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
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
            <span className="text-slate-300 dark:text-slate-400">
              Showing <strong className="text-blue-400">{displayedProjects.length}</strong> of <strong className="text-purple-400">{filteredProjects.length}</strong> projects
            </span>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-purple-700"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={24} />
                    Show Less Projects
                    <ChevronUp size={24} />
                  </>
                ) : (
                  <>
                    <ChevronDown size={24} />
                    View All {filteredProjects.length} Projects
                    <ChevronDown size={24} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              // mobile: rounded top corners only, desktop: all corners
              className="bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-4xl max-h-[100vh] sm:max-h-[90vh] overflow-y-auto shadow-xl"
            >
              {/* Modal Header with Image */}
              <div className="sticky top-0 bg-slate-900 dark:bg-slate-950 z-10 rounded-t-3xl sm:rounded-t-2xl overflow-hidden">
                {/* Close button - Fixed position */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm p-2.5 rounded-full transition-all hover:scale-110 z-30 shadow-lg"
                >
                  <X size={24} />
                </button>
                
                <div className="relative h-48 sm:h-64">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>
                <div className="px-4 py-4 sm:px-8 sm:py-6 -mt-20 sm:-mt-16 relative">
                  <div className="flex-1 min-w-0 pr-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight break-words">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-white/90 text-slate-900 rounded-md font-semibold text-xs sm:text-sm whitespace-nowrap">
                        {selectedProject.year}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">•</span>
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-purple-500 text-white rounded-md font-semibold text-xs sm:text-sm whitespace-nowrap">
                        {selectedProject.category}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">•</span>
                      <span className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-md font-semibold text-xs sm:text-sm whitespace-nowrap ${selectedProject.status === 'Completed'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-white'
                        }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-4 py-4 sm:p-8">
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
                <div className="mb-6">
                  <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" size={20} />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base"
                      >
                        <span className="text-blue-500 mt-1 font-bold text-base">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Code2 className="text-purple-500" size={20} />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 rounded-md sm:rounded-lg font-normal border border-slate-200 dark:border-slate-600 text-xs sm:text-base"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Buttons grid is stacked on mobile, horizontal on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {selectedProject.github ? (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Github size={24} className="text-white" />
                      <span className="text-xs sm:text-sm font-bold text-white">View Code</span>
                    </motion.a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-xl sm:rounded-2xl cursor-not-allowed opacity-50">
                      <Github size={24} />
                      <span className="text-xs sm:text-sm">Not Available</span>
                    </div>
                  )}

                  {selectedProject.live ? (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl sm:rounded-2xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink size={24} className="text-white" />
                      <span className="text-xs sm:text-sm font-bold text-white">Live Demo</span>
                    </motion.a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-xl sm:rounded-2xl cursor-not-allowed opacity-50">
                      <ExternalLink size={24} />
                      <span className="text-xs sm:text-sm">Not Available</span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Link copied to clipboard!')
                    }}
                    className="flex flex-col items-center justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Info size={24} />
                    <span className="text-xs sm:text-sm">Share</span>
                  </motion.button>
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
