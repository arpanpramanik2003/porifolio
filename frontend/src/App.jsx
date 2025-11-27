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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500 relative">
      <CustomCursor />
      <ParticleBackground />
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
