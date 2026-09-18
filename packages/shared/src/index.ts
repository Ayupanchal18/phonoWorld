// ============================================================================
// PHONOWORLD CORE DOMAIN TYPES & DATA CONTRACTS
// ============================================================================

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string;
  website?: string;
  originCountry: string;
  isActive: boolean;
  productCount: number;
}

export interface ProductScore {
  overall: number;       // 0 - 100
  performance: number;   // 0 - 100
  display: number;       // 0 - 100
  camera: number;        // 0 - 100
  battery: number;       // 0 - 100
  software: number;      // 0 - 100
  build: number;         // 0 - 100
  value: number;         // 0 - 100
}

export interface PriceSummary {
  minPrice: number;
  maxPrice: number;
  defaultVariant?: string;
  hasDeals: boolean;
  lowestSellerName?: string;
  discountPercentMax?: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  brand: Brand | string;
  category: 'smartphones' | 'laptops' | 'tablets' | 'smartwatches' | 'audio';
  modelNumber?: string;
  releaseDate: string;
  status: 'announced' | 'available' | 'rumored' | 'discontinued';
  featuredImage: string;
  galleryImages: string[];
  summary: string;
  pros: string[];
  cons: string[];
  scores: ProductScore;
  priceSummary: PriceSummary;
  viewCount: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  _id: string;
  product: string;
  name: string;
  slug: string;
  ramGb: number;
  storageGb: number;
  colorName: string;
  colorHex?: string;
  sku?: string;
  eanGtin?: string;
  isDefault: boolean;
  isActive: boolean;
  offers?: Offer[];
}

export interface Specification {
  _id: string;
  product: string;
  
  display: {
    screenSizeInches: number;
    resolution: string;
    resolutionWidth: number;
    resolutionHeight: number;
    panelType: string;
    refreshRateHz: number;
    touchSamplingRateHz?: number;
    peakBrightnessNits: number;
    aspectRatio?: string;
    pixelDensityPpi?: number;
    screenProtection?: string;
    hdrSupport: string[];
    notchPunchHole?: string;
  };

  hardware: {
    chipset: string;
    cpuCores: number;
    cpuDetails?: string;
    processNodeNm?: number;
    gpu?: string;
    antutuScore?: number;
    geekbenchSingle?: number;
    geekbenchMulti?: number;
    ramType?: string;
    storageType?: string;
    expandableStorage: boolean;
  };

  rearCamera: {
    setup: string;
    primaryMp: number;
    primaryAperture?: string;
    primarySensor?: string;
    ois: boolean;
    secondaryCameras: Array<{
      type: string;
      mp: number;
      aperture?: string;
      zoomOptical?: number;
      sensor?: string;
    }>;
    flash?: string;
    videoRecording: string[];
    features: string[];
  };

  frontCamera: {
    mp: number;
    aperture?: string;
    videoRecording: string[];
  };

  battery: {
    capacityMah: number;
    type: string;
    removable: boolean;
    fastChargingWatts: number;
    wirelessCharging: boolean;
    wirelessWatts?: number;
    reverseCharging: boolean;
    chargerInBox: boolean;
  };

  connectivity: {
    has5G: boolean;
    bands5G: string[];
    bandsCount5G: number;
    volte: boolean;
    simConfiguration?: string;
    wifi?: string;
    bluetooth?: string;
    nfc: boolean;
    irBlaster: boolean;
    usbType?: string;
    headphoneJack35mm: boolean;
  };

  design: {
    heightMm?: number;
    widthMm?: number;
    thicknessMm?: number;
    weightGrams?: number;
    waterResistanceRating?: string;
    backMaterial?: string;
    frameMaterial?: string;
  };

  software: {
    operatingSystem: string;
    osVersion: string;
    customUi?: string;
    promisedOsUpdatesYears?: number;
    promisedSecurityUpdatesYears?: number;
  };

  sensors: string[];
}

export interface Seller {
  _id: string;
  name: string;
  slug: string;
  domain: string;
  logoUrl: string;
  affiliateTagParam?: string;
  isActive: boolean;
}

export interface Offer {
  _id: string;
  variant: string;
  seller: Seller | string;
  productUrl: string;
  affiliateUrl: string;
  mrp: number;
  price: number;
  effectivePrice?: number;
  discountPercent: number;
  inStock: boolean;
  couponText?: string;
  bankOfferSummary?: string;
  lastCheckedAt: string;
  isLowestEver: boolean;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  sellerName: string;
}

export interface FullProductDetail {
  product: Product;
  specification: Specification;
  variants: ProductVariant[];
  offers: Offer[];
  priceHistory: PriceHistoryPoint[];
  alternatives: Product[];
}

export interface ComparisonPayload {
  products: FullProductDetail[];
  commonSpecsCount: number;
  differingSpecsCount: number;
}

export interface PhoneFinderInput {
  budgetMin: number;
  budgetMax: number;
  weights: {
    performance: number; // 0 - 10
    camera: number;      // 0 - 10
    battery: number;     // 0 - 10
    display: number;     // 0 - 10
    build: number;       // 0 - 10
  };
  preferredBrands?: string[];
  excludedBrands?: string[];
  mustHave5G?: boolean;
  mustHaveAmoled?: boolean;
  mustHaveNfc?: boolean;
  mustHaveFastCharging?: boolean;
}

export interface RecommendationResult {
  product: Product;
  specification: Specification;
  matchPercentage: number;
  primaryWinReason: string;
  compromiseReason: string;
  calculatedScore: number;
}
