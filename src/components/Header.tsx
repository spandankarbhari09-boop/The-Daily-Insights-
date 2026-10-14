import React, { useState } from 'react';
import { Search, Bookmark, Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types/blog';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';

interface HeaderProps {
  currentCategory: CategoryId | 'all' | null;
  onSelectCategory: (category: CategoryId | 'all') => void;
  onOpenSearch: () => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateBookmarks: () => void;
  currentView: 'home' | 'category' | 'article' | 'about' | 'bookmarks';
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onNavigateHome,
  onNavigateAbout,
  onNavigateBookmarks,
  currentView,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (catId: CategoryId) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    onNavigateHome();
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    onNavigateAbout();
    setMobileMenuOpen(false);
  };

  const handleBookmarksClick = () => {
    onNavigateBookmarks();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Top Editorial Utility Strip */}
      <div className="border-b border-stone-200/60 dark:border-stone-800/60 text-[11px] font-sans tracking-wide text-stone-500 dark:text-stone-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium text-stone-700 dark:text-stone-300">Monday, October 5, 2026</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden sm:inline">Volume XII, Issue 42</span>
            <span aria-hidden="true" className="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden md:inline">The Global Edition</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleAboutClick}
              className={`hover:text-stone-900 dark:hover:text-stone-100 transition-colors ${
                currentView === 'about' ? 'text-amber-800 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              About The Magazine
            </button>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden sm:inline text-amber-700 dark:text-amber-500 font-medium">
              10 Desks · 50+ In-Depth Stories
            </span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleHomeClick}
            className="text-left group flex flex-col focus:outline-none"
            aria-label="The Daily Pulse Home"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
              THE DAILY PULSE
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap"
          aria-label="Main Navigation"
        >
          <button
            onClick={handleHomeClick}
            className={`transition-colors py-1 ${
              currentView === 'home' && currentCategory === 'all'
                ? 'text-amber-800 dark:text-amber-400 font-bold border-b-2 border-amber-800 dark:border-amber-400'
                : 'hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id && currentView === 'category';
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-amber-800 dark:text-amber-400 font-bold border-b-2 border-amber-800 dark:border-amber-400'
                    : 'hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors"
            title="Search articles (Ctrl+K)"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] text-stone-400 border border-stone-300 dark:border-stone-700 rounded px-1">
              /
            </kbd>
          </button>

          <button
            onClick={handleBookmarksClick}
            className={`relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors ${
              currentView === 'bookmarks' ? 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40' : ''
            }`}
            title="Saved reading list"
            aria-label="View saved bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-md transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Secondary Category Subnav Bar for Desktop (Compact Horizontal Scroll if needed) */}
      <div className="hidden lg:flex xl:hidden border-t border-stone-200/70 dark:border-stone-800/70 overflow-x-auto py-2 px-6 gap-6 text-xs text-stone-600 dark:text-stone-300 no-scrollbar">
        <button
          onClick={handleHomeClick}
          className={`shrink-0 ${currentView === 'home' ? 'text-amber-800 dark:text-amber-400 font-semibold' : ''}`}
        >
          Home
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`shrink-0 hover:text-stone-900 dark:hover:text-white ${
              currentCategory === cat.id && currentView === 'category'
                ? 'text-amber-800 dark:text-amber-400 font-semibold'
                : ''
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 py-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Navigation</span>
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-amber-800 dark:text-amber-400 font-medium flex items-center gap-1"
              >
                <Search className="w-3 h-3" /> Quick Search
              </button>
            </div>

            <button
              onClick={handleHomeClick}
              className={`w-full text-left py-2 px-3 rounded-md text-sm font-medium flex items-center justify-between ${
                currentView === 'home' && currentCategory === 'all'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400'
                  : 'text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
            >
              <span>Front Page (Home)</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <div className="pt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2 px-3">
                Editorial Desks (10 Categories)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-left py-2 px-3 rounded-md text-sm flex items-center justify-between transition-colors ${
                      currentCategory === cat.id && currentView === 'category'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-stone-400">5 stories</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <button
                onClick={handleBookmarksClick}
                className="w-full text-left py-2 px-3 rounded-md text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-stone-400" /> Saved Articles
                </span>
                <span className="text-xs text-stone-400">{bookmarks.length} saved</span>
              </button>

              <button
                onClick={handleAboutClick}
                className="w-full text-left py-2 px-3 rounded-md text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
              >
                About The Daily Pulse
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
