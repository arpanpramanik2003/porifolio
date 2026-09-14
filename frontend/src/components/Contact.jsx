'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Check,
  Copy,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Globe,
  Radio,
  Sparkles
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data/personalInfo'
import NexusBot from './NexusBot'

// Inquiry presets for fast 1-click template injection
const INQUIRY_PRESETS = [
  {
    id: 'ai-agents',
    label: '🤖 AI Agents & RAG',
    subject: 'Autonomous AI / RAG Engineering Collaboration',
    template:
      "Hi Arpan, I reviewed your work on PaperLens AI and research proceedings. We are looking to collaborate or hire for autonomous agent architectures and intelligent RAG systems. Let's discuss scope and timeline."
  },
  {
    id: 'full-stack',
    label: '⚡ Full-Stack Systems',
    subject: 'High-Performance Web & Distributed Systems',
    template:
      "Hi Arpan, I'm reaching out regarding a high-impact full-stack software role / contract project requiring Next.js, React, and robust backend engineering. Are you open to discussing opportunities?"
  },
  {
    id: 'research',
    label: '🔬 Research Collaboration',
    subject: 'Academic & Scholarly Research Inquiry',
    template:
      "Dear Arpan, I came across your publications in IEEE/Springer proceedings. I would like to explore collaborative research on deep learning and applied intelligent systems."
  },
  {
    id: 'coffee',
    label: '☕ Quick Technical Sync',
    subject: 'General Technical Connection & Coffee Chat',
    template:
      "Hi Arpan, really impressed by your portfolio and engineering craftsmanship. Would love to connect for a quick 15-minute sync or coffee chat."
  }
]

