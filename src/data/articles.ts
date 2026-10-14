import { Article } from '../types/blog';
import { SPORTS_ARTICLES } from './articles/sports';
import { TECHNOLOGY_ARTICLES } from './articles/technology';
import { ENTERTAINMENT_ARTICLES } from './articles/entertainment';
import { TRAVEL_ARTICLES } from './articles/travel';
import { BUSINESS_ARTICLES } from './articles/business';
import { HEALTH_ARTICLES } from './articles/health';
import { EDUCATION_ARTICLES } from './articles/education';
import { AUTOMOBILES_ARTICLES } from './articles/automobiles';
import { FOOD_ARTICLES } from './articles/food';
import { AI_ARTICLES } from './articles/ai';

export const ARTICLES: Article[] = [
  ...SPORTS_ARTICLES,
  ...TECHNOLOGY_ARTICLES,
  ...ENTERTAINMENT_ARTICLES,
  ...TRAVEL_ARTICLES,
  ...BUSINESS_ARTICLES,
  ...HEALTH_ARTICLES,
  ...EDUCATION_ARTICLES,
  ...AUTOMOBILES_ARTICLES,
  ...FOOD_ARTICLES,
  ...AI_ARTICLES,
];

export const getArticleUrl = (article: { category: string; slug: string }): string => {
  return `/${article.category}/${article.slug}`;
};

export const getCategoryUrl = (categoryId: string): string => {
  return `/category/${categoryId}`;
};

// Helper functions for easy querying
export const getArticleBySlug = (slugOrPath: string): Article | undefined => {
  if (!slugOrPath) return undefined;
  const clean = slugOrPath
    .replace(/^#\/?/, '')
    .replace(/^\/+/, '')
    .replace(/^article\//, '')
    .trim();

  // 1. Direct match by slug or id
  let found = ARTICLES.find((a) => a.slug === clean || a.id === clean);
  if (found) return found;

  // 2. Handle category/slug format e.g. "technology/ai-trends"
  if (clean.includes('/')) {
    const parts = clean.split('/');
    const slugPart = parts[parts.length - 1];
    const catPart = parts[0];
    found = ARTICLES.find(
      (a) =>
        (a.slug === slugPart || a.id === slugPart) &&
        (a.category === catPart || catPart === 'article' || catPart === 'category')
    );
    if (found) return found;
  }

  // 3. Handle backward compatible aliases
  const legacyAliases: Record<string, string> = {
    '10-technology-trends-that-will-shape-the-next-five-years': 'tech-1',
    'technology/10-technology-trends-that-will-shape-the-next-five-years': 'tech-1',
    'ai-trends': 'tech-1',
    'technology/ai-trends': 'tech-1',
  };

  const matchedId = legacyAliases[clean] || legacyAliases[clean.split('/').pop() || ''];
  if (matchedId) {
    return ARTICLES.find((a) => a.id === matchedId);
  }

  return undefined;
};

export const getArticlesByCategory = (categoryId: string): Article[] => {
  return ARTICLES.filter((a) => a.category === categoryId);
};

export const getTrendingArticles = (): Article[] => {
  return ARTICLES.filter((a) => a.trending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 5);
};

export const getFeaturedArticle = (): Article => {
  const featured = ARTICLES.find((a) => a.featured);
  return featured || ARTICLES[0];
};

export const getMostPopularArticles = (limit = 5): Article[] => {
  return [...ARTICLES]
    .filter((a) => a.popularRank)
    .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99))
    .slice(0, limit);
};

export const getRelatedArticles = (article: Article, limit = 3): Article[] => {
  return ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, limit);
};
