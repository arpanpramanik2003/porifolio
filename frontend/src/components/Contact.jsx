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

  // Floating animation for background elements
  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // EmailJS configuration from environment variables
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
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Floating Backgrounds */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-10 opacity-3 dark:opacity-5 hidden sm:block"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        className="absolute bottom-20 right-10 opacity-3 dark:opacity-5 hidden sm:block"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 4 } }}
        className="absolute top-1/2 right-1/4 opacity-3 dark:opacity-5 hidden lg:block"
        style={{ translateY: '-50%' }}
      >
        <MessageCircle size={200} className="text-blue-500" />
      </motion.div>
      <motion.div
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 6 } }}
        className="absolute bottom-1/4 left-1/4 opacity-3 dark:opacity-5 hidden lg:block"
      >
        <Sparkles size={150} className="text-purple-500" />
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
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                Let's Connect
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
            />
            <p className="text-slate-600 dark:text-slate-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
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
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-8">
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <motion.a
                  whileHover={{ x: 10, scale: 1.02 }}
                  href={`mailto:${personalInfo.contact.email}`}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 group"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl shadow-md"
                  >
                    <Mail size={24} sm:size={28} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Email</p>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors text-sm sm:text-base break-all">
                      {personalInfo.contact.email}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10, scale: 1.02 }}
                  href={`tel:${personalInfo.contact.phone}`}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 group"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl shadow-md"
                  >
                    <Phone size={24} sm:size={28} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Phone</p>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors text-sm sm:text-base break-all">
                      {personalInfo.contact.phone}
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 group"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg sm:rounded-xl shadow-md"
                  >
                    <MapPin size={24} sm:size={28} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Location</p>
                    <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base break-all">
                      {personalInfo.contact.location}, {personalInfo.contact.state}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8 sm:mt-10">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <Sparkles className="text-yellow-500" size={16} sm:size={20} />
                  Connect on Social Media
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-5 bg-slate-900 dark:bg-slate-700 text-white rounded-lg sm:rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    <Github size={24} sm:size={28} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-5 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Linkedin size={24} sm:size={28} />
                  </motion.a>
                </div>
              </div>

              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-8 sm:mt-10 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-slate-600"
              >
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">💡 Quick Response</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
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
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Send Me a Message
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-base text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-base text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-base text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 rounded-lg sm:rounded-xl text-center font-semibold"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-400 rounded-lg sm:rounded-xl text-center font-semibold"
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
