import Projects from '../../src/components/Projects'

export const metadata = {
  title: 'Projects | Arpan Pramanik — Full-Stack & AI Systems',
  description: 'Production systems, autonomous AI agents, and full-stack platforms engineered by Arpan Pramanik, including PaperLens AI, CampusSphere, and FruitQ-GradeX.',
  alternates: {
    canonical: 'https://arpanpramanik.tech/projects',
  },
  openGraph: {
    title: 'Projects | Arpan Pramanik — Full-Stack & AI Systems',
    description: 'Production systems, autonomous AI agents, and full-stack platforms engineered by Arpan Pramanik, including PaperLens AI, CampusSphere, and FruitQ-GradeX.',
    url: 'https://arpanpramanik.tech/projects',
  }
}

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
    </div>
  )
}
