export const researchData = [
  {
    id: 1,
    title: 'FruitQ-GradeX: Explainable Deep Learning for Produce Quality Grading',
    authors: ['Shibdas Dutta', 'Diya Chanda', 'Arpan Pramanik'],
    conference: 'Presented',
    journal: 'IEEE/Conference Publication',
    year: '2025',
    status: 'Completed',
    category: 'Deep Learning',
    icon: '🍎',
    abstract: 'This paper presents a novel multi-task deep learning framework for simultaneous fruit classification and quality assessment using a multi-headed Convolutional Neural Network (CNN). The proposed model achieves state-of-the-art performance on a curated dataset of four Indian fruits (apple, banana, guava, and orange) with two quality classes (good and bad), achieving 98% accuracy in fruit classification and 99% accuracy in quality detection.',
    keywords: ['Fruit Quality Classification', 'Multi-Task Learning', 'CNN', 'Explainable AI', 'Grad-CAM', 'Agricultural Automation', 'Streamlit Deployment'],
    methodology: 'Multi-headed CNN with shared feature extractor, EfficientNetB3 architecture, Grad-CAM for interpretability',
    results: {
      fruitAccuracy: '98%',
      qualityAccuracy: '99%',
      dataset: '4 fruits, 2 quality classes',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/ICRITO66076.2025.11241706',
    arxiv: null,
    github: 'https://github.com/arpanpramanik2003/fruitq-gradex',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 2,
    title: 'Hyperspectral Fruit and Vegetable Classification using Deep Learning Approaches',
    authors: ['Shibdas Dutta', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE/Conference Publication',
    year: '2025',
    status: 'Under Progress',
    category: 'Computer Vision',
    icon: '🥬',
    abstract: 'Deep learning has revolutionized the fruits and vegetables classification in the food and farming sectors. This study presents an EfficientNetB3 model trained on a Kaggle dataset of 36 different classes, achieving 99.29% training accuracy and 97.21% test accuracy. Using transfer learning and real-time predictions with Streamlit and OpenCV, the model enables applications in food processing, retail analysis, and automated agriculture.',
    keywords: ['Fruit and Vegetable Classification', 'Deep Learning', 'EfficientNetB3', 'Transfer Learning', 'Computer Vision', 'Agriculture'],
    methodology: 'EfficientNetB3 with transfer learning, no data augmentation, real-time classification with OpenCV',
    results: {
      trainAccuracy: '99.29%',
      testAccuracy: '97.21%',
      classes: '36 fruit & vegetable varieties',
      deployment: 'Streamlit + OpenCV'
    },
    doi: null,
    arxiv: null,
    github: 'https://github.com/arpanpramanik2003/fruit-veg-classification.git',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    title: 'CropSense: Quality Detection in Solanaceous Crops Using Explainable Deep Learning',
    authors: ['Shibdas Dutta', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE/Conference Publication',
    year: '2025',
    status: 'Completed',
    category: 'Agricultural AI',
    icon: '🥔',
    abstract: 'This paper presents a novel multi-headed convolutional neural network (CNN) architecture for simultaneous classification of potato and tomato crops and their quality assessment (healthy vs. diseased). The model achieves 99.9% accuracy in crop classification and 98.5% accuracy in quality assessment, with Grad-CAM visualizations providing interpretability for model decisions.',
    keywords: ['Multi-task Learning', 'CNN', 'Crop Classification', 'Quality Assessment', 'Precision Agriculture', 'Explainable AI', 'Grad-CAM'],
    methodology: 'Multi-headed CNN with shared feature extractor, Grad-CAM for explainability, balanced dataset of 10,000 images',
    results: {
      cropAccuracy: '99.9%',
      qualityAccuracy: '98.5%',
      dataset: 'Potato & Tomato (10,000 images)',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/ICRITO66076.2025.11241535',
    arxiv: null,
    github: 'https://github.com/arpanpramanik2003/cropsense',
    color: 'from-orange-500 to-red-500'
  }
]

// Helper functions
export const getPublishedPapers = () => {
  return researchData.filter(paper => paper.status === 'Published')
}

export const getUnderReviewPapers = () => {
  return researchData.filter(paper => paper.status === 'Under Progress')
}

export const getResearchByCategory = (category) => {
  if (category === 'All') return researchData
  return researchData.filter(paper => paper.category === category)
}
