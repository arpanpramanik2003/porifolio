import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, Building, CheckCircle2, Eye, ExternalLink, X, ShieldCheck } from 'lucide-react'
import { certificatesData } from '../data/certificates'

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <span>[06]</span>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span>ACCREDITATIONS & CERTIFICATIONS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              VERIFIED ACADEMIC & TECHNICAL CREDENTIALS.
            </h2>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-mono text-xs card-arch"
              style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
            >
              <ShieldCheck size={15} style={{ color: 'var(--accent-tertiary)' }} />
              <span>{certificatesData.length} Verified Accreditations & Badges</span>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, idx) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl border flex flex-col justify-between transition-all card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="space-y-4">
                
                {/* Header Meta Row */}
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-bold" style={{ color: 'var(--accent)' }}>[CRED // 0{idx + 1}]</span>
                  <span className="px-2 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)' }}>
                    {cert.date}
                  </span>
                </div>

                {/* Title & Type */}
                <div>
                  <h3 className="font-display font-bold text-lg leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs" style={{ color: 'var(--accent-secondary)' }}>
                    {cert.type}
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {cert.description}
                </p>

              </div>

              {/* Footer Meta Row: Issuer & View Document Action */}
              <div className="pt-4 mt-6 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-1.5 truncate max-w-[65%]" style={{ color: 'var(--text-tertiary)' }}>
                  <Building size={13} className="shrink-0" />
                  <span className="truncate">{cert.issuer}</span>
                </div>

                {cert.file && (
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1 font-semibold hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    <Eye size={13} />
                    <span>View</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Certificate Document Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl border max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl card-arch"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Modal Header */}
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                <div>
                  <div className="font-mono text-xs uppercase" style={{ color: 'var(--accent)' }}>
                    [VERIFIED CERTIFICATE DOCUMENT // {selectedCert.date}]
                  </div>
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {selectedCert.title}
                  </h3>
                </div>
                <button onClick={() => setSelectedCert(null)} className="p-2 rounded-xl border card-arch" style={{ color: 'var(--text-tertiary)' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="p-4 bg-slate-950 flex items-center justify-center overflow-auto max-h-[70vh]">
                <img
                  src={selectedCert.file}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-xl border border-white/10"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(selectedCert.title)}`
                  }}
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-5 border-t flex items-center justify-between font-mono text-xs"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>ISSUED BY: {selectedCert.issuer}</span>
                <button onClick={() => setSelectedCert(null)} style={{ color: 'var(--text-tertiary)' }}>
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default Certificates
