import { dbService } from './db.service.js';
import { authService } from './auth.service.js';
import { ScoreCalculator } from '../utils/scorer.js';
import { amazonPaapi } from './adapters/amazon-paapi.js';
import { affiliateFeed } from './adapters/affiliate-feed.js';
import { retailerScraper } from './adapters/retailer-scraper.js';
import { cacheService } from './cache.service.js';

class PriceSyncService {
  constructor() {
    this.isRunning = false;
    this.lastRun = null;
    this.intervalMinutes = 60;
    this.syncLogs = [];
    this.timerId = null;
    this.init();
  }

  init() {
    this.log('Price Sync Engine initialized with Amazon PA-API 5.0, Cuelinks/EarnKaro feeds & Fallback Scrapers.');
  }

  log(message, level = 'info', metadata = {}) {
    const entry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata
    };
    this.syncLogs.unshift(entry);
    if (this.syncLogs.length > 100) this.syncLogs.pop(); // keep last 100 logs
    return entry;
  }

  async syncAllProducts(triggerSource = 'manual') {
    if (this.isRunning) {
      throw new Error('A price synchronization task is already in progress.');
    }

    this.isRunning = true;
    const startTime = Date.now();
    this.log(`Starting multi-retailer catalog price sync [Trigger: ${triggerSource}]...`);

    const products = Array.from(new Set(Array.from(dbService.products.values()))).filter(p => p.isActive);
    const updatedProducts = [];
    const triggeredAlerts = [];

    for (const product of products) {
      try {
        const currentPrice = product.priceSummary?.minPrice || 30000;
        const canonicalMrp = product.priceSummary?.maxPrice || Math.round(currentPrice * 1.12);
        
        // 1. Fetch Amazon verified price with product-anchored baseline options
        const dummyAsin = `B0${product.slug.replace(/[^a-z0-9]/gi, '').substring(0, 8).toUpperCase()}`;
        const amazonResults = await amazonPaapi.getItems([dummyAsin], {
          baselinePrice: currentPrice,
          mrp: canonicalMrp
        });
        const amazonOffer = amazonResults[0];

        // 2. Fetch Retailer Scraper price anchored to current verified price
        const scraperOffer = await retailerScraper.scrapeProduct(
          `https://www.croma.com/searchB?q=${encodeURIComponent(product.title)}`,
          'croma',
          currentPrice
        );

        // Compare multi-retailer quotes to find competitive lowest price
        const CATEGORY_FLOORS = {
          smartphones: 5000,
          laptops: 20000,
          tablets: 8000,
          wearables: 1500,
          audio: 1000
        };
        const categoryFloor = CATEGORY_FLOORS[product.category] || 2000;

        const rawCandidates = [
          { seller: 'Amazon India', price: amazonOffer.price, mrp: amazonOffer.mrp, source: amazonOffer.source, title: amazonOffer.title },
          { seller: 'Croma', price: scraperOffer.price, mrp: scraperOffer.mrp, source: scraperOffer.source, title: scraperOffer.bankOffer || 'Croma Verified Listing' }
        ];

        // Pipeline Stage 1: Category Price Floor Guard
        const validCandidates = rawCandidates.filter(c => {
          if (!c.price || c.price < categoryFloor) {
            this.log(`⚠️ Floor Filter: Rejected quote ₹${c.price} from ${c.seller} for ${product.title} (Floor: ₹${categoryFloor})`, 'warn');
            return false;
          }
          return true;
        });

        if (validCandidates.length > 0) {
          validCandidates.sort((a, b) => a.price - b.price);
          const bestDeal = validCandidates[0];
          
          // Pipeline Stage 2: Volatility Circuit Breaker (+/- 15% Max Deviation from Baseline)
          if (bestDeal.price < currentPrice * 0.85 || bestDeal.price > currentPrice * 1.15) {
            this.log(`⚠️ Circuit Breaker: Outlier quote ₹${bestDeal.price.toLocaleString('en-IN')} for ${product.title} rejected (Exceeds 15% tolerance from ₹${currentPrice.toLocaleString('en-IN')})`, 'warn');
            continue;
          }

          const priceDelta = bestDeal.price - currentPrice;

          if (priceDelta !== 0) {
            const eventName = priceDelta < 0
              ? (Math.abs(priceDelta) > 2000 ? 'Automated Price Drop Alert' : 'Live Retailer Price Match')
              : 'Post-Sale Stabilization';

            dbService.overridePrice(product._id, bestDeal.price, bestDeal.seller, eventName);

            // Check if any registered user alerts are satisfied
            const matchedAlerts = this.checkAndTriggerAlerts(product._id, product.title, bestDeal.price);
            if (matchedAlerts.length > 0) {
              triggeredAlerts.push(...matchedAlerts);
            }

            updatedProducts.push({
              productId: product._id,
              title: product.title,
              oldPrice: currentPrice,
              newPrice: bestDeal.price,
              delta: priceDelta,
              seller: bestDeal.seller,
              source: bestDeal.source,
              alertsTriggered: matchedAlerts.length
            });
          }
        }
      } catch (err) {
        this.log(`Error syncing price for ${product.title}: ${err.message}`, 'error');
      }
    }

    const durationMs = Date.now() - startTime;
    if (updatedProducts.length > 0) {
      await cacheService.flushByPattern('catalog:');
      this.log(`Flushed catalog cache after updating ${updatedProducts.length} prices.`);
    }

    this.lastRun = {
      timestamp: new Date().toISOString(),
      durationMs,
      totalScanned: products.length,
      totalUpdated: updatedProducts.length,
      alertsTriggered: triggeredAlerts.length,
      triggerSource
    };

    this.isRunning = false;
    this.log(
      `Sync completed in ${durationMs}ms: Scanned ${products.length} devices, updated ${updatedProducts.length} prices, triggered ${triggeredAlerts.length} user alerts.`,
      'success',
      { updatedProducts }
    );

    return {
      summary: this.lastRun,
      changes: updatedProducts,
      triggeredAlerts
    };
  }

  checkAndTriggerAlerts(productId, productTitle, newPrice) {
    const triggered = [];
    const allAlerts = Array.from(authService.alerts.values());

    allAlerts.forEach(alert => {
      if (
        (alert.productId === productId || alert.productTitle === productTitle) &&
        !alert.isTriggered &&
        newPrice <= alert.targetPrice
      ) {
        alert.isTriggered = true;
        alert.triggeredAt = new Date().toISOString();
        alert.triggeredPrice = newPrice;
        authService.alerts.set(alert.id, alert);
        triggered.push(alert);
        this.log(`🔥 Price drop alert triggered for user '${alert.userId}' on ${productTitle} at ₹${newPrice.toLocaleString('en-IN')}`, 'warn');
      }
    });

    return triggered;
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      intervalMinutes: this.intervalMinutes,
      lastRun: this.lastRun,
      totalTrackedProducts: Array.from(new Set(Array.from(dbService.products.values()))).length,
      activeAlertsCount: authService.alerts.size,
      adapters: {
        amazonPaapi: {
          isConfigured: amazonPaapi.isConfigured(),
          associateTag: amazonPaapi.associateTag,
          host: amazonPaapi.host,
          mode: amazonPaapi.isConfigured() ? 'LIVE_AWS_V4' : 'SIMULATED_SANDBOX'
        },
        affiliateFeed: {
          isConfigured: affiliateFeed.isConfigured(),
          network: affiliateFeed.defaultNetwork,
          publisherId: affiliateFeed.cuelinksPubId
        },
        retailerScraper: {
          active: true,
          supportedStores: ['Croma', 'Reliance Digital', 'Vijay Sales']
        }
      },
      clickStats: affiliateFeed.getClickStats(),
      recentLogs: this.syncLogs.slice(0, 20)
    };
  }

  async testAmazonPaapi(asin = 'B0CX1PD14Q') {
    this.log(`Testing Amazon PA-API 5.0 connection for ASIN: ${asin}...`);
    const results = await amazonPaapi.getItems([asin]);
    return {
      asin,
      mode: amazonPaapi.isConfigured() ? 'LIVE_PAAPI_5' : 'SIMULATION_FALLBACK',
      data: results[0]
    };
  }

  async testScraper(url, retailer = 'croma') {
    this.log(`Testing fallback retailer scraper on ${retailer}: ${url}...`);
    const result = await retailerScraper.scrapeProduct(url, retailer, 50000);
    return {
      retailer,
      url,
      data: result
    };
  }

  async resetAllPrices() {
    dbService.resetCanonicalPrices();
    await cacheService.flushByPattern('catalog:');
    this.syncLogs = [];
    this.lastRun = null;
    this.log('All catalog device prices successfully reset to official benchmark figures.');
    return { success: true, message: 'All catalog device prices reset to official verified baseline.' };
  }
}

export const priceSyncService = new PriceSyncService();
