import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Check, Copy, ArrowUpRight, MessageSquare } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data/personalInfo'

const Contact = () => {
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Scroll tracking for title entrance fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  })

  const headerY = useTransform(smoothProgress, [0, 0.25], [35, 0])
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: 'Portfolio Contact Form'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
          setTimeout(() => setStatus(''), 5000)
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setStatus('error')
          setTimeout(() => setStatus(''), 5000)
        }
      )
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[07]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>DIRECT DISPATCH CONSOLE</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug max-w-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            INITIATE DIRECT COMMUNICATION.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Communication Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Dispatch Card */}
            <div className="p-6 rounded-2xl border card-arch" style={{ background: 'var(--bg-card)' }}>
              <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                PRIMARY EMAIL DISPATCH
              </div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs sm:text-sm font-semibold mb-4 min-w-0" style={{ color: 'var(--text-primary)' }}>
                <span className="truncate">{personalInfo.contact.email}</span>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors card-arch"
                  style={{ color: 'var(--text-secondary)' }}
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={14} style={{ color: 'var(--accent-tertiary)' }} /> : <Copy size={14} />}
                </button>
              </div>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border transition-all card-arch"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <Mail size={14} />
                <span>Launch Default Mail Client</span>
                <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
              </a>
            </div>

            {/* Quick Contact Dossier Ledger */}
            <div className="p-6 rounded-2xl border card-arch space-y-4 font-mono text-xs" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>PHONE / WHATSAPP</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{personalInfo.contact.phone}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>LOCATION</span>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{personalInfo.contact.location}, WB, India</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-tertiary)' }}>EXPECTED RESPONSE</span>
                <span className="font-bold px-2 py-0.5 rounded border" style={{ borderColor: 'var(--accent-tertiary)', color: 'var(--accent-tertiary)', background: 'var(--bg-secondary)' }}>
                  &lt; 24 HOURS
                </span>
              </div>
            </div>

            {/* Social Channels Row */}
            <div className="p-6 rounded-2xl border card-arch" style={{ background: 'var(--bg-card)' }}>
              <div className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                DIRECT NETWORK PROFILES
              </div>
              <div className="flex gap-3">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors card-arch"
                  style={{ color: 'var(--text-primary)', background: 'var(--bg-secondary)' }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors card-arch"
                  style={{ color: 'var(--text-primary)', background: 'var(--bg-secondary)' }}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Engineering Contact Form Console (7 Cols) */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl border space-y-6 card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                TRANSMIT MESSAGE VIA CONSOLE
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--accent)] card-arch"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex.vance@research.org"
                    className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--accent)] card-arch"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                    TRANSMISSION MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--accent)] card-arch resize-none"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Status Indicator Feedback */}
              {status === 'success' && (
                <div className="p-3 rounded-xl border font-mono text-xs" style={{ borderColor: 'var(--accent-tertiary)', color: 'var(--accent-tertiary)', background: 'var(--bg-secondary)' }}>
                  ✓ Message transmitted successfully. I will get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 rounded-xl border font-mono text-xs" style={{ borderColor: 'red', color: 'red', background: 'var(--bg-secondary)' }}>
                  ✕ Transmission failed. Please try emailing directly at {personalInfo.contact.email}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl font-display font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)'
                }}
              >
                {status === 'sending' ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>TRANSMIT MESSAGE NOW</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Contact
