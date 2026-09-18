import { dbService } from '../services/db.service.js';
import { ScoreCalculator } from '../utils/scorer.js';
import { SpecNormalizer } from '../utils/normalizer.js';
import { reviewService } from '../services/review.service.js';
import { authService } from '../services/auth.service.js';
import { cacheService } from '../services/cache.service.js';

export const getAdminStats = async (req, res) => {
  try {
    const baseStats = dbService.getStats();
    
    // Aggregate live counts
    const products = Array.from(new Set(Array.from(dbService.products.values())));
    const totalReviews = reviewService.reviews.size;
    const totalAlerts = authService.alerts.size;
    const totalUsers = authService.users.size;

    res.json({
      success: true,
      data: {
        ...baseStats,
        totalReviews,
        totalAlerts,
        totalUsers,
        recentProducts: products.slice(-5).map(p => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          brand: dbService.brands.get(p.brand)?.name || p.brand,
          minPrice: p.priceSummary?.minPrice,
          overallScore: p.scores?.overall,
          isActive: p.isActive
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching admin stats' });
  }
};

export const previewNormalization = async (req, res) => {
  try {
    const { specification = {}, price = 0 } = req.body;
    
    // Normalize raw fields
    const normalizedSpec = {
      ...specification,
      display: {
        ...specification.display,
        screenSizeInches: SpecNormalizer.normalizeScreenSize(specification.display?.screenSizeInches),
        refreshRateHz: SpecNormalizer.normalizeRefreshRate(specification.display?.refreshRateHz),
        panelType: specification.display?.panelType || 'AMOLED'
      },
      hardware: {
        ...specification.hardware,
        antutuScore: Number(specification.hardware?.antutuScore) || 800000,
        chipset: specification.hardware?.chipset || 'Octa-Core Processor'
      },
      rearCamera: {
        ...specification.rearCamera,
        primaryMp: Number(specification.rearCamera?.primaryMp) || 50,
        hasOis: Boolean(specification.rearCamera?.hasOis)
      },
      battery: {
        ...specification.battery,
        capacityMah: SpecNormalizer.normalizeBattery(specification.battery?.capacityMah),
        fastChargingWatts: SpecNormalizer.normalizeChargingWatts(specification.battery?.fastChargingWatts),
        hasWirelessCharging: Boolean(specification.battery?.hasWirelessCharging),
        chargerInBox: specification.battery?.chargerInBox !== undefined ? Boolean(specification.battery?.chargerInBox) : true
      },
      connectivity: {
        ...specification.connectivity,
        has5G: Boolean(specification.connectivity?.has5G),
        bands5GCount: specification.connectivity?.bands5GCount || (specification.connectivity?.bands5G?.length || 8)
      }
    };

    // Calculate dynamic 8-axis PhonoScores
    const priceNum = Number(price) || 0;
    const scores = ScoreCalculator.calculate(normalizedSpec, priceNum);

    res.json({
      success: true,
      data: {
        normalizedSpecification: normalizedSpec,
        calculatedScores: scores
      }
    });
  } catch (error) {
    console.error('Error previewing normalization:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate normalization preview' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product, specification, variants, offers, priceHistory } = req.body;

    if (!product || !product.title) {
      return res.status(400).json({ success: false, error: 'Product title is required' });
    }

    // Auto-generate slug if not present
    if (!product.slug) {
      product.slug = product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Check duplicate slug
    if (dbService.products.has(product.slug)) {
      return res.status(400).json({
        success: false,
        error: `A smartphone with slug '${product.slug}' already exists`
      });
    }

    const scores = product.scores || ScoreCalculator.calculate(specification, variants?.[0]?.price || 0, product.category);
    const created = dbService.addProduct({
      product: { ...product, scores },
      specification,
      variants,
      offers
    });

    // Flush edge cache so new product appears in catalog instantly
    await cacheService.flushByPattern('catalog:');

    res.status(201).json({
      success: true,
      message: `Product '${product.title}' successfully ingested into PhonoWorld catalog`,
      data: created
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to create product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = dbService.updateProduct(id, updates);
    await cacheService.flushByPattern('catalog:');

    res.json({
      success: true,
      message: `Product updated successfully`,
      data: updated
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to update product' });
  }
};

export const overrideFestivePrice = async (req, res) => {
  try {
    const { productId, newPrice, sellerName, eventName } = req.body;

    if (!productId || !newPrice) {
      return res.status(400).json({
        success: false,
        error: 'productId and newPrice are required'
      });
    }

    const result = dbService.overridePrice(
      productId,
      newPrice,
      sellerName || 'Amazon India',
      eventName || 'Festive Flash Deal'
    );

    await cacheService.flushByPattern('catalog:');

    res.json({
      success: true,
      message: `Festive price override applied for ${result.product.title}`,
      data: result
    });
  } catch (error) {
    console.error('Error overriding price:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to apply price override' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = dbService.deleteProduct(id);
    await cacheService.flushByPattern('catalog:');

    res.json(result);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to delete product' });
  }
};
