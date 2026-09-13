import '../src/index.css'
import { Analytics } from '@vercel/analytics/next'
import {
  JetBrains_Mono,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Outfit,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Syne
} from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  weight: ['700'],
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})

const notoSansTamil = Noto_Sans_Tamil({
  weight: ['700'],
  subsets: ['tamil'],
  variable: '--font-tamil',
  display: 'swap',
})

const notoSansTelugu = Noto_Sans_Telugu({
  weight: ['700'],
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://arpanpramanik.tech'),
  title: 'Arpan Pramanik | AI/ML Engineer & Full-Stack Developer',
  description: 'Official portfolio of Arpan Pramanik — AI/ML Engineer & Full-Stack Developer. Explore published IEEE/Springer research, deep learning systems, and web platforms.',
  keywords: [
    'Arpan Pramanik',
    'Arpan Pramanik AI Engineer',
    'Arpan Pramanik AI/ML Engineer',
    'Arpan Pramanik Software Engineer',
    'Arpan Pramanik Researcher',
    'Arpan Pramanik projects',
    'Arpan Pramanik portfolio',
    'Arpan Pramanik machine learning',
    'Arpan Pramanik artificial intelligence',
    'Arpan Pramanik GitHub',
    'Arpan Pramanik research',
    'Arpan Pramanik papers',
    'Arpan Pramanik publications',
    'PaperLens AI',
    'FruitQ-GradeX',
    'Deep Learning',
    'Computer Vision',
    'Next.js',
    'React',
    'Python',
    'FastAPI'
  ],
  authors: [{ name: 'Arpan Pramanik', url: 'https://arpanpramanik.tech' }],
  creator: 'Arpan Pramanik',
  publisher: 'Arpan Pramanik',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://arpanpramanik.tech',
  },
  openGraph: {
    type: 'website',
    url: 'https://arpanpramanik.tech',
    title: 'Arpan Pramanik | AI/ML Engineer & Full-Stack Developer',
    description: 'Official portfolio of Arpan Pramanik — AI/ML Engineer & Full-Stack Developer. Explore published IEEE/Springer research, deep learning systems, and web platforms.',
    siteName: 'Arpan Pramanik',
    images: [
      {
        url: 'https://arpanpramanik.tech/profile.webp',
        width: 1200,
        height: 630,
        alt: 'Arpan Pramanik - AI/ML Engineer & Full-Stack Developer Portfolio'
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://arpanpramanik.tech',
    title: 'Arpan Pramanik | AI/ML Engineer & Full-Stack Developer',
    description: 'Official portfolio of Arpan Pramanik — AI/ML Engineer & Full-Stack Developer. Explore published IEEE/Springer research, deep learning systems, and web platforms.',
    images: ['https://arpanpramanik.tech/profile.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://arpanpramanik.tech/#website',
        url: 'https://arpanpramanik.tech',
        name: 'Arpan Pramanik',
        alternateName: ['Arpan Pramanik Portfolio', 'Arpan Pramanik Tech'],
        publisher: {
          '@id': 'https://arpanpramanik.tech/#person'
        }
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://arpanpramanik.tech/#profilepage',
        url: 'https://arpanpramanik.tech',
        name: 'Arpan Pramanik — Official Portfolio',
        mainEntity: {
          '@id': 'https://arpanpramanik.tech/#person'
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://arpanpramanik.tech/#person',
        name: 'Arpan Pramanik',
        givenName: 'Arpan',
        familyName: 'Pramanik',
        url: 'https://arpanpramanik.tech',
        image: 'https://arpanpramanik.tech/profile.webp',
        logo: 'https://arpanpramanik.tech/profile.webp',
        jobTitle: ['AI/ML Engineer', 'Full-Stack Developer', 'AI Researcher'],
        description: 'AI/ML Engineer and Full-Stack Developer specializing in deep learning, computer vision, explainable AI, and Next.js platforms.',
        sameAs: [
          'https://github.com/arpanpramanik2003',
          'https://www.linkedin.com/in/arpanpramanik2003/'
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'The Neotia University'
        },
        knowsAbout: [
          'Artificial Intelligence',
          'Machine Learning',
          'Deep Learning',
          'Computer Vision',
          'Explainable AI (Grad-CAM)',
          'Retrieval-Augmented Generation (RAG)',
          'React.js',
          'Next.js',
          'Python',
          'FastAPI',
          'TensorFlow',
          'PyTorch',
          'Node.js',
          'PostgreSQL',
          'Web Development'
        ],
        hasPart: {
          '@type': 'CreativeWork',
          name: 'Arpan Pramanik Resume',
          url: 'https://arpanpramanik.tech/resume.pdf'
        }
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': 'https://doi.org/10.1109/ICRITO66076.2025.11241706',
        headline: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
        name: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
        author: { '@id': 'https://arpanpramanik.tech/#person' },
        publisher: { '@type': 'Organization', name: 'IEEE' },
        sameAs: 'https://doi.org/10.1109/ICRITO66076.2025.11241706'
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': 'https://doi.org/10.1007/978-3-032-21901-5_35',
        headline: 'Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3',
        name: 'Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3',
        author: { '@id': 'https://arpanpramanik.tech/#person' },
        publisher: { '@type': 'Organization', name: 'Springer' },
        sameAs: 'https://doi.org/10.1007/978-3-032-21901-5_35'
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': 'https://doi.org/10.1109/ICRITO66076.2025.11241535',
        headline: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
        name: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
        author: { '@id': 'https://arpanpramanik.tech/#person' },
        publisher: { '@type': 'Organization', name: 'IEEE' },
        sameAs: 'https://doi.org/10.1109/ICRITO66076.2025.11241535'
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': 'https://doi.org/10.1109/COMPUTINGCON64838.2025.11376762',
        headline: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
        name: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
        author: { '@id': 'https://arpanpramanik.tech/#person' },
        publisher: { '@type': 'Organization', name: 'IEEE' },
        sameAs: 'https://doi.org/10.1109/COMPUTINGCON64838.2025.11376762'
      }
    ]
  }

  const fontVariables = [
    jetbrainsMono.variable,
    notoSansBengali.variable,
    notoSansDevanagari.variable,
    notoSansTamil.variable,
    notoSansTelugu.variable,
    outfit.className,
    plusJakartaSans.variable,
    spaceGrotesk.variable,
    syne.variable
  ].join(' ')

  return (
    <html lang="en" className={`${fontVariables} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
