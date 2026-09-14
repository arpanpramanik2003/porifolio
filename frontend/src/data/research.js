export const researchData = [
  {
    id: 1,
    title: 'FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning',
    authors: ['Shibdas Dutta', 'Subhrendu Guha Neogi', 'Diya Chanda', 'Arpan Pramanik', 'Özgün Girgin', 'Enes Ladin Öncül'],
    conference: 'Presented',
    journal: 'IEEE / ICRITO 2025',
    fullConference: '11th International Conference on Reliability, Infocom Technologies and Optimization (ICRITO 2025)',
    publisher: 'IEEE',
    year: '2025',
    status: 'Completed',
    category: 'Explainable AI & Grad-CAM',
    icon: '🍎',
    abstract: 'This paper presents a novel multi-task deep learning framework for simultaneous fruit classification and quality assessment using a multi-headed Convolutional Neural Network (CNN). The proposed model achieves state-of-the-art performance on a curated dataset of four Indian fruits (apple, banana, guava, and orange) with two quality classes (good and bad), achieving 98% accuracy in fruit classification and 99% accuracy in quality detection with Grad-CAM visual heatmaps.',
    keywords: ['Fruit Quality Classification', 'Multi-Task Learning', 'CNN', 'Explainable AI', 'Grad-CAM', 'Agricultural Automation', 'Streamlit Deployment'],
    methodology: 'Multi-headed CNN with shared feature extractor, EfficientNetB3 backbone, Grad-CAM for visual interpretability, and real-time Streamlit inference.',
    metrics: [
      { label: 'Quality Accuracy', val: '99.00%' },
      { label: 'Fruit Classification', val: '98.00%' },
      { label: 'Target Varieties', val: '4 Fruits' },
      { label: 'Explainability', val: 'Grad-CAM XAI' }
    ],
    results: {
      fruitAccuracy: '98%',
      qualityAccuracy: '99%',
      dataset: '4 fruits, 2 quality classes',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/ICRITO66076.2025.11241706',
    doiUrl: 'https://doi.org/10.1109/ICRITO66076.2025.11241706',
    github: 'https://github.com/arpanpramanik2003/fruitq-gradex',
    bibtex: `@inproceedings{dutta2025fruitq,
  title={FruitQ-GradeX: Determining Fruit Quality and Grading with Explainable Deep Learning},
  author={Dutta, Shibdas and Neogi, Subhrendu Guha and Chanda, Diya and Pramanik, Arpan and Girgin, {\\"O}zg{\\"u}n and {\\"O}nc{\\"u}l, Enes Ladin},
  booktitle={2025 11th International Conference on Reliability, Infocom Technologies and Optimization (ICRITO)},
  pages={1--6},
  year={2025},
  publisher={IEEE},
  doi={10.1109/ICRITO66076.2025.11241706}
}`
  },
  {
    id: 2,
    title: 'Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3',
    authors: ['Shibdas Dutta', 'Subhrendu Guha Neogi', 'Arpan Pramanik', 'Diya Chanda', 'Özgün Girgin', 'Enes Ladin Öncül'],
    conference: 'Presented',
    journal: 'Springer / ICDMIS 2025',
    fullConference: 'International Conference on Data Mining and Information Security (ICDMIS 2025)',
    publisher: 'Springer',
    year: '2025',
    status: 'Completed',
    category: 'Computer Vision',
    icon: '🥬',
    abstract: 'Deep learning has revolutionized the fruits and vegetables classification in the food and farming sectors. This study presents an EfficientNetB3 model trained on a comprehensive Kaggle dataset of 36 distinct agricultural classes, achieving 99.29% training accuracy and 97.21% test accuracy. Using transfer learning and real-time predictions with Streamlit and OpenCV, the model enables automated sorting and quality inspection in supply chain logistics.',
    keywords: ['Fruit and Vegetable Classification', 'Deep Learning', 'EfficientNetB3', 'Transfer Learning', 'Computer Vision', 'Agriculture', 'Hyperspectral Imaging'],
    methodology: 'EfficientNetB3 with transfer learning, custom top classification dense layers, real-time webcam frame classification with OpenCV and Streamlit.',
    metrics: [
      { label: 'Training Accuracy', val: '99.29%' },
      { label: 'Testing Accuracy', val: '97.21%' },
      { label: 'Class Spectrum', val: '36 Varieties' },
      { label: 'Backbone Network', val: 'EfficientNetB3' }
    ],
    results: {
      trainAccuracy: '99.29%',
      testAccuracy: '97.21%',
      classes: '36 fruit & vegetable varieties',
      deployment: 'Streamlit + OpenCV'
    },
    doi: '10.1007/978-3-032-21901-5_35',
    doiUrl: 'https://doi.org/10.1007/978-3-032-21901-5_35',
    github: 'https://github.com/arpanpramanik2003/fruit-veg-classification.git',
    bibtex: `@inproceedings{dutta2025hyperspectral,
  title={Hyperspectral Fruit and Vegetable Classification Using Convolutional Neural Networks with EfficientNetB3},
  author={Dutta, Shibdas and Neogi, Subhrendu Guha and Pramanik, Arpan and Chanda, Diya and Girgin, {\\"O}zg{\\"u}n and {\\"O}nc{\\"u}l, Enes Ladin},
  booktitle={Data Mining and Information Security (ICDMIS 2025)},
  series={Lecture Notes in Networks and Systems},
  year={2025},
  publisher={Springer Nature},
  doi={10.1007/978-3-032-21901-5_35}
}`
  },
  {
    id: 3,
    title: 'Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops',
    authors: ['Shibdas Dutta', 'Subhrendu Guha Neogi', 'Shiladitya Chowdhury', 'Vikrant Chole', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE / ICRITO 2025',
    fullConference: '11th International Conference on Reliability, Infocom Technologies and Optimization (ICRITO 2025)',
    publisher: 'IEEE',
    year: '2025',
    status: 'Completed',
    category: 'Explainable AI & Grad-CAM',
    icon: '🥔',
    abstract: 'This paper presents a novel multi-headed convolutional neural network (CNN) architecture for simultaneous classification of potato and tomato crops and their quality assessment (healthy vs. diseased). The model achieves 99.9% accuracy in crop classification and 98.5% accuracy in quality assessment, with Grad-CAM visualizations providing visual interpretability for agricultural diagnostic decisions.',
    keywords: ['Multi-task Learning', 'CNN', 'Crop Classification', 'Quality Assessment', 'Precision Agriculture', 'Explainable AI', 'Grad-CAM'],
    methodology: 'Multi-headed CNN with shared convolutional feature extractor, dual prediction branches, Grad-CAM attention visualizer, trained on a balanced 10,000-image dataset.',
    metrics: [
      { label: 'Crop Classification', val: '99.90%' },
      { label: 'Quality Assessment', val: '98.50%' },
      { label: 'Dataset Size', val: '10,000 Images' },
      { label: 'Model Interpretability', val: 'Grad-CAM XAI' }
    ],
    results: {
      cropAccuracy: '99.9%',
      qualityAccuracy: '98.5%',
      dataset: 'Potato & Tomato (10,000 images)',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/ICRITO66076.2025.11241535',
    doiUrl: 'https://doi.org/10.1109/ICRITO66076.2025.11241535',
    github: 'https://github.com/arpanpramanik2003/cropsense',
    bibtex: `@inproceedings{dutta2025cropsense,
  title={Cropsense: Explainable Deep Learning Framework for Accurate Quality Detection in Solanaceous Crops},
  author={Dutta, Shibdas and Neogi, Subhrendu Guha and Chowdhury, Shiladitya and Chole, Vikrant and Pramanik, Arpan and Chanda, Diya},
  booktitle={2025 11th International Conference on Reliability, Infocom Technologies and Optimization (ICRITO)},
  pages={1--6},
  year={2025},
  publisher={IEEE},
  doi={10.1109/ICRITO66076.2025.11241535}
}`
  },
  {
    id: 4,
    title: 'An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops',
    authors: ['Shibdas Dutta', 'Barshan Adhikari', 'Arpan Pramanik', 'Diya Chanda'],
    conference: 'Presented',
    journal: 'IEEE / COMPUTINGCON 2025',
    fullConference: 'International Conference on Computing and Communication Systems (COMPUTINGCON 2025)',
    publisher: 'IEEE',
    year: '2025',
    status: 'Completed',
    category: 'Vision Transformers & ViTs',
    icon: '🍅',
    abstract: 'This paper presents a multi-headed hybrid CNN-ViT architecture for simultaneous crop classification and quality assessment in Solanaceous crops (potato and tomato). Utilizing a shared Vision Transformer backbone, the model reduces parameters by 30% while achieving 98.5% quality detection accuracy, supported by Grad-CAM interpretability visualizations.',
    keywords: ['Hybrid CNN-ViT', 'Vision Transformer', 'Multi-Task Learning', 'Solanaceous Crops', 'Quality Assessment', 'Explainable AI', 'Grad-CAM', 'Model Compression'],
    methodology: 'Multi-headed hybrid CNN-ViT with shared Vision Transformer backbone, task-specific output heads, Grad-CAM for explainability, achieving 30%+ parameter reduction.',
    metrics: [
      { label: 'Quality Accuracy', val: '98.50%' },
      { label: 'Param Reduction', val: '30%+ Lighter' },
      { label: 'Architecture', val: 'Hybrid CNN-ViT' },
      { label: 'Crop Accuracy', val: '98.45% / 97.49%' }
    ],
    results: {
      cropAccuracy: '98.45% / 97.49%',
      qualityAccuracy: '98.5%',
      dataset: 'Potato & Tomato (10,000 images)',
      deployment: 'Streamlit interface'
    },
    doi: '10.1109/COMPUTINGCON64838.2025.11376762',
    doiUrl: 'https://doi.org/10.1109/COMPUTINGCON64838.2025.11376762',
    github: null,
    bibtex: `@inproceedings{dutta2025explainable,
  title={An Explainable Deep Learning Approach for Quality Assessment in Solanaceous Crops},
  author={Dutta, Shibdas and Adhikari, Barshan and Pramanik, Arpan and Chanda, Diya},
  booktitle={2025 International Conference on Computing and Communication Systems (COMPUTINGCON)},
  pages={1--6},
  year={2025},
  publisher={IEEE},
  doi={10.1109/COMPUTINGCON64838.2025.11376762}
}`
  }
];

export const getPublishedPapers = () => {
  return researchData.filter(paper => paper.status === 'Published' || paper.status === 'Completed')
};

export const getUnderReviewPapers = () => {
  return researchData.filter(paper => paper.status === 'Under Progress')
};

export const getResearchByCategory = (category) => {
  if (category === 'All') return researchData
  return researchData.filter(paper => paper.category === category)
};
