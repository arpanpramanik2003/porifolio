import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

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
            <div className="w-8 h-8 rounded-lg border flex items-center justify-center font-bold card-arch"
              style={{ color: 'var(--text-primary)', background: 'var(--bg-card)' }}
            >
              AP
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
          <Link to="hero" smooth duration={500} className="cursor-pointer">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors card-arch"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} />
            </button>
          </Link>

        </div>
      </div>
    </footer>
  )
}

export default Footer
