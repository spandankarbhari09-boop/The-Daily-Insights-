import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  MessageSquare,
  ThumbsUp,
  Send,
  User,
} from 'lucide-react';
import { Article, CategoryId, Comment } from '../types/blog';
import { getRelatedArticles } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { useBookmarks } from '../context/BookmarkContext';

interface ArticleViewProps {
  article: Article;
  onBackToHome: () => void;
  onBackToCategory: (categoryId: CategoryId) => void;
  onSelectArticle: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBackToHome,
  onBackToCategory,
  onSelectArticle,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);
  const related = getRelatedArticles(article, 3);

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      articleId: article.id,
      authorName: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      date: '2 hours ago',
      content:
        'This is one of the most lucid, well-reasoned pieces I have read on this topic all month. The section detailing tactical/strategic shifts resonates deeply with what we are observing globally.',
      likes: 14,
    },
    {
      id: 'c2',
      articleId: article.id,
      authorName: 'Marcus Lind',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      date: 'Yesterday',
      content:
        'The nuance in acknowledging foundational physics and economic reality rather than just repeating marketing hype makes The Daily Pulse an essential daily read.',
      likes: 8,
    },
  ]);

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [likedComments, setLikedComments] = useState<string[]>([]);

  // Reading progress tracker
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via The Daily Pulse`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      articleId: article.id,
      authorName: newCommentName.trim() || 'Reader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
      setComments(
        comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes - 1 } : c))
      );
    } else {
      setLikedComments([...likedComments, commentId]);
      setComments(
        comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 dark:bg-stone-800 z-50">
        <div
          className="h-full bg-amber-700 dark:bg-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Header & Navigation Ribbon */}
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBackToCategory(article.category)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {article.categoryName}</span>
            </button>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <button
              onClick={onBackToHome}
              className="text-xs sm:text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            >
              Home
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-800 dark:text-amber-400'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Copy article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Category & Date Metadata */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3">
          <button
            onClick={() => onBackToCategory(article.category)}
            className="hover:underline"
          >
            {article.categoryName}
          </button>
          <span aria-hidden="true">·</span>
          <span>Editorial Essay</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Article Headline */}
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.15] text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="mt-4 text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-sans-clean leading-relaxed text-balance">
          {article.subtitle}
        </p>

        {/* Author Byline Bar */}
        <div className="mt-8 pt-6 pb-6 border-y border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {article.author.name}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {article.author.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Large Featured Image */}
        <div className="my-8 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
          />
          {article.imageCaption && (
            <div className="p-3 text-xs text-stone-500 dark:text-stone-400 italic bg-stone-100/60 dark:bg-stone-900/60 border-t border-stone-200/60 dark:border-stone-800/60">
              {article.imageCaption}
            </div>
          )}
        </div>

        {/* Key Takeaways Callout Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="my-8 p-6 bg-stone-100/70 dark:bg-stone-900/60 border-l-4 border-amber-700 dark:border-amber-500 rounded-r-lg">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3">
              Essential Takeaways
            </div>
            <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-700 dark:text-amber-400 font-bold shrink-0">―</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lead Excerpt Drop Cap Paragraph */}
        <div className="my-6">
          <p className="text-lg sm:text-xl text-stone-700 dark:text-stone-200 font-editorial leading-relaxed first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-800 dark:first-letter:text-amber-400">
            {article.excerpt}
          </p>
        </div>

        {/* Structured Sections */}
        <div className="space-y-10 my-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-4">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-[1.8] font-sans-clean"
                >
                  {para}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 py-4 px-6 border-l-2 border-stone-400 dark:border-stone-600 bg-stone-100/50 dark:bg-stone-900/40 italic font-editorial text-xl sm:text-2xl text-stone-800 dark:text-stone-200 leading-snug">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              )}

              {section.keyPoints && section.keyPoints.length > 0 && (
                <ul className="my-4 space-y-2 pl-4 border-l border-stone-200 dark:border-stone-700 text-sm sm:text-base text-stone-600 dark:text-stone-300">
                  {section.keyPoints.map((pt, ptIdx) => (
                    <li key={ptIdx} className="leading-relaxed">
                      • {pt}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-500 uppercase tracking-wider mr-2">Topics:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Sharing & Action Bar */}
        <div className="mt-8 p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-700" />
            <span>Share this story with colleagues &amp; friends:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
              title="Share on X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareFacebook}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-blue-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareLinkedin}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-blue-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-10 p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover shrink-0 border border-stone-200 dark:border-stone-700"
          />
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
              Written by
            </div>
            <div className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              {article.author.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {article.author.role}
            </div>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Back to Category Button */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => onBackToCategory(article.category)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All {article.categoryName} Stories</span>
          </button>
          <button
            onClick={onBackToHome}
            className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Back to Front Page →
          </button>
        </div>

        {/* Comments Section */}
        <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Community Dialogue</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
            Comments &amp; Reflections ({comments.length})
          </h2>

          {/* New Comment Form */}
          <form onSubmit={handleAddComment} className="mt-6 p-4 sm:p-6 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-3">
              Join the Conversation
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="Your name or handle (optional)"
                className="w-full text-xs sm:text-sm px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:border-amber-700"
              />
              <textarea
                required
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="What are your thoughts on this essay?"
                className="w-full text-xs sm:text-sm px-3 py-2 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:border-amber-700"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 dark:bg-amber-600 hover:bg-amber-900 rounded transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="mt-6 space-y-4">
            {comments.map((comm) => {
              const hasLiked = likedComments.includes(comm.id);
              return (
                <div
                  key={comm.id}
                  className="p-4 sm:p-5 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-bold">
                        <User className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                        {comm.authorName}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400">{comm.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {comm.content}
                  </p>

                  <div className="mt-3 flex items-center justify-end">
                    <button
                      onClick={() => handleLikeComment(comm.id)}
                      className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded transition-colors ${
                        hasLiked
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 font-semibold'
                          : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-amber-600' : ''}`} />
                      <span>{comm.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Further Reading
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50">
                  More from {article.categoryName}
                </h2>
              </div>
              <button
                onClick={() => onBackToCategory(article.category)}
                className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-400 hover:underline"
              >
                View all stories →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
