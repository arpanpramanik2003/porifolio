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
    { name: 'Contact', to: 'contact' }
  ]

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Arpan Pramanik
            </h3>
            <p className="text-slate-400 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Full-Stack Developer & AI/ML Enthusiast passionate about building innovative solutions.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Github size={18} sm:size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Linkedin size={18} sm:size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href={personalInfo.social.email}
                className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Mail size={18} sm:size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={500}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer inline-block text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Get In Touch</h4>
            <ul className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
              <li>
                <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-blue-400 transition-colors break-all">
                  {personalInfo.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.contact.phone}`} className="hover:text-blue-400 transition-colors break-all">
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
        <div className="border-t border-slate-800 my-6 sm:my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-slate-400 text-sm"
          >
            Made with <Heart size={16} className="text-red-500 fill-current animate-pulse" /> by Arpan Pramanik
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-slate-500 text-center"
          >
            © {currentYear} All rights reserved.
          </motion.p>

          {/* Back to Top Button */}
          <Link to="hero" smooth duration={500}>
            <motion.button
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg"
              title="Back to top"
            >
              <ArrowUp size={18} sm:size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
