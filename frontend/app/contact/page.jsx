import Contact from '../../src/components/Contact'

export const metadata = {
  title: 'Contact | Arpan Pramanik — Engineering Inquiries',
  description: 'Connect with Arpan Pramanik for AI/ML engineering roles, full-stack architectures, research collaborations, or technical consultations.',
  alternates: {
    canonical: 'https://arpanpramanik.tech/contact',
  },
  openGraph: {
    title: 'Contact | Arpan Pramanik — Engineering Inquiries',
    description: 'Connect with Arpan Pramanik for AI/ML engineering roles, full-stack architectures, research collaborations, or technical consultations.',
    url: 'https://arpanpramanik.tech/contact',
  }
}

export default function ContactPage() {
  const contactJsonLd = {
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
            name: 'Contact',
            item: 'https://arpanpramanik.tech/contact'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How can I collaborate with Arpan Pramanik on Autonomous AI Agents & RAG architectures?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Arpan Pramanik collaborates with teams and organizations on autonomous agent architectures, multi-provider fallback engines, and high-performance hybrid RAG systems (BM25 + FAISS + pgvector). Inquiries can be submitted directly via the contact console.'
            }
          },
          {
            '@type': 'Question',
            name: 'What full-stack and systems engineering opportunities is Arpan open to?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Arpan is open for full-time software engineering roles, high-impact contract initiatives, and technical advisory requiring Next.js, React, TypeScript, FastAPI, Python, and distributed systems.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can academic researchers initiate scholarly collaboration on machine learning publications?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Researchers can initiate collaborations on Explainable Deep Learning (Grad-CAM), Computer Vision architectures, and multi-task neural networks for peer-reviewed conference publications in IEEE and Springer.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the expected response time for direct inquiries?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All transmissions received via the portfolio dispatch console receive an expedited direct response within 24 hours.'
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Contact />
    </div>
  )
}
