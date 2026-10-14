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
import { SEOHead } from './components/SEOHead';
import {
  ARTICLES,
  getFeaturedArticle,
  getTrendingArticles,
  getArticleBySlug,
} from './data/articles';
import { CATEGORIES, getCategoryById } from './data/categories';
import { getPageKeywords } from './data/keywords';
import { Article, CategoryId } from './types/blog';

const VALID_CATEGORIES: CategoryId[] = [
  'sports',
  'technology',
  'entertainment',
  'travel',
  'business',
  'health',
  'education',
  'automobiles',
  'food',
  'ai',
];

function getInitialRouteState(): {
  view: 'home' | 'category' | 'article' | 'about' | 'bookmarks';
  categoryId: CategoryId | 'all';
  article: Article;
} {
  const defaultArticle = getFeaturedArticle();
  if (typeof window === 'undefined') {
    return { view: 'home', categoryId: 'all', article: defaultArticle };
  }

  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  const rawPath = window.location.pathname.replace(/^\/+/, '').trim();
  const route = rawHash || rawPath;

  if (!route) {
    return { view: 'home', categoryId: 'all', article: defaultArticle };
  }

  if (route === 'about') {
    return { view: 'about', categoryId: 'all', article: defaultArticle };
  }

  if (route === 'bookmarks') {
    return { view: 'bookmarks', categoryId: 'all', article: defaultArticle };
  }

  if (route.startsWith('category/')) {
    const catId = route.replace('category/', '') as CategoryId;
    return { view: 'category', categoryId: catId, article: defaultArticle };
  }

  if (VALID_CATEGORIES.includes(route as CategoryId)) {
    return { view: 'category', categoryId: route as CategoryId, article: defaultArticle };
  }

  const articleQuery = route.startsWith('article/') ? route.replace('article/', '') : route;
  const found = getArticleBySlug(articleQuery);
  if (found) {
    return { view: 'article', categoryId: found.category as CategoryId, article: found };
  }

  return { view: 'home', categoryId: 'all', article: defaultArticle };
}

