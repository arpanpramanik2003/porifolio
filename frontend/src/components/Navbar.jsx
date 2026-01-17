import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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
      className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full"
    >
      {/* Floating Capsule */}
      <motion.div
        animate={{
          width: scrolled ? '92%' : '100%',
          borderRadius: scrolled ? '9999px' : '0px',
          boxShadow: scrolled
            ? '0 20px 40px rgba(0,0,0,0.15)'
            : 'none',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className={`mx-auto transition-all duration-500 ${
          scrolled
            ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer">
              <motion.span
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 dark:from-blue-500 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent ${
                  !scrolled ? 'drop-shadow-lg' : ''
                }`}
              >
                arpanpramanik.dev
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.to

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth
                    duration={800}
                    spy
                    offset={-75}
                    onSetActive={() => setActiveSection(link.to)}
                  >
                    <div className="relative px-4 py-2 cursor-pointer font-semibold group">
                      <span
                        className={`relative z-10 transition-colors ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : scrolled
                              ? 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                              : 'text-white group-hover:text-blue-300'
                        }`}
                      >
                        {link.name}
                      </span>

                      {/* Active underline */}
                      <span
                        className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Button */}
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
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 mx-auto w-[92%] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-white/10"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                duration={800}
                spy
                offset={-75}
                onClick={() => {
                  setIsOpen(false)
                  setActiveSection(link.to)
                }}
              >
                <div
                  className={`block py-3 px-4 font-semibold rounded-lg cursor-pointer transition-all ${
                    activeSection === link.to
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                  } hover:bg-slate-200/50 dark:hover:bg-white/10`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
