import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Sparkles, TrendingUp, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { skillsData } from '../data/skills'

const SkillTag = ({ skill, categoryColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{
      y: -4,
      scale: 1.06,
      transition: { duration: 0.15 }
    }}
    className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-default"
  >
    {/* Glow on hover */}
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none`} />
    <span className="text-lg relative z-10">{skill.icon}</span>
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 relative z-10 whitespace-nowrap">
      {skill.name}
    </span>
  </motion.div>
)

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative group bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar — gradient from category color */}
      <div className={`h-1 w-full bg-gradient-to-r ${category.color}`} />

      {/* Subtle background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10 p-6">
        {/* Header row */}
        <div className="flex items-center gap-3 mb-5">
          <motion.span
            className="text-3xl"
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {category.icon}
          </motion.span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {category.category}
            </h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {category.skills.length} technologies
            </span>
          </div>
        </div>

        {/* Skill tags — flow grid */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, si) => (
            <SkillTag
              key={skill.name}
              skill={skill}
              categoryColor={category.color}
              delay={0.05 * si}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showAll, setShowAll] = useState(false)

  const displayedSkills = showAll ? skillsData : skillsData.slice(0, 4)
  const hasMore = skillsData.length > 4

  const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)

  const quickStats = [
    { label: 'Total Skills', value: totalSkills, icon: '🎯', color: 'from-blue-500 to-cyan-500' },
    { label: 'Categories', value: skillsData.length, icon: '📂', color: 'from-purple-500 to-pink-500' },
    { label: 'Frameworks', value: '12+', icon: '⚙️', color: 'from-green-500 to-teal-500' },
    { label: 'Cloud Platforms', value: '6+', icon: '☁️', color: 'from-sky-500 to-blue-500' }
  ]

  return (
    <section id="skills" className="pt-12 pb-20 relative overflow-hidden">
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
          {/* ── Section Header ── */}
          <div className="text-center mb-14">
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

          {/* ── Quick Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="relative bg-white dark:bg-slate-800/80 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.06] transition-opacity pointer-events-none`} />
                <span className="text-2xl block mb-1">{stat.icon}</span>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Skill Category Cards Grid ── */}
          <AnimatePresence mode="sync">
            <motion.div
              layout
              className="grid sm:grid-cols-2 gap-6"
            >
              {displayedSkills.map((category, index) => (
                <CategoryCard
                  key={category.category}
                  category={category}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── View More / View Less ── */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={22} />
                    Show Less
                    <ChevronUp size={22} />
                  </>
                ) : (
                  <>
                    <ChevronDown size={22} />
                    View All {skillsData.length} Categories
                    <ChevronDown size={22} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-14 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-5">
              Constantly learning and expanding my skill set to stay ahead in tech
            </p>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Sparkles className="text-purple-500" size={28} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
