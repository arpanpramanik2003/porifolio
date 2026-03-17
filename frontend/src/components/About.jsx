import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { GraduationCap, MapPin, Briefcase, Award, Heart, Sparkles, Download, ChevronRight } from 'lucide-react'
import { aboutData } from '../data/about'
import { personalInfo } from '../data/personalInfo'

const iconMap = {
  GraduationCap, MapPin, Briefcase, Award
}

const accentColors = {
  1: { bg: 'rgba(0,229,255,0.12)', text: 'var(--accent)', shadow: 'var(--neon-glow)' },
  2: { bg: 'rgba(179,136,255,0.12)', text: 'var(--accent-secondary)', shadow: 'var(--neon-glow-secondary)' },
  3: { bg: 'rgba(0,255,136,0.12)', text: '#00ff88', shadow: 'rgba(0,255,136,0.3)' },
  4: { bg: 'rgba(255,199,64,0.12)', text: 'var(--accent-warm)', shadow: 'rgba(255,199,64,0.3)' },
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [activeCard, setActiveCard] = useState(null)

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
  }

  return (
    <section id="about" className="pt-12 pb-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none hidden md:block"
        style={{ background: 'var(--accent)', opacity: 0.04 }} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none hidden md:block"
        style={{ background: 'var(--accent-secondary)', opacity: 0.04 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* ── Section Header ── */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 rounded-full text-sm font-semibold neon-pill">
                Get to know me
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              About Me
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 mx-auto rounded-full neon-line"
            />
          </div>

          {/* ══════ Info Cards — horizontal scroll on mobile, grid on desktop ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            {/* Mobile: horizontal scroll strip */}
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide md:hidden"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {aboutData.cards.map((card) => {
                const Icon = iconMap[card.icon]
                const colors = accentColors[card.id]
                return (
                  <motion.div
                    key={card.id}
                    custom={card.id}
                    variants={item}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                    className="flex-shrink-0 w-[75vw] snap-center rounded-2xl p-5 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      border: activeCard === card.id ? `1.5px solid ${colors.text}` : '1px solid var(--border)',
                      boxShadow: activeCard === card.id ? `0 0 20px ${colors.shadow}` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.bg }}>
                        <Icon size={20} style={{ color: colors.text }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                        {card.id === 1 && <Sparkles size={12} style={{ color: 'var(--accent-warm)' }} className="inline ml-1" />}
                      </div>
                    </div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: colors.text }}>{card.primary}</p>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>{card.secondary}</p>
                    {card.tertiary && <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{card.tertiary}</p>}
                    {card.duration && <p className="text-[10px] mt-1.5 font-medium" style={{ color: 'var(--text-tertiary)' }}>{card.duration}</p>}
                  </motion.div>
                )
              })}
            </div>

            {/* Desktop: 4-column grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {aboutData.cards.map((card) => {
                const Icon = iconMap[card.icon]
                const colors = accentColors[card.id]
                return (
                  <motion.div
                    key={card.id}
                    custom={card.id}
                    variants={item}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group relative rounded-2xl p-5 overflow-hidden cursor-default"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Hover glow border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${colors.text}, 0 0 15px ${colors.shadow}` }}
                    />
                    {/* Decorative blob */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                      style={{ background: colors.text }}
                    />

                    <div className="relative z-10">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: colors.bg }}>
                        <Icon size={22} style={{ color: colors.text }} />
                      </div>
                      <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                        {card.title}
                        {card.id === 1 && <Sparkles size={12} style={{ color: 'var(--accent-warm)' }} />}
                      </h3>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: colors.text }}>{card.primary}</p>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>{card.secondary}</p>
                      {card.tertiary && <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{card.tertiary}</p>}
                      {card.duration && <p className="text-[10px] mt-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>{card.duration}</p>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* ══════ About Text — styled paragraphs ══════ */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: intro text — takes 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-3 space-y-5"
            >
              {aboutData.intro.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.12 }}
                  className="relative pl-4 sm:pl-5"
                  style={{ borderLeft: index === 0 ? '3px solid var(--accent)' : '3px solid var(--border)' }}
                >
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Interests + CTA — takes 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Interests */}
              <div className="rounded-2xl p-4 mb-3"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Heart className="text-red-500" size={16} />
                  </motion.div>
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {aboutData.interests.map((interest, index) => (
                    <motion.span
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + index * 0.08, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.1, y: -3, transition: { duration: 0.2 } }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer shadow-sm hover:shadow-lg transition-all neon-pill"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Quick quote card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl"
                  style={{ background: 'var(--accent)', opacity: 0.1 }} />
                <div className="text-2xl mb-1 opacity-30" style={{ color: 'var(--accent)', fontFamily: 'serif' }}>"</div>
                <p className="text-xs italic leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Passionate about building intelligent solutions that bridge the gap between research and real-world impact.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img src={personalInfo.profileImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>{personalInfo.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>CSE (AI/ML) Student</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Download Resume CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center"
          >
            <motion.a
              href={personalInfo.resume}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all neon-btn"
            >
              <Download size={18} />
              <span>Download Full Resume</span>
              <ChevronRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
