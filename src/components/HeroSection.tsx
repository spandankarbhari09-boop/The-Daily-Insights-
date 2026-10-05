import React from 'react';
import { ArrowRight, Flame, Clock, Sparkles } from 'lucide-react';
import { Article } from '../types/blog';

interface HeroSectionProps {
  leadArticle: Article;
  onSelectArticle: (article: Article) => void;
  onExploreClick: () => void;
  onTrendingClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadArticle,
  onSelectArticle,
  onExploreClick,
  onTrendingClick,
}) => {
  return (
    <section className="border-b border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/20 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Top Headline Banner */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Magazine &amp; Daily Journal</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.1] text-balance">
            Stories That Keep You Curious
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans-clean leading-relaxed text-balance max-w-2xl">
            Explore the latest ideas, trends, stories and insights across sports, technology, entertainment, travel, business, lifestyle and more.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-2"
            >
              <span>Explore Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTrendingClick}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Trending Now</span>
            </button>
          </div>
        </div>

        {/* Lead Story Feature Card (Editorial Broadsheet Style) */}
        <div className="bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Zone (7 cols on desktop) */}
            <div
              className="lg:col-span-7 relative group cursor-pointer overflow-hidden min-h-[300px] sm:min-h-[420px] bg-stone-200 dark:bg-stone-800"
              onClick={() => onSelectArticle(leadArticle)}
            >
              <img
                src={leadArticle.imageUrl}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-3 left-4 right-4 lg:hidden text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                  {leadArticle.categoryName}
                </span>
                <p className="text-sm font-medium line-clamp-2 mt-1">{leadArticle.title}</p>
              </div>
            </div>

            {/* Content Zone (5 cols on desktop) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3">
                  <span>Cover Story</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.categoryName}</span>
                </div>

                <h2
                  onClick={() => onSelectArticle(leadArticle)}
                  className="font-editorial text-2xl sm:text-3xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer leading-snug"
                >
                  {leadArticle.title}
                </h2>

                <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {leadArticle.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 border-l-2 border-amber-600 pl-3 italic">
                  &ldquo;{leadArticle.excerpt}&rdquo;
                </p>
              </div>

              {/* Author and Read More Action */}
              <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={leadArticle.author.avatar}
                    alt={leadArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {leadArticle.author.name}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <span>{leadArticle.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {leadArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectArticle(leadArticle)}
                  className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 flex items-center gap-1 group whitespace-nowrap"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
