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
  metadataBase: new URL('https://arpanpramanik.dev'),
  title: 'Arpan Pramanik | Full-Stack & AI/ML Developer',
  description: 'Official portfolio of Arpan Pramanik — Full-Stack & AI/ML Developer specializing in React, Next.js, Deep Learning, and Computer Vision solutions.',
  keywords: [
    'Arpan Pramanik',
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Deep Learning',
    'Computer Vision',
    'Web Development',
    'React',
    'Next.js',
    'Python',
    'TensorFlow',
    'Portfolio'
  ],
  authors: [{ name: 'Arpan Pramanik' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://arpanpramanik.dev',
  },
  openGraph: {
    type: 'website',
    url: 'https://arpanpramanik.dev',
    title: 'Arpan Pramanik | Full-Stack & AI/ML Developer',
    description: 'Official portfolio of Arpan Pramanik — Full-Stack & AI/ML Developer specializing in React, Next.js, Deep Learning, and Computer Vision solutions.',
    siteName: 'Arpan Pramanik Portfolio',
    images: [
      {
        url: 'https://arpanpramanik.dev/logo.png',
        width: 1200,
        height: 630,
        alt: 'Arpan Pramanik - Full-Stack & AI/ML Developer Portfolio'
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://arpanpramanik.dev',
    title: 'Arpan Pramanik | Full-Stack & AI/ML Developer',
    description: 'Official portfolio of Arpan Pramanik — Full-Stack & AI/ML Developer specializing in React, Next.js, Deep Learning, and Computer Vision solutions.',
    images: ['https://arpanpramanik.dev/logo.png'],
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
        '@id': 'https://arpanpramanik.dev/#website',
        url: 'https://arpanpramanik.dev',
        name: 'Arpan Pramanik Portfolio',
        publisher: {
          '@id': 'https://arpanpramanik.dev/#person'
        }
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://arpanpramanik.dev/#profilepage',
        url: 'https://arpanpramanik.dev',
        name: 'Arpan Pramanik Portfolio',
        mainEntity: {
          '@id': 'https://arpanpramanik.dev/#person'
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://arpanpramanik.dev/#person',
        name: 'Arpan Pramanik',
        url: 'https://arpanpramanik.dev',
        image: 'https://arpanpramanik.dev/profile.jpg',
        logo: 'https://arpanpramanik.dev/logo.png',
        jobTitle: 'Full-Stack & AI/ML Developer',
        description: 'Full-Stack Developer specializing in AI/ML, Deep Learning, Computer Vision, React, and Next.js',
        sameAs: [
          'https://github.com/arpanpramanik2003',
          'https://www.linkedin.com/in/arpanpramanik2003/'
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'The Neotia University'
        },
        knowsAbout: [
          'Full-Stack Development',
          'Artificial Intelligence',
          'Machine Learning',
          'Deep Learning',
          'Computer Vision',
          'React.js',
          'Next.js',
          'Python',
          'TensorFlow',
          'Node.js',
          'Web Development'
        ],
        hasPart: {
          '@type': 'CreativeWork',
          name: 'Arpan Pramanik Resume',
          url: 'https://arpanpramanik.dev/resume.pdf'
        }
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
