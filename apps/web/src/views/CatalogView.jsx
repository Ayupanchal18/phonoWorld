import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, ArrowUpDown, Smartphone, Laptop, Watch, Tablet, Headphones, Sparkles, Check, Layers } from 'lucide-react';
import { api } from '../services/api.js';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { CategoryPills } from '../components/common/CategoryPills.jsx';
import { SeoHead } from '../components/common/SeoHead.jsx';

export function CatalogView({ onSelectProduct, onViewChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(350000);
  const [only5G, setOnly5G] = useState(false);
  const [onlyDedicatedGpu, setOnlyDedicatedGpu] = useState(false);
  const [onlyAnc, setOnlyAnc] = useState(false);
  const [onlyStylus, setOnlyStylus] = useState(false);
  const [onlyEcg, setOnlyEcg] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories()
  });

  const { data: brandsData } = useQuery({
    queryKey: ['brands'],
    queryFn: () => api.getBrands()
  });

  const categories = categoriesData?.data || [];

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', { selectedCategory, selectedBrand, maxPrice, only5G, sortBy }],
    queryFn: () => api.getProducts({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      brand: selectedBrand || undefined,
      maxPrice: maxPrice < 350000 ? maxPrice : undefined,
      has5G: only5G ? 'true' : undefined,
      sort: sortBy
    })
  });

  const brands = brandsData?.data || [];
  const rawProducts = productsData?.data || [];

  // Client-side quick facet refinements for category-specific traits
  const products = useMemo(() => {
    return rawProducts.filter(p => {
      if (onlyDedicatedGpu && p.category === 'laptops') {
        const titleAndSum = `${p.title} ${p.summary}`.toLowerCase();
        if (!titleAndSum.includes('rtx') && !titleAndSum.includes('geforce') && !titleAndSum.includes('gpu')) {
          return false;
        }
      }
      if (onlyAnc && p.category === 'audio') {
        const titleAndSum = `${p.title} ${p.summary}`.toLowerCase();
        if (!titleAndSum.includes('anc') && !titleAndSum.includes('noise cancel')) {
          return false;
        }
      }
      if (onlyStylus && p.category === 'tablets') {
        const titleAndSum = `${p.title} ${p.summary}`.toLowerCase();
        if (!titleAndSum.includes('pen') && !titleAndSum.includes('stylus')) {
          return false;
        }
      }
      if (onlyEcg && p.category === 'wearables') {
        const titleAndSum = `${p.title} ${p.summary}`.toLowerCase();
        if (!titleAndSum.includes('ecg') && !titleAndSum.includes('titanium')) {
          return false;
        }
      }
      return true;
    });
  }, [rawProducts, onlyDedicatedGpu, onlyAnc, onlyStylus, onlyEcg]);

  const activeCategoryMeta = categories.find(c => c.id === selectedCategory);
  const categoryLabel = activeCategoryMeta ? activeCategoryMeta.name : 'Consumer Hardware';

  const resetAllFilters = () => {
    setSelectedBrand('');
    setMaxPrice(350000);
    setOnly5G(false);
    setOnlyDedicatedGpu(false);
    setOnlyAnc(false);
    setOnlyStylus(false);
    setOnlyEcg(false);
  };

  const hasActiveFilters = selectedBrand || maxPrice < 350000 || only5G || onlyDedicatedGpu || onlyAnc || onlyStylus || onlyEcg;

  // Filter brands according to active category if filtered
  const filteredBrands = useMemo(() => {
    if (selectedCategory === 'all') return brands;
    // Keep brands that have products in this category
    const brandIdsInCat = new Set(rawProducts.map(p => typeof p.brand === 'object' ? p.brand._id : p.brand));
    const list = brands.filter(b => brandIdsInCat.has(b._id) || brandIdsInCat.has(b.slug));
    return list.length > 0 ? list : brands;
  }, [brands, selectedCategory, rawProducts]);

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      <SeoHead
        title={`Find Best ${categoryLabel} in India (2026) - Benchmark Specs & Lowest Prices - PhonoWorld`}
        description={`Compare specifications, verified benchmark ratings, and real-time live retailer deals across ${categoryLabel} in India.`}
        canonicalUrl="https://phonoworld.in"
      />
      
      {/* HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800 p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-[#0b0f19] to-sky-950/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>India's Multi-Category Consumer Hardware Radar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Compare Specs. Track Prices. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-300">Buy Smarter.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Smartphones, Gaming & Creator Laptops, Ultra Smartwatches, Productivity Tablets, and Hi-Res TWS Audio—with zero sponsored bias and verified retailer price tracking.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onViewChange('finder')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Device Finder Wizard</span>
            </button>

            <button
              onClick={() => { setSelectedCategory('laptops'); setMaxPrice(260000); }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              High-Perf Laptops
            </button>

            <button
              onClick={() => { setSelectedCategory('smartphones'); setMaxPrice(25000); }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Smartphones under ₹25k
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY SWITCHER PILLS */}
      <div className="pt-2">
        <CategoryPills
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setSelectedBrand('');
          }}
          categories={categories}
        />
      </div>

      {/* FILTER & CATALOG SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-sky-400 hover:underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300">Max Budget</span>
                <span className="font-bold text-sky-400">
                  {maxPrice >= 350000 ? 'Any Budget' : `Up to ₹${maxPrice.toLocaleString('en-IN')}`}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="350000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹10k</span>
                <span>₹1.5L</span>
                <span>₹3.5L+</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">Brands</span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                <button
                  onClick={() => setSelectedBrand('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    !selectedBrand ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>All Brands</span>
                  {!selectedBrand && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                {filteredBrands.map((b) => (
                  <button
                    key={b._id}
                    onClick={() => setSelectedBrand(b.slug === selectedBrand ? '' : b.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedBrand === b.slug ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{b.name}</span>
                    {selectedBrand === b.slug && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* CATEGORY-SPECIFIC FACET TOGGLES */}
            {(selectedCategory === 'smartphones' || selectedCategory === 'all') && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">5G Enabled Only</span>
                <button
                  onClick={() => setOnly5G(!only5G)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    only5G ? 'bg-sky-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    only5G ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )}

            {(selectedCategory === 'laptops' || selectedCategory === 'all') && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">RTX Dedicated GPU</span>
                <button
                  onClick={() => setOnlyDedicatedGpu(!onlyDedicatedGpu)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    onlyDedicatedGpu ? 'bg-sky-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    onlyDedicatedGpu ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )}

            {(selectedCategory === 'wearables' || selectedCategory === 'all') && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">ECG & Titanium</span>
                <button
                  onClick={() => setOnlyEcg(!onlyEcg)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    onlyEcg ? 'bg-sky-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    onlyEcg ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )}

            {(selectedCategory === 'tablets' || selectedCategory === 'all') && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Stylus Included</span>
                <button
                  onClick={() => setOnlyStylus(!onlyStylus)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    onlyStylus ? 'bg-sky-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    onlyStylus ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )}

            {(selectedCategory === 'audio' || selectedCategory === 'all') && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Flagship ANC</span>
                <button
                  onClick={() => setOnlyAnc(!onlyAnc)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    onlyAnc ? 'bg-sky-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    onlyAnc ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            )}

          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="lg:col-span-3 space-y-5">
          
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">
              Showing <span className="font-bold text-white">{products.length}</span> {categoryLabel.toLowerCase()} in India
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
              >
                <option value="popular">Most Popular</option>
                <option value="score">Highest PhonoScore</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Best Value</option>
              </select>
            </div>
          </div>

          {/* Product Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-3">
              <Layers className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No hardware matches your filter</h3>
              <p className="text-xs text-slate-400">Try switching categories, widening your budget range, or clearing filters.</p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
