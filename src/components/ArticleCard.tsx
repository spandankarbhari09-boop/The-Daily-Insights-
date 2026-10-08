import React, { useState } from 'react';
import { Clock, ArrowRight, Bookmark, Newspaper } from 'lucide-react';
import { Article } from '../types/blog';
import { useBookmarks } from '../context/BookmarkContext';
import { CATEGORY_FALLBACK_IMAGES } from '../data/categories';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  layout?: 'standard' | 'horizontal' | 'compact';
  badgeRank?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  layout = 'standard',
  badgeRank,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);
  const [triedFallback, setTriedFallback] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const fallbackUrl = CATEGORY_FALLBACK_IMAGES[article.category];
  const activeImageSrc = triedFallback ? fallbackUrl : (article.imageUrl || fallbackUrl);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  const handleImageError = () => {
    if (!triedFallback && fallbackUrl && article.imageUrl !== fallbackUrl) {
      setTriedFallback(true);
    } else {
      setImgFailed(true);
    }
  };

  const renderThumbnail = () => {
    if (imgFailed) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950 text-stone-300 p-6 text-center">
          <Newspaper className="w-8 h-8 text-amber-500 mb-2 opacity-80" />
          <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">
            {article.categoryName}
          </span>
          <p className="text-xs font-editorial mt-1 line-clamp-2 text-stone-200">
            {article.title}
          </p>
        </div>
      );
    }
    return (
      <img
        src={activeImageSrc}
        alt={article.title}
        onError={handleImageError}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  };

  if (layout === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden flex flex-col md:flex-row hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="md:w-5/12 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100 dark:bg-stone-800">
          {renderThumbnail()}
          {badgeRank !== undefined && (
            <div className="absolute top-3 left-3 w-7 h-7 bg-stone-900/90 text-white text-xs font-bold rounded flex items-center justify-center font-mono">
              0{badgeRank}
            </div>
          )}
        </div>

        <div className="md:w-7/12 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                {article.categoryName}
              </span>
              <button
                onClick={handleBookmarkClick}
                className="text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors p-1"
                title={bookmarked ? 'Remove bookmark' : 'Save article'}
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
              </button>
            </div>

            <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="mt-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-700 dark:text-stone-300">{article.author.name}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <span 
              className="text-amber-800 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1"
              title={`Read story: ${article.title}`}
              aria-label={`Read story: ${article.title}`}
            >
              <span>Read in-depth article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'compact') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group py-3.5 border-b border-stone-200 dark:border-stone-800 last:border-0 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
          <span>{article.categoryName}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <h4 className="font-editorial text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <div className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
          <span>{article.author.name}</span>
          <span>{article.publishedAt}</span>
        </div>
      </article>
    );
  }

  // Standard Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden flex flex-col hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
        {renderThumbnail()}
        {badgeRank !== undefined && (
          <div className="absolute top-3 left-3 w-7 h-7 bg-stone-900/90 text-white text-xs font-bold rounded flex items-center justify-center font-mono">
            0{badgeRank}
          </div>
        )}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-3 right-3 p-1.5 bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 rounded-md hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-sm"
          title={bookmarked ? 'Remove bookmark' : 'Save article'}
          aria-label="Bookmark article"
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
            {article.categoryName}
          </div>

          <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <div>
            <div className="font-medium text-stone-800 dark:text-stone-200">{article.author.name}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <button
            onClick={() => onSelect(article)}
            title={`Read complete story: ${article.title}`}
            aria-label={`Read complete story: ${article.title}`}
            className="px-3 py-1 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors flex items-center gap-1"
          >
            <span>Read full story</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
