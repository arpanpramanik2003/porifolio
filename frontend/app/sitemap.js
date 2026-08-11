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
  ]
}
