import React from 'react';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';
import { Article } from '../types/blog';
import { ArticleCard } from './ArticleCard';
import { useBookmarks } from '../context/BookmarkContext';

interface BookmarksViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBackToHome: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  articles,
  onSelectArticle,
  onBackToHome,
}) => {
  const { bookmarks, clearBookmarks } = useBookmarks();
  const savedArticles = articles.filter((a) => bookmarks.includes(a.id));

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <button
              onClick={onBackToHome}
              className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Front Page
            </button>
            <div className="flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-700" />
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold">
                Your Reading List ({savedArticles.length})
              </h1>
            </div>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Articles and essays saved for offline reflection and quiet reading.
            </p>
          </div>

          {savedArticles.length > 0 && (
            <button
              onClick={clearBookmarks}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 p-2 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear List</span>
            </button>
          )}
        </div>

        {savedArticles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-8 max-w-md mx-auto">
            <Bookmark className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" />
            <h3 className="font-editorial text-xl font-bold text-stone-800 dark:text-stone-200">
              No stories saved yet
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed">
              Click the bookmark icon on any article card to save stories for later reading.
            </p>
            <button
              onClick={onBackToHome}
              className="mt-6 px-4 py-2 text-xs font-semibold text-white bg-amber-800 rounded hover:bg-amber-900 transition-colors"
            >
              Explore Today&apos;s Stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedArticles.map((article) => (
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
