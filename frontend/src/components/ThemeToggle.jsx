import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-sm border-2 border-white/20"
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={24} className="drop-shadow-lg" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={24} className="drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.button>
  )
}

export default ThemeToggle
