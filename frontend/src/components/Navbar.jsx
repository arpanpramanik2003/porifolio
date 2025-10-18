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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="hero" smooth duration={500} className="cursor-pointer">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Arpan.dev
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                duration={500}
                spy
                activeClass="text-blue-500"
                className="text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700 dark:text-slate-300"
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
          className="md:hidden bg-white dark:bg-slate-800 shadow-lg"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                duration={500}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
