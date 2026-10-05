/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrendingSection } from './components/TrendingSection';
import { CategoryFeed } from './components/CategoryFeed';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { AboutView } from './components/AboutView';
import { BookmarksView } from './components/BookmarksView';
import { SearchModal } from './components/SearchModal';
import { ContactModal, PrivacyModal, TermsModal } from './components/Modals';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import {
  ARTICLES,
  getFeaturedArticle,
  getTrendingArticles,
  getArticleBySlug,
} from './data/articles';
import { CATEGORIES } from './data/categories';
import { Article, CategoryId } from './types/blog';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'category' | 'article' | 'about' | 'bookmarks'
  >('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article>(getFeaturedArticle());

  // Home category quick filter
  const [homeCategoryFilter, setHomeCategoryFilter] = useState<CategoryId | 'all'>('all');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const featuredArticle = getFeaturedArticle();
  const trendingArticles = getTrendingArticles();

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentView('home');
        return;
      }

      if (hash === 'about') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === 'bookmarks') {
        setCurrentView('bookmarks');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('category/')) {
        const catId = hash.replace('category/', '') as CategoryId;
        setSelectedCategoryId(catId);
        setCurrentView('category');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        const found = getArticleBySlug(slug);
        if (found) {
          setSelectedArticle(found);
          setCurrentView('article');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handlers
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.location.hash = `article/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: CategoryId | 'all') => {
    if (categoryId === 'all') {
      setCurrentView('home');
      setSelectedCategoryId('all');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedCategoryId(categoryId);
      setCurrentView('category');
      window.location.hash = `category/${categoryId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategoryId('all');
    setHomeCategoryFilter('all');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    window.location.hash = 'about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBookmarks = () => {
    setCurrentView('bookmarks');
    window.location.hash = 'bookmarks';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('editorial-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrendingClick = () => {
    const el = document.getElementById('trending-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
          {/* Universal Header */}
          <Header
            currentCategory={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleNavigateAbout}
            onNavigateBookmarks={handleNavigateBookmarks}
            currentView={currentView}
          />

          {/* Main Content Router */}
          <main className="flex-1">
            {currentView === 'home' && (
              <>
                {/* Hero Section */}
                <HeroSection
                  leadArticle={featuredArticle}
                  onSelectArticle={handleSelectArticle}
                  onExploreClick={handleExploreClick}
                  onTrendingClick={handleTrendingClick}
                />

                {/* Trending Stories Section */}
                <TrendingSection
                  articles={trendingArticles}
                  onSelectArticle={handleSelectArticle}
                />

                {/* Filter System & Explorer Anchor */}
                <div id="editorial-explorer" className="pt-10 bg-white dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                          Comprehensive Coverage
                        </span>
                        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                          Explore By Category
                        </h2>
                      </div>

                      {/* Interactive Filter Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <button
                          onClick={() => setHomeCategoryFilter('all')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                            homeCategoryFilter === 'all'
                              ? 'bg-amber-800 text-white shadow-sm'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                          }`}
                        >
                          All (10 Desks)
                        </button>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setHomeCategoryFilter(cat.id);
                              const target = document.getElementById(`category-section-${cat.id}`);
                              if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                              homeCategoryFilter === cat.id
                                ? 'bg-amber-800 text-white shadow-sm'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Feed (All 10 Categories with 3 articles each + View All button) */}
                <CategoryFeed
                  articles={ARTICLES}
                  onSelectArticle={handleSelectArticle}
                  onViewCategory={handleSelectCategory}
                />
              </>
            )}

            {currentView === 'category' && (
              <CategoryView
                categoryId={selectedCategoryId === 'all' ? 'sports' : selectedCategoryId}
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onBackToHome={handleNavigateHome}
              />
            )}

            {currentView === 'article' && (
              <ArticleView
                article={selectedArticle}
                onBackToHome={handleNavigateHome}
                onBackToCategory={handleSelectCategory}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {currentView === 'about' && (
              <AboutView
                onBackToHome={handleNavigateHome}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {currentView === 'bookmarks' && (
              <BookmarksView
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onBackToHome={handleNavigateHome}
              />
            )}
          </main>

          {/* Universal Footer */}
          <Footer
            onNavigateHome={handleNavigateHome}
            onNavigateAbout={handleNavigateAbout}
            onSelectCategory={handleSelectCategory}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
          />

          {/* Floating Back to Top Control */}
          <BackToTop />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
          />

          {/* Working Dialog Modals */}
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
          <PrivacyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
          <TermsModal
            isOpen={isTermsOpen}
            onClose={() => setIsTermsOpen(false)}
          />
        </div>
      </BookmarkProvider>
    </ThemeProvider>
  );
}
