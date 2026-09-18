import React from 'react';
import { Scale, Check, Zap, Cpu, Camera, Heart, Monitor, Battery, Volume2, Activity } from 'lucide-react';

const renderCategoryPills = (product) => {
  const cat = product.category || 'smartphones';
  const scores = product.scores || {};

  switch (cat) {
    case 'laptops':
      return (
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Cpu className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">Compute: {scores.performance || 80}/100</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Monitor className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Display: {scores.display || 80}/100</span>
          </div>
        </div>
      );
    case 'wearables':
      return (
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Activity className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="truncate">Health: {scores.build || 85}/100</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Battery className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">Battery: {scores.battery || 80}/100</span>
          </div>
        </div>
      );
    case 'tablets':
      return (
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Monitor className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">Display: {scores.display || 85}/100</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Cpu className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="truncate">Stylus/SoC: {scores.performance || 80}/100</span>
          </div>
        </div>
      );
    case 'audio':
      return (
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Volume2 className="w-3 h-3 text-purple-400 shrink-0" />
            <span className="truncate">ANC/Sound: {scores.performance || 85}/100</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Battery className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Playtime: {scores.battery || 80}/100</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Cpu className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">Speed: {scores.performance || 80}/100</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-md border border-slate-700/50">
            <Camera className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="truncate">Camera: {scores.camera || 80}/100</span>
          </div>
        </div>
      );
  }
};
import { useCompareStore } from '../../store/compareStore.js';
import { useUserStore } from '../../store/userStore.js';

export function ProductCard({ product, onSelect }) {
  const { selectedSlugs, addSlug, removeSlug } = useCompareStore();
  const { toggleWishlistId, isProductWishlisted } = useUserStore();
  const isCompared = selectedSlugs.includes(product.slug);
  const isWishlisted = isProductWishlisted(product._id);

  const toggleCompare = (e) => {
    e.stopPropagation();
    if (isCompared) {
      removeSlug(product.slug);
    } else {
      addSlug(product.slug);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlistId(product._id);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score >= 80) return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  };

  return (
    <div 
      onClick={() => onSelect(product.slug)}
      className="glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer group relative border border-slate-800 hover:border-sky-500/40"
    >
      {/* Top Floating Actions: Wishlist + Compare */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <button
          onClick={handleWishlist}
          className={`pointer-events-auto p-1.5 rounded-xl transition-all shadow-md backdrop-blur-md border ${
            isWishlisted 
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
              : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-rose-400 hover:bg-slate-800'
          }`}
          title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
        </button>

        <button
          onClick={toggleCompare}
          className={`pointer-events-auto px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md ${
            isCompared 
              ? 'bg-sky-500 text-slate-950 font-bold border border-sky-400' 
              : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800'
          }`}
        >
          {isCompared ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Scale className="w-3.5 h-3.5 text-sky-400" />}
          <span>{isCompared ? 'Compared' : 'Compare'}</span>
        </button>
      </div>

      {/* Featured Image Container */}
      <div className="relative aspect-[16/10] bg-gradient-to-b from-slate-800/40 to-slate-900/80 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.featuredImage}
          alt={product.title}
          loading="lazy"
          className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Deal Tag */}
        {product.priceSummary?.hasDeals && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-rose-400" /> Great Deal
          </span>
        )}
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              {typeof product.brand === 'object' ? product.brand.name : product.brand}
            </span>
            <div className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getScoreColor(product.scores?.overall || 80)}`}>
              PhonoScore {product.scores?.overall}/100
            </div>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>

          {/* Category-Adaptive Quick Spec Pills */}
          {renderCategoryPills(product)}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-white">
                  ₹{product.priceSummary?.minPrice?.toLocaleString('en-IN')}
                </span>
                {product.priceSummary?.maxPrice && product.priceSummary.maxPrice > product.priceSummary.minPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    ₹{product.priceSummary.maxPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <button 
              className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-colors shadow-sm shrink-0"
            >
              View Deals
            </button>
          </div>

          {/* Real-time Lowest Price Store Badge */}
          <div className="flex items-center justify-between text-[10px] pt-0.5">
            <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Lowest on {product.priceSummary?.lowestSellerName || 'Amazon India'}
            </span>

            {product.priceSummary?.maxPrice && product.priceSummary.maxPrice > product.priceSummary.minPrice && (
              <span className="text-emerald-400 font-bold">
                {Math.round(((product.priceSummary.maxPrice - product.priceSummary.minPrice) / product.priceSummary.maxPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
