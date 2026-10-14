import { CategoryId, PageKeywords, Article } from '../types/blog';

export const HOME_PAGE_KEYWORDS: PageKeywords = {
  mainKeyword: 'Digital Magazine',
  relatedKeywords: ['Culture & Tech Insights', 'Global Editorial Stories'],
};

export const ABOUT_PAGE_KEYWORDS: PageKeywords = {
  mainKeyword: 'Independent Journalism',
  relatedKeywords: ['Editorial Integrity', 'Fact-Checked Modern Reporting'],
};

export const BOOKMARKS_PAGE_KEYWORDS: PageKeywords = {
  mainKeyword: 'Curated Reading Archive',
  relatedKeywords: ['Personal Knowledge Digest', 'Saved Longform Stories'],
};

export const CATEGORY_KEYWORDS: Record<CategoryId, PageKeywords> = {
  sports: {
    mainKeyword: 'Sports Analytics & Strategy',
    relatedKeywords: ['Athletic Performance', 'Championship Competition'],
  },
  technology: {
    mainKeyword: 'Modern Technology Trends',
    relatedKeywords: ['Digital Innovation', 'Future Computing Systems'],
  },
  entertainment: {
    mainKeyword: 'Contemporary Arts & Cinema',
    relatedKeywords: ['Prestige Television & Film', 'Music Industry Dynamics'],
  },
  travel: {
    mainKeyword: 'Mindful Global Travel',
    relatedKeywords: ['Cultural Expeditions', 'Sustainable Adventure Tourism'],
  },
  business: {
    mainKeyword: 'Global Business Strategy',
    relatedKeywords: ['Market Economics', 'Venture Innovation & Capital'],
  },
  health: {
    mainKeyword: 'Evidence-Based Health & Wellness',
    relatedKeywords: ['Preventive Longevity', 'Restorative Physical Habits'],
  },
  education: {
    mainKeyword: 'Modern Cognitive Education',
    relatedKeywords: ['Lifelong Skill Acquisition', 'Digital Learning Frontiers'],
  },
  automobiles: {
    mainKeyword: 'Automotive Engineering & Mobility',
    relatedKeywords: ['Electric Vehicle Transition', 'Autonomous Driving Systems'],
  },
  food: {
    mainKeyword: 'Artisanal Food & Gastronomy',
    relatedKeywords: ['Culinary Culture', 'Specialty Coffee & Craft Living'],
  },
  ai: {
    mainKeyword: 'Artificial Intelligence Horizons',
    relatedKeywords: ['Machine Learning Automation', 'Autonomous Agent Systems'],
  },
};

