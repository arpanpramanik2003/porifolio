import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Research', to: 'research' },
    { name: 'Contact', to: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-lg border-slate-200/50 dark:border-slate-700/50' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="hero" smooth duration={500} className="cursor-pointer">
            <motion.span 
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 dark:from-blue-500 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent"
            >
              arpanpramanik.dev
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={800}
                spy={true}
                offset={-75}
                activeClass="active-nav-link"
              >
                <div className="relative px-4 py-2 cursor-pointer font-semibold transition-colors group nav-link-container">
                  <span className={`relative z-10 ${
                    scrolled
                      ? 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      : 'text-white group-hover:text-blue-300'
                  }`}>
                    {link.name}
                  </span>
                  {/* Animated gradient underline */}
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors ${
              scrolled
                ? 'text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                : 'text-white hover:text-blue-300'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={800}
                spy={true}
                offset={-75}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block py-3 px-4 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-semibold rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all"
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
