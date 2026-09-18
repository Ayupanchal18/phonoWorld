import { Router } from 'express';
import { getProducts, getProductBySlug, getBrands, getCategories } from '../controllers/product.controller.js';
import { getComparison } from '../controllers/compare.controller.js';
import { searchProducts, getPhoneFinderRecommendations } from '../controllers/search.controller.js';
import { register, login, getProfile, toggleWishlist, getWishlist, createAlert, getAlerts, deleteAlert } from '../controllers/auth.controller.js';
import { getProductReviews, submitReview, voteReview } from '../controllers/review.controller.js';
import { getAdminStats, previewNormalization, createProduct, updateProduct, overrideFestivePrice, deleteProduct } from '../controllers/admin.controller.js';
import { getSyncStatus, triggerManualSync, getSyncLogs, resetSyncPrices } from '../controllers/sync.controller.js';
import { getProductSeoData } from '../controllers/seo.controller.js';
import { redirectOut, getAffiliateStats, testPaapiConnection, testRetailerScraper } from '../controllers/affiliate.controller.js';
import { requireAuth, optionalAuth, requireAdmin } from '../middlewares/auth.middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';
import { cacheService } from '../services/cache.service.js';

const router = Router();

// Catalog & Filter Routes (Edge-Cached with Sub-5ms Responses)
router.get('/categories', cacheMiddleware(900, 'catalog:categories'), getCategories);
router.get('/products', cacheMiddleware(600, 'catalog:products'), getProducts);
router.get('/products/:slug', cacheMiddleware(600, 'catalog:product'), getProductBySlug);
router.get('/brands', cacheMiddleware(900, 'catalog:brands'), getBrands);

// Programmatic SEO & Schema.org JSON-LD Routes
router.get('/seo/product/:slug', getProductSeoData);

// Search & Autocomplete
router.get('/search', cacheMiddleware(300, 'catalog:search'), searchProducts);

// 2-4 Phone Comparison Matrix
router.get('/compare', getComparison);

// Phone Finder Wizard Recommendations
router.post('/recommendations/wizard', getPhoneFinderRecommendations);

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', requireAuth, getProfile);

// User Wishlist Routes
router.get('/user/wishlist', requireAuth, getWishlist);
router.post('/user/wishlist/:productId', requireAuth, toggleWishlist);

// Price Alerts Routes
router.post('/alerts', optionalAuth, createAlert);
router.get('/alerts', optionalAuth, getAlerts);
router.delete('/alerts/:id', optionalAuth, deleteAlert);

// Community Reviews & Ratings Routes
router.get('/products/:id/reviews', getProductReviews);
router.post('/products/:id/reviews', optionalAuth, submitReview);
router.post('/reviews/:id/vote', voteReview);

// Admin CMS & Data Ingestion Routes (Strict RBAC - Administrator Only)
router.get('/admin/stats', requireAdmin, getAdminStats);
router.post('/admin/preview', requireAdmin, previewNormalization);
router.post('/admin/products', requireAdmin, createProduct);
router.put('/admin/products/:id', requireAdmin, updateProduct);
router.post('/admin/override-price', requireAdmin, overrideFestivePrice);
router.delete('/admin/products/:id', requireAdmin, deleteProduct);

// Automated Price Ingestion & Sync Queue Routes (Strict RBAC - Administrator Only)
router.get('/admin/sync/status', requireAdmin, getSyncStatus);
router.post('/admin/sync/trigger', requireAdmin, triggerManualSync);
router.get('/admin/sync/logs', requireAdmin, getSyncLogs);
router.post('/admin/sync/reset', requireAdmin, resetSyncPrices);
router.post('/admin/sync/test-paapi', requireAdmin, testPaapiConnection);
router.post('/admin/sync/test-scraper', requireAdmin, testRetailerScraper);

// Outbound Affiliate Redirection & Click Tracking Routes
router.get('/out/:offerId', redirectOut);
router.get('/affiliate/stats', requireAdmin, getAffiliateStats);

// Edge Cache Telemetry & Management Routes (Strict RBAC - Administrator Only)
router.get('/admin/cache/stats', requireAdmin, (req, res) => res.json({ success: true, data: cacheService.getStats() }));
router.post('/admin/cache/clear', requireAdmin, async (req, res) => {
  await cacheService.flushAll();
  res.json({ success: true, message: 'Catalog edge cache cleared successfully.' });
});

export default router;
