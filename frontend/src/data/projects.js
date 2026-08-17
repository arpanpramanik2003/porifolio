export const projectsData = [
  {
    id: 1,
    title: 'PaperLens AI',
    category: 'Web Development',
    image: '/project-images/paperlens.webp',
    featured: true,
    description: 'Autonomous full-stack AI research platform for literature analysis, experiment planning, problem ideation, gap detection, citation intelligence, and benchmark discovery.',
    fullDescription: 'PaperLens AI is an autonomous, full-stack AI research orchestrator designed to transform unstructured academic literature into structured, actionable research outputs. Features a dual-pipeline RAG architecture (in-memory BM25 + FAISS hybrid search for instant single-session analysis, paired with remote Supabase pgvector persistence for cross-session synthesis), a multi-provider fallback engine, real-time Server-Sent Events (SSE) citation tracking, and an autonomous ReAct agent loop with Model Context Protocol (MCP) server support. Engineered specifically for production memory constraints (500MB cap compliant) through generator-based stream parsing, lazy-loaded vector models, and turn-compressed prompt optimization.',
    tech: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
      'Python 3.10+',
      'FastAPI',
      'Pydantic v2',
      'Clerk JWT',
      'SQLAlchemy 2.0',
      'Supabase pgvector',
      'PostgreSQL',
      'PyMuPDF (fitz)',
      'rank_bm25',
      'FAISS',
      'sentence-transformers',
      'tiktoken',
      'Groq API',
      'ReAct Agent',
      'MCP Server'
    ],
    features: [
      'Dual-Pipeline RAG Architecture (In-memory BM25 + FAISS hybrid search + remote Supabase pgvector persistence)',
      'Autonomous ReAct Agent Loop with turn-compressed system prompts & native Model Context Protocol (MCP) integration',
      'Deterministic Fast-Path Router saving ~1.5s latency (~600 tokens/query) for direct intent queries',
      'LLM Call Consolidation reducing API calls by 54.5% via batched single-pass synthesis & critique',
      'Paper Analyzer Engine with generator-based stream parsing and Map-Reduce persistent document summarization',
      'Experiment Planner generating structured 6-phase research roadmaps with parameter baselines & risk assessments',
      'Two-Stage Problem Generator for novel domain research problem discovery and methodology expansion',
      'Gap Detection Engine evaluating manuscripts for methodological flaws, unstated assumptions & severity scores',
      'Dataset & Benchmark Finder matching research problems with standard datasets, evaluation metrics & baseline models',
      'Citation Intelligence with 4-stage fallback matcher (DOI → Exact → Title → Loose) streaming via SSE',
      '500MB Heap Memory Cap Compliance using generator stream parsing and lazy-loaded SentenceTransformer models',
      'Strict Pydantic v2 Schemas & XML tag structured output enforcement with 0 parsing retries',
      'Stateless Clerk RSA-256 JWT authentication with custom sliding-window token bucket rate limiting'
    ],
    github: 'https://github.com/arpanpramanik2003/PaperLens-AI',
    live: 'https://paperlens.arpanpramanik.dev/',
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
