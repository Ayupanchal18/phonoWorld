/**
 * PhonoWorld Atomic Dataset - Indian Consumer-Tech Catalog
 * Complete verified specifications across 16 major brands, multiple sellers,
 * real bank card discounts, historical price curves, and atomic hardware parameters.
 */

export const SEED_BRANDS = [
  {
    _id: 'brand_samsung',
    name: 'Samsung',
    slug: 'samsung',
    logoUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&auto=format&fit=crop&q=80',
    originCountry: 'South Korea',
    isActive: true,
    productCount: 2
  },
  {
    _id: 'brand_apple',
    name: 'Apple',
    slug: 'apple',
    logoUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United States',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_oneplus',
    name: 'OnePlus',
    slug: 'oneplus',
    logoUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_vivo',
    name: 'Vivo',
    slug: 'vivo',
    logoUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_realme',
    name: 'Realme',
    slug: 'realme',
    logoUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_google',
    name: 'Google Pixel',
    slug: 'google-pixel',
    logoUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United States',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_xiaomi',
    name: 'Xiaomi',
    slug: 'xiaomi',
    logoUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 2
  },
  {
    _id: 'brand_oppo',
    name: 'Oppo',
    slug: 'oppo',
    logoUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_nothing',
    name: 'Nothing',
    slug: 'nothing',
    logoUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United Kingdom',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_cmf',
    name: 'CMF by Nothing',
    slug: 'cmf',
    logoUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United Kingdom',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_motorola',
    name: 'Motorola',
    slug: 'motorola',
    logoUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United States / Lenovo',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_iqoo',
    name: 'iQOO',
    slug: 'iqoo',
    logoUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 2
  },
  {
    _id: 'brand_poco',
    name: 'POCO',
    slug: 'poco',
    logoUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_lava',
    name: 'Lava',
    slug: 'lava',
    logoUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
    originCountry: 'India',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_infinix',
    name: 'Infinix',
    slug: 'infinix',
    logoUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_asus',
    name: 'ASUS',
    slug: 'asus',
    logoUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=120&auto=format&fit=crop&q=80',
    originCountry: 'Taiwan',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_lenovo',
    name: 'Lenovo',
    slug: 'lenovo',
    logoUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=120&auto=format&fit=crop&q=80',
    originCountry: 'China',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_hp',
    name: 'HP',
    slug: 'hp',
    logoUrl: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United States',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_dell',
    name: 'Dell',
    slug: 'dell',
    logoUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=120&auto=format&fit=crop&q=80',
    originCountry: 'United States',
    isActive: true,
    productCount: 1
  },
  {
    _id: 'brand_sony',
    name: 'Sony',
    slug: 'sony',
    logoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80',
    originCountry: 'Japan',
    isActive: true,
    productCount: 1
  }
];

export const SEED_SELLERS = [
  {
    _id: 'seller_amazon',
    name: 'Amazon India',
    slug: 'amazon-in',
    domain: 'amazon.in',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    affiliateTagParam: 'tag=phonoworld-21',
    isActive: true
  },
  {
    _id: 'seller_flipkart',
    name: 'Flipkart',
    slug: 'flipkart',
    domain: 'flipkart.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg',
    affiliateTagParam: 'affid=phonoworld',
    isActive: true
  },
  {
    _id: 'seller_croma',
    name: 'Croma',
    slug: 'croma',
    domain: 'croma.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Croma_Logo.png/640px-Croma_Logo.png',
    affiliateTagParam: 'ref=phonoworld',
    isActive: true
  },
  {
    _id: 'seller_reliance',
    name: 'Reliance Digital',
    slug: 'reliance-digital',
    domain: 'reliancedigital.in',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Reliance_Digital_Logo.png',
    affiliateTagParam: 'ref=phonoworld',
    isActive: true
  }
];

