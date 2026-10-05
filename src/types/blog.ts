export type CategoryId =
  | 'sports'
  | 'technology'
  | 'entertainment'
  | 'travel'
  | 'business'
  | 'health'
  | 'education'
  | 'automobiles'
  | 'food'
  | 'ai';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  focusTopics: string[];
  color: string;
  iconName: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  quote?: string;
  keyPoints?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  categoryName: string;
  author: ArticleAuthor;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  excerpt: string;
  featured?: boolean;
  trending?: boolean;
  trendingRank?: number;
  popularRank?: number;
  tags: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}
