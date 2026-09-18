import mongoose from 'mongoose';

const { Schema } = mongoose;

// BRAND SCHEMA
export const BrandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  logoUrl: { type: String, required: true },
  website: { type: String },
  originCountry: { type: String, default: 'Global' },
  isActive: { type: Boolean, default: true, index: true },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

// PRODUCT SCHEMA WITH OPTIMIZED COMPOUND PRODUCTION INDEXES
export const ProductSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true, index: true },
  category: { type: String, required: true, default: 'smartphones', index: true },
  modelNumber: { type: String },
  releaseDate: { type: Date, required: true },
  status: { type: String, enum: ['announced', 'available', 'rumored', 'discontinued'], default: 'available' },
  featuredImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  summary: { type: String, required: true },
  pros: [{ type: String }],
  cons: [{ type: String }],
  scores: {
    overall: { type: Number, default: 0, index: true },
    performance: { type: Number, default: 0 },
    display: { type: Number, default: 0 },
    camera: { type: Number, default: 0 },
    battery: { type: Number, default: 0 },
    software: { type: Number, default: 0 },
    build: { type: Number, default: 0 },
    value: { type: Number, default: 0 }
  },
  priceSummary: {
    minPrice: { type: Number, index: true },
    maxPrice: { type: Number },
    defaultVariant: { type: Schema.Types.ObjectId, ref: 'ProductVariant' },
    hasDeals: { type: Boolean, default: false },
    lowestSellerName: { type: String },
    discountPercentMax: { type: Number, default: 0 }
  },
  viewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false, index: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

// Primary Catalog Exploration Index (Category + Price Filter + PhonoScore Ranking)
ProductSchema.index({ category: 1, 'priceSummary.minPrice': 1, 'scores.overall': -1 });

// Brand Catalog Filtering Index
ProductSchema.index({ brand: 1, category: 1, isActive: 1 });

// Text Search Index for Autocomplete & Search bar
ProductSchema.index({ title: 'text', summary: 'text', modelNumber: 'text' });

// PRODUCT VARIANT SCHEMA
export const ProductVariantSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  ramGb: { type: Number, required: true },
  storageGb: { type: Number, required: true },
  colorName: { type: String, required: true },
  colorHex: { type: String },
  sku: { type: String },
  eanGtin: { type: String },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// SPECIFICATION SCHEMA
export const SpecificationSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true, index: true },
  display: {
    screenSizeInches: { type: Number },
    resolution: { type: String },
    resolutionWidth: { type: Number },
    resolutionHeight: { type: Number },
    panelType: { type: String },
    refreshRateHz: { type: Number },
    touchSamplingRateHz: { type: Number },
    peakBrightnessNits: { type: Number },
    aspectRatio: { type: String },
    pixelDensityPpi: { type: Number },
    screenProtection: { type: String },
    hdrSupport: [{ type: String }],
    notchPunchHole: { type: String }
  },
  hardware: {
    chipset: { type: String },
    cpuCores: { type: Number },
    cpuDetails: { type: String },
    processNodeNm: { type: Number },
    gpu: { type: String },
    dedicatedGpu: { type: String },
    tgpWatts: { type: Number },
    antutuScore: { type: Number },
    geekbenchSingle: { type: Number },
    geekbenchMulti: { type: Number },
    ramType: { type: String },
    storageType: { type: String },
    expandableStorage: { type: Boolean, default: false }
  },
  rearCamera: {
    setup: { type: String },
    primaryMp: { type: Number },
    primaryAperture: { type: String },
    primarySensor: { type: String },
    ois: { type: Boolean, default: false },
    secondaryCameras: [{
      type: { type: String },
      mp: { type: Number },
      aperture: { type: String },
      zoomOptical: { type: Number },
      sensor: { type: String }
    }],
    flash: { type: String },
    videoRecording: [{ type: String }],
    features: [{ type: String }]
  },
  frontCamera: {
    mp: { type: Number },
    aperture: { type: String },
    videoRecording: [{ type: String }]
  },
  battery: {
    capacityMah: { type: Number },
    capacityWhr: { type: Number },
    batteryLifeHours: { type: Number },
    type: { type: String, default: 'Li-Ion' },
    fastChargingWatts: { type: Number },
    wirelessCharging: { type: Boolean, default: false },
    wirelessWatts: { type: Number },
    chargerInBox: { type: Boolean, default: true }
  },
  audio: {
    ancDb: { type: Number },
    hasActiveNoiseCanceling: { type: Boolean },
    driverDiameterMm: { type: Number },
    driverType: { type: String },
    frequencyResponse: { type: String }
  },
  health: {
    hasEcg: { type: Boolean },
    hasBloodPressure: { type: Boolean },
    hasSleepApnea: { type: Boolean },
    hasBioelectricalImpedance: { type: Boolean }
  },
  productivity: {
    bundledStylus: { type: Boolean },
    stylusLatencyMs: { type: Number },
    hasDesktopMode: { type: Boolean },
    desktopModeName: { type: String }
  },
  connectivity: {
    has5G: { type: Boolean },
    bands5G: [{ type: String }],
    bandsCount5G: { type: Number, default: 0 },
    volte: { type: Boolean, default: true },
    wifi: { type: String },
    bluetooth: { type: String },
    nfc: { type: Boolean, default: false },
    dualBandGps: { type: Boolean, default: false },
    ports: [{ type: String }],
    codecs: [{ type: String }]
  },
  design: {
    heightMm: { type: Number },
    widthMm: { type: Number },
    thicknessMm: { type: Number },
    weightGrams: { type: Number },
    weightKg: { type: Number },
    waterResistanceRating: { type: String },
    frameMaterial: { type: String },
    chassisMaterial: { type: String }
  },
  software: {
    operatingSystem: { type: String },
    osVersion: { type: String },
    customUi: { type: String },
    promisedOsUpdatesYears: { type: Number }
  }
}, { timestamps: true });

// SELLER SCHEMA
export const SellerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  domain: { type: String, required: true },
  logoUrl: { type: String, required: true },
  affiliateTagParam: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// OFFER SCHEMA
export const OfferSchema = new Schema({
  variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, index: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true, index: true },
  productUrl: { type: String, required: true },
  affiliateUrl: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true, index: true },
  effectivePrice: { type: Number },
  discountPercent: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  couponText: { type: String },
  bankOfferSummary: { type: String },
  lastCheckedAt: { type: Date, default: Date.now },
  isLowestEver: { type: Boolean, default: false }
}, { timestamps: true });

// Multi-attribute offer pricing index
OfferSchema.index({ variant: 1, price: 1, inStock: 1 });

// PRICE HISTORY SCHEMA
export const PriceHistorySchema = new Schema({
  variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, index: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  price: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now, index: true }
}, { timestamps: false });

PriceHistorySchema.index({ variant: 1, recordedAt: -1 });

export const BrandModel = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const ProductVariantModel = mongoose.models.ProductVariant || mongoose.model('ProductVariant', ProductVariantSchema);
export const SpecificationModel = mongoose.models.Specification || mongoose.model('Specification', SpecificationSchema);
export const SellerModel = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);
export const OfferModel = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
export const PriceHistoryModel = mongoose.models.PriceHistory || mongoose.model('PriceHistory', PriceHistorySchema);
