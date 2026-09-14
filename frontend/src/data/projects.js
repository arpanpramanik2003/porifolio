export const projectsData = [
  {
    id: 1,
    title: 'PaperLens AI',
    tagline: 'Autonomous AI Research Co-Pilot & Literature Engine',
    category: 'AI Agents & RAG',
    image: '/project-images/paperlens.webp',
    logo: '/project-logo/paperlens-logo.webp',
    featured: true,
    year: '2026',
    status: 'Production Live',
    github: 'https://github.com/arpanpramanik2003/PaperLens-AI',
    live: 'https://paperlens.arpanpramanik.tech/',
    docs: 'https://github.com/arpanpramanik2003/PaperLens-AI/blob/master/docs/ARCHITECTURE.md',
    quickClone: 'git clone https://github.com/arpanpramanik2003/PaperLens-AI.git',
    description: 'Autonomous full-stack AI research platform for literature analysis, experiment planning, problem ideation, gap detection, citation intelligence, and benchmark discovery.',
    fullDescription: 'PaperLens AI is an autonomous, full-stack AI research orchestrator designed to transform unstructured academic literature into structured, actionable research outputs. Features a dual-pipeline RAG architecture (in-memory BM25 + FAISS hybrid search for instant single-session analysis, paired with remote Supabase pgvector persistence for cross-session synthesis), a multi-provider fallback engine, real-time Server-Sent Events (SSE) citation tracking, and an autonomous ReAct agent loop with Model Context Protocol (MCP) server support. Engineered specifically for production memory constraints (500MB cap compliant) through generator-based stream parsing, lazy-loaded vector models, and turn-compressed prompt optimization.',
    benchmarks: [
      {
        metric: 'Deterministic Fast-Path Router',
        gain: '1.5s Saved (~600 tokens/query)',
        desc: 'Direct keyword pattern matcher skips the LLM router call for single-intent queries (e.g. dataset lookup, literature search).'
      },
      {
        metric: 'LLM Call Consolidation',
        gain: '54.5% API Call Reduction',
        desc: 'Consolidated dual-pass synthesis & critique into single LLM passes; batched multi-chunk summarization.'
      },
      {
        metric: 'Prompt Compression',
        gain: '~40% Context Token Reduction',
        desc: 'Turn 1 sends full tool JSON schemas; Turns 2–6 automatically compress tools into signature representations.'
      },
      {
        metric: 'Memory-Safe Extraction',
        gain: '0MB Heap Bloat (<500MB Cap)',
        desc: 'Generator-based PyMuPDF stream parsing combined with lazy-loaded SentenceTransformer vector models.'
      },
      {
        metric: 'Structured Outputs',
        gain: '0 Retries / 0 Regex Hacks',
        desc: 'Strict Pydantic v2 schemas (ReActDecision, SynthesisResult) with structured XML tag enforcement.'
      },
      {
        metric: 'Citation Resilience',
        gain: '<1% Missing Citation Rate',
        desc: 'Automatic 4-stage search fallback (DOI → Exact Match → Title → Loose Keyword) with rate-limit recovery.'
      }
    ],
    architecture: {
      summary: 'Dual-Pipeline RAG & ReAct Agent Loop with Deterministic Fast-Path Routing',
      pipeline: [
        { step: '01', name: 'Client Request & SSE', detail: 'React 18 client streams queries and receives citation tokens via SSE.' },
        { step: '02', name: 'FastAPI ASGI Gateway', detail: 'Asynchronous endpoint router with Clerk RSA-256 JWT auth & token bucket rate limiter.' },
        { step: '03', name: 'Deterministic Fast-Path', detail: 'Pattern matcher bypasses LLM router for 1.5s latency savings on direct queries.' },
        { step: '04', name: 'ReAct Agent Orchestrator', detail: 'Turn-compressed ReAct loop executing task-scoped tools & native MCP protocol.' },
        { step: '05', name: 'Dual RAG Engine', detail: 'In-memory BM25 + FAISS (single-session) & Supabase pgvector (cross-session).' },
        { step: '06', name: 'Multi-Provider Fallback', detail: 'Groq Cloud API with dynamic per-attempt model failover (llama-3.1-8b → 70b).' }
      ]
    },
    capabilities: [
      { name: 'Paper Analyzer', desc: 'Dual RAG architecture providing instant in-memory BM25 + FAISS Q&A, plus remote Supabase pgvector chunking for Map-Reduce summarization.' },
      { name: 'Experiment Planner', desc: 'Generates structured, step-by-step 6-phase research roadmaps with parameter recommendations, baseline configurations, and risk assessments.' },
      { name: 'Problem Generator', desc: 'Two-stage ideation engine that discovers novel research problems in a target domain and expands ideas into comprehensive methodology briefs.' },
      { name: 'Gap Detection', desc: 'Analyzes manuscripts for methodological flaws, unstated assumptions, missing literature, and severity scores on a pinned lightweight LLM route.' },
      { name: 'Citation Intelligence', desc: 'Evaluates paper bibliographies via 4-stage fallback matcher (DOI → Exact → Title → Loose) streaming progress over SSE with prioritized reading paths.' },
      { name: 'Autonomous Agent Mode', desc: 'Flagship multi-agent orchestrator with turn-compressed ReAct loop, task-scoped tools, deterministic routing, and Model Context Protocol (MCP).' }
    ],
    tech: [
      'React 18',
      'TypeScript',
      'FastAPI',
      'Python 3.10+',
      'Supabase (pgvector)',
      'FAISS',
      'rank_bm25',
      'PyMuPDF',
      'Groq Cloud API',
      'ReAct Agent',
      'MCP Server',
      'Clerk JWT',
      'Pydantic v2',
      'Tailwind CSS'
    ],
    highlights: [
      'Dual-Pipeline RAG (In-memory BM25 + FAISS hybrid search + Supabase pgvector)',
      '54.5% API call reduction via batched single-pass synthesis & critique',
      'Deterministic Fast-Path Router saving ~1.5s latency per query',
      '500MB free-tier heap memory cap compliance using generator stream parsing',
      'Autonomous ReAct Agent Loop with native Model Context Protocol (MCP) support'
    ]
  },
  {
    id: 2,
    title: 'CampusSphere',
    tagline: 'Enterprise Co-Curricular Governance, Credit Banking & NAAC Compliance',
    category: 'Enterprise Full-Stack',
    image: '/project-images/campussphere.webp',
    logo: '/project-logo/campussphere-logo.webp',
    featured: false,
    year: '2026',
    status: 'Production Live',
    github: 'https://github.com/arpanpramanik2003/CampusSphere',
    live: 'https://ssh.arpanpramanik.tech/',
    docs: 'https://github.com/arpanpramanik2003/CampusSphere',
    quickClone: 'git clone https://github.com/arpanpramanik2003/CampusSphere.git',
    description: 'Enterprise co-curricular activity verification, credit banking, and NAAC/NIRF accreditation compliance platform for higher education.',
    fullDescription: 'CampusSphere is a multi-tier, enterprise-grade co-curricular activity verification, institutional credit banking, and NAAC/NIRF accreditation compliance management system for higher education institutions. It streamlines student achievement submissions through a two-stage verification pipeline (Faculty Advisor Stage 1 verification followed by Institutional Admin Stage 2 final sign-off), automates credit assignment via a dynamic Credit Policy Engine mapped to NAAC Criteria 1–7, and provides cryptographic public credential verification (/verify/[verificationId]) alongside 1-click NAAC/NIRF compliance CSV reports.',
    benchmarks: [
      {
        metric: 'Verification Pipeline',
        gain: 'Two-Stage Multi-Tier Approval',
        desc: 'Faculty Advisor Stage 1 review followed by Institutional Admin Stage 2 final authorization and ledger lock.'
      },
      {
        metric: 'Credit Policy Engine',
        gain: 'NAAC Criteria 1–7 Mapped',
        desc: 'Dynamic weight matrices (Activity Type × Achievement Level) automatically compute degree credits.'
      },
      {
        metric: 'Public Credential Verification',
        gain: 'Tamper-Proof vref_ Tokens',
        desc: 'Cryptographic public-facing endpoint (/verify/[verificationId]) allows instant employer verification.'
      },
      {
        metric: 'System Observability',
        gain: 'Distributed Tracing & Metrics',
        desc: 'Integrated OpenTelemetry, Prometheus metrics, and Pino structured JSON logging across microservices.'
      },
      {
        metric: 'Data Ingestion',
        gain: 'CSV Bulk Onboarding',
        desc: 'Enables single-operation onboarding for thousands of students and faculty members simultaneously.'
      },
      {
        metric: 'Audit Compliance',
        gain: '1-Click Official Exports',
        desc: 'Generates institutional compliance CSV reports formatted for official NAAC and NIRF audits.'
      }
    ],
    architecture: {
      summary: 'Two-Stage Compliance Engine with Cryptographic Verification & Observability',
      pipeline: [
        { step: '01', name: 'Student Submission Portal', detail: 'Uploads certificates and evidence to secure Cloudinary media storage.' },
        { step: '02', name: 'Stage 1: Faculty Advisor Review', detail: 'Faculty reviews evidence authenticity, provides remarks, and approves for Stage 2.' },
        { step: '03', name: 'Stage 2: Institutional Admin', detail: 'Admin performs institutional sign-off and locks the student digital credit ledger.' },
        { step: '04', name: 'Credit Policy Engine', detail: 'Dynamic matrices compute credits mapped directly to NAAC Criteria 1–7.' },
        { step: '05', name: 'Cryptographic Public Proof', detail: 'Generates tamper-proof digital certificates accessible via /verify/[verificationId].' },
        { step: '06', name: 'Enterprise Observability', detail: 'OpenTelemetry distributed tracing, Prometheus metrics, and Upstash Redis rate limiting.' }
      ]
    },
    capabilities: [
      { name: 'Co-Curricular Submission Hub', desc: 'Secure portal for students to upload certificates, select activity tiers, and track review status.' },
      { name: 'Faculty Advisor Console', desc: 'Review queue with mentee management, bulk verification tools, and academic progression metrics.' },
      { name: 'Institutional Admin Console', desc: 'Policy configuration, ledger locking, CSV bulk user onboarding, and grievance appeal resolution.' },
      { name: 'Public Record Verification', desc: 'Zero-login public endpoint (/verify/[id]) enabling third parties to cryptographically validate credentials.' },
      { name: 'NAAC/NIRF Analytics', desc: 'Real-time compliance analytics dashboards with 1-click official audit-ready CSV report exports.' }
    ],
    tech: [
      'Next.js 15',
      'React 19',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'Cloudinary API',
      'Upstash Redis',
      'OpenTelemetry',
      'Prometheus',
      'Pino',
      'Tailwind CSS'
    ],
    highlights: [
      'Two-Stage Verification Pipeline (Faculty Advisor Stage 1 & Institutional Admin Stage 2)',
      'Dynamic Credit Policy Engine with weight matrices mapped to NAAC Criteria 1–7',
      'Cryptographic Public Credential Verification endpoint (/verify/[verificationId])',
      'Sliding-window auth rate limiting with Upstash Redis and memory fallback',
      'Enterprise Observability with OpenTelemetry distributed tracing and Prometheus metrics'
    ]
  },
  {
    id: 3,
    title: 'FruitQ-GradeX: Fruit Quality Grading with Explainable AI',
    tagline: 'Dual-Head CNN for Fruit Classification & Quality Grading with Grad-CAM',
    category: 'Computer Vision',
    image: '/project-images/fruitqgradex.webp',
    logo: '/project-logo/fruitqgradex-logo.webp',
    featured: true,
    year: '2025',
    status: 'Live on Streamlit',
    github: 'https://github.com/arpanpramanik2003/FruitQ-GradeX.git',
    live: 'https://fruitq-quality-classifier.streamlit.app/',
    docs: 'https://github.com/arpanpramanik2003/FruitQ-GradeX',
    quickClone: 'git clone https://github.com/arpanpramanik2003/FruitQ-GradeX.git',
    description: 'Multi-headed CNN for simultaneous dual prediction: fruit type (Apple, Banana, Guava, Orange) and quality (Good/Bad) with Grad-CAM visual heatmaps.',
    fullDescription: 'Deep learning system that classifies fruit images by both type and quality using a custom multi-headed CNN. Achieves 97.75% fruit classification accuracy and 98.21% quality assessment accuracy. Integrated Grad-CAM for visual explanations and features a real-time Streamlit interface with webcam support.',
    benchmarks: [
      {
        metric: 'Fruit Classification Accuracy',
        gain: '97.75% Accuracy',
        desc: 'Multi-class prediction across 4 major fruit varieties (Apple, Banana, Guava, Orange).'
      },
      {
        metric: 'Quality Grading Accuracy',
        gain: '98.21% Accuracy',
        desc: 'Binary classification discerning fresh vs rotten fruit across diverse lighting conditions.'
      },
      {
        metric: 'Explainable AI (XAI)',
        gain: 'Dual Grad-CAM Heatmaps',
        desc: 'Visualizes gradient activation maps for both classification heads to explain decision rationale.'
      },
      {
        metric: 'Dataset Scale',
        gain: '9,146 Images Augmented',
        desc: 'Rigorous augmentation pipeline with rotation, zoom, shear, and color jittering.'
      }
    ],
    architecture: {
      summary: 'Multi-Headed Deep CNN with Simultaneous Dual Prediction & Grad-CAM Visual Heatmaps',
      pipeline: [
        { step: '01', name: 'Input Acquisition', detail: 'Real-time webcam video stream or high-resolution image upload.' },
        { step: '02', name: 'OpenCV Preprocessing', detail: 'Resizing, normalization, and ImageDataGenerator augmentation transforms.' },
        { step: '03', name: 'Shared CNN Feature Backbone', detail: 'Convolutional feature extractor capturing hierarchical edge and texture representations.' },
        { step: '04', name: 'Dual Output Heads', detail: 'Head 1 outputs fruit variety (4 classes); Head 2 outputs quality state (Good/Bad).' },
        { step: '05', name: 'Grad-CAM XAI Engine', detail: 'Computes activation gradients to project transparent attention heatmaps over the fruit.' },
        { step: '06', name: 'Streamlit Deployment', detail: 'Cloud-hosted reactive dashboard with live confidence distribution dials.' }
      ]
    },
    capabilities: [
      { name: 'Simultaneous Dual Prediction', desc: 'Evaluates fruit variety and surface quality in a single forward inference pass.' },
      { name: 'Grad-CAM Heatmap Visualizer', desc: 'Highlights pixels that influenced the quality decision, exposing localized blemishes or rot.' },
      { name: 'Webcam Live Inference', desc: 'Real-time frame-by-frame inference mode for conveyor or sorting applications.' },
      { name: 'Confidence Calibrator', desc: 'Calculates softmax probability distributions to flag low-confidence ambiguous samples.' }
    ],
    tech: [
      'TensorFlow',
      'Keras',
      'CNN',
      'Grad-CAM',
      'Streamlit',
      'OpenCV',
      'Python',
      'NumPy'
    ],
    highlights: [
      'Dual prediction: fruit type AND quality simultaneously in a single pass',
      '97.75% fruit classification accuracy, 98.21% quality accuracy',
      'Supports 4 fruit types: Apple, Banana, Guava, Orange',
      'Grad-CAM heatmaps for both output heads enabling model explainability',
      'Real-time inference via webcam or image upload on Streamlit Cloud'
    ]
  },
  {
    id: 4,
    title: 'NeuroVoice: AI Desktop Voice Assistant',
    tagline: 'On-Device Speech Recognition & Task Automation Powered by Ollama',
    category: 'AI Agents & RAG',
    image: '/project-images/neuravoice.webp',
    logo: '/project-logo/neuravoice-logo.webp',
    featured: false,
    year: '2025',
    status: 'Open Source',
    github: 'https://github.com/arpanpramanik2003/NeuraVoice.git',
    live: null,
    docs: 'https://github.com/arpanpramanik2003/NeuraVoice',
    quickClone: 'git clone https://github.com/arpanpramanik2003/NeuraVoice.git',
    description: 'Advanced AI-powered voice assistant with Ollama LLM integration for natural conversations, context memory, and OS task automation.',
    fullDescription: 'Next-gen AI desktop assistant built with Python that combines speech recognition, text-to-speech, NLP, and Ollama LLM integration. Features real-time voice interaction, intelligent conversation, smart task execution (Wikipedia, web browsing, music, system controls), and modern Tkinter GUI with context awareness.',
    benchmarks: [
      {
        metric: 'On-Device Privacy',
        gain: '100% Local Inference',
        desc: 'Runs llama3.2:3b locally via Ollama with zero external cloud API latency or costs.'
      },
      {
        metric: 'Voice Latency',
        gain: 'Sub-second Audio Response',
        desc: 'Direct speech-to-text pipeline coupled with pyttsx3 offline acoustic generation.'
      },
      {
        metric: 'OS Task Automation',
        gain: '10+ System Directives',
        desc: 'Automates browser operations, volume control, app launching, power states, and searches.'
      }
    ],
    architecture: {
      summary: 'Local Voice Processing Loop with Ollama LLM & System Action Dispatcher',
      pipeline: [
        { step: '01', name: 'Microphone Ingestion', detail: 'Continuous background ambient acoustic monitoring with energy thresholding.' },
        { step: '02', name: 'Speech-to-Text Engine', detail: 'speech_recognition library converts voice commands into clean text tokens.' },
        { step: '03', name: 'Local Ollama LLM', detail: 'llama3.2:3b processes conversational intent with rolling contextual memory.' },
        { step: '04', name: 'OS Action Dispatcher', detail: 'Parses functional directives to trigger system APIs, browser scripts, or utilities.' },
        { step: '05', name: 'Speech Synthesis (TTS)', detail: 'pyttsx3 synthesizes human-like auditory feedback without cloud roundtrips.' }
      ]
    },
    capabilities: [
      { name: 'Local Conversational Engine', desc: 'Engages in contextual discussions powered by on-device Ollama quantized models.' },
      { name: 'OS Automation Controller', desc: 'Executes system commands: shutdown, volume adjustment, application launch, and sleep.' },
      { name: 'Web Knowledge Synthesizer', desc: 'Queries Wikipedia, weather, and web resources to summarize facts verbally.' },
      { name: 'Context-Aware History', desc: 'Maintains user session memories and conversational threads in a Tkinter GUI.' }
    ],
    tech: [
      'Python',
      'Ollama',
      'llama3.2',
      'SpeechRecognition',
      'pyttsx3',
      'Tkinter',
      'NLP'
    ],
    highlights: [
      'Real-time voice recognition and natural audio synthesis',
      'Ollama LLM integration (llama3.2:3b) for 100% private local reasoning',
      'System automation: app launch, system controls, web navigation',
      'Context-aware responses with memory of user identity across session'
    ]
  },
  {
    id: 5,
    title: 'ABHIGRAHA 2K25: College Fest Platform',
    tagline: 'High-Capacity Event Scheduling, Media Hub & Sponsor Management System',
    category: 'Enterprise Full-Stack',
    image: '/project-images/cfw.webp',
    logo: '/project-logo/abhigraha-logo.webp',
    featured: false,
    year: '2025',
    status: 'Live on Vercel',
    github: 'https://github.com/arpanpramanik2003/freshers-website.git',
    live: 'https://abhigraha2k25.vercel.app/',
    docs: 'https://github.com/arpanpramanik2003/freshers-website',
    quickClone: 'git clone https://github.com/arpanpramanik2003/freshers-website.git',
    description: 'Official college freshers event platform for ABHIGRAHA 2K25 with Express.js backend, dynamic galleries, sponsor management, and admin panel.',
    fullDescription: 'Comprehensive event management platform created for ABHIGRAHA 2K25 (Official College Freshers Fest) featuring an Express.js & Node.js backend with React frontend. Includes event scheduling system, dynamic photo galleries, sponsor showcase sections, team member displays, contact forms with backend message handling, and an administrative control panel for full content management.',
    benchmarks: [
      {
        metric: 'Throughput & Uptime',
        gain: '100% Availability',
        desc: 'Handled peak student traffic during live fest scheduling without performance degradation.'
      },
      {
        metric: 'Content Management',
        gain: 'Role-Based Admin Console',
        desc: 'JWT-secured administration dashboard for real-time schedule and gallery updates.'
      },
      {
        metric: 'Responsive Performance',
        gain: '<1s Load Time',
        desc: 'Optimized static assets and mobile-first layout for campus mobile users.'
      }
    ],
    architecture: {
      summary: 'Decoupled Client-Server Architecture with PostgreSQL Event Ledger',
      pipeline: [
        { step: '01', name: 'React Client Application', detail: 'Responsive mobile-first user interface with interactive event countdown & schedule.' },
        { step: '02', name: 'Express.js API Gateway', detail: 'RESTful microservice routing requests with CORS and bcrypt security.' },
        { step: '03', name: 'JWT Authentication', detail: 'Secure session handling for fest organizers and administrative personnel.' },
        { step: '04', name: 'PostgreSQL Event Store', detail: 'Stores schedule items, participant inquiries, and sponsor information.' },
        { step: '05', name: 'CDN Edge Delivery', detail: 'Global Vercel deployment ensuring low latency for high student traffic.' }
      ]
    },
    capabilities: [
      { name: 'Live Event Scheduling', desc: 'Real-time schedule timeline with stage locations, performer briefs, and timings.' },
      { name: 'Dynamic Media Gallery', desc: 'Curated photo repository featuring high-resolution event moments.' },
      { name: 'Sponsor & Partner Showcase', desc: 'Prominent branding sections highlighting tier-level sponsor logos and links.' },
      { name: 'Admin Operations Console', desc: 'Protected control panel allowing committee members to edit events dynamically.' }
    ],
    tech: [
      'React',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'JWT Auth',
      'bcrypt',
      'Tailwind CSS',
      'Vercel'
    ],
    highlights: [
      'Event management system with real-time scheduling updates',
      'Dynamic image galleries for high-resolution event captures',
      'JWT-authenticated administrative control panel for content curation',
      'PostgreSQL database integration with fast query response times'
    ]
  }
];

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
};

export const getAllProjects = () => {
  return projectsData
};

export const getProjectsByCategory = (category) => {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
};