const Contact = () => {
  const formRef = useRef(null)
  const messageInputRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [activeField, setActiveField] = useState(null)
  const [status, setStatus] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activePreset, setActivePreset] = useState(null)
  const [kolkataTime, setKolkataTime] = useState('')

  // Real-time ticking Kolkata / IST clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        setKolkataTime(timeStr)
      } catch (e) {
        setKolkataTime('--:--:--')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePresetSelect = (preset) => {
    setActivePreset(preset.id)
    setFormData((prev) => ({
      ...prev,
      subject: preset.subject,
      message: preset.template
    }))
    setActiveField('preset')

    // Focus message field smoothly
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus()
      }
    }, 150)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_SERVICE_ID)
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID)
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY)

    emailjs
      .send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Direct Portfolio Dispatch',
          message: formData.message,
          title: `Portfolio Transmission from ${formData.name}`
        },
        publicKey
      )
      .then(
        () => {
          setStatus('success')
          setFormData({ name: '', email: '', subject: '', message: '' })
          setActivePreset(null)
          setTimeout(() => setStatus(''), 6000)
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setStatus('error')
          setTimeout(() => setStatus(''), 6000)
        }
      )
  }

  // Generate WhatsApp prefilled link
  const whatsappUrl = `https://wa.me/918509187746?text=${encodeURIComponent(
    `Hi Arpan! I saw your portfolio and would like to discuss: ${formData.subject || 'a collaboration opportunity'}`
  )}`

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12 relative"
    >
      {/* ─────────────────────────────────────────────────────────────
         SECTION HEADER & MONOCHROMATIC STAMP
         ───────────────────────────────────────────────────────────── */}
      <div>
        {/* Monospace Header Stamp */}
        <div className="relative mb-8 pb-4 border-b border-[var(--border)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-bold text-[var(--accent)]">[SYS_COMMUNICATIONS]</span>
              <span>DIRECT DISPATCH &amp; TELEMETRY CONSOLE</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Live Kolkata Time & Status HUD */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] font-mono text-xs shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[var(--text-tertiary)] hidden sm:inline">KOLKATA (IST):</span>
                <span className="font-bold text-[var(--text-primary)]">{kolkataTime || '10:00:00'}</span>
                <span className="text-[var(--text-tertiary)] hidden md:inline">| UTC+5:30</span>
              </div>
              <span className="hidden sm:inline">INDEX: AP-COMM-2026</span>
            </div>
          </div>
          {/* Animated laser scanline sweep */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
            className="absolute bottom-0 left-0 w-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
          />
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-4xl space-y-3">
            <h1
              id="contact-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight"
            >
              INITIATE DIRECT COMMUNICATION.
            </h1>
            <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Open for full-time AI/ML &amp; full-stack roles, research initiatives, and technical advisory.
              All transmissions receive an expedited response within 24 hours.
            </p>
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-mono text-xs text-[var(--text-primary)] self-start lg:self-auto shrink-0 shadow-2xs">
            <Radio size={14} className="text-emerald-500 animate-pulse" />
            <span>STATUS: AVAILABLE FOR NEW OPPORTUNITIES</span>
          </div>
        </div>
      </div>

        {/* Smart Companion Bot Banner (NEXUS-01) */}
        <div className="mb-10">
          <NexusBot
            activeField={activeField}
            status={status}
            onInjectPreset={() => setActiveField('preset')}
          />
        </div>

        {/* Main Grid: Telemetry Channels (5 cols) & Dispatch Console (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Communication Channels & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Dispatch Card */}
            <div className="p-6 rounded-2xl border card-arch bg-[var(--bg-card)] border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                  DIRECT EMAIL DISPATCH
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-semibold">
                  PRIMARY
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 font-mono text-xs sm:text-sm font-semibold mb-4 min-w-0 text-[var(--text-primary)]">
                <span className="truncate">{personalInfo.contact.email}</span>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors card-arch border-[var(--border)] hover:border-[var(--text-primary)] text-[var(--text-secondary)]"
                  title="Copy Email Address"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-[10px] text-emerald-500 font-mono">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span className="text-[10px] font-mono">COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="py-2.5 px-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-1.5 border transition-all card-arch bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--text-primary)]"
                >
                  <Mail size={14} />
                  <span>Launch Mail</span>
                  <ArrowUpRight size={13} className="text-[var(--text-tertiary)]" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-1.5 border transition-all card-arch bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] hover:border-emerald-500"
                >
                  <MessageSquare size={14} className="text-emerald-500" />
                  <span>WhatsApp</span>
                  <ArrowUpRight size={13} className="text-[var(--text-tertiary)]" />
                </a>
              </div>
            </div>

            {/* Quick Contact Dossier Ledger */}
            <div className="p-6 rounded-2xl border card-arch bg-[var(--bg-card)] border-[var(--border)] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                  <Phone size={13} />
                  <span>PHONE / WHATSAPP</span>
                </span>
                <a
                  href={`tel:${personalInfo.contact.phone.replace(/\s+/g, '')}`}
                  className="font-semibold text-[var(--text-primary)] hover:underline"
                >
                  {personalInfo.contact.phone}
                </a>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                  <MapPin size={13} />
                  <span>COORDINATES</span>
                </span>
                <span className="font-semibold text-[var(--text-primary)] text-right">
                  Kakdwip, WB, India (21.87° N, 88.18° E)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                  <Clock size={13} />
                  <span>SLA RESPONSE TIME</span>
                </span>
                <span className="font-bold px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                  &lt; 24 HOURS
                </span>
              </div>
            </div>

            {/* Direct Network Profiles */}
            <div className="p-6 rounded-2xl border card-arch bg-[var(--bg-card)] border-[var(--border)]">
              <div className="font-mono text-xs uppercase tracking-wider mb-4 text-[var(--text-tertiary)]">
                NETWORK & CODE REPOSITORIES
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors card-arch text-[var(--text-primary)] bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--text-primary)]"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="text-[var(--text-tertiary)]" />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors card-arch text-[var(--text-primary)] bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--text-primary)]"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="text-[var(--text-tertiary)]" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Engineering Contact Form Console (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-3xl border card-arch bg-[var(--bg-card)] border-[var(--border)] shadow-sm space-y-6"
            >
              
              {/* 1-Click Inquiry Presets Bar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-zinc-400" />
                    <span>QUICK INQUIRY INTENT PRESETS</span>
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    CLICK TO AUTOLOAD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INQUIRY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`px-3 py-2 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between gap-2 ${
                        activePreset === preset.id
                          ? 'border-[var(--text-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-xs'
                          : 'border-[var(--border)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      <span className="truncate">{preset.label}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] font-mono flex-shrink-0">
                        {activePreset === preset.id ? '✓ LOADED' : '+ LOAD'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Element */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider mb-2 text-[var(--text-secondary)]"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      placeholder="e.g. Dr. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--text-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] card-arch"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider mb-2 text-[var(--text-secondary)]"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      placeholder="e.g. alex.vance@org.com"
                      className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--text-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] card-arch"
                    />
                  </div>
                </div>

                {/* Subject / Scope Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs uppercase tracking-wider mb-2 text-[var(--text-secondary)]"
                  >
                    SUBJECT / ENGAGEMENT SCOPE
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                    placeholder="e.g. AI Agent Architecture / Full-Stack System"
                    className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--text-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] card-arch"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                    >
                      TRANSMISSION MESSAGE *
                    </label>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                      {formData.message.length} CHARACTERS
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    ref={messageInputRef}
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Describe your project, role specifications, or inquiry details..."
                    className="w-full px-4 py-3 rounded-xl border font-mono text-sm transition-colors focus:outline-none focus:border-[var(--text-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border)] card-arch resize-none leading-relaxed"
                  />
                </div>

                {/* Status Indicator Feedback */}
                <div aria-live="polite" role="status">
                  {status === 'success' && (
                    <div className="p-3 rounded-xl border font-mono text-xs border-emerald-500/40 text-emerald-500 bg-emerald-500/10 flex items-center gap-2">
                      <Check size={15} />
                      <span>Message transmitted successfully! Arpan has received your telemetry.</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-3 rounded-xl border font-mono text-xs border-red-500/40 text-red-400 bg-red-500/10 flex items-center justify-between gap-2">
                      <span>Transmission failed. Please fallback to direct email: {personalInfo.contact.email}</span>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="underline text-[10px] uppercase font-mono"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)'
                  }}
                >
                  {status === 'sending' ? (
                    <span className="animate-pulse">ENCRYPTING & TRANSMITTING...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>DISPATCH TRANSMISSION</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-[var(--text-tertiary)]">
                  <span>TLS ENCRYPTED DISPATCH</span>
                  <span>DELIVERY GUARANTEED &lt; 24H</span>
                </div>

              </form>
            </div>
          </div>

        </div>

    </motion.div>
  )
}

export default Contact
