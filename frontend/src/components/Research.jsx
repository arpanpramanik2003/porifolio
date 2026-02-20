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
    <section id="research" className="pt-12 pb-20 relative overflow-hidden">
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
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
              className="text-slate-600 dark:text-slate-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg px-2"
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
              { label: 'Co-authors', value: '7', icon: '👥', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
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
                className={`bg-gradient-to-br ${stat.bg} p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl text-center border-2 border-white/50 dark:border-slate-700/50 cursor-pointer relative overflow-hidden group`}
              >
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
                className="bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl border-2 border-slate-200/50 dark:border-slate-600/50 cursor-pointer relative overflow-hidden group"
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
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Category accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${selectedPaper.color} flex-shrink-0`} />

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1">

                {/* ── Hero: text-only header ── */}
                <div className="relative px-6 pt-8 pb-6 sm:px-8 sm:pt-9 sm:pb-7 bg-white dark:bg-slate-900">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/40 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:rotate-90"
                    title="Close"
                  >
                    <X size={18} />
                  </button>

                  {/* Top meta row: category + year + status */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 pr-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${selectedPaper.color} shadow-sm`}>
                      <BookOpen size={11} />
                      {selectedPaper.category}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold">
                      📅 {selectedPaper.year}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      selectedPaper.status === 'Published'
                        ? 'bg-emerald-500'
                        : selectedPaper.status === 'Completed'
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                    }`}>
                      {selectedPaper.status === 'Published' ? '✓' : selectedPaper.status === 'Completed' ? '✔' : '⏳'} {selectedPaper.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                    {selectedPaper.title}
                  </h3>

                  {/* Venue */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <BookOpen size={14} className="flex-shrink-0" />
                    <span className="font-semibold">{selectedPaper.journal}</span>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div className="mx-6 sm:mx-8 border-t border-slate-100 dark:border-slate-800" />

                {/* ── Authors ── */}
                <div className="px-6 pt-6 pb-0 sm:px-8 sm:pt-7">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex-shrink-0">
                      <Users size={13} className="text-blue-500" />
                    </span>
                    Authors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.authors.map((author) => (
                      <span
                        key={author}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          author === 'Arpan Pramanik'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {author === 'Arpan Pramanik' ? '★ ' : ''}{author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Abstract + Methodology two-col ── */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/40 flex-shrink-0">
                        <FileText size={13} className="text-green-500" />
                      </span>
                      Abstract
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {selectedPaper.abstract}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex-shrink-0">
                        <Target size={13} className="text-purple-500" />
                      </span>
                      Methodology
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {selectedPaper.methodology}
                    </p>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div className="mx-6 sm:mx-8 border-t border-slate-100 dark:border-slate-800" />

                {/* ── Results + Keywords two-col ── */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 grid sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Key Results */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-yellow-100 dark:bg-yellow-900/40 flex-shrink-0">
                        <Award size={13} className="text-yellow-500" />
                      </span>
                      Key Results
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedPaper.results).map(([key, value]) => (
                        <div key={key} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                          <div className="text-base font-bold text-blue-600 dark:text-blue-400 mb-0.5">{value}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize leading-tight">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex-shrink-0">
                        <Sparkles size={13} className="text-orange-500" />
                      </span>
                      Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPaper.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-default"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── DOI ── */}
                {selectedPaper.doi && (
                  <>
                    <div className="mx-6 sm:mx-8 border-t border-slate-100 dark:border-slate-800" />
                    <div className="px-6 py-5 sm:px-8 sm:py-6">
                      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Award size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Digital Object Identifier (DOI)</div>
                          <a
                            href={`https://doi.org/${selectedPaper.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all"
                          >
                            {selectedPaper.doi}
                          </a>
                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Click to open on publisher's website</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ── Divider ── */}
                <div className="mx-6 sm:mx-8 border-t border-slate-100 dark:border-slate-800" />

                {/* ── Action Buttons ── */}
                <div className="px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row gap-3">
                  {selectedPaper.github && (
                    <motion.a
                      whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.25)' }}
                      whileTap={{ scale: 0.97 }}
                      href={selectedPaper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-sm transition-all shadow-md"
                    >
                      <Code2 size={18} className="text-white" />
                      <span className="text-white">View Source Code</span>
                    </motion.a>
                  )}
                  {selectedPaper.doi && (
                    <motion.a
                      whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(79,70,229,0.45)' }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://doi.org/${selectedPaper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-sm transition-all shadow-md border border-indigo-500"
                    >
                      <ExternalLink size={18} className="text-white" />
                      <span className="text-white">View Publication</span>
                    </motion.a>
                  )}
                  {!selectedPaper.doi && !selectedPaper.github && (
                    <div className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-slate-200 dark:bg-slate-700/50 text-slate-400 dark:text-slate-600 rounded-xl font-semibold text-sm cursor-default border border-dashed border-slate-300 dark:border-slate-700">
                      <FileText size={18} />
                      Under Review
                    </div>
                  )}
                </div>

              </div>{/* end scrollable */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Research
