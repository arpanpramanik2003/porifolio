export const researchData = [
  {
    id: 1,
    title: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
    authors: ['Shibdas Dutta', 'Subhrendu Guha Neogi' ,'Diya Chanda', 'Arpan Pramanik', 'Özgün Girgin', 'Enes Ladin Öncül'],
    conference: 'Presented',
    journal: 'IEEE/ ICRITO Conference',
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
    title: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
    authors: ['Shibdas Dutta', 'Subhrendu Guha Neogi', 'Shiladitya Chowdhury', 'Vikrant Chole', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE/ ICRITO Conference',
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
  },
  {
    id: 4,
    title: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
    authors: ['Shibdas Dutta', 'Barshan Adhikari', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE/ COMPUTINGCON Conference',
    year: '2025',
    status: 'Completed',
    category: 'Agricultural AI',
    icon: '🍅',
    abstract: 'This paper presents a novel multi-headed hybrid CNN-ViT model for simultaneous classification of potato and tomato crops along with their quality assessment (healthy vs. diseased). Unlike traditional models that treat crop identification and disease detection separately, our approach uses a shared Vision Transformer-based backbone with task-specific output heads, enabling efficient multi-task learning and reducing parameters by over 30%. The model is trained on a custom dataset containing 10,000 images of diseased and healthy samples of both crops, evenly split across four classes. We employ extensive geometric and photometric augmentations to improve generalization under varied real-world conditions. Experimental results show strong performance, achieving 98.45% accuracy in potato classification and 97.49% for tomato, with overall quality assessment accuracy reaching 98.5%. To enhance interpretability, we apply Grad-CAM visualizations that highlight critical regions such as leaf lesions and discoloration, offering insights into the model\'s decision-making process. The complete system is deployed via an interactive Streamlit interface, enabling real-time prediction and explanation.',
    keywords: ['Hybrid CNN-ViT', 'Vision Transformer', 'Multi-Task Learning', 'Solanaceous Crops', 'Quality Assessment', 'Explainable AI', 'Grad-CAM', 'Streamlit Deployment'],
    methodology: 'Multi-headed hybrid CNN-ViT with shared Vision Transformer backbone, task-specific output heads, Grad-CAM for explainability, 30%+ parameter reduction',
    results: {
      cropAccuracy: '98.45% / 97.49%',
      qualityAccuracy: '98.5%',
      dataset: 'Potato & Tomato (10,000 images)',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/COMPUTINGCON64838.2025.11376762',
    arxiv: null,
    github: null,
    color: 'from-indigo-500 to-violet-500'
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
