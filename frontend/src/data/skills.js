// Devicon CDN base URL
const devicon = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const skillsData = [
  {
    category: 'Programming Languages',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'C / C++', icon: '🅲', logo: devicon('cplusplus') },
      { name: 'Python', icon: '🐍', logo: devicon('python') },
      { name: 'Java', icon: '☕', logo: devicon('java') },
      { name: 'R', icon: '📈', logo: devicon('r') }
    ]
  },
  {
    category: 'Frontend Development',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'HTML / CSS / JavaScript', icon: '🧩', logo: devicon('javascript') },
      { name: 'React.js / Vite', icon: '⚛️', logo: devicon('react') },
      { name: 'Tailwind CSS / Bootstrap', icon: '🎨', logo: devicon('tailwindcss') },
      { name: 'Framer Motion', icon: '✨', logo: devicon('framermotion') }
    ]
  },
  {
    category: 'Backend Development',
    icon: '⚙️',
    color: 'from-green-500 to-teal-500',
    skills: [
      { name: 'Node.js / Express.js', icon: '🟢', logo: devicon('nodejs') },
      { name: 'Flask / FastAPI', icon: '🐍', logo: devicon('flask') },
      { name: 'Authentication (JWT, Google Auth, bcrypt)', icon: '🔐', logo: devicon('google') },
      { name: 'RESTful API Design', icon: '🔌', logo: devicon('fastapi') }
    ]
  },
  {
    category: 'AI / ML & Deep Learning',
    icon: '🤖',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'TensorFlow / Keras', icon: '🧠', logo: devicon('tensorflow') },
      { name: 'PyTorch / Lightning', icon: '🔥', logo: devicon('pytorch') },
      { name: 'Scikit-learn / Transfer Learning', icon: '📊', logo: devicon('scikitlearn') },
      { name: 'OpenCV / Mediapipe', icon: '👁️', logo: devicon('opencv') }
    ]
  },
  {
    category: 'Databases',
    icon: '🗄️',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'MongoDB / MySQL', icon: '🍃', logo: devicon('mongodb') },
      { name: 'PostgreSQL / OracleDB', icon: '🐘', logo: devicon('postgresql') },
      { name: 'Supabase / Firebase', icon: '🔥', logo: devicon('firebase', 'plain') },
      { name: 'SQLite (Local Testing)', icon: '💾', logo: devicon('sqlite') }
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-sky-500 to-blue-500',
    skills: [
      { name: 'AWS (EC2, S3)', icon: '☁️', logo: devicon('amazonwebservices', 'plain-wordmark') },
      { name: 'Railway / Render', icon: '🚂', logo: devicon('railway') },
      { name: 'Vercel / Streamlit', icon: '🚀', logo: devicon('vercel') },
      { name: 'GitHub / Docker', icon: '🐙', logo: devicon('docker') }
    ]
  },
  {
    category: 'Tools & Productivity',
    icon: '🛠️',
    color: 'from-yellow-500 to-orange-500',
    skills: [
      { name: 'VS Code / Cursor', icon: '💻', logo: devicon('vscode') },
      { name: 'Jupyter / Google Colab / Kaggle', icon: '📓', logo: devicon('jupyter') },
      { name: 'Hugging Face / Ollama', icon: '🤗', logo: devicon('kaggle') },
      { name: 'Postman / Thunder Client', icon: '📮', logo: devicon('postman') }
    ]
  },
  {
    category: 'Specialized Skills',
    icon: '🎯',
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Research Paper Writing (Overleaf / LaTeX)', icon: '📜', logo: devicon('latex') },
      { name: 'CI/CD & Deployment Automation', icon: '⚡', logo: devicon('githubactions') },
      { name: 'Cross-Dataset Validation & Model Evaluation', icon: '📈', logo: devicon('matplotlib') },
      { name: 'Team Collaboration & Hackathons', icon: '🤝', logo: devicon('slack') }
    ]
  }
];
