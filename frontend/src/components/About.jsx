import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Briefcase, Award, Code2, Heart, Sparkles } from 'lucide-react'
import { aboutData } from '../data/about'
import { personalInfo } from '../data/personalInfo'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Icon mapping
  const iconMap = {
    GraduationCap: GraduationCap,
    MapPin: MapPin,
    Briefcase: Briefcase,
    Award: Award
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-10 right-10 text-blue-500/5 dark:text-blue-500/10">
        <Code2 size={300} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Get to know me
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content with Animations */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {aboutData.intro.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Interests Section */}
              <motion.div
                variants={itemVariants}
                className="pt-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="text-red-500" size={24} />
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {aboutData.interests.map((interest, index) => (
                    <motion.span
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium shadow-sm"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Info Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-4"
            >
              {aboutData.cards.map((card, index) => {
                const IconComponent = iconMap[card.icon]
                return (
                  <motion.div
                    key={card.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? 2 : -2,
                      transition: { duration: 0.3 }
                    }}
                    className={`p-6 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group`}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />

                    {/* Icon with Glow Effect */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 mb-4"
                    >
                      <div className={`inline-flex p-3 ${card.iconColor} bg-white dark:bg-slate-800 rounded-lg shadow-md`}>
                        <IconComponent size={28} />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        {card.title}
                        {card.id === 1 && <Sparkles size={16} className="text-yellow-500" />}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 font-semibold mb-1">
                        {card.primary}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">
                        {card.secondary}
                      </p>
                      {card.tertiary && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          {card.tertiary}
                        </p>
                      )}
                      {card.duration && (
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium">
                          {card.duration}
                        </p>
                      )}
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-2xl" />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <motion.a
              href={personalInfo.resume}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              style={{ color: 'white' }} // Force white color
            >
              <GraduationCap size={24} className="text-white" />
              <span className="text-white">Download Full Resume</span>
            </motion.a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default About
