import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, Globe2, Award } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import heroImg from '../assets/images/hero_magazine_lead_1791168984880.jpg';

interface AboutViewProps {
  onBackToHome: () => void;
  onSelectCategory: (categoryId: any) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBackToHome, onSelectCategory }) => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <button
          onClick={onBackToHome}
          className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors flex items-center gap-1.5 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Front Page
        </button>

        {/* Masthead Header */}
        <div className="text-center pb-10 border-b border-stone-200 dark:border-stone-800">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-3">
            Institutional Masthead &amp; Mission
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            About The Daily Pulse
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-editorial italic text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            &ldquo;Stories, Ideas &amp; Insights for Every Interest.&rdquo;
          </p>
        </div>

        {/* Hero Image */}
        <div className="my-10 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
          <img
            src={heroImg}
            alt="The Daily Pulse Editorial Room"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="p-3 text-xs text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 italic text-center">
            Dedicated journalism crafted with curatorial rigor, verified reporting, and independent analysis.
          </div>
        </div>

        {/* Mission Statement (Direct user brief requirement) */}
        <section className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-base sm:text-lg leading-relaxed font-sans-clean">
          <p className="font-editorial text-2xl sm:text-3xl text-stone-800 dark:text-stone-100 leading-snug">
            <strong>The Daily Pulse</strong> is a multi-topic digital magazine covering the stories, ideas, trends and conversations shaping modern life.
          </p>

          <p>
            Our goal is to make interesting and useful information accessible through engaging articles across sports, technology, entertainment, travel, business, health, education, automobiles, food and artificial intelligence.
          </p>

          <p>
            In an era inundated with ephemeral viral snippets, sensory overload, and algorithmic outrage, The Daily Pulse honors the enduring tradition of deep, contemplative magazine journalism. We believe curiosity is not a singular trait confined to a single hobby, but a boundless human instinct that spans from the physics of an electric supercar to the fermentation chemistry of artisanal bread.
          </p>
        </section>

        {/* The 4 Editorial Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <BookOpen className="w-6 h-6 text-amber-800 dark:text-amber-400 mb-3" />
            <h3 className="font-editorial text-xl font-bold mb-2">Depth Over Sensationalism</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We reject clickbait headlines and breathless panic. Every story must provide lasting intellectual value that remains insightful months after publication.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <ShieldCheck className="w-6 h-6 text-amber-800 dark:text-amber-400 mb-3" />
            <h3 className="font-editorial text-xl font-bold mb-2">Rigorous Fact-Checking</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              From macroeconomic metrics to health science literature, our claims are vetted against primary sources, peer-reviewed data, and domain specialists.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <Globe2 className="w-6 h-6 text-amber-800 dark:text-amber-400 mb-3" />
            <h3 className="font-editorial text-xl font-bold mb-2">Global Perspective</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Curiosity has no national boundary. We report on cultural transformations, athletic breakthroughs, and technological leaps from Tokyo and Nairobi to Berlin and Buenos Aires.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <Award className="w-6 h-6 text-amber-800 dark:text-amber-400 mb-3" />
            <h3 className="font-editorial text-xl font-bold mb-2">Craftsmanship in Writing</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We write in clean, engaging, beautifully phrased English. Technical concepts are clarified through vivid analogies without condescending to the reader.
            </p>
          </div>
        </div>

        {/* The 10 Editorial Desks */}
        <section className="my-14 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-2">
            The 10 Editorial Desks
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold mb-6">
            Dedicated Coverage Across Every Domain
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-amber-700 cursor-pointer transition-colors flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400 pt-0.5">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-editorial font-bold text-stone-900 dark:text-stone-100">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Masthead Team */}
        <section className="my-14 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-2">
            Editorial Leadership
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold mb-6">
            The Masthead
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Julian Vance"
                className="w-16 h-16 rounded-full mx-auto object-cover mb-3"
              />
              <div className="font-bold text-sm">Julian Vance</div>
              <div className="text-xs text-stone-500">Editor-in-Chief</div>
            </div>

            <div className="text-center p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                alt="Elena Rostova"
                className="w-16 h-16 rounded-full mx-auto object-cover mb-3"
              />
              <div className="font-bold text-sm">Elena Rostova</div>
              <div className="text-xs text-stone-500">Managing Editor, Technology</div>
            </div>

            <div className="text-center p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Prof. Liam Thorne"
                className="w-16 h-16 rounded-full mx-auto object-cover mb-3"
              />
              <div className="font-bold text-sm">Prof. Liam Thorne</div>
              <div className="text-xs text-stone-500">Senior Editor, Culture &amp; Thought</div>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onBackToHome}
            className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded transition-colors"
          >
            Return to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
