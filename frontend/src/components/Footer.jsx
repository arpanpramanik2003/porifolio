import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-12 font-mono text-xs"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
        color: 'var(--text-tertiary)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Telemetry Line */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border overflow-hidden flex items-center justify-center card-arch"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <img src="/nav-logo.webp" alt="Arpan Pramanik Logo" width="32" height="32" loading="lazy" decoding="async" className="w-full h-full object-cover p-0.5" />
            </div>
            <div>
              <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
                ARPAN PRAMANIK
              </div>
              <div className="text-[10px]">
                SYSTEM DEPLOYMENT v2.5 • WEST BENGAL, INDIA
              </div>
            </div>
          </div>

          {/* Copyright Statement */}
          <div>
            © {currentYear} ARPAN PRAMANIK. ALL RIGHTS RESERVED.
          </div>

          {/* Quick Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors card-arch cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>

        </div>
      </div>
    </footer>
  )
}

export default Footer