export const ARTICLE_KEYWORDS_MAP: Record<string, PageKeywords> = {
  // Artificial Intelligence (ai-1 .. ai-5)
  'ai-1': {
    mainKeyword: 'AI Workplace Productivity',
    relatedKeywords: ['Automated Document Drafting', 'Cognitive Bandwidth Reclamation'],
  },
  'how-artificial-intelligence-is-changing-everyday-productivity': {
    mainKeyword: 'AI Workplace Productivity',
    relatedKeywords: ['Automated Document Drafting', 'Cognitive Bandwidth Reclamation'],
  },
  'ai-2': {
    mainKeyword: 'Ethical AI Systems',
    relatedKeywords: ['Algorithmic Bias Mitigation', 'Constitutional AI Alignment'],
  },
  'ethical-considerations-in-modern-ai-systems-bias-privacy-and-alignment': {
    mainKeyword: 'Ethical AI Systems',
    relatedKeywords: ['Algorithmic Bias Mitigation', 'Constitutional AI Alignment'],
  },
  'ai-3': {
    mainKeyword: 'Small Language Models',
    relatedKeywords: ['On-Device Edge Computing', 'Quantized Neural Networks'],
  },
  'the-rise-of-small-language-models-and-edge-computing': {
    mainKeyword: 'Small Language Models',
    relatedKeywords: ['On-Device Edge Computing', 'Quantized Neural Networks'],
  },
  'ai-4': {
    mainKeyword: 'Generative AI in Medicine',
    relatedKeywords: ['Preclinical Drug Discovery', 'Protein Structure Folding'],
  },
  'generative-ai-in-medicine-protein-folding-and-drug-discovery': {
    mainKeyword: 'Generative AI in Medicine',
    relatedKeywords: ['Preclinical Drug Discovery', 'Protein Structure Folding'],
  },
  'ai-5': {
    mainKeyword: 'Agentic AI Architectures',
    relatedKeywords: ['Multi-Agent Orchestration', 'Autonomous Enterprise Workflows'],
  },
  'agentic-ai-how-multi-agent-systems-coordinate-complex-workflows': {
    mainKeyword: 'Agentic AI Architectures',
    relatedKeywords: ['Multi-Agent Orchestration', 'Autonomous Enterprise Workflows'],
  },

  // Automobiles (auto-1 .. auto-5)
  'auto-1': {
    mainKeyword: 'Electric Vehicle Batteries',
    relatedKeywords: ['Solid-State Battery Horizons', 'High-Voltage Fast Charging'],
  },
  'the-future-of-electric-vehicles-battery-leaps-and-solid-state-horizons': {
    mainKeyword: 'Electric Vehicle Batteries',
    relatedKeywords: ['Solid-State Battery Horizons', 'High-Voltage Fast Charging'],
  },
  'auto-2': {
    mainKeyword: 'Smart Car Cockpits',
    relatedKeywords: ['In-Vehicle AI Assistants', 'Software-Defined Vehicles'],
  },
  'how-software-and-ai-are-transforming-modern-car-cockpits': {
    mainKeyword: 'Smart Car Cockpits',
    relatedKeywords: ['In-Vehicle AI Assistants', 'Software-Defined Vehicles'],
  },
  'auto-3': {
    mainKeyword: 'Analog Sports Cars',
    relatedKeywords: ['Manual Transmission Driving', 'Mechanical Driver Engagement'],
  },
  'the-enduring-appeal-of-analog-sports-cars-in-a-digital-age': {
    mainKeyword: 'Analog Sports Cars',
    relatedKeywords: ['Manual Transmission Driving', 'Mechanical Driver Engagement'],
  },
  'auto-4': {
    mainKeyword: 'Autonomous Driving Systems',
    relatedKeywords: ['LiDAR Edge Sensors', 'Urban Autonomous Safety'],
  },
  'autonomous-driving-reality-sensors-safety-and-the-urban-challenge': {
    mainKeyword: 'Autonomous Driving Systems',
    relatedKeywords: ['LiDAR Edge Sensors', 'Urban Autonomous Safety'],
  },
  'auto-5': {
    mainKeyword: 'Urban Micromobility',
    relatedKeywords: ['Commuter Motorcycles', 'High-Density Megacity Transit'],
  },
  'the-rise-of-motorcycles-and-micromobility-in-clogged-megacities': {
    mainKeyword: 'Urban Micromobility',
    relatedKeywords: ['Commuter Motorcycles', 'High-Density Megacity Transit'],
  },

  // Business (biz-1 .. biz-5)
  'biz-1': {
    mainKeyword: 'Startup Business Trends',
    relatedKeywords: ['Young Entrepreneurship', 'Sustainable Venture Strategy'],
  },
  '10-business-trends-every-young-entrepreneur-should-know': {
    mainKeyword: 'Startup Business Trends',
    relatedKeywords: ['Young Entrepreneurship', 'Sustainable Venture Strategy'],
  },
  'biz-2': {
    mainKeyword: 'Early Wealth Building',
    relatedKeywords: ['Compound Interest Investing', 'Personal Finance Discipline'],
  },
  'how-to-build-wealth-in-your-20s-a-practical-guide': {
    mainKeyword: 'Early Wealth Building',
    relatedKeywords: ['Compound Interest Investing', 'Personal Finance Discipline'],
  },
  'biz-3': {
    mainKeyword: 'Future of Gig Economy',
    relatedKeywords: ['Freelance Labor Markets', 'Modern Workplace Flexibility'],
  },
  'the-gig-economy-vs-traditional-employment-the-future-of-work': {
    mainKeyword: 'Future of Gig Economy',
    relatedKeywords: ['Freelance Labor Markets', 'Modern Workplace Flexibility'],
  },
  'biz-4': {
    mainKeyword: 'Sustainable Business Strategy',
    relatedKeywords: ['ESG Enterprise Value', 'Circular Economy Practices'],
  },
  'why-sustainable-business-practices-are-no-longer-optional': {
    mainKeyword: 'Sustainable Business Strategy',
    relatedKeywords: ['ESG Enterprise Value', 'Circular Economy Practices'],
  },
  'biz-5': {
    mainKeyword: 'Macroeconomic Inflation',
    relatedKeywords: ['Purchasing Power Protection', 'Asset Allocation Hedging'],
  },
  'understanding-inflation-how-it-affects-everyday-life-and-investments': {
    mainKeyword: 'Macroeconomic Inflation',
    relatedKeywords: ['Purchasing Power Protection', 'Asset Allocation Hedging'],
  },

  // Education (edu-1 .. edu-5)
  'edu-1': {
    mainKeyword: 'Active Recall Study Techniques',
    relatedKeywords: ['Spaced Repetition Systems', 'Cognitive Retention Methods'],
  },
  '10-study-techniques-that-can-improve-your-learning': {
    mainKeyword: 'Active Recall Study Techniques',
    relatedKeywords: ['Spaced Repetition Systems', 'Cognitive Retention Methods'],
  },
  'edu-2': {
    mainKeyword: 'Digital Online Education',
    relatedKeywords: ['Adaptive E-Learning Platforms', 'Virtual Pedagogical Tools'],
  },
  'the-future-of-online-education-trends-tools-and-transformation': {
    mainKeyword: 'Digital Online Education',
    relatedKeywords: ['Adaptive E-Learning Platforms', 'Virtual Pedagogical Tools'],
  },
  'edu-3': {
    mainKeyword: 'Lifelong Career Learning',
    relatedKeywords: ['Adaptive Skill Acquisition', 'Future Workforce Agility'],
  },
  'why-lifelong-learning-is-the-ultimate-career-superpower': {
    mainKeyword: 'Lifelong Career Learning',
    relatedKeywords: ['Adaptive Skill Acquisition', 'Future Workforce Agility'],
  },
  'edu-4': {
    mainKeyword: 'Accelerated Language Learning',
    relatedKeywords: ['Comprehensible Input Method', 'Spaced Memory Immersion'],
  },
  'how-to-learn-a-new-language-faster-evidence-based-methods': {
    mainKeyword: 'Accelerated Language Learning',
    relatedKeywords: ['Comprehensible Input Method', 'Spaced Memory Immersion'],
  },
  'edu-5': {
    mainKeyword: 'Information Age Critical Thinking',
    relatedKeywords: ['Source Verification Habits', 'Algorithmic Media Literacy'],
  },
  'the-role-of-critical-thinking-in-the-age-of-information-overload': {
    mainKeyword: 'Information Age Critical Thinking',
    relatedKeywords: ['Source Verification Habits', 'Algorithmic Media Literacy'],
  },

  // Entertainment (ent-1 .. ent-5)
  'ent-1': {
    mainKeyword: 'Streaming Entertainment Economics',
    relatedKeywords: ['Direct-to-Consumer Platforms', 'Prestige Television Production'],
  },
  'why-streaming-platforms-are-changing-modern-entertainment': {
    mainKeyword: 'Streaming Entertainment Economics',
    relatedKeywords: ['Direct-to-Consumer Platforms', 'Prestige Television Production'],
  },
  'ent-2': {
    mainKeyword: 'Vinyl Record Renaissance',
    relatedKeywords: ['Analog Audiophile Listening', 'Physical Music Media Culture'],
  },
  'the-cultural-resurgence-of-vinyl-records-in-a-streaming-world': {
    mainKeyword: 'Vinyl Record Renaissance',
    relatedKeywords: ['Analog Audiophile Listening', 'Physical Music Media Culture'],
  },
  'ent-3': {
    mainKeyword: 'Video Games as High Art',
    relatedKeywords: ['Interactive Narrative Design', 'Architectural World-Building'],
  },
  'video-games-as-high-art-interactive-storytelling-in-the-21st-century': {
    mainKeyword: 'Video Games as High Art',
    relatedKeywords: ['Interactive Narrative Design', 'Architectural World-Building'],
  },
  'ent-4': {
    mainKeyword: 'Independent Cinema Renaissance',
    relatedKeywords: ['Creator Direct Distribution', 'Micro-Budget Filmmaking'],
  },
  'the-renaissance-of-independent-cinema-and-direct-distribution': {
    mainKeyword: 'Independent Cinema Renaissance',
    relatedKeywords: ['Creator Direct Distribution', 'Micro-Budget Filmmaking'],
  },
  'ent-5': {
    mainKeyword: 'Immersive Music Festivals',
    relatedKeywords: ['Multi-Sensory Live Gatherings', 'Communal Festival Culture'],
  },
  'how-music-festivals-became-multi-sensory-cultural-gatherings': {
    mainKeyword: 'Immersive Music Festivals',
    relatedKeywords: ['Multi-Sensory Live Gatherings', 'Communal Festival Culture'],
  },

  // Food (food-1 .. food-5)
  'food-1': {
    mainKeyword: 'Modern Café Food Trends',
    relatedKeywords: ['Artisan Sourdough Bakeries', 'Third-Wave Specialty Dining'],
  },
  '10-food-trends-taking-over-modern-cafes-and-artisan-bakeries': {
    mainKeyword: 'Modern Café Food Trends',
    relatedKeywords: ['Artisan Sourdough Bakeries', 'Third-Wave Specialty Dining'],
  },
  'food-2': {
    mainKeyword: 'Global Street Food Culture',
    relatedKeywords: ['Night Market Gastronomy', 'Authentic Regional Cookery'],
  },
  'the-growing-global-popularity-of-street-food-and-night-markets': {
    mainKeyword: 'Global Street Food Culture',
    relatedKeywords: ['Night Market Gastronomy', 'Authentic Regional Cookery'],
  },
  'food-3': {
    mainKeyword: 'Mindful Lifestyle Habits',
    relatedKeywords: ['Slow Living Routines', 'Intentional Home Spaces'],
  },
  'simple-lifestyle-changes-for-a-more-balanced-and-mindful-life': {
    mainKeyword: 'Mindful Lifestyle Habits',
    relatedKeywords: ['Slow Living Routines', 'Intentional Home Spaces'],
  },
  'food-4': {
    mainKeyword: 'Artisanal Specialty Coffee',
    relatedKeywords: ['Precision Pour-Over Extraction', 'Single-Origin Bean Roasting'],
  },
  'the-art-of-artisanal-coffee-brewing-from-bean-to-cup': {
    mainKeyword: 'Artisanal Specialty Coffee',
    relatedKeywords: ['Precision Pour-Over Extraction', 'Single-Origin Bean Roasting'],
  },
  'food-5': {
    mainKeyword: 'Home Fermentation Science',
    relatedKeywords: ['Probiotic Kimchi & Miso', 'Living Microbial Culture'],
  },
  'the-renaissance-of-home-fermentation-kimchi-kombucha-and-miso': {
    mainKeyword: 'Home Fermentation Science',
    relatedKeywords: ['Probiotic Kimchi & Miso', 'Living Microbial Culture'],
  },

  // Health (health-1 .. health-5)
  'health-1': {
    mainKeyword: 'Daily Longevity Habits',
    relatedKeywords: ['Circadian Hydration Routines', 'Restorative Physical Wellness'],
  },
  'simple-daily-habits-for-a-healthier-lifestyle': {
    mainKeyword: 'Daily Longevity Habits',
    relatedKeywords: ['Circadian Hydration Routines', 'Restorative Physical Wellness'],
  },
  'health-2': {
    mainKeyword: 'Restorative Sleep Science',
    relatedKeywords: ['Deep Sleep Architecture', 'Cognitive Neuro-Recovery'],
  },
  'the-importance-of-sleep-for-mental-and-physical-health': {
    mainKeyword: 'Restorative Sleep Science',
    relatedKeywords: ['Deep Sleep Architecture', 'Cognitive Neuro-Recovery'],
  },
  'health-3': {
    mainKeyword: 'Sustainable Exercise Routines',
    relatedKeywords: ['Progressive Consistency Habits', 'Zone 2 Cardiovascular Health'],
  },
  'how-to-start-an-exercise-routine-you-can-actually-stick-to': {
    mainKeyword: 'Sustainable Exercise Routines',
    relatedKeywords: ['Progressive Consistency Habits', 'Zone 2 Cardiovascular Health'],
  },
  'health-4': {
    mainKeyword: 'Digital Age Mental Health',
    relatedKeywords: ['Screen Time Stress Reduction', 'Dopamine Detox Habits'],
  },
  'mental-health-in-the-digital-age-managing-stress-and-screen-time': {
    mainKeyword: 'Digital Age Mental Health',
    relatedKeywords: ['Screen Time Stress Reduction', 'Dopamine Detox Habits'],
  },
  'health-5': {
    mainKeyword: 'Evidence-Based Nutrition',
    relatedKeywords: ['Metabolic Micronutrient Health', 'Debunking Restrictive Diets'],
  },
  'nutrition-myths-debunked-what-science-actually-says': {
    mainKeyword: 'Evidence-Based Nutrition',
    relatedKeywords: ['Metabolic Micronutrient Health', 'Debunking Restrictive Diets'],
  },

  // Sports (sports-1 .. sports-5)
  'sports-1': {
    mainKeyword: 'Next-Gen Football Stars',
    relatedKeywords: ['Youth Academy Development', 'Elite European Football'],
  },
  'the-rise-of-young-football-stars-changing-modern-football': {
    mainKeyword: 'Next-Gen Football Stars',
    relatedKeywords: ['Youth Academy Development', 'Elite European Football'],
  },
  'sports-2': {
    mainKeyword: 'Modern Cricket Evolution',
    relatedKeywords: ['T20 Franchise Analytics', 'Multi-Format Athletic Conditioning'],
  },
  '5-cricket-trends-that-could-define-the-next-generation': {
    mainKeyword: 'Modern Cricket Evolution',
    relatedKeywords: ['T20 Franchise Analytics', 'Multi-Format Athletic Conditioning'],
  },
  'sports-3': {
    mainKeyword: 'Professional Sports Technology',
    relatedKeywords: ['Biometric Wearable Tracking', 'Computer Vision Refereeing'],
  },
  'the-growing-impact-of-technology-in-professional-sports': {
    mainKeyword: 'Professional Sports Technology',
    relatedKeywords: ['Biometric Wearable Tracking', 'Computer Vision Refereeing'],
  },
  'sports-4': {
    mainKeyword: 'Modern Football Tactics',
    relatedKeywords: ['High-Press Counter-Attacking', 'Positional Play Structures'],
  },
  'the-evolution-of-football-tactics-in-the-modern-era': {
    mainKeyword: 'Modern Football Tactics',
    relatedKeywords: ['High-Press Counter-Attacking', 'Positional Play Structures'],
  },
  'sports-5': {
    mainKeyword: 'Next-Gen Tennis & Basketball',
    relatedKeywords: ['Athletic Kinematic Precision', 'Court Movement Ergonomics'],
  },
  'why-young-athletes-are-redefining-global-tennis-and-basketball': {
    mainKeyword: 'Next-Gen Tennis & Basketball',
    relatedKeywords: ['Athletic Kinematic Precision', 'Court Movement Ergonomics'],
  },

  // Technology (tech-1 .. tech-5)
  'tech-1': {
    mainKeyword: 'Five-Year Technology Forecast',
    relatedKeywords: ['Quantum Computing Horizons', 'Ambient Spatial Interfaces'],
  },
  'ai-trends': {
    mainKeyword: 'Five-Year Technology Forecast',
    relatedKeywords: ['Quantum Computing Horizons', 'Ambient Spatial Interfaces'],
  },
  'technology/ai-trends': {
    mainKeyword: 'Five-Year Technology Forecast',
    relatedKeywords: ['Quantum Computing Horizons', 'Ambient Spatial Interfaces'],
  },
  '10-technology-trends-that-will-shape-the-next-five-years': {
    mainKeyword: 'Five-Year Technology Forecast',
    relatedKeywords: ['Quantum Computing Horizons', 'Ambient Spatial Interfaces'],
  },
  'tech-2': {
    mainKeyword: 'Next-Gen Smart Home',
    relatedKeywords: ['Matter Protocol Local Mesh', 'Contextual Home Automation'],
  },
  'how-smart-home-technology-is-evolving-in-2026': {
    mainKeyword: 'Next-Gen Smart Home',
    relatedKeywords: ['Matter Protocol Local Mesh', 'Contextual Home Automation'],
  },
  'tech-3': {
    mainKeyword: 'Everyday Cybersecurity',
    relatedKeywords: ['Passkey Digital Identity', 'Phishing & SIM-Swap Defense'],
  },
  'cybersecurity-in-everyday-life-protecting-your-digital-identity': {
    mainKeyword: 'Everyday Cybersecurity',
    relatedKeywords: ['Passkey Digital Identity', 'Phishing & SIM-Swap Defense'],
  },
  'tech-4': {
    mainKeyword: 'Diagnostic Health Wearables',
    relatedKeywords: ['Continuous Biosensor Monitoring', 'Preventive Medical Telemetry'],
  },
  'the-evolution-of-wearables-from-fitness-trackers-to-health-guardians': {
    mainKeyword: 'Diagnostic Health Wearables',
    relatedKeywords: ['Continuous Biosensor Monitoring', 'Preventive Medical Telemetry'],
  },
  'tech-5': {
    mainKeyword: 'Sustainable Green Hardware',
    relatedKeywords: ['Right-to-Repair Movement', 'Circular Electronics Recycling'],
  },
  'sustainable-tech-can-the-industry-go-green': {
    mainKeyword: 'Sustainable Green Hardware',
    relatedKeywords: ['Right-to-Repair Movement', 'Circular Electronics Recycling'],
  },

  // Travel (travel-1 .. travel-5)
  'travel-1': {
    mainKeyword: 'Bucket-List Global Destinations',
    relatedKeywords: ['Immersive Cultural Travel', 'Off-the-Beaten-Path Expeditions'],
  },
  '10-incredible-destinations-to-add-to-your-travel-bucket-list': {
    mainKeyword: 'Bucket-List Global Destinations',
    relatedKeywords: ['Immersive Cultural Travel', 'Off-the-Beaten-Path Expeditions'],
  },
  'travel-2': {
    mainKeyword: 'Budget-Friendly Weekend Travel',
    relatedKeywords: ['Smart Flight Booking Hacks', 'Local Public Transit Literacy'],
  },
  'how-to-plan-a-budget-friendly-weekend-trip': {
    mainKeyword: 'Budget-Friendly Weekend Travel',
    relatedKeywords: ['Smart Flight Booking Hacks', 'Local Public Transit Literacy'],
  },
  'travel-3': {
    mainKeyword: 'Transformative Solo Travel',
    relatedKeywords: ['Independent Global Exploration', 'Cross-Cultural Confidence'],
  },
  'the-rise-of-solo-travel-freedom-self-discovery-and-adventure': {
    mainKeyword: 'Transformative Solo Travel',
    relatedKeywords: ['Independent Global Exploration', 'Cross-Cultural Confidence'],
  },
  'travel-4': {
    mainKeyword: 'Responsible Sustainable Tourism',
    relatedKeywords: ['Low-Impact Eco Exploration', 'Overtourism Preservation'],
  },
  'sustainable-tourism-how-to-explore-the-world-responsibly': {
    mainKeyword: 'Responsible Sustainable Tourism',
    relatedKeywords: ['Low-Impact Eco Exploration', 'Overtourism Preservation'],
  },
  'travel-5': {
    mainKeyword: 'Endangered Cultural Heritage Sites',
    relatedKeywords: ['Historic Monument Preservation', 'Reverent Architectural Travel'],
  },
  'exploring-cultural-heritage-sites-before-they-disappear': {
    mainKeyword: 'Endangered Cultural Heritage Sites',
    relatedKeywords: ['Historic Monument Preservation', 'Reverent Architectural Travel'],
  },
};

