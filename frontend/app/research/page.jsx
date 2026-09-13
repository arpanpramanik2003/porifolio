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
  return (
    <div className="pt-20">
      <Research />
    </div>
  )
}
