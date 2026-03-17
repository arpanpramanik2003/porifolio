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
    { name: 'Certificates', to: 'certificates' },
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
            ? '0 8px 32px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.08)'
            : 'none',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`mx-auto transition-all duration-200 ${
          scrolled
            ? 'backdrop-blur-xl border border-white/10 dark:border-white/5'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          background: 'color-mix(in srgb, var(--bg-secondary) 70%, transparent)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer">
              <motion.span
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <div className="relative w-9 h-9 rounded-full p-[2px] shadow-md neon-border-subtle"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full rounded-full object-cover"
                    style={{ background: 'var(--bg-primary)' }}
                  />
                </div>
                <span className={`text-xl font-bold gradient-text ${
                  !scrolled ? 'drop-shadow-lg' : ''
                }`}>
                  arpanpramanik.dev
                </span>
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.to

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth
                    duration={500}
                    easing="easeInOutQuart"
                    spy
                    offset={-75}
                    onSetActive={() => setActiveSection(link.to)}
                  >
                    <div className="relative px-4 py-2 cursor-pointer font-semibold group">
                      <span
                        className={`relative z-10 transition-colors ${
                          isActive
                            ? 'neon-text'
                            : 'text-slate-700 dark:text-slate-300 group-hover:text-[var(--accent)]'
                        }`}
                      >
                        {link.name}
                      </span>

                      {/* Active underline — neon gradient */}
                      <span
                        className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 neon-line transition-all duration-300 ${
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
              className="lg:hidden transition-colors text-slate-700 dark:text-slate-200 hover:text-[var(--accent)]"
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
          className="lg:hidden mt-3 mx-auto w-[92%] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10"
          style={{ background: 'color-mix(in srgb, var(--bg-secondary) 90%, transparent)' }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth
                duration={500}
                easing="easeInOutQuart"
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
                      ? 'neon-text'
                      : 'text-slate-700 dark:text-slate-200 hover:text-[var(--accent)]'
                  } hover:bg-[var(--bg-card-hover)]`}
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
