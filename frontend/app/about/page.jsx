import AboutDossier from '../../src/components/AboutDossier'

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
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'About',
        item: 'https://arpanpramanik.tech/about'
      }
    ]
  }

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutDossier />
    </div>
  )
}
