import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { Article, CategoryId } from '../types/blog';
import { ArticleCard } from './ArticleCard';

interface CategoryFeedProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewCategory: (categoryId: CategoryId) => void;
}

export const CategoryFeed: React.FC<CategoryFeedProps> = ({
  articles,
  onSelectArticle,
  onViewCategory,
}) => {
  return (
    <div className="divide-y divide-stone-200 dark:divide-stone-800">
      {CATEGORIES.map((cat, index) => {
        const catArticles = articles
          .filter((a) => a.category === cat.id)
          .slice(0, 3);

        const isEven = index % 2 === 0;

        return (
          <section
            key={cat.id}
            id={`category-section-${cat.id}`}
            className={`py-12 sm:py-16 ${
              isEven ? 'bg-transparent' : 'bg-stone-100/50 dark:bg-stone-900/30'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              {/* Category Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
                    <span>Desk 0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cat.tagline}</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                    {cat.name}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <p className="hidden md:inline text-xs text-stone-500 dark:text-stone-400 max-w-sm line-clamp-1">
                    {cat.description}
                  </p>
                  <button
                    onClick={() => onViewCategory(cat.id)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors whitespace-nowrap group"
                  >
                    <span>View All {cat.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* 3 Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {catArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={onSelectArticle}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
