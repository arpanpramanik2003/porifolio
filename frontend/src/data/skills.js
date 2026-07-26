const devicon = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const domainEcosystem = [
  {
    id: 'languages',
    index: '01',
    category: 'Languages',
    tagline: 'RUNTIME EXECUTION & CORE LOGIC',
    description: 'Formulating efficient algorithms, concurrent data processing, and type-safe backend abstractions across low-level and high-level execution runtimes.',
    clusters: [
      {
        name: 'High-Level & AI Execution',
        skills: [
          { name: 'Python', role: 'AI & Data Engine', logo: devicon('python') },
          { name: 'JavaScript', role: 'Reactive Systems', logo: devicon('javascript') },
          { name: 'Java', role: 'OOP & Enterprise', logo: devicon('java') }
        ]
      },
      {
        name: 'Systems & Query Engines',
        skills: [
          { name: 'C', role: 'Systems & Memory', logo: devicon('c') },
          { name: 'SQL', role: 'Relational Queries', logo: devicon('postgresql') },
          { name: 'R', role: 'Statistical Computing', logo: devicon('r') }
        ]
      }
    ]
  },
  {
    id: 'ai-engineering',
    index: '02',
    category: 'AI & Intelligent Systems',
    tagline: 'NEURAL NETWORKS, VISION & RAG',
    description: 'Architecting deep learning pipelines, training computer vision models, building explainable AI with Grad-CAM, and deploying RAG architectures.',
    clusters: [
      {
        name: 'Deep Learning & Vision Frameworks',
        skills: [
          { name: 'PyTorch', role: 'Neural Architectures', logo: devicon('pytorch') },
          { name: 'TensorFlow', role: 'Model Training & Serving', logo: devicon('tensorflow') },
          { name: 'Keras', role: 'Rapid DL Prototyping', logo: devicon('keras') },
          { name: 'OpenCV', role: 'Computer Vision', logo: devicon('opencv') },
          { name: 'Scikit-Learn', role: 'Predictive Modeling', logo: devicon('scikitlearn') }
        ]
      },
      {
        name: 'Explainable AI & RAG Orchestration',
        skills: [
          { name: 'Grad-CAM (XAI)', role: 'Model Explainability', logo: null, tag: 'XAI' },
          { name: 'Hugging Face', role: 'Transformers & LLMs', logo: '🤗' },
          { name: 'FAISS', role: 'Vector Similarity Indexing', logo: null, tag: 'RAG' },
          { name: 'Groq API', role: 'Ultra-Fast Inference', logo: null, tag: 'LLM' }
        ]
      }
    ]
  },
  {
    id: 'full-stack',
    index: '03',
    category: 'Full-Stack Engineering',
    tagline: 'REACTIVE UIs & ASYNCHRONOUS APIs',
    description: 'Engineering high-throughput asynchronous microservices, server-rendered frontend architectures, and resilient RESTful APIs for production environments.',
    clusters: [
      {
        name: 'Reactive Client Architectures',
        skills: [
          { name: 'React.js', role: 'Component Framework', logo: devicon('react') },
          { name: 'Next.js', role: 'SSR & App Router', logo: devicon('nextjs') },
          { name: 'Tailwind CSS', role: 'Design Systems', logo: devicon('tailwindcss') }
        ]
      },
      {
        name: 'Scalable Backend Microservices',
        skills: [
          { name: 'Node.js', role: 'Event-Driven Runtime', logo: devicon('nodejs') },
          { name: 'Express.js', role: 'HTTP Microservices', logo: devicon('express', 'original') },
          { name: 'FastAPI', role: 'Async Python Services', logo: devicon('fastapi') },
          { name: 'REST APIs', role: 'Contract Specifications', logo: null, tag: 'API' }
        ]
      }
    ]
  },
  {
    id: 'data-cloud',
    index: '04',
    category: 'Data & Cloud Infrastructure',
    tagline: 'VECTOR STORES, CLOUD & CI/CD',
    description: 'Designing relational and document schemas, managing vector stores for similarity search, automating CI/CD deployments, and orchestrating cloud services.',
    clusters: [
      {
        name: 'Persistence & Vector Databases',
        skills: [
          { name: 'PostgreSQL', role: 'Relational Store', logo: devicon('postgresql') },
          { name: 'MongoDB', role: 'Document Database', logo: devicon('mongodb') },
          { name: 'Supabase (pgvector)', role: 'Vector Search Engine', logo: devicon('supabase') }
        ]
      },
      {
        name: 'Cloud Ecosystem & Containerization',
        skills: [
          { name: 'AWS (EC2, S3, Lambda)', role: 'Cloud Computing & Storage', logo: devicon('amazonwebservices', 'plain-wordmark') },
          { name: 'Docker', role: 'Container Reproducibility', logo: devicon('docker') },
          { name: 'GitHub Actions', role: 'Automated CI/CD Pipelines', logo: devicon('githubactions') }
        ]
      }
    ]
  },
  {
    id: 'workflow-mlops',
    index: '05',
    category: 'MLOps & Developer Ecosystem',
    tagline: 'PRODUCTION DISCIPLINE & TOOLING',
    description: 'Maintaining code quality, versioned pipeline deployments, reproducible container environments, and automated testing suites across the software lifecycle.',
    clusters: [
      {
        name: 'Environment & Version Control',
        skills: [
          { name: 'Git & GitHub', role: 'Distributed Control', logo: devicon('git') },
          { name: 'Linux Administration', role: 'POSIX Server Management', logo: devicon('linux') },
          { name: 'Postman', role: 'API Testing & Docs', logo: devicon('postman') }
        ]
      },
      {
        name: 'Build & Delivery Infrastructure',
        skills: [
          { name: 'Vite', role: 'Lightning Bundler', logo: devicon('vite') },
          { name: 'Vercel', role: 'Global Edge Hosting', logo: devicon('vercel') },
          { name: 'Jupyter', role: 'Data Exploration', logo: devicon('jupyter') }
        ]
      }
    ]
  }
]
