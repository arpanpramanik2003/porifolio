'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Always default to dark mode for both SSR and initial client hydration pass
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Sync theme from localStorage after initial client mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Update document class and localStorage when theme changes (only after mounting)
  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode, mounted])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light',
    mounted
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
