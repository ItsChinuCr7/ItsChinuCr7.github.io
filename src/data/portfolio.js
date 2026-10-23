export const profile = {
  name: 'Chinmay Sanjay Chaudhari',
  firstName: 'Chinmay',
  handle: 'ItsChinuCr7',
  role: 'Data · Automation · Applied AI',
  tagline: 'I make messy information useful.',
  intro:
    'I work across data operations, automation, and practical AI — turning scattered information into systems people can actually use. I like understanding how things work, then making them work better.',
  email: 'chinmaychaudhari0123@gmail.com',
  phone: '+91-8446261695',
  githubUsername: 'ItsChinuCr7',
  githubUrl: 'https://github.com/ItsChinuCr7',
  // Add the exact LinkedIn profile URL here when ready. Leave blank to hide the link.
  linkedinUrl: '',
  resumeUrl: '/resume.pdf',
  location: 'India',
  openTo: 'Data, automation & AI opportunities',
}

export const highlights = [
  { value: '10k+', label: 'lead records processed', note: 'Tor.ai · data operations' },
  { value: '60–70%', label: 'less manual effort', note: 'Automated enrichment workflows' },
  { value: '300+', label: 'expos researched', note: 'Event and market intelligence' },
  { value: '7+', label: 'industry sectors', note: 'Research across varied markets' },
]

export const experience = [
  {
    type: 'experience',
    period: 'OCT 2025 — MAR 2026',
    title: 'Pre-Sales & Data Operations',
    org: 'Tor.ai',
    location: 'Data operations · AI-assisted research',
    summary:
      'Worked across lead enrichment, event research, and outreach operations for an AI-driven enterprise automation platform.',
    details: [
      'Processed and enriched 10,000+ lead records using Python, Excel/XLOOKUP, n8n, and AI-assisted workflows.',
      'Researched and shortlisted 300+ global and Indian expos across 7+ industry sectors.',
      'Automated enrichment and outreach pipelines, reducing manual effort by an estimated 60–70%.',
    ],
  },
  {
    type: 'education',
    period: 'AUG 2021 — APR 2025',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Vellore Institute of Technology, Chennai',
    location: 'CGPA 7.80 / 10',
    summary: 'Computer science foundation with project work across data analysis, IoT, machine learning, and generative AI.',
    details: [],
  },
  {
    type: 'education',
    period: 'JUN 2020 — APR 2021',
    title: '12th Grade · MSBSHSE',
    org: 'Abhishek Junior College, Pune',
    location: '92%',
    summary: '',
    details: [],
  },
  {
    type: 'education',
    period: 'MAR 2018 — APR 2019',
    title: '10th Grade · ICSE',
    org: 'Podar International School, Pune',
    location: '88.17%',
    summary: '',
    details: [],
  },
]

