import React, { useEffect } from 'react';

export function SeoHead({
  title = 'PhonoWorld - Indian Smartphone Discovery, Spec Benchmarks & Price Tracker',
  description = 'Compare smartphones with verified Indian 5G band certifications, 8-axis PhonoScores, AnTuTu benchmarks, camera tests, and 24/7 multi-retailer price tracking.',
  keywords = 'smartphones India, phone prices, 5G bands India, mobile specs, camera comparisons, AnTuTu benchmarks, best gaming phones',
  canonicalUrl = 'https://phonoworld.in',
  imageUrl = 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1200&auto=format&fit=crop&q=80',
  schemaJsonLd = null,
  breadcrumbsJsonLd = null
}) {
  useEffect(() => {
    // Set Page Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Metas
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'PhonoWorld');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Schema.org Product JSON-LD
    let scriptProduct = document.getElementById('schema-product-jsonld');
    if (schemaJsonLd) {
      if (!scriptProduct) {
        scriptProduct = document.createElement('script');
        scriptProduct.id = 'schema-product-jsonld';
        scriptProduct.type = 'application/ld+json';
        document.head.appendChild(scriptProduct);
      }
      scriptProduct.textContent = JSON.stringify(schemaJsonLd);
    } else if (scriptProduct) {
      scriptProduct.remove();
    }

    // Schema.org Breadcrumbs JSON-LD
    let scriptBreadcrumb = document.getElementById('schema-breadcrumbs-jsonld');
    if (breadcrumbsJsonLd) {
      if (!scriptBreadcrumb) {
        scriptBreadcrumb = document.createElement('script');
        scriptBreadcrumb.id = 'schema-breadcrumbs-jsonld';
        scriptBreadcrumb.type = 'application/ld+json';
        document.head.appendChild(scriptBreadcrumb);
      }
      scriptBreadcrumb.textContent = JSON.stringify(breadcrumbsJsonLd);
    } else if (scriptBreadcrumb) {
      scriptBreadcrumb.remove();
    }
  }, [title, description, keywords, canonicalUrl, imageUrl, schemaJsonLd, breadcrumbsJsonLd]);

  return null;
}
