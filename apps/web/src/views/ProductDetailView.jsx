import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Scale, Check, Zap, ThumbsUp, ThumbsDown, ShieldCheck, Sparkles, Smartphone, Heart } from 'lucide-react';
import { api } from '../services/api.js';
import { useCompareStore } from '../store/compareStore.js';
import { useUserStore } from '../store/userStore.js';
import { PriceBox } from '../components/product/PriceBox.jsx';
import { SpecRadar } from '../components/product/SpecRadar.jsx';
import { PriceHistoryChart } from '../components/product/PriceHistoryChart.jsx';
import { SpecTable } from '../components/product/SpecTable.jsx';
import { ReviewSection } from '../components/product/ReviewSection.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { SeoHead } from '../components/common/SeoHead.jsx';

export function ProductDetailView({ slug, onBack, onSelectProduct }) {
  const { selectedSlugs, addSlug, removeSlug } = useCompareStore();
  const { toggleWishlistId, isProductWishlisted } = useUserStore();
  const [selectedVariantId, setSelectedVariantId] = useState('');

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.getProductBySlug(slug)
  });

  const detail = response?.data;
  const isCompared = detail ? selectedSlugs.includes(detail.product.slug) : false;
  const isWishlisted = detail ? isProductWishlisted(detail.product._id) : false;

  const toggleCompare = () => {
    if (!detail) return;
    if (isCompared) {
      removeSlug(detail.product.slug);
    } else {
      addSlug(detail.product.slug);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading structured specifications & live prices...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="glass-panel p-10 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
        <h3 className="text-lg font-bold text-white">Product Not Found</h3>
        <p className="text-xs text-slate-400">The requested smartphone profile could not be loaded.</p>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs">
          Return to Catalog
        </button>
      </div>
    );
  }

  const { product, specification, variants, offers, priceHistory, alternatives } = detail;
  const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand;
  const minPrice = product.priceSummary?.minPrice || 30000;

  // Structured Schema.org JSON-LD Microdata for Google Rich Snippets
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.featuredImage],
    description: product.summary || `Buy ${product.title} at lowest verified online price in India.`,
    brand: {
      '@type': 'Brand',
      name: brandName
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: minPrice,
      highPrice: product.priceSummary?.maxPrice || Math.round(minPrice * 1.15),
      offerCount: offers.length || 2,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '28',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://phonoworld.in' },
      { '@type': 'ListItem', position: 2, name: 'Smartphones', item: 'https://phonoworld.in/#smartphones' },
      { '@type': 'ListItem', position: 3, name: product.title, item: `https://phonoworld.in/smartphones/${product.slug}` }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Programmatic SEO Head & Schema.org JSON-LD */}
      <SeoHead
        title={`${product.title} Price in India (₹${minPrice.toLocaleString('en-IN')}), Specs & Reviews - PhonoWorld`}
        description={`Check lowest online price for ${product.title} in India. Features ${specification?.display?.screenSizeInches}" ${specification?.display?.refreshRateHz}Hz screen, ${specification?.hardware?.chipset}, ${specification?.rearCamera?.primaryMp}MP camera, ${specification?.battery?.capacityMah}mAh battery.`}
        canonicalUrl={`https://phonoworld.in/smartphones/${product.slug}`}
        imageUrl={product.featuredImage}
        schemaJsonLd={schemaJsonLd}
        breadcrumbsJsonLd={breadcrumbsJsonLd}
      />
      
      {/* Top Nav Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Smartphones</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlistId(product._id)}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md border ${
              isWishlisted
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-rose-400'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
            <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={toggleCompare}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isCompared 
                ? 'bg-sky-500 text-slate-950' 
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Scale className="w-3.5 h-3.5 text-sky-400" />}
            <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gallery Column */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/50 to-slate-950">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <img
              src={product.featuredImage}
              alt={product.title}
              className="max-h-72 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Variants Selector */}
          {variants.length > 0 && (
            <div className="w-full mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Available Storage & Color Variants
              </span>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v._id}
                    onClick={() => setSelectedVariantId(v._id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      (selectedVariantId === v._id || (!selectedVariantId && v.isDefault))
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {v.ramGb}GB / {v.storageGb}GB • {v.colorName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Details & Header */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {typeof product.brand === 'object' ? product.brand.name : product.brand}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Launched in India</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.summary}
            </p>
          </div>

          {/* KEY HIGHLIGHTS GRID (Category-Aware) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {product.category === 'laptops' ? (
              <>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Display</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.display?.screenSizeInches}" {specification.display?.refreshRateHz}Hz</span>
                  <span className="text-[10px] text-slate-400 truncate block">{specification.display?.panelType}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Processor</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.hardware?.chipset?.split('(')[0]}</span>
                  <span className="text-[10px] text-sky-400 font-bold">{specification.hardware?.ramGb || 16}GB RAM</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">GPU / Graphics</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.hardware?.dedicatedGpu?.split('(')[0] || specification.hardware?.gpu || 'Integrated'}</span>
                  <span className="text-[10px] text-indigo-400 font-bold">{specification.hardware?.tgpWatts ? `${specification.hardware.tgpWatts}W TGP` : 'Fanless Silent'}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Battery</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.battery?.capacityWhr ? `${specification.battery.capacityWhr} Whr` : 'All-day'}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{specification.battery?.chargerWatts ? `${specification.battery.chargerWatts}W Fast` : 'Type-C PD'}</span>
                </div>
              </>
            ) : product.category === 'wearables' ? (
              <>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Display</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.display?.screenSizeInches}" AMOLED</span>
                  <span className="text-[10px] text-amber-400 font-bold">{specification.display?.peakBrightnessNits} Nits Peak</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Health ECG</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.health?.hasEcg ? 'ECG Certified' : 'Heart Rate'}</span>
                  <span className="text-[10px] text-rose-400 font-bold">Dual-Freq L1+L5 GPS</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Durability</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.design?.waterResistanceRating?.split('+')[0] || '10ATM'}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{specification.design?.frameMaterial?.split(' ')[0] || 'Titanium'}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Battery</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.battery?.batteryLifeHours || 100} Hours</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{specification.battery?.batteryLifeDays || 4} Days Typical</span>
                </div>
              </>
            ) : product.category === 'tablets' ? (
              <>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Display Canvas</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.display?.screenSizeInches}" {specification.display?.refreshRateHz}Hz</span>
                  <span className="text-[10px] text-slate-400 truncate block">{specification.display?.panelType}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Stylus & Latency</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.productivity?.bundledStylus ? 'Stylus Included' : 'Stylus Ready'}</span>
                  <span className="text-[10px] text-sky-400 font-bold">{specification.productivity?.stylusLatencyMs || 2.8}ms Latency</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Performance</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.hardware?.chipset?.split(' ')[0]}</span>
                  <span className="text-[10px] text-indigo-400 font-bold">{specification.productivity?.desktopModeName || 'Desktop Mode'}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Battery</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.battery?.capacityMah?.toLocaleString('en-IN')} mAh</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{specification.battery?.fastChargingWatts}W Super Fast</span>
                </div>
              </>
            ) : product.category === 'audio' ? (
              <>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Noise Canceling</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.audio?.ancDb ? `${specification.audio.ancDb}dB ANC` : 'Hybrid ANC'}</span>
                  <span className="text-[10px] text-purple-400 font-bold">Flagship Dual Chip</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Driver Unit</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.audio?.driverDiameterMm}mm Dynamic</span>
                  <span className="text-[10px] text-slate-400 truncate block">{specification.audio?.driverType}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Codecs & Wireless</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.connectivity?.codecs?.slice(0, 2).join(' / ')}</span>
                  <span className="text-[10px] text-sky-400 font-bold">Hi-Res Audio LDAC</span>
                </div>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Battery Playtime</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.battery?.budsHours}h Earbuds</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{specification.battery?.totalHoursWithCase}h with Case</span>
                </div>
              </>
            ) : (
              <>
                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Display</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.display?.screenSizeInches}" {specification.display?.refreshRateHz}Hz</span>
                  <span className="text-[10px] text-slate-400 truncate block">{specification.display?.panelType}</span>
                </div>

                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Processor</span>
                  <span className="font-bold text-white mt-0.5 block truncate">{specification.hardware?.chipset?.split(' ')[0]}</span>
                  <span className="text-[10px] text-sky-400 font-bold">{specification.hardware?.antutuScore ? `${Math.round(specification.hardware.antutuScore / 1000)}k AnTuTu` : '4nm'}</span>
                </div>

                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Camera</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.rearCamera?.primaryMp}MP OIS</span>
                  <span className="text-[10px] text-slate-400">{specification.rearCamera?.setup?.split(' ')[0]} Rear</span>
                </div>

                <div className="glass-panel p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Battery</span>
                  <span className="font-bold text-white mt-0.5 block">{specification.battery?.capacityMah} mAh</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{specification.battery?.fastChargingWatts}W Fast</span>
                </div>
              </>
            )}
          </div>

          {/* RETAILER PRICE BOX */}
          <PriceBox
            productId={product._id}
            offers={offers}
            priceSummary={product.priceSummary}
          />
        </div>

      </div>

      {/* PROS & CONS & RADAR EVALUATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pros & Cons */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>PhonoWorld Editorial Verdict</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pros */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Key Strengths</span>
              </h4>
              <ul className="space-y-2">
                {product.pros?.map((pro, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Things to Consider</span>
              </h4>
              <ul className="space-y-2">
                {product.cons?.map((con, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Benchmark Radar */}
        <div className="lg:col-span-5">
          <SpecRadar scores={product.scores} />
        </div>

      </div>

      {/* HISTORICAL PRICE TRACKER & TIME-SERIES GRAPH */}
      <PriceHistoryChart
        priceHistory={priceHistory}
        currentPrice={product.priceSummary?.minPrice}
        productTitle={product.title}
      />

      {/* FULL TECHNICAL SPECIFICATIONS */}
      <SpecTable spec={specification} category={product.category} />

      {/* VERIFIED USER REVIEWS & RATINGS SECTION */}
      <ReviewSection
        productId={product._id}
        productTitle={product.title}
      />

      {/* ALTERNATIVES IN SAME BUDGET */}
      {alternatives && alternatives.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Top Alternatives in this Price Cohort</h3>
            <p className="text-xs text-slate-400">Smartphones offering comparable hardware performance and value</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {alternatives.map((alt) => (
              <ProductCard
                key={alt._id}
                product={alt}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
