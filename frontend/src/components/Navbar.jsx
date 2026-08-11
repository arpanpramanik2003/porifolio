'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { isDarkMode, toggleTheme } = useTheme()

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none">
      <div className="w-full bg-transparent border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Brand Architectural Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center border-none transition-transform group-hover:scale-105"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <img src="/nav-logo.webp" alt="Arpan Pramanik Logo" width="36" height="36" fetchPriority="high" decoding="async" className="w-full h-full object-cover p-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base tracking-tight leading-none group-hover:text-[var(--accent-secondary)] transition-colors"
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

            {/* Center: Desktop Navigation (Bold, Larger Font, Clean Pure Black-White Active Notation, No Capsule / No Underline) */}
            <nav className="hidden md:flex items-center space-x-2 font-display">
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
                    className="px-3.5 py-2 cursor-pointer transition-colors group"
                  >
                    <span
                      className="font-bold text-sm sm:text-base tracking-wide transition-colors group-hover:text-[var(--text-primary)]"
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        opacity: isActive ? 1 : 0.65
                      }}
                    >
                      {link.name}
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Right: Borderless Theme Toggle & Contact Button */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Borderless Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2.5 rounded-xl border-none flex items-center justify-center transition-colors hover:bg-white/10 dark:hover:bg-white/10"
                style={{ color: 'var(--text-primary)', background: 'transparent' }}
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
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Borderless Contact Action Button */}
              <Link to="contact" smooth duration={500} className="cursor-pointer">
                <button className="px-4.5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 border-none transition-all shadow-none hover:opacity-90 active:scale-95"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  <span>CONTACT</span>
                  <ArrowUpRight size={14} />
                </button>
              </Link>

            </div>

            {/* Mobile Hamburger Button (Borderless) */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-lg border-none"
                style={{ color: 'var(--text-primary)', background: 'transparent' }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="p-2 rounded-lg border-none"
                style={{ color: 'var(--text-primary)', background: 'transparent' }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Borderless Glass) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="region"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden w-full backdrop-blur-2xl border-none overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.85)'
            }}
          >
            <div className="px-6 py-6 space-y-3 font-body text-sm">
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
                  <span className="font-medium text-sm text-white">{link.name}</span>
                  <ArrowUpRight size={14} className="text-zinc-400" />
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  to="contact"
                  smooth
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border-none text-black bg-white"
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
