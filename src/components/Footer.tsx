import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types/blog';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onSelectCategory,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Newsletter Strip */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-2">
            The Morning Dispatch
          </div>
          <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Subscribe to The Daily Pulse
          </h3>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-sans-clean leading-relaxed">
            Get our latest stories and trending topics delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-800"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded">
              <Check className="w-3.5 h-3.5" />
              <span>Welcome to The Daily Pulse readership. Dispatch confirmed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Links & Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-left font-editorial text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 hover:text-amber-800 transition-colors"
            >
              THE DAILY PULSE
            </button>

            <p className="text-sm font-editorial italic text-stone-600 dark:text-stone-400">
              Stories, Ideas &amp; Insights for Every Interest.
            </p>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              An independent digital broadsheet delivering long-form essays, reporting, and cultural criticism across ten distinct human disciplines.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3 text-stone-600 dark:text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-stone-900 dark:hover:text-white rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-stone-900 dark:hover:text-white rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-stone-900 dark:hover:text-white rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-stone-900 dark:hover:text-white rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Publication Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={onNavigateHome} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={onNavigateAbout} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                  About The Daily Pulse
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                  Contact Newsroom
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* 10 Desks / Categories (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              The 10 Editorial Desks
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone-600 dark:text-stone-400">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="text-left hover:text-amber-800 dark:hover:text-amber-400 transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} The Daily Pulse. All rights reserved. Published for curious minds worldwide.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:underline">Privacy</button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenTerms} className="hover:underline">Terms</button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenContact} className="hover:underline">Corrections</button>
            <span aria-hidden="true">·</span>
            <span>ISSN 2984-1029</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
