import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Research from './components/Research'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import StaticBackground from './components/StaticBackground'
import SmoothScroll from './components/SmoothScroll'
import { ThemeProvider } from './contexts/ThemeContext'

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
            <Research />
            <Certificates />
            <Contact />
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
