import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Calendar, Building, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import { certificatesData } from '../data/certificates'

const Certificates = () => {
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Certifications', value: certificatesData.length, icon: '🏆', color: 'from-yellow-500 to-orange-500' },
              { label: 'Training Hours', value: '200+', icon: '⏱️', color: 'from-blue-500 to-cyan-500' },
              { label: 'Institutions', value: '4', icon: '🏛️', color: 'from-purple-500 to-pink-500' },
              { label: 'Completed', value: '100%', icon: '✅', color: 'from-green-500 to-teal-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-slate-200 dark:border-slate-700"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl border-l-4 border-blue-500 transition-all overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-lg"
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

          {/* Timeline View - Optional Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8 flex items-center justify-center gap-3">
              <TrendingUp className="text-blue-500" size={28} />
              Learning Journey Timeline
            </h3>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 hidden md:block" />

              <div className="space-y-12">
                {certificatesData.map((cert, index) => (
                  <motion.div
                    key={`timeline-${cert.id}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="inline-block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{cert.date}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="relative z-10 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"
                    />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Continuously upskilling in emerging technologies
            </p>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block"
            >
              <Award className="text-yellow-500" size={48} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
