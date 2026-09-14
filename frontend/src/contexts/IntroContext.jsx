'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const IntroContext = createContext({
  hasSeenIntro: false,
  setHasSeenIntro: () => {},
  hasSeenNameCycle: false,
  setHasSeenNameCycle: () => {}
})

export const useIntro = () => useContext(IntroContext)

// Module-level in-memory cache: resets on page refresh (F5/reload), persists across client-side route transitions
let inMemoryIntroSeen = false
let inMemoryNameCycleSeen = false

export const IntroProvider = ({ children }) => {
  const [hasSeenIntro, setHasSeenIntroState] = useState(inMemoryIntroSeen)
  const [hasSeenNameCycle, setHasSeenNameCycleState] = useState(inMemoryNameCycleSeen)

  // Clear legacy sessionStorage so refresh always triggers intro as requested
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('hasSeenIntro')
      } catch (e) {
        // Ignore storage errors
      }
    }
  }, [])

  const markIntroSeen = () => {
    inMemoryIntroSeen = true
    setHasSeenIntroState(true)
  }

  const markNameCycleSeen = () => {
    inMemoryNameCycleSeen = true
    setHasSeenNameCycleState(true)
  }

  const value = {
    hasSeenIntro,
    setHasSeenIntro: markIntroSeen,
    hasSeenNameCycle,
    setHasSeenNameCycle: markNameCycleSeen
  }

  return (
    <IntroContext.Provider value={value}>
      {children}
    </IntroContext.Provider>
  )
}
