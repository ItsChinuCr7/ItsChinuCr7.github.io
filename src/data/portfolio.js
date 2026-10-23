export const profile = {
  name: 'Chinmay Sanjay Chaudhari',
  firstName: 'Chinmay',
  handle: 'ItsChinuCr7',
  role: 'Software Development · Automation · Applied AI',
  tagline: 'I make messy information useful.',
  intro:
    'I work across frontend and backend development, automation, and practical AI — turning requirements and scattered information into systems people can actually use. I am continuing to learn how to make software and LLM applications more reliable.',
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
    period: 'PRESENT',
    title: 'Associate Software Engineer · Full Stack Developer',
    org: 'TCS',
    location: 'Gandhinagar, Gujarat · Software development',
    summary: 'Developing and maintaining application features across the frontend and backend, with attention to tested changes and reliable hand-offs.',
    details: [
      'Develop and maintain frontend and backend features from assigned requirements and user stories.',
      'Work with MongoDB for application data operations and integration between components.',
      'Investigate defects, debug behavior, and test changes before hand-off; collaborate with the team to clarify requirements and communicate progress.',
    ],
  },
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
    label: 'Code Quality',
    items: ['Python', 'SQL', 'JavaScript / TypeScript', 'REST APIs', 'MongoDB', 'Git / GitHub'],
    description: 'Build systems that are easier to inspect, debug and trust—not simply systems that return an answer.',
    practice: 'In the document assistant, this means checking inputs and outputs, screening for prompt injection, applying rate limits, and keeping source/page metadata attached to retrieved chunks.',
    span: 'wide',
  },
  {
    label: 'Analytics',
    items: ['Power BI', 'Tableau', 'Excel', 'EDA', 'Faithfulness', 'Context precision', 'Answer relevance'],
    description: 'Turn raw records and model outputs into evidence that can be evaluated and communicated clearly.',
    practice: 'The RAG evaluation workflow considers faithfulness, context precision, answer relevance and correctness, alongside latency and token usage. Representative benchmarks are still needed before claiming measured improvements.',
    span: 'normal',
  },
  {
    label: 'Automation',
    items: ['n8n', 'Python scripts', 'Selenium', 'Frontend / backend flows', 'PDF ingestion', 'Query routing', 'Caching'],
    description: 'Make repeatable work move through explicit, traceable steps instead of fragile manual hand-offs.',
    practice: 'The document pipeline extracts PDF text and pages, chunks and indexes the content, routes different query types, then validates and logs the answer. Caching is used to help with repeated requests.',
    span: 'normal',
  },
  {
    label: 'Applied AI Tools',
    items: ['RAG', 'FAISS', 'BM25', 'Embeddings', 'MMR', 'Reranking', 'Ollama', 'API integration'],
    description: 'Combine retrieval strategies so answers can draw on relevant evidence rather than relying on fluent generation alone.',
    practice: 'Semantic retrieval helps find related meaning, BM25 helps match exact terms, and the document tree supports section-aware queries. MMR and relevance scoring help reduce repetitive or weak context.',
    linkUrl: 'https://github.com/ItsChinuCr7/Bot_with_validation-',
    span: 'wide',
  },
  {
    label: 'Foundations',
    items: ['Chunking & overlap', 'Prompt design', 'Guardrails', 'Observability', 'Evaluation design', 'Context grounding'],
    description: 'Learn the trade-offs beneath the tools: where evidence comes from, how it is selected, and how a result can be checked.',
    practice: 'One core lesson: extraction quality, chunk boundaries, context selection and validation all affect an answer. The project’s feedback memory reuses lessons in later prompts; it does not retrain the model or change its weights.',
    span: 'normal',
  },
]

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', provider: 'Amazon Web Services', year: 'JAN 2024' },
  { name: 'Google Data Analytics Professional Certificate', provider: 'Coursera · Google', year: 'JUL 2025' },
  { name: 'PwC Switzerland Digital Intelligence Job Simulation', provider: 'TCS iON', year: 'MAR 2025' },
  { name: 'Data Visualization: Empowering with Effective Insights', provider: 'PwC', year: 'JUN 2025' },
  { name: 'Claude Certified Developer – Foundations', provider: 'Anthropic', year: 'OCT 2026' },
  { name: 'Databricks Certified Generative AI Engineer Associate', provider: 'Databricks', year: 'SEP 2026' },
]

// Original photographs supplied for the portfolio. Files are stored locally in public/images/field-frames/.
export const fieldNotes = [
  {
    id: '01', title: 'Under a low moon', place: 'WATER / NIGHT',
    caption: 'The lake grew quieter after the light went down.',
    image: '/images/field-frames/01-moonlit-kayak.webp',
    alt: 'View from the nose of a yellow kayak across dark water toward a low moon and its reflection',
    size: 'photo-tile--portrait',
  },
  {
    id: '02', title: 'Between staying and leaving', place: 'NIGHT / LONG EXPOSURE',
    caption: 'A study in stillness, movement and the passing of time.',
    image: '/images/field-frames/02-blue-hour-shore.webp',
    alt: 'A person appears seated by the water and standing near the shore beneath a starry blue sky',
    size: 'photo-tile--portrait',
  },
  {
    id: '03', title: 'A small thing growing', place: 'BOTANICAL / DETAIL',
    caption: 'A closer look at a flower easy to walk past.',
    image: '/images/field-frames/03-flower-detail.webp',
    alt: 'A small red-pink flower in focus against a soft green garden background',
    size: 'photo-tile--portrait',
  },
  {
    id: '04', title: 'Hands at work', place: 'PEOPLE / CRAFT',
    caption: 'Patience, skill and material in one quiet frame.',
    image: '/images/field-frames/04-stonecraft.webp',
    alt: 'A stone worker shaping a block beside a rough rock wall',
    size: 'photo-tile--portrait',
  },
  {
    id: '05', title: 'Weather between places', place: 'RAIN / THROUGH GLASS',
    caption: 'Letting rain, reflection and distance do the composition.',
    image: '/images/field-frames/05-rain-window.webp',
    alt: 'A rain-speckled window looking toward a distant building and a teal-grey sky',
    size: 'photo-tile--landscape',
  },
  {
    id: '06', title: 'Last light on the ridge', place: 'HILLS / SUNSET',
    caption: 'A small figure, a wide sky and the last light of day.',
    image: '/images/field-frames/06-last-light-ridge.webp',
    alt: 'A lone hiker on a sloping ridge under a blue and gold sunset sky',
    size: 'photo-tile--square',
  },
  {
    id: '07', title: 'Caught in the green', place: 'WILDLIFE / ENCOUNTER',
    caption: 'For a moment, the grass was doing the hiding.',
    image: '/images/field-frames/07-cat-in-grass.webp',
    alt: 'A cat peeking through green grass and leaves',
    size: 'photo-tile--portrait',
  },
  {
    id: '08', title: 'One line across the night', place: 'NIGHT SKY / LIGHT',
    caption: 'A thin trail crossing the night above familiar trees.',
    image: '/images/field-frames/08-night-trail.webp',
    alt: 'A thin bright trail across a deep blue night sky above dark trees',
    size: 'photo-tile--ultrawide-portrait',
  },
  {
    id: '09', title: 'Looking up', place: 'TREES / NIGHT',
    caption: 'The canopy becomes a frame around the dark.',
    image: '/images/field-frames/09-canopy-at-night.webp',
    alt: 'Tree branches and leaves reaching into a dark night sky',
    size: 'photo-tile--landscape',
  },
]
