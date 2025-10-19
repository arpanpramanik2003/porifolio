import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, X, Code2, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { projectsData } from '../data/projects'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const categories = ['All', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Web Development']

  // Filter projects
  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === filter)

  // Show only featured or all based on state
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.filter(project => project.featured)

  const hasMoreProjects = filteredProjects.length > displayedProjects.length

  // Floating animation for background elements
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
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
            <span className="text-slate-600 dark:text-slate-400">
              Showing <strong className="text-blue-600 dark:text-blue-400">{displayedProjects.length}</strong> of <strong className="text-purple-600 dark:text-purple-400">{filteredProjects.length}</strong> projects
            </span>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group border border-slate-200 dark:border-slate-700 transition-all"
                >
                  {/* Project Image/Icon with Gradient */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-7xl overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.icon}
                    </motion.div>

                    {/* Year and Status Badges - Fixed positioning */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      {/* Year Badge - Left */}
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-full shadow-lg">
                        {project.year}
                      </span>

                      {/* Status Badge - Right */}
                      {project.status && (
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${project.status === 'Completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                          }`}>
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Gradient Overlay on Hover */}
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

                    {/* Three Action Buttons - Updated styles */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* GitHub Button */}
                      {project.github ? (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                          title="View Source Code"
                        >
                          <Github size={18} />
                          <span className="text-xs font-semibold">Code</span>
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

                      {/* Live Demo Button - Updated to match theme */}
                      {project.live ? (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center gap-1 px-3 py-2.5 bg-blue-600 dark:bg-pink-400 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink size={18} />
                          <span className="text-xs font-semibold">Live</span>
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

                      {/* Details Button - Updated to match theme */}
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
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View More / View Less Button */}
          {hasMoreProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex justify-between items-start z-10">
                <div className="flex items-center gap-4">
                  <span className="text-7xl">{selectedProject.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="px-3 py-1 bg-white/90 text-slate-700 text-sm rounded-full font-bold">
                        {selectedProject.year}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-semibold">
                        {selectedProject.category}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full font-bold ${selectedProject.status === 'Completed'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-white'
                        }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" size={24} />
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                      >
                        <span className="text-blue-500 mt-1 font-bold text-lg">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Code2 className="text-purple-500" size={24} />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold border border-slate-200 dark:border-slate-600"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons in Modal - Updated */}
                <div className="grid grid-cols-3 gap-4">
                  {/* GitHub Button */}
                  {selectedProject.github ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors font-semibold"
                    >
                      <Github size={28} />
                      <span>View Code</span>
                    </motion.a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-xl cursor-not-allowed opacity-50">
                      <Github size={28} />
                      <span>Not Available</span>
                    </div>
                  )}

                  {/* Live Demo Button - Updated */}
                  {selectedProject.live ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-blue-400 dark:bg-pink-400 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-green-700 transition-colors font-semibold"
                    >
                      <ExternalLink size={28} />
                      <span>Live Demo</span>
                    </motion.a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-xl cursor-not-allowed opacity-50">
                      <ExternalLink size={28} />
                      <span>Not Available</span>
                    </div>
                  )}

                  {/* Info Button - Updated */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Link copied to clipboard!')
                    }}
                    className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-purple-600 dark:bg-purple-600 text-white rounded-xl hover:bg-purple-700 dark:hover:bg-purple-700 transition-colors font-semibold"
                  >
                    <Info size={28} />
                    <span>Share</span>
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
