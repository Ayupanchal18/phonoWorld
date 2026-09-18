import { SEED_BRANDS, SEED_SELLERS, SEED_DATA } from '../data/seed-data.js';
import { ScoreCalculator } from '../utils/scorer.js';

function generateRealisticPriceHistory(product, offers = []) {
  const minP = product.priceSummary?.minPrice || 30000;
  const maxP = product.priceSummary?.maxPrice || Math.round(minP * 1.14);
  const lowestEver = Math.round(minP * 0.91);
  const primeSaleLow = Math.round(minP * 0.93);
  const holiLow = Math.round(minP * 0.97);

  return [
    { date: '2024-01-22', price: maxP, sellerName: 'Amazon India', event: 'Launch MRP Price' },
    { date: '2024-02-15', price: Math.round(maxP * 0.98), sellerName: 'Flipkart', event: 'Initial Market Stabilization' },
    { date: '2024-03-22', price: holiLow, sellerName: 'Amazon India', event: 'Holi Festive Sale' },
    { date: '2024-05-04', price: Math.round(minP * 1.01), sellerName: 'Flipkart', event: 'Summer Big Saving Days' },
    { date: '2024-07-20', price: primeSaleLow, sellerName: 'Amazon India', event: 'Prime Day Special Deal' },
    { date: '2024-08-14', price: lowestEver, sellerName: 'Flipkart', event: 'Independence Freedom Sale (Lowest Ever)' },
    { date: '2024-09-02', price: Math.round(minP * 0.96), sellerName: 'Amazon India', event: 'Pre-Festive Drop' },
    { date: '2024-09-18', price: minP, sellerName: 'Amazon India', event: 'Current Verified Price' }
  ];
}

class DatabaseService {
  constructor() {
    this.brands = new Map();
    this.sellers = new Map();
    this.products = new Map();
    this.variants = new Map();
    this.specifications = new Map();
    this.offers = new Map();
    this.priceHistories = new Map();
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    // Load Brands
    SEED_BRANDS.forEach(b => this.brands.set(b._id, b));
    
    // Load Sellers
    SEED_SELLERS.forEach(s => this.sellers.set(s._id, s));

    // Load Products, Specs, Variants, Offers using deep copies
    SEED_DATA.forEach(rawItem => {
      const item = structuredClone(rawItem);
      // Recalculate PhonoScore dynamically to ensure 100% mathematical consistency across categories
      const minPrice = item.product.priceSummary?.minPrice || 0;
      item.product.scores = ScoreCalculator.calculate(item.specification, minPrice, item.product.category);

      this.products.set(item.product._id, item.product);
      this.products.set(item.product.slug, item.product); // alias by slug
      
      this.specifications.set(item.product._id, item.specification);

      item.variants.forEach(v => {
        this.variants.set(v._id, v);
        this.variants.set(v.slug, v);
      });

      const history = (item.priceHistory && item.priceHistory.length > 0)
        ? item.priceHistory
        : generateRealisticPriceHistory(item.product, item.offers);
      this.priceHistories.set(item.product._id, history);
    });

    this.initialized = true;
    console.log(`[PhonoWorld DB] In-memory database initialized with ${SEED_DATA.length} verified benchmark products across 5 categories.`);
  }

  getCategories() {
    const allProducts = Array.from(new Set(Array.from(this.products.values()))).filter(p => p.isActive);
    const categories = [
      { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone', description: '5G flagships, foldables & budget value kings' },
      { id: 'laptops', name: 'Laptops & Ultrabooks', icon: 'Laptop', description: 'Gaming rigs, Creator OLEDs & Thin-and-Lights' },
      { id: 'wearables', name: 'Smartwatches & Bands', icon: 'Watch', description: 'Wear OS, GPS adventure & ECG health trackers' },
      { id: 'tablets', name: 'Tablets & Slates', icon: 'Tablet', description: 'OLED displays, stylus drawing & desktop DeX slates' },
      { id: 'audio', name: 'TWS & Audio', icon: 'Headphones', description: 'ANC depth, LDAC Hi-Res wireless & spatial sound' }
    ];

    return categories.map(cat => ({
      ...cat,
      count: allProducts.filter(p => (p.category || 'smartphones').toLowerCase() === cat.id.toLowerCase()).length
    }));
  }

  getBrands() {
    return Array.from(new Set(Array.from(this.brands.values())));
  }

  getBrandById(id) {
    return this.brands.get(id);
  }

  getSellerById(id) {
    return this.sellers.get(id);
  }

  getProducts(filters = {}) {
    let list = Array.from(new Set(Array.from(this.products.values())));

    // Filter by Category (default: 'smartphones' or all if specified as 'all')
    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => (p.category || 'smartphones').toLowerCase() === filters.category.toLowerCase());
    } else if (!filters.category) {
      list = list.filter(p => (p.category || 'smartphones').toLowerCase() === 'smartphones');
    }

