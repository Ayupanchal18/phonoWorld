import { dbService } from '../services/db.service.js';
import { reviewService } from '../services/review.service.js';

export const getSitemapXml = async (req, res) => {
  try {
    const baseUrl = req.protocol + '://' + req.get('host');
    const products = Array.from(new Set(Array.from(dbService.products.values()))).filter(p => p.isActive);
    const brands = dbService.getBrands();

    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/compare', priority: '0.8', changefreq: 'weekly' },
      { url: '/phone-finder', priority: '0.8', changefreq: 'weekly' },
      { url: '/wishlist', priority: '0.5', changefreq: 'monthly' }
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    staticRoutes.forEach(r => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${r.url}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Product PDPs
    products.forEach(p => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/smartphones/${p.slug}</loc>\n`;
      xml += `    <lastmod>${p.updatedAt ? p.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    // Brand Landing Hubs
    brands.forEach(b => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/brands/${b.slug}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap.xml:', error);
    res.status(500).send('Error generating sitemap');
  }
};

export const getRobotsTxt = async (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/v1/admin
Disallow: /api/v1/user/wishlist

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
};

export const getProductSeoData = async (req, res) => {
  try {
    const { slug } = req.params;
    const detail = dbService.getProductBySlug(slug);

    if (!detail) {
      return res.status(404).json({ success: false, error: 'Product not found for SEO' });
    }

    const { product, specification, offers = [] } = detail;
    const reviewsData = reviewService.getReviewsByProduct(product._id);
    const avgRating = reviewsData.summary?.averageRating || 4.5;
    const reviewCount = reviewsData.summary?.totalReviews || 12;

    const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand;
    const minPrice = product.priceSummary?.minPrice || 30000;
    const maxPrice = product.priceSummary?.maxPrice || Math.round(minPrice * 1.15);

    // Schema.org Product + AggregateOffer + AggregateRating + Breadcrumbs
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      image: [product.featuredImage, ...(product.galleryImages || [])],
      description: product.summary || `Buy ${product.title} at lowest verified online price in India. Full specifications, benchmark scores, camera tests, and expert reviews.`,
      sku: product.modelNumber || product.slug,
      mpn: product.modelNumber || product.slug,
      brand: {
        '@type': 'Brand',
        name: brandName
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: minPrice,
        highPrice: maxPrice,
        offerCount: offers.length || 2,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        offers: offers.map(o => ({
          '@type': 'Offer',
          price: o.price,
          priceCurrency: 'INR',
          seller: {
            '@type': 'Organization',
            name: o.sellerName || 'Amazon India'
          },
          url: o.affiliateUrl || `https://phonoworld.in/smartphones/${product.slug}`,
          availability: o.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }))
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        reviewCount: reviewCount,
        bestRating: '5',
        worstRating: '1'
      }
    };

    const breadcrumbsJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://phonoworld.in'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: brandName,
          item: `https://phonoworld.in/brands/${product.brand?.slug || 'smartphones'}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.title,
          item: `https://phonoworld.in/smartphones/${product.slug}`
        }
      ]
    };

    res.json({
      success: true,
      data: {
        metaTitle: `${product.title} Price in India, Full Specs & Reviews - PhonoWorld`,
        metaDescription: `Check ${product.title} lowest price in India (₹${minPrice.toLocaleString('en-IN')}). Compare ${specification?.hardware?.chipset}, ${specification?.rearCamera?.primaryMp}MP camera, ${specification?.battery?.capacityMah}mAh battery and Indian 5G band certifications.`,
        canonicalUrl: `https://phonoworld.in/smartphones/${product.slug}`,
        schemaJsonLd: jsonLd,
        breadcrumbsJsonLd
      }
    });
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    res.status(500).json({ success: false, error: 'Internal server error generating SEO payload' });
  }
};
