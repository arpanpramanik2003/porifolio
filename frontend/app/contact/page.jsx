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
  return (
    <div className="pt-20">
      <Contact />
    </div>
  )
}
