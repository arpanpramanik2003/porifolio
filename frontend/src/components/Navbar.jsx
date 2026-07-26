import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { num: '01', name: 'About', to: 'about' },
    { num: '02', name: 'Skills', to: 'skills' },
    { num: '03', name: 'Experience', to: 'experience' },
    { num: '04', name: 'Projects', to: 'projects' },
    { num: '05', name: 'Research', to: 'research' },
    { num: '06', name: 'Contact', to: 'contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? 'backdrop-blur-md border-[var(--border)] shadow-sm'
            : 'border-transparent bg-transparent'
        }`}
        style={{
          background: scrolled
            ? 'color-mix(in srgb, var(--bg-primary) 85%, transparent)'
            : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Brand Architectural Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border overflow-hidden flex items-center justify-center transition-colors card-arch"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <img src="/apple-touch-icon.png" alt="Arpan Pramanik Logo" className="w-full h-full object-cover p-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base tracking-tight leading-none group-hover:text-[var(--accent)] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ARPAN PRAMANIK
                  </span>
                  <span className="font-mono text-[10px] tracking-wider mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                    FULL-STACK & AI
                  </span>
                </div>
              </div>
            </Link>

            {/* Center: Desktop Architectural Navigation */}
            <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
              {navLinks.map((link) => {
                const isActive = activeSection === link.to

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth
                    duration={500}
                    spy
                    offset={-80}
                    onSetActive={() => setActiveSection(link.to)}
                    className="relative px-3.5 py-2 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px]" style={{ color: isActive ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                        {link.num}.
                      </span>
                      <span className="font-medium transition-colors"
                        style={{
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        {link.name}
                      </span>
                    </div>

                    {/* Active Bottom Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Theme Toggle & Direct Action */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Sleek Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2.5 rounded-xl border flex items-center justify-center transition-colors card-arch"
                style={{ color: 'var(--text-secondary)' }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Direct Contact / Hire Action Button */}
              <Link to="contact" smooth duration={500} className="cursor-pointer">
                <button className="px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 border transition-all card-arch"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span>CONTACT</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
                </button>
              </Link>

            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border card-arch"
                style={{ color: 'var(--text-secondary)' }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg border card-arch"
                style={{ color: 'var(--text-primary)' }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden w-full border-b backdrop-blur-xl overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="px-6 py-6 space-y-3 font-mono text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 border-b border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--accent)' }}>{link.num}.</span>
                    <span style={{ color: 'var(--text-primary)' }}>{link.name}</span>
                  </div>
                  <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  to="contact"
                  smooth
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border shadow-sm"
                    style={{
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)'
                    }}
                  >
                    <span>INITIATE CONTACT</span>
                    <ArrowUpRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
