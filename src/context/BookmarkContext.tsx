import React, { createContext, useContext, useEffect, useState } from 'react';

interface BookmarkContextType {
  bookmarks: string[]; // article IDs
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('daily-pulse-bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('daily-pulse-bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Ignore write errors
    }
  }, [bookmarks]);

  const toggleBookmark = (articleId: string) => {
    setBookmarks((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

  const clearBookmarks = () => setBookmarks([]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