export default function App() {
  const [initialRoute] = useState(() => getInitialRouteState());
  const [currentView, setCurrentView] = useState<
    'home' | 'category' | 'article' | 'about' | 'bookmarks'
  >(initialRoute.view);
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>(initialRoute.categoryId);
  const [selectedArticle, setSelectedArticle] = useState<Article>(initialRoute.article);

  // Home category quick filter
  const [homeCategoryFilter, setHomeCategoryFilter] = useState<CategoryId | 'all'>('all');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleOpenSearchKeyword = (keyword: string) => {
    setSearchInitialQuery(keyword);
    setIsSearchOpen(true);
  };

  const featuredArticle = getFeaturedArticle();
  const trendingArticles = getTrendingArticles();

  // Clean URL and Hash-based routing synchronization
  useEffect(() => {
    const handleRouteChange = () => {
      // 1. Check hash first if present (e.g. #technology/ai-trends, #article/ai-trends)
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      // 2. Check pathname (e.g. /technology/ai-trends, /technology, /about)
      const rawPath = window.location.pathname.replace(/^\/+/, '').trim();

      const route = rawHash || rawPath;

      if (!route) {
        setCurrentView('home');
        return;
      }

      if (route === 'about') {
        setCurrentView('about');
        if (rawHash) {
          try {
            window.history.replaceState({ view: 'about' }, '', '/about');
          } catch {
            // keep hash
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (route === 'bookmarks') {
        setCurrentView('bookmarks');
        if (rawHash) {
          try {
            window.history.replaceState({ view: 'bookmarks' }, '', '/bookmarks');
          } catch {
            // keep hash
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (route.startsWith('category/')) {
        const catId = route.replace('category/', '') as CategoryId;
        setSelectedCategoryId(catId);
        setCurrentView('category');
        if (rawHash) {
          try {
            window.history.replaceState({ view: 'category', categoryId: catId }, '', `/category/${catId}`);
          } catch {
            // keep hash
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Direct category path e.g. "technology"
      if (VALID_CATEGORIES.includes(route as CategoryId)) {
        setSelectedCategoryId(route as CategoryId);
        setCurrentView('category');
        if (rawHash) {
          try {
            window.history.replaceState({ view: 'category', categoryId: route }, '', `/category/${route}`);
          } catch {
            // keep hash
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Article route (e.g. "technology/ai-trends", "article/ai-trends", "ai-trends")
      const articleQuery = route.startsWith('article/') ? route.replace('article/', '') : route;
      const found = getArticleBySlug(articleQuery);
      if (found) {
        setSelectedArticle(found);
        setCurrentView('article');
        // If accessed via hash or legacy prefix, cleanly update browser address bar
        if (rawHash || route.startsWith('article/')) {
          try {
            window.history.replaceState(
              { view: 'article', slug: found.slug, category: found.category },
              '',
              `/${found.category}/${found.slug}`
            );
          } catch {
            // keep hash
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Navigation handlers with clean URL updating
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
    const targetPath = `/${article.category}/${article.slug}`;
    try {
      window.history.pushState({ view: 'article', slug: article.slug, category: article.category }, '', targetPath);
    } catch {
      window.location.hash = `${article.category}/${article.slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: CategoryId | 'all') => {
    if (categoryId === 'all') {
      setCurrentView('home');
      setSelectedCategoryId('all');
      try {
        window.history.pushState({ view: 'home' }, '', '/');
      } catch {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedCategoryId(categoryId);
      setCurrentView('category');
      try {
        window.history.pushState({ view: 'category', categoryId }, '', `/category/${categoryId}`);
      } catch {
        window.location.hash = `category/${categoryId}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategoryId('all');
    setHomeCategoryFilter('all');
    try {
      window.history.pushState({ view: 'home' }, '', '/');
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    try {
      window.history.pushState({ view: 'about' }, '', '/about');
    } catch {
      window.location.hash = 'about';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBookmarks = () => {
    setCurrentView('bookmarks');
    try {
      window.history.pushState({ view: 'bookmarks' }, '', '/bookmarks');
    } catch {
      window.location.hash = 'bookmarks';
    }
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

  // Synchronize SEO & Keywords metadata for every page
  const getPageSEO = () => {
    switch (currentView) {
      case 'home':
        return {
          title: 'The Daily Insights | Tech, Business, Lifestyle, AI & More',
          description:
            'Discover the latest insights, trends, and expert analysis across technology, business, lifestyle, artificial intelligence, and more from The Daily Insights.',
          keywords: getPageKeywords('home'),
          canonicalPath: '/',
        };
      case 'category': {
        const catId = selectedCategoryId === 'all' ? 'sports' : selectedCategoryId;
        const cat = getCategoryById(catId);
        const kws = getPageKeywords('category', { categoryId: catId });
        return {
          title: `${cat.name} – ${kws.mainKeyword} | The Daily Insights`,
          description: `${cat.tagline}. ${cat.description}`,
          keywords: kws,
          canonicalPath: `/category/${catId}`,
        };
      }
      case 'article': {
        const kws = getPageKeywords('article', { article: selectedArticle });
        return {
          title: `${selectedArticle.title} | The Daily Insights`,
          description: selectedArticle.excerpt || selectedArticle.subtitle,
          keywords: kws,
          article: selectedArticle,
          canonicalPath: `/${selectedArticle.category}/${selectedArticle.slug}`,
        };
      }
      case 'about': {
        const kws = getPageKeywords('about');
        return {
          title: 'About | The Daily Insights - Tech, Business & Lifestyle',
          description:
            'The Daily Insights delivers deep perspectives, thoughtful analysis, and trend reporting on technology, business, culture, and modern lifestyle.',
          keywords: kws,
          canonicalPath: '/about',
        };
      }
      case 'bookmarks': {
        const kws = getPageKeywords('bookmarks');
        return {
          title: 'Saved Reading List | The Daily Insights',
          description: 'Articles and essays saved for offline reflection and quiet reading on The Daily Insights.',
          keywords: kws,
          canonicalPath: '/bookmarks',
        };
      }
      default:
        return {
          title: 'The Daily Insights | Tech, Business, Lifestyle, AI & More',
          description:
            'Discover the latest insights, trends, and expert analysis across technology, business, lifestyle, artificial intelligence, and more from The Daily Insights.',
          keywords: getPageKeywords('home'),
          canonicalPath: '/',
        };
    }
  };

  const seo = getPageSEO();

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
          {/* Synchronize SEO Head & Dynamic Meta Keywords */}
          <SEOHead
            title={seo.title}
            description={seo.description}
            keywords={seo.keywords}
            article={seo.article}
            canonicalPath={seo.canonicalPath}
          />

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
                  onOpenSearchKeyword={handleOpenSearchKeyword}
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
                onOpenSearchKeyword={handleOpenSearchKeyword}
              />
            )}

            {currentView === 'article' && (
              <ArticleView
                article={selectedArticle}
                onBackToHome={handleNavigateHome}
                onBackToCategory={handleSelectCategory}
                onSelectArticle={handleSelectArticle}
                onOpenSearchKeyword={handleOpenSearchKeyword}
              />
            )}

            {currentView === 'about' && (
              <AboutView
                onBackToHome={handleNavigateHome}
                onSelectCategory={handleSelectCategory}
                onOpenSearchKeyword={handleOpenSearchKeyword}
              />
            )}

            {currentView === 'bookmarks' && (
              <BookmarksView
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
                onBackToHome={handleNavigateHome}
                onOpenSearchKeyword={handleOpenSearchKeyword}
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
            onClose={() => {
              setIsSearchOpen(false);
              setSearchInitialQuery('');
            }}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            initialQuery={searchInitialQuery}
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