export const projects = [
  {
    number: '01',
    repoUrl: 'https://github.com/ItsChinuCr7/Bot_with_validation-',
    title: 'AI Document Intelligence',
    subtitle: 'Advanced RAG system',
    category: 'Applied AI',
    summary:
      'A document question-answering pipeline combining keyword and vector search, re-ranking, structure-aware navigation, and a self-correction loop.',
    stack: ['Python', 'LangChain', 'FAISS', 'BM25', 'Selenium', 'Streamlit'],
    impact: 'Hybrid retrieval + response validation',
    accent: 'violet',
  },
  {
    number: '02',
    repoUrl: 'https://github.com/ItsChinuCr7/MOE',
    title: 'Smart Fall Detection',
    subtitle: 'Capstone · IoT + time series',
    category: 'ML / IoT',
    summary:
      'A fall-detection workflow built around self-collected six-axis IMU sensor data, time-series preprocessing, a Mixture of Experts model, and caregiver alerts.',
    stack: ['Python', 'Machine Learning', 'IoT', 'IMU', 'Time Series'],
    impact: 'Real-time WhatsApp alert workflow',
    accent: 'blue',
  },
  {
    number: '03',
    title: 'BigBasket Data Analysis',
    subtitle: 'Pricing, discounts & patterns',
    category: 'Analytics',
    summary:
      'Explored more than 8,000 product records, performed cleaning and clustering, and translated the findings into interactive Power BI dashboards.',
    stack: ['R', 'Power BI', 'dplyr', 'ggplot2', 'EDA', 'NLP'],
    impact: '8,000+ product records explored',
    accent: 'green',
  },
  {
    number: '04',
    title: 'MediBot',
    subtitle: 'AI medical information assistant',
    category: 'Generative AI',
    summary:
      'An API-connected assistant that structures medical form inputs into clearer context-aware summaries and consistent AI-generated guidance.',
    stack: ['Generative AI', 'Prompt Design', 'API Integration', 'Frontend'],
    impact: 'Structured inputs → consistent outputs',
    accent: 'amber',
  },
  {
    number: '05',
    title: 'LinkedIn Content Generator',
    subtitle: 'Prompt pipelines for writing',
    category: 'Generative AI',
    summary:
      'A tool that drafts professional posts from a topic, tone, and audience, with structured prompts and platform-oriented formatting.',
    stack: ['NLP', 'Generative AI', 'Prompt Engineering', 'API'],
    impact: 'Faster first-draft generation',
    accent: 'pink',
  },
]

export const skillGroups = [
  {
    label: 'Code & query',
    items: ['Python', 'SQL', 'R', 'C / C++'],
    description: 'Working with data, shaping it, and extracting a useful signal.',
    span: 'wide',
  },
  {
    label: 'Analytics',
    items: ['Power BI', 'Tableau', 'Advanced Excel', 'EDA', 'Dashboard design'],
    description: 'From raw records to clear decisions.',
    span: 'normal',
  },
  {
    label: 'Automation',
    items: ['n8n', 'Python scripts', 'Selenium', 'Data enrichment'],
    description: 'Replace repeatable manual steps with reliable workflows.',
    span: 'normal',
  },
  {
    label: 'Applied AI',
    items: ['Prompt engineering', 'RAG', 'FAISS', 'BM25', 'API integration'],
    description: 'Practical AI systems with retrieval and structured outputs.',
    span: 'wide',
  },
  {
    label: 'Tools & foundations',
    items: ['Git / GitHub', 'Bazel', 'Databricks basics', 'Apache Spark basics'],
    description: 'A broad base with room to keep learning.',
    span: 'normal',
  },
]

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', provider: 'Amazon Web Services', year: 'JAN 2024' },
  { name: 'Google Data Analytics Professional Certificate', provider: 'Coursera · Google', year: 'JUL 2025' },
  { name: 'PwC Switzerland Digital Intelligence Job Simulation', provider: 'TCS iON', year: 'MAR 2025' },
  { name: 'Data Visualization: Empowering with Effective Insights', provider: 'PwC', year: 'JUN 2025' },
]

// Temporary editorial examples only. Replace these image URLs and captions with your own photos.
// Keep images in /public/images and use paths such as '/images/your-photo.jpg' for a fully self-contained site.
export const fieldNotes = [
  {
    id: '01',
    title: 'The long way around',
    place: 'TRAVEL / OPEN ROADS',
    caption: 'A reminder that the route is part of the point.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    alt: 'A wide open landscape under a dramatic sky',
    shape: 'landscape',
  },
  {
    id: '02',
    title: 'Small details, big places',
    place: 'PHOTOGRAPHY / DETAILS',
    caption: 'Looking for the frame you would otherwise walk past.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85',
    alt: 'Mountain lake and a quiet landscape',
    shape: 'portrait',
  },
  {
    id: '03',
    title: 'Room to think',
    place: 'OUTDOORS / RESET',
    caption: 'More horizon. Less noise.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Mountain peaks rising into the clouds',
    shape: 'landscape',
  },
]
