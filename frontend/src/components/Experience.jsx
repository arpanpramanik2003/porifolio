import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, Sparkles, TrendingUp, Award } from 'lucide-react'
import { experienceData } from '../data/experience'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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
    <section id="experience" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Animated Floating Background Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-3 dark:opacity-5"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl blur-3xl" />
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-3 dark:opacity-5"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-3 dark:opacity-5"
      >
        <Briefcase size={200} className="text-green-500" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-3 dark:opacity-5"
      >
        <Award size={150} className="text-blue-500" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold">
                Professional Journey
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Experience & Training
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Hands-on experience through internships and intensive training programs
            </p>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {[
              { label: 'Total Experience', value: '6+ Months', icon: '⏱️', color: 'from-blue-500 to-cyan-500' },
              { label: 'Internships', value: experienceData.length, icon: '💼', color: 'from-green-500 to-teal-500' },
              { label: 'Technologies', value: '10+', icon: '🚀', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-slate-200 dark:border-slate-600"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Enhanced */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full hidden md:block opacity-30" />

            <div className="space-y-12">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline Dot - Enhanced */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                    className="absolute left-6 top-6 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-800 hidden md:block shadow-lg z-10"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute inset-0 bg-blue-500 rounded-full"
                    />
                  </motion.div>

                  {/* Content Card - Enhanced */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10, y: -5 }}
                    className="md:ml-20 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-600 group"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div className="flex-1 mb-3 md:mb-0">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-xl text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                          <Briefcase size={20} />
                          {exp.company}
                        </p>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full font-bold shadow-md">
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                        <Calendar size={18} className="text-blue-500" />
                        <span className="font-semibold">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                        <MapPin size={18} className="text-green-500" />
                        <span className="font-semibold">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                      {exp.description}
                    </p>

                    {/* Skills Tags */}
                    {exp.skills && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Sparkles size={16} className="text-yellow-500" />
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.6 + index * 0.1 + skillIndex * 0.05 }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 text-blue-600 dark:text-blue-400 text-sm rounded-lg font-semibold border border-blue-200 dark:border-slate-600 shadow-sm"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
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
              <TrendingUp className="text-green-500 mx-auto mb-4" size={48} />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Continuously gaining experience and expanding my skill set
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
