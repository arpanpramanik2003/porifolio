import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FileText, ExternalLink, Award, Users, Calendar, Code2, Sparkles, BookOpen, Target, X } from 'lucide-react'
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
    <section id="research" className="py-20 relative overflow-hidden">
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
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold shadow-lg">
                Academic Contributions
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Research & Publications
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-4 shadow-lg"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-slate-300 dark:text-slate-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg px-2"
            >
              Exploring the intersection of AI/ML and agriculture through cutting-edge research
            </motion.p>
          </div>

          {/* Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-12 sm:mb-16"
          >
            {[
              { label: 'Publications', value: researchData.length, icon: '📄', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
              { label: 'Under Progress', value: researchData.filter(p => p.status === 'Under Progress').length, icon: '⏳', color: 'from-yellow-500 to-orange-500', bg: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' },
              { label: 'Co-authors', value: '3', icon: '👥', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
              { label: 'Research Areas', value: '3', icon: '🎯', color: 'from-green-500 to-teal-500', bg: 'from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 0.6 + index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl text-center border-2 border-white/50 dark:border-slate-700/50 cursor-pointer relative overflow-hidden group`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <motion.div 
                  className="text-2xl sm:text-4xl mb-2 sm:mb-3 relative z-10"
                  animate={{ 
                    rotate: isInView ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    duration: 0.5
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2 relative z-10`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold relative z-10">
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
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.5, 
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border-2 border-slate-200/50 dark:border-slate-600/50 cursor-pointer relative overflow-hidden group"
                onClick={() => setSelectedPaper(paper)}
              >
                {/* Animated shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
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
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight hover:text-blue-500 transition-colors">
                      {paper.title}
                    </h3>
                    
                    {/* Authors */}
                    <div className="flex items-start gap-2 mb-3 flex-wrap">
                      <Users size={16} className="text-slate-500 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm">
                        {paper.authors.map((author, i) => (
                          <span key={i} className={author === 'Arpan Pramanik' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}>
                            {author}{i < paper.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    
                    {/* Conference/Journal & Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-slate-500 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">
                          {paper.journal}
                        </span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md font-semibold">
                        {paper.year}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md font-semibold">
                        {paper.category}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                        paper.status === 'Published' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : paper.status === 'Completed'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {paper.status}
                      </span>
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
                    {/* DOI Number */}
                    {paper.doi && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium mb-0.5">DOI Number</div>
                            <a
                              href={`https://doi.org/${paper.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] sm:text-sm font-mono text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all"
                            >
                              {paper.doi}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full relative z-10">
                      {paper.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={paper.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-700 dark:to-slate-900 text-white rounded-lg hover:from-slate-800 hover:to-black transition-all shadow-md text-xs sm:text-sm font-semibold"
                        >
                          <Code2 size={16} />
                          Code
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPaper(paper)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 transition-all shadow-md text-xs sm:text-sm font-semibold"
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
              className="bg-white dark:bg-slate-800 max-w-full w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl max-h-[100vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close button - Fixed position */}
              <button
                onClick={() => setSelectedPaper(null)}
                className="absolute top-4 right-4 text-white bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm p-2.5 rounded-full transition-all hover:scale-110 z-30 shadow-lg"
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className={`sticky top-0 bg-gradient-to-br ${selectedPaper.color} px-4 py-5 sm:p-8 z-10 rounded-t-3xl sm:rounded-t-2xl`}>
                <div className="flex items-start gap-3 sm:gap-4 pr-12">
                  <span className="text-4xl sm:text-7xl">{selectedPaper.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight break-words">
                      {selectedPaper.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-white/90 text-slate-900 text-xs sm:text-sm rounded-md font-semibold whitespace-nowrap">
                        {selectedPaper.year}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">•</span>
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-purple-500 text-white text-xs sm:text-sm rounded-md font-semibold whitespace-nowrap">
                        {selectedPaper.category}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">•</span>
                      <span className={`px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-md font-semibold whitespace-nowrap ${
                        selectedPaper.status === 'Published' 
                          ? 'bg-green-500 text-white'
                          : selectedPaper.status === 'Completed'
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {selectedPaper.status}
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

                {/* DOI Number */}
                {selectedPaper.doi && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Award size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold mb-2">Digital Object Identifier (DOI)</div>
                        <a
                          href={`https://doi.org/${selectedPaper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-mono text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all block"
                        >
                          {selectedPaper.doi}
                        </a>
                        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Click to view on publisher's website</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {selectedPaper.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedPaper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg hover:from-slate-800 hover:to-black transition-all font-semibold text-xs sm:text-base shadow-lg"
                    >
                      <Code2 size={20} />
                      View Code
                    </motion.a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPaper(null)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold text-xs sm:text-base shadow-lg"
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
