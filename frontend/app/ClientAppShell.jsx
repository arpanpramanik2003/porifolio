'use client'

import { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Skills from '../src/components/Skills'
import Experience from '../src/components/Experience'
import Projects from '../src/components/Projects'
import CustomCursor from '../src/components/CustomCursor'
import StaticBackground from '../src/components/StaticBackground'
import SmoothScroll from '../src/components/SmoothScroll'
import IntroPreloader from '../src/components/IntroPreloader'
import Research from '../src/components/Research'
import Certificates from '../src/components/Certificates'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'
import { ThemeProvider } from '../src/contexts/ThemeContext'

export default function ClientAppShell() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  // Manage reduced motion & body scroll locking safely on client mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsIntroComplete(true)
    }
  }, [])

  useEffect(() => {
    if (!isIntroComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isIntroComplete])

  return (
    <ThemeProvider>
      {/* Fullscreen Root Preloader Overlay */}
      {!isIntroComplete && (
        <IntroPreloader onComplete={() => setIsIntroComplete(true)} />
      )}

      <SmoothScroll>
        <div
          className={`relative min-h-screen font-body transition-colors duration-500 ${
            !isIntroComplete ? 'opacity-0 pointer-events-none max-h-screen overflow-hidden' : 'opacity-100'
          }`}
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
          {/* Fixed background layers (grain + grid + vignette) */}
          <StaticBackground />

          {/* Single precision cursor overlay */}
          <CustomCursor />

          {/* Header Navigation */}
          <Navbar />

          {/* Main Content Landmark */}
          <main id="main-content" className="relative z-10">
            <Hero isIntroComplete={isIntroComplete} />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Research />
            <Certificates />
            <Contact />
          </main>

          {/* Footer Landmark */}
          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}
