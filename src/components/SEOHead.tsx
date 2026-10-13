import React, { useEffect } from 'react';
import { PageKeywords, Article } from '../types/blog';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: PageKeywords;
  canonicalPath?: string;
  article?: Article;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  article,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to safely set or create a meta tag by name or property
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 2. Set primary meta description
    setMetaTag('name', 'description', description);

    // 3. Set keywords: 1 Main Keyword + 2 Related Keywords
    const keywordsString = `${keywords.mainKeyword}, ${keywords.relatedKeywords[0]}, ${keywords.relatedKeywords[1]}`;
    setMetaTag('name', 'keywords', keywordsString);
    setMetaTag('name', 'news_keywords', keywordsString);

    // 4. Set OpenGraph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', article ? 'article' : 'website');

    if (article) {
      setMetaTag('property', 'article:published_time', article.publishedAt);
      setMetaTag('property', 'article:author', article.author.name);
      setMetaTag('property', 'article:section', article.categoryName);
      setMetaTag('property', 'article:tag', keywords.mainKeyword);
    }

    // 5. Twitter card meta
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 6. Schema.org JSON-LD Structured Data
    const jsonLdId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdData = article
      ? {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt || description,
          image: [article.imageUrl],
          datePublished: article.publishedAt,
          author: [
            {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
            },
          ],
          publisher: {
            '@type': 'Organization',
            name: 'The Daily Insights',
            url: window.location.origin,
          },
          keywords: [keywords.mainKeyword, ...keywords.relatedKeywords],
          about: [
            {
              '@type': 'Thing',
              name: keywords.mainKeyword,
            },
            ...keywords.relatedKeywords.map((rk) => ({
              '@type': 'Thing',
              name: rk,
            })),
          ],
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: description,
          url: window.location.href,
          publisher: {
            '@type': 'Organization',
            name: 'The Daily Insights',
          },
          keywords: [keywords.mainKeyword, ...keywords.relatedKeywords],
          about: [
            {
              '@type': 'Thing',
              name: keywords.mainKeyword,
            },
            ...keywords.relatedKeywords.map((rk) => ({
              '@type': 'Thing',
              name: rk,
            })),
          ],
        };

    scriptTag.textContent = JSON.stringify(jsonLdData);
  }, [title, description, keywords, canonicalPath, article]);

  return null;
};
