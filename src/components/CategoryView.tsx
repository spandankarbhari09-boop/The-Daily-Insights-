import React, { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Article, CategoryId } from '../types/blog';
import { getCategoryById } from '../data/categories';
import { ArticleCard } from './ArticleCard';

interface CategoryViewProps {
  categoryId: CategoryId;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBackToHome: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryId,
  articles,
  onSelectArticle,
  onBackToHome,
}) => {
  const category = getCategoryById(categoryId);
  const catArticles = articles.filter((a) => a.category === categoryId);

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'readTime'>('latest');

  // Filter by tag if selected
  const filteredArticles = catArticles.filter((art) => {
    if (selectedTag === 'all') return true;
    return art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'popular') {
      return (a.popularRank || 99) - (b.popularRank || 99);
    }
    if (sortBy === 'readTime') {
      const aMin = parseInt(a.readTime) || 5;
      const bMin = parseInt(b.readTime) || 5;
      return aMin - bMin;
    }
    // Default latest (by date / array index)
    return 0;
  });

  // Extract all unique tags in this category
  const allTags = Array.from(new Set(catArticles.flatMap((a) => a.tags)));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button
            onClick={onBackToHome}
            className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Front Page
          </button>
          <span>/</span>
          <span className="font-semibold text-stone-800 dark:text-stone-200">{category.name}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-10 mb-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Desk</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50">
              {category.name}
            </h1>

            <p className="mt-2 text-base sm:text-lg text-amber-900/80 dark:text-amber-300/80 font-medium">
              {category.tagline}
            </p>

            <p className="mt-4 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {category.description}
            </p>

            {/* Core Coverage Pillars */}
            <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
              <div className="text-xs uppercase font-semibold text-stone-400 mb-2">
                Core Coverage Pillars:
              </div>
              <div className="flex flex-wrap gap-2">
                {category.focusTopics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sorting Controls Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          {/* Tag filters (functional interactive segmented controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/50 dark:bg-stone-900 rounded-lg">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedTag === 'all'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All Topics ({catArticles.length})
            </button>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedTag === tag
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort By dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-stone-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-700"
            >
              <option value="latest">Latest Published</option>
              <option value="popular">Most Popular</option>
              <option value="readTime">Shortest Read</option>
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        {sortedArticles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 p-8">
            <p className="text-stone-500">No articles found for this topic filter.</p>
            <button
              onClick={() => setSelectedTag('all')}
              className="mt-4 text-xs font-semibold text-amber-800 dark:text-amber-400 underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
