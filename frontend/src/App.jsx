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
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <CustomCursor />

      {/* FIXED PARTICLE BACKGROUND */}
      <ParticleBackground />

      {/* MAIN CONTENT */}
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
  )
}

export default App
