import About from '../../src/components/About'
import Skills from '../../src/components/Skills'
import Experience from '../../src/components/Experience'
import Certificates from '../../src/components/Certificates'

export const metadata = {
  title: 'About | Arpan Pramanik — Background, Stack & Experience',
  description: 'Explore Arpan Pramanik\'s background, core engineering philosophy, AI/ML skills ecosystem, professional internships, and verified credentials.',
  alternates: {
    canonical: 'https://arpanpramanik.tech/about',
  },
  openGraph: {
    title: 'About | Arpan Pramanik — Background, Stack & Experience',
    description: 'Explore Arpan Pramanik\'s background, core engineering philosophy, AI/ML skills ecosystem, professional internships, and verified credentials.',
    url: 'https://arpanpramanik.tech/about',
  }
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Skills />
      <Experience />
      <Certificates />
    </div>
  )
}
