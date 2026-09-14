import Research from '../../src/components/Research'

export const metadata = {
  title: 'Research & Publications | Arpan Pramanik',
  description: 'Peer-reviewed conference papers, IEEE and Springer proceedings, and deep learning research authored by Arpan Pramanik, featuring registered DOIs and citations.',
  alternates: {
    canonical: 'https://arpanpramanik.tech/research',
  },
  openGraph: {
    title: 'Research & Publications | Arpan Pramanik',
    description: 'Peer-reviewed conference papers, IEEE and Springer proceedings, and deep learning research authored by Arpan Pramanik, featuring registered DOIs and citations.',
    url: 'https://arpanpramanik.tech/research',
  }
}

export default function ResearchPage() {
  const researchJsonLd = {
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
            name: 'Research & Publications',
            item: 'https://arpanpramanik.tech/research'
          }
        ]
      },
      {
        '@type': 'ItemList',
        name: 'Peer-Reviewed Conference Papers & Publications by Arpan Pramanik',
        itemListElement: [
          {
            '@type': 'ScholarlyArticle',
            position: 1,
            name: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
            headline: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
            sameAs: 'https://doi.org/10.1109/ICRITO66076.2025.11241706',
            url: 'https://doi.org/10.1109/ICRITO66076.2025.11241706',
            publisher: { '@type': 'Organization', name: 'IEEE' },
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'ScholarlyArticle',
            position: 2,
            name: 'Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3',
            headline: 'Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3',
            sameAs: 'https://doi.org/10.1007/978-3-032-21901-5_35',
            url: 'https://doi.org/10.1007/978-3-032-21901-5_35',
            publisher: { '@type': 'Organization', name: 'Springer' },
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'ScholarlyArticle',
            position: 3,
            name: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
            headline: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
            sameAs: 'https://doi.org/10.1109/ICRITO66076.2025.11241535',
            url: 'https://doi.org/10.1109/ICRITO66076.2025.11241535',
            publisher: { '@type': 'Organization', name: 'IEEE' },
            author: { '@id': 'https://arpanpramanik.tech/#person' }
          },
          {
            '@type': 'ScholarlyArticle',
            position: 4,
            name: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
            headline: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
            sameAs: 'https://doi.org/10.1109/COMPUTINGCON64838.2025.11376762',
            url: 'https://doi.org/10.1109/COMPUTINGCON64838.2025.11376762',
            publisher: { '@type': 'Organization', name: 'IEEE' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchJsonLd) }}
      />
      <Research />
    </div>
  )
}
