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

// Helper functions for easy querying
export const getArticleBySlug = (slug: string): Article | undefined => {
  return ARTICLES.find((a) => a.slug === slug || a.id === slug);
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
