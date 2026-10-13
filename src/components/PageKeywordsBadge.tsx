import React from 'react';
import { KeyRound, Sparkles, Tag, Search } from 'lucide-react';
import { PageKeywords } from '../types/blog';

interface PageKeywordsBadgeProps {
  keywords: PageKeywords;
  title?: string;
  variant?: 'banner' | 'inline' | 'card' | 'compact';
  className?: string;
  onKeywordClick?: (keyword: string) => void;
}

export const PageKeywordsBadge: React.FC<PageKeywordsBadgeProps> = ({
  keywords,
  title = 'Page Focus Keywords',
  variant = 'banner',
  className = '',
  onKeywordClick,
}) => {
  const { mainKeyword, relatedKeywords } = keywords;

  const handleKeyClick = (kw: string) => {
    if (onKeywordClick) {
      onKeywordClick(kw);
    }
  };

  if (variant === 'compact') {
    return (
      <div
        role="region"
        aria-label="Page Keywords"
        className={`inline-flex flex-wrap items-center gap-2 text-xs ${className}`}
      >
        <span className="inline-flex items-center gap-1 font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-[11px]">
          <KeyRound className="w-3 h-3 text-amber-700 dark:text-amber-400" />
          <span>Keywords:</span>
        </span>

        {/* Main Keyword */}
        <button
          type="button"
          onClick={() => handleKeyClick(mainKeyword)}
          title={`Main Keyword: ${mainKeyword} (click to search)`}
          aria-label={`Main Keyword: ${mainKeyword}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 hover:bg-amber-200 dark:hover:bg-amber-900/80 transition-colors shadow-2xs"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
          <span>{mainKeyword}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-75 font-normal ml-0.5">
            (Main)
          </span>
        </button>

        {/* Related Keywords */}
        {relatedKeywords.map((rk, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleKeyClick(rk)}
            title={`Related Keyword: ${rk} (click to search)`}
            aria-label={`Related Keyword: ${rk}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <Tag className="w-2.5 h-2.5 text-stone-400" />
            <span>{rk}</span>
            <span className="text-[9px] uppercase tracking-wider opacity-60 ml-0.5">
              (Related)
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        role="region"
        aria-label="Article Keywords"
        className={`p-3 sm:p-4 rounded-lg bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800/90 text-xs ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 font-medium">
            <KeyRound className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
            <span className="uppercase tracking-wider font-semibold text-[11px] text-stone-700 dark:text-stone-300">
              {title}:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Main Keyword */}
            <button
              type="button"
              onClick={() => handleKeyClick(mainKeyword)}
              title={`Main Keyword: ${mainKeyword}`}
              aria-label={`Main Keyword: ${mainKeyword}`}
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-800 text-amber-50 dark:bg-amber-500/20 dark:text-amber-300 dark:border dark:border-amber-500/40 hover:bg-amber-900 dark:hover:bg-amber-500/30 transition-all shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-300 dark:text-amber-400" />
              <span>{mainKeyword}</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1 py-0.2 bg-amber-950/40 dark:bg-amber-400/20 rounded">
                Main
              </span>
            </button>

            <span className="text-stone-300 dark:text-stone-700 hidden sm:inline">|</span>

            {/* Related Keywords */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
                Related:
              </span>
              {relatedKeywords.map((rk, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleKeyClick(rk)}
                  title={`Related Keyword: ${rk}`}
                  aria-label={`Related Keyword: ${rk}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500/60 hover:text-amber-800 dark:hover:text-amber-400 transition-colors shadow-2xs"
                >
                  <Tag className="w-3 h-3 text-stone-400 group-hover:text-amber-600" />
                  <span>{rk}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        role="region"
        aria-label="Editorial Keyword Index"
        className={`p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-50/50 to-stone-50 dark:from-stone-900 dark:to-stone-900/80 border border-amber-200/70 dark:border-stone-800 ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-200/50 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-amber-800 dark:bg-amber-500/20 text-white dark:text-amber-300">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {title}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                1 Main Keyword &amp; 2 Curated Related Keywords
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
            SEO Index
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Main Keyword Box */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white dark:bg-stone-800/90 border border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-800 text-white dark:bg-amber-400 dark:text-stone-950">
                Main Keyword
              </span>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                {mainKeyword}
              </span>
            </div>
            {onKeywordClick && (
              <button
                type="button"
                onClick={() => handleKeyClick(mainKeyword)}
                title={`Search "${mainKeyword}"`}
                aria-label={`Search ${mainKeyword}`}
                className="text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 p-1 rounded"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Related Keywords List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedKeywords.map((rk, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Related {idx + 1}:
                  </span>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate">
                    {rk}
                  </span>
                </div>
                {onKeywordClick && (
                  <button
                    type="button"
                    onClick={() => handleKeyClick(rk)}
                    title={`Search "${rk}"`}
                    aria-label={`Search ${rk}`}
                    className="text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 p-0.5 rounded"
                  >
                    <Search className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: 'banner'
  return (
    <div
      role="region"
      aria-label="Editorial Focus Keywords"
      className={`p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 via-stone-50 to-stone-100 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-950 border border-amber-200/80 dark:border-stone-800 shadow-2xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left header & label */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-800 text-white dark:bg-amber-500/20 dark:text-amber-300">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
                {title}
              </span>
              <span className="text-[10px] text-stone-400 dark:text-stone-500">
                · Index Metadata
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              1 Primary Topic Keyword &amp; 2 Semantic Related Keywords
            </p>
          </div>
        </div>

        {/* Right keyword badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Keyword */}
          <button
            type="button"
            onClick={() => handleKeyClick(mainKeyword)}
            title={`Main Keyword: ${mainKeyword} (click to search)`}
            aria-label={`Main Keyword: ${mainKeyword}`}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs bg-amber-800 text-amber-50 dark:bg-amber-400 dark:text-stone-950 hover:bg-amber-900 dark:hover:bg-amber-300 transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-300 dark:text-amber-950" />
            <span>{mainKeyword}</span>
            <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-amber-950/40 dark:bg-amber-950/15">
              Main Keyword
            </span>
          </button>

          {/* Related Keywords */}
          {relatedKeywords.map((rk, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleKeyClick(rk)}
              title={`Related Keyword: ${rk} (click to search)`}
              aria-label={`Related Keyword ${idx + 1}: ${rk}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-900 dark:hover:text-amber-300 transition-all shadow-2xs"
            >
              <Tag className="w-3 h-3 text-stone-400" />
              <span>{rk}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Related {idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
