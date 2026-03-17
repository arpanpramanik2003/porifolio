import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Sparkles, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data/personalInfo'

const Contact = () => {
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    <section id="contact" className="pt-12 pb-16 sm:pb-20 relative overflow-hidden">
      {/* Floating Backgrounds */}
      <motion.div animate={floatingAnimation} className="absolute top-20 left-10 opacity-[0.03] hidden sm:block">
        <div className="w-64 h-64 rounded-3xl blur-3xl" style={{ background: 'var(--accent)' }} />
      </motion.div>
      <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }} className="absolute bottom-20 right-10 opacity-[0.03] hidden sm:block">
        <div className="w-80 h-80 rounded-full blur-3xl" style={{ background: 'var(--accent-tertiary)' }} />
      </motion.div>

      <div className="max-w-2xl sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                Let's Connect
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Get In Touch
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full mb-4 neon-line"
            />
            <p className="max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12 lg:mb-0"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8" style={{ color: 'var(--text-primary)' }}>
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: <Mail size={24} />,
                    label: 'Email',
                    value: personalInfo.contact.email,
                    href: `mailto:${personalInfo.contact.email}`,
                    color: 'var(--accent)',
                  },
                  {
                    icon: <Phone size={24} />,
                    label: 'Phone',
                    value: personalInfo.contact.phone,
                    href: `tel:${personalInfo.contact.phone}`,
                    color: 'var(--accent-secondary)',
                  },
                  {
                    icon: <MapPin size={24} />,
                    label: 'Location',
                    value: `${personalInfo.contact.location}, ${personalInfo.contact.state}`,
                    href: null,
                    color: 'var(--accent-tertiary)',
                  },
                ].map((item, i) => {
                  const Wrapper = item.href ? motion.a : motion.div
                  return (
                    <Wrapper
                      key={i}
                      whileHover={{ x: 10, scale: 1.02 }}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all group neon-card"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="p-3 sm:p-4 text-white rounded-lg sm:rounded-xl shadow-md"
                        style={{ background: item.color }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                        <p className="font-bold text-sm sm:text-base break-all transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 sm:mt-10">
                <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Sparkles style={{ color: 'var(--accent-warm)' }} size={20} />
                  Connect on Social Media
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-5 rounded-lg sm:rounded-xl transition-colors shadow-lg neon-card"
                    style={{
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-5 rounded-lg sm:rounded-xl transition-colors shadow-lg"
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--text-on-accent)',
                    }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                </div>
              </div>

              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl neon-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>💡 Quick Response</h4>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  I usually respond within 24 hours. For urgent matters, feel free to call directly!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl neon-card"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--text-primary)' }}>
                Send Me a Message
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-base font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none transition-all"
                    style={{
                      background: 'var(--bg-card-hover)',
                      color: 'var(--text-primary)',
                      border: '2px solid var(--border)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 12px var(--neon-glow)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Type your name here"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-base font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none transition-all"
                    style={{
                      background: 'var(--bg-card-hover)',
                      color: 'var(--text-primary)',
                      border: '2px solid var(--border)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 12px var(--neon-glow)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Type your email here"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-base font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none resize-none transition-all"
                    style={{
                      background: 'var(--bg-card-hover)',
                      color: 'var(--text-primary)',
                      border: '2px solid var(--border)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 12px var(--neon-glow)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed neon-btn"
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl text-center font-semibold"
                    style={{
                      background: 'rgba(0,255,136,0.1)',
                      border: '1px solid #00ff88',
                      color: '#00ff88',
                    }}
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl text-center font-semibold"
                    style={{
                      background: 'rgba(255,59,48,0.1)',
                      border: '1px solid #ff3b30',
                      color: '#ff3b30',
                    }}
                  >
                    ✗ Failed to send. Please try again or email directly.
                  </motion.div>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
