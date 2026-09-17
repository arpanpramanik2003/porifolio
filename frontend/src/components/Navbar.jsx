'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { personalInfo } from '../data/personalInfo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isDarkMode, toggleTheme } = useTheme()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Research', href: '/research' },
    { name: 'Contact', href: '/contact' },
  ]

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none">
      <div className="w-full bg-transparent border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Brand Architectural Logo */}
            <Link href="/" className="cursor-pointer group shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex items-center justify-center border-none transition-transform group-hover:scale-105"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <img src="/nav-logo.webp" alt="Arpan Pramanik Logo" width="36" height="36" fetchPriority="high" decoding="async" className="w-full h-full object-cover p-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm sm:text-base tracking-tight leading-none group-hover:text-[var(--accent-secondary)] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ARPAN PRAMANIK
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-wider mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                    FULL-STACK & AI
                  </span>
                </div>
              </div>
            </Link>

            {/* Center: Desktop Navigation (Compact on tablet, spacious on desktop) */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2.5 font-display shrink-0">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-2.5 lg:px-3.5 py-1.5 lg:py-2 cursor-pointer transition-all group relative"
                  >
                    <span
                      className="font-bold text-xs lg:text-sm tracking-normal lg:tracking-wide transition-colors group-hover:text-[var(--text-primary)]"
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        opacity: isActive ? 1 : 0.65
                      }}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 lg:left-3.5 lg:right-3.5 h-[2px] rounded-full"
                        style={{ background: 'var(--text-primary)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Social Coordinates (lg+), Borderless Theme Toggle & Compact Contact Button */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">

              {/* Social Channels (Shown on lg screens >= 1024px to preserve tablet breathing room) */}
              <div className="hidden lg:flex items-center gap-1 mr-1">
                {[
                  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: personalInfo.social.email, label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>

              {/* Borderless Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-8 h-8 rounded-lg border-none flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
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
                      <Sun size={17} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={17} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Compact Contact Action Button */}
              <Link href="/contact" className="cursor-pointer ml-1">
                <button className="px-3 lg:px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-semibold flex items-center gap-1 border-none transition-all shadow-none hover:opacity-90 active:scale-95 cursor-pointer"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  <span>CONTACT</span>
                  <ArrowUpRight size={13} />
                </button>
              </Link>

            </div>

            {/* Mobile / Small Screen Controls (Aligned to md:hidden) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-lg border-none flex items-center justify-center cursor-pointer"
                style={{ color: 'var(--text-primary)', background: 'transparent' }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="p-2 rounded-lg border-none flex items-center justify-center cursor-pointer"
                style={{ color: 'var(--text-primary)', background: 'transparent' }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Theme-adaptive glass, unified md:hidden) */}
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
            className="md:hidden w-full backdrop-blur-2xl border-b border-[var(--border)] overflow-hidden"
            style={{
              background: isDarkMode ? 'rgba(10, 10, 12, 0.95)' : 'rgba(255, 255, 255, 0.96)'
            }}
          >
            <div className="px-6 py-6 space-y-4 font-body text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 border-b border-[var(--border)]"
                >
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{link.name}</span>
                  <ArrowUpRight size={14} className="text-[var(--text-tertiary)]" />
                </Link>
              ))}

              {/* Social Channels in Drawer */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: personalInfo.social.email, label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                >
                  <button
                    className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border-none cursor-pointer transition-all active:scale-95"
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
