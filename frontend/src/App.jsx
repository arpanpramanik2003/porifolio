import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import CustomCursor from './components/CustomCursor'
import StaticBackground from './components/StaticBackground'
import SmoothScroll from './components/SmoothScroll'
import { ThemeProvider } from './contexts/ThemeContext'

// Below-the-fold dynamic imports
const Research = lazy(() => import('./components/Research'))
const Certificates = lazy(() => import('./components/Certificates'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen font-body transition-colors duration-500"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
          {/* Fixed background layers (grain + grid + vignette) */}
          <StaticBackground />

          {/* Single precision cursor overlay */}
          <CustomCursor />

          {/* Main Content */}
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Suspense fallback={<div className="min-h-[20vh]" />}>
              <Research />
              <Certificates />
              <Contact />
              <Footer />
            </Suspense>
          </div>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