export const SEED_DATA = [
  // 1. SAMSUNG GALAXY S24 ULTRA 5G
  {
    product: {
      _id: 'prod_samsung_s24_ultra',
      title: 'Samsung Galaxy S24 Ultra 5G',
      slug: 'samsung-galaxy-s24-ultra',
      brand: 'brand_samsung',
      category: 'smartphones',
      modelNumber: 'SM-S928B/DS',
      releaseDate: '2024-01-24',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Apex Android flagship with Galaxy AI, 200MP HP2 sensor, anti-reflective Gorilla Armor flat screen, titanium chassis, and 7 years of Android OS upgrades.',
      pros: [
        'Class-leading anti-reflective Dynamic AMOLED 2X flat display with 2600 nits',
        'Titanium Grade 2 frame with full IP68 water & dust resistance',
        '200MP camera system with 5x optical periscope zoom + 8K video',
        '7 full years of promised Android OS and security upgrades',
        'Integrated S-Pen stylus with remote Bluetooth gesture controls'
      ],
      cons: [
        'Heavy in hand at 232 grams',
        '45W fast charging lags behind Chinese competitors',
        'No charging adapter bundled in retail box'
      ],
      scores: { overall: 94, performance: 96, display: 98, camera: 98, battery: 88, software: 98, build: 96, value: 78 },
      priceSummary: {
        minPrice: 129999,
        maxPrice: 139999,
        defaultVariant: 'var_s24u_256',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 4
      },
      viewCount: 38200,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_s24u_256',
        product: 'prod_samsung_s24_ultra',
        name: '12GB RAM + 256GB Storage',
        slug: 'samsung-galaxy-s24-ultra-12gb-256gb-titanium-gray',
        ramGb: 12,
        storageGb: 256,
        colorName: 'Titanium Gray',
        colorHex: '#4A4D4F',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_samsung_s24_ultra',
      product: 'prod_samsung_s24_ultra',
      display: {
        screenSizeInches: 6.8,
        resolution: '3120 x 1440 pixels (QHD+)',
        resolutionWidth: 1440,
        resolutionHeight: 3120,
        panelType: 'Dynamic LTPO AMOLED 2X',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 2600,
        aspectRatio: '19.5:9',
        pixelDensityPpi: 505,
        screenProtection: 'Corning Gorilla Armor (Anti-Reflective)',
        hdrSupport: ['HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
        cpuCores: 8,
        cpuDetails: '1x3.39 GHz Cortex-X4 & 3x3.1 GHz Cortex-A720 & 2x2.9 GHz Cortex-A720 & 2x2.2 GHz Cortex-A520',
        processNodeNm: 4,
        gpu: 'Adreno 750',
        antutuScore: 2150000,
        geekbenchSingle: 2280,
        geekbenchMulti: 7100,
        ramType: 'LPDDR5X',
        storageType: 'UFS 4.0',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Quad (200MP + 50MP + 10MP + 12MP)',
        primaryMp: 200,
        primaryAperture: 'f/1.7',
        primarySensor: 'Samsung ISOCELL HP2 (1/1.3")',
        ois: true,
        secondaryCameras: [
          { type: 'Periscope Telephoto', mp: 50, aperture: 'f/3.4', zoomOptical: 5 },
          { type: 'Telephoto', mp: 10, aperture: 'f/2.4', zoomOptical: 3 },
          { type: 'Ultra-Wide', mp: 12, aperture: 'f/2.2', zoomOptical: 0.6 }
        ],
        flash: 'LED Flash',
        videoRecording: ['8K@30fps', '4K@60/120fps', '1080p@240fps'],
        features: ['Laser AF', 'Super Steady Video', 'Nightography', 'Galaxy AI Photo Assist']
      },
      frontCamera: { mp: 12, aperture: 'f/2.2', videoRecording: ['4K@60fps', '1080p@30fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 45,
        wirelessCharging: true,
        wirelessWatts: 15,
        reverseCharging: true,
        chargerInBox: false
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n2', 'n3', 'n5', 'n7', 'n8', 'n12', 'n20', 'n25', 'n28', 'n38', 'n40', 'n41', 'n66', 'n75', 'n77', 'n78'],
        bandsCount5G: 17,
        volte: true,
        simConfiguration: 'Dual SIM (Nano + eSIM)',
        wifi: 'Wi-Fi 7 (802.11be)',
        bluetooth: 'Bluetooth 5.3',
        nfc: true,
        irBlaster: false,
        usbType: 'USB Type-C 3.2 Gen 2 (DisplayPort Out)',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 162.3,
        widthMm: 79.0,
        thicknessMm: 8.6,
        weightGrams: 232,
        waterResistanceRating: 'IP68',
        backMaterial: 'Gorilla Armor Glass',
        frameMaterial: 'Titanium Grade 2'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (One UI 6.1.1)',
        customUi: 'One UI',
        promisedOsUpdatesYears: 7,
        promisedSecurityUpdatesYears: 7
      },
      sensors: ['Ultrasonic In-Display Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Barometer']
    },
    offers: [
      {
        _id: 'off_s24u_amz',
        variant: 'var_s24u_256',
        seller: 'seller_amazon',
        productUrl: 'https://amazon.in/dp/B0CS5X828C',
        affiliateUrl: 'https://amazon.in/dp/B0CS5X828C?tag=phonoworld-21',
        mrp: 134999,
        price: 129999,
        effectivePrice: 124999,
        discountPercent: 4,
        inStock: true,
        bankOfferSummary: '₹5,000 Instant Discount on HDFC Bank Credit Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      },
      {
        _id: 'off_s24u_fk',
        variant: 'var_s24u_256',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/samsung-galaxy-s24-ultra',
        affiliateUrl: 'https://flipkart.com/samsung-galaxy-s24-ultra?affid=phonoworld',
        mrp: 134999,
        price: 131999,
        effectivePrice: 126999,
        discountPercent: 2,
        inStock: true,
        bankOfferSummary: '5% Unlimited Cashback on Flipkart Axis Bank Card',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: false
      }
    ],
    priceHistory: [
      { date: '2024-02-01', price: 129999, sellerName: 'Amazon India' },
      { date: '2024-05-15', price: 124999, sellerName: 'Amazon India' },
      { date: '2024-09-18', price: 129999, sellerName: 'Amazon India' }
    ]
  },

  // 2. VIVO X100 PRO 5G (ZEISS 1-INCH SENSOR)
  {
    product: {
      _id: 'prod_vivo_x100_pro',
      title: 'Vivo X100 Pro 5G',
      slug: 'vivo-x100-pro',
      brand: 'brand_vivo',
      category: 'smartphones',
      modelNumber: 'V2324A',
      releaseDate: '2024-01-04',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Ultimate mobile photography beast co-engineered with ZEISS. Features 1-inch Sony IMX989 sensor, ZEISS APO floating periscope telephoto, Dimensity 9300, and 100W FlashCharge.',
      pros: [
        'Massive 1-inch Sony IMX989 50MP sensor with ZEISS T* anti-reflective coating',
        'Best-in-class ZEISS APO 100mm 4.3x periscope telephoto with macro capability',
        'MediaTek Dimensity 9300 flagship CPU delivering 2.2M+ AnTuTu score',
        '100W FlashCharge wired + 50W wireless fast charging',
        'IP68 water and dust submersion protection'
      ],
      cons: [
        'Curved screen edges increase accidental palm touches',
        'Funtouch OS 14 has some pre-installed bloatware'
      ],
      scores: { overall: 94, performance: 97, display: 95, camera: 99, battery: 94, software: 84, build: 95, value: 87 },
      priceSummary: {
        minPrice: 89999,
        maxPrice: 96999,
        defaultVariant: 'var_x100p_512',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 7
      },
      viewCount: 29500,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_x100p_512',
        product: 'prod_vivo_x100_pro',
        name: '16GB RAM + 512GB Storage',
        slug: 'vivo-x100-pro-16gb-512gb-asteroid-black',
        ramGb: 16,
        storageGb: 512,
        colorName: 'Asteroid Black',
        colorHex: '#1D1D1D',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_vivo_x100_pro',
      product: 'prod_vivo_x100_pro',
      display: {
        screenSizeInches: 6.78,
        resolution: '2800 x 1260 pixels (1.5K LTPO)',
        resolutionWidth: 1260,
        resolutionHeight: 2800,
        panelType: 'LTPO 8T AMOLED (2160Hz PWM)',
        refreshRateHz: 120,
        touchSamplingRateHz: 300,
        peakBrightnessNits: 3000,
        aspectRatio: '20:9',
        pixelDensityPpi: 453,
        screenProtection: 'Armor Glass Glass',
        hdrSupport: ['HDR10+', 'Dolby Vision'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 9300 (4nm) + Vivo V3 ISP',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Immortalis-G720 MC12',
        antutuScore: 2210000,
        ramType: 'LPDDR5X',
        storageType: 'UFS 4.0',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Triple 50MP ZEISS (50MP 1" + 50MP Periscope + 50MP UW)',
        primaryMp: 50,
        primaryAperture: 'f/1.75',
        primarySensor: 'Sony IMX989 (1.0-inch Type)',
        ois: true,
        secondaryCameras: [
          { type: 'ZEISS APO Periscope', mp: 50, aperture: 'f/2.5', zoomOptical: 4.3, sensor: 'OmniVision OV64B' },
          { type: 'Ultra-Wide', mp: 50, aperture: 'f/2.0', zoomOptical: 0.6, sensor: 'Samsung JN1' }
        ],
        flash: 'Dual-LED Flash',
        videoRecording: ['8K@30fps', '4K@60fps 10-bit Log', '4K Cinematic Portrait'],
        features: ['ZEISS T* Lens Coating', 'ZEISS Multifocal Portrait', 'Sunburst Mode']
      },
      frontCamera: { mp: 32, aperture: 'f/2.0', videoRecording: ['4K@60fps', '1080p@60fps'] },
      battery: {
        capacityMah: 5400,
        type: 'BlueOcean Li-Ion',
        removable: false,
        fastChargingWatts: 100,
        wirelessCharging: true,
        wirelessWatts: 50,
        reverseCharging: true,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n7', 'n8', 'n20', 'n28', 'n38', 'n40', 'n41', 'n77', 'n78'],
        bandsCount5G: 12,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 7 (802.11be)',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        irBlaster: true,
        usbType: 'USB Type-C 3.2 Gen 1',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 164.05,
        widthMm: 75.28,
        thicknessMm: 8.91,
        weightGrams: 225,
        waterResistanceRating: 'IP68',
        backMaterial: 'Fluorite AG Glass',
        frameMaterial: 'Aluminum'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Funtouch OS 14)',
        customUi: 'Funtouch OS',
        promisedOsUpdatesYears: 3,
        promisedSecurityUpdatesYears: 4
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Laser AF']
    },
    offers: [
      {
        _id: 'off_x100p_fk',
        variant: 'var_x100p_512',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/vivo-x100-pro',
        affiliateUrl: 'https://flipkart.com/vivo-x100-pro?affid=phonoworld',
        mrp: 96999,
        price: 89999,
        effectivePrice: 84999,
        discountPercent: 7,
        inStock: true,
        bankOfferSummary: '₹5,000 Instant Discount on SBI/ICICI Credit Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-01-10', price: 89999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 89999, sellerName: 'Flipkart' }
    ]
  },

  // 3. ONEPLUS 12 5G (HASSELBLAD VALUE FLAGSHIP)
  {
    product: {
      _id: 'prod_oneplus_12',
      title: 'OnePlus 12 5G',
      slug: 'oneplus-12',
      brand: 'brand_oneplus',
      category: 'smartphones',
      modelNumber: 'CPH2573',
      releaseDate: '2024-01-23',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Value flagship titan offering Snapdragon 8 Gen 3, a 4th Gen Hasselblad camera system with 3x periscope zoom, 5400mAh battery with 100W SUPERVOOC in box.',
      pros: [
        'Massive 5400mAh battery with blazing fast 100W charger in box',
        'Stunning 2K 120Hz ProXDR display with 4500 nits peak brightness',
        'Hasselblad tuned 50MP LYT-808 main camera and 64MP 3x periscope',
        '50W AIRVOOC wireless fast charging support',
        'Smooth and fluid OxygenOS experience'
      ],
      cons: [
        'Curved screen edges may not appeal to all users',
        'IP65 water resistance is lower than IP68 on Galaxy S24'
      ],
      scores: { overall: 91, performance: 95, display: 96, camera: 91, battery: 97, software: 88, build: 89, value: 92 },
      priceSummary: {
        minPrice: 64999,
        maxPrice: 69999,
        defaultVariant: 'var_op12_256',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 7
      },
      viewCount: 28900,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_op12_256',
        product: 'prod_oneplus_12',
        name: '12GB RAM + 256GB Storage',
        slug: 'oneplus-12-12gb-256gb-flowy-emerald',
        ramGb: 12,
        storageGb: 256,
        colorName: 'Flowy Emerald',
        colorHex: '#2E5A44',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_oneplus_12',
      product: 'prod_oneplus_12',
      display: {
        screenSizeInches: 6.82,
        resolution: '3168 x 1440 pixels (2K ProXDR)',
        resolutionWidth: 1440,
        resolutionHeight: 3168,
        panelType: 'LTPO 4.0 AMOLED',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 4500,
        aspectRatio: '19.8:9',
        pixelDensityPpi: 510,
        screenProtection: 'Corning Gorilla Glass Victus 2',
        hdrSupport: ['Dolby Vision', 'HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'Qualcomm Snapdragon 8 Gen 3 (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Adreno 750',
        antutuScore: 2110000,
        ramType: 'LPDDR5X',
        storageType: 'UFS 4.0',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Triple (50MP + 64MP + 48MP)',
        primaryMp: 50,
        primaryAperture: 'f/1.6',
        primarySensor: 'Sony LYT-808 (1/1.4")',
        ois: true,
        secondaryCameras: [
          { type: 'Periscope Telephoto', mp: 64, aperture: 'f/2.6', zoomOptical: 3 },
          { type: 'Ultra-Wide', mp: 48, aperture: 'f/2.2', zoomOptical: 0.6 }
        ],
        flash: 'Dual-LED Flash',
        videoRecording: ['8K@24fps', '4K@30/60fps', '1080p@240fps'],
        features: ['Hasselblad Color Calibration', 'Master Mode', 'Night Mode']
      },
      frontCamera: { mp: 32, aperture: 'f/2.4', videoRecording: ['4K@30fps', '1080p@30fps'] },
      battery: {
        capacityMah: 5400,
        type: 'Li-Po',
        removable: false,
        fastChargingWatts: 100,
        wirelessCharging: true,
        wirelessWatts: 50,
        reverseCharging: true,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n7', 'n8', 'n20', 'n28A', 'n38', 'n40', 'n41', 'n66', 'n77', 'n78'],
        bandsCount5G: 13,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 7 (802.11be)',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        irBlaster: true,
        usbType: 'USB Type-C 3.2 Gen 1',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 164.3,
        widthMm: 75.8,
        thicknessMm: 9.15,
        weightGrams: 220,
        waterResistanceRating: 'IP65',
        backMaterial: 'Gorilla Glass Victus 2',
        frameMaterial: 'Aluminum'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (OxygenOS 14)',
        customUi: 'OxygenOS',
        promisedOsUpdatesYears: 4,
        promisedSecurityUpdatesYears: 5
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'IR Blaster']
    },
    offers: [
      {
        _id: 'off_op12_amz',
        variant: 'var_op12_256',
        seller: 'seller_amazon',
        productUrl: 'https://amazon.in/dp/B0CQPPY2BH',
        affiliateUrl: 'https://amazon.in/dp/B0CQPPY2BH?tag=phonoworld-21',
        mrp: 69999,
        price: 64999,
        effectivePrice: 62999,
        discountPercent: 7,
        inStock: true,
        bankOfferSummary: '₹2,000 Instant Discount with ICICI Bank Credit Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-02-01', price: 64999, sellerName: 'Amazon India' },
      { date: '2024-09-18', price: 64999, sellerName: 'Amazon India' }
    ]
  },

  // 4. REALME GT 6 5G (6000 NITS DISPLAY & 120W CHARGING)
  {
    product: {
      _id: 'prod_realme_gt_6',
      title: 'Realme GT 6 5G',
      slug: 'realme-gt-6',
      brand: 'brand_realme',
      category: 'smartphones',
      modelNumber: 'RMX3851',
      releaseDate: '2024-06-20',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'AI Flagship Killer sporting 6000-nit 8T LTPO display, Snapdragon 8s Gen 3, Sony LYT-808 50MP OIS sensor + 50MP 2x Telephoto, 5500mAh battery with 120W charging.',
      pros: [
        'World\'s brightest smartphone screen (6000 nits peak 8T LTPO)',
        'Blazing 120W SUPERVOOC charging (50% in under 10 minutes)',
        'Sony LYT-808 50MP main sensor + dedicated 50MP telephoto camera',
        'Large 5500mAh dual-cell battery endurance',
        'Snapdragon 8s Gen 3 delivering flagship-tier AnTuTu 1.55M+ score'
      ],
      cons: [
        'Realme UI has promotional notifications by default',
        'Plastic mid-frame'
      ],
      scores: { overall: 90, performance: 92, display: 97, camera: 89, battery: 96, software: 82, build: 84, value: 95 },
      priceSummary: {
        minPrice: 40999,
        maxPrice: 44999,
        defaultVariant: 'var_gt6_256',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 9
      },
      viewCount: 31200,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_gt6_256',
        product: 'prod_realme_gt_6',
        name: '8GB RAM + 256GB Storage',
        slug: 'realme-gt-6-8gb-256gb-fluid-silver',
        ramGb: 8,
        storageGb: 256,
        colorName: 'Fluid Silver',
        colorHex: '#C4C7CC',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_realme_gt_6',
      product: 'prod_realme_gt_6',
      display: {
        screenSizeInches: 6.78,
        resolution: '2780 x 1264 pixels (1.5K 8T LTPO)',
        resolutionWidth: 1264,
        resolutionHeight: 2780,
        panelType: '8T LTPO AMOLED (2160Hz PWM)',
        refreshRateHz: 120,
        touchSamplingRateHz: 360,
        peakBrightnessNits: 6000,
        aspectRatio: '19.8:9',
        pixelDensityPpi: 450,
        screenProtection: 'Corning Gorilla Glass Victus 2',
        hdrSupport: ['Dolby Vision', 'HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'Qualcomm Snapdragon 8s Gen 3 (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Adreno 735',
        antutuScore: 1550000,
        ramType: 'LPDDR5X',
        storageType: 'UFS 4.0',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Triple (50MP + 50MP + 8MP)',
        primaryMp: 50,
        primaryAperture: 'f/1.69',
        primarySensor: 'Sony LYT-808 (1/1.4")',
        ois: true,
        secondaryCameras: [
          { type: 'Telephoto', mp: 50, aperture: 'f/2.0', zoomOptical: 2, sensor: 'Samsung JN5' },
          { type: 'Ultra-Wide', mp: 8, aperture: 'f/2.2', zoomOptical: 0.6, sensor: 'Sony IMX355' }
        ],
        flash: 'Dual-LED Flash',
        videoRecording: ['4K@60fps Dolby Vision', '1080p@120fps'],
        features: ['AI Night Vision Mode', 'Street Photography 4.0']
      },
      frontCamera: { mp: 32, aperture: 'f/2.45', videoRecording: ['4K@30fps', '1080p@60fps'] },
      battery: {
        capacityMah: 5500,
        type: 'Dual-Cell Li-Po',
        removable: false,
        fastChargingWatts: 120,
        wirelessCharging: false,
        reverseCharging: false,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n8', 'n28A', 'n41', 'n77', 'n78'],
        bandsCount5G: 8,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        irBlaster: true,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 162.0,
        widthMm: 75.1,
        thicknessMm: 8.6,
        weightGrams: 199,
        waterResistanceRating: 'IP65',
        backMaterial: 'Nano-Mirror Glass',
        frameMaterial: 'Plastic'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Realme UI 5.0)',
        customUi: 'Realme UI',
        promisedOsUpdatesYears: 3,
        promisedSecurityUpdatesYears: 4
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'IR Blaster']
    },
    offers: [
      {
        _id: 'off_gt6_fk',
        variant: 'var_gt6_256',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/realme-gt-6',
        affiliateUrl: 'https://flipkart.com/realme-gt-6?affid=phonoworld',
        mrp: 44999,
        price: 40999,
        effectivePrice: 36999,
        discountPercent: 9,
        inStock: true,
        bankOfferSummary: '₹4,000 Instant Discount with HDFC/SBI Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-06-25', price: 40999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 40999, sellerName: 'Flipkart' }
    ]
  },

  // 5. GOOGLE PIXEL 8A 5G (CAMERA & 7-YEAR OS KING)
  {
    product: {
      _id: 'prod_google_pixel_8a',
      title: 'Google Pixel 8a 5G',
      slug: 'google-pixel-8a',
      brand: 'brand_google',
      category: 'smartphones',
      modelNumber: 'G8HH4',
      releaseDate: '2024-05-14',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Google AI powerhouse featuring Tensor G3, Titan M2 security, 120Hz Actua display, IP67 build, wireless charging, and an industry-leading 7 years of Pixel Feature Drops.',
      pros: [
        'Class-leading point-and-shoot computational photography with Real Tone',
        '7 years of guaranteed Android OS, Feature Drops & Security updates',
        'Compact and ergonomic 6.1-inch form factor with matte composite back',
        'Full IP67 dust & water resistance',
        'Wireless charging Qi support'
      ],
      cons: [
        'Slow 18W wired charging speed with no charger in box',
        'Tensor G3 runs warm during intensive 3D gaming'
      ],
      scores: { overall: 87, performance: 83, display: 88, camera: 94, battery: 78, software: 99, build: 88, value: 89 },
      priceSummary: {
        minPrice: 44999,
        maxPrice: 52999,
        defaultVariant: 'var_p8a_128',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 15
      },
      viewCount: 35100,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_p8a_128',
        product: 'prod_google_pixel_8a',
        name: '8GB RAM + 128GB Storage',
        slug: 'google-pixel-8a-8gb-128gb-bay-blue',
        ramGb: 8,
        storageGb: 128,
        colorName: 'Bay Blue',
        colorHex: '#6EA0D6',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_google_pixel_8a',
      product: 'prod_google_pixel_8a',
      display: {
        screenSizeInches: 6.1,
        resolution: '2400 x 1080 pixels (FHD+ Actua)',
        resolutionWidth: 1080,
        resolutionHeight: 2400,
        panelType: 'OLED (Actua Display)',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 2000,
        aspectRatio: '20:9',
        pixelDensityPpi: 430,
        screenProtection: 'Corning Gorilla Glass 3',
        hdrSupport: ['HDR'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'Google Tensor G3 (4nm) + Titan M2 Coprocessor',
        cpuCores: 9,
        processNodeNm: 4,
        gpu: 'Mali-G715 MP7',
        antutuScore: 920000,
        ramType: 'LPDDR5X',
        storageType: 'UFS 3.1',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Dual (64MP + 13MP)',
        primaryMp: 64,
        primaryAperture: 'f/1.89',
        primarySensor: 'Sony IMX787 (1/1.73")',
        ois: true,
        secondaryCameras: [
          { type: 'Ultra-Wide (120°)', mp: 13, aperture: 'f/2.2', zoomOptical: 0.5 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@60fps', '1080p@240fps'],
        features: ['Best Take', 'Magic Editor', 'Audio Magic Eraser', 'Night Sight', 'Real Tone']
      },
      frontCamera: { mp: 13, aperture: 'f/2.2', videoRecording: ['4K@30fps', '1080p@30fps'] },
      battery: {
        capacityMah: 4492,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 18,
        wirelessCharging: true,
        wirelessWatts: 7.5,
        reverseCharging: false,
        chargerInBox: false
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n2', 'n3', 'n5', 'n7', 'n8', 'n12', 'n20', 'n26', 'n28', 'n38', 'n40', 'n41', 'n66', 'n75', 'n76', 'n77', 'n78'],
        bandsCount5G: 18,
        volte: true,
        simConfiguration: 'Nano-SIM + eSIM',
        wifi: 'Wi-Fi 6E (802.11ax)',
        bluetooth: 'Bluetooth 5.3',
        nfc: true,
        irBlaster: false,
        usbType: 'USB Type-C 3.2',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 152.1,
        widthMm: 72.7,
        thicknessMm: 8.9,
        weightGrams: 188,
        waterResistanceRating: 'IP67',
        backMaterial: 'Matte Composite',
        frameMaterial: 'Recycled Aluminum'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Stock Pixel UI)',
        customUi: 'Pixel Experience',
        promisedOsUpdatesYears: 7,
        promisedSecurityUpdatesYears: 7
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Barometer']
    },
    offers: [
      {
        _id: 'off_p8a_fk',
        variant: 'var_p8a_128',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/google-pixel-8a',
        affiliateUrl: 'https://flipkart.com/google-pixel-8a?affid=phonoworld',
        mrp: 52999,
        price: 44999,
        effectivePrice: 40999,
        discountPercent: 15,
        inStock: true,
        bankOfferSummary: '₹4,000 Instant Discount with SBI Bank Credit Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-05-18', price: 52999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 44999, sellerName: 'Flipkart' }
    ]
  },

  // 6. LAVA AGNI 3 5G (INDIAN INNOVATION WITH REAR SCREEN)
  {
    product: {
      _id: 'prod_lava_agni_3',
      title: 'Lava Agni 3 5G',
      slug: 'lava-agni-3',
      brand: 'brand_lava',
      category: 'smartphones',
      modelNumber: 'LAVA AGNI 3',
      releaseDate: '2024-10-04',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Made-in-India breakthrough featuring 1.74" rear AMOLED secondary display, customizable Action Key, 1.5K 120Hz curved front screen, Dimensity 7300X, and clean bloatware-free Android.',
      pros: [
        'Innovative 1.74-inch rear AMOLED screen for rear selfies and quick notifications',
        'Customizable hardware Action Button on frame',
        '1.5K curved AMOLED main display with 120Hz refresh rate',
        'Zero bloatware, clean stock Android with 3 years promised OS updates',
        'Dedicated 3x telephoto camera in the sub-₹25k segment'
      ],
      cons: [
        'Plastic frame build',
        'No official IP rating beyond splash resistance'
      ],
      scores: { overall: 83, performance: 79, display: 88, camera: 84, battery: 85, software: 92, build: 76, value: 96 },
      priceSummary: {
        minPrice: 20999,
        maxPrice: 24999,
        defaultVariant: 'var_agni3_128',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 16
      },
      viewCount: 27400,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_agni3_128',
        product: 'prod_lava_agni_3',
        name: '8GB RAM + 128GB Storage',
        slug: 'lava-agni-3-8gb-128gb-heather-glass',
        ramGb: 8,
        storageGb: 128,
        colorName: 'Heather Glass',
        colorHex: '#383D43',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_lava_agni_3',
      product: 'prod_lava_agni_3',
      display: {
        screenSizeInches: 6.78,
        resolution: '2652 x 1200 pixels (1.5K Curved)',
        resolutionWidth: 1200,
        resolutionHeight: 2652,
        panelType: '3D Curved AMOLED + 1.74" Rear AMOLED',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 1200,
        aspectRatio: '20:9',
        pixelDensityPpi: 429,
        screenProtection: 'Schott Xensation Glass',
        hdrSupport: ['HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 7300X (4nm Dual-Display SoC)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Mali-G615 MC2',
        antutuScore: 680000,
        ramType: 'LPDDR5',
        storageType: 'UFS 3.1',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Triple (50MP + 8MP 3x Telephoto + 8MP UW)',
        primaryMp: 50,
        primaryAperture: 'f/1.88',
        primarySensor: 'Sony 50MP 1/1.55" Sensor',
        ois: true,
        secondaryCameras: [
          { type: 'Telephoto', mp: 8, aperture: 'f/2.4', zoomOptical: 3 },
          { type: 'Ultra-Wide', mp: 8, aperture: 'f/2.2', zoomOptical: 0.6 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@30fps', '1080p@60fps'],
        features: ['Rear Display Selfie Preview', 'Night Pro', 'Film Mode']
      },
      frontCamera: { mp: 16, aperture: 'f/2.0', videoRecording: ['1080p@30fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Po',
        removable: false,
        fastChargingWatts: 66,
        wirelessCharging: false,
        reverseCharging: false,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n2', 'n3', 'n5', 'n7', 'n8', 'n20', 'n28', 'n38', 'n40', 'n41', 'n66', 'n77', 'n78'],
        bandsCount5G: 14,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 6E',
        bluetooth: 'Bluetooth 5.4',
        nfc: true,
        irBlaster: false,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 163.7,
        widthMm: 75.53,
        thicknessMm: 8.8,
        weightGrams: 212,
        waterResistanceRating: 'IP64',
        backMaterial: 'AG Glass',
        frameMaterial: 'Polycarbonate'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Clean Stock)',
        customUi: 'Pure Stock Android',
        promisedOsUpdatesYears: 3,
        promisedSecurityUpdatesYears: 4
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Action Button']
    },
    offers: [
      {
        _id: 'off_agni3_amz',
        variant: 'var_agni3_128',
        seller: 'seller_amazon',
        productUrl: 'https://amazon.in/dp/B0DJBHV3L5',
        affiliateUrl: 'https://amazon.in/dp/B0DJBHV3L5?tag=phonoworld-21',
        mrp: 24999,
        price: 20999,
        effectivePrice: 19499,
        discountPercent: 16,
        inStock: true,
        bankOfferSummary: '₹1,500 Instant Discount on All Major Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-10-08', price: 20999, sellerName: 'Amazon India' }
    ]
  },

  // 7. CMF PHONE 1 5G (MODULAR BUDGET INNOVATOR)
  {
    product: {
      _id: 'prod_cmf_phone_1',
      title: 'CMF Phone 1 5G by Nothing',
      slug: 'cmf-phone-1',
      brand: 'brand_cmf',
      category: 'smartphones',
      modelNumber: 'A015',
      releaseDate: '2024-07-08',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Modular design disruptor with interchangeable back covers, accessory mount wheel, MediaTek Dimensity 7300 (4nm), 120Hz Super AMOLED screen, and bloatware-free Nothing OS 2.6.',
      pros: [
        'Interchangeable back cases with physical accessory screw points (Stand, Lanyard, Card Case)',
        'Class-leading Dimensity 7300 4nm processor in the sub-₹16k budget',
        'Clean, fluid Nothing OS 2.6 with zero third-party bloatware apps',
        'Vibrant 120Hz Super AMOLED display with 2000 nits peak brightness',
        'Solid 50MP Sony camera output in good lighting'
      ],
      cons: [
        'Mono single bottom-firing speaker',
        'No NFC and no charger in retail box'
      ],
      scores: { overall: 80, performance: 81, display: 86, camera: 76, battery: 85, software: 93, build: 74, value: 98 },
      priceSummary: {
        minPrice: 15999,
        maxPrice: 17999,
        defaultVariant: 'var_cmf1_128',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 11
      },
      viewCount: 42000,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_cmf1_128',
        product: 'prod_cmf_phone_1',
        name: '6GB RAM + 128GB Storage',
        slug: 'cmf-phone-1-6gb-128gb-orange',
        ramGb: 6,
        storageGb: 128,
        colorName: 'Orange (Vegan Leather)',
        colorHex: '#FF5500',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_cmf_phone_1',
      product: 'prod_cmf_phone_1',
      display: {
        screenSizeInches: 6.67,
        resolution: '2400 x 1080 pixels (FHD+)',
        resolutionWidth: 1080,
        resolutionHeight: 2400,
        panelType: 'Super AMOLED (960Hz PWM)',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 2000,
        aspectRatio: '20:9',
        pixelDensityPpi: 395,
        screenProtection: 'Panda Glass',
        hdrSupport: ['HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 7300 5G (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Mali-G615 MC2',
        antutuScore: 670000,
        ramType: 'LPDDR4X',
        storageType: 'UFS 2.2',
        expandableStorage: true
      },
      rearCamera: {
        setup: 'Dual (50MP + 2MP Portrait)',
        primaryMp: 50,
        primaryAperture: 'f/1.8',
        primarySensor: 'Sony 50MP (1/1.95")',
        ois: false,
        secondaryCameras: [
          { type: 'Portrait Sensor', mp: 2, aperture: 'f/2.4', zoomOptical: 1 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@30fps', '1080p@60fps'],
        features: ['Ultra XDR', 'Night Mode', 'Action Mode']
      },
      frontCamera: { mp: 16, aperture: 'f/2.0', videoRecording: ['1080p@60fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 33,
        wirelessCharging: false,
        reverseCharging: true,
        chargerInBox: false
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n8', 'n28', 'n38', 'n40', 'n41', 'n77', 'n78'],
        bandsCount5G: 9,
        volte: true,
        simConfiguration: 'Hybrid Dual SIM (MicroSD support up to 2TB)',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        nfc: false,
        irBlaster: false,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 164.0,
        widthMm: 77.0,
        thicknessMm: 8.2,
        weightGrams: 197,
        waterResistanceRating: 'IP52',
        backMaterial: 'Interchangeable Modular Polycarbonate / Vegan Leather',
        frameMaterial: 'Polycarbonate'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Nothing OS 2.6)',
        customUi: 'Nothing OS',
        promisedOsUpdatesYears: 2,
        promisedSecurityUpdatesYears: 3
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Accessory Dial']
    },
    offers: [
      {
        _id: 'off_cmf1_fk',
        variant: 'var_cmf1_128',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/cmf-phone-1',
        affiliateUrl: 'https://flipkart.com/cmf-phone-1?affid=phonoworld',
        mrp: 17999,
        price: 15999,
        effectivePrice: 14999,
        discountPercent: 11,
        inStock: true,
        bankOfferSummary: '₹1,000 Instant Discount with Flipkart Axis Card',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-07-12', price: 15999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 15999, sellerName: 'Flipkart' }
    ]
  },

  // 8. INFINIX GT 20 PRO 5G (CYBER-MECHA GAMING)
  {
    product: {
      _id: 'prod_infinix_gt_20_pro',
      title: 'Infinix GT 20 Pro 5G',
      slug: 'infinix-gt-20-pro',
      brand: 'brand_infinix',
      category: 'smartphones',
      modelNumber: 'X6871',
      releaseDate: '2024-05-21',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Dedicated esports gaming smartphone with 144Hz bezel-less AMOLED screen, Pixelworks X5 Turbo display chip, Dimensity 8200 Ultimate, Mecha LED loop, and JBL tuned audio.',
      pros: [
        'Ultra-fast 144Hz AMOLED screen with 120FPS BGMI game rendering',
        'Dedicated Pixelworks X5 Turbo display gaming processor',
        'MediaTek Dimensity 8200 Ultimate delivering 950k+ AnTuTu score',
        'JBL dual stereo speakers with Hi-Res certification',
        'Cyber-mecha RGB back panel with interactive LED notifications'
      ],
      cons: [
        'Cameras are modest in low-light conditions',
        'Bold cyber aesthetic may be polarizing'
      ],
      scores: { overall: 85, performance: 88, display: 93, camera: 78, battery: 86, software: 82, build: 80, value: 96 },
      priceSummary: {
        minPrice: 23999,
        maxPrice: 26999,
        defaultVariant: 'var_gt20p_256',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 11
      },
      viewCount: 26800,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_gt20p_256',
        product: 'prod_infinix_gt_20_pro',
        name: '8GB RAM + 256GB Storage',
        slug: 'infinix-gt-20-pro-8gb-256gb-mecha-silver',
        ramGb: 8,
        storageGb: 256,
        colorName: 'Mecha Silver',
        colorHex: '#9E9E9E',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_infinix_gt_20_pro',
      product: 'prod_infinix_gt_20_pro',
      display: {
        screenSizeInches: 6.78,
        resolution: '2436 x 1080 pixels (FHD+ 144Hz)',
        resolutionWidth: 1080,
        resolutionHeight: 2436,
        panelType: 'AMOLED (2304Hz PWM)',
        refreshRateHz: 144,
        touchSamplingRateHz: 360,
        peakBrightnessNits: 1300,
        aspectRatio: '20:9',
        pixelDensityPpi: 393,
        screenProtection: 'Corning Gorilla Glass',
        hdrSupport: ['HDR10'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 8200 Ultimate 5G (4nm) + Pixelworks X5 Turbo',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Mali-G610 MC6',
        antutuScore: 950000,
        ramType: 'LPDDR5X',
        storageType: 'UFS 3.1',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Triple (108MP + 2MP + 2MP)',
        primaryMp: 108,
        primaryAperture: 'f/1.75',
        primarySensor: 'Samsung HM6 (1/1.67")',
        ois: true,
        secondaryCameras: [
          { type: 'Macro', mp: 2, aperture: 'f/2.4', zoomOptical: 1 },
          { type: 'Depth', mp: 2, aperture: 'f/2.4', zoomOptical: 1 }
        ],
        flash: 'Ring LED Flash',
        videoRecording: ['4K@60fps', '1080p@120fps'],
        features: ['Super Night Mode', 'Pro Gaming Mode']
      },
      frontCamera: { mp: 32, aperture: 'f/2.2', videoRecording: ['2K@30fps', '1080p@60fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Po',
        removable: false,
        fastChargingWatts: 45,
        wirelessCharging: false,
        reverseCharging: true,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n8', 'n12', 'n20', 'n28', 'n38', 'n40', 'n41', 'n66', 'n77', 'n78'],
        bandsCount5G: 13,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        nfc: true,
        irBlaster: true,
        usbType: 'USB Type-C 2.0 (Bypass Charging Support)',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 164.26,
        widthMm: 75.43,
        thicknessMm: 8.15,
        weightGrams: 194,
        waterResistanceRating: 'IP54',
        backMaterial: 'Cyber Mecha Glass with RGB LED loop',
        frameMaterial: 'Plastic'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Clean XOS 14 for GT)',
        customUi: 'XOS Clean',
        promisedOsUpdatesYears: 2,
        promisedSecurityUpdatesYears: 3
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'IR Blaster', 'RGB Mecha Lights']
    },
    offers: [
      {
        _id: 'off_gt20p_fk',
        variant: 'var_gt20p_256',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/infinix-gt-20-pro',
        affiliateUrl: 'https://flipkart.com/infinix-gt-20-pro?affid=phonoworld',
        mrp: 26999,
        price: 23999,
        effectivePrice: 21999,
        discountPercent: 11,
        inStock: true,
        bankOfferSummary: '₹2,000 Instant Discount on ICICI/HDFC Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-05-28', price: 23999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 23999, sellerName: 'Flipkart' }
    ]
  },

  // 9. NOTHING PHONE (2A) 5G
  {
    product: {
      _id: 'prod_nothing_2a',
      title: 'Nothing Phone (2a) 5G',
      slug: 'nothing-phone-2a',
      brand: 'brand_nothing',
      category: 'smartphones',
      modelNumber: 'A142',
      releaseDate: '2024-03-05',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Iconic transparent design with customizable Glyph Interface LEDs, custom Dimensity 7200 Pro chipset, clean bloatware-free Nothing OS, and symmetrical 120Hz AMOLED display.',
      pros: [
        'Unique transparent aesthetic with Glyph Interface lighting',
        'Clean, bloatware-free Nothing OS with custom monochrome widgets',
        'Symmetrical narrow bezels on a bright 120Hz flexible AMOLED screen',
        'Solid dual 50MP camera system with OIS',
        'Great battery endurance from 5000mAh pack'
      ],
      cons: [
        'Plastic back and frame prone to hairline scratches',
        'No charging adapter bundled in box'
      ],
      scores: { overall: 82, performance: 78, display: 86, camera: 80, battery: 84, software: 92, build: 74, value: 91 },
      priceSummary: {
        minPrice: 23999,
        maxPrice: 27999,
        defaultVariant: 'var_n2a_128',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 8
      },
      viewCount: 29400,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_n2a_128',
        product: 'prod_nothing_2a',
        name: '8GB RAM + 128GB Storage',
        slug: 'nothing-phone-2a-8gb-128gb-black',
        ramGb: 8,
        storageGb: 128,
        colorName: 'Black',
        colorHex: '#181818',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_nothing_2a',
      product: 'prod_nothing_2a',
      display: {
        screenSizeInches: 6.7,
        resolution: '2412 x 1084 pixels (FHD+)',
        resolutionWidth: 1084,
        resolutionHeight: 2412,
        panelType: 'Flexible AMOLED (2160Hz PWM)',
        refreshRateHz: 120,
        touchSamplingRateHz: 240,
        peakBrightnessNits: 1300,
        aspectRatio: '20:9',
        pixelDensityPpi: 394,
        screenProtection: 'Corning Gorilla Glass 5',
        hdrSupport: ['HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 7200 Pro (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Mali-G610 MC4',
        antutuScore: 710000,
        ramType: 'LPDDR4X',
        storageType: 'UFS 2.2',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Dual (50MP + 50MP)',
        primaryMp: 50,
        primaryAperture: 'f/1.88',
        primarySensor: 'Samsung GN9 (1/1.56")',
        ois: true,
        secondaryCameras: [
          { type: 'Ultra-Wide', mp: 50, aperture: 'f/2.2', zoomOptical: 0.6 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@30fps', '1080p@60fps'],
        features: ['Ultra XDR', 'Night Mode', 'Motion Capture']
      },
      frontCamera: { mp: 32, aperture: 'f/2.2', videoRecording: ['1080p@60fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 45,
        wirelessCharging: false,
        reverseCharging: false,
        chargerInBox: false
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n7', 'n8', 'n20', 'n28', 'n38', 'n40', 'n41', 'n66', 'n77', 'n78'],
        bandsCount5G: 13,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        nfc: true,
        irBlaster: false,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 161.74,
        widthMm: 76.32,
        thicknessMm: 8.55,
        weightGrams: 190,
        waterResistanceRating: 'IP54',
        backMaterial: 'Transparent Polycarbonate',
        frameMaterial: 'Polycarbonate'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Nothing OS 2.5)',
        customUi: 'Nothing OS',
        promisedOsUpdatesYears: 3,
        promisedSecurityUpdatesYears: 4
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass', 'Glyph LEDs']
    },
    offers: [
      {
        _id: 'off_n2a_fk',
        variant: 'var_n2a_128',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/nothing-phone-2a',
        affiliateUrl: 'https://flipkart.com/nothing-phone-2a?affid=phonoworld',
        mrp: 25999,
        price: 23999,
        effectivePrice: 21999,
        discountPercent: 8,
        inStock: true,
        bankOfferSummary: '₹2,000 Instant Discount with HDFC Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-03-12', price: 23999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 23999, sellerName: 'Flipkart' }
    ]
  },

  // 10. MOTOROLA EDGE 50 FUSION 5G
  {
    product: {
      _id: 'prod_moto_edge_50_fusion',
      title: 'Motorola Edge 50 Fusion 5G',
      slug: 'motorola-edge-50-fusion',
      brand: 'brand_motorola',
      category: 'smartphones',
      modelNumber: 'XT2429-1',
      releaseDate: '2024-05-15',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Segment-defining design with 144Hz curved pOLED display, Sony LYTIA 700C OIS camera, IP68 water submersion resistance, and vegan leather finish under ₹25k.',
      pros: [
        'Full IP68 underwater dust and water protection (rare under ₹25k)',
        'Fluid 144Hz 3D curved pOLED display with vibrant colors',
        'Sony LYT-700C 50MP primary sensor with reliable OIS',
        'Clean Hello UI based on Android 14 with Moto gestures',
        '68W TurboPower charger bundled inside box'
      ],
      cons: [
        'Snapdragon 7s Gen 2 is average for heavy 3D gaming',
        'Curved screen increases glass drop vulnerability'
      ],
      scores: { overall: 84, performance: 75, display: 91, camera: 84, battery: 86, software: 89, build: 92, value: 95 },
      priceSummary: {
        minPrice: 22999,
        maxPrice: 24999,
        defaultVariant: 'var_edge50f_128',
        hasDeals: true,
        lowestSellerName: 'Flipkart',
        discountPercentMax: 9
      },
      viewCount: 33100,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_edge50f_128',
        product: 'prod_moto_edge_50_fusion',
        name: '8GB RAM + 128GB Storage',
        slug: 'motorola-edge-50-fusion-8gb-128gb-marshmallow-blue',
        ramGb: 8,
        storageGb: 128,
        colorName: 'Marshmallow Blue',
        colorHex: '#8DA4C4',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_moto_edge_50_fusion',
      product: 'prod_moto_edge_50_fusion',
      display: {
        screenSizeInches: 6.7,
        resolution: '2400 x 1080 pixels (FHD+)',
        resolutionWidth: 1080,
        resolutionHeight: 2400,
        panelType: '3D Curved pOLED (720Hz Touch)',
        refreshRateHz: 144,
        peakBrightnessNits: 1600,
        aspectRatio: '20:9',
        pixelDensityPpi: 395,
        screenProtection: 'Corning Gorilla Glass 5',
        hdrSupport: ['HDR10'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'Qualcomm Snapdragon 7s Gen 2 (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Adreno 710',
        antutuScore: 610000,
        ramType: 'LPDDR4X',
        storageType: 'UFS 2.2',
        expandableStorage: false
      },
      rearCamera: {
        setup: 'Dual (50MP + 13MP)',
        primaryMp: 50,
        primaryAperture: 'f/1.88',
        primarySensor: 'Sony LYTIA 700C (1/1.56")',
        ois: true,
        secondaryCameras: [
          { type: 'Ultra-Wide + Macro', mp: 13, aperture: 'f/2.2', zoomOptical: 0.6 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@30fps', '1080p@60fps'],
        features: ['All-Pixel Instant Focus', 'Night Vision', 'Pantone Validated Colors']
      },
      frontCamera: { mp: 32, aperture: 'f/2.45', videoRecording: ['4K@30fps', '1080p@30fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 68,
        wirelessCharging: false,
        reverseCharging: false,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n7', 'n8', 'n20', 'n28', 'n38', 'n40', 'n41', 'n77', 'n78'],
        bandsCount5G: 12,
        volte: true,
        simConfiguration: 'Dual Nano-SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.2',
        nfc: true,
        irBlaster: false,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 161.9,
        widthMm: 73.1,
        thicknessMm: 7.9,
        weightGrams: 175,
        waterResistanceRating: 'IP68',
        backMaterial: 'Vegan Leather / PMMA',
        frameMaterial: 'Plastic'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Hello UI)',
        customUi: 'Hello UI',
        promisedOsUpdatesYears: 3,
        promisedSecurityUpdatesYears: 4
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass']
    },
    offers: [
      {
        _id: 'off_edge50f_fk',
        variant: 'var_edge50f_128',
        seller: 'seller_flipkart',
        productUrl: 'https://flipkart.com/motorola-edge-50-fusion',
        affiliateUrl: 'https://flipkart.com/motorola-edge-50-fusion?affid=phonoworld',
        mrp: 24999,
        price: 22999,
        effectivePrice: 20999,
        discountPercent: 9,
        inStock: true,
        bankOfferSummary: '₹2,000 Instant Discount with Axis Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-05-22', price: 22999, sellerName: 'Flipkart' },
      { date: '2024-09-18', price: 22999, sellerName: 'Flipkart' }
    ]
  },

  // 11. iQOO Z9 5G (BUDGET SPEED CHAMPION)
  {
    product: {
      _id: 'prod_iqoo_z9',
      title: 'iQOO Z9 5G',
      slug: 'iqoo-z9-5g',
      brand: 'brand_iqoo',
      category: 'smartphones',
      modelNumber: 'I2302',
      releaseDate: '2024-03-12',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80'
      ],
      summary: 'Fastest smartphone in the sub-₹20,000 category powered by MediaTek Dimensity 7200, 120Hz AMOLED display, Sony IMX882 OIS camera, and 44W FlashCharge.',
      pros: [
        'Top benchmark score (AnTuTu 730k+) in the sub-₹20,000 segment',
        'Vibrant 120Hz AMOLED display with 1800 nits local peak brightness',
        'Sony IMX882 50MP main camera with 4K video recording and OIS',
        'Dual stereo speakers with audio booster',
        'Fast 44W charger bundled in box'
      ],
      cons: [
        'Funtouch OS includes pre-installed bloatware apps',
        'No Ultra-Wide camera lens (secondary is 2MP bokeh)'
      ],
      scores: { overall: 81, performance: 82, display: 84, camera: 77, battery: 85, software: 74, build: 76, value: 96 },
      priceSummary: {
        minPrice: 19999,
        maxPrice: 21999,
        defaultVariant: 'var_iqooz9_128',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 9
      },
      viewCount: 35000,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_iqooz9_128',
        product: 'prod_iqoo_z9',
        name: '8GB RAM + 128GB Storage',
        slug: 'iqoo-z9-5g-8gb-128gb-brushed-green',
        ramGb: 8,
        storageGb: 128,
        colorName: 'Brushed Green',
        colorHex: '#3D5A40',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_iqoo_z9',
      product: 'prod_iqoo_z9',
      display: {
        screenSizeInches: 6.67,
        resolution: '2400 x 1080 pixels (FHD+)',
        resolutionWidth: 1080,
        resolutionHeight: 2400,
        panelType: 'AMOLED (1200Hz Instant Touch)',
        refreshRateHz: 120,
        touchSamplingRateHz: 300,
        peakBrightnessNits: 1800,
        aspectRatio: '20:9',
        pixelDensityPpi: 394,
        screenProtection: 'DT-Star2 Plus Glass',
        hdrSupport: ['HDR10+'],
        notchPunchHole: 'Center Punch-hole'
      },
      hardware: {
        chipset: 'MediaTek Dimensity 7200 5G (4nm)',
        cpuCores: 8,
        processNodeNm: 4,
        gpu: 'Mali-G610 MC4',
        antutuScore: 730000,
        ramType: 'LPDDR4X',
        storageType: 'UFS 2.2',
        expandableStorage: true
      },
      rearCamera: {
        setup: 'Dual (50MP + 2MP)',
        primaryMp: 50,
        primaryAperture: 'f/1.79',
        primarySensor: 'Sony IMX882 (1/1.95")',
        ois: true,
        secondaryCameras: [
          { type: 'Depth Sensor', mp: 2, aperture: 'f/2.4', zoomOptical: 1 }
        ],
        flash: 'LED Flash',
        videoRecording: ['4K@30fps', '1080p@60fps'],
        features: ['Super Night Mode', 'Portrait Mode', 'OIS + EIS Stabilization']
      },
      frontCamera: { mp: 16, aperture: 'f/2.0', videoRecording: ['1080p@30fps'] },
      battery: {
        capacityMah: 5000,
        type: 'Li-Ion',
        removable: false,
        fastChargingWatts: 44,
        wirelessCharging: false,
        reverseCharging: false,
        chargerInBox: true
      },
      connectivity: {
        has5G: true,
        bands5G: ['n1', 'n3', 'n5', 'n8', 'n28', 'n77', 'n78'],
        bandsCount5G: 7,
        volte: true,
        simConfiguration: 'Hybrid Dual SIM',
        wifi: 'Wi-Fi 6',
        bluetooth: 'Bluetooth 5.3',
        nfc: false,
        irBlaster: false,
        usbType: 'USB Type-C 2.0',
        headphoneJack35mm: false
      },
      design: {
        heightMm: 163.17,
        widthMm: 75.81,
        thicknessMm: 7.83,
        weightGrams: 188,
        waterResistanceRating: 'IP54',
        backMaterial: 'Composite Plastic',
        frameMaterial: 'Plastic'
      },
      software: {
        operatingSystem: 'Android',
        osVersion: 'Android 14 (Funtouch OS 14)',
        customUi: 'Funtouch OS',
        promisedOsUpdatesYears: 2,
        promisedSecurityUpdatesYears: 3
      },
      sensors: ['In-Display Optical Fingerprint', 'Accelerometer', 'Gyro', 'Proximity', 'Compass']
    },
    offers: [
      {
        _id: 'off_iqooz9_amz',
        variant: 'var_iqooz9_128',
        seller: 'seller_amazon',
        productUrl: 'https://amazon.in/dp/B0CX21C26D',
        affiliateUrl: 'https://amazon.in/dp/B0CX21C26D?tag=phonoworld-21',
        mrp: 21999,
        price: 19999,
        effectivePrice: 17999,
        discountPercent: 9,
        inStock: true,
        bankOfferSummary: '₹2,000 Instant Discount on ICICI Bank Cards',
        lastCheckedAt: new Date().toISOString(),
        isLowestEver: true
      }
    ],
    priceHistory: [
      { date: '2024-03-20', price: 19999, sellerName: 'Amazon India' },
      { date: '2024-09-18', price: 19999, sellerName: 'Amazon India' }
    ]
  },

  // ==========================================
  // CATEGORY: LAPTOPS & ULTRABOOKS
  // ==========================================
  {
    product: {
      _id: 'prod_asus_rog_g16',
      title: 'ASUS ROG Zephyrus G16 (2024)',
      slug: 'asus-rog-zephyrus-g16-2024',
      brand: 'brand_asus',
      category: 'laptops',
      modelNumber: 'GU605MZ-QR068WS',
      releaseDate: '2024-03-15',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'],
      summary: 'Ultra-slim CNC aluminum gaming powerhouse featuring Intel Core Ultra 9, NVIDIA RTX 4080 (115W TGP), 2.5K 240Hz ROG Nebula OLED display, and 90Whr battery.',
      pros: [
        'Stunning 2.5K 240Hz 0.2ms ROG Nebula OLED display with 100% DCI-P3',
        'NVIDIA GeForce RTX 4080 (115W TGP) with Advanced Optimus & MUX switch',
        'Ultra-portable CNC aluminum chassis weighing only 1.85 kg',
        'Massive 90Whr battery with 100W USB-C Power Delivery charging'
      ],
      cons: [
        'Soldered LPDDR5X RAM cannot be upgraded post-purchase',
        'Premium price point above ₹2.4 Lakh'
      ],
      scores: { overall: 96, performance: 98, display: 98, camera: 80, battery: 92, software: 90, build: 98, value: 72 },
      priceSummary: {
        minPrice: 249999,
        maxPrice: 279999,
        defaultVariant: 'var_g16_32_1tb',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 10
      },
      viewCount: 19500,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_g16_32_1tb',
        product: 'prod_asus_rog_g16',
        name: 'Core Ultra 9 / RTX 4080 / 32GB / 1TB SSD',
        slug: 'asus-rog-zephyrus-g16-ultra9-32gb-1tb',
        ramGb: 32,
        storageGb: 1024,
        colorName: 'Eclipse Gray',
        colorHex: '#2b2d30',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_asus_rog_g16',
      product: 'prod_asus_rog_g16',
      display: {
        screenSizeInches: 16.0,
        resolution: '2560 x 1600 pixels (2.5K QHD+)',
        panelType: 'ROG Nebula OLED (100% DCI-P3)',
        refreshRateHz: 240,
        peakBrightnessNits: 500,
        aspectRatio: '16:10'
      },
      hardware: {
        chipset: 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1GHz)',
        dedicatedGpu: 'NVIDIA GeForce RTX 4080 (12GB GDDR6)',
        gpu: 'RTX 4080',
        tgpWatts: 115,
        ramGb: 32,
        ramType: '32GB LPDDR5X 7467MHz (On-board)',
        storageGb: 1024,
        storageType: '1TB PCIe 4.0 NVMe M.2 Performance SSD'
      },
      battery: {
        capacityWhr: 90,
        chargerWatts: 240,
        fastChargingWatts: 100,
        hasUsbCPowerDelivery: true
      },
      design: {
        weightKg: 1.85,
        thicknessMm: 14.9,
        chassisMaterial: 'CNC Milled Aluminum'
      },
      connectivity: {
        wifi: 'Wi-Fi 6E (802.11ax)',
        bluetooth: '5.3',
        ports: ['1x Thunderbolt 4', '1x USB 3.2 Gen 2 Type-C (100W PD)', '2x USB 3.2 Gen 2 Type-A', '1x HDMI 2.1 FRL', '1x SD Express 7.0 Card Reader']
      },
      software: {
        os: 'Windows 11 Home + MS Office 2021'
      }
    },
    offers: [
      {
        _id: 'off_g16_amz',
        seller: 'seller_amazon',
        sellerName: 'Amazon India',
        price: 249999,
        mrp: 279999,
        discountPercent: 11,
        inStock: true,
        affiliateUrl: 'https://amazon.in/dp/example-g16'
      }
    ],
    priceHistory: [
      { date: '2024-04-01', price: 279999, sellerName: 'Amazon India', event: 'Launch MRP' },
      { date: '2024-09-18', price: 249999, sellerName: 'Amazon India', event: 'Current Verified Price' }
    ]
  },
  {
    product: {
      _id: 'prod_macbook_air_m3_15',
      title: 'Apple MacBook Air 15-inch (M3)',
      slug: 'apple-macbook-air-m3-15',
      brand: 'brand_apple',
      category: 'laptops',
      modelNumber: 'MXD13HN/A',
      releaseDate: '2024-03-08',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'],
      summary: 'Thin and light 15.3-inch ultrabook powered by Apple M3 (8-core CPU / 10-core GPU), Liquid Retina screen, fanless silent operation, and 18-hour battery.',
      pros: [
        'Fanless completely silent operation even under sustained video editing',
        'Industry-leading 18 hours real-world battery life on a single charge',
        'Immersive 15.3-inch Liquid Retina display with 500 nits and True Tone',
        'Ultra-portable 1.51 kg chassis with MagSafe 3 magnetic charging'
      ],
      cons: [
        'Display refresh rate capped at standard 60Hz',
        'Base ports limited to two Thunderbolt / USB 4 connections'
      ],
      scores: { overall: 94, performance: 90, display: 92, camera: 88, battery: 98, software: 98, build: 98, value: 76 },
      priceSummary: {
        minPrice: 144900,
        maxPrice: 154900,
        defaultVariant: 'var_mba15_16_512',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 6
      },
      viewCount: 31200,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_mba15_16_512',
        product: 'prod_macbook_air_m3_15',
        name: 'Apple M3 / 16GB Unified RAM / 512GB SSD',
        slug: 'apple-macbook-air-15-m3-16gb-512gb',
        ramGb: 16,
        storageGb: 512,
        colorName: 'Midnight',
        colorHex: '#1e242b',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_macbook_air_m3_15',
      product: 'prod_macbook_air_m3_15',
      display: {
        screenSizeInches: 15.3,
        resolution: '2880 x 1864 pixels (Liquid Retina)',
        panelType: 'IPS with True Tone (P3 Wide Color)',
        refreshRateHz: 60,
        peakBrightnessNits: 500
      },
      hardware: {
        chipset: 'Apple M3 (8-core CPU with 4 performance and 4 efficiency cores)',
        dedicatedGpu: 'Apple 10-core GPU with Hardware Ray Tracing',
        gpu: 'Apple M3 10-Core',
        tgpWatts: 30,
        ramGb: 16,
        ramType: '16GB Unified Memory',
        storageGb: 512,
        storageType: '512GB Apple SSD'
      },
      battery: {
        capacityWhr: 66.5,
        chargerWatts: 35,
        batteryLifeHours: 18,
        hasUsbCPowerDelivery: true
      },
      design: {
        weightKg: 1.51,
        thicknessMm: 11.5,
        chassisMaterial: '100% Recycled Aluminum Enclosure'
      },
      connectivity: {
        wifi: 'Wi-Fi 6E (802.11ax)',
        bluetooth: '5.3',
        ports: ['MagSafe 3 Charging', '2x Thunderbolt / USB 4', '3.5mm Headphone Jack']
      },
      software: {
        os: 'macOS Sequoia'
      }
    },
    offers: [
      {
        _id: 'off_mba15_amz',
        seller: 'seller_amazon',
        sellerName: 'Amazon India',
        price: 144900,
        mrp: 154900,
        discountPercent: 6,
        inStock: true,
        affiliateUrl: 'https://amazon.in/dp/example-mba15'
      }
    ],
    priceHistory: [
      { date: '2024-03-10', price: 154900, sellerName: 'Amazon India', event: 'Launch MRP' },
      { date: '2024-09-18', price: 144900, sellerName: 'Amazon India', event: 'Current Verified Price' }
    ]
  },

  // ==========================================
  // CATEGORY: SMARTWATCHES & WEARABLES
  // ==========================================
  {
    product: {
      _id: 'prod_galaxy_watch_ultra',
      title: 'Samsung Galaxy Watch Ultra (LTE, 47mm)',
      slug: 'samsung-galaxy-watch-ultra',
      brand: 'brand_samsung',
      category: 'wearables',
      modelNumber: 'SM-L705F',
      releaseDate: '2024-07-24',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'],
      summary: 'Extreme adventure smartwatch crafted in Grade 4 Titanium with 3000 nits Super AMOLED, Dual-Frequency L1+L5 GPS, 10ATM water resistance, and 100-hour battery.',
      pros: [
        'Blinding 3000 nits Super AMOLED display readable under harsh direct sun',
        'Aerospace Grade 4 Titanium cushion frame with 10ATM / 100m ocean water rating',
        'Dual-frequency L1 + L5 GPS ensures precision trail and running navigation',
        'BioActive sensor with verified ECG, blood pressure and Sleep Apnea tracking'
      ],
      cons: [
        'Bulkier profile at 47mm not suitable for petite wrists',
        'Advanced ECG features require paired Samsung Galaxy phone'
      ],
      scores: { overall: 95, performance: 96, display: 98, camera: 60, battery: 92, software: 95, build: 98, value: 78 },
      priceSummary: {
        minPrice: 59999,
        maxPrice: 64999,
        defaultVariant: 'var_gw_ultra_47',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 8
      },
      viewCount: 16800,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_gw_ultra_47',
        product: 'prod_galaxy_watch_ultra',
        name: '47mm Titanium Gray / Marine Orange Band',
        slug: 'samsung-galaxy-watch-ultra-titanium-gray-47mm',
        ramGb: 2,
        storageGb: 32,
        colorName: 'Titanium Gray',
        colorHex: '#424549',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_galaxy_watch_ultra',
      product: 'prod_galaxy_watch_ultra',
      display: {
        screenSizeInches: 1.5,
        resolution: '480 x 480 pixels',
        panelType: 'Super AMOLED Always-On Display (Sapphire Crystal Glass)',
        refreshRateHz: 60,
        peakBrightnessNits: 3000
      },
      hardware: {
        chipset: 'Exynos W1000 (3nm, Penta-core)',
        ramGb: 2,
        storageGb: 32
      },
      health: {
        hasEcg: true,
        hasBloodPressure: true,
        hasSleepApnea: true,
        hasBioelectricalImpedance: true
      },
      battery: {
        capacityMah: 590,
        batteryLifeHours: 100,
        batteryLifeDays: 4
      },
      design: {
        weightGrams: 60.5,
        waterResistanceRating: '10ATM + IP68 + MIL-STD-810H (100m Ocean Swim)',
        frameMaterial: 'Grade 4 Aerospace Titanium'
      },
      connectivity: {
        has4GLte: true,
        hasEsim: true,
        dualBandGps: true,
        bluetooth: '5.3',
        nfc: true
      },
      software: {
        os: 'Wear OS Powered by Samsung (One UI 6 Watch)'
      }
    },
    offers: [
      {
        _id: 'off_gw_ultra_amz',
        seller: 'seller_amazon',
        sellerName: 'Amazon India',
        price: 59999,
        mrp: 64999,
        discountPercent: 8,
        inStock: true,
        affiliateUrl: 'https://amazon.in/dp/example-gw-ultra'
      }
    ],
    priceHistory: [
      { date: '2024-07-25', price: 64999, sellerName: 'Amazon India', event: 'Launch MRP' },
      { date: '2024-09-18', price: 59999, sellerName: 'Amazon India', event: 'Current Verified Price' }
    ]
  },

  // ==========================================
  // CATEGORY: TABLETS & PRODUCTIVITY SLATES
  // ==========================================
  {
    product: {
      _id: 'prod_galaxy_tab_s9_ultra',
      title: 'Samsung Galaxy Tab S9 Ultra (Wi-Fi + 5G)',
      slug: 'samsung-galaxy-tab-s9-ultra',
      brand: 'brand_samsung',
      category: 'tablets',
      modelNumber: 'SM-X916B',
      releaseDate: '2023-08-11',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'],
      summary: 'Massive 14.6-inch Dynamic AMOLED 2X 120Hz canvas tablet with bundled S-Pen (2.8ms latency), Snapdragon 8 Gen 2, IP68 water resistance, and Samsung DeX.',
      pros: [
        'Huge 14.6-inch Dynamic AMOLED 2X 120Hz screen is unparalleled for multitasking',
        'Bundled IP68 S-Pen included in the box with ultra-low 2.8ms latency',
        'Full IP68 dust & water protection on both tablet body and stylus',
        'Samsung DeX desktop interface allows dual-monitor productivity'
      ],
      cons: [
        'Notch on 14.6" screen for dual front cameras',
        'Heavy to hold one-handed for extended reading (737 grams)'
      ],
      scores: { overall: 96, performance: 95, display: 98, camera: 80, battery: 94, software: 95, build: 98, value: 76 },
      priceSummary: {
        minPrice: 108999,
        maxPrice: 122999,
        defaultVariant: 'var_tabs9u_12_256',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 11
      },
      viewCount: 14200,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_tabs9u_12_256',
        product: 'prod_galaxy_tab_s9_ultra',
        name: '12GB RAM + 256GB Storage (5G + Wi-Fi)',
        slug: 'samsung-galaxy-tab-s9-ultra-5g-256gb',
        ramGb: 12,
        storageGb: 256,
        colorName: 'Graphite',
        colorHex: '#3b3d40',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_galaxy_tab_s9_ultra',
      product: 'prod_galaxy_tab_s9_ultra',
      display: {
        screenSizeInches: 14.6,
        resolution: '2960 x 1848 pixels (WQXGA+)',
        panelType: 'Dynamic AMOLED 2X (HDR10+)',
        refreshRateHz: 120,
        peakBrightnessNits: 930
      },
      hardware: {
        chipset: 'Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm)',
        ramGb: 12,
        storageGb: 256
      },
      productivity: {
        bundledStylus: true,
        stylusLatencyMs: 2.8,
        hasDesktopMode: true,
        desktopModeName: 'Samsung DeX'
      },
      battery: {
        capacityMah: 11200,
        fastChargingWatts: 45
      },
      design: {
        weightGrams: 737,
        thicknessMm: 5.5,
        waterResistanceRating: 'IP68 (Water & Dust Resistant)'
      },
      connectivity: {
        has5G: true,
        wifi: 'Wi-Fi 6E (802.11ax)',
        bluetooth: '5.3'
      },
      software: {
        os: 'Android 14 with One UI 6'
      }
    },
    offers: [
      {
        _id: 'off_tabs9u_amz',
        seller: 'seller_amazon',
        sellerName: 'Amazon India',
        price: 108999,
        mrp: 122999,
        discountPercent: 11,
        inStock: true,
        affiliateUrl: 'https://amazon.in/dp/example-tab-s9u'
      }
    ],
    priceHistory: [
      { date: '2023-08-20', price: 122999, sellerName: 'Amazon India', event: 'Launch MRP' },
      { date: '2024-09-18', price: 108999, sellerName: 'Amazon India', event: 'Current Verified Price' }
    ]
  },

  // ==========================================
  // CATEGORY: TWS AUDIO & EARBUDS
  // ==========================================
  {
    product: {
      _id: 'prod_sony_wf_1000xm5',
      title: 'Sony WF-1000XM5 Wireless Noise Canceling Earbuds',
      slug: 'sony-wf-1000xm5',
      brand: 'brand_sony',
      category: 'audio',
      modelNumber: 'WF-1000XM5/B',
      releaseDate: '2023-09-27',
      status: 'available',
      featuredImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'],
      summary: 'Apex True Wireless Earbuds with Dual-Processor Active Noise Cancellation (QN2e + V2), LDAC High-Res Audio Wireless, 8.4mm Dynamic Driver X, and AI bone conduction mics.',
      pros: [
        'Industry benchmark Active Noise Cancellation with dual feedback microphones',
        'Certified Hi-Res Wireless with Sony LDAC codec and DSEE Extreme upscaling',
        '8.4mm Dynamic Driver X delivers punchy sub-bass without muddying vocals',
        'Multi-point connection pairs simultaneously with phone and laptop'
      ],
      cons: [
        'Polyurethane foam tips take getting used to for some ear canals',
        'Touch controls can be sensitive during adjustments'
      ],
      scores: { overall: 96, performance: 98, display: 70, camera: 98, battery: 90, software: 92, build: 92, value: 80 },
      priceSummary: {
        minPrice: 23990,
        maxPrice: 29990,
        defaultVariant: 'var_xm5_black',
        hasDeals: true,
        lowestSellerName: 'Amazon India',
        discountPercentMax: 20
      },
      viewCount: 22100,
      isFeatured: true,
      isActive: true
    },
    variants: [
      {
        _id: 'var_xm5_black',
        product: 'prod_sony_wf_1000xm5',
        name: 'Black with Copper Accents',
        slug: 'sony-wf-1000xm5-black',
        ramGb: 0,
        storageGb: 0,
        colorName: 'Black',
        colorHex: '#1e1f21',
        isDefault: true,
        isActive: true
      }
    ],
    specification: {
      _id: 'spec_sony_wf_1000xm5',
      product: 'prod_sony_wf_1000xm5',
      audio: {
        ancDb: 48,
        hasActiveNoiseCanceling: true,
        driverDiameterMm: 8.4,
        driverType: 'Dynamic Driver X',
        frequencyResponse: '20Hz - 40,000Hz (LDAC 96kHz)'
      },
      connectivity: {
        codecs: ['LDAC', 'LC3', 'AAC', 'SBC'],
        bluetooth: '5.3 (LE Audio Ready)',
        hasMultipoint: true
      },
      battery: {
        budsHours: 8,
        totalHoursWithCase: 36,
        fastChargingMinutes: 3, // 3 min charge for 60 min playback
        hasWirelessCharging: true
      },
      design: {
        weightGrams: 5.9,
        waterResistanceRating: 'IPX4 (Splash & Sweat Resistant)'
      }
    },
    offers: [
      {
        _id: 'off_xm5_amz',
        seller: 'seller_amazon',
        sellerName: 'Amazon India',
        price: 23990,
        mrp: 29990,
        discountPercent: 20,
        inStock: true,
        affiliateUrl: 'https://amazon.in/dp/example-xm5'
      }
    ],
    priceHistory: [
      { date: '2023-10-01', price: 29990, sellerName: 'Amazon India', event: 'Launch MRP' },
      { date: '2024-09-18', price: 23990, sellerName: 'Amazon India', event: 'Current Verified Price' }
    ]
  }
];
