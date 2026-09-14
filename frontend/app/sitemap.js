import { projectsData } from '../src/data/projects'

export default function sitemap() {
  const baseUrl = 'https://arpanpramanik.tech'
  // Stable release date prevents artificial churn on every second of build
  const lastDeployment = '2026-09-14T00:00:00.000Z'

  const coreRoutes = [
    {
      url: baseUrl,
      lastModified: lastDeployment,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: lastDeployment,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: lastDeployment,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastDeployment,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastDeployment,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: lastDeployment,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: lastDeployment,
    changeFrequency: 'monthly',
    priority: project.featured ? 0.85 : 0.8,
  }))

  return [...coreRoutes, ...projectRoutes]
}