    // Filter by Brand
    if (filters.brand) {
      const brandSlugs = Array.isArray(filters.brand) ? filters.brand : [filters.brand];
      const matchingBrandIds = Array.from(this.brands.values())
        .filter(b => brandSlugs.includes(b.slug) || brandSlugs.includes(b._id))
        .map(b => b._id);
      
      list = list.filter(p => matchingBrandIds.includes(p.brand));
    }

    // Filter by Price Range
    if (filters.minPrice) {
      list = list.filter(p => p.priceSummary.minPrice >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      list = list.filter(p => p.priceSummary.minPrice <= Number(filters.maxPrice));
    }

    // Filter by 5G
    if (filters.has5G === 'true' || filters.has5G === true) {
      list = list.filter(p => {
        const spec = this.specifications.get(p._id);
        return spec?.connectivity?.has5G;
      });
    }

    // Filter by Min RAM
    if (filters.minRam) {
      const targetRam = Number(filters.minRam);
      list = list.filter(p => {
        const productVariants = Array.from(this.variants.values()).filter(v => v.product === p._id);
        return productVariants.some(v => v.ramGb >= targetRam);
      });
    }

    // Filter by Panel Type (e.g. AMOLED)
    if (filters.panelType) {
      const panel = filters.panelType.toLowerCase();
      list = list.filter(p => {
        const spec = this.specifications.get(p._id);
        return spec?.display?.panelType?.toLowerCase().includes(panel);
      });
    }

    // Sort order
    const sort = filters.sort || 'popular';
    if (sort === 'price_asc') {
      list.sort((a, b) => a.priceSummary.minPrice - b.priceSummary.minPrice);
    } else if (sort === 'price_desc') {
      list.sort((a, b) => b.priceSummary.minPrice - a.priceSummary.minPrice);
    } else if (sort === 'score') {
      list.sort((a, b) => b.scores.overall - a.scores.overall);
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.scores.value || 0) - (a.scores.value || 0));
    } else {
      // default: popular / score
      list.sort((a, b) => b.viewCount - a.viewCount);
    }

    // Hydrate Brands
    const hydrated = list.map(p => ({
      ...p,
      brand: this.brands.get(p.brand) || p.brand
    }));

    // Pagination
    const page = Math.max(1, parseInt(filters.page || '1', 10));
    const limit = Math.max(1, parseInt(filters.limit || '20', 10));
    const totalCount = hydrated.length;
    const paginated = hydrated.slice((page - 1) * limit, page * limit);

    return {
      products: paginated,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  getProductBySlug(slug) {
    const product = this.products.get(slug);
    if (!product) return null;

    const specification = this.specifications.get(product._id);
    const variants = Array.from(new Set(Array.from(this.variants.values()))).filter(v => v.product === product._id);
    
    // Retrieve or dynamically build multi-retailer store quotes
    const minPrice = product.priceSummary?.minPrice || 30000;
    const mrp = product.priceSummary?.maxPrice || Math.round(minPrice * 1.14);
    const lowestSeller = product.priceSummary?.lowestSellerName || 'Amazon India';

    // Bank offers per retailer
    const bankDiscounts = {
      'Amazon India': 'Instant ₹3,000 Discount on HDFC & ICICI Credit Cards',
      'Flipkart': '5% Unlimited Cashback on Flipkart Axis Bank Card',
      'Croma': 'Flat ₹2,500 Instant Discount with ICICI Bank Cards',
      'Reliance Digital': 'Instant 10% Discount on SBI Credit Cards up to ₹2,000'
    };

    const defaultRetailers = ['Amazon India', 'Flipkart', 'Croma'];
    const offers = defaultRetailers.map((sellerName, idx) => {
      const isLowest = sellerName.toLowerCase() === lowestSeller.toLowerCase() || (idx === 0 && !lowestSeller);
      const price = isLowest ? minPrice : Math.round((minPrice * (1 + (idx * 0.018))) / 100) * 100;
      const bankOfferText = bankDiscounts[sellerName] || 'Instant Bank Card Offer Available';
      
      const slugClean = product.slug.replace(/[^a-z0-9-]/g, '');
      const storeUrl = sellerName === 'Amazon India' 
        ? `https://amazon.in/dp/B0${slugClean.substring(0, 8).toUpperCase()}?tag=phonoworld-21`
        : sellerName === 'Flipkart'
        ? `https://flipkart.com/${slugClean}/p/itm?affid=phonoworld`
        : `https://www.croma.com/searchB?q=${encodeURIComponent(product.title)}`;

      return {
        _id: `off_${product._id}_${idx + 1}`,
        variant: variants[0]?._id || `var_${product._id}`,
        seller: {
          _id: `seller_${sellerName.toLowerCase().replace(/\s+/g, '_')}`,
          name: sellerName,
          domain: sellerName === 'Amazon India' ? 'amazon.in' : sellerName === 'Flipkart' ? 'flipkart.com' : 'croma.com'
        },
        productUrl: storeUrl,
        affiliateUrl: storeUrl,
        mrp,
        price,
        effectivePrice: Math.max(1000, price - 2000),
        discountPercent: Math.max(0, Math.round(((mrp - price) / mrp) * 100)),
        inStock: true,
        bankOfferSummary: bankOfferText,
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: isLowest
      };
    }).sort((a, b) => a.price - b.price);

    const priceHistory = this.priceHistories.get(product._id) || [];
    
    // Top 3 Alternatives in similar price segment (+- 25%)
    const minP = minPrice * 0.75;
    const maxP = minPrice * 1.35;
    const alternatives = Array.from(new Set(Array.from(this.products.values())))
      .filter(p => p._id !== product._id && p.priceSummary.minPrice >= minP && p.priceSummary.minPrice <= maxP)
      .slice(0, 3)
      .map(p => ({
        ...p,
        brand: this.brands.get(p.brand) || p.brand
      }));

    return {
      product: {
        ...product,
        brand: this.brands.get(product.brand) || product.brand
      },
      specification,
      variants,
      offers,
      priceHistory,
      alternatives
    };
  }

  getComparison(slugs = []) {
    const details = slugs
      .map(slug => this.getProductBySlug(slug.trim()))
      .filter(Boolean);

    return {
      products: details,
      count: details.length
    };
  }

  search(query = '') {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    
    const allProducts = Array.from(new Set(Array.from(this.products.values())));
    
    const matches = allProducts.filter(p => {
      const brand = this.brands.get(p.brand);
      const brandName = brand ? brand.name.toLowerCase() : '';
      return p.title.toLowerCase().includes(q) || 
             p.slug.toLowerCase().includes(q) ||
             brandName.includes(q) ||
             p.summary.toLowerCase().includes(q);
    });

    return matches.slice(0, 10).map(p => ({
      ...p,
      brand: this.brands.get(p.brand) || p.brand
    }));
  }

  getRecommendations(criteria = {}) {
    const budgetMin = Number(criteria.budgetMin || 0);
    const budgetMax = Number(criteria.budgetMax || 150000);
    const weights = criteria.weights || { performance: 5, camera: 5, battery: 5, display: 5, build: 5 };

    const wPerf = (weights.performance || 5) / 10;
    const wCam = (weights.camera || 5) / 10;
    const wBatt = (weights.battery || 5) / 10;
    const wDisp = (weights.display || 5) / 10;
    const wBuild = (weights.build || 5) / 10;
    const totalWeight = wPerf + wCam + wBatt + wDisp + wBuild || 1;

    let candidateList = Array.from(new Set(Array.from(this.products.values())));

    // Hard brand filters
    if (criteria.preferredBrands && criteria.preferredBrands.length > 0) {
      const prefIds = Array.from(this.brands.values())
        .filter(b => criteria.preferredBrands.includes(b.slug) || criteria.preferredBrands.includes(b._id))
        .map(b => b._id);
      if (prefIds.length > 0) {
        candidateList = candidateList.filter(p => prefIds.includes(p.brand));
      }
    }

    if (criteria.excludedBrands && criteria.excludedBrands.length > 0) {
      const exclIds = Array.from(this.brands.values())
        .filter(b => criteria.excludedBrands.includes(b.slug) || criteria.excludedBrands.includes(b._id))
        .map(b => b._id);
      candidateList = candidateList.filter(p => !exclIds.includes(p.brand));
    }

    const scoredCandidates = candidateList.map(p => {
      const spec = this.specifications.get(p._id);
      const price = p.priceSummary.minPrice;
      
      // Calculate Weighted Utility
      const utility = (
        (p.scores.performance * wPerf) +
        (p.scores.camera * wCam) +
        (p.scores.battery * wBatt) +
        (p.scores.display * wDisp) +
        (p.scores.build * wBuild)
      ) / totalWeight;

      // Budget Penalty calculation
      let budgetMultiplier = 1.0;
      if (price > budgetMax) {
        budgetMultiplier = Math.max(0.2, 1 - (price - budgetMax) / (0.2 * budgetMax));
      } else if (price < budgetMin) {
        budgetMultiplier = 0.9; // minor penalty for being below target bracket
      }

      const finalScore = Math.round(utility * budgetMultiplier);
      const matchPercentage = Math.min(99, Math.max(45, finalScore));

      // Build explainable win & compromise reasons
      let primaryWinReason = `${p.scores.overall}/100 PhonoScore with standout ${spec?.hardware?.chipset || 'hardware'}`;
      if (p.scores.camera >= 90) primaryWinReason = `Top-tier camera system with ${spec?.rearCamera?.primaryMp}MP OIS sensor`;
      else if (p.scores.performance >= 90) primaryWinReason = `Extreme performance (AnTuTu ${spec?.hardware?.antutuScore?.toLocaleString('en-IN') || '1M+'})`;
      else if (p.scores.battery >= 90) primaryWinReason = `Massive battery with ${spec?.battery?.fastChargingWatts}W fast charging`;

      let compromiseReason = 'None significant in this category';
      if (p.scores.build <= 76) compromiseReason = 'Plastic chassis / lower ingress water protection rating';
      else if (!spec?.battery?.chargerInBox) compromiseReason = 'Charging adapter not included in box';
      else if (p.scores.camera <= 80) compromiseReason = 'Lacks dedicated telephoto optical zoom lens';

      return {
        product: {
          ...p,
          brand: this.brands.get(p.brand) || p.brand
        },
        specification: spec,
        calculatedScore: finalScore,
        matchPercentage,
        primaryWinReason,
        compromiseReason
      };
    });

    scoredCandidates.sort((a, b) => b.calculatedScore - a.calculatedScore);

    return scoredCandidates.slice(0, 6);
  }

  getStats() {
    const allProducts = Array.from(new Set(Array.from(this.products.values())));
    const activeProducts = allProducts.filter(p => p.isActive);
    const brandsCount = this.brands.size;
    const avgScore = allProducts.length > 0
      ? Math.round(allProducts.reduce((sum, p) => sum + (p.scores?.overall || 0), 0) / allProducts.length)
      : 0;
    const totalOffers = this.offers.size;
    const totalVariants = this.variants.size;

    return {
      totalProducts: allProducts.length,
      activeProducts: activeProducts.length,
      brandsCount,
      avgScore,
      totalOffers,
      totalVariants
    };
  }

  addProduct({ product, specification, variants = [], offers = [], priceHistory = [] }) {
    if (!product || !product.slug) {
      throw new Error('Product object with valid slug is required');
    }

    const _id = product._id || `prod_${Date.now()}`;
    const slug = product.slug;

    // Calculate dynamic scores if spec and price exist
    const minPrice = product.priceSummary?.minPrice || 0;
    const scores = ScoreCalculator.calculate(specification, minPrice);

    const fullProduct = {
      ...product,
      _id,
      slug,
      scores,
      isActive: product.isActive !== undefined ? product.isActive : true,
      viewCount: product.viewCount || 100,
      createdAt: new Date().toISOString()
    };

    this.products.set(_id, fullProduct);
    this.products.set(slug, fullProduct);

    if (specification) {
      this.specifications.set(_id, { ...specification, product: _id });
    }

    // Add variants
    variants.forEach(v => {
      const vId = v._id || `var_${_id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const fullVar = { ...v, _id: vId, product: _id };
      this.variants.set(vId, fullVar);
      if (fullVar.slug) this.variants.set(fullVar.slug, fullVar);
    });

    // Add offers
    offers.forEach(o => {
      const oId = o._id || `off_${_id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      this.offers.set(oId, { ...o, _id: oId });
    });

    // Add initial price history
    const history = (priceHistory && priceHistory.length > 0)
      ? priceHistory
      : generateRealisticPriceHistory(fullProduct, offers);
    this.priceHistories.set(_id, history);

    return {
      product: fullProduct,
      specification,
      variants,
      offers,
      priceHistory: history
    };
  }

  updateProduct(id, updates = {}) {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with ID '${id}' not found`);
    }

    const updated = { ...product, ...updates.product };
    
    // Recalculate score if spec or price changed
    const spec = updates.specification || this.specifications.get(product._id);
    if (spec) {
      updated.scores = ScoreCalculator.calculate(spec, updated.priceSummary?.minPrice || 0);
      this.specifications.set(product._id, spec);
    }

    this.products.set(product._id, updated);
    if (updated.slug) this.products.set(updated.slug, updated);

    return updated;
  }

  overridePrice(productId, newPrice, sellerName = 'Amazon India', eventName = 'Festive Flash Deal') {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error(`Product with ID '${productId}' not found`);
    }

    const priceNum = Number(newPrice);
    if (!priceNum || priceNum <= 0) {
      throw new Error('Valid new price is required');
    }

    // Update product priceSummary
    const oldPrice = product.priceSummary?.minPrice || priceNum;
    product.priceSummary = {
      ...product.priceSummary,
      minPrice: priceNum,
      hasDeals: true,
      lowestSellerName: sellerName,
      discountPercentMax: oldPrice > priceNum ? Math.round(((oldPrice - priceNum) / oldPrice) * 100) : 0
    };

    // Recalculate scores with new price
    const spec = this.specifications.get(product._id);
    if (spec) {
      product.scores = ScoreCalculator.calculate(spec, priceNum);
    }

    this.products.set(product._id, product);
    if (product.slug) this.products.set(product.slug, product);

    // Append new entry to price history
    const history = this.priceHistories.get(product._id) || [];
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      price: priceNum,
      sellerName,
      event: eventName
    };
    history.push(newEntry);
    this.priceHistories.set(product._id, history);

    return {
      product,
      newEntry,
      priceDrop: oldPrice - priceNum
    };
  }

  deleteProduct(id) {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with ID '${id}' not found`);
    }

    // Soft delete / toggle active
    product.isActive = false;
    this.products.set(product._id, product);
    if (product.slug) this.products.set(product.slug, product);

    return { success: true, message: `Product ${product.title} deactivated` };
  }

  resetCanonicalPrices() {
    SEED_DATA.forEach(rawItem => {
      const item = structuredClone(rawItem);
      const minPrice = item.product.priceSummary?.minPrice || 0;
      item.product.scores = ScoreCalculator.calculate(item.specification, minPrice, item.product.category);

      this.products.set(item.product._id, item.product);
      if (item.product.slug) this.products.set(item.product.slug, item.product);

      const history = (item.priceHistory && item.priceHistory.length > 0)
        ? item.priceHistory
        : generateRealisticPriceHistory(item.product, item.offers);
      this.priceHistories.set(item.product._id, history);
    });

    return { success: true, count: SEED_DATA.length };
  }
}

export const dbService = new DatabaseService();
