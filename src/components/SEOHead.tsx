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

    // 4. Set OpenGraph tags & Canonical URL
    const resolvedUrl = canonicalPath
      ? `${window.location.origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      : window.location.href;

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', article ? 'article' : 'website');
    setMetaTag('property', 'og:url', resolvedUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = resolvedUrl;

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
          url: resolvedUrl,
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
          ...(article.faq && article.faq.length > 0
            ? {
                mainEntity: article.faq.map((item) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                  },
                })),
              }
            : {}),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: description,
          url: resolvedUrl,
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

    // 7. Dedicated FAQPage Schema for Answer Engine Optimization (AEO)
    const faqScriptId = 'faq-structured-data-jsonld';
    let faqScriptTag = document.getElementById(faqScriptId) as HTMLScriptElement | null;
    if (article?.faq && article.faq.length > 0) {
      if (!faqScriptTag) {
        faqScriptTag = document.createElement('script');
        faqScriptTag.id = faqScriptId;
        faqScriptTag.type = 'application/ld+json';
        document.head.appendChild(faqScriptTag);
      }
      faqScriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    } else if (faqScriptTag) {
      faqScriptTag.remove();
    }

    // 8. BreadcrumbList Schema for Strong Hierarchical URLs
    const breadcrumbScriptId = 'breadcrumb-structured-data-jsonld';
    let breadcrumbScriptTag = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
    const origin = window.location.origin;

    if (article) {
      if (!breadcrumbScriptTag) {
        breadcrumbScriptTag = document.createElement('script');
        breadcrumbScriptTag.id = breadcrumbScriptId;
        breadcrumbScriptTag.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScriptTag);
      }
      breadcrumbScriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: article.categoryName,
            item: `${origin}/category/${article.category}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: resolvedUrl,
          },
        ],
      });
    } else if (canonicalPath && canonicalPath.startsWith('/category/')) {
      const catId = canonicalPath.replace('/category/', '');
      const catName = catId.charAt(0).toUpperCase() + catId.slice(1);
      if (!breadcrumbScriptTag) {
        breadcrumbScriptTag = document.createElement('script');
        breadcrumbScriptTag.id = breadcrumbScriptId;
        breadcrumbScriptTag.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScriptTag);
      }
      breadcrumbScriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: catName,
            item: resolvedUrl,
          },
        ],
      });
    } else if (breadcrumbScriptTag) {
      breadcrumbScriptTag.remove();
    }
  }, [title, description, keywords, canonicalPath, article]);

  return null;
};
