import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Award, Calendar, Building, Sparkles, TrendingUp, CheckCircle, ChevronDown } from 'lucide-react'
import { certificatesData } from '../data/certificates'

const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showAll, setShowAll] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    certifications: 0,
    hours: 0,
    institutions: 0,
    completed: 0
  })

  // Animate stats counters
  useEffect(() => {
    if (!isInView) return

    const targetStats = {
      certifications: certificatesData.length,
      hours: 200,
      institutions: 4,
      completed: 100
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        certifications: Math.floor(targetStats.certifications * progress),
        hours: Math.floor(targetStats.hours * progress),
        institutions: Math.floor(targetStats.institutions * progress),
        completed: Math.floor(targetStats.completed * progress)
      })

      if (currentStep >= steps) {
        setAnimatedStats(targetStats)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isInView])

  const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 2)

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
    <section id="certificates" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Animated Floating Background Elements - Transparent */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-3 dark:opacity-5"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-3xl" />
      </motion.div>
      
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-3 dark:opacity-5"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-3 dark:opacity-5"
      >
        <Award size={200} className="text-yellow-500" />
      </motion.div>

      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-3 dark:opacity-5"
      >
        <Sparkles size={150} className="text-orange-500" />
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
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold">
                Professional Development
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Certificates & Training
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Professional certifications and intensive training programs in cutting-edge technologies
            </p>
          </div>

          {/* Certificate Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Certifications', value: animatedStats.certifications, suffix: '', icon: '🏆', color: 'from-yellow-500 to-orange-500' },
              { label: 'Training Hours', value: animatedStats.hours, suffix: '+', icon: '⏱️', color: 'from-blue-500 to-cyan-500' },
              { label: 'Institutions', value: animatedStats.institutions, suffix: '', icon: '🏛️', color: 'from-purple-500 to-pink-500' },
              { label: 'Completed', value: animatedStats.completed, suffix: '%', icon: '✅', color: 'from-green-500 to-teal-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="bg-gradient-to-br from-white to-yellow-50/50 dark:from-slate-800 dark:to-yellow-900/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl text-center border border-yellow-200/50 dark:border-yellow-700/30 transition-shadow relative overflow-hidden group"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                />
                
                <motion.div 
                  className="text-4xl mb-3 relative z-10"
                  animate={isInView ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 font-mono tabular-nums relative z-10`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="group relative bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl border-l-4 border-blue-500 transition-all overflow-hidden"
              >
                {/* Background gradient on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0], 
                        scale: 1.15,
                        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                      }}
                      className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:shadow-2xl transition-shadow"
                    >
                      {cert.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors leading-tight">
                        {cert.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-semibold">
                        {cert.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Issuer and Date */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Building size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm font-medium">{cert.issuer}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Calendar size={16} className="text-purple-500" />
                      </div>
                      <span className="text-sm font-medium">{cert.date}</span>
                    </div>
                  </div>

                  {/* Completion Badge */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle size={20} className="fill-current" />
                      <span className="text-sm font-bold">Certificate Earned</span>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />
              </motion.div>
            ))}
          </div>

          {/* View More/Less Button */}
          {certificatesData.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex justify-center mt-12"
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  {showAll ? (
                    <>
                      Show Less
                      <motion.div
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      View All Certificates ({certificatesData.length})
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* Timeline View - Optional Alternative */}
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 flex items-center justify-center gap-3"
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="text-blue-500" size={32} />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Learning Journey Timeline
                </span>
              </motion.h3>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 hidden md:block" />

              <div className="space-y-12">
                {certificatesData.map((cert, index) => (
                  <motion.div
                    key={`timeline-${cert.id}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + index * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <motion.div 
                      className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="inline-block bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/20 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:shadow-xl border border-blue-200 dark:border-slate-700 transition-all group">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{cert.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 justify-center md:justify-start">
                          <Calendar size={14} className="text-purple-500" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.15,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        scale: 1.5,
                        transition: { duration: 0.2 }
                      }}
                      className="relative z-10 w-5 h-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg cursor-pointer"
                    />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: 1,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="mt-20 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ 
                delay: 1.2,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="inline-block p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl border border-yellow-200 dark:border-yellow-700/30"
            >
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6 max-w-md">
                Continuously upskilling in emerging technologies and industry best practices
              </p>
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="inline-block"
              >
                <Award className="text-yellow-500 drop-shadow-lg" size={56} />
              </motion.div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 font-medium">
                🚀 Always Learning, Always Growing
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
