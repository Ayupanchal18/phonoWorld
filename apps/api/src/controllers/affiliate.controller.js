import { dbService } from '../services/db.service.js';
import { affiliateFeed } from '../services/adapters/affiliate-feed.js';
import { priceSyncService } from '../services/price-sync.service.js';

/**
 * Handles transparent outbound affiliate redirection and conversion tracking
 */
export const redirectOut = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { userId, json } = req.query;

    // Locate offer across canonical database
    let matchedOffer = dbService.offers.get(offerId);
    let parentProduct = null;

    if (!matchedOffer) {
      // Search inside product offers
      for (const p of dbService.products.values()) {
        const found = p.offers?.find(o => o._id === offerId);
        if (found) {
          matchedOffer = found;
          parentProduct = p;
          break;
        }
      }
    } else {
      parentProduct = dbService.products.get(matchedOffer.product);
    }

    // Default destination if offer not found
    const destinationUrl = matchedOffer?.affiliateUrl || matchedOffer?.productUrl || 'https://www.amazon.in';
    const sellerName = typeof matchedOffer?.seller === 'object' ? matchedOffer.seller.name : (matchedOffer?.sellerName || 'Amazon India');
    const retailerSlug = sellerName.toLowerCase().includes('amazon') ? 'amazon' : (sellerName.toLowerCase().includes('flipkart') ? 'flipkart' : 'croma');

    // Generate monetized tracking link
    const finalTrackingUrl = affiliateFeed.generateTrackingUrl(destinationUrl, retailerSlug, {
      userId,
      deviceCategory: parentProduct?.category || 'smartphones',
      offerId
    });

    // Record click log
    affiliateFeed.recordClick({
      offerId,
      productId: parentProduct?._id,
      productTitle: parentProduct?.title || 'PhonoWorld Hardware Offer',
      retailer: sellerName,
      originalUrl: destinationUrl,
      affiliateUrl: finalTrackingUrl,
      userId: userId || 'guest',
      ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      userAgent: req.headers['user-agent']
    });

    // If API client requests JSON (e.g. testing or client SPA redirect)
    if (json === 'true') {
      return res.json({
        success: true,
        redirectUrl: finalTrackingUrl,
        retailer: sellerName,
        offerId
      });
    }

    // Standard 302 Outbound Redirect
    res.redirect(302, finalTrackingUrl);
  } catch (error) {
    console.error('Affiliate redirect error:', error);
    res.redirect(302, 'https://www.amazon.in');
  }
};

/**
 * Returns click analytics for Admin Reporting
 */
export const getAffiliateStats = async (req, res) => {
  try {
    const stats = affiliateFeed.getClickStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error fetching affiliate stats' });
  }
};

/**
 * Tests Amazon PA-API 5.0 connection
 */
export const testPaapiConnection = async (req, res) => {
  try {
    const { asin } = req.body || {};
    const result = await priceSyncService.testAmazonPaapi(asin);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Tests Fallback Scraper on Indian Retailer URLs
 */
export const testRetailerScraper = async (req, res) => {
  try {
    const { url, retailer } = req.body || {};
    const result = await priceSyncService.testScraper(url, retailer);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
