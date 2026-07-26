import { GraduationCap, MapPin, Download, ArrowUpRight, Cpu, Code, Brain } from 'lucide-react'
import { aboutData } from '../data/about'
import { personalInfo } from '../data/personalInfo'

const About = () => {
  const pillars = [
    {
      num: '01',
      title: 'Full-Stack Web Systems',
      desc: 'Architecting end-to-end applications using React, Next.js, FastAPI, Node.js, and PostgreSQL with robust auth & state management.',
      icon: Code,
      accent: 'var(--accent)'
    },
    {
      num: '02',
      title: 'Grounded AI & RAG',
      desc: 'Building intelligent copilots (PaperLens AI) using hybrid retrieval (FAISS + BM25), Groq LLM API, and structured markdown outputs.',
      icon: Brain,
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Computer Vision & Deep Learning',
      desc: 'Developing multi-headed CNNs, Grad-CAM visual explainability maps, and real-time Streamlit inference engines (FruitQ-GradeX).',
      icon: Cpu,
      accent: 'var(--accent-tertiary)'
    },
    {
      num: '04',
      title: 'Academic Excellence',
      desc: 'Maintaining a 9.42 / 10 CGPA in B.Tech CSE (AI & ML) at The Neotia University while shipping 10+ production deployments.',
      icon: GraduationCap,
      accent: 'var(--accent-warm)'
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[01]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            ENGINEERING WITH RIGOR, GROUNDED AI & INTENTIONAL DESIGN.
          </h2>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Story & 4 Core Engineering Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Lead Bio Paragraphs */}
            <div className="space-y-5 font-body text-base sm:text-lg leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I am a Computer Science Undergraduate specializing in AI/ML at <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>The Neotia University</strong> (9.42 CGPA). My focus centers on building reliable web platforms, intelligent retrieval systems, and machine learning models that bridge scientific research with real-world utility.
              </p>
              <p>
                From authoring <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>PaperLens AI</strong> (an academic research co-pilot with hybrid FAISS+BM25 retrieval) to deploying full-stack web platforms and explainable deep learning pipelines, I emphasize clean architecture, high performance, and visual polish.
              </p>
            </div>

            {/* Core Technical Pillars Grid */}
            <div className="pt-4">
              <h3 className="font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <span>CORE ENGINEERING PILLARS</span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((p) => {
                  const Icon = p.icon
                  return (
                    <div
                      key={p.num}
                      className="p-5 rounded-2xl border transition-all card-arch"
                      style={{ background: 'var(--bg-card)' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
                        >
                          <Icon size={18} style={{ color: p.accent }} />
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{p.num}</span>
                      </div>
                      
                      <h4 className="font-display font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
                        {p.title}
                      </h4>
                      <p className="font-body text-xs leading-relaxed text-justify sm:text-left" style={{ color: 'var(--text-secondary)' }}>
                        {p.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Profile Dossier & Key Credentials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Profile Dossier Card with Compact Vertical Portrait */}
            <div className="p-6 rounded-2xl border card-arch relative overflow-hidden"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Header: Compact 530x690 Vertical Portrait Photo + Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6 pb-6 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                
                {/* 530x690 Aspect Ratio Vertical Frame */}
                <div className="w-28 sm:w-32 aspect-[530/690] rounded-xl overflow-hidden border-2 shrink-0 card-arch shadow-sm relative group"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/530x690?text=Arpan'
                    }}
                  />
                </div>

                {/* Dossier Info Header */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{ borderColor: 'var(--accent-tertiary)', color: 'var(--accent-tertiary)', background: 'var(--bg-secondary)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] animate-pulse" />
                    <span>VERIFIED ENGINEER</span>
                  </div>

                  <h3 className="font-display font-black text-2xl tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {personalInfo.name}
                  </h3>

                  <div className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    B.Tech CSE (AI & ML) • 2023–2027
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs pt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin size={13} className="text-[var(--accent)] shrink-0" />
                    <span>West Bengal, India</span>
                  </div>
                </div>

              </div>

              {/* Dossier Quick Ledger */}
              <div className="space-y-3 font-mono text-xs pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between items-center py-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>INSTITUTION</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>The Neotia University</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>ACADEMIC SCORE</span>
                  <span className="font-bold px-2 py-0.5 rounded border"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--bg-secondary)' }}
                  >
                    9.42 CGPA
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>DEPLOYMENTS</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>10+ Production Live</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span style={{ color: 'var(--text-tertiary)' }}>RESEARCH FIELD</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>RAG & Vision AI</span>
                </div>
              </div>

              {/* Direct Resume Download Button */}
              <div className="pt-6">
                <a
                  href={personalInfo.resume}
                  download
                  className="w-full py-3 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 border transition-all card-arch"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Download size={14} />
                  <span>Download Curriculum Vitae (PDF)</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--accent)' }} />
                </a>
              </div>

            </div>

            {/* Technical Focus & Domain Interests */}
            <div className="p-6 rounded-2xl border card-arch" style={{ background: 'var(--bg-card)' }}>
              <div className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
                INTERESTS & EXPLORATION
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {aboutData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-lg border transition-colors card-arch"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default About
