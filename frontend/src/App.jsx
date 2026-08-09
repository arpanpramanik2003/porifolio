import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import CustomCursor from './components/CustomCursor'
import StaticBackground from './components/StaticBackground'
import SmoothScroll from './components/SmoothScroll'
import IntroPreloader from './components/IntroPreloader'
import { ThemeProvider } from './contexts/ThemeContext'

// Below-the-fold dynamic imports
const Research = lazy(() => import('./components/Research'))
const Certificates = lazy(() => import('./components/Certificates'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Manage body scroll locking while intro is active
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
            <Suspense fallback={<div className="min-h-[20vh]" />}>
              <Research />
              <Certificates />
              <Contact />
            </Suspense>
          </main>

          {/* Footer Landmark */}
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
