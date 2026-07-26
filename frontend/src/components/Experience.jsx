import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ArrowRight, Terminal, ShieldCheck, Cpu } from 'lucide-react'
import { experienceData } from '../data/experience'

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[03]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>PROFESSIONAL LEDGER & INDUSTRY ROLES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            PRACTICAL EXPERIENCE & INDUSTRIAL INTERNSHIPS.
          </h2>
        </div>

        {/* Structured Work Ledger List */}
        <div className="space-y-8">
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border transition-all card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Role Header & Meta (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Role Index & Type */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider" style={{ color: 'var(--accent)' }}>
                      [ROLE // 0{idx + 1}]
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded border"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {exp.title}
                    </h3>
                    <div className="font-mono text-sm font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </div>
                  </div>

                  {/* Duration & Location Badges */}
                  <div className="flex flex-wrap gap-2 font-mono text-xs pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border card-arch"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                    >
                      <Calendar size={13} style={{ color: 'var(--accent)' }} />
                      <span>{exp.duration} ({exp.period})</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border card-arch"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                    >
                      <MapPin size={13} style={{ color: 'var(--accent-tertiary)' }} />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                </div>

                {/* Right Deliverables & Tech Stack Ledger (7 Cols) */}
                <div className="lg:col-span-7 space-y-6 lg:border-l lg:pl-8" style={{ borderColor: 'var(--border)' }}>
                  
                  {/* Summary Description */}
                  <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  {/* Highlights Bullet Ledger */}
                  {exp.highlights && (
                    <div className="space-y-2">
                      <div className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                        KEY DELIVERABLES & TECHNICAL IMPACT
                      </div>
                      <ul className="space-y-2.5">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 font-body text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <ArrowRight size={14} className="shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {exp.skills && (
                    <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                      <div className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                        ENVIRONMENT & TOOLING
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md border card-arch"
                            style={{
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience
