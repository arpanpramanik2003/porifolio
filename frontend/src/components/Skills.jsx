import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Sparkles, TrendingUp, Search, Code, CheckCircle, Database, Cpu, Wrench } from 'lucide-react'
import { skillsData } from '../data/skills'

/* ── Interactive Statistics Counter ── */
const Counter = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    let start = 0
    const endNum = parseInt(end, 10)
    if (isNaN(endNum)) {
      setCount(end)
      return
    }
    const step = endNum / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= endNum) {
        if (isMounted.current) setCount(endNum)
        clearInterval(timer)
      } else {
        if (isMounted.current) setCount(Math.floor(start))
      }
    }, 16)

    return () => {
      isMounted.current = false
      clearInterval(timer)
    }
  }, [end, duration])

  return <>{count}</>
}

/* ──────────────────────────────────────────────
 *  Skill Tag Component
 * ────────────────────────────────────────────── */
const SkillTag = ({ skill, categoryColor, delay, isSearched }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.3, ease: 'easeOut' }}
    whileHover={{
      y: -3,
      scale: 1.05,
      transition: { duration: 0.12 }
    }}
    className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-default max-w-full overflow-hidden`}
    style={{
      background: 'var(--bg-card)',
      border: isSearched 
        ? '1.5.px solid var(--accent)' 
        : '1px solid var(--border)',
      boxShadow: isSearched 
        ? '0 0 12px var(--neon-glow)' 
        : 'none'
    }}
  >
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200 pointer-events-none`} />
    {skill.logo ? (
      <img src={skill.logo} alt="" className="w-5 h-5 object-contain flex-shrink-0 relative z-10" />
    ) : (
      <span className="text-base relative z-10 flex-shrink-0">{skill.icon}</span>
    )}
    <span className="text-xs sm:text-sm font-semibold relative z-10 truncate" style={{ color: 'var(--text-secondary)' }}>
      {skill.name}
    </span>
  </motion.div>
)

/* ──────────────────────────────────────────────
 *  Category Card Component
 * ────────────────────────────────────────────── */
const CategoryCard = ({ category, index, searchQuery }) => {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.15 })

  // Highlight skills that match the search query
  const skillsToRender = useMemo(() => {
    return category.skills.map((skill) => {
      const isSearched = searchQuery
        ? skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false
      return { ...skill, isSearched }
    })
  }, [category.skills, searchQuery])

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group rounded-2xl p-5 overflow-hidden transition-all duration-300 neon-card"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${category.color}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <motion.span
            className="text-2xl sm:text-3xl"
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {category.icon}
          </motion.span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
              {category.category}
            </h3>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
              {category.skills.length} Technologies
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skillsToRender.map((skill, si) => (
            <SkillTag
              key={skill.name}
              skill={skill}
              categoryColor={category.color}
              delay={0.03 * si}
              isSearched={skill.isSearched}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
 *  Skills Section
 * ────────────────────────────────────────────── */
const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [showAllMobile, setShowAllMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSkills = useMemo(() => {
    return skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)
  }, [])

  // Filters categories based on tab toggle
  const filteredCategories = useMemo(() => {
    let list = skillsData

    if (selectedFilter === 'Development') {
      list = skillsData.filter(cat => 
        ['Frontend Development', 'Backend Development', 'Databases'].includes(cat.category)
      )
    } else if (selectedFilter === 'AI / ML') {
      list = skillsData.filter(cat => 
        ['AI / ML & Deep Learning', 'Programming Languages'].includes(cat.category)
      )
    } else if (selectedFilter === 'DevOps & Tools') {
      list = skillsData.filter(cat => 
        ['Cloud & DevOps', 'Tools & Productivity', 'Specialized Skills'].includes(cat.category)
      )
    }

    // Filter categories that match search query if query exists
    if (searchQuery) {
      list = list.filter(cat => 
        cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return list
  }, [selectedFilter, searchQuery])

  // Restrict to 3 elements on mobile if collapse is active
  const categoriesToRender = useMemo(() => {
    if (isMobile && !showAllMobile) {
      return filteredCategories.slice(0, 3)
    }
    return filteredCategories
  }, [filteredCategories, isMobile, showAllMobile])

  const quickStats = [
    { label: 'Total Skills', value: totalSkills, suffix: '+', icon: Code, color: 'var(--accent)' },
    { label: 'Categories', value: skillsData.length, suffix: '', icon: CheckCircle, color: 'var(--accent-secondary)' },
    { label: 'Languages', value: 5, suffix: '+', icon: Cpu, color: 'var(--accent-tertiary)' },
    { label: 'Frameworks', value: 12, suffix: '+', icon: Database, color: 'var(--accent-warm)' }
  ]

  return (
    <section id="skills" className="pt-16 pb-20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-10 opacity-5 dark:opacity-[0.03] pointer-events-none">
        <TrendingUp size={200} style={{ color: 'var(--accent-secondary)' }} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 dark:opacity-[0.03] pointer-events-none">
        <Sparkles size={250} style={{ color: 'var(--accent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                Technical Expertise
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Skills & Technologies
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full neon-line mb-4"
            />
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Explore my technical stack across full-stack development, machine learning, and developer tools
            </p>
          </div>

          {/* ── Stats Dashboard Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {quickStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl p-5 shadow-sm transition-all duration-200 neon-card flex items-center gap-4 cursor-default"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,0,0,0.05)', color: stat.color, border: '1px solid var(--border)' }}
                  >
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-2xl font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
                      <Counter end={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Search & Filter Controls Toolbar ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
              {['All', 'Development', 'AI / ML', 'DevOps & Tools'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                  style={{
                    background: selectedFilter === filter ? 'var(--gradient-accent)' : 'var(--bg-card)',
                    color: selectedFilter === filter ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                    border: selectedFilter === filter ? '1px solid transparent' : '1px solid var(--border)',
                    boxShadow: selectedFilter === filter ? '0 0 15px var(--neon-glow)' : 'none',
                    fontWeight: 700
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search stack (e.g. React, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all font-semibold"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              />
            </div>
          </div>

          {/* ── Dynamic Category Cards Grid ── */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="popLayout">
              {categoriesToRender.length > 0 ? (
                <motion.div key="skills-active-container" className="w-full">
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {categoriesToRender.map((category, index) => (
                      <CategoryCard
                        key={category.category}
                        category={category}
                        index={index}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </motion.div>

                  {isMobile && filteredCategories.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center"
                    >
                      <button
                        onClick={() => setShowAllMobile(!showAllMobile)}
                        className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all focus:outline-none neon-pill shadow-sm"
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          color: 'var(--accent)',
                        }}
                      >
                        {showAllMobile ? 'Show Less' : `View More (+${filteredCategories.length - 3} categories)`}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 rounded-3xl"
                  style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)' }}
                >
                  <Cpu size={48} className="mx-auto mb-3 text-slate-400" />
                  <p className="text-base font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    No matching skills or technologies found
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Try searching with another name or check your categorization filters
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-14 text-center"
          >
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4 text-sm sm:text-base font-semibold">
              Always expanding my repertoire with newer technologies and practices
            </p>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Sparkles style={{ color: 'var(--accent-secondary)' }} size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