/**
 * Returns the exact 1 main keyword and 2 related keywords for any Category
 */
export function getCategoryKeywords(categoryId: CategoryId): PageKeywords {
  return (
    CATEGORY_KEYWORDS[categoryId] || {
      mainKeyword: `${categoryId.toUpperCase()} Insights`,
      relatedKeywords: ['In-Depth Editorial Analysis', 'Global Perspective'],
    }
  );
}

/**
 * Returns the exact 1 main keyword and 2 related keywords for any Article
 */
export function getArticleKeywords(article: Article): PageKeywords {
  if (article.id && ARTICLE_KEYWORDS_MAP[article.id]) {
    return ARTICLE_KEYWORDS_MAP[article.id];
  }
  if (article.slug && ARTICLE_KEYWORDS_MAP[article.slug]) {
    return ARTICLE_KEYWORDS_MAP[article.slug];
  }
  if (article.mainKeyword && article.relatedKeywords && article.relatedKeywords.length === 2) {
    return {
      mainKeyword: article.mainKeyword,
      relatedKeywords: article.relatedKeywords,
    };
  }
  // Smart fallback
  const firstTag = article.tags && article.tags[0] ? article.tags[0] : `${article.categoryName} Focus`;
  const secondTag = article.tags && article.tags[1] ? article.tags[1] : 'In-Depth Reporting';
  const thirdTag = article.tags && article.tags[2] ? article.tags[2] : 'Editorial Analysis';

  return {
    mainKeyword: firstTag,
    relatedKeywords: [secondTag, thirdTag],
  };
}

/**
 * Unified resolver for any page in the application
 */
export function getPageKeywords(
  view: 'home' | 'category' | 'article' | 'about' | 'bookmarks',
  options?: {
    categoryId?: CategoryId | 'all';
    article?: Article;
  }
): PageKeywords {
  switch (view) {
    case 'home':
      return HOME_PAGE_KEYWORDS;
    case 'about':
      return ABOUT_PAGE_KEYWORDS;
    case 'bookmarks':
      return BOOKMARKS_PAGE_KEYWORDS;
    case 'category':
      if (options?.categoryId && options.categoryId !== 'all') {
        return getCategoryKeywords(options.categoryId);
      }
      return HOME_PAGE_KEYWORDS;
    case 'article':
      if (options?.article) {
        return getArticleKeywords(options.article);
      }
      return HOME_PAGE_KEYWORDS;
    default:
      return HOME_PAGE_KEYWORDS;
  }
}
