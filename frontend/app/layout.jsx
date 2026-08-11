import '../src/index.css'
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
  title: 'Arpan Pramanik | Full-Stack Developer & AI/ML Enthusiast',
  description: 'Portfolio of Arpan Pramanik — Full-Stack Developer specializing in AI/ML, Deep Learning, Computer Vision, and Web Development.',
  keywords: [
    'Arpan Pramanik',
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Deep Learning',
    'Computer Vision',
    'Web Development',
    'React',
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
    title: 'Arpan Pramanik | Full-Stack Developer & AI/ML Enthusiast',
    description: 'Portfolio of Arpan Pramanik — Full-Stack Developer specializing in AI/ML, Deep Learning, Computer Vision, and Web Development.',
    siteName: 'Arpan Pramanik Portfolio',
    images: [
      {
        url: 'https://arpanpramanik.dev/logo.png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://arpanpramanik.dev',
    title: 'Arpan Pramanik | Full-Stack Developer & AI/ML Enthusiast',
    description: 'Portfolio of Arpan Pramanik — Full-Stack Developer specializing in AI/ML, Deep Learning, Computer Vision, and Web Development.',
    images: ['https://arpanpramanik.dev/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arpan Pramanik',
    url: 'https://arpanpramanik.dev',
    image: 'https://arpanpramanik.dev/profile.jpg',
    jobTitle: 'Full-Stack Developer & AI/ML Enthusiast',
    description: 'Full-Stack Developer specializing in AI/ML, Deep Learning, Computer Vision, and Web Development',
    sameAs: [
      'https://github.com/arpanpramanik2003',
      'https://www.linkedin.com/in/arpanpramanik2003/'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'The Neotia University'
    },
    hasPart: {
      '@type': 'CreativeWork',
      name: 'Arpan Pramanik Resume',
      url: 'https://www.arpanpramanik.dev/resume.pdf'
    }
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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
