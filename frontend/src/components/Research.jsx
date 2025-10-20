import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FileText, ExternalLink, Award, Users, Calendar, Code2, Sparkles, BookOpen, Target } from 'lucide-react'
import { researchData } from '../data/research'

const Research = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedPaper, setSelectedPaper] = useState(null)

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
    <section id="research" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Animated Floating Background Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-3 dark:opacity-5 hidden sm:block"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-3 dark:opacity-5 hidden sm:block"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-3xl" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-3 dark:opacity-5 hidden lg:block"
        style={{ translateY: '-50%' }}
      >
        <BookOpen size={200} className="text-blue-500" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-3 dark:opacity-5 hidden lg:block"
      >
        <Sparkles size={150} className="text-purple-500" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold">
                Academic Contributions
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Research & Publications
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg px-2">
              Exploring the intersection of AI/ML and agriculture through cutting-edge research
            </p>
          </div>

          {/* Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {[
              { label: 'Publications', value: researchData.length, icon: '📄', color: 'from-blue-500 to-cyan-500' },
              { label: 'Under Review', value: researchData.filter(p => p.status === 'Under Review').length, icon: '⏳', color: 'from-yellow-500 to-orange-500' },
              { label: 'Co-authors', value: '3', icon: '👥', color: 'from-purple-500 to-pink-500' },
              { label: 'Research Areas', value: '3', icon: '🎯', color: 'from-green-500 to-teal-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg text-center border border-slate-200 dark:border-slate-600"
              >
                <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Research Papers Grid */}
          <div className="space-y-5 sm:space-y-8">
            {researchData.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 cursor-pointer"
                onClick={() => setSelectedPaper(paper)}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Paper Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${paper.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg`}
                  >
                    {paper.icon}
                  </motion.div>
                  {/* Paper Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                      <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white pr-0 sm:pr-4 leading-tight hover:text-blue-500 transition-colors">
                        {paper.title}
                      </h3>
                      <div className="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
                        <span className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-base font-bold rounded-full ${
                          paper.status === 'Published' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {paper.status}
                        </span>
                        <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-base rounded-full font-bold">
                          {paper.year}
                        </span>
                      </div>
                    </div>
                    {/* Authors */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                      <Users size={16} className="text-slate-500" />
                      <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-base">
                        {paper.authors.map((author, i) => (
                          <span key={i} className={author === 'Arpan Pramanik' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}>
                            {author}{i < paper.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    {/* Conference/Journal */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-base">
                      <BookOpen size={14} className="text-slate-500" />
                      <p className="text-slate-600 dark:text-slate-400 font-semibold">
                        {paper.conference} • {paper.journal}
                      </p>
                    </div>
                    {/* Abstract */}
                    <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed line-clamp-3 text-xs sm:text-base">
                      {paper.abstract}
                    </p>
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {paper.keywords.slice(0, 5).map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                      {paper.keywords.length > 5 && (
                        <span className="px-2 py-1 sm:px-3 sm:py-1 text-slate-500 text-xs font-medium">
                          +{paper.keywords.length - 5} more
                        </span>
                      )}
                    </div>
                    {/* Results Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {Object.entries(paper.results).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">{value}</div>
                          <div className="text-[11px] sm:text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                      {paper.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={paper.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-xs sm:text-sm font-semibold"
                        >
                          <Code2 size={16} />
                          Code
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPaper(paper)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors text-xs sm:text-sm font-semibold"
                      >
                        <FileText size={16} />
                        Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Research Paper Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPaper(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 max-w-full w-full sm:max-w-2xl rounded-none sm:rounded-2xl max-h-[100vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`sticky top-0 bg-gradient-to-br ${selectedPaper.color} px-4 py-5 sm:p-8 z-10`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-4xl sm:text-7xl">{selectedPaper.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-3">
                      {selectedPaper.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2 items-center mb-2">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/90 text-slate-700 text-xs sm:text-sm rounded-full font-bold">
                        {selectedPaper.year}
                      </span>
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full font-bold ${
                        selectedPaper.status === 'Published' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {selectedPaper.status}
                      </span>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm rounded-full font-semibold">
                        {selectedPaper.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-4 py-5 sm:p-8">
                {/* Authors */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <Users size={18} className="text-blue-500" />
                    Authors
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedPaper.authors.map((author) => (
                      <span
                        key={author}
                        className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg font-semibold text-xs sm:text-base ${
                          author === 'Arpan Pramanik'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-green-500" />
                    Abstract
                  </h4>
                  <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedPaper.abstract}
                  </p>
                </div>

                {/* Methodology */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <Target size={18} className="text-purple-500" />
                    Methodology
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {selectedPaper.methodology}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <Award size={18} className="text-yellow-500" />
                    Key Results
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {Object.entries(selectedPaper.results).map(([key, value]) => (
                      <div key={key} className="p-2 sm:p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{value}</div>
                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-orange-500" />
                    Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedPaper.keywords.map((keyword) => (
                      <motion.span
                        key={keyword}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs sm:text-sm font-medium"
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {selectedPaper.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedPaper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold text-xs sm:text-base"
                    >
                      <Code2 size={20} />
                      View Code
                    </motion.a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPaper(null)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors font-semibold text-xs sm:text-base"
                  >
                    Close
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

export default Research
