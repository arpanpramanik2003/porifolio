const devicon = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const domainEcosystem = [
  {
    id: 'ai-ml',
    index: '01',
    category: 'AI & Machine Learning',
    tagline: 'AUTONOMOUS AGENTS, RAG & DEEP LEARNING',
    description: 'Architecting deep learning pipelines, training neural vision models, building explainable AI, and deploying autonomous agent loops with vector retrieval.',
    clusters: [
      {
        name: 'Neural Architectures & Inference',
        skills: [
          { name: 'Python', role: 'Core AI Engine', logo: devicon('python') },
          { name: 'PyTorch', role: 'Neural Architectures', logo: devicon('pytorch') },
          { name: 'Hugging Face', role: 'Transformers & LLMs', logo: '🤗' },
          { name: 'FAISS', role: 'Vector Similarity Indexing', logo: null, tag: 'RAG' },
          { name: 'LangChain', role: 'ReAct Agent Loops', logo: null, tag: 'AGENT' },
          { name: 'OpenCV', role: 'Computer Vision', logo: devicon('opencv') },
          { name: 'Scikit-Learn', role: 'Predictive Modeling', logo: devicon('scikitlearn') }
        ]
      }
    ]
  },
  {
    id: 'full-stack',
    index: '02',
    category: 'Full-Stack Engineering',
    tagline: 'REACTIVE CLIENTS & HIGH-PERFORMANCE APIs',
    description: 'Engineering asynchronous microservices, server-rendered frontend architectures, and resilient RESTful APIs with strict type safety.',
    clusters: [
      {
        name: 'Web & API Systems',
        skills: [
          { name: 'Next.js 15', role: 'SSR & Edge Routing', logo: devicon('nextjs') },
          { name: 'React 19', role: 'Reactive Architecture', logo: devicon('react') },
          { name: 'TypeScript', role: 'Strict Type Safety', logo: devicon('typescript') },
          { name: 'FastAPI', role: 'High-Throughput Async APIs', logo: devicon('fastapi') },
          { name: 'Tailwind CSS', role: 'Design Systems', logo: devicon('tailwindcss') },
          { name: 'Node.js', role: 'Event-Driven Runtime', logo: devicon('nodejs') },
          { name: 'JavaScript', role: 'Dynamic Client Logic', logo: devicon('javascript') }
        ]
      }
    ]
  },
  {
    id: 'data-cloud',
    index: '03',
    category: 'Data & Cloud Systems',
    tagline: 'VECTOR STORES, CLOUD INFRASTRUCTURE & CI/CD',
    description: 'Designing relational schemas, managing vector databases for semantic search, containerizing services, and deploying cloud pipelines.',
    clusters: [
      {
        name: 'Databases & Cloud Deployments',
        skills: [
          { name: 'PostgreSQL', role: 'Relational Database', logo: devicon('postgresql') },
          { name: 'Supabase (pgvector)', role: 'Vector Search Engine', logo: devicon('supabase') },
          { name: 'MongoDB', role: 'Document Database', logo: devicon('mongodb') },
          { name: 'Docker', role: 'Reproducible Containers', logo: devicon('docker') },
          { name: 'AWS', role: 'Cloud Infrastructure', logo: devicon('amazonwebservices', 'plain-wordmark') },
          { name: 'GitHub Actions', role: 'CI/CD Automation', logo: devicon('githubactions') }
        ]
      }
    ]
  },
  {
    id: 'tooling-mlops',
    index: '04',
    category: 'MLOps & Tooling',
    tagline: 'PRODUCTION DISCIPLINE & SERVER MANAGEMENT',
    description: 'Maintaining versioned repository hygiene, POSIX server management, and automated global edge delivery.',
    clusters: [
      {
        name: 'Infrastructure & Workflows',
        skills: [
          { name: 'Git & GitHub', role: 'Version Control', logo: devicon('git') },
          { name: 'Linux', role: 'Server Administration', logo: devicon('linux') },
          { name: 'Vercel', role: 'Edge Deployment', logo: devicon('vercel') }
        ]
      }
    ]
  }
];
