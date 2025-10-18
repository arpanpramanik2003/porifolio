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

function App() {
  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
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
  )
}

export default App
