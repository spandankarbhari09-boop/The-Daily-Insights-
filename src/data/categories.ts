import { CategoryInfo, CategoryId } from '../types/blog';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'sports',
    name: 'Sports',
    tagline: 'Athletics, Strategy & Modern Competition',
    description: 'Deep dives into football, cricket, tennis, basketball, Formula 1, and the athletes redefining modern athletic excellence.',
    focusTopics: ['Football', 'Cricket', 'Tennis', 'Basketball', 'Formula 1', 'Athletic Performance', 'Sports Tech'],
    color: '#0284c7', // Sky / Ocean
    iconName: 'Trophy',
    mainKeyword: 'Sports Analytics & Strategy',
    relatedKeywords: ['Athletic Performance', 'Championship Competition'],
  },
  {
    id: 'technology',
    name: 'Technology',
    tagline: 'Devices, Platforms & the Digital Horizon',
    description: 'Comprehensive coverage of smartphones, consumer hardware, cybersecurity breakthroughs, and emerging software paradigms.',
    focusTopics: ['Smartphones', 'Wearables', 'Consumer Tech', 'Cybersecurity', 'Apps & Platforms', 'Future Tech'],
    color: '#4f46e5', // Indigo
    iconName: 'Cpu',
    mainKeyword: 'Modern Technology Trends',
    relatedKeywords: ['Digital Innovation', 'Future Computing Systems'],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    tagline: 'Cinema, Streaming & Contemporary Pop Culture',
    description: 'Critical perspectives on movies, prestige television, music production, streaming economics, and cultural phenomena.',
    focusTopics: ['Cinema', 'Streaming Services', 'Music Industry', 'Pop Culture', 'Series & Television', 'Creative Arts'],
    color: '#9333ea', // Purple
    iconName: 'Film',
    mainKeyword: 'Contemporary Arts & Cinema',
    relatedKeywords: ['Prestige Television & Film', 'Music Industry Dynamics'],
  },
  {
    id: 'travel',
    name: 'Travel',
    tagline: 'Expeditions, Destinations & Mindful Wandering',
    description: 'Inspirational journeys, practical budget guides, solo expedition narratives, and responsible global exploration.',
    focusTopics: ['Global Destinations', 'Solo Journeys', 'Budget Travel', 'Eco Tourism', 'Hidden Gems', 'Travel Gear'],
    color: '#059669', // Emerald
    iconName: 'Compass',
    mainKeyword: 'Mindful Global Travel',
    relatedKeywords: ['Cultural Expeditions', 'Sustainable Adventure Tourism'],
  },
  {
    id: 'business',
    name: 'Business & Finance',
    tagline: 'Enterprises, Capital & Economic Strategy',
    description: 'Pragmatic insights for startup founders, personal wealth builders, modern career navigators, and market observers.',
    focusTopics: ['Startups', 'Personal Finance', 'Venture Capital', 'Digital Marketing', 'Global Economy', 'Workplace Culture'],
    color: '#b45309', // Amber / Gold
    iconName: 'TrendingUp',
    mainKeyword: 'Global Business Strategy',
    relatedKeywords: ['Market Economics', 'Venture Innovation & Capital'],
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    tagline: 'Longevity, Movement & Mindful Balance',
    description: 'Evidence-informed perspectives on sleep science, athletic recovery, nutritional wellness, and daily restorative routines.',
    focusTopics: ['Sleep Hygiene', 'Fitness Routines', 'Nutrition', 'Mental Health', 'Daily Habits', 'Preventive Living'],
    color: '#16a34a', // Green
    iconName: 'HeartPulse',
    mainKeyword: 'Evidence-Based Health & Wellness',
    relatedKeywords: ['Preventive Longevity', 'Restorative Physical Habits'],
  },
  {
    id: 'education',
    name: 'Education',
    tagline: 'Cognition, Skill Acquisition & Modern Learning',
    description: 'Actionable techniques for active recall, digital universities, future workforce readiness, and lifelong intellectual curiosity.',
    focusTopics: ['Study Methods', 'Online Learning', 'Future Careers', 'Cognitive Science', 'Student Life', 'Critical Thinking'],
    color: '#ea580c', // Orange
    iconName: 'GraduationCap',
    mainKeyword: 'Modern Cognitive Education',
    relatedKeywords: ['Lifelong Skill Acquisition', 'Digital Learning Frontiers'],
  },
  {
    id: 'automobiles',
    name: 'Automobiles',
    tagline: 'Mobility, Engineering & Automotive Design',
    description: 'Unflinching coverage of electric transition roadmaps, supercar engineering feats, autonomous driving, and road culture.',
    focusTopics: ['Electric Vehicles', 'Supercars', 'Autonomous Driving', 'Motorcycles', 'Car Design', 'Track Testing'],
    color: '#dc2626', // Red
    iconName: 'Car',
    mainKeyword: 'Automotive Engineering & Mobility',
    relatedKeywords: ['Electric Vehicle Transition', 'Autonomous Driving Systems'],
  },
  {
    id: 'food',
    name: 'Food & Lifestyle',
    tagline: 'Gastronomy, Artisanal Culture & Modern Living',
    description: 'Explorations of world street cuisine, third-wave café aesthetics, contemporary home cooking, and intentional design living.',
    focusTopics: ['Café Culture', 'Street Food', 'Culinary Trends', 'Home Cooking', 'Sustainable Design', 'Living Spaces'],
    color: '#d97706', // Warm Amber
    iconName: 'Utensils',
    mainKeyword: 'Artisanal Food & Gastronomy',
    relatedKeywords: ['Culinary Culture', 'Specialty Coffee & Craft Living'],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    tagline: 'Algorithms, Automation & Future Horizons',
    description: 'Thoughtful analysis on how computational models influence commerce, creative workflows, pedagogical tools, and daily productivity.',
    focusTopics: ['Business Automation', 'Creative Tools', 'AI in Education', 'Everyday Productivity', 'Model Ethics', 'Future Tech'],
    color: '#0891b2', // Cyan
    iconName: 'Sparkles',
    mainKeyword: 'Artificial Intelligence Horizons',
    relatedKeywords: ['Machine Learning Automation', 'Autonomous Agent Systems'],
  },
];

export const CATEGORY_FALLBACK_IMAGES: Record<CategoryId, string> = {
  sports: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  entertainment: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  health: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  automobiles: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  ai: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
};

export const getCategoryById = (id: CategoryId): CategoryInfo => {
  const found = CATEGORIES.find((c) => c.id === id);
  if (!found) {
    return CATEGORIES[0];
  }
  return found;
};
