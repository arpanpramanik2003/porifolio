import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-8 right-8 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  )
}

export default ThemeToggle
