import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Article } from '../types/blog';
import { ArticleCard } from './ArticleCard';

interface TrendingSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [topImgError, setTopImgError] = React.useState(false);

  if (!articles || articles.length === 0) return null;

  const topTrending = articles[0];
  const remainingTrending = articles.slice(1, 5);

  return (
    <section id="trending-section" className="py-12 sm:py-16 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Curated Reader Attention</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
              Trending Stories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            The five most discussed, shared, and impactful essays across all ten desks this week.
          </p>
        </div>

        {/* Editorial Layout: Large Highlight Story + Grid of 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Top 1 Trending Story (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onClick={() => onSelectArticle(topTrending)}
              className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100 dark:bg-stone-800">
                {topImgError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950 text-stone-200 p-6 text-center">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">
                      {topTrending.categoryName}
                    </span>
                    <p className="text-sm font-editorial mt-1 line-clamp-2 text-stone-100">
                      {topTrending.title}
                    </p>
                  </div>
                ) : (
                  <img
                    src={topTrending.imageUrl}
                    alt={topTrending.title}
                    onError={() => setTopImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                )}
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded font-mono">
                  #1 TRENDING
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2 block">
                    {topTrending.categoryName}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {topTrending.title}
                  </h3>
                  <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
                    {topTrending.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <div>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{topTrending.author.name}</span>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {topTrending.publishedAt} · {topTrending.readTime}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectArticle(topTrending)}
                    title={`Read complete story: ${topTrending.title}`}
                    aria-label={`Read complete story: ${topTrending.title}`}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>Read in-depth analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining 4 Trending Stories (7 cols) in 2x2 grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {remainingTrending.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                badgeRank={idx + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
