import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Tag, User } from 'lucide-react';
import { Article, CategoryId } from '../types/blog';
import { CATEGORIES } from '../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedCategory('all');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter articles based on query and category
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;

    if (!query.trim()) {
      return matchesCategory;
    }

    const q = query.toLowerCase().trim();
    const matchesTitle = article.title.toLowerCase().includes(q);
    const matchesCategoryName = article.categoryName.toLowerCase().includes(q);
    const matchesAuthor = article.author.name.toLowerCase().includes(q);
    const matchesExcerpt = article.excerpt.toLowerCase().includes(q);
    const matchesTags = article.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && (matchesTitle || matchesCategoryName || matchesAuthor || matchesExcerpt || matchesTags);
  });

  const handleSelect = (article: Article) => {
    onSelectArticle(article);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by article title, category, author, or keyword..."
            className="flex-1 bg-transparent text-base sm:text-lg text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded hover:bg-stone-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mr-1 shrink-0">
            Desk:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-800 text-white font-medium'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            All Desks
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white font-medium'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 dark:divide-stone-800">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Found
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm">No stories match &ldquo;{query}&rdquo; in this filter.</p>
              <p className="text-xs mt-1 text-stone-400">
                Try searching for broader keywords like &quot;football&quot;, &quot;battery&quot;, &quot;sleep&quot;, or &quot;cinema&quot;.
              </p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelect(article)}
                className="py-3.5 group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 px-2 rounded-lg transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
                    <span>{article.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-stone-400">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h4 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {article.title}
                  </h4>

                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author.name}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 text-stone-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
