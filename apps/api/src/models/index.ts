import mongoose, { Schema } from 'mongoose';

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

// PRODUCT SCHEMA
export const ProductSchema = new Schema({
  title: { type: String, required: true, trim: true, index: 'text' },
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

ProductSchema.index({ category: 1, 'priceSummary.minPrice': 1, 'scores.overall': -1 });

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
    screenSizeInches: { type: Number, required: true },
    resolution: { type: String, required: true },
    resolutionWidth: { type: Number },
    resolutionHeight: { type: Number },
    panelType: { type: String, required: true },
    refreshRateHz: { type: Number, required: true },
    touchSamplingRateHz: { type: Number },
    peakBrightnessNits: { type: Number },
    aspectRatio: { type: String },
    pixelDensityPpi: { type: Number },
    screenProtection: { type: String },
    hdrSupport: [{ type: String }],
    notchPunchHole: { type: String }
  },
  hardware: {
    chipset: { type: String, required: true },
    cpuCores: { type: Number, required: true },
    cpuDetails: { type: String },
    processNodeNm: { type: Number },
    gpu: { type: String },
    antutuScore: { type: Number },
    geekbenchSingle: { type: Number },
    geekbenchMulti: { type: Number },
    ramType: { type: String },
    storageType: { type: String },
    expandableStorage: { type: Boolean, default: false }
  },
  rearCamera: {
    setup: { type: String, required: true },
    primaryMp: { type: Number, required: true },
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
    mp: { type: Number, required: true },
    aperture: { type: String },
    videoRecording: [{ type: String }]
  },
  battery: {
    capacityMah: { type: Number, required: true },
    type: { type: String, default: 'Li-Ion' },
    removable: { type: Boolean, default: false },
    fastChargingWatts: { type: Number },
    wirelessCharging: { type: Boolean, default: false },
    wirelessWatts: { type: Number },
    reverseCharging: { type: Boolean, default: false },
    chargerInBox: { type: Boolean, default: true }
  },
  connectivity: {
    has5G: { type: Boolean, required: true },
    bands5G: [{ type: String }],
    bandsCount5G: { type: Number, default: 0 },
    volte: { type: Boolean, default: true },
    simConfiguration: { type: String },
    wifi: { type: String },
    bluetooth: { type: String },
    nfc: { type: Boolean, default: false },
    irBlaster: { type: Boolean, default: false },
    usbType: { type: String },
    headphoneJack35mm: { type: Boolean, default: false }
  },
  design: {
    heightMm: { type: Number },
    widthMm: { type: Number },
    thicknessMm: { type: Number },
    weightGrams: { type: Number },
    waterResistanceRating: { type: String },
    backMaterial: { type: String },
    frameMaterial: { type: String }
  },
  software: {
    operatingSystem: { type: String, required: true },
    osVersion: { type: String, required: true },
    customUi: { type: String },
    promisedOsUpdatesYears: { type: Number },
    promisedSecurityUpdatesYears: { type: Number }
  },
  sensors: [{ type: String }]
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

// PRICE HISTORY SCHEMA
export const PriceHistorySchema = new Schema({
  variant: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true, index: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  price: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now, index: true }
}, { timestamps: false });

export const BrandModel = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const ProductVariantModel = mongoose.models.ProductVariant || mongoose.model('ProductVariant', ProductVariantSchema);
export const SpecificationModel = mongoose.models.Specification || mongoose.model('Specification', SpecificationSchema);
export const SellerModel = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);
export const OfferModel = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
export const PriceHistoryModel = mongoose.models.PriceHistory || mongoose.model('PriceHistory', PriceHistorySchema);
