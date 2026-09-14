'use client'

import { ThemeProvider } from '../src/contexts/ThemeContext'
import SmoothScroll from '../src/components/SmoothScroll'
import StaticBackground from '../src/components/StaticBackground'
import CustomCursor from '../src/components/CustomCursor'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

export default function GlobalShell({ children }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div
          className="relative min-h-screen font-body transition-colors duration-500"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
          {/* Fixed background architectural texture */}
          <StaticBackground />

          {/* Global Header Navigation */}
          <Navbar />

          {/* Page-Specific Content */}
          <main className="relative">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Smooth custom cursor overlay (rendered last for top-most z-order) */}
          <CustomCursor />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}
