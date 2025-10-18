import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, ArrowDown, Code2, Sparkles } from 'lucide-react'
import { Link } from 'react-scroll'
import ParticleBackground from './ParticleBackground'
import { personalInfo } from '../data/personalInfo'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent z-0" />

      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 text-blue-400/20"
      >
        <Code2 size={80} />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        className="absolute bottom-20 right-10 text-purple-400/20"
      >
        <Sparkles size={60} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        {/* Profile Image - FIXED Clean Version */}
        <motion.div variants={imageVariants} className="mb-8">
          <div className="relative w-36 h-36 mx-auto">
            {/* Glowing Background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-xl"
            />

            {/* Rotating Border Container */}
            <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
              />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-900 bg-slate-900 z-10">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover relative z-20"
                />
              </div>
            </div>
          </div>
        </motion.div>


        {/* Greeting Text */}
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-blue-400 text-lg font-semibold tracking-wide">
            👋 Hello, I'm
          </span>
        </motion.div>

        {/* Animated Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {personalInfo.firstName}
          </span>
          <motion.span
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block ml-2 text-blue-400"
          >
            .
          </motion.span>
        </motion.h1>

        {/* Typing Animation for Roles */}
        <motion.div variants={itemVariants} className="mb-8">
          <TypeAnimation
            sequence={[
              'Full-Stack Developer 💻',
              2000,
              'AI/ML Enthusiast 🤖',
              2000,
              'CSE Student 🎓',
              2000,
              'Problem Solver 🚀',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-200"
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10"
        >
          {personalInfo.description}
        </motion.p>

        {/* CTA Buttons - FIXED positioning and responsiveness */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <Link to="projects" smooth duration={500}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Code2 size={20} />
                View Projects
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <motion.a
            href={personalInfo.resume}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links with Hover Effects */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-blue-500"
          >
            <Github size={28} />
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-blue-500"
          >
            <Linkedin size={28} />
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href={personalInfo.social.email}
            className="group relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-purple-500"
          >
            <Mail size={28} />
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        {/* Stats Cards - FIXED with bottom margin */}
        <motion.div
          variants={itemVariants}
          className="mt-16 mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'CGPA', value: '9.42', icon: '🎓' },
            { label: 'Projects', value: '10+', icon: '💻' },
            { label: 'Internships', value: '3', icon: '🚀' },
            { label: 'Certificates', value: '5+', icon: '🏆' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2 }, y: { repeat: Infinity, duration: 1.5 } }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <Link to="about" smooth duration={500} className="cursor-pointer">
          <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
            <span className="text-sm font-medium">Scroll Down</span>
            <ArrowDown size={32} />
          </div>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
