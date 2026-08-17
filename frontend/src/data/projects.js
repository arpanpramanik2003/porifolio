export const projectsData = [
  {
    id: 1,
    title: 'PaperLens AI',
    category: 'Web Development',
    image: '/project-images/paperlens.webp',
    featured: true,
    description: 'AI research co-pilot for paper analysis, gap discovery, experiment planning, problem ideation, and dataset/benchmark recommendation.',
    fullDescription: 'PaperLens AI is a full-stack research intelligence platform built with React + Vite frontend and FastAPI backend. It now includes end-to-end academic workflow support: paper analysis (PDF/DOCX), grounded follow-up Q&A, gap detection, experiment planning, research-problem generation, and the new Dataset & Benchmark Finder that maps project title/plan to relevant datasets, benchmark suites, and domain technologies with card-wise explainable details. The system uses Groq-powered structured generation, Clerk JWT authentication, SQLAlchemy + PostgreSQL persistence, and a hybrid retrieval layer (FAISS + BM25) for grounded responses.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'FastAPI', 'Python', 'SQLAlchemy', 'PostgreSQL', 'Clerk', 'Groq API', 'FAISS', 'BM25', 'sentence-transformers', 'pdfplumber'],
    features: [
      'Paper Analyzer with PDF/DOCX upload and structured markdown output',
      'Grounded follow-up Q&A using document-aware hybrid retrieval',
      'Gap Detection from uploaded papers or direct project-plan text',
      'Experiment Planner that generates step-wise technical execution plans',
      'Problem Generator for domain/subdomain-based research idea creation',
      'Dataset & Benchmark Finder from project title or full project plan',
      'Card-wise recommendation UI with click-to-expand dataset/benchmark details',
      'Domain technology stack suggestions for faster implementation decisions',
      'Advanced landing page with interactive “Why PaperLens AI?” showcase',
      'Dashboard analytics for user activity and recently analyzed papers',
      'Hybrid RAG pipeline with FAISS + BM25 and optional CrossEncoder reranking',
      'Clerk-authenticated API with PostgreSQL-backed activity/document tracking'
    ],
    github: 'https://github.com/arpanpramanik2003/PaperLens-AI.git',
    live: "https://paperlens.arpanpramanik.dev/",
    status: 'Completed',
    year: '2026'
  },
  {
    id: 2,
    title: 'CampusSphere',
    category: 'Web Development',
    image: '/project-images/campussphere.webp',
    featured: false,
    description: 'Enterprise co-curricular activity verification, credit banking, and NAAC/NIRF accreditation compliance platform for higher education.',
    fullDescription: 'CampusSphere is a multi-tier, enterprise-grade co-curricular activity verification, institutional credit banking, and NAAC/NIRF accreditation compliance management system for higher education institutions. It streamlines student achievement submissions through a two-stage verification pipeline (Faculty Advisor Stage 1 verification followed by Institutional Admin Stage 2 final sign-off), automates credit assignment via a dynamic Credit Policy Engine mapped to NAAC Criteria 1–7, and provides cryptographic public credential verification (/verify/[verificationId]) alongside 1-click NAAC/NIRF compliance CSV reports.',
    tech: [
      'Next.js 15',
      'React 19',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'Sequelize',
      'Tailwind CSS',
      'Cloudinary API',
      'Upstash Redis',
      'OpenTelemetry',
      'Prometheus',
      'Pino',
      'Vercel',
      'Render'
    ],
    features: [
      'Two-Stage Verification Pipeline (Faculty Advisor Stage 1 & Institutional Admin Stage 2 sign-off)',
      'Dynamic Credit Policy Engine with weight matrices mapped to NAAC Criteria 1–7',
      'Co-Curricular Submission Hub with Cloudinary document/certificate evidence storage',
      'Real-time verification tracking and dynamic digital credit portfolio ledger',
      'Cryptographic Public Credential Verification via /verify/[verificationId]',
      'Faculty Advisor Console with Mentee Management and bulk review actions',
      'Institutional Admin Console for credit ledger locking, policy configuration & grievance resolution',
      'Bulk User Onboarding via CSV for thousands of students and faculty members',
      'Institutional Analytics Dashboards with 1-click NAAC/NIRF official CSV compliance exports',
      'Sliding-window auth rate limiting with Upstash Redis and memory fallback',
      'Enterprise Observability with OpenTelemetry distributed tracing, Prometheus metrics & Pino JSON logging'
    ],
    github: 'https://github.com/arpanpramanik2003/CampusSphere',
    live: 'https://ssh.arpanpramanik.dev/',
    status: 'Completed',
    year: '2026'
  },
  {
    id: 3,
    title: 'ABHIGRAHA 2K25',
    category: 'Web Development',
    image: '/project-images/cfw.webp',
    featured: false,
    description: 'Official college freshers event platform for ABHIGRAHA 2K25 with Express.js backend, dynamic galleries, sponsor management, and admin panel.',
    fullDescription: 'Comprehensive event management platform created for ABHIGRAHA 2K25 (Official College Freshers Fest) featuring an Express.js & Node.js backend with React frontend. Includes event scheduling system, dynamic photo galleries, sponsor showcase sections, team member displays, contact forms with backend message handling, and an administrative control panel for full content management.',
    tech: ['Express.js','Node.js', 'React', 'PostgreSQL', 'JWT', 'bycrypt', 'Tailwind CSS'],
    features: [
      'Event management system with scheduling',
      'Dynamic image galleries for event photos',
      'Sponsor management with logo displays',
      'Team member profiles and bios',
      'Contact form with backend message handling',
      'Admin panel for comprehensive content management',
      'PostgreSQL database integration',
      'Responsive design for all screen sizes'
    ],
    github: 'https://github.com/arpanpramanik2003/freshers-website.git',
    live: 'https://abhigraha2k25.vercel.app/',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 4,
    title: 'FruitQ-GradeX: Fruit Quality Grading with Explainable AI',
    category: 'Deep Learning',
    image: '/project-images/fruitqgradex.webp',
    featured: true,
    description: 'Multi-headed CNN for dual classification: fruit type (Apple, Banana, Guava, Orange) and quality (Good/Bad).',
    fullDescription: 'Deep learning system that classifies fruit images by both type and quality using a custom multi-headed CNN. Achieves 97.75% fruit classification accuracy and 98.21% quality assessment accuracy. Integrated Grad-CAM for visual explanations and features a real-time Streamlit interface with webcam support.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'Grad-CAM', 'Streamlit', 'OpenCV', 'ImageDataGenerator'],
    features: [
      'Dual prediction: fruit type AND quality simultaneously',
      '97.75% fruit classification accuracy, 98.21% quality accuracy',
      'Supports 4 fruit types: Apple, Banana, Guava, Orange',
      'Grad-CAM heatmaps for both output heads',
      'Real-time inference via webcam or image upload',
      'Dataset of 9,146 images across 8 categories',
      'Robust data augmentation pipeline',
      'Clean Streamlit UI with confidence scores'
    ],
    github: 'https://github.com/arpanpramanik2003/FruitQ-GradeX.git',
    live: 'https://fruitq-quality-classifier.streamlit.app/',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 5,
    title: 'NeuroVoice: AI Desktop Assistant',
    category: 'Machine Learning',
    image: '/project-images/neuravoice.webp',
    featured: false,
    description: 'Advanced AI-powered voice assistant with Ollama LLM integration for natural conversations and task automation.',
    fullDescription: 'Next-gen AI desktop assistant built with Python that combines speech recognition, text-to-speech, NLP, and Ollama LLM integration. Features real-time voice interaction, intelligent conversation, smart task execution (Wikipedia, web browsing, music, system controls), and modern Tkinter GUI with context awareness.',
    tech: ['Python', 'Ollama', 'speech_recognition', 'pyttsx3', 'Tkinter', 'LLM', 'NLP'],
    features: [
      'Real-time voice recognition and natural voice responses',
      'Ollama LLM integration (llama3.2:3b) for human-like conversations',
      'Smart task execution: Wikipedia search, web navigation, music player',
      'System controls: shutdown, restart, sleep, app launching',
      'Context-aware responses with memory of user identity',
      'Modern Tkinter GUI with scrollable conversation history',
      'Wake-word independent continuous listening',
      'Automatic fallback when LLM unavailable'
    ],
    github: 'https://github.com/arpanpramanik2003/NeuraVoice.git',
    live: null,
    status: 'Completed',
    year: '2025'
  },
]

// Helper functions
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

export const getAllProjects = () => {
  return projectsData
}

export const getProjectsByCategory = (category) => {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
}
