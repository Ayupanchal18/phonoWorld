/**
 * Dynamic Affiliate Link Generation & Conversion Tracking for Indian Retailers.
 * Supports Cuelinks, EarnKaro, and direct retailer partner sub-IDs.
 */
export class AffiliateFeedAdapter {
  constructor() {
    this.cuelinksPubId = process.env.CUELINKS_PUB_ID || '114820'; // PhonoWorld Publisher ID
    this.earnkaroToken = process.env.EARNKARO_API_TOKEN || '';
    this.defaultNetwork = process.env.AFFILIATE_NETWORK || 'cuelinks'; // 'cuelinks' | 'earnkaro' | 'direct'
    
    // In-memory click analytics store (persists during runtime)
    this.clickLogs = [];
  }

  isConfigured() {
    return Boolean(this.cuelinksPubId || this.earnkaroToken);
  }

  /**
   * Transforms raw retailer product URLs into monetized, tracking-tagged affiliate links.
   * @param {string} rawUrl - Direct retailer URL (e.g. flipkart.com/apple-iphone-15/...)
   * @param {string} retailer - Retailer identifier (flipkart, croma, reliance, etc.)
   * @param {object} options - Optional context { userId, deviceCategory, offerId }
   */
  generateTrackingUrl(rawUrl, retailer = 'flipkart', options = {}) {
    if (!rawUrl) return '#';

    const subId = options.userId ? `usr_${options.userId}` : 'guest';
    const campaignTag = options.deviceCategory || 'electronics';

    // Direct Amazon affiliate handles tags directly in amazon-paapi.js
    if (retailer === 'amazon' || rawUrl.includes('amazon.in')) {
      const parsed = new URL(rawUrl);
      if (!parsed.searchParams.has('tag')) {
        parsed.searchParams.set('tag', process.env.AMAZON_ASSOCIATE_TAG || 'phonoworld-21');
      }
      return parsed.toString();
    }

    // Cuelinks Publisher Redirection Engine
    if (this.defaultNetwork === 'cuelinks' && this.cuelinksPubId) {
      const encodedDest = encodeURIComponent(rawUrl);
      return `https://linksredirect.com/?pub_id=${this.cuelinksPubId}&url=${encodedDest}&subid=${subId}&subid2=${campaignTag}`;
    }

    // EarnKaro Link Engine Fallback
    if (this.defaultNetwork === 'earnkaro' && this.earnkaroToken) {
      const encodedDest = encodeURIComponent(rawUrl);
      return `https://earnkaro.com/deals?link=${encodedDest}&source=phonoworld&subid=${subId}`;
    }

    // Direct Retailer UTM Fallback (Clean attribution)
    try {
      const parsed = new URL(rawUrl);
      parsed.searchParams.set('utm_source', 'phonoworld');
      parsed.searchParams.set('utm_medium', 'affiliate_price_comparison');
      parsed.searchParams.set('utm_campaign', campaignTag);
      return parsed.toString();
    } catch {
      return rawUrl;
    }
  }

  /**
   * Records an outbound click-out event for conversion tracking and audit trails
   */
  recordClick(data) {
    const entry = {
      id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      offerId: data.offerId || null,
      productId: data.productId || null,
      productTitle: data.productTitle || 'Unknown Device',
      retailer: data.retailer || 'Unknown Retailer',
      originalUrl: data.originalUrl || '',
      affiliateUrl: data.affiliateUrl || '',
      userId: data.userId || 'guest',
      userIp: data.ip || '127.0.0.1',
      userAgent: data.userAgent || 'Mozilla'
    };

    this.clickLogs.unshift(entry);
    if (this.clickLogs.length > 500) this.clickLogs.pop(); // Keep last 500 clicks
    return entry;
  }

  /**
   * Aggregates click stats by retailer and device for the Admin dashboard
   */
  getClickStats() {
    const totalClicks = this.clickLogs.length;
    const byRetailer = {};
    const byProduct = {};

    this.clickLogs.forEach(c => {
      byRetailer[c.retailer] = (byRetailer[c.retailer] || 0) + 1;
      byProduct[c.productTitle] = (byProduct[c.productTitle] || 0) + 1;
    });

    return {
      totalClicks,
      network: this.defaultNetwork,
      isConfigured: this.isConfigured(),
      byRetailer,
      topProducts: Object.entries(byProduct)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([title, count]) => ({ title, count })),
      recentClicks: this.clickLogs.slice(0, 15)
    };
  }
}

export const affiliateFeed = new AffiliateFeedAdapter();
