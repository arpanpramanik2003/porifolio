export const projectsData = [
  // Featured/Priority Projects
  {
    id: 1,
    title: 'CropSense: Quality Detection in Solanaceous Crops',
    category: 'Deep Learning',
    icon: '🥔',
    featured: true,
    description: 'Multi-headed CNN for simultaneous potato/tomato classification (99.9% accuracy) and quality assessment (98.5% accuracy).',
    fullDescription: 'Novel multi-headed CNN architecture for simultaneous classification of potato and tomato crops with quality assessment using explainable AI. Features Grad-CAM visualizations, Streamlit interface, and 30% parameter reduction compared to separate models. Built for precision agriculture with real-time crop monitoring.',
    tech: ['TensorFlow', 'Keras', 'Python', 'OpenCV', 'CNN', 'Grad-CAM', 'Streamlit', 'Multi-Task Learning'],
    features: [
      'Multi-task learning with shared feature extractor',
      '99.9% accuracy in crop classification (potato vs tomato)',
      '98.5% accuracy in quality assessment (healthy vs diseased)',
      'Grad-CAM explainability for transparent decision-making',
      'Lightweight architecture with 30% parameter reduction',
      'Real-time predictions with Streamlit web interface',
      'Balanced dataset of 10,000 images (256×256 resolution)',
      'Fast training: 26 minutes on NVIDIA P100 GPU'
    ],
    github: 'https://github.com/arpanpramanik2003/cropsense',
    live: 'https://cropsense.streamlit.app/',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 2,
    title: 'FruitQ-GradeX: Fruit Quality Grading with Explainable AI',
    category: 'Deep Learning',
    icon: '🍎',
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
    id: 3,
    title: 'Chest X-ray Pneumonia Detection',
    category: 'Deep Learning',
    icon: '🫁',
    featured: true,
    description: 'Deep learning model using EfficientNetB3 for classifying chest X-ray images with higher accuracy.',
    fullDescription: 'Built a deep learning model using EfficientNetB3 for classifying chest X-ray images to detect pneumonia. The model achieved higher accuracy and generalization by replacing VGG16 with the more efficient EfficientNetB3 architecture, demonstrating improved performance on medical imaging data.',
    tech: ['TensorFlow', 'Keras', 'EfficientNetB3', 'Python', 'Medical Imaging', 'CNN', 'Streamlit'],
    features: [
      'Deep learning classification using EfficientNetB3 architecture',
      'Improved accuracy over VGG16 baseline model',
      'Medical image preprocessing and augmentation',
      'Binary classification (Normal vs Pneumonia)',
      'Model evaluation with confusion matrix and metrics',
      'Transfer learning implementation',
      'Streamlit web interface for predictions'
    ],
    github: 'https://github.com/arpanpramanik2003/chest-xray-pneumonia-classifier.git',
    live: 'https://chest-xray-pneumonia-classifier-arpan.streamlit.app/',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 4,
    title: 'Real-time Fruit & Vegetable Classification',
    category: 'Computer Vision',
    icon: '🥬',
    featured: true,
    description: 'Real-time classification system using OpenCV with laptop camera achieving 98% accuracy on 36 classes.',
    fullDescription: 'Created a real-time classification system using OpenCV for live camera feed classification of fruits and vegetables. The system uses EfficientNetB3 for feature extraction and achieved 99.29% training accuracy and 97.21% test accuracy. Features a user-friendly Streamlit interface for real-time predictions.',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'EfficientNetB3', 'Computer Vision', 'Transfer Learning'],
    features: [
      'Real-time classification using laptop webcam',
      '99.29% training accuracy, 97.21% test accuracy',
      'EfficientNetB3 for improved generalization',
      'Live video feed processing with OpenCV',
      'Interactive Streamlit web application',
      'Multi-class classification of 36 fruit & vegetable varieties',
      'Transfer learning from ImageNet weights',
      'No data augmentation - pure model performance'
    ],
    github: 'https://github.com/arpanpramanik2003/fruit-veg-classification.git',
    live: 'https://fruit-veg-detection-custom-cnn-arpan.streamlit.app/',
    status: 'Completed',
    year: '2025'
  },

  // Additional Projects
  {
    id: 5,
    title: 'NeuraVoice: AI Desktop Assistant',
    category: 'Machine Learning',
    icon: '🎙️',
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
  {
    id: 6,
    title: 'Smart Attendance Management System',
    category: 'Web Development',
    icon: '✅',
    featured: false,
    description: 'Web-based attendance system with student management, daily tracking, and automated Excel/PDF reporting.',
    fullDescription: 'Flask-based attendance management system allowing teachers to track student attendance, manage records, and generate reports. Features secure authentication, student registration with unique UID, daily attendance marking, historical records viewing, and data export to Excel/PDF formats. Deployed on Render with PostgreSQL.',
    tech: ['Flask', 'Python', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'Pandas', 'WeasyPrint', 'Jinja2'],
    features: [
      'Secure user authentication system',
      'Student registration with unique UID management',
      'Daily attendance marking (Present/Absent)',
      'View and edit attendance records by date',
      'Export data to Excel format with Pandas',
      'Generate PDF reports with WeasyPrint',
      'Database migrations with Flask-Migrate/Alembic',
      'Deployed on Render with PostgreSQL database'
    ],
    github: 'https://github.com/arpanpramanik2003/smart-attendence.git',
    live: 'https://attendance-app-b2g9.onrender.com/',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 7,
    title: 'Smart Waste Classification Model',
    category: 'Machine Learning',
    icon: '♻️',
    featured: false,
    description: 'MobileNetV2-based model for classifying waste into 6 categories to promote efficient waste management.',
    fullDescription: 'Developed a MobileNetV2-based deep learning model for classifying waste materials into different categories to promote efficient waste management. Built with a user-friendly Streamlit app for easy interaction, visualization, and real-time waste classification. Lightweight architecture suitable for edge deployment.',
    tech: ['TensorFlow', 'Keras', 'MobileNetV2', 'Streamlit', 'Image Classification', 'Transfer Learning'],
    features: [
      'MobileNetV2 for efficient mobile deployment',
      'Multi-class waste classification (6 categories)',
      'Lightweight model suitable for edge devices',
      'Interactive Streamlit web interface',
      'Image upload and prediction visualization',
      'Real-time classification with confidence scores',
      'Environmental impact focus',
      'Transfer learning for faster training'
    ],
    github: 'https://github.com/arpanpramanik2003/smart-waste-classification.git',
    live: 'https://smart-waste-arpan.streamlit.app/',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 8,
    title: 'ASL Sign Language Gesture Prediction',
    category: 'Computer Vision',
    icon: '🤟',
    featured: false,
    description: 'MobileNetV2-based model for classifying ASL hand gestures with live webcam detection for alphabet gestures.',
    fullDescription: 'Built a MobileNetV2-based deep learning model for classifying American Sign Language (ASL) hand gestures. The system enables live detection via webcam for alphabet gestures (A-Z), helping bridge communication gaps for the deaf community. Features real-time prediction and a Streamlit-based interface.',
    tech: ['TensorFlow', 'Keras', 'MobileNetV2', 'Streamlit', 'OpenCV', 'Computer Vision', 'Accessibility'],
    features: [
      'Real-time ASL gesture recognition (A-Z alphabet)',
      'Live webcam detection and prediction',
      'MobileNetV2 for efficient processing',
      'Interactive Streamlit application',
      'Accessibility-focused design for deaf community',
      'Alphabet gesture classification with high accuracy',
      'Real-time video feed processing',
      'Confidence score display for predictions'
    ],
    github: 'https://github.com/arpanpramanik2003/sign-language-recognition.git',
    live: 'https://sign-language-recognition-arpan.streamlit.app/',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 9,
    title: 'Smart Student Hub',
    category: 'Web Development',
    icon: '🎓',
    featured: false,
    description: 'Full-stack student management platform with authentication, portfolios, file uploads, and admin dashboard.',
    fullDescription: 'Comprehensive student management application with React frontend and Node.js backend. Features include JWT authentication, student portfolio management, file upload with Multer, PDF portfolio generation, and admin dashboards for CRUD operations. Built with MongoDB for data persistence and responsive design for all devices.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multer', 'REST API'],
    features: [
      'User authentication with JWT tokens',
      'Student portfolio creation and management',
      'File upload functionality with Multer',
      'Admin dashboard for CRUD operations',
      'PDF portfolio generation from student data',
      'Responsive design for mobile and desktop',
      'RESTful API architecture',
      'MongoDB database with Mongoose ODM'
    ],
    github: null,
    live: null,
    status: 'In Progress',
    year: '2025'
  },
  {
    id: 10,
    title: 'College Freshers Website',
    category: 'Web Development',
    icon: '🎉',
    featured: false,
    description: 'Event management website with Flask backend, dynamic galleries, sponsor management, and admin panel.',
    fullDescription: 'Created a comprehensive college freshers event website with Flask backend and React frontend. Implemented dynamic image galleries, event scheduling system, sponsor management sections, team member displays, contact forms with message handling, and administrative controls for complete content management.',
    tech: ['Flask', 'React', 'PostgreSQL', 'Python', 'SQLAlchemy', 'HTML', 'CSS'],
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
    status: 'In Progress',
    year: '2025'
  }
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
