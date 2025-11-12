import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Sparkles, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { skillsData } from '../data/skills'

const AnimatedStatCard = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0)
  const statRef = useRef(null)
  const statInView = useInView(statRef, { once: true, amount: 0.5 })
  
  // Extract numeric value from stat.value (handles both numbers and strings like "85%")
  const targetValue = typeof stat.value === 'string' 
    ? parseInt(stat.value.replace(/\D/g, '')) 
    : stat.value
  
  useEffect(() => {
    if (statInView) {
      let start = 0
      const end = targetValue
      const duration = 2000
      const startTime = Date.now() + (index * 100)
      
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        if (elapsed < 0) return
        
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(start + (end - start) * easeOutQuart)
        
        setCount(current)
        
        if (progress === 1) {
          clearInterval(timer)
          setCount(end)
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [statInView, targetValue, index])

  return (
    <motion.div
      ref={statRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.7 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center border border-slate-200 dark:border-slate-700"
    >
      <motion.div 
        className="text-4xl mb-3"
        animate={{ rotate: statInView ? [0, 10, -10, 0] : 0 }}
        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
      >
        {stat.icon}
      </motion.div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 tabular-nums`}>
        {statInView ? count : 0}{typeof stat.value === 'string' && stat.value.includes('%') ? '%' : ''}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
        {stat.label}
      </div>
    </motion.div>
  )
}

const OverallStats = ({ isInView, skillsData }) => {
  const stats = [
    { label: 'Total Skills', value: skillsData.reduce((acc, cat) => acc + cat.skills.length, 0), icon: '🎯', color: 'from-blue-500 to-cyan-500' },
    { label: 'Categories', value: skillsData.length, icon: '📂', color: 'from-purple-500 to-pink-500' },
    { label: 'Avg Proficiency', value: `${Math.round(skillsData.reduce((acc, cat) => acc + cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length, 0) / skillsData.length)}%`, icon: '📊', color: 'from-green-500 to-teal-500' },
    { label: 'Expert Level', value: skillsData.reduce((acc, cat) => acc + cat.skills.filter(s => s.level >= 85).length, 0), icon: '⭐', color: 'from-orange-500 to-red-500' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <AnimatedStatCard 
          key={stat.label} 
          stat={stat} 
          index={index} 
          isInView={isInView}
        />
      ))}
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showAll, setShowAll] = useState(false) // New state

  // Show only first 4 categories initially
  const displayedSkills = showAll ? skillsData : skillsData.slice(0, 4)
  const hasMore = skillsData.length > 4

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const ProgressBar = ({ skill, delay }) => {
    const counterRef = useRef(null)
    const counterInView = useInView(counterRef, { once: true, amount: 0.5 })
    const [count, setCount] = useState(0)

    // Animate counter from 0 to skill.level
    useEffect(() => {
      if (counterInView) {
        let start = 0
        const end = skill.level
        const duration = 1500 // 1.5 seconds
        const startTime = Date.now() + (delay * 1000) // Add delay
        
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime
          if (elapsed < 0) return // Wait for delay
          
          const progress = Math.min(elapsed / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const current = Math.floor(start + (end - start) * easeOutQuart)
          
          setCount(current)
          
          if (progress === 1) {
            clearInterval(timer)
            setCount(end) // Ensure we end at exact value
          }
        }, 16) // ~60fps
        
        return () => clearInterval(timer)
      }
    }, [counterInView, skill.level, delay])

    return (
      <div ref={counterRef} className="mb-4 last:mb-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>{skill.icon}</span>
            {skill.name}
          </span>
          <motion.span 
            key={count}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: undefined }}
            className="text-sm font-bold text-slate-600 dark:text-slate-400 tabular-nums"
          >
            {counterInView ? count : 0}%
          </motion.span>
        </div>
        <div className="relative h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          >
            <motion.div
              animate={{
                x: [0, 10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 text-purple-500/5 dark:text-purple-500/10">
        <TrendingUp size={200} />
      </div>
      <div className="absolute bottom-20 right-10 text-blue-500/5 dark:text-blue-500/10">
        <Sparkles size={250} />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
                Technical Expertise
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            />
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              A comprehensive toolkit spanning full-stack development, AI/ML, and cloud technologies
            </p>
          </div>

          {/* Skills Grid with AnimatePresence */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="sync">
              {displayedSkills.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${category.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-600">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl"
                    >
                      {category.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {category.category}
                      </h3>
                      <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full mt-2`} />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <Sparkles className="text-yellow-500" size={24} />
                    </motion.div>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <ProgressBar
                        key={skill.name}
                        skill={skill}
                        delay={categoryIndex * 0.1 + skillIndex * 0.05}
                      />
                    ))}
                  </div>

                  {/* Category Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + categoryIndex * 0.1 }}
                    className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between items-center"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {category.skills.length} Skills
                    </span>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {Math.round(
                          category.skills.reduce((acc, skill) => acc + skill.level, 0) /
                            category.skills.length
                        )}% Avg
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More / View Less Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={24} />
                    Show Less Skills
                    <ChevronUp size={24} />
                  </>
                ) : (
                  <>
                    <ChevronDown size={24} />
                    View All {skillsData.length} Skill Categories
                    <ChevronDown size={24} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Overall Stats Section */}
          <OverallStats isInView={isInView} skillsData={skillsData} />

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Constantly learning and expanding my skill set to stay ahead in tech
            </p>
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block"
            >
              <Sparkles className="text-purple-500" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
