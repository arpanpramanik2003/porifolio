import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, Sparkles, Clock, ChevronRight } from 'lucide-react'
import { experienceData } from '../data/experience'
import useIsMobile from '../hooks/useIsMobile'

const ExperienceCard = ({ exp, index, shouldReduceMotion }) => {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.25 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      {/* Timeline connector (desktop) */}
      <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-10 flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={cardInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.12, type: 'spring', stiffness: 300 }}
          className="relative z-10 w-4 h-4 mt-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-[3px] border-white dark:border-slate-900 shadow-lg"
        >
          {!shouldReduceMotion && (
            <motion.div
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
              className="absolute inset-0 rounded-full bg-blue-400"
            />
          )}
        </motion.div>
        {/* Vertical line */}
        {index < experienceData.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={cardInView ? { height: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12 }}
            className="w-0.5 flex-1 bg-gradient-to-b from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 opacity-30"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="md:ml-14 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="p-6 sm:p-7">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-1.5">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-base">
                <Briefcase size={16} className="flex-shrink-0" />
                <span className="truncate">{exp.company}</span>
              </div>
            </div>
            <span className="flex-shrink-0 px-3.5 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
              {exp.type}
            </span>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
              <Calendar size={13} className="text-blue-500" />
              {exp.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
              <Clock size={13} className="text-purple-500" />
              {exp.period}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
              <MapPin size={13} className="text-pink-500" />
              {exp.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
            {exp.description}
          </p>

          {/* Key Highlights */}
          {exp.highlights && (
            <div className="mb-5">
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                <span className="flex items-center justify-center w-5 h-5 rounded bg-yellow-100 dark:bg-yellow-900/40 flex-shrink-0">
                  <Sparkles size={10} className="text-yellow-500" />
                </span>
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {exp.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={cardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {exp.skills && (
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                <span className="flex items-center justify-center w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/40 flex-shrink-0">
                  <Briefcase size={10} className="text-purple-500" />
                </span>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + si * 0.04 }}
                    whileHover={{ y: -3, scale: 1.05, transition: { duration: 0.15 } }}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { shouldReduceMotion } = useIsMobile()

  const totalTech = [...new Set(experienceData.flatMap(e => e.skills || []))].length

  const quickStats = [
    { label: 'Total Duration', value: '6+ Months', icon: '⏱️', color: 'from-blue-500 to-cyan-500' },
    { label: 'Internships', value: experienceData.length, icon: '💼', color: 'from-purple-500 to-pink-500' },
    { label: 'Technologies', value: `${totalTech}+`, icon: '🚀', color: 'from-green-500 to-teal-500' }
  ]

  return (
    <section id="experience" className="pt-12 pb-20 relative overflow-hidden">
      {/* Subtle background blobs — hidden on mobile for performance */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-500/5 rounded-full blur-3xl pointer-events-none hidden md:block" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-500/10 dark:from-purple-400/5 dark:to-pink-500/5 rounded-full blur-3xl pointer-events-none hidden md:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* ── Section Header ── */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Professional Journey
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Experience & Training
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Hands-on experience through internships and intensive training programs
            </motion.p>
          </div>

          {/* ── Quick Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-3 gap-4 mb-14 max-w-xl mx-auto"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="relative bg-white dark:bg-slate-800/80 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.06] transition-opacity pointer-events-none`} />
                <span className="text-xl block mb-1">{stat.icon}</span>
                <div className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Timeline Cards ── */}
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-14 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Continuously gaining experience and expanding my skill set 🚀
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

export default Experience
