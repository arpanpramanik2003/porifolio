import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { Link } from 'react-scroll'
import { personalInfo } from '../data/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Research', to: 'research' },
    { name: 'Contact', to: 'contact' },
  ]

  return (
    <footer className="relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
    >
      {/* Decorative gradient — neon line */}
      <div className="absolute top-0 left-0 right-0 h-1 neon-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-left">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Arpan Pramanik
            </h3>

            <p className="mb-4 max-w-sm" style={{ color: 'var(--text-tertiary)' }}>
              Full-Stack Developer & AI/ML Enthusiast passionate about building innovative solutions.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              {[
                { icon: Github, link: personalInfo.social.github },
                { icon: Linkedin, link: personalInfo.social.linkedin },
                { icon: Mail, link: personalInfo.social.email },
              ].map(({ icon: Icon, link }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg transition-colors neon-card"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={500}
                    className="transition-colors cursor-pointer"
                    style={{ color: 'var(--text-tertiary)' }}
                    onMouseEnter={(e) => { e.target.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.target.style.color = 'var(--text-tertiary)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Get In Touch
            </h4>
            <ul className="space-y-3" style={{ color: 'var(--text-tertiary)' }}>
              <li>
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="transition-colors break-all"
                  onMouseEnter={(e) => { e.target.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--text-tertiary)' }}
                >
                  {personalInfo.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.contact.phone}`}
                  className="transition-colors"
                  onMouseEnter={(e) => { e.target.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--text-tertiary)' }}
                >
                  {personalInfo.contact.phone}
                </a>
              </li>
              <li>
                {personalInfo.contact.location}, {personalInfo.contact.state}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mb-6" style={{ borderTop: '1px solid var(--border)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Made with <Heart size={16} className="fill-current animate-pulse" style={{ color: 'var(--accent-tertiary)' }} /> by Arpan Pramanik
          </p>

          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
            © {currentYear} All rights reserved.
          </p>

          <Link to="hero" smooth duration={500}>
            <motion.button
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full shadow-lg neon-btn"
            >
              <ArrowUp size={18} />
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
