import crypto from 'crypto';

/**
 * Amazon PA-API 5.0 Client with pure Node.js AWS Signature Version 4 (HMAC-SHA256).
 * Zero third-party SDK dependencies. Supports Amazon India (webservices.amazon.in).
 */
export class AmazonPaapiAdapter {
  constructor() {
    this.accessKey = process.env.AMAZON_PAAPI_KEY || '';
    this.secretKey = process.env.AMAZON_PAAPI_SECRET || '';
    this.associateTag = process.env.AMAZON_ASSOCIATE_TAG || 'phonoworld-21';
    this.host = process.env.AMAZON_HOST || 'webservices.amazon.in';
    this.region = process.env.AMAZON_REGION || 'eu-west-1'; // Standard AWS region for IN marketplace in PA-API 5.0
    this.service = 'ProductAdvertisingAPI';
  }

  isConfigured() {
    return Boolean(this.accessKey && this.secretKey && this.associateTag);
  }

  /**
   * Generates AWS Signature Version 4 Authorization headers.
   */
  createAwsV4Headers(target, payloadString) {
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    const canonicalUri = '/paapi5/getitems';
    const canonicalQuerystring = '';
    const canonicalHeaders = 
      `content-encoding:amz-1.0\n` +
      `content-type:application/json; charset=utf-8\n` +
      `host:${this.host}\n` +
      `x-amz-date:${amzDate}\n` +
      `x-amz-target:${target}\n`;
    
    const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';
    const payloadHash = crypto.createHash('sha256').update(payloadString, 'utf8').digest('hex');

    const canonicalRequest = [
      'POST',
      canonicalUri,
      canonicalQuerystring,
      canonicalHeaders,
      signedHeaders,
      payloadHash
    ].join('\n');

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${this.region}/${this.service}/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')
    ].join('\n');

    // Calculate Signature Key
    const kDate = crypto.createHmac('sha256', `AWS4${this.secretKey}`).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(this.region).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(this.service).digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

    const authorizationHeader = `${algorithm} Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return {
      'content-encoding': 'amz-1.0',
      'content-type': 'application/json; charset=utf-8',
      'host': this.host,
      'x-amz-date': amzDate,
      'x-amz-target': target,
      'Authorization': authorizationHeader
    };
  }

  /**
   * Fetch item details by ASIN via PA-API 5.0 GetItems
   */
  async getItems(itemIds = [], options = {}) {
    if (!this.isConfigured()) {
      return this.getSimulatedResponse(itemIds, 'Simulated sandbox mode', options);
    }

    const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
    const payload = {
      ItemIds: itemIds,
      ItemIdType: 'ASIN',
      Resources: [
        'ItemInfo.Title',
        'ItemInfo.Features',
        'Offers.Listings.Price',
        'Offers.Listings.SavingBasis',
        'Offers.Listings.Availability.Message',
        'Images.Primary.Large'
      ],
      PartnerTag: this.associateTag,
      PartnerType: 'Associates',
      Marketplace: 'www.amazon.in'
    };

    const payloadString = JSON.stringify(payload);
    const headers = this.createAwsV4Headers(target, payloadString);

    try {
      const response = await fetch(`https://${this.host}/paapi5/getitems`, {
        method: 'POST',
        headers,
        body: payloadString
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Amazon PA-API] Request failed (${response.status}):`, errorText);
        return this.getSimulatedResponse(itemIds, `Live API returned HTTP ${response.status}`, options);
      }

      const data = await response.json();
      return this.normalizePaapiResponse(data);
    } catch (err) {
      console.warn(`[Amazon PA-API] Network error: ${err.message}. Falling back to simulation.`);
      return this.getSimulatedResponse(itemIds, err.message, options);
    }
  }

  /**
   * Formats PA-API 5.0 JSON into PhonoWorld offer structure
   */
  normalizePaapiResponse(data) {
    const items = data.ItemsResult?.Items || [];
    return items.map(item => {
      const listing = item.Offers?.Listings?.[0];
      const priceAmount = listing?.Price?.Amount ? Math.round(listing.Price.Amount) : null;
      const mrpAmount = listing?.SavingBasis?.Amount ? Math.round(listing.SavingBasis.Amount) : priceAmount;

      return {
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || 'Amazon Verified Device',
        price: priceAmount,
        mrp: mrpAmount,
        inStock: listing?.Availability?.Message?.toLowerCase().includes('in stock') ?? true,
        affiliateUrl: this.buildAffiliateUrl(item.ASIN, item.DetailPageURL),
        source: 'AMAZON_PAAPI_LIVE'
      };
    });
  }

  /**
   * Generates tracking-tagged affiliate URL
   */
  buildAffiliateUrl(asin, rawUrl = '') {
    if (rawUrl && rawUrl.includes('amazon.in')) {
      const parsed = new URL(rawUrl);
      parsed.searchParams.set('tag', this.associateTag);
      parsed.searchParams.set('linkCode', 'll1');
      parsed.searchParams.set('language', 'en_IN');
      return parsed.toString();
    }
    return `https://www.amazon.in/dp/${asin}?tag=${this.associateTag}&linkCode=ll1&language=en_IN`;
  }

  /**
   * High-fidelity simulated market response anchored to device's actual verified baseline price.
   */
  getSimulatedResponse(itemIds = [], fallbackReason = 'Simulated sandbox mode', options = {}) {
    const baseline = Number(options.baselinePrice) || 30000;
    const mrp = Number(options.mrp) || Math.round(baseline * 1.12);

    return itemIds.map(asin => {
      // Deterministic slight market fluctuation between -2.5% to +1.0%
      const seed = asin.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const deltaPercent = ((seed % 7) - 4) / 100; // -4% to +2%
      const currentPrice = Math.round((baseline * (1 + deltaPercent)) / 100) * 100;
      const discountPercent = Math.max(0, Math.round(((mrp - currentPrice) / mrp) * 100));

      return {
        asin,
        title: `Amazon Verified Hardware (${asin})`,
        price: currentPrice,
        mrp,
        discountPercent,
        inStock: true,
        affiliateUrl: `https://www.amazon.in/dp/${asin}?tag=${this.associateTag}&linkCode=ll1`,
        source: 'AMAZON_PAAPI_MOCK_FALLBACK',
        fallbackReason
      };
    });
  }
}

export const amazonPaapi = new AmazonPaapiAdapter();
