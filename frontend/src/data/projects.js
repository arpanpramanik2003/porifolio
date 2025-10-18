export const projectsData = [
  // Featured/Priority Projects (will show first)
  {
    id: 1,
    title: 'Chest X-ray Pneumonia Detection',
    category: 'Deep Learning',
    icon: '🫁',
    featured: true,
    description: 'Deep learning model using EfficientNetB3 for classifying chest X-ray images with higher accuracy.',
    fullDescription: 'Built a deep learning model using EfficientNetB3 for classifying chest X-ray images to detect pneumonia. The model achieved higher accuracy and generalization by replacing VGG16 with the more efficient EfficientNetB3 architecture, demonstrating improved performance on medical imaging data.',
    tech: ['TensorFlow', 'Keras', 'EfficientNetB3', 'Python', 'Medical Imaging', 'CNN'],
    features: [
      'Deep learning classification using EfficientNetB3 architecture',
      'Improved accuracy over VGG16 baseline model',
      'Medical image preprocessing and augmentation',
      'Binary classification (Normal vs Pneumonia)',
      'Model evaluation with confusion matrix and metrics',
      'Transfer learning implementation'
    ],
    github: 'https://github.com/arpanpramanik2003/chest-xray-pneumonia',
    live: null,
    status: 'Completed',
    year: '2025'
  },
  {
    id: 2,
    title: 'Real-time Fruit & Vegetable Classification',
    category: 'Computer Vision',
    icon: '🍎',
    featured: true,
    description: 'Real-time classification system using OpenCV with laptop camera achieving 98% accuracy.',
    fullDescription: 'Created a real-time classification system using OpenCV for live camera feed classification of fruits and vegetables. The system uses EfficientNetB3 for feature extraction and achieved 98% accuracy on the test dataset. Features a user-friendly Streamlit interface for real-time predictions.',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'EfficientNetB3', 'Computer Vision'],
    features: [
      'Real-time classification using laptop webcam',
      '98% accuracy on test dataset',
      'EfficientNetB3 for improved generalization',
      'Live video feed processing with OpenCV',
      'Interactive Streamlit web application',
      'Multi-class classification of 36 categories'
    ],
    github: 'https://github.com/arpanpramanik2003/fruit-veggie-classifier',
    live: 'https://fruit-classification-demo.streamlit.app',
    status: 'Completed',
    year: '2025'
  },
  {
    id: 3,
    title: 'Smart Waste Classification Model',
    category: 'Machine Learning',
    icon: '♻️',
    featured: true,
    description: 'MobileNetV2-based model for classifying waste into categories with Streamlit interface.',
    fullDescription: 'Developed a MobileNetV2-based deep learning model for classifying waste materials into different categories to promote efficient waste management. Built with a user-friendly Streamlit app for easy interaction, visualization, and real-time waste classification.',
    tech: ['TensorFlow', 'Keras', 'MobileNetV2', 'Streamlit', 'Image Classification'],
    features: [
      'MobileNetV2 for efficient mobile deployment',
      'Multi-class waste classification (6 categories)',
      'Lightweight model suitable for edge devices',
      'Interactive Streamlit web interface',
      'Image upload and prediction visualization',
      'Environmental impact focus'
    ],
    github: 'https://github.com/arpanpramanik2003/waste-classification',
    live: 'https://waste-classifier.streamlit.app',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 4,
    title: 'ASL Sign Language Gesture Prediction',
    category: 'Computer Vision',
    icon: '🤟',
    featured: true,
    description: 'MobileNetV2-based model for classifying ASL hand gestures with live webcam detection.',
    fullDescription: 'Built a MobileNetV2-based deep learning model for classifying American Sign Language (ASL) hand gestures. The system enables live detection via webcam for alphabet gestures, helping bridge communication gaps for the deaf community. Features real-time prediction and a Streamlit-based interface.',
    tech: ['TensorFlow', 'Keras', 'MobileNetV2', 'Streamlit', 'OpenCV', 'Sign Language'],
    features: [
      'Real-time ASL gesture recognition',
      'Live webcam detection and prediction',
      'Alphabet gesture classification (A-Z)',
      'MobileNetV2 for efficient processing',
      'Interactive Streamlit application',
      'Accessibility-focused design'
    ],
    github: 'https://github.com/arpanpramanik2003/asl-gesture-prediction',
    live: 'https://asl-detector.streamlit.app',
    status: 'Completed',
    year: '2024'
  },

  // Additional Projects (will show after "View More")
  {
    id: 5,
    title: 'Smart Student Hub',
    category: 'Web Development',
    icon: '🎓',
    featured: false,
    description: 'Full-stack student management platform with authentication, portfolios, and admin dashboard.',
    fullDescription: 'Comprehensive student management application with React frontend and Node.js backend. Features include authentication systems, student portfolios, file upload functionality, PDF generation, and admin dashboards for managing student data.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multer'],
    features: [
      'User authentication with JWT',
      'Student portfolio management',
      'File upload with Multer',
      'Admin dashboard for CRUD operations',
      'PDF portfolio generation',
      'Responsive design'
    ],
    github: 'https://github.com/arpanpramanik2003/smart-student-hub',
    live: 'https://student-hub-demo.vercel.app',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 6,
    title: 'College Freshers Website',
    category: 'Web Development',
    icon: '🎉',
    featured: false,
    description: 'Event management website with gallery, sponsors, team display, and admin panel.',
    fullDescription: 'Created a comprehensive college freshers event website with Flask backend and React frontend. Implemented dynamic galleries, event scheduling, sponsor management, team member displays, and administrative controls for content management.',
    tech: ['Flask', 'React', 'PostgreSQL', 'Python', 'SQLAlchemy'],
    features: [
      'Event management system',
      'Dynamic image galleries',
      'Sponsor management section',
      'Team member profiles',
      'Contact form with message handling',
      'Admin panel for content management'
    ],
    github: 'https://github.com/arpanpramanik2003/freshers-website',
    live: 'https://freshers-event.vercel.app',
    status: 'Completed',
    year: '2024'
  },
  {
    id: 7,
    title: 'ECG Signal Analysis System',
    category: 'Machine Learning',
    icon: '❤️',
    featured: false,
    description: 'ML model for analyzing ECG signals to detect cardiac abnormalities.',
    fullDescription: 'Developed a machine learning system for analyzing electrocardiogram (ECG) signals to detect various cardiac abnormalities. Uses signal processing techniques and deep learning for accurate classification of heart conditions.',
    tech: ['Python', 'TensorFlow', 'SciPy', 'NumPy', 'Signal Processing'],
    features: [
      'ECG signal preprocessing',
      'Feature extraction from time-series data',
      'Multi-class classification of cardiac conditions',
      'Real-time signal analysis',
      'Visualization of ECG patterns',
      'Model accuracy metrics and validation'
    ],
    github: 'https://github.com/arpanpramanik2003/ecg-analysis',
    live: null,
    status: 'In Progress',
    year: '2025'
  },
  {
    id: 8,
    title: 'Automated PowerPoint Generator',
    category: 'Web Development',
    icon: '📊',
    featured: false,
    description: 'Python automation tool for generating styled PowerPoint presentations programmatically.',
    fullDescription: 'Built a Python automation tool that programmatically generates PowerPoint presentations with custom formatting, themes, and content. Includes methodology sections, summary tables, and banner styling capabilities.',
    tech: ['Python', 'python-pptx', 'Automation', 'Templating'],
    features: [
      'Programmatic PPT generation',
      'Custom theme and styling support',
      'Multiple section templates',
      'Table and chart integration',
      'Batch presentation creation',
      'Template customization'
    ],
    github: 'https://github.com/arpanpramanik2003/ppt-generator',
    live: null,
    status: 'Completed',
    year: '2024'
  },
  {
    id: 9,
    title: 'LCAP Backend System',
    category: 'Web Development',
    icon: '🔧',
    featured: false,
    description: 'Low-code application platform backend with MongoDB and Hugging Face API integration.',
    fullDescription: 'Developed a backend system for a low-code application platform using Node.js and Express. Integrated MongoDB for data storage and Hugging Face API for ML model inference. Includes API endpoint testing and environment configuration.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Hugging Face API', 'REST API'],
    features: [
      'RESTful API architecture',
      'MongoDB database integration',
      'Hugging Face ML model integration',
      'Environment variable configuration',
      'API endpoint testing with Postman',
      'Error handling and logging'
    ],
    github: 'https://github.com/arpanpramanik2003/lcap-backend',
    live: null,
    status: 'Completed',
    year: '2024'
  },
  {
    id: 10,
    title: 'Image Captioning Model',
    category: 'Deep Learning',
    icon: '🖼️',
    featured: false,
    description: 'CNN-LSTM based model for generating captions for images automatically.',
    fullDescription: 'Developed an image captioning model using CNN for feature extraction and LSTM for caption generation. The model can generate descriptive captions for images automatically, useful for accessibility and content management.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'LSTM', 'NLP'],
    features: [
      'CNN-based image feature extraction',
      'LSTM sequence generation',
      'Attention mechanism implementation',
      'BLEU score evaluation',
      'Batch caption generation',
      'Pre-trained model integration'
    ],
    github: 'https://github.com/arpanpramanik2003/image-captioning',
    live: null,
    status: 'In Progress',
    year: '2025'
  }
]

// Helper function to get featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData
}

// Helper function to get projects by category
export const getProjectsByCategory = (category) => {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
}
