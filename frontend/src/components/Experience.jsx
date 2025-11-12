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
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Floating Background Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-10 dark:opacity-5"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl" />
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-10 dark:opacity-5"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-5 dark:opacity-3"
      >
        <Briefcase size={200} className="text-blue-500" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-5 dark:opacity-3"
      >
        <Award size={150} className="text-purple-500" />
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
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold shadow-lg">
                Professional Journey
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Experience & Training
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
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
            >
              Hands-on experience through internships and intensive training programs
            </motion.p>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {[
              { label: 'Total Experience', value: '6+ Months', icon: '⏱️', color: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
              { label: 'Internships', value: experienceData.length, icon: '💼', color: 'from-purple-500 to-pink-500', bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' },
              { label: 'Technologies', value: '10+', icon: '🚀', color: 'from-indigo-500 to-purple-500', bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20' }
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
                className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl text-center border-2 border-white/50 dark:border-slate-700/50 cursor-pointer relative overflow-hidden group`}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <motion.div 
                  className="text-5xl mb-3 relative z-10"
                  animate={{ 
                    rotate: isInView ? [0, 10, -10, 0] : 0,
                    scale: isInView ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    delay: 0.8 + index * 0.15,
                    duration: 0.5
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 relative z-10`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-semibold relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Enhanced */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: '100%', opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full hidden md:block shadow-lg"
            />

            <div className="space-y-12">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 40 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="relative"
                >
                  {/* Timeline Dot - Enhanced */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      delay: 1.2 + index * 0.15, 
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute left-6 top-6 w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-900 hidden md:block shadow-2xl z-10"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"
                    />
                  </motion.div>

                  {/* Content Card - Enhanced */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.02, 
                      x: 10, 
                      y: -6,
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                    className="md:ml-20 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-700 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-200/50 dark:border-slate-600/50 group relative overflow-hidden"
                  >
                    {/* Animated background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    />

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4 relative z-10">
                      <div className="flex-1 mb-3 md:mb-0">
                        <motion.h3 
                          className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all"
                          whileHover={{ x: 5 }}
                        >
                          {exp.title}
                        </motion.h3>
                        <p className="text-xl text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                            <Briefcase size={20} />
                          </motion.div>
                          {exp.company}
                        </p>
                      </div>
                      <motion.span 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm rounded-full font-bold shadow-lg"
                      >
                        {exp.type}
                      </motion.span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-slate-600 dark:text-slate-300 relative z-10">
                      <motion.div 
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-4 py-2 rounded-lg shadow-sm border border-blue-200/50 dark:border-blue-700/50"
                      >
                        <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{exp.duration}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-lg shadow-sm border border-purple-200/50 dark:border-purple-700/50"
                      >
                        <MapPin size={18} className="text-purple-600 dark:text-purple-400" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{exp.location}</span>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-base relative z-10">
                      {exp.description}
                    </p>

                    {/* Skills Tags */}
                    {exp.skills && (
                      <div className="relative z-10">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles size={16} className="text-yellow-500" />
                          </motion.div>
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8, y: 20 }}
                              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                              transition={{ 
                                delay: 1.3 + index * 0.15 + skillIndex * 0.05,
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              whileHover={{ 
                                scale: 1.08, 
                                y: -4,
                                transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded-lg font-semibold border border-slate-300 dark:border-slate-500 shadow-md hover:shadow-lg hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer transition-all"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Decorative corner accent */}
                    <motion.div 
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
            className="mt-16 text-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block"
            >
              <TrendingUp className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mx-auto mb-4" size={56} strokeWidth={3} />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.7 }}
              className="text-slate-700 dark:text-slate-300 text-lg font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 py-4 px-6 rounded-xl inline-block"
            >
              Continuously gaining experience and expanding my skill set 🚀
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
