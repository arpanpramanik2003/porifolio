import { notFound } from 'next/navigation'
import { projectsData, getProjectBySlug, getAllProjectSlugs } from '../../../src/data/projects'
import ProjectDetailView from '../../../src/components/ProjectDetailView'

export function generateStaticParams() {
  return getAllProjectSlugs()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Arpan Pramanik',
      description: 'The requested engineering project could not be found.',
    }
  }

  const pageUrl = `https://arpanpramanik.tech/projects/${project.slug}`
  const imageUrl = project.image?.startsWith('http')
    ? project.image
    : `https://arpanpramanik.tech${project.image}`

  return {
    title: `${project.title} | Arpan Pramanik — Architecture & Case Study`,
    description: project.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Arpan Pramanik — Full-Stack & AI Systems`,
      description: project.description,
      url: pageUrl,
      siteName: 'Arpan Pramanik',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} — Architecture by Arpan Pramanik`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Arpan Pramanik`,
      description: project.description,
      images: [imageUrl],
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projectsData.findIndex((p) => p.slug === project.slug)
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://arpanpramanik.tech',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: 'https://arpanpramanik.tech/projects',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `https://arpanpramanik.tech/projects/${project.slug}`,
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: project.title,
        headline: project.tagline,
        applicationCategory: project.category,
        operatingSystem: 'Cloud / Web / Cross-Platform',
        description: project.fullDescription || project.description,
        url: `https://arpanpramanik.tech/projects/${project.slug}`,
        codeRepository: project.github || undefined,
        author: {
          '@type': 'Person',
          '@id': 'https://arpanpramanik.tech/#person',
          name: 'Arpan Pramanik',
        },
        keywords: project.tech?.join(', '),
      },
    ],
  }

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailView
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </div>
  )
}
