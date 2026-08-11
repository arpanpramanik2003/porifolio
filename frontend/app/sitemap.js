export default function sitemap() {
  const baseUrl = 'https://arpanpramanik.dev'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
