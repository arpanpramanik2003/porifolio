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
  const projectsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://arpanpramanik.tech'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: 'https://arpanpramanik.tech/projects'
          }
        ]
      },
      {
        '@type': 'ItemList',
        name: 'Engineered Software Applications & AI Systems by Arpan Pramanik',
        itemListElement: [
          {
            '@type': 'SoftwareApplication',
            position: 1,
            name: 'PaperLens AI',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Cloud / Web',
            url: 'https://paperlens.arpanpramanik.tech/',
            codeRepository: 'https://github.com/arpanpramanik2003/PaperLens-AI',
            description: 'Autonomous full-stack AI research platform for literature analysis, experiment planning, problem ideation, and benchmark discovery featuring a dual-pipeline RAG architecture.',
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'SoftwareApplication',
            position: 2,
            name: 'CampusSphere',
            applicationCategory: 'EnterpriseApplication',
            operatingSystem: 'Cloud / Web',
            url: 'https://ssh.arpanpramanik.tech/',
            codeRepository: 'https://github.com/arpanpramanik2003/CampusSphere',
            description: 'Enterprise co-curricular activity verification, credit banking, and NAAC/NIRF accreditation compliance management system for higher education.',
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'SoftwareApplication',
            position: 3,
            name: 'FruitQ-GradeX',
            applicationCategory: 'ComputerVisionApplication',
            operatingSystem: 'Web / Streamlit',
            url: 'https://fruitq-quality-classifier.streamlit.app/',
            codeRepository: 'https://github.com/arpanpramanik2003/FruitQ-GradeX',
            description: 'Deep learning system for simultaneous fruit classification and quality grading using custom multi-headed CNN with Grad-CAM explainable AI heatmaps.',
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'SoftwareApplication',
            position: 4,
            name: 'NeuroVoice',
            applicationCategory: 'VoiceAssistant',
            operatingSystem: 'Desktop / Cross-Platform',
            codeRepository: 'https://github.com/arpanpramanik2003/NeuraVoice',
            description: 'On-device AI voice assistant with Ollama LLM integration for natural conversations, context memory, and OS task automation.',
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'SoftwareApplication',
            position: 5,
            name: 'ABHIGRAHA 2K25',
            applicationCategory: 'EventPlatform',
            operatingSystem: 'Web',
            url: 'https://abhigraha2k25.vercel.app/',
            codeRepository: 'https://github.com/arpanpramanik2003/freshers-website',
            description: 'High-capacity event scheduling, media gallery hub, and sponsor management system with role-based admin console.',
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          }
        ]
      }
    ]
  }

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Projects />
    </div>
  )
}
