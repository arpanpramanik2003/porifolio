import { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

/**
 * StaticBackground — Three fixed CSS layers that create a premium,
 * calm backdrop without any animation or JavaScript.
 *
 * Layers:
 *  1. Architectural grid lines (faint 1px lines at 100px intervals)
 *  2. Film grain texture (SVG feTurbulence, static)
 *  3. Radial vignette (darkens edges, draws eye to center)
 */
const StaticBackground = () => {
  const { isDarkMode } = useTheme()

  // SVG noise pattern encoded as data URI — zero network requests
  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">

      {/* Layer 1: Architectural Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center',
        }}
      />

      {/* Layer 2: Film Grain Texture */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: grainSvg,
          opacity: isDarkMode ? 0.035 : 0.025,
        }}
      />

      {/* Layer 3: Top Spotlight Radial Vignette (Vercel & Stripe Style) */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkMode
            ? 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, transparent 40%, rgba(0,0,0,0.6) 100%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.04) 100%)',
        }}
      />
    </div>
  )
}

export default StaticBackground
