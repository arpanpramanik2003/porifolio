import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Terminal, Cpu, Code2, Database, Layers, CheckCircle2 } from 'lucide-react'
import { skillsData } from '../data/skills'

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = [
    { id: 'All', label: '01. All Domains' },
    { id: 'AI / ML', label: '02. AI / ML & Vision' },
    { id: 'Development', label: '03. Full-Stack Web' },
    { id: 'Databases & Cloud', label: '04. Data & Infrastructure' },
    { id: 'Tools', label: '05. Dev Tools' }
  ]

  const filteredData = useMemo(() => {
    let list = skillsData

    if (activeFilter === 'AI / ML') {
      list = skillsData.filter(cat =>
        ['AI / ML & Deep Learning', 'Programming Languages'].includes(cat.category)
      )
    } else if (activeFilter === 'Development') {
      list = skillsData.filter(cat =>
        ['Frontend Development', 'Backend Development'].includes(cat.category)
      )
    } else if (activeFilter === 'Databases & Cloud') {
      list = skillsData.filter(cat =>
        ['Databases', 'Cloud & DevOps'].includes(cat.category)
      )
    } else if (activeFilter === 'Tools') {
      list = skillsData.filter(cat =>
        ['Tools & Productivity', 'Specialized Skills'].includes(cat.category)
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.map(cat => ({
        ...cat,
        skills: cat.skills.filter(s => s.name.toLowerCase().includes(q))
      })).filter(cat => cat.skills.length > 0)
    }

    return list
  }, [activeFilter, searchQuery])

  const totalSkillCount = useMemo(() => {
    return skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)
  }, [])

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[02]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>CAPABILITY ECOSYSTEM & TECH RADAR</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              TECHNICAL ECOSYSTEM & PRODUCTION STACK.
            </h2>

            {/* Quick Summary Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-xs card-arch"
              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              <CheckCircle2 size={15} style={{ color: 'var(--accent-tertiary)' }} />
              <span>{totalSkillCount}+ Verified Technologies & Frameworks</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search Input Row */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Domain Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide font-mono text-xs">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="px-4 py-2 rounded-xl border transition-colors whitespace-nowrap card-arch"
                style={{
                  background: activeFilter === f.id ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: activeFilter === f.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  borderColor: activeFilter === f.id ? 'var(--text-primary)' : 'var(--border)'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search stack (e.g. PyTorch, React, FastAPI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border font-mono text-xs transition-colors focus:outline-none focus:border-[var(--accent)] card-arch"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

        </div>

        {/* Capability Ecosystem Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((cat, idx) => (
              <motion.div
                key={cat.category}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border flex flex-col justify-between transition-all card-arch"
                style={{ background: 'var(--bg-card)' }}
              >
                <div>
                  {/* Category Title & Badge Header */}
                  <div className="flex items-center justify-between mb-5 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {cat.category}
                    </h3>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded border"
                      style={{ borderColor: 'var(--border)', color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                    >
                      {cat.skills.length} NODES
                    </span>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs transition-colors card-arch"
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {skill.logo ? (
                          <img src={skill.logo} alt="" className="w-4 h-4 object-contain" />
                        ) : (
                          <span className="text-xs">{skill.icon}</span>
                        )}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Index Tag */}
                <div className="mt-6 pt-3 border-t flex justify-between items-center font-mono text-[10px]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}
                >
                  <span>STATUS: PRODUCTION READY</span>
                  <span>[DOMAIN_0{idx + 1}]</span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

export default Skills
