import { useEffect, useState } from 'react'
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
import ThemeToggle from './components/ThemeToggle'
import CustomCursor from './components/CustomCursor' // Import CustomCursor
import ParticleBackground from './components/ParticleBackground' // Import ParticleBackground

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    // Default to true (dark mode) if no saved preference
    return saved !== null ? JSON.parse(saved) : true
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500 relative">
      <CustomCursor /> {/* Add CustomCursor component */}
      <ParticleBackground /> {/* Single animated background for entire page */}
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="relative z-10">
        <Navbar darkMode={darkMode} />
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
